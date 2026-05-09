export default async function handler(req, res) {
  try {
    const response = await fetch("https://www.instagram.com/kaiquecomkapa/?__a=1&__d=dis");

    const text = await response.text();

    const match = text.match(/"edge_followed_by":{"count":(\d+)}/);

    if (!match) {
      return res.status(500).json({
        error: "Não foi possível encontrar seguidores"
      });
    }

    const followers = parseInt(match[1]) - 1;

    res.status(200).json({
      seguidores: followers
    });

  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar seguidores"
    });
  }
}
