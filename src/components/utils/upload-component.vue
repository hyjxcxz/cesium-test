<template>
  <el-tooltip
    class="box-item"
    effect="dark"
    content="kmz/kml/map/dxf/json/shp（shp格式需要压缩为zip）"
    placement="top-start"
  >
    <input
      class="taskFile"
      id="taskFile"
      type="file"
      @change="importTask($event)"
      accept=".kmz,.kml,.map,.dxf,.json,.zip"
    >
  </el-tooltip>
</template>
<script lang="ts" setup>
// import { ref } from 'vue'
// import { genFileId } from 'element-plus'
// import type { UploadProps, UploadInstance, UploadRawFile } from 'element-plus'
// const vms:any = getCurrentInstance()
// const vm:any = vms.ctx
const emits = defineEmits(['uploaded'])
// const upload:any = ref<UploadInstance>()
// const handleExceed: UploadProps['onExceed'] = (files) => {
//   upload.value.clearFiles()
//   const file = files[0] as UploadRawFile
//   upload.value.handleStart(file)
//   // file.uid = genFileId()
//   // upload.value!.submit()
// }
// const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
//   emits('uploaded', uploadFiles[0])
// }
// const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
//   emits('uploaded', uploadFiles[0].raw)
// }
function importTask (file:any) {
  const fileObj = file.target.files[0]
  emits('uploaded', fileObj)
}
</script>
