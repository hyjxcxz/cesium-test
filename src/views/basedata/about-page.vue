<template>
  <Header />
  <div class="content">
    <iframe
      src="/html/baseserver.html"
      frameborder="0"
      style="width: 100%; height: 100%"
      id="iframeBox"
    />
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/home/base-header.vue'
</script>
<style>
</style>
