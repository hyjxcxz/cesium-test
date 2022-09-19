<template>
  <Header />
  <div class="content">
    <iframe
      src="src/assets/html/supportserver.html"
      frameborder="0"
      style="width: 100%; height: 100%"
      id="iframeBox"
    />
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/home/support-home-header.vue'
</script>
<style>
.content{
  width: 100vw;
  height: calc(100vh - 60px);
  top:60px;
  position:fixed;
}
</style>
