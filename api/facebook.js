export default async function handler(req, res) {
  try {
    const token = process.env.FACEBOOK_TOKEN;
    const pageId = "1058359717357072";

    if (!token) {
      return res.status(500).json({ error: "FACEBOOK_TOKEN não configurado" });
    }

    const url = `https://graph.facebook.com/v25.0/${pageId}?fields=name,followers_count&access_token=${token}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.error) {
      return res.status(500).json({
        error: "Erro ao buscar seguidores do Facebook",
        details: data
      });
    }

    res.status(200).json({
      username: data.name,
      seguidores: data.followers_count
    });
  } catch (error) {
    res.status(500).json({
      error: "Erro interno",
      details: error.message
    });
  }
}
