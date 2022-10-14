<template>
  <el-input
    v-model="value"
    class="search-input"
    :suffix-icon="Search"
    :placeholder="props.placeholder"
    clearable
    :style="{width: props.width}"
    :size="props.size"
    @change="emits('searchValue', value)"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const value = ref('')
const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '200'
  },
  size: {
    type: String,
    default: 'default'
  }
})
const emits = defineEmits(['searchValue'])
</script>
<style lang="scss" scoped>
</style>
