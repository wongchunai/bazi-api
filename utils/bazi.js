import { Solar } from 'lunar-typescript';
import { getSolarTime } from 'suntime-js'; // 用於真太陽時
import cityTimezones from 'city-timezones';

// 中文地點簡易查表
function getCityCoordinates(city) {
  const result = cityTimezones.lookupViaCity(city);
  if (!result.length) return null;
  return {
    latitude: result[0].lat,
    longitude: result[0].lng,
  };
}

export async function calculateBazi({ year, month, day, hour, minute, gender, location }) {
  const coords = getCityCoordinates(location);
  if (!coords) {
    return { error: '無法找到地點經緯度' };
  }

  // 真太陽時計算（近似，使用當日太陽中天時間）
  const solarTime = await getSolarTime(new Date(`${year}-${month}-${day}T${hour}:${minute}`), {
    latitude: coords.latitude,
    longitude: coords.longitude,
  });

  const trueHour = solarTime.solarNoon.getHours();
  const trueMinute = solarTime.solarNoon.getMinutes();

  // 將真太陽時重新格式化為 Date 對象
  const trueDate = new Date(year, month - 1, day, trueHour, trueMinute);

  // 使用 lunar-typescript 計算四柱
  const solar = Solar.fromDate(trueDate);
  const eightChar = solar.getEightChar();

  return {
    年柱: eightChar.getYear(),
    月柱: eightChar.getMonth(),
    日柱: eightChar.getDay(),
    時柱: eightChar.getTime(),
    原始輸入: {
      年: year,
      月: month,
      日: day,
      時: hour,
      分: minute,
      性別: gender,
      地點: location,
    },
    真太陽時: `${trueHour}:${trueMinute}`,
  };
}
