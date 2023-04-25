class TimeUtils {
  static getTimeDiff(ms) {
    const diff = Date.now() - ms;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 60) {
      return "刚刚";
    } else if (minutes < 60) {
      return `${minutes}分钟前`;
    } else if (hours < 24) {
      return `${hours}小时前`;
    } else if (days < 30) {
      return `${days}天前`;
    } else if (months < 12) {
      return `${months}个月前`;
    } else {
      return `${years}年前`;
    }
  }

  //将时间戳转换成年月日时分秒
  static formatTime(timestamp) {
    const parsedTimestamp = Number(timestamp);
    if (isNaN(parsedTimestamp)) {
      throw new Error("Invalid timestamp");
    }
    const date = new Date(parsedTimestamp); // 将 Unix 时间戳转换为 JavaScript 时间戳
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    const formattedDate = `${year}年${month}月${day}日`;
    return formattedDate;
  }
}

export default TimeUtils;
