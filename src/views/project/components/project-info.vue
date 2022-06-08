<template>
  <el-dialog
    title="项目信息"
    width="24%"
    draggable
    v-model="visible"
    :close-on-click-modal="false"
    @close="changeVisible"
  >
    <ul>
      <li>
        <span>项目名称：</span>
        <span>{{ detail.name }}</span>
      </li>
      <li>
        <span>业主单位：</span>
        <span>-</span>
      </li>
      <li>
        <span>行政区划：</span>
        <span>-</span>
      </li>
      <li>
        <span><span style="letter-spacing:0.8em;">地 形</span><span style="margin-left: -8px;color: #909BEA;">:</span></span>
        <span>-</span>
      </li>
      <li>
        <span><span style="letter-spacing:0.8em;">机 型</span><span style="margin-left: -8px;color: #909BEA;">:</span></span>
        <span>-</span>
      </li>
      <li>
        <span>轮毂高度：</span>
        <span>- m</span>
      </li>
      <li>
        <span>机组数量：</span>
        <span>- 台</span>
      </li>
      <li>
        <span>项目容量：</span>
        <span>{{ detail.capacity || '-' }} WM</span>
      </li>
      <li>
        <span>并网日期：</span>
        <span>-</span>
      </li>
      <li>
        <span style="line-height: 16px;">质保期 <br>开始日期：</span>
        <span>-</span>
      </li>
    </ul>
  </el-dialog>
</template>

<script lang="ts" setup>
import { toRefs, ref, watchEffect } from 'vue'
import { useStore } from '@/store/index'

const store = useStore()
const detail:any = ref(store.state.wind.windfarmDetail)

const props = defineProps({
  visible: Boolean
})
const emits = defineEmits(['close'])

const { visible } = toRefs(props)

function changeVisible () {
  emits('close')
}

watchEffect(() => {
  detail.value = store.state.wind.windfarmDetail
})

</script>

<style scoped lang="scss">
.el-dialog{
  position: fixed;
  top: 36%;
  left: 20%;
 .el-dialog__body{
    ul{
      width: 100%;
      margin: 0;
      padding: 0px;
      li{
        margin: 0;
        padding: 0px 16%;
        width: calc(84% - 20px);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        line-height: 26px;
        list-style-type: none;
        span{
          &:nth-child(1){
            width:100px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #909BEA;
          }
          &:nth-child(2){
            flex:1;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
          }
        }
        &:nth-child(1){
          span{
            &:nth-child(2){
              line-height: 16px;
            }
          }
        }
      }
    }
  }
}
</style>
