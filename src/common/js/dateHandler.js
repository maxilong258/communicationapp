export default {
  dateTime(date) {
    const Mdate = new Date(date)
    const now = new Date()

    let Md = Mdate.getTime()
    let MH = Mdate.getHours()
    let MMin = Mdate.getMinutes()
    let MY = Mdate.getFullYear()
    let MM = Mdate.getMonth() + 1
    let MD = Mdate.getDate()

    let Nd = now.getTime()
    let NH = now.getHours()
    let NMin = now.getMinutes()
    let NY = now.getFullYear()
    let NM = now.getMonth() + 1
    let ND = now.getDate()

    if (MD === ND && MM === NM && MY === NY) {
      if (MH < 10) {
        MH = '0' + MH
      }
      if (MMin < 10) {
        MMin = '0' + MMin
      }
      return MH + ':' + MMin
    }

    if (MD + 1 === ND && MM === NM && MY === NY) {
      if (MH < 10) {
        MH = '0' + MH
      }
      if (MMin < 10) {
        MMin = '0' + MMin
      }
      return '昨天' + ' ' + MH + ':' + MMin
    }

    return MY + '/' + MM + '/' + MD + ' ' + MH + ':' + MMin
  },
  //处理聊天页时间间隔
  spaceTime(old, now) {
    old = new Date(old)
    now = new Date(now)
    var told = old.getTime();
    var tnow = now.getTime();
    if (tnow > (told + 1000 * 60)) {
      return now
    } else {
      return ''
    }
  },
  //资源文件夹按时间命名
  fileName(e) {
    let old = new Date(e)
    let y = old.getFullYear()
    let M = old.getMonth() + 1
    let d = old.getDate()
    if (M < 10) M = '0' + M
    if (d < 10) d = '0' + d
    return y + M + d
  }
}