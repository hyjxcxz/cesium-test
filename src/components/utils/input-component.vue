<template>
  <el-input
    v-model="exampleStrings"
    type="textarea"
    placeholder="请输入参数"
    @input="changeContent"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps({
  exampleString: { type: String, default: '' }
})
const emits = defineEmits(['param'])
const exampleStrings:string = ref(props.exampleString)
function changeContent () {
  emits('param', exampleStrings.value)
}
</script>
