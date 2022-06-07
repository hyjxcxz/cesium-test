<template>
  <div class="field-label">
    <span class="field-name">{{ props.label }}</span>
    <span class="field-value">
      <slot />
    </span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: { type: String, default: '暂无数据' }
})
</script>

<style lang="scss" scoped>
.field-label {
  .field-name {
    font-size: 14px;
    color: rgba(225, 226, 230, 1);
    vertical-align: middle;
    line-height: 30px;
  }
  .field-value {
    color: rgba(44, 208, 185, 1);
    font-size: 14px;
    vertical-align: middle;
  }
}
</style>
