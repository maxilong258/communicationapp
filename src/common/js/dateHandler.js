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
  }
}