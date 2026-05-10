export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, message: "Método não permitido" });
    }

    const { network, name, email, username } = req.body;

    const urls = {
      TikTok: "https://script.google.com/macros/s/AKfycbzUBoA_dzvCN5Ojc5J7NukCwgkLF-lQztunI8b7nbSqJOVdo5UwB-VBzaDW89KK7-G3_A/exec";
      Instagram: "https://script.google.com/macros/s/AKfycbzT9MemAdjkrVXsS9huJwA0ZQeHmcPaViL-HqBcjeAltx4jth-P3_PfSZp0BvzLZSSYZg/exec";
      Facebook: "https://script.google.com/macros/s/AKfycbyiEyXMPEwt4pdyXb4s0wtf-XDVZrqAADfEpAelnoHIijpX_CK9196obwtqnjNKNjiL/exec";
      YouTube: "https://script.google.com/macros/s/AKfycbzf94FgGmOwRRwzXDAXlW8AJLxMWPyZGZ4mQXgXVaxEnnRWV2XzS66Y3_ZJvIaaE0e_/exec";
    };

    const scriptUrl = urls[network];

    if (!scriptUrl) {
      return res.status(400).json({
        ok: false,
        message: "Rede social inválida."
      });
    }

    const params = new URLSearchParams();
    params.append("name", name || "");
    params.append("email", email || "");
    params.append("network", network || "");
    params.append("username", username || "");

    const response = await fetch(scriptUrl, {
      method: "POST",
      body: params
    });

    const text = await response.text();
    const resposta = text.toLowerCase();

    if (
      resposta.includes("duplicado") ||
      resposta.includes("já") ||
      resposta.includes("ja") ||
      resposta.includes("existe") ||
      resposta.includes("email") ||
      resposta.includes("usuário") ||
      resposta.includes("usuario")
    ) {
      return res.status(409).json({
        ok: false,
        duplicate: true,
        message: "Inscrição já realizada. Este email ou @ já está inscrito nesta rede social."
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Inscrição realizada com sucesso!"
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Erro ao enviar inscrição. Tente novamente em alguns minutos."
    });
  }
}
