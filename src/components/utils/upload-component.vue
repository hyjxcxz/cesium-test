<template>
  <el-upload
    ref="upload"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
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
import { getCurrentInstance } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadProps, UploadRawFile } from 'element-plus'
const vms:any = getCurrentInstance()
const vm:any = vms.ctx
const emits = defineEmits(['uploaded'])
// const upload = ref<UploadInstance>()
const handleExceed: UploadProps['onExceed'] = (files) => {
  vm._.refs.upload.clearFiles(files[0])
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  vm._.refs.upload.handleStart(file)
  // upload.value!.submit()
}
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  emits('uploaded', uploadFiles[0])
}
const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  emits('uploaded', uploadFiles[0].raw)
}
</script>
