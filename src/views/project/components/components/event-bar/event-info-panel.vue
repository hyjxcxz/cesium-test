<template>
  <div
    class="event-info-panel"
    @click="panelClick"
  >
    <i
      class="event-icon iconfont icon-editor2b"
    />
    <el-tooltip
      :content="eventData && eventData.title"
      effect="dark"
      placement="top"
    >
      <span
        class="event-title"
      >
        {{ eventData && eventData.title }}
        <i
          v-if="showFileIcon"
          class="iconfont icon-fujian file-icon"
        />
      </span>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { watchEffect, ref, reactive } from 'vue'

const props:any = defineProps({
  eventData: {
    type: Object,
    default: () => {}
  }
})

const eventData:any = reactive(props.eventData)
const emits = defineEmits(['showDetail'])

const showFileIcon = ref(false)
function panelClick () {
  emits('showDetail', props.eventData)
}

watchEffect(() => {
  if (eventData && eventData.projectEventFileList && eventData.projectEventFileList.length !== 0) {
    showFileIcon.value = true
  } else {
    showFileIcon.value = false
  }
})
</script>

<style lang="scss" scoped>
.event-info-panel {
  display: inline-block;
  line-height: unset;
  width: 100px;
  height: 54px;
  background: rgba(20, 23, 38, 0.7);
  border-radius: 4px;
  padding: 10px 13px;
}
.event-icon {
  position: absolute;
  left: 2px;
  top: 20px;
  color: #3049FE;
}
.event-title {
  width: 100px;
  position: absolute;
  padding: 8px 10px 0 20px;
  left: 2px;
  top: 10px;
  color: rgba(255, 255, 255, 1);
  font-size: 13px;
  line-height: unset;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

}

.file-icon {
  position: relative;
  top: 1px;
}
</style>
