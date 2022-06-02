<template>
  <div
    class="info-popup"
    :class="info.class === 'default' ? '' : info.class"
    :style="{left: info.x + 5 +'px', top: info.y - info.num +'px'}"
  >
    <div class="info-popup-header">
      {{ info.title }}
    </div>
    <ul class="info-popup-content">
      <li v-if="info.datas && info.datas.length > 1">
        <el-select
          v-model="value"
          class="m-2"
          placeholder="Select"
          size="small"
          @change="changeData"
        >
          <el-option
            v-for="item in info.datas"
            :key="item.id"
            :label="item.project_name"
            :value="item.id"
          />
        </el-select>
      </li>
      <li
        v-for="(item, index) in data"
        :key="item.key"
      >
        <span class="title">{{ item.key }}</span>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="item.value"
          placement="top"
          v-if="index === 0"
        >
          <span
            class="value ellipsis"
          >{{ item.value }}</span>
        </el-tooltip>
        <span
          v-else
          class="value"
          :class="item.status ? 'value-active' : ''"
        >{{ item.value }}</span>
      </li>
    </ul>
    <div class="info-popup-footer" />
  </div>
</template>

<script lang="ts">
import { ref, watchEffect, reactive } from 'vue'
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  setup (props:any) {
    const value = ref(props.info.id)
    const data:any = reactive(props.info.data)
    function changeData (val:number) {
      props.info.datas.forEach((item:any) => {
        if (item.id === val) {
          data.forEach((v:any) => {
            if (props.info.class === 'default') {
              if (v.key === '风场名称：') {
                v.value = item.project_name
              } else if (v.key === '经度：') {
                v.value = item.longitude
              } else if (v.key === '纬度：') {
                v.value = item.latitude
              }
            }
          })
        }
      })
    }
    watchEffect(() => {
      if (props.info.datas && props.info.datas.length > 1) {
        value.value = props.info.datas[0].id
      }
    })
    return {
      value,
      changeData,
      data
    }
  }
}

</script>
<style lang="scss">
.info-popup{
  width: 220px;
  position: absolute;
  top: 260px;
  left: 30%;
  .info-popup-header{
    width: 100%;
    height: 27px;
    background: rgba(#30FBFE, 0.3);
    font-size: 13px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 27px;
    text-indent: 1em;
    &::before{
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-top: 1px solid #30FBFE;
      border-left: 1px solid #30FBFE;
      position: absolute;
      top: -2px;
      left: -2px;
    }
    &::after{
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-top: 1px solid #30FBFE;
      border-right: 1px solid #30FBFE;
      position: absolute;
      top: -2px;
      right: -2px;
    }
  }
  .info-popup-content{
    padding: 10px;
    margin: 0;
    width: calc(100% - 22px);
    background: rgba(#081118, 0.7);
    border: 1px solid rgba(192, 200, 255, 0.8);
    li{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      line-height: 20px;
      .title{
        width: 75px;
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #BCCCFF;
      }
      .value{
        flex:1;
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #E7EDFF;
      }
      // &:nth-child(1){
      //   .value{
      //     // line-height: 16px;
      //     overflow: hidden;
      //     text-overflow: ellipsis;
      //     white-space: nowrap;
      //   }
      // }
      .value-active{
        color: #47C9AD;
      }
    }
    &::before{
      content: '';
      display: inline-block;
      width: 1.4px;
      height: 14px;
      background: #C0C8FF;
      position: absolute;
      left: -1px;
      bottom: -16px;
      transform: rotate(45deg);
    }
  }
  .info-popup-footer{
    width: 40px;
    height: 4px;
    position: absolute;
    right: 0px;
    bottom: -6px;
    background: rgba(#30FBFE, 0.6);
    border-radius: 0px 16px 0px 16px;
    &::before{
      content: '';
      width: 40px;
      height: 4px;
      position: absolute;
      right: 1px;
      bottom: -2px;
      border-left: 1px solid rgba(192, 200, 255, 0.8);
      border-bottom: 1px solid rgba(192, 200, 255, 0.8);
      border-radius: 0 0 0 10px;
    }
  }
  &::before{
    content: '';
    display: inline-block;
    width: 0px;
    height: 60px;
    border-top: 1px solid #C0C8FF;
    border-left: 1px solid #C0C8FF;
    position: absolute;
    left: -6px;
    bottom: -74px;
  }
  &::after{
    content: '';
    display: inline-block;
    width: calc(100% - 46px);
    height: 0px;
    border-top: 1px solid #C0C8FF;
    border-left: 1px solid #C0C8FF;
    position: absolute;
    left: 4px;
    bottom: -4px;
  }
}
.factory{
  .info-popup-header{
    background: rgba(#3049FE, 0.3);
  }
  .info-popup-footer{
    background: rgba(#3049FE, 0.6);
  }
}
</style>
