<template>
  <div class="resource-management">
    <div class="resource-management-header">
      <span
        class="resource-management-header-tab"
        :class="checkedTab === item.code ? 'active-tab' : ''"
        v-for="item in tabList"
        :key="item.code"
        @click="changeTab(item)"
      >
        <span class="span-border" />
        {{ item.title }}
      </span>
      <div class="resource-management-header-content">
        <el-checkbox-group
          v-model="checkList"
          v-if="checkedTab === 1"
        >
          <el-checkbox
            :label="item.title"
            v-for="item in fanFarmTab"
            :key="item.code + item.title"
          />
        </el-checkbox-group>
        <el-checkbox-group
          v-model="checkList"
          v-if="checkedTab === 2"
        >
          <el-checkbox
            :label="item.title"
            v-for="item in transportTab"
            :key="item.code + item.title"
          />
        </el-checkbox-group>
      </div>
    </div>
    <div class="resource-management-content">
      <div class="resource-management-content-switch">
        <span class="switch-title">质保内风场 </span>
        <el-switch
          v-model="windField"
          class="ml-2"
          active-color="#3049FE"
          inactive-color="#595F87"
        />
        <span class="switch-title"> 已完成后评估 </span>
        <el-switch
          v-model="postEvaluation"
          class="ml-2"
          active-color="#3049FE"
          inactive-color="#595F87"
        />
        <span class="switch-title"> 已完成风险评估 </span>
        <el-switch
          v-model="riskAssessment"
          class="ml-2"
          active-color="#3049FE"
          inactive-color="#595F87"
        />
      </div>
      <div class="resource-management-content-echartsBox">
        <p class="img-title">
          <span>按规划设计统计</span>
        </p>
        <div
          id="planning-statistics"
          v-if="isShow"
        />
        <p class="img-title">
          <span>按机型分布统计</span>
        </p>
        <div
          id="model-distribution"
          v-if="isShow"
        />
        <p class="img-title">
          <span>按项目类型统计</span>
        </p>
        <div
          id="project-type"
          v-if="isShow"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
export default {
  name: 'ResourceManagement',
  emits: ['show-search'],
  setup (props:any, { emit } : any) {
    const isShow = ref(true)
    const checkedTab = ref(1)
    const checkList = ref([])
    const windField = ref(false)
    const riskAssessment = ref(false)
    const postEvaluation = ref(false)
    const tabList = reactive([
      {
        title: '风现场',
        code: 1
      }, {
        title: '运输监控',
        code: 2
      }, {
        title: '制造厂',
        code: 3
      }
    ])
    // 风场
    const fanFarmTab = reactive([
      {
        title: '工厂信息',
        code: 1
      }, {
        title: '原属信息',
        code: 2
      }, {
        title: '输变电线路',
        code: 3
      }
    ])
    // 运输
    const transportTab = reactive([
      {
        title: '制造工厂',
        code: 1
      }, {
        title: '高速路口',
        code: 2
      }
    ])
    const planningStatisticsOption = {
      color: ['#80CEFF', '#E489F2'],
      grid: {
        left: '5%',
        right: '6%',
        top: '10%',
        bottom: '6%',
        containLabel: true
      },
      legend: {
        show: true,
        top: -4,
        right: 20,
        itemWidth: 16,
        itemHeight: 12,
        textStyle: {
          fontSize: 12,
          color: '#BCCCFF'
        },
        selectedMode: 'single',
        selected: {
          在建: true
        },
        data: [
          {
            name: '在建',
            textStyle: {
              color: '#80CEFF'
            }
          },
          {
            name: '已建',
            textStyle: {
              color: '#E489F2'
            }
          }
        ]
      },
      xAxis: {
        show: true,
        type: 'category',
        axisLabel: {
          fontSize: 14,
          color: '#eeeeee'
        },
        data: ['类型一', '类型二', '类型三', '类型四', '类型五', '类型六', '类型七']
      },
      yAxis: {
        show: true,
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#3a4b61'
          }
        },
        axisLabel: {
          fontSize: 14,
          color: '#eeeeee'
        }
      },
      series: [
        {
          name: '在建',
          type: 'bar',
          barWidth: 16,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#80CEFF'
              },
              {
                offset: 1,
                color: '#453AF7'
              }
            ]),
            borderRadius: [2.7, 2.7, 0, 0]
          },
          data: [90, 113, 60, 50, 55, 77, 88]
        },
        {
          name: '已建',
          type: 'bar',
          barWidth: 32,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#E489F2'
              },
              {
                offset: 1,
                color: '#6C60FF'
              }
            ]),
            borderRadius: [2, 2, 0, 0]
          },
          data: [90, 113, 60, 50, 55, 77, 88]
        }
      ]
    }
    const modelDistributionOption = {
      color: ['#7DD420', '#4EE1C0', '#5A61EC', '#52CBFF'],
      grid: {
        left: -100,
        top: 50,
        bottom: 10,
        right: 10,
        containLabel: true
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        // orient: 'vartical',
        // x: 'right',
        top: '-5',
        right: '0',
        // bottom: '0%',
        itemWidth: 16,
        itemHeight: 12,
        itemGap: 3,
        textStyle: {
          color: '#BCCCFF',
          fontSize: 12,
          fontWeight: 0
        },
        data: ['规划', '在建', '已建']
      },
      polar: {},
      angleAxis: {
        interval: 1,
        type: 'category',
        data: [],
        z: 10,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#0B4A6B',
            width: 1,
            type: 'solid'
          }
        },
        axisLabel: {
          interval: 0,
          show: true,
          color: '#0B4A6B',
          margin: 8,
          fontSize: 16
        }
      },
      radiusAxis: {
        min: 40,
        max: 120,
        interval: 20,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#0B3E5E',
            width: 1,
            type: 'solid'
          }
        },
        axisLabel: {
          formatter: '{value} %',
          show: false,
          padding: [0, 0, 20, 0],
          color: '#0B3E5E',
          fontSize: 16
        },
        splitLine: {
          lineStyle: {
            color: '#0B3E5E',
            width: 2,
            type: 'solid'
          }
        }
      },
      calculable: true,
      series: [
        {
          type: 'pie',
          radius: ['5%', '10%'],
          labelLine: {
            show: false,
            length: 30,
            length2: 55
          },
          data: [
            {
              name: '',
              value: 0,
              itemStyle: {
                color: '#0B4A6B'
              }
            }
          ]
        },
        {
          type: 'pie',
          radius: ['90%', '95%'],
          labelLine: {
            show: false,
            length: 30,
            length2: 55
          },
          name: '',
          data: [
            {
              name: '',
              value: 0,
              itemStyle: {
                color: '#0B4A6B'
              }
            }
          ]
        },
        {
          stack: 'a',
          type: 'pie',
          radius: ['20%', '80%'],
          roseType: 'area',
          zlevel: 10,
          label: {
            show: true,
            formatter: '{c}',
            fontSize: 12,
            position: 'outside'
          },
          labelLine: {
            show: true,
            length: 20,
            length2: 55
          },
          data: [
            {
              value: 20,
              name: '规划'
            },
            {
              value: 30,
              name: '在建'
            },
            {
              value: 50,
              name: '已建'
            }
          ]
        }
      ]
    }
    const projectTypeEchartsOption = {
      color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}%'
      },
      calculable: true,
      series: [
        {
          name: 'DATA',
          type: 'funnel',
          left: 80,
          right: 80,
          top: '20%',
          min: 0,
          maxSize: '100%',
          sort: 'descending',
          gap: 4,
          label: {
            show: true,
            position: 'right'
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          data: [
            {
              value: 10,
              name: '10%'
            },
            {
              value: 20,
              name: '20%'
            },
            {
              value: 30,
              name: '30%'
            },
            {
              value: 40,
              name: '40%'
            }
          ]
        }
      ]
    }
    function changeTab (tab:any) {
      if (checkedTab.value !== tab.code) {
        checkedTab.value = tab.code
        checkList.value = []
      }
      emit('show-search', tab)// 展示搜索框
    }
    onMounted(() => {
      isShow.value = true
      const planningStatisticsEcharts = echarts.init(document.getElementById('planning-statistics') as HTMLElement) // 按规划设计统计
      const modelDistributionEcharts = echarts.init(document.getElementById('model-distribution') as HTMLElement) // 按机型分布统计
      const projectTypeEcharts = echarts.init(document.getElementById('project-type') as HTMLElement) // 按项目类型统计
      if (planningStatisticsEcharts) {
        planningStatisticsEcharts.setOption(planningStatisticsOption, true)
        modelDistributionEcharts.setOption(modelDistributionOption, true)
        projectTypeEcharts.setOption(projectTypeEchartsOption, true)
      }
      window.onresize = function () {
        planningStatisticsEcharts.resize()
        modelDistributionEcharts.resize()
        projectTypeEcharts.resize()
      }
    })
    onUnmounted(() => {
      isShow.value = false
    })
    return {
      tabList,
      checkedTab,
      changeTab,
      fanFarmTab,
      checkList,
      transportTab,
      windField,
      riskAssessment,
      postEvaluation,
      isShow
    }
  }
}
</script>

<style scoped lang="scss">
.resource-management{
  width: 420px;
  height: 100%;
  background: rgba(#141726,0.7);
  color: #BCCCFF;
  border-left:1px solid rgba(#C0C8FF,0.7);
  .resource-management-header{
    margin: 10px 10px;
    border-bottom: 1px dashed #C0C8FF;
    .resource-management-header-tab{
      display: inline-block;
      border: 1px solid #C0C8FF;
      padding: 0 10px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #BCCCFF;
      line-height: 20px;
      margin:6px 5px 10px 5px;
      cursor:pointer;
      position: relative;
      &::before{
        content: '';
        display: inline-block;
        width: 0px;
        height: 0px;
        border-top: -8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 8px solid #C0C8FF;
        position: absolute;
        left: 0px;
        top: 0px;
      }
      &::after{
        content: '';
        display: inline-block;
        width: 0px;
        height: 0px;
        border-top: -8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 8px solid #141726;
        position: absolute;
        left: -1px;
        top: -1px;
      }
      .span-border {
        display: inline-block;
        position: absolute;
        right: 0;
        &::before{
          content: '';
          display: inline-block;
          width: 0px;
          height: 0px;
          border-top: 8px solid transparent;
          border-bottom: -8px solid transparent;
          border-right: 8px solid #C0C8FF;
          position: relative;
          right: -8px;
          top: 5px;
        }
        &::after{
          content: '';
          display: inline-block;
          width: 0px;
          height: 0px;
          border-top: 8px solid transparent;
          border-bottom: -8px solid transparent;
          border-right: 8px solid #141726;
          position: relative;
          right: -1px;
          top: 6px;
        }
      }
    }
    .active-tab{
      background: rgba(48, 73, 254, 0.2);
      border: 1px solid #3049FE;
      color: #30FBFE;
      &::before{
        content: '';
        display: inline-block;
        width: 0px;
        height: 0px;
        border-top: -8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 8px solid #30FBFE;
        position: absolute;
        left: 0px;
        top: 0px;
      }
      &::after{
        content: '';
        display: inline-block;
        width: 0px;
        height: 0px;
        border-top: 0px solid transparent;
        border-bottom: 0px solid transparent;
        border-right: 0px solid #141726;
        position: absolute;
        right: -1px;
        top: -1px;
      }
      .span-border {
        &::before{
          content: '';
          display: inline-block;
          width: 0px;
          height: 0px;
          border-top: 8px solid transparent;
          border-bottom: -8px solid transparent;
          border-right: 8px solid #3049FE;
          position: relative;
          right: -8px;
          top: 6px;
        }
        &::after{
          content: '';
          display: inline-block;
          width: 0px;
          height: 0px;
          border-top: 8px solid transparent;
          border-bottom: -8px solid transparent;
          border-right: 8px solid #141726;
          position: relative;
          right: -1px;
          top: 6px;
        }
      }
    }
    .resource-management-header-content{
      margin: 0 5px 10px 5px;
    }
  }
  .resource-management-content{
    margin: 0 10px;
    height: calc(100% - 110px);
    .resource-management-content-switch{
      .switch-title{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #BCCCFF;
      }
    }
    .resource-management-content-echartsBox{
      width: 100%;
      height: calc(100% - 40px);
      display: flex;
      flex-direction: column;
      .img-title{
        height: 20px;
        margin: 10px 0 0 0;
        background: url("/images/home/title.svg") no-repeat center / 100%;
        &::before{
          content: '';
          display: inline-block;
          width: 0px;
          height: 0px;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 5px solid #30FBFE;
          position: relative;
          left: 0px;
          top: -6px;
        }
        &::after{
          content: '';
          display: inline-block;
          width: 0px;
          height: 0px;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 5px solid rgba(#30FBFE,0.2);
          position: relative;
          left: -120px;
          top: -6px;
        }
        span{
          display: inline-block;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 20px;
          text-indent: 1em;
          position: relative;
          top: -10px;
        }
      }
      #planning-statistics{
       height: 20vh;
      }
      #model-distribution{
        height: 20vh;
      }
      #project-type{
        height: 20vh;
      }
    }
  }
}
</style>
