<script setup lang="ts">
import { ref } from 'vue'
 
const msg = ref('Hello')
const count = ref(710)
</script>
 
<template>
  <h2>{{ msg }}</h2>
  <h2>{{ count }}</h2>
</template>
 
<style scoped>
</style>