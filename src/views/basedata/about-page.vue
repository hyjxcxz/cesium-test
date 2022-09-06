<template>
  <Header />
  <div class="content">
    关于
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/home/home-header.vue'
</script>
<style>
.content{
  width: 100vw;
  height: calc(100vh - 60px);
  top:60px;
  position:fixed;
}
</style>
