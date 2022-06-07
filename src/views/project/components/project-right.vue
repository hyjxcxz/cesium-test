<template>
  <div class="project-right">
    <div class="measure-tool">
      <span
        class="measure-tool-btn"
        :class="isShowMeasureTool ? 'measure-tool-btn-active' : ''"
        @click="changeShowToll(true)"
      >
        <i class="iconfont icon-chizi-celiang-" />
      </span>
      <div
        class="measure-tool-box"
        v-if="isShowMeasureTool"
      >
        <span
          class="colse-box"
          @click="changeShowToll(false)"
        >
          <i class="iconfont icon-guanbi" />
        </span>
        <span
          v-for="item in measureToolBtn"
          :key="item.class"
          :class="item.checked ? ' measure-tool-item-active' : ''"
          @click="changeMeasureToolBtn(item)"
        >
          <i
            class="iconfont"
            :class="item.class"
          />
        </span>
      </div>
    </div>
    <ul>
      <li
        v-for="item in tabList"
        :key="item.code + item.title"
        :class="item.checked ? 'item-active' : ''"
        @click="changeTab(item)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import gwmap from '@/gwmap/index'

const tabList = reactive([
  {
    title: '项目信息',
    code: 1,
    checked: true
  }, {
    title: '机组履历',
    code: 2,
    checked: false
  }, {
    title: '物流运输',
    code: 3,
    checked: false
  }, {
    title: '风险评估',
    code: 4,
    checked: false
  }
])
const isShowMeasureTool = ref(false)
const measureToolBtn = reactive([
  {
    title: '测距',
    class: 'icon-juli',
    checked: false
  }, {
    title: '测面',
    class: 'icon-mianji',
    checked: false
  }, {
    title: '清除',
    class: 'icon-qingchucachu',
    checked: false
  }
])
function changeTab (val:any) {
  tabList.map(item => {
    if (item.code !== val.code) {
      item.checked = false
    } else if (item.code === val.code && !val.checked) {
      item.checked = true
    }
    return item
  })
}
function changeShowToll (flag: boolean) {
  isShowMeasureTool.value = flag
  if (!flag) {
    gwmap.mapControlManager.disactive('measure')
    measureToolBtn.map(item => {
      item.checked = false
      return item
    })
  }
}

function changeMeasureToolBtn (val:any) {
  if (val.title === '测距') {
    gwmap.mapControlManager.active('measureLength')
  } else if (val.title === '测面') {
    gwmap.mapControlManager.active('measureArea')
  } else if (val.title === '清除') {
    gwmap.mapControlManager.disactive('measure')
  }
  measureToolBtn.map(item => {
    if (item.class !== val.class) {
      item.checked = false
    } else if (item.class === val.class && !val.checked) {
      item.checked = true
    }
    return item
  })
}
</script>

<style scoped lang="scss">
.project-right{
  position: fixed;
  top: 50px;
  right: 26px;
  width: 60px;
  height: calc(100% - 50px);
  border-right: 1px solid;
  border-image: linear-gradient(to bottom right,#C8C8C8 32%,#979797 100%,#C2C2C2 40%) 1;
  .measure-tool{
    width: 160px;
    height: 40px;
    position: relative;
    top: 32%;
    right: 80px;
    .measure-tool-btn{
      width: 28px;
      height: 28px;
      position: absolute;
      top: 5px;
      right: 4px;
      background: #141726;
      border-radius: 4px;
      border: 1px solid #3049FE;
      text-align: center;
      line-height: 28px;
      cursor:pointer;
      .iconfont{
        color: #fff;
        font-size: 20px;
      }
    }
    .measure-tool-btn-active{
      background: rgba(48, 73, 254, 0.7);
      border: 1px solid #878A8A;
    }
    .measure-tool-box{
      position: absolute;
      top: 5px;
      left: 0;
      width: 100px;
      height: 28px;
      background: #141726;
      border-radius: 4px;
      border: 1px solid #3049FE;
      .colse-box{
        display: inline-block;
        width: 15px;
        height: 16px;
        background: #3049FE;
        border-radius: 50%;
        color: #fff;
        position: absolute;
        right: -7px;
        top: -7px;
        text-align: center;
        line-height: 15px;
        .iconfont{
          font-size: 10px;
        }
      }
      span{
        cursor:pointer;
        width: 30px;
        display: inline-block;
        margin-left: 2px;
        text-align: center;
        .iconfont{
          color: #fff;
          font-size: 26px;
        }
        &:nth-child(3){
          .iconfont{
            position: relative;
            top: -2px;
            font-size: 20px;
          }
        }
      }
      .measure-tool-item-active{
        .iconfont{
          color: #3049FE;
        }
      }
    }
  }
  ul{
    margin: 0;
    padding: 0;
    width: 120px;
    position: relative;
    top: 35%;
    right: 40px;
    li{
      color: #fff;
      list-style-type: none;
      height: 32px;
      line-height: 32px;
      padding: 0 6px 0 6px;
      border-radius: 11px 0px 11px 0px;
      margin-bottom: 16px;
      cursor:pointer;
      &::before{
        content:'';
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: #fff;
        border-radius: 50%;
        position: relative;
        top: 0px;
        left: 90px;
      }
      &::after{
        content:'';
        display: inline-block;
        width: 12px;
        height: 1px;
        background-color: #fff;
        position: relative;
        top: -4px;
        right: -4px;
      }
    }
    .item-active{
      background: #3049FE;
      &::before{
        background-color: #30FBFE;
      }
      &::after{
        background-color: #30FBFE;
      }
    }
  }
}
</style>
