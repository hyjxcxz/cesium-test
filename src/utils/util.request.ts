
/**
 * 请求API
 * @param {Object} request 不可为空，执行请求的方法
 * @param {Object} apisConfig 不可为空，api配置对象
 * @param {String} apiName 不可为空，apisConfig中配置的API名称
 * @param {String} apiRootUrl 可选，API请求根地址
 * @param {Array} apiUrlParams 可选，用于填充API的url中须动态设置的值，如/api/getInfo/{projectId}
 * @param {Object} data 可选，请求附带的数据
 * @param {Function} callback 可选，请求完成回调函数
 * @returns {Promise} Promise
 */
export function requestService (param: { request: any; apisConfig:any; apiName: any; apiRootUrl: String; apiUrlParams: any; data: Object; callback: Function }) {
  // 判断是否有该api配置信息
  if (!param.request || !param.apisConfig || !param.apiName || (!Object.prototype.hasOwnProperty.call(param.apisConfig, param.apiName)) || !param.apisConfig[param.apiName]) {
    const error = new Error('警告：没有找到“' + param.apiName + '”对应的API配置信息，请确认拼写正确。')
    const errorPromise = Promise.reject(error)
    if (param.callback) {
      errorPromise
        .catch(error => {
          param.callback(error)
        })
    }
    return errorPromise
  }
  // 构造请求配置对象
  const apiConfig:{ timeout?: Number } = {}
  const apisConfigs = param.apisConfig
  const apiConfigObj = apisConfigs[param.apiName]
  for (const item in apiConfigObj) {
    apisConfigs[item] = apiConfigObj[item]
  }
  const requestConfig = {
    method: 'post',
    data: param.data,
    ...apiConfig,
    url: getRequestUrl({
      apisConfig: param.apisConfig,
      apiName: param.apiName,
      apiRootUrl: param.apiRootUrl,
      apiUrlParams: param.apiUrlParams
    })
  }
  if (apiConfig.timeout) {
    requestConfig.timeout = apiConfig.timeout
  }

  const requestPromise = param.request(requestConfig)
  if (param.callback) {
    requestPromise
      .then((res: any) => {
        param.callback(res)
      })
      .catch((error: any) => {
        param.callback(error)
      })
  }
  return requestPromise
}

export function getRequestUrl (param:{
  apisConfig: any,
  apiName: any,
  apiRootUrl: any,
  apiUrlParams: any
}) {
  // 判断是否有该api配置信息
  if (!param.apisConfig || !param.apiName || !Object.prototype.hasOwnProperty.call(param.apisConfig, param.apiName) || !param.apisConfig[param.apiName]) {
    return null
  }
  // 构造请求配置对象
  // const apiConfig = {
  //   ...apisConfig[apiName]
  // };
  const apiConfig: any = {}
  const apiConfigObj = param.apisConfig[param.apiName]
  for (const item in apiConfigObj) {
    apiConfig[item] = apiConfigObj[item]
  }
  if (param.apiUrlParams) {
    // 替换url中的占位符，按规则拼接url
    for (let i = 0; i < param.apiUrlParams.length; i++) {
      apiConfig.url = apiConfig.url ? apiConfig.url.replace('{' + i + '}', param.apiUrlParams[i]) : ''
    }
  }

  return param.apiRootUrl ? (param.apiRootUrl + apiConfig.url) : apiConfig.url
}

export function convertObject2FormData (obj: { [x: string]: string | Blob }) {
  const formData = new FormData()
  if (!obj) return formData
  for (const item in obj) {
    formData.append(item, obj[item])
  }
  return formData
}
