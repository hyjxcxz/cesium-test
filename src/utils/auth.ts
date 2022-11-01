/**
 * cookie的操作
 * */
import Cookies from 'js-cookie'
// import envConfig from '@/config/env-config'
// 获取cookie
export function getCookie (key:string) {
  return Cookies.get(key)
}
// 设置cookie
export function setCookie (key:string, value:string) {
  return Cookies.set(key, value)
}
// 移除Cookie
export function removeCookie (key:string) {
  return Cookies.remove(key)
}
/**
  * token的操作
  * */
let TokenKey:string | null = null
// if (envConfig.appNodeEnv == 'local' || envConfig.appNodeEnv == 'development') {
//   TokenKey = `${envConfig.appTitle}-dev-token`
// } else {
//   TokenKey = `${envConfig.appTitle}-${envConfig.appNodeEnv}-token`
// }
TokenKey = 'GoldMapToken'
// token 获取
export function getToken () {
  return Cookies.get(TokenKey) || null
}
// 设置token
export function setToken (token:string) {
  return Cookies.set(TokenKey, token)
}
// 移除token
export function removeToken () {
  return Cookies.remove(TokenKey)
}
/**
  * loacl的操作
  * */
export function setLocal (key:string, data:string) {
  return localStorage.setItem(key, JSON.stringify(data))
}
export function getLocal (key:string) {
  return JSON.parse(localStorage.getItem(key) || '') || null
}
export function removeLocal (key:string) {
  // console.log('removeLocal')
  delete localStorage[key]
}
/**
  * session的操作
  * */
export function setSession (key:string, data:string) {
  return sessionStorage.setItem(key, JSON.stringify(data))
}
export function getSession (key:string) {
  return JSON.parse(sessionStorage.getItem(key) || '') || null
}
export function removeSession (key:string) {
  delete sessionStorage[key]
}
