<template>
  <div
    class="info-popup"
    :class="info.class === 'default' ? '' : info.class"
  >
    <div class="info-popup-header">
      {{ info.title }}
    </div>
    <ul class="info-popup-content">
      <li
        v-for="item in info.data"
        :key="item.key"
      >
        <span class="title">{{ item.key }}</span>
        <span
          class="value"
          :class="item.status ? 'value-active' : ''"
        >{{ item.value }}</span>
      </li>
    </ul>
    <div class="info-popup-footer" />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
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
      &:nth-child(1){
        .value{
          line-height: 16px;
        }
      }
      .value-active{
        color: #47C9AD;
      }
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
    width: calc(100% - 40px);
    height: 40px;
    border-top: 1px solid #C0C8FF;
    border-left: 1px solid #C0C8FF;
    position: absolute;
    left: -2px;
    bottom: -44px;
    border-radius: 4px 0 0 0;
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
