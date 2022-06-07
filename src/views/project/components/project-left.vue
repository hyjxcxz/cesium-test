<template>
  <div class="project-left">
    <div class="project-left-header">
      <span>河北张家口红松风电场</span>
      <span>
        <i class="iconfont icon-zonghe" />
      </span>
      <span @click="changPage">
        <i class="iconfont icon-fanhui" />
      </span>
    </div>
    <div class="project-left-content">
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
        <ul
          v-if="item.code === 1 && item.checked"
          class="project-left-content-item-content"
        >
          <li
            v-for="v in fanInfoTab"
            :key="v.title + v.code"
            class="project-left-content-item-content-first"
          >
            <el-checkbox
              v-model="v.checked"
              :label="v.title"
            />
          </li>
        </ul>
        <ul
          v-if="item.code === 2 && item.checked"
          class="project-left-content-item-content"
        >
          <li> {{ item.title }} </li>
        </ul>
        <ul
          v-if="item.code === 3 && item.checked"
          class="project-left-content-item-content"
        >
          <li> {{ item.title }} </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
// import gwmap from '@/gwmap/index'
const route = useRouter()
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

const fanInfoTab = reactive([
  {
    title: '道路',
    code: 1,
    checked: false
  }, {
    title: '线路',
    code: 2,
    checked: false
  }, {
    title: '升压站',
    code: 3,
    checked: false
  }, {
    title: '测风雷达',
    code: 4,
    checked: false
  }, {
    title: '规划风机',
    code: 5,
    checked: false
  }, {
    title: '规划地形',
    code: 6,
    checked: false
  }
])

function changPage () {
  route.push('/')
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
        cursor:pointer;
      }
      .project-left-content-item-active{
        border-left:2px solid #2DE7F2;
        width: calc(100% - 2px);
      }
      .project-left-content-item-content{
        margin: 0;
        padding: 0;
        color: #fff;
        li{
          list-style-type: none;
        }
        .project-left-content-item-content-first{
          padding: 0 16px;
        }
      }
    }
  }
}
</style>
