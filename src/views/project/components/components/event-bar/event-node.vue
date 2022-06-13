<template>
  <div class="event-timeline-node">
    <div class="date-timeline">
      <div class="inner_circle" />
    </div>
    <div class="date-text">
      {{ time || '' }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props:any = defineProps({
  nodeData: {
    type: Object,
    default: () => {}
  }
})

const nodeData:any = ref(props.nodeData)
const time = new Date(nodeData.value.time).toLocaleDateString()
</script>

<style lang="scss" scoped>
.event-timeline-node{
  width: 150px;
  text-align: center;
  color: #fff;
  .date-timeline{
    position: relative;
    width: 100%;
    height: 13px;
    .inner_circle{
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: #fff;
      display: inline-block;
      margin-bottom: 2px;
      &::before{
        content: "";
        width: 12px;
        height: 7px;
        line-height: 7px;
        background-color: #3049FE;
        position: absolute;
        left: calc(50% - 6px);
        top: 12px;
        z-index: -1;
        border-radius: 0 0 6px 6px;
      }
    }
    &:after{
      content: "";
      background: #FFFFFF;
      width: calc(100% + 5px);
      height: 1px;
      position: absolute;
      left: 0;
      bottom: 1px;
      margin: 0  25px 0 -15px;
    }
  }
  .date-text{
    margin-top: 6px;
  }
}
</style>
