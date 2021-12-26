const timeToString = (totalSecs: number) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs - h * 3600) / 60);
    const s = totalSecs - h * 3600 - m * 60;
    const hours = (h < 1 || h > 23)
      ? '00'
      : (h >= 1 && h <= 9) ? `0${h}` : `${h}`;
    const minutes = (m < 10)
      ? ((m === 0) ? '00' : `0${m}`)
      : `${m}`;
    const seconds = (s < 10) ? `0${s}` : `${s}`;
  
    const timeStr = `${hours}:${minutes}:${seconds}`;
    return timeStr;
  };
  
  export default timeToString;
  