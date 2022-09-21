<template>
  <el-input
    v-model="exampleStrings"
    type="textarea"
    autosize
    placeholder="请输入参数"
    @input="changeContent"
  />
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
const props = defineProps({
  exampleString: { type: String, default: '' }
})
const exampleStrings:any = ref()
watchEffect(() => {
  if (props.exampleString) {
    exampleStrings.value = JSON.parse(JSON.stringify(props.exampleString))
  }
})
const emits = defineEmits(['param'])

function changeContent () {
  emits('param', exampleStrings.value)
}
</script>
