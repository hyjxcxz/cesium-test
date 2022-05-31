<template>
  <div class="measuring-tools">
    <el-radio-group
      v-model="checked"
      @change="controlsClick"
    >
      <el-radio
        v-for="item in tabList"
        :key="item.code + item.title"
        :label="item.code"
        size="large"
      >
        {{ item.title }}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
import gwmap from '@/gwmap/index'
export default {
  name: 'MeasuringTools',
  setup () {
    const checked = ref(null)
    const tabList = reactive([
      {
        title: '测面',
        code: 1
      }, {
        title: '测距',
        code: 2
      }
    ])

    function controlsClick () {
      gwmap.mapControlManager.active('measureArea')
    }

    return {
      checked,
      tabList,
      controlsClick
    }
  }
}
</script>

<style scoped lang="scss">
.measuring-tools{
  width: 390px;
  height: 100%;
  background: rgba(#141726,0.7);
  border-left:1px solid rgba(#C0C8FF,0.4);
  padding: 0 5px;
}
</style>
