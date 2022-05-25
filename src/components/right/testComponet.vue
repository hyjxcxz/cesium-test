<template>
  <h1>{{ test }}</h1>
</template>
<script lang="ts" setup>

import { requestApi } from '@/utils/request-util'
const test = 'test'
requestApi(
  'deleteAssignTaskWeekProgress',
  null,
  (res:any) => {
  }, [''])
</script>
