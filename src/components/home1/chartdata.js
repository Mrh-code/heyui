export default {
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },

  //hover显示内容的配置
  legend: {
    data: ['直接访问', '查看信息', '文件上传', '协议配置']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '直接访问',
      type: 'bar',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: '查看信息',
      type: 'bar',
      stack: '广告',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '协议配置',
      type: 'bar',
      stack: '广告',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '文件上传',
      type: 'bar',
      data: [862, 1018, 964, 1026, 1679, 1600, 1570],
      markLine: {
        lineStyle: {
          normal: {
            type: 'dashed'
          }
        },
        data: [
          [{ type: 'min' }, { type: 'max' }]
        ]
      }
    },
    {
      name: '传word',
      type: 'bar',
      barWidth: 5,
      stack: '搜索引擎',
      data: [620, 732, 701, 734, 1090, 1130, 1120]
    },
    {
      name: '传pdf',
      type: 'bar',
      stack: '搜索引擎',
      data: [120, 132, 101, 134, 290, 230, 220]
    },
    {
      name: '传Excel',
      type: 'bar',
      stack: '搜索引擎',
      data: [60, 72, 71, 74, 190, 130, 110]
    },
    {
      name: '其他',
      type: 'bar',
      stack: '搜索引擎',
      data: [62, 82, 91, 84, 109, 110, 120]
    }
  ]
};
