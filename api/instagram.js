export default async function handler(req, res) {
  try {
    const response = await fetch("https://i.instagram.com/api/v1/users/web_profile_info/?username=kaiquecomkapa", {
      headers: {
        "User-Agent": "Instagram 155.0.0.37.107"
      }
    });

    const data = await response.json();

    const followers =
      data.data.user.edge_followed_by.count - 1;

    res.status(200).json({
      seguidores: followers
    });

  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar seguidores"
    });
  }
}
