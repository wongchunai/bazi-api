const express = require('express');
const bodyParser = require('body-parser');
const getBazi = require('./utils/bazi');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/bazi', async (req, res) => {
  try {
    const { year, month, day, hour, minute, gender, location } = req.body;

    if (!year || !month || !day || hour === undefined || minute === undefined || !gender || !location) {
      return res.status(400).json({ error: '請提供完整的出生資訊：年、月、日、時、分、性別、地點' });
    }

    const result = await getBazi(year, month, day, hour, minute, gender, location);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '系統錯誤，請稍後再試' });
  }
});

app.get('/', (req, res) => {
  res.send('🧙‍♂️ 八字排盤 API 已啟動！使用 POST /api/bazi 提交出生資訊');
});

app.listen(port, () => {
  console.log(`🚀 Bazi API is running at http://localhost:${port}`);
});
