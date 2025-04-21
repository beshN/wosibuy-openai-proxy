export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 🔥 CORS İZNİ
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");

  const OPENAI_API_KEY = process.env.OPENAI_KEY;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { messages } = req.body;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
      }),
    });

    const data = await openaiRes.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("OpenAI Proxy Error:", error);
    res.status(500).json({ error: "OpenAI proxy hatası" });
  }
}
