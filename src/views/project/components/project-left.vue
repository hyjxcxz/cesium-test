<template>
  <div class="project-left">
    <div class="project-left-header">
      <el-tooltip
        v-if="detail.name && detail.name.length > 13"
        class="box-item"
        effect="dark"
        :content="detail.name"
        placement="bottom"
      >
        <span class="ellipsis">{{ detail.name || '-' }}</span>
      </el-tooltip>
      <span
        v-else
        class="ellipsis"
      >{{ detail.name || '-' }}</span>
      <span>
        <i class="iconfont icon-zonghe" />
      </span>
      <span @click="changShowFun">
        <i class="iconfont icon-fanhui" />
      </span>
    </div>
    <div
      v-show="isShowFun"
      class="project-left-content"
    >
      <div
        v-for="item in tabList"
        :key="item.code"
        class="project-left-content-item"
      >
        <span
          class="project-left-content-item-title"
          :class="item.checked ? 'project-left-content-item-active' : ''"
          @click="changeTab(item)"
        >{{ item.title }}</span>
        <BasicInformation v-show="item.code === 1 && item.checked" />
        <OperationInformation v-show="item.code === 2 && item.checked" />
        <RiskDeduction v-show="item.code === 3 && item.checked" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watchEffect } from 'vue'
// import { useRouter } from 'vue-router'
// import gwmap from '@/gwmap/index'
import { useStore } from '@/store/index'

import BasicInformation from './components/basic-information.vue'
import OperationInformation from './components/operation-information.vue'
import RiskDeduction from './components/risk-deduction.vue'

const store = useStore()
// const route = useRouter()
const detail:any = ref(store.state.wind.windfarmDetail)
const tabList = reactive([
  {
    title: '风场基础信息',
    code: 1,
    checked: true
  }, {
    title: '风场运行信息',
    code: 2,
    checked: false
  }, {
    title: '风险推演仿真',
    code: 3,
    checked: false
  }
])
const isShowFun = ref(true)

function changShowFun () {
  isShowFun.value = !isShowFun.value
}

function changeTab (val: any) {
  tabList.map(item => {
    if (item.code !== val.code) {
      item.checked = false
    } else if (item.code === val.code && !val.checked) {
      item.checked = true
    }
    return item
  })
}

watchEffect(() => {
  detail.value = store.state.wind.windfarmDetail
})

</script>

<style scoped lang="scss">
.project-left{
  position: fixed;
  left: 10px;
  top: 60px;
  width: 200px;
  height: calc(100% - 80px);
  .project-left-header{
    width: calc(100% + 80px);
    height: 40px;
    background: linear-gradient(270deg, rgba(0, 0, 0, 0.25) 0%, rgba(48, 73, 254, 0) 0%, rgba(0, 9, 71, 0.38) 0%, #3049FE 75%, #000D6D 100%);
    border-radius: 12px 0px 12px 0px;
    border: 1px solid #8D96DB;
    span{
      display: inline-block;
      width: 38px;
      height: 40px;
      &:first-child{
        width: 200px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 40px;
        text-indent: 1em;
      }
      &:nth-child(2){
        border-left: 1px solid #8D96DB;
        line-height: 40px;
        cursor:pointer;
        position: absolute;
        right:-40px;
        top: 0;
        i{
          height: 40px;
          color: #30FBFE;
          font-size: 16px;
          position: relative;
          left: 10px;
        }
      }
      &:last-child{
        border-left: 1px solid #8D96DB;
        line-height: 40px;
        cursor:pointer;
        position: absolute;
        right:-80px;
        top: 0;
        i{
          color: #FFFFFF;
          font-size: 16px;
          position: relative;
          left: 10px;
        }
      }
    }
  }
  .project-left-content{
    width: 100%;
    height: calc(100% - 50px);
    margin-top: 6px;
    background: rgba(#141726, 0.7);
    border: 1px solid rgba(192, 200, 255, 0.4);
    .project-left-content-item{
      .project-left-content-item-title{
        display: inline-block;
        width: calc(100% - 1px);
        height: 36px;
        background: linear-gradient(270deg, rgba(48, 73, 254, 0.14) 0%, rgba(48, 73, 254, 0.5) 100%);
        border: 1px solid rgba(192, 200, 255, 0.26);
        line-height: 36px;
        text-indent: 1em;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        position: relative;
        cursor:pointer;
         &::before{
          content: '';
          display: inline-block;
          width: 0px;
          height: 0px;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 5px solid #30FBFE;
          position: absolute;
          left: 170px;
          top: 12px;
        }
        &::after{
          content: '';
          display: inline-block;
          width: 0px;
          height: 0px;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 5px solid rgba(#30FBFE,0.2);
          position: absolute;
          left: 167px;
          top: 12px;
        }
      }
      .project-left-content-item-active{
        border-left:2px solid #2DE7F2;
        width: calc(100% - 2px);
        &::before{
          content: '';
          display: inline-block;
          width: 0px;
          height: 0px;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid #30FBFE;
          position: absolute;
          left: 164px;
          top: 8px;
        }
        &::after{
          content: '';
          display: inline-block;
          width: 0px;
          height: 0px;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid rgba(#30FBFE,0.2);
          position: absolute;
          left: 164px;
          top: 11px;
        }
      }
    }
  }
}
</style>
