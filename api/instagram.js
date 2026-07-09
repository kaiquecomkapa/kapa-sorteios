export default async function handler(req, res) {
  try {
    const token = process.env.INSTAGRAM_TOKEN;
    const instagramId = process.env.INSTAGRAM_ID;

    if (!token) {
      return res.status(500).json({ error: "INSTAGRAM_TOKEN não configurado" });
    }

    if (!instagramId) {
      return res.status(500).json({ error: "INSTAGRAM_ID não configurado" });
    }

    const url = `https://graph.facebook.com/v25.0/${instagramId}?fields=username,followers_count&access_token=${token}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.error) {
      return res.status(500).json({
        error: "Erro ao buscar seguidores do Instagram",
        details: data
      });
    }

    res.status(200).json({
      username: data.username,
      seguidores: data.followers_count
    });

  } catch (error) {
    res.status(500).json({
      error: "Erro interno",
      details: error.message
    });
  }
}
