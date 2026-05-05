export default async function handler(req, res) {
  try {
    const response = await fetch("https://www.tiktok.com/@kaique.com.kapa");
    const html = await response.text();

    const match = html.match(/"followerCount":(\d+)/);

    if (!match) {
      return res.status(500).json({ error: "Não encontrou seguidores" });
    }

    const followers = parseInt(match[1]);

    res.status(200).json({ followers });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
}
