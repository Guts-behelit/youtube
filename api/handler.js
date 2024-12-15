import axios from "axios";

export default async function handler(req, res) {
  // Tu clave privada configurada en Vercel
  const { q }= req.body
  try {
    const apiKey = process.env.API_KEY_YOUTUBE_SEARCH;
    // Reemplaza con tu clave de API válida
    const query = q;        // Palabra clave a buscar
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${apiKey}&maxResults=20`;
    const response = await axios.get(apiUrl);

      res.status(200).json(response.data);
    
  

} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
}
