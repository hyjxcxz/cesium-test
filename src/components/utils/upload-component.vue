<template>
  <el-upload
    ref="upload"
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="true"
    :http-request="uploadRequest"
  >
    <template #trigger>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="kmz/kml/map/dxf/json/shp（shp格式需要压缩为zip）"
        placement="top-start"
      >
        <el-button
          size="small"
          type="primary"
        >
          上传
        </el-button>
      </el-tooltip>
    </template>
    <!-- <span class="file-name">{{ filename }}</span> -->
  </el-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadRawFile } from 'element-plus'
// const vm = getCurrentInstance().ctx
const emits = defineEmits(['uploaded'])
const upload = ref<UploadInstance>()
function handleExceed (files:any) {
  const file = files[0] as UploadRawFile
  updata(file)
}
function uploadRequest (option:any) {
  const file = option.file as UploadRawFile
  updata(file)
}
function updata (file:any) {
  // eslint-disable-next-line no-debugger
  debugger
  if (upload.value) {
    upload.value.clearFiles()
  }
  file.uid = genFileId()
  if (upload.value) {
    upload.value.handleStart(file)
  }
  emits('uploaded', file)
}
</script>
