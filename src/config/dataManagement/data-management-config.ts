export const dataManagement = [
  {
    type: 0,
    name: '气象格点数据',
    children: [
      {
        layerId: 'ERA5',
        layerName: 'ERA5气象数据'
      },
      {
        layerId: 'Merr2',
        layerName: 'Merr2气象数据'
      }
    ]
  },
  {
    type: 1,
    name: '气象统计数据',
    children: [
      {
        layerId: 'ws100',
        layerName: '风速',
        layerCategory: 'zcd',
        unit: 'm/s',
        legendComponent: 'image-legend',
        // 以下配置从服务获取
        // 'StartTime': 1293811200,
        // 'EndTime': 1325343600,
        // 'Interval': 3600,
        // 'Extent': {
        //   'XMin': 69.875000,
        //   'YMin': 14.875000,
        //   'XMax': 135.125000,
        //   'YMax': 55.125000
        // },
        styleConfig: {
          opacity: 100
        }
      },
      {
        layerId: 'wd100',
        layerName: '风向',
        layerCategory: 'zcd',
        unit: '°',
        legendComponent: 'image-legend',
        chartType: 2, // 风向图表
        styleConfig: {
          opacity: 100
        }
      },
      {
        layerId: 't2m',
        layerName: '温度',
        layerCategory: 'zcd',
        unit: '°C',
        legendComponent: 'image-legend',
        chartType: 1, // 年季月统计图表
        styleConfig: {
          opacity: 100
        }
      },
      {
        layerId: 'sp',
        layerName: '气压',
        layerCategory: 'zcd',
        unit: 'Pa',
        legendComponent: 'image-legend',
        chartType: 1, // 年季月统计图表
        styleConfig: {
          opacity: 100
        }
      },
      {
        layerId: '0711',
        layerName: '风速',
        layerCategory: 'cqtj',
        legendComponent: 'slider-legend',
        unit: 'm/s',
        layerConfig: {
          type: 'wms',
          url: '/mapBaseUrl/geoserver/windresource/wms',
          layers: 'windresource:C_speed_H100m_raw',
          version: '1.1.0',
          transparent: 'true',
          format: 'image/png'
        },
        styleConfig: {
          styleType: 'ColorMap',
          opacity: 100,
          legendStep: 0.89,
          legendMin: 0,
          ColorMapEntries: [
            { color: '#3985BF', opacity: 0, filter: true, quantity: '0.0' },
            { color: '#3399FF', opacity: 100, quantity: '0.89' },
            { color: '#79C5FF', opacity: 100, quantity: '1.78' },
            { color: '#00FFFF', opacity: 100, quantity: '2.67' },
            { color: '#3FFA77', opacity: 100, quantity: '3.56' },
            { color: '#AFFF71', opacity: 100, quantity: '4.45' },
            { color: '#EAFF71', opacity: 100, quantity: '5.34' },
            { color: '#FFCC33', opacity: 100, quantity: '6.23' },
            { color: '#FF7714', opacity: 100, quantity: '7.12' },
            { color: '#F25F5A', opacity: 100, quantity: '8.01' },
            { color: '#F52F28', opacity: 100, quantity: '8.9' },
            { color: '#F22E27', opacity: 100, quantity: '9.79' },
            { color: '#FF2600', opacity: 100, quantity: '10.68' },
            { color: '#FF0000', opacity: 100, quantity: '11.6' }
          ]
        }
      },
      {
        layerId: '0707',
        layerName: '风切变70~150m',
        layerCategory: 'cqtj',
        legendComponent: 'slider-legend',
        layerConfig: {
          type: 'wms',
          url: '/mapBaseUrl/geoserver/windresource/wms',
          layers: 'windresource:C_shear_70_150_data',
          version: '1.1.0',
          transparent: 'true',
          format: 'image/png'
        },
        styleConfig: {
          styleType: 'ColorMap',
          opacity: 100,
          legendStep: 0.05,
          legendMin: 0,
          ColorMapEntries: [
            { color: '#3399FF', opacity: 100, quantity: '0.05' },
            { color: '#79C5FF', opacity: 100, quantity: '0.1' },
            { color: '#00FFFF', opacity: 100, quantity: '0.15' },
            { color: '#3FFA77', opacity: 100, quantity: '0.2' },
            { color: '#AFFF71', opacity: 100, quantity: '0.25' },
            { color: '#EAFF71', opacity: 100, quantity: '0.3' },
            { color: '#FFCC33', opacity: 100, quantity: '0.35' },
            { color: '#FF7714', opacity: 100, quantity: '0.4' },
            { color: '#F25F5A', opacity: 100, quantity: '0.45' },
            { color: '#FF2600', opacity: 100, quantity: '0.5' },
            { color: '#FF0000', opacity: 100, quantity: '0.55' }
          ]
        }
      },
      {
        layerId: '0702',
        layerName: '空气密度',
        layerCategory: 'cqtj',
        legendComponent: 'slider-legend',
        unit: 'kg/m³',
        layerConfig: {
          type: 'wms',
          url: '/mapBaseUrl/geoserver/windresource/wms',
          layers: 'windresource:C_air_density_100m1',
          version: '1.1.0',
          transparent: 'true',
          format: 'image/png'
        },
        styleConfig: {
          styleType: 'ColorMap',
          opacity: 100,
          legendStep: 0.02,
          legendMin: 0,
          ColorMapEntries: [
            { color: '#F5D6FF', opacity: 0, filter: true, quantity: '0.0' },
            { color: '#02E7B8', opacity: 100, quantity: '0.5' },
            { color: '#71FF00', opacity: 100, quantity: '0.6' },
            { color: '#2AFF00', opacity: 100, quantity: '0.7' },
            { color: '#00FF1C', opacity: 100, quantity: '0.8' },
            { color: '#00FF63', opacity: 100, quantity: '0.9' },
            { color: '#00FFAA', opacity: 100, quantity: '1.0' },
            { color: '#00FFF0', opacity: 100, quantity: '1.02' },
            { color: '#00C6FF', opacity: 100, quantity: '1.04' },
            { color: '#007FFF', opacity: 100, quantity: '1.06' },
            { color: '#0038FF', opacity: 100, quantity: '1.08' },
            { color: '#0E00FF', opacity: 100, quantity: '1.1' },
            { color: '#5500FF', opacity: 100, quantity: '1.12' },
            { color: '#9B00FF', opacity: 100, quantity: '1.14' },
            { color: '#E200FF', opacity: 100, quantity: '1.16' },
            { color: '#FF00D4', opacity: 100, quantity: '1.18' },
            { color: '#FF008D', opacity: 100, quantity: '1.2' },
            { color: '#FF0046', opacity: 100, quantity: '1.3' }
          ]
        }
      },
      {
        layerId: '0601',
        layerName: '极端低温',
        layerCategory: 'cqtj',
        legendComponent: 'slider-legend',
        unit: '°C',
        layerConfig: {
          type: 'wms',
          url: '/mapBaseUrl/geoserver/meteorology/wms',
          layers: 'meteorology:C_extreme_code',
          version: '1.1.0',
          transparent: 'true',
          format: 'image/png'
        },
        styleConfig: {
          styleType: 'ColorMap',
          opacity: 100,
          legendStep: 5,
          legendMin: -60,
          ColorMapEntries: [
            { color: '#000000', opacity: 100, quantity: '-55.0' },
            { color: '#0000FF', opacity: 100, quantity: '-40.0' },
            { color: '#9200DB', opacity: 100, quantity: '-35.0' },
            { color: '#D900B1', opacity: 100, quantity: '-30.0' },
            { color: '#FF0088', opacity: 100, quantity: '-25.0' },
            { color: '#FF0062', opacity: 100, quantity: '-20.0' },
            { color: '#FF0044', opacity: 100, quantity: '-15.0' },
            { color: '#FF4229', opacity: 100, quantity: '-10.0' },
            { color: '#FF760D', opacity: 100, quantity: '-5.0' },
            { color: '#FFA200', opacity: 100, quantity: '0.0' },
            { color: '#FFC800', opacity: 100, quantity: '5.0' }
          ]
        }
      },
      {
        layerId: '0602',
        layerName: '极端高温',
        layerCategory: 'cqtj',
        legendComponent: 'slider-legend',
        unit: '°C',
        layerConfig: {
          type: 'wms',
          url: '/mapBaseUrl/geoserver/meteorology/wms',
          layers: 'meteorology:C_extreme_heat',
          version: '1.1.0',
          transparent: 'true',
          format: 'image/png'
        },
        styleConfig: {
          styleType: 'ColorMap',
          opacity: 100,
          legendStep: 5,
          legendMin: 0,
          ColorMapEntries: [
            { color: '#000000', opacity: 100, quantity: '0.0' },
            { color: '#0000FF', opacity: 100, quantity: '5.0' },
            { color: '#9200DB', opacity: 100, quantity: '10.0' },
            { color: '#D900B1', opacity: 100, quantity: '15.0' },
            { color: '#FF0088', opacity: 100, quantity: '20.0' },
            { color: '#FF0062', opacity: 100, quantity: '25.0' },
            { color: '#FF0044', opacity: 100, quantity: '30.0' },
            { color: '#FF4229', opacity: 100, quantity: '35.0' },
            { color: '#FF760D', opacity: 100, quantity: '40.0' },
            { color: '#FFA200', opacity: 100, quantity: '45.0' },
            { color: '#FFC800', opacity: 100, quantity: '50.0' }
          ]
        }
      },
      {
        layerId: 'ld_num_5km_avg',
        layerName: '雷暴次数',
        layerCategory: 'cqtj',
        needRequest: true,
        legendComponent: 'image-legend',
        chartType: 1, // 年季月统计图表
        layerConfig: {
          type: 'SINGLETILE',
          extent: {
            xmin: 54.735801,
            ymin: 11.891599,
            xmax: 149.235805,
            ymax: 61.796601
          }
        },
        styleConfig: {
          opacity: 100
        }
      },
      {
        layerId: 'ld_numdays_5km_avg',
        layerName: '雷暴天数',
        layerCategory: 'cqtj',
        needRequest: true,
        legendComponent: 'image-legend',
        chartType: 1, // 年季月统计图表
        layerConfig: {
          type: 'SINGLETILE',
          extent: {
            xmin: 54.735801,
            ymin: 11.891599,
            xmax: 149.235805,
            ymax: 61.796601
          }
        },
        styleConfig: {
          opacity: 100
        }
      },
      {
        layerId: 'province_fensan',
        layerName: '分省分散式数据',
        layerCategory: 'wrf',
        showInLegend: false
      },
      {
        layerId: 'bigbase',
        layerName: '大基地项目',
        layerCategory: 'wrf',
        showInLegend: false
      }
    ]
  },
  {
    type: 2,
    name: '实测站点数据',
    children: [
      {
        layerId: 'weather_regional_statistics',
        layerName: '气象信息区域统计'
      },
      {
        layerId: 'weather_station',
        layerName: '国家气象站'
      },
      {
        layerId: 'tower',
        layerName: '测风塔监测数据'
      },
      {
        layerId: 'radar',
        layerName: '测风雷达数据'
      }
    ]
  },
  {
    type: 3,
    name: '基础设施数据',
    children: [
      {
        layerId: 'weather_regional_statistics',
        layerName: '高压变电站'
      },
      {
        layerId: 'weather_station',
        layerName: '输变电线路'
      },
      {
        layerId: 'tower',
        layerName: '全国工业区数据'
      },
      {
        layerId: 'radar',
        layerName: '全国已建风电场'
      }
    ]
  },
  { type: 4, name: '地理环境数据' }
]
const ZCDCategoies = [
  {
    layerId: 'ws100',
    layerName: '风速',
    layerCategory: 'zcd',
    unit: 'm/s',
    legendComponent: 'image-legend',
    // 以下配置从服务获取
    // 'StartTime': 1293811200,
    // 'EndTime': 1325343600,
    // 'Interval': 3600,
    // 'Extent': {
    //   'XMin': 69.875000,
    //   'YMin': 14.875000,
    //   'XMax': 135.125000,
    //   'YMax': 55.125000
    // },
    styleConfig: {
      opacity: 100
    }
  },
  {
    layerId: 'wd100',
    layerName: '风向',
    layerCategory: 'zcd',
    unit: '°',
    legendComponent: 'image-legend',
    chartType: 2, // 风向图表
    styleConfig: {
      opacity: 100
    }
  },
  {
    layerId: 't2m',
    layerName: '温度',
    layerCategory: 'zcd',
    unit: '°C',
    legendComponent: 'image-legend',
    chartType: 1, // 年季月统计图表
    styleConfig: {
      opacity: 100
    }
  },
  {
    layerId: 'sp',
    layerName: '气压',
    layerCategory: 'zcd',
    unit: 'Pa',
    legendComponent: 'image-legend',
    chartType: 1, // 年季月统计图表
    styleConfig: {
      opacity: 100
    }
  }
]
const TjCategoies = [
  {
    layerId: '0711',
    layerName: '风速',
    legendComponent: 'slider-legend',
    unit: 'm/s',
    layerConfig: {
      type: 'wms',
      url: '/mapBaseUrl/geoserver/windresource/wms',
      layers: 'windresource:C_speed_H100m_raw',
      version: '1.1.0',
      transparent: 'true',
      format: 'image/png'
    },
    styleConfig: {
      styleType: 'ColorMap',
      opacity: 100,
      legendStep: 0.89,
      legendMin: 0,
      ColorMapEntries: [
        { color: '#3985BF', opacity: 0, filter: true, quantity: '0.0' },
        { color: '#3399FF', opacity: 100, quantity: '0.89' },
        { color: '#79C5FF', opacity: 100, quantity: '1.78' },
        { color: '#00FFFF', opacity: 100, quantity: '2.67' },
        { color: '#3FFA77', opacity: 100, quantity: '3.56' },
        { color: '#AFFF71', opacity: 100, quantity: '4.45' },
        { color: '#EAFF71', opacity: 100, quantity: '5.34' },
        { color: '#FFCC33', opacity: 100, quantity: '6.23' },
        { color: '#FF7714', opacity: 100, quantity: '7.12' },
        { color: '#F25F5A', opacity: 100, quantity: '8.01' },
        { color: '#F52F28', opacity: 100, quantity: '8.9' },
        { color: '#F22E27', opacity: 100, quantity: '9.79' },
        { color: '#FF2600', opacity: 100, quantity: '10.68' },
        { color: '#FF0000', opacity: 100, quantity: '11.6' }
      ]
    }
  },
  {
    layerId: '0707',
    layerName: '风切变70~150m',
    legendComponent: 'slider-legend',
    layerConfig: {
      type: 'wms',
      url: '/mapBaseUrl/geoserver/windresource/wms',
      layers: 'windresource:C_shear_70_150_data',
      version: '1.1.0',
      transparent: 'true',
      format: 'image/png'
    },
    styleConfig: {
      styleType: 'ColorMap',
      opacity: 100,
      legendStep: 0.05,
      legendMin: 0,
      ColorMapEntries: [
        { color: '#3399FF', opacity: 100, quantity: '0.05' },
        { color: '#79C5FF', opacity: 100, quantity: '0.1' },
        { color: '#00FFFF', opacity: 100, quantity: '0.15' },
        { color: '#3FFA77', opacity: 100, quantity: '0.2' },
        { color: '#AFFF71', opacity: 100, quantity: '0.25' },
        { color: '#EAFF71', opacity: 100, quantity: '0.3' },
        { color: '#FFCC33', opacity: 100, quantity: '0.35' },
        { color: '#FF7714', opacity: 100, quantity: '0.4' },
        { color: '#F25F5A', opacity: 100, quantity: '0.45' },
        { color: '#FF2600', opacity: 100, quantity: '0.5' },
        { color: '#FF0000', opacity: 100, quantity: '0.55' }
      ]
    }
  },
  {
    layerId: '0702',
    layerName: '空气密度',
    legendComponent: 'slider-legend',
    unit: 'kg/m³',
    layerConfig: {
      type: 'wms',
      url: '/mapBaseUrl/geoserver/windresource/wms',
      layers: 'windresource:C_air_density_100m1',
      version: '1.1.0',
      transparent: 'true',
      format: 'image/png'
    },
    styleConfig: {
      styleType: 'ColorMap',
      opacity: 100,
      legendStep: 0.02,
      legendMin: 0,
      ColorMapEntries: [
        { color: '#F5D6FF', opacity: 0, filter: true, quantity: '0.0' },
        { color: '#02E7B8', opacity: 100, quantity: '0.5' },
        { color: '#71FF00', opacity: 100, quantity: '0.6' },
        { color: '#2AFF00', opacity: 100, quantity: '0.7' },
        { color: '#00FF1C', opacity: 100, quantity: '0.8' },
        { color: '#00FF63', opacity: 100, quantity: '0.9' },
        { color: '#00FFAA', opacity: 100, quantity: '1.0' },
        { color: '#00FFF0', opacity: 100, quantity: '1.02' },
        { color: '#00C6FF', opacity: 100, quantity: '1.04' },
        { color: '#007FFF', opacity: 100, quantity: '1.06' },
        { color: '#0038FF', opacity: 100, quantity: '1.08' },
        { color: '#0E00FF', opacity: 100, quantity: '1.1' },
        { color: '#5500FF', opacity: 100, quantity: '1.12' },
        { color: '#9B00FF', opacity: 100, quantity: '1.14' },
        { color: '#E200FF', opacity: 100, quantity: '1.16' },
        { color: '#FF00D4', opacity: 100, quantity: '1.18' },
        { color: '#FF008D', opacity: 100, quantity: '1.2' },
        { color: '#FF0046', opacity: 100, quantity: '1.3' }
      ]
    }
  },
  {
    layerId: '0601',
    layerName: '极端低温',
    legendComponent: 'slider-legend',
    unit: '°C',
    layerConfig: {
      type: 'wms',
      url: '/mapBaseUrl/geoserver/meteorology/wms',
      layers: 'meteorology:C_extreme_code',
      version: '1.1.0',
      transparent: 'true',
      format: 'image/png'
    },
    styleConfig: {
      styleType: 'ColorMap',
      opacity: 100,
      legendStep: 5,
      legendMin: -60,
      ColorMapEntries: [
        { color: '#000000', opacity: 100, quantity: '-55.0' },
        { color: '#0000FF', opacity: 100, quantity: '-40.0' },
        { color: '#9200DB', opacity: 100, quantity: '-35.0' },
        { color: '#D900B1', opacity: 100, quantity: '-30.0' },
        { color: '#FF0088', opacity: 100, quantity: '-25.0' },
        { color: '#FF0062', opacity: 100, quantity: '-20.0' },
        { color: '#FF0044', opacity: 100, quantity: '-15.0' },
        { color: '#FF4229', opacity: 100, quantity: '-10.0' },
        { color: '#FF760D', opacity: 100, quantity: '-5.0' },
        { color: '#FFA200', opacity: 100, quantity: '0.0' },
        { color: '#FFC800', opacity: 100, quantity: '5.0' }
      ]
    }
  },
  {
    layerId: '0602',
    layerName: '极端高温',
    legendComponent: 'slider-legend',
    unit: '°C',
    layerConfig: {
      type: 'wms',
      url: '/mapBaseUrl/geoserver/meteorology/wms',
      layers: 'meteorology:C_extreme_heat',
      version: '1.1.0',
      transparent: 'true',
      format: 'image/png'
    },
    styleConfig: {
      styleType: 'ColorMap',
      opacity: 100,
      legendStep: 5,
      legendMin: 0,
      ColorMapEntries: [
        { color: '#000000', opacity: 100, quantity: '0.0' },
        { color: '#0000FF', opacity: 100, quantity: '5.0' },
        { color: '#9200DB', opacity: 100, quantity: '10.0' },
        { color: '#D900B1', opacity: 100, quantity: '15.0' },
        { color: '#FF0088', opacity: 100, quantity: '20.0' },
        { color: '#FF0062', opacity: 100, quantity: '25.0' },
        { color: '#FF0044', opacity: 100, quantity: '30.0' },
        { color: '#FF4229', opacity: 100, quantity: '35.0' },
        { color: '#FF760D', opacity: 100, quantity: '40.0' },
        { color: '#FFA200', opacity: 100, quantity: '45.0' },
        { color: '#FFC800', opacity: 100, quantity: '50.0' }
      ]
    }
  },
  {
    layerId: 'ld_num_5km_avg',
    layerName: '雷暴次数',
    needRequest: true,
    legendComponent: 'image-legend',
    chartType: 1, // 年季月统计图表
    layerConfig: {
      type: 'SINGLETILE',
      extent: {
        xmin: 54.735801,
        ymin: 11.891599,
        xmax: 149.235805,
        ymax: 61.796601
      }
    },
    styleConfig: {
      opacity: 100
    }
  },
  {
    layerId: 'ld_numdays_5km_avg',
    layerName: '雷暴天数',
    needRequest: true,
    legendComponent: 'image-legend',
    chartType: 1, // 年季月统计图表
    layerConfig: {
      type: 'SINGLETILE',
      extent: {
        xmin: 54.735801,
        ymin: 11.891599,
        xmax: 149.235805,
        ymax: 61.796601
      }
    },
    styleConfig: {
      opacity: 100
    }
  }
]
const WrfCategoies = [
  {
    layerId: 'province_fensan',
    layerName: '分省分散式数据',
    layerCategory: 'wrf',
    showInLegend: false
  },
  {
    layerId: 'bigbase',
    layerName: '大基地项目',
    layerCategory: 'wrf',
    showInLegend: false
  }
]
const GeoLayers = [
  {
    type: 'dx',
    name: '地形',
    expand: true,
    rightId: 151,
    layers: [
      {
        layerId: '0505',
        layerName: '地形',
        legendComponent: 'colormap-legend',
        layerConfig: {
          type: 'wms',
          url: '/mapBaseUrl/geoserver/topography/wms',
          layers: 'topography:C_geomorphologic_raster',
          version: '1.1.0',
          transparent: 'true',
          format: 'image/png'
        },
        styleConfig: {
          styleType: 'ColorMap',
          opacity: 100,
          legendMin: 0,
          reorder: true,
          ColorMapEntries: [
            {
              color: '#709959',
              opacity: 100,
              quantity: '1',
              label: '低海拔平原',
              order: 8
            },
            {
              color: '#A9BF78',
              opacity: 100,
              quantity: '2',
              label: '低海拔丘陵',
              order: 7
            },
            {
              color: '#E7E89B',
              opacity: 100,
              quantity: '3',
              label: '低海拔山地',
              order: 6
            },
            {
              color: '#F2E599',
              opacity: 100,
              quantity: '4',
              label: '高海拔平原',
              order: 2
            },
            {
              color: '#F2D58D',
              opacity: 100,
              quantity: '5',
              label: '高海拔丘陵',
              order: 1
            },
            {
              color: '#E6BB83',
              opacity: 100,
              quantity: '6',
              label: '高海拔山地',
              order: 0
            },
            {
              color: '#73B2FF',
              opacity: 100,
              quantity: '7',
              label: '水域',
              order: 9
            },
            {
              color: '#4C7300',
              opacity: 100,
              quantity: '8',
              label: '中海拔平原',
              order: 5
            },
            {
              color: '#E6BEC9',
              opacity: 100,
              quantity: '9',
              label: '中海拔丘陵',
              order: 4
            },
            {
              color: '#FFA77F',
              opacity: 100,
              quantity: '10',
              label: '中海拔山地',
              order: 3
            }
          ]
        }
      }
    ]
  },
  {
    type: 'dm',
    name: '地貌',
    expand: true,
    rightId: 152,
    layers: [
      // {
      //   'layerId': '0208',
      //   'layerName': '森林分布',
      //   'legendComponent': 'colormap-legend',
      //   'layerConfig': {
      //     'type': 'wms',
      //     'url': '/mapBaseUrl/geoserver/environment/wms',
      //     'layers': 'environment:C_tree_coverage',
      //     'version': '1.1.0',
      //     'transparent': 'true',
      //     'format': 'image/png'
      //   },
      //   'styleConfig': {
      //     'styleType': 'default',
      //     'opacity': 100
      //   }
      // },
      {
        layerId: '0206',
        layerName: '森林高度',
        legendComponent: 'slider-legend',
        unit: 'm',
        layerConfig: {
          type: 'wms',
          url: '/mapBaseUrl/geoserver/environment/wms',
          layers: 'environment:G_tree_height',
          version: '1.1.0',
          transparent: 'true',
          format: 'image/png'
        },
        styleConfig: {
          styleType: 'ColorMap',
          opacity: 100,
          legendStep: 5,
          legendMin: 5,
          ColorMapEntries: [
            {
              color: '#F7FCF5',
              opacity: 0,
              quantity: '1',
              filter: true
            },
            {
              color: '#F7FCF5',
              opacity: 100,
              quantity: '10'
            },
            {
              color: '#E5F5E0',
              opacity: 100,
              quantity: '15'
            },
            {
              color: '#C7E9C0',
              opacity: 100,
              quantity: '20'
            },
            {
              color: '#A1D99B',
              opacity: 100,
              quantity: '25'
            },
            {
              color: '#74C476',
              opacity: 100,
              quantity: '30'
            },
            {
              color: '#41AB5D',
              opacity: 100,
              quantity: '35'
            },
            {
              color: '#238B45',
              opacity: 100,
              quantity: '40'
            },
            {
              color: '#006D2C',
              opacity: 100,
              quantity: '45'
            },
            {
              color: '#00441B',
              opacity: 100,
              quantity: '50'
            }
          ]
        }
      },
      {
        layerId: '0209',
        layerName: '植被',
        legendComponent: 'singlecolor-legend',
        layerConfig: {
          type: 'wms',
          url: '/mapBaseUrl/geoserver/environment/wms',
          layers: 'environment:C_forest_data',
          version: '1.1.0',
          transparent: 'true',
          format: 'image/png'
        },
        styleConfig: {
          styleType: 'single',
          opacity: 100,
          fillColor: '#98E600',
          fillOpacity: 0.7,
          strokeColor: '#006633',
          strokeStyle: 'solid',
          strokeWidth: 0
        }
      },
      {
        layerId: '0211',
        layerName: '土地分类',
        legendComponent: 'colormap-legend',
        layerConfig: {
          type: 'wms',
          url: '/mapBaseUrl/geoserver/environment/wms',
          layers: 'environment:G_land_conver',
          version: '1.1.0',
          transparent: 'true',
          format: 'image/png'
        },
        styleConfig: {
          styleType: 'ColorMap',
          opacity: 100,
          legendMin: 10,
          ColorMapEntries: [
            { color: '#AAF0F0', opacity: 100, quantity: '11', label: '水田' },
            { color: '#FFFF64', opacity: 100, quantity: '14', label: '旱地' },
            {
              color: '#DCF064',
              opacity: 100,
              quantity: '20',
              label: '镶嵌农田'
            },
            {
              color: '#CDCD66',
              opacity: 100,
              quantity: '30',
              label: '镶嵌植被'
            },
            {
              color: '#006400',
              opacity: 100,
              quantity: '40',
              label: '密集_稀疏阔叶林'
            },
            {
              color: '#00A000',
              opacity: 100,
              quantity: '50',
              label: '密集阔叶林'
            },
            {
              color: '#AAC800',
              opacity: 100,
              quantity: '60',
              label: '稀疏林地'
            },
            {
              color: '#003C00',
              opacity: 100,
              quantity: '70',
              label: '密集针叶林'
            },
            {
              color: '#286400',
              opacity: 100,
              quantity: '90',
              label: '稀疏针叶林'
            },
            {
              color: '#788200',
              opacity: 100,
              quantity: '100',
              label: '密集_稀疏混合林'
            },
            {
              color: '#8CA000',
              opacity: 100,
              quantity: '110',
              label: '镶嵌林地'
            },
            {
              color: '#BE9600',
              opacity: 100,
              quantity: '120',
              label: '镶嵌草地'
            },
            {
              color: '#966400',
              opacity: 100,
              quantity: '130',
              label: '密集_稀疏灌丛'
            },
            {
              color: '#FFB432',
              opacity: 100,
              quantity: '140',
              label: '密集_稀疏草地'
            },
            {
              color: '#FFEBAF',
              opacity: 100,
              quantity: '150',
              label: '稀疏植被'
            },
            {
              color: '#00785A',
              opacity: 100,
              quantity: '160',
              label: '密集_稀疏湿地'
            },
            {
              color: '#009678',
              opacity: 100,
              quantity: '170',
              label: '密集湿地'
            },
            {
              color: '#00DC82',
              opacity: 100,
              quantity: '180',
              label: '密集_稀疏草地'
            },
            {
              color: '#C31400',
              opacity: 100,
              quantity: '190',
              label: '人工表面'
            },
            { color: '#FFF5D7', opacity: 100, quantity: '200', label: '裸地' },
            { color: '#0046C8', opacity: 100, quantity: '210', label: '水体' },
            {
              color: '#FFFFFF',
              opacity: 100,
              quantity: '220',
              label: '永久雪和冰'
            },
            { color: '#000000', opacity: 100, quantity: '230', filter: true }
          ]
        }
      },
      {
        layerId: '0706',
        layerName: '粗糙度',
        legendComponent: 'colormap-legend',
        layerConfig: {
          type: 'wms',
          url: '/mapBaseUrl/geoserver/windresource/wms',
          layers: 'windresource:C_surface_roughness_2010_30m',
          version: '1.1.0',
          transparent: 'true',
          format: 'image/png'
        },
        styleConfig: {
          styleType: 'ColorMap',
          opacity: 100,
          legendMin: 0,
          ColorMapEntries: [
            { color: '#6AB62A', opacity: 0, filter: true, quantity: '0.00001' },
            { color: '#66CC66', opacity: 100, quantity: '0.001' },
            { color: '#C1FF99', opacity: 100, quantity: '0.003' },
            { color: '#FFB189', opacity: 100, quantity: '0.04' },
            { color: '#DB594A', opacity: 100, quantity: '0.06' },
            { color: '#CF4434', opacity: 100, quantity: '0.2' },
            { color: '#CC3333', opacity: 100, quantity: '0.7' }
          ]
        }
      }
    ]
  }
]
const ProvinceGeoLayerGroup = {
  type: 'fspcsj',
  name: '分省普查数据',
  expand: true,
  rightId: 153,
  layers: [
    {
      layerId: 'fs_bound',
      layerName: '省界',
      enableQuery: false,
      legendComponent: 'singlecolor-legend',
      queryField: 'code',
      layerConfig: {
        type: 'wms',
        url: '/mapBaseUrl/geoserver/environment/wms',
        layers: 'environment:china_city',
        version: '1.1.0',
        transparent: 'true',
        format: 'image/png'
      },
      styleConfig: {
        styleType: 'single',
        opacity: 100,
        fillColor: '#1C1C1C',
        fillOpacity: 1,
        strokeColor: '#1C1C1C',
        strokeStyle: 'solid',
        strokeWidth: 0,
        width: 5
      }
    },
    {
      layerId: 'fs_jmq',
      layerName: '居民区',
      enableQuery: false,
      legendComponent: 'singlecolor-legend',
      queryField: 'code',
      layerConfig: {
        type: 'wms',
        url: '/mapBaseUrl/geoserver/environment/wms',
        layers: 'environment:china_county',
        version: '1.1.0',
        transparent: 'true',
        format: 'image/png'
      },
      styleConfig: {
        styleType: 'single',
        opacity: 100,
        fillColor: '#7151B6',
        fillOpacity: 1,
        strokeColor: '#716168',
        strokeStyle: 'solid',
        strokeWidth: 1
      }
    },
    {
      layerId: 'fs_zrbhq',
      layerName: '自然保护区',
      enableQuery: false,
      legendComponent: 'singlecolor-legend',
      queryField: 'code',
      layerConfig: {
        type: 'wms',
        url: '/mapBaseUrl/geoserver/environment/wms',
        layers: 'environment:china_nature',
        version: '1.1.0',
        transparent: 'true',
        format: 'image/png'
      },
      styleConfig: {
        styleType: 'single',
        opacity: 100,
        fillColor: '#58A057',
        fillOpacity: 1,
        strokeColor: '#226127',
        strokeStyle: 'solid',
        strokeWidth: 1
      }
    },
    {
      layerId: 'fs_hl',
      layerName: '河流',
      enableQuery: false,
      legendComponent: 'singlecolor-legend',
      queryField: 'code',
      layerConfig: {
        type: 'wms',
        url: '/mapBaseUrl/geoserver/environment/wms',
        layers: 'environment:china_river',
        version: '1.1.0',
        transparent: 'true',
        format: 'image/png'
      },
      styleConfig: {
        styleType: 'single',
        opacity: 100,
        fillColor: '#5159B5',
        fillOpacity: 1,
        strokeColor: '#021421',
        strokeStyle: 'solid',
        strokeWidth: 1
      }
    },
    {
      layerId: 'fs_yjfdc',
      layerName: '已建风电场',
      enableQuery: false,
      legendComponent: 'singlecolor-legend',
      queryField: 'code',
      layerConfig: {
        type: 'wms',
        url: '/mapBaseUrl/geoserver/environment/wms',
        layers: 'environment:china_yijian',
        version: '1.1.0',
        transparent: 'true',
        format: 'image/png'
      },
      styleConfig: {
        styleType: 'single',
        opacity: 100,
        fillColor: '#96ACA8',
        fillOpacity: 1,
        strokeColor: '#8FA4A4',
        strokeStyle: 'solid',
        strokeWidth: 1
      }
    }
  ]
}
export function getIndexLayerConfig (type: string) {
  let layersConfig = null
  switch (type) {
    case 'zcd':
      layersConfig = ZCDCategoies
      break
    case 'tj':
      layersConfig = TjCategoies
      break
    case 'wrf':
      layersConfig = WrfCategoies
      break
    case 'geo':
      layersConfig = GeoLayers
      break
    case 'province':
      layersConfig = ProvinceGeoLayerGroup
      break
    default:
      throw new Error('传入type错误，请确认！')
  }

  return JSON.parse(JSON.stringify(layersConfig))
}
// const CategoryDist = {
//   '0209': [],
//   '0505': [
//     { quantity: '6', label: '高海拔山地' },
//     { quantity: '5', label: '高海拔丘陵' },
//     { quantity: '4', label: '高海拔平原' },
//     { quantity: '10', label: '中海拔山地' },
//     { quantity: '9', label: '中海拔丘陵' },
//     { quantity: '8', label: '中海拔平原' },
//     { quantity: '3', label: '低海拔山地' },
//     { quantity: '2', label: '低海拔丘陵' },
//     { quantity: '1', label: '低海拔平原' },
//     { quantity: '7', label: '水域' }
//   ],
//   '0211': [
//     { quantity: '11', label: '水田' },
//     { quantity: '14', label: '旱地' },
//     { quantity: '20', label: '镶嵌农田' },
//     { quantity: '30', label: '镶嵌植被' },
//     { quantity: '40', label: '密集_稀疏阔叶林' },
//     { quantity: '50', label: '密集阔叶林' },
//     { quantity: '60', label: '稀疏林地' },
//     { quantity: '70', label: '密集针叶林' },
//     { quantity: '80', label: '建设用地' },
//     { quantity: '90', label: '稀疏针叶林' },
//     { quantity: '100', label: '密集_稀疏混合林' },
//     { quantity: '110', label: '镶嵌林地' },
//     { quantity: '120', label: '镶嵌草地' },
//     { quantity: '130', label: '密集_稀疏灌丛' },
//     { quantity: '140', label: '密集_稀疏草地' },
//     { quantity: '150', label: '稀疏植被' },
//     { quantity: '160', label: '密集_稀疏湿地' },
//     { quantity: '170', label: '密集湿地' },
//     { quantity: '180', label: '密集_稀疏草地' },
//     { quantity: '190', label: '人工表面' },
//     { quantity: '200', label: '裸地' },
//     { quantity: '210', label: '水体' },
//     { quantity: '220', label: '永久雪和冰' },
//     { quantity: '230', label: '未分类', filter: true }
//   ]
// }

/**
   * 获取指定图层的分类代码对应的名称
   * @param {String} layerId 图层ID
   * @param {String} code 分类代码
   */
// export function convertLayerClassCodeToName (layerId:any, code:string) {
//   if (!CategoryDist[layerId]) return code
//   const item = CategoryDist[layerId].find(
//     (item) => item.quantity === String(code)
//   )
//   return item && item.label
// }
