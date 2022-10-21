<template>
  <div class="result">
    <el-result
      icon="success"
      :title="props.title"
      :sub-title="props.subTitle"
    >
      <template #extra>
        <span @click="clearNum">剩余 {{ num }} 秒，跳过</span>
      </template>
    </el-result>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['go-back'])

const goback1 = () => {
  emits('go-back')
}

const num = ref(3)

const clearNum = () => {
  num.value = 0
  clearInterval(times)
  goback1()
}
const times = setInterval(() => {
  num.value = num.value - 1
  if (times && num.value <= 0) {
    clearNum()
  }
}, 1000)

</script>

<style lang="scss" scoped>
.result{
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(#000, 0.3);
  z-index: 1000;
  .el-result{
    padding: 20px 30px;
    width: 400px;
    position: absolute;
    left: calc(50% - 200px);
    top: 36%;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.2000);
    border-radius: 8px;
    .el-result__title{
      margin-top: 14px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
    }
    .el-result__subtitle{
      font-size: 14px;
      font-weight: 400;
      color: #000000;
    }
    .icon-success{
      fill: #3E73EE;
    }
    .el-result__extra{
      margin-top: 4px;
      span{
        font-size: 14px;
        font-weight: 400;
        color: #3B71F0;
        cursor: pointer;
      }
    }
  }
}
</style>
