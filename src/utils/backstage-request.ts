import axios from 'axios'
import envConfig from '@/utils/env-config'
import { getToken } from '@/utils/auth'
import router from '@/router'
// 创建一个 axios 实例
const service = axios.create({
  baseURL: envConfig.apiBackstageUrl,
  timeout: 3000000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 判断请求是否需要带token
    // if (config.hasOwnProperty('useToken') && !config.useToken) return config
    //
    // // todo:从store中获取token
    // const token = util.cookies.get('token')
    //
    config.headers = config.headers || {}
    config.headers.apiKey = import.meta.env.VITE_APP_apiKey
    const token = getToken()
    if (token && config.url !== '/user/login') {
      config.headers.token = token
    }
    return config
  },
  error => {
    // 发送失败
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: any) => {
    responseHandler(response.data.code)
    if (response.config.url.includes('/file/download')) {
      return response
    } else {
      return response.data
    }
  },
  error => {
    responseHandler(error.response.status)
    // 判断是否服务调用成功，但出现业务错误
    if (error && error.response && error.response.data && error.response.data.code) {
      return Promise.resolve(error.response.data)
    }

    // 其他为网络等错误
    const errorData = {
      code: '999',
      message: '未知错误。',
      data: error
    }
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
      }
      errorData.code = String(error.response.status)
      errorData.message = error.message
    }
    // 将错误信息也使用Promise.resolve，这样无论是否有错，都只能在Promise.then方法中捕捉到错误。
    // 使用errorData将请求错误 和 请求正确 返回的数据保持一致的形式
    return Promise.resolve(errorData)
  }
)

// 返回操作
const responseHandler = (code: number) => {
  if (code === 401) {
    router.replace({ path: '/login' })
  }
}

export default service
