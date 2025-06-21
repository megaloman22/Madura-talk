// server.js
const express = require('express');
const OpenAI = require('openai');
const app = express();
app.use(express.json());

const openai = new OpenAI({ apiKey: 'PASTE_SK-SEMENTARA_ANDA_DI_SINI' });

app.post('/ai-translate', async (req, res) => {
  const { text, dialek } = req.body;
  const prompt = `Terjemahkan bahasa Madura (dialek ${dialek}) ke bahasa Indonesia:\n"${text}"`;
  try {
    const result = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    });
    res.json({ translation: result.choices[0].message.content.trim() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('AI translator berjalan di http://localhost:3000'));
