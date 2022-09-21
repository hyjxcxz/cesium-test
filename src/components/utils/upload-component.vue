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
const emits = defineEmits(['uploaded'])
function importTask (file:any) {
  const fileObj = file.target.files[0]
  emits('uploaded', fileObj)
}
</script>
