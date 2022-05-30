<template>
  <div class="screen-list">
    <ul v-if="searchlist.length>0">
      <li
        v-for="(item,index) in searchlist"
        :key="index"
        @click="listClick(item)"
      >
        <el-tooltip
          class="box-item"
          effect="light"
          :content="item.project_name"
          placement="top"
        >
          <span>{{ item.project_name }}</span>
        </el-tooltip>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" set>
export default {
  name: 'SearchListComponent',
  props: {
    searchlist: {
      type: Array, default () { return [] }
    }
  },
  emits: ['schear-list-click'],
  setup (props:any, { emit }:any) {
    function listClick (item:Object) {
      emit('schear-list-click', item)
    }
    return {
      listClick
    }
  }

}

</script>
<style scoped lang="scss">
.screen-list{
    width: 265px;
    max-height:calc(100% - 250px) ;
    background: #262B4D;
    opacity: 0.8;
    color: #ffff;
    overflow: auto;
    ul{
        padding-inline-start:0px;
        padding-inline-end:0px;
        li{
            cursor: pointer;
            list-style-type: none;
            height: 27px;
            padding: 5px 2px;
            border: 1px solid #262B4D;
            color: #BCCCFF;
            font-weight: 400;
            width: 255px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            span{
                font-size: 14px;
                padding-left: 12px;
                text-align: center;
                font-family: PingFangSC-Regular, PingFang SC;
                vertical-align: middle;
            }
            &:hover{
                background: rgba(48, 73, 254, 0.2);
                opacity: 0.7;
                border: 1px solid #3049FE;
                color: #617FFB;
            }
    }
    }

}
</style>
