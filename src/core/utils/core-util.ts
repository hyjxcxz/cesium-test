/**
 * 替换字符串
 * @param {*} source 源字符串
 * @param {*} oldText 待替换字符串
 * @param {*} newText 新字符串，默认为空
 */
export const replaceText = function (source:any, oldText:any, newText = '') {
  if (!source || !oldText) return source
  while (source.indexOf(oldText) >= 0) {
    source = source.replace(oldText, newText)
  }
  return source
}

export function newUUID (len = 8, radix = 16) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  let i
  radix = radix || chars.length

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    let r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}
