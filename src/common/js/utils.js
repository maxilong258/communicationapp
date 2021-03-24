export function debounce(fn, wait) {
  let timeout = null
  return function (...args) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, wait);
  }
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

export function sort(arr, obj, tip) {
  let s
  //降序排序
  if (tip === 0) {
    for (let i = 1; i < arr.length; i++) {
      for (let j = i; j > 0; j--) {
        if (arr[i][obj] > arr[j - 1][obj]) {
          s = arr[j]
          arr[j] = arr[j - 1]
          arr[j - 1] = s
        }
      }
    }
    return arr
  } else if (tip === 1) {
    //升序排序
    for (let i = 1; i < arr.length; i++) {
      for (let j = i; j > 0; j--) {
        if (arr[i][obj] < arr[j - 1][obj]) {
          s = arr[j]
          arr[j] = arr[j - 1]
          arr[j - 1] = s
        }
      }
    }
    return arr
  }
}