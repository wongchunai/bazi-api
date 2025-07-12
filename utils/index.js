import express from 'express';
import { calculateBazi } from './bazi.js'; // 等一下你會建立這個檔案

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('🧙 Bazi API 啟動成功！使用 /getBazi 路徑查詢四柱');
});

// 範例：http://localhost:3000/getBazi?year=1994&month=2&day=7&hour=19&minute=20&gender=male&location=深圳
app.get('/getBazi', async (req, res) => {
  try {
    const { year, month, day, hour, minute, gender, location } = req.query;
    if (!year || !month || !day || !hour || !minute || !gender || !location) {
      return res.status(400).json({ error: '請提供完整出生資訊' });
    }

    const result = await calculateBazi({ year, month, day, hour, minute, gender, location });
    res.json(result);
  } catch (err) {
    console.error('🚨 發生錯誤：', err);
    res.status(500).json({ error: '內部錯誤' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Bazi API 已啟動： http://localhost:${PORT}`);
});
