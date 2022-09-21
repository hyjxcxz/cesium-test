<template>
  <div
    class="guide-content API-content"
  >
    <h1>服务注册</h1>
    <el-form
      :model="form"
      label-width="120px"
    >
      <el-form-item label="服务名称：">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="服务描述：">
        <el-input
          v-model="descriptionList"
          autosize
          type="textarea"
          placeholder="输入服务描述，每一段完成后请换行"
          @change="descriptionListChange"
        />
      </el-form-item>
      <el-form-item label="适用场景：">
        <el-input
          v-model="scenesList"
          autosize
          type="textarea"
          placeholder="输入适用场景，每一段完成后请换行"
          @change="scenesListChange"
        />
      </el-form-item>
      <el-form-item label="使用说明：">
        <el-input
          v-model="introductionList"
          autosize
          type="textarea"
          placeholder="按步骤输入使用说明，每一步完成后请换行"
          @change="introductionListChange"
        />
      </el-form-item>
      <el-form-item label="服务类型：">
        <el-input
          v-model="introductionList"
          autosize
          type="textarea"
          placeholder="按步骤输入使用说明，每一步完成后请换行"
          @change="introductionListChange"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
const descriptionList = ref('')
const scenesList = ref('')
const introductionList = ref('')
const form :any = reactive(
  {
    name: '', // 服务名称
    descriptionList: [], // 服务描述
    scenesList: [], // 适用场景
    introductionList: [], // 使用说明
    address: '', // API URL
    mode: '', // 请求方式
    paramList: [ // 请求参数
      {
        name: 'code',
        type: 'integer',
        mean: '数据编码',
        rule: '数据编码的获取可参阅数据编码说明',
        required: '是',
        defaultValue: '无'
      }
    ],
    returnList: [ // 返回参数
      {
        name: 'code',
        mean: '返回请求状态码',
        rule: '返回值为200表示请求成功，否则表示请求失败'
      }
    ],
    exampleList: [ // 服务示例 get
      {
        name: 'code',
        type: 'integer',
        value: '401',
        note: '100m风速数据编码的编码为401，其它数据编码的获取可参阅数据编码说明',
        required: '是'
      }
    ],
    exampleJson: null // 服务示例Post
  })
// const form1 = reactive(
//   {
//     id: 'queryDataByPoint',
//     name: '点查询',
//     descriptionList: [
//       '点查询是根据用户输入的地理坐标和数据编码，查询某一个位置的地理，气象，风资源，光资源等信息'
//     ],
//     scenesList: [
//       '用户在地图上点击某一个位置，展示该位置的地理，气象，风资源，光资源等信息',
//       '用户查询某一个位置的信息，用于资源计算'
//     ],
//     introductionList: [
//       '第一步，申请Web服务API类型Key；',
//       '第二步，参考接口参数文档发起HTTP/HTTPS请求，第一步申请的 Key 需作为必填参数一同发送；',
//       '第三步，接收请求返回的数据（JSON格式），参考返回参数文档解析数据。',
//       '如无特殊声明，接口的输入参数和输出数据编码全部统一为 UTF-8 编码方式。'
//     ],
//     address: 'http://10.11.56.245:51011/basedata/queryDataByPoint',
//     mode: 'Get',
//     paramList: [
//       {
//         name: 'code',
//         type: 'integer',
//         mean: '数据编码',
//         rule: '数据编码的获取可参阅数据编码说明',
//         required: '是',
//         defaultValue: '无',
//         children: null
//       },
//       {
//         name: 'lon',
//         type: 'double',
//         mean: '经度',
//         rule: '建议保留6位小数',
//         required: '是',
//         defaultValue: '无',
//         children: null
//       },
//       {
//         name: 'lat',
//         type: 'double',
//         mean: '纬度',
//         rule: '建议保留6位小数',
//         required: '是',
//         defaultValue: '无',
//         children: null
//       }
//     ],
//     returnList: [
//       {
//         name: 'code',
//         mean: '返回请求状态码',
//         rule: '返回值为200表示请求成功，否则表示请求失败',
//         children: null
//       },
//       {
//         name: 'message',
//         mean: '返回请求状态码说明',
//         rule: '当code为200时，返回值为“OK”，否则返回错误码。详情可以参阅错误码说明',
//         children: null
//       },
//       {
//         name: 'data',
//         mean: '返回数值列表',
//         rule: '例如：[5.336]',
//         children: null
//       }
//     ],
//     exampleList: [
//       {
//         name: 'code',
//         type: 'integer',
//         value: '401',
//         note: '100m风速数据编码的编码为401，其它数据编码的获取可参阅数据编码说明',
//         required: '是'
//       },
//       {
//         name: 'lon',
//         type: 'double',
//         value: '115.123456',
//         note: '经度，建议保留6位小数，国内范围为73.66-135.05',
//         required: '是'
//       },
//       {
//         name: 'lat',
//         type: 'double',
//         value: '25.123456',
//         note: '纬度，建议保留6位小数，国内范围为3.86-53.55',
//         required: '是'
//       }
//     ],
//     exampleJson: null
//   })
function descriptionListChange (value: string) {
  form.descriptionList = value.split('\n')
}
function scenesListChange (value: string) {
  form.scenesList = value.split('\n')
}
function introductionListChange (value: string) {
  form.introductionList = value.split('\n')
}
</script>
<style lang="scss" scoped>
.API-content {
  font-family: "Open Sans","Clear Sans", "Helvetica Neue", Helvetica, Arial, 'Segoe UI Emoji', sans-serif;
  width: calc(100% - 221px);
  float: left;
  overflow: auto;
  margin-left: 10px;
  margin-right: 10px;
  .API-description {
    margin: 0.8rem 0;
    span {
      // color: #767676;
      color: rgb(51, 51, 51);
      font-size: 14px;
    }
  }
  h1 {
    font-size: 1.2em;
    font-weight: bold;
    color: rgb(51, 51, 51);
    white-space: normal;
    font-family: "Open Sans","Clear Sans", "Helvetica Neue", Helvetica, Arial, 'Segoe UI Emoji', sans-serif;
    span {
      color: #949695;
      font-size: 12px;
      font-weight: bold;
      display: block;
      margin: 17px 0 0;
    }
  }
  h2 {
    border-bottom: 1px solid #ddddde;
    // font-size: 1.2em;
    // color: #000;
    font-size: 1em;
    font-weight: bold;
    color: #3c3d3f;
  }
  h3 {
    font-size: 1em;
    font-weight: bold;
    color: #3c3d3f;
  }
  .API-URL {
    ul {
      margin-block-start: 0;
      margin-block-end: 0;
      padding-inline-start: 0;
    }
    li {
      list-style-type: none;
      height: 40px;
      line-height: 40px;
      border-top: 1px solid #ddddde;
      border-left: 1px solid #ddddde;
      border-right: 1px solid #ddddde;
      span {
        display: inline-block;
        height: 37px;
        line-height: 37px;
        padding: 2px 5px;
        // color: #767676;
        color: rgb(51, 51, 51);
        font-size: 14px;
      }
      span:first-child {
        width: 80px;
        border-right: 1px solid #ddddde;
      }
    }
    li:last-child {
      border-bottom: 1px solid #ddddde;
    }
  }
  .API-apiurl {
    background: #f7f7f7;
    width: calc(100% - 20px);
    margin: 10px 0;
    padding: 5px 10px;
    color: rgb(51, 51, 51);;
    span {
      padding: 5px 10px;
      // color: #767676;
      color: rgb(51, 51, 51);
      font-size: 14px;
    }
  }
  .API-run {
    margin: 10px auto 20px 10px;
  }
  .API-result {
    min-height: 50px;
    border: 1px solid #ddddde;
    margin: 10px 0;
  }
}
</style>
