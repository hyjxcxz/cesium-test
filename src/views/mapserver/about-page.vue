<template>
  <Header />
  <div class="content">
    <iframe
      src="/html/mapserver.html"
      frameborder="0"
      style="width: 100%; height: 100%"
      id="iframeBox"
    />
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/home/mapserver-header.vue'
</script>
<style>
.content{
  width: 100vw;
  flex:1;
}
</style>
