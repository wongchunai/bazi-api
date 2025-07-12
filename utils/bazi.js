// utils/bazi.js
export function getBaziFromInput({ year, month, day, hour, minute, gender, location }) {
  // 🧪 這裡是簡化邏輯，只是做個測試樣本
  // 你可自行接入真太陽時和節氣判斷邏輯
  return {
    input: { year, month, day, hour, minute, gender, location },
    bazi: {
      yearPillar: '甲子',
      monthPillar: '丙寅',
      dayPillar: '庚午',
      hourPillar: '丁酉',
    },
    message: '（這是示例結果，尚未連接精準計算模組）'
  }
}
