<template>
  <div class="home-header">
    <div class="home-header-left">
      <div class="home-header-log">
        <img
          class="logo"
          src="/favicon.ico"
          alt=""
        >
        <!-- <div class="division" /> -->
        <span class="project-title">
          决策支持服务
          <i
            class="iconfont icon-home-s go-back"
            @click="changPage"
          />
        </span>
      </div>
      <div class="home-header-menue">
        <router-link to="/support-guide">
          <span
            class="fa iconfont icon-kaifazhinan"
          />
          开发指南
        </router-link>
        <router-link to="/support-about">
          <span
            class="fa iconfont icon-guanyu"
          />
          关于
        </router-link>
      </div>
    </div>
    <div class="home-header-right" />
  </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { useStore } from '@/store/index'
// import userComponentVue from '@/layout/userComponent.vue'
// const store = useStore()
const route = useRouter()

function changPage () {
  route.push('/')
}
</script>

<style scoped lang="scss">
.home-header{
  position: fixed;
  width: 100%;
  height: 60px;
  background: #1c2531;
  border-image: linear-gradient(to bottom right,#C8C8C8 40%,#979797 100%,#C2C2C2 40%) 1;
  display: flex;
  flex-direction: row;
  z-index: 1;
  .home-header-left{
    flex:1;
    height: 100%;
    line-height: 60px;
    .home-header-log{
      width: 250px;
      height: 100%;
      float: left;
    }
    .home-header-menue{
      a{
        color: #ffffff;
        text-decoration:none;
        height:100%;
        width:50px;
        .el-icon{
          display:inline-block;
          width:40px;
          height:40px;
          color:#fff;
        }
      }
      .fa{
        display: inline-block;
        font-size: inherit;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        width: 20px;
        height: 20px;
        margin-left:10px
      }
      .router-link-active{
        background: #4f4d4d;
      }
    }
    .logo{
      // height: 26px;
      // margin:11.5px 18px;
      height: 40px;
    margin: 10px 8px 0 0;
    float: left;
    display: inline-block;
    box-sizing: border-box;
    }
    .project-title{
      font-size: 1.4em;
      font-weight: bold;
      color: white;
      line-height: 60px;
      margin-left: 8px;
      position: absolute;
      display: inline-block;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: white;
      letter-spacing: 1px;
      .go-back{
        color: #EBEEE7;
        position: absolute;
        left: 180px;
        font-size: 24px;
        cursor:pointer;
      }
    }
  }
  .home-header-right{
    flex:1;
    .home-header-right-title{
      margin-right: 18px;
      color: #EBEEE7;
      float: right;
      height: 100%;
    .iconfont{
      float: left;
      color: #EBEEE7;
      font-size: 22px;
      margin-top: 13px;
      cursor:pointer;
    }
    .user-content{
      float: left;
      cursor: pointer;
      color: #EBEEE7;
      height: 100%;
      line-height: 60px;
      margin: auto 20px;
    }
    }
  }
}
</style>
