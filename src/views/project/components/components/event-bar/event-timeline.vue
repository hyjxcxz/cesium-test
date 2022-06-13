<template>
  <div v-if="dataSource !== null">
    <div
      class="event-timeline"
      id="timeline"
      ref="timeline"
      @mousewheel="containerMousewheel"
    >
      <div
        class="timeline-item"
        v-for="(item,index) in dataSource"
        :key="'event'+index"
      >
        <EventInfoPanel :event-data="item" />
        <EventNode
          :id="'node'+ index"
          :node-data="item"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

import EventInfoPanel from './event-info-panel.vue'
import EventNode from './event-node.vue'

const props:any = defineProps({
  dataSource: {
    type: Array,
    default: () => []
  }
})

const dataSource:any = reactive(props.dataSource)
const timeline:any = ref(null)

function containerMousewheel ({ wheelDelta }:any) {
  timeline.value.scrollLeft -= wheelDelta
}
</script>

<style lang="scss" scoped>
 #timeline{
    display: flex;
  }
.timeline-item{
  position: relative;
  &:first-child{
    &::before{
      content: "";
      width: 4px;
      height: 4px;
      background-color: #fff;
      border-radius: 50%;
      position: absolute;
      // left: -15px;
      bottom: 28px;
    }
  }
  &:last-child{
    &:after{
      content: "";
      width: 4px;
      height: 4px;
      background-color: #fff;
      border-radius: 50%;
      position: absolute;
      right: 10px;
      bottom: 28px;
    }
  }
}
</style>
