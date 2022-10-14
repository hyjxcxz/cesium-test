<template>
  <el-dialog
    v-model="visible"
    :show-close="false"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <span
          :id="titleId"
          :class="titleClass"
        >
          {{ props.title }}
        </span>
        <el-icon
          class="el-icon--left"
          @click="close"
        >
          <Close />
        </el-icon>
      </div>
    </template>
    <div class="screen">
      <div class="screen-date">
        <el-date-picker
          v-model="screenDate"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
          :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
        />
        <el-button
          type="primary"
          round
          @click="screen"
        >
          确定
        </el-button>
      </div>
      <div class="screen-btn">
        <span
          v-for="item in btnData"
          :key="item.value"
          @click="changeBtnChekced(item.value)"
          :class="btnChekced === item.value ? 'screen-btn-active' : ''"
        >{{ item.title }}</span>
      </div>
    </div>
    <div id="quota-chart" />
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, watchEffect, reactive } from 'vue'
import { ElDialog } from 'element-plus'
import { Close } from '@element-plus/icons-vue'
import * as echarts from 'echarts'

const props = defineProps({
  isQuotaStatisticsChart: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ''
  }
})

const visible = ref(false)
const screenDate = ref('')
const btnChekced = ref('')
const btnData = reactive([
  {
    title: '周',
    value: 'week'
  }, {
    title: '月',
    value: 'month'
  }, {
    title: '年',
    value: 'year'
  }
])

const base = ref(+new Date(2020, 9, 3))
const oneDay = ref(24 * 3600 * 1000)
const date:any = reactive([])
const data1:any = reactive([])

for (let j = 1; j < 10; j++) {
  const now = new Date((base.value += oneDay.value))
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'))
}

for (let i = 1; i < 8; i++) {
  data1.push(Math.round(Math.random() * 20))
}

const QuotaChartData = {
  backgroundColor: '#fff',
  title: {
    text: '配额统计',
    left: 'center',
    top: '5%',
    show: false
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      label: {
        show: true,
        backgroundColor: '#fff',
        color: '#556677',
        borderColor: 'rgba(0,0,0,0)',
        shadowColor: 'rgba(0,0,0,0)',
        shadowOffsetY: 0
      },
      lineStyle: {
        width: 0
      }
    },
    backgroundColor: '#fff',
    textStyle: {
      color: '#5c6c7c'
    },
    padding: [10, 10],
    extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
  },
  grid: {
    top: '10%',
    y2: 88
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 100
    },
    {
      start: 0,
      end: 100
    }
  ],
  xAxis: [
    {
      type: 'category',
      data: date,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#DCE2E8'
        }
      },
      axisTick: {
        show: true
      },
      axisLabel: {
        interval: 0,
        textStyle: {
          color: '#556677'
        },
        fontSize: 12,
        margin: 15
      },
      axisPointer: {
        label: {
          padding: [0, 0, 10, 0],
          margin: 15,
          fontSize: 12,
          backgroundColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#fff'
              },
              {
                offset: 0.86,
                color: '#fff'
              },
              {
                offset: 0.86,
                color: '#33c0cd'
              },
              {
                offset: 1,
                color: '#33c0cd'
              }
            ],
            global: false
          }
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      },
      boundaryGap: false
    }
  ],
  yAxis: [
    {
      type: 'value',
      // name: '单位：元',
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#DCE2E8'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#556677'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      }
    }
  ],
  series: [
    {
      name: '配额统计',
      type: 'line',
      data: data1,
      symbolSize: 1,
      symbol: 'circle',
      smooth: true,
      yAxisIndex: 0,
      showSymbol: false,
      emphasis: {
        focus: 'series'
      },
      lineStyle: {
        width: 5,
        shadowColor: 'rgba(158,135,255, 0.3)',
        shadowBlur: 10,
        shadowOffsetY: 20
      },
      itemStyle: {
        color: '#9E87FF',
        borderColor: '#9E87FF'
      },
      markPoint: {
        symbol: 'pin', // 标记(气泡)的图形
        symbolSize: 50, // 标记(气泡)的大小
        itemStyle: {
          // color: '#4587E7', // 图形的颜色。
          borderColor: '#000', // 图形的描边颜色。支持的颜色格式同 color，不支持回调函数。
          borderWidth: 0, // 描边线宽。为 0 时无描边。
          borderType: 'solid' // 柱条的描边类型，默认为实线，支持 ‘solid’, ‘dashed’, ‘dotted’。
        },
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: '平均值' }]
      }
    }
  ]
}

const viewChart = () => {
  const QuotaChart = echarts.init(document.getElementById('quota-chart') as HTMLElement)
  if (QuotaChart) {
    QuotaChart.setOption(QuotaChartData, true)
  }
  window.onresize = function () {
    QuotaChart.resize()
  }
}

const changeBtnChekced = (value:string) => {
  btnChekced.value = value
  screenDate.value = ''
}

const screen = () => {
  btnChekced.value = ''
  console.log(screenDate.value)
  console.log(123)
}

watchEffect(() => {
  if (props.isQuotaStatisticsChart) {
    visible.value = true
    setTimeout(() => {
      viewChart()
    })
  }
})
</script>

<style lang="scss" scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: -16px;
  font-size: 20px;
  .el-icon{
    cursor: pointer;
  }
}
#quota-chart{
  width: 47vw;
  height: 50vh;
}
.screen{
  position: relative;
  top: 0;
  height: 80px;
  .screen-date{
    position: absolute;
    right: 0;
    .el-button{
      margin-top: -6px;
      margin-left: 8px;
    }
  }
  .screen-btn{
    position: absolute;
    right: 0;
    top: 46px;
    span{
      display: inline-block;
      width: 32px;
      height: 32px;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 32px;
      border-radius: 2px;
      cursor: pointer;
      &:hover{
        border:1px solid #409EFF;
        background: rgba(#409EFF, 0.3);
      }
    }
    .screen-btn-active{
      border:1px solid #409EFF;
      background: rgba(#409EFF, 0.5);
      &:hover{
        border:1px solid #409EFF;
        background: rgba(#409EFF, 0.5);
      }
    }
  }
}
</style>
