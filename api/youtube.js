export default async function handler(req, res) {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;

    const CHANNEL_ID = 'UCqcq91J98hJy6Wll09O6diA';

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
    );

    const data = await response.json();

    const inscritos = data.items[0].statistics.subscriberCount;

    res.status(200).json({
      seguidores: Number(inscritos)
    });

  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao buscar inscritos'
    });
  }
}
