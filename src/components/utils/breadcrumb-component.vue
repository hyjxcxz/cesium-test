<template>
  <el-breadcrumb
    :separator-icon="ArrowRight"
    class="bread"
  >
    <template
      v-for="(item, index) in props.breads.split(',')"
      :key="index"
    >
      <el-breadcrumb-item>{{ item }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
const props = defineProps({
  breads: { type: String, default: '' }
})
</script>
<style lang="scss" scoped>
.bread{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    border-bottom: 1px solid #ddddde;
    margin-bottom: 10px;
}
</style>
