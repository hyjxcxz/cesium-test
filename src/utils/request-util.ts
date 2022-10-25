import request from '@/utils/request'
import {
  apiPathConfigs
} from '@/api/api-config'
import { requestService } from '@/utils/util.request'
import requestBackstage from '@/utils/backstage-request'
import {
  servicesApiPathConfigs
} from '@/api/services-api-config'

/**
 * 请求后端提供的API
 * @param {String} apiName API名称，同apisConfig属性名
 * @param {Object} data 请求附加数据
 * @param {Function} callback 如果设置了此项，无论请求成功或出错，都会执行该回调函数
 * @param {Array} apiUrlParams 用于填充API的url中须动态设置的值，如[110,'110']
 * @returns {Promise} Promise
 */
export function requestApi (url:string, method:string, apiName: any, data: any, callback: any, apiUrlParams: any) {
  const obj:any = {
    request,
    apisConfig: apiPathConfigs,
    apiName,
    apiUrlParams,
    data,
    url,
    method,
    callback
  }
  return requestService(obj)
}

/**
 * 请求后端提供的API 后台管理
 * @param {String} apiName API名称，同apisConfig属性名
 * @param {Object} data 请求附加数据
 * @param {Function} callback 如果设置了此项，无论请求成功或出错，都会执行该回调函数
 * @param {Array} apiUrlParams 用于填充API的url中须动态设置的值，如[110,'110']
 * @returns {Promise} Promise
 */
export function requestServiceApi (url:string, method:string, apiName: any, data: any, callback: any, apiUrlParams: any) {
  const obj:any = {
    request: requestBackstage,
    apisConfig: servicesApiPathConfigs,
    apiName,
    apiUrlParams,
    data,
    url,
    method,
    callback
  }
  return requestService(obj)
}
