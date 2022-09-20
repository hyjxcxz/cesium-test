<template>
  <el-upload
    ref="upload"
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :limit="1"
    :on-remove="handleRemove"
    :on-exceed="handleExceed"
    :auto-upload="false"
    :on-change="handleChange"
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
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
// const vm = getCurrentInstance().ctx
const emits = defineEmits(['uploaded'])
const upload = ref<UploadInstance>()
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  emits('uploaded', uploadFiles[0])
}
const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  emits('uploaded', uploadFiles[0])
}
</script>
