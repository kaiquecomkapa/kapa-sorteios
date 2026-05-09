export default async function handler(req, res) {
  try {
    const response = await fetch("https://i.instagram.com/api/v1/users/web_profile_info/?username=kaiquecomkapa", {
      headers: {
        "User-Agent": "Instagram 155.0.0.37.107",
        "Accept": "application/json"
      }
    });

    const text = await response.text();

    res.status(200).json({
      status: response.status,
      resposta: text.slice(0, 500)
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
