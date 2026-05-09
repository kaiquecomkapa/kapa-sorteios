export default async function handler(req, res) {
  try {
    const token = process.env.INSTAGRAM_TOKEN;

    const response = await fetch(
      `https://graph.instagram.com/me?fields=user_id,username,followers_count&access_token=${token}`
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: "Erro da API do Instagram",
        detalhes: data
      });
    }

    res.status(200).json({
      seguidores: data.followers_count,
      username: data.username
    });

  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar seguidores do Instagram"
    });
  }
}
