<template>
  <h1>{{ test }}</h1>
</template>
<script lang="ts" setup>

import { requestApi } from '@/utils/request-util'
const test = 'test'
requestApi(
  'getTaskStatus',
  null,
  (res:any) => {
    console.log(res)
  }, null)
</script>
