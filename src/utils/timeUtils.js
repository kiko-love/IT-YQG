class TimeUtils {
    static getTimeDiff(ms) {
      const diff = Date.now() - ms
      const seconds = Math.floor(diff / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)
      const months = Math.floor(days / 30)
      const years = Math.floor(months / 12)
      
      if (seconds < 60) {
        return '刚刚'
      } else if (minutes < 60) {
        return `${minutes}分钟前`
      } else if (hours < 24) {
        return `${hours}小时前`
      } else if (days < 30) {
        return `${days}天前`
      } else if (months < 12) {
        return `${months}个月前`
      } else {
        return `${years}年前`
      }
    }
  }
  
  export default TimeUtils  