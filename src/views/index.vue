<template >
  <div class="home">
    <div class="home-header">
    </div>
    <div class="home-content">
      <div class="home-content-left">

      </div>
      <div class="home-content-right">

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'HomeCom',
  setup () {
    const a = ref(0)
    return {
      a
    }
  }
}
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .home-header{
    height: 60px;
    border-bottom: 1px solid #ccc;
  }
  .home-content{
    flex:1;
    display: flex;
    flex-direction: row;
    .home-content-left{
      flex:1;
      border-right:1px solid #ccc;
    }
    .home-content-right{
      width: 500px;
    }
  }
}
</style>
