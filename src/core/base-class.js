import {
  newUUID
}
  from '@/core/utils/core-util'
export default class BaseClass {
  constructor (options) {
    this._uuid = newUUID(8, 16)
    this._options = options || {}
  }
  get uuid () {
    return this._uuid
  }
  get name () {
    return this.constructor.name + '_' + this.uuid
  }
}
