
import axios from 'axios'
// import { getToken } from '@/utils/auth'

export const request = (options:any) => {
  return new Promise((resolve, reject) => {
    // create an axios instance
    const service = axios.create({
      baseURL: process.env.BASE_API, // api 的 base_url
      //   baseURL: '/api',
      timeout: 80000 // request timeout
    })

    // request interceptor
    service.interceptors.request.use(
      (config:any) => {
        const token:string = ''// 此处换成自己获取回来的token，通常存在在cookie或者store里面
        if (token) {
          // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
          config.headers['X-Token'] = token

          config.headers.Authorization = +token
        }
        return config
      },
      error => {
        // Do something with request error
        console.log('出错啦', error) // for debug
        Promise.reject(error)
      }
    )

    // response interceptor
    service.interceptors.response.use(
      (response:any) => {
        return response.data
      },
      error => {
        // console.log('err' + error) // for debug
        // if(error.response.status == 403){
        //   ElMessage.error('错了')
        // }else{
        //   ElMessage.error('服务器请求错误，请稍后再试')
        // }
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
        return Promise.reject(errorData)
      }
    )
    // 请求处理
    service(options)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default request
