<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    console.log(this.id)
    if(this.id === 'echarts'){
        this.initChart()
    }else if(this.id === 'echarts_qmjy'){
        this.initChart_qmjy()
    }else if(this.id === 'echarts_yxttl'){
        this.initChart_yxttl()
    }else if(this.id === 'echarts_yhgsttl'){
        this.initChart_yhgsttl()
    }else if(this.id === 'echarts_qbzxt'){
        this.initChart_qbzxt()
    }else if(this.id === 'echarts_xqclsc'){
        this.initChart_xqclsc()
    }else if(this.id === 'echarts_gzhfsj'){
        this.initChart_gzhfsj()
    }else if(this.id === 'echarts_bbjhwcl'){
        this.initChart_bbjhwcl()
    }else if(this.id === 'echarts_clsjccsl'){
        this.initChart_clsjccsl()
    }else if(this.id === 'echarts_txjfzq'){
        this.initChart_txjfzq()
    }else if(this.id === 'echarts_qxsl'){
        this.initChart_qxsl()
    }else if(this.id === 'echarts_csqxfbt'){
        this.initChart_csqxfbt()
    }else if(this.id === 'echarts_qxmrbh'){
        this.initChart_qxmrbh()
    }
    
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      
      this.chart.setOption({
            legend: {},
            tooltip: {},
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    //dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            dataset: {
                dimensions: ['product', '本期新增任务数', '本期新增需求数', '本期新增用户故事数'],
                source: [
                    {product: '2020-05', '本期新增任务数': 400, '本期新增需求数': 800, '本期新增用户故事数': 930},
                    {product: '2020-06', '本期新增任务数': 830, '本期新增需求数': 734, '本期新增用户故事数': 551},
                    {product: '2020-07', '本期新增任务数': 860, '本期新增需求数': 652, '本期新增用户故事数': 825},
                    {product: '2020-08', '本期新增任务数': 361, '本期新增需求数': 431, '本期新增用户故事数': 470},
                    {product: '2020-09', '本期新增任务数': 550, '本期新增需求数': 999, '本期新增用户故事数': 888},
                    {product: '2020-10', '本期新增任务数': 724, '本期新增需求数': 539, '本期新增用户故事数': 391}
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                {type: 'bar',itemStyle:{ normal:{ color:'#73CD7C' } }},
                {type: 'bar',itemStyle:{ normal:{ color:'#E7569F' } }},
                {type: 'bar',itemStyle:{ normal:{ color:'#9256E1' } }}
            ]
      })
    },
    initChart_qmjy() {
      this.chart = echarts.init(document.getElementById(this.id))

      
      this.chart.setOption({
            legend: {},
            tooltip: {},
             toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    //dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            dataset: {
                dimensions: ['product', '本期新增任务数', '本期新增需求数', '本期新增用户故事数'],
                source: [
                    {product: '2020-05', '本期新增任务数': 100, '本期新增需求数': 300, '本期新增用户故事数': 230},
                    {product: '2020-06', '本期新增任务数': 530, '本期新增需求数': 134, '本期新增用户故事数': 351},
                    {product: '2020-07', '本期新增任务数': 560, '本期新增需求数': 252, '本期新增用户故事数': 225},
                    {product: '2020-08', '本期新增任务数': 161, '本期新增需求数': 131, '本期新增用户故事数': 270},
                    {product: '2020-09', '本期新增任务数': 150, '本期新增需求数': 199, '本期新增用户故事数': 188},
                    {product: '2020-10', '本期新增任务数': 224, '本期新增需求数': 139, '本期新增用户故事数': 291}
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                {type: 'line',itemStyle:{ normal:{ color:'#73CD7C' } }},
                {type: 'line',itemStyle:{ normal:{ color:'#E7569F' } }},
                {type: 'line',itemStyle:{ normal:{ color:'#9256E1' } }}
            ]
      })
    },
    initChart_qxmrbh() {
      this.chart = echarts.init(document.getElementById(this.id))

      
      this.chart.setOption({
            legend: {},
            tooltip: {},
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    //dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            dataset: {
                dimensions: ['product', '创建缺陷总数', '修复缺陷总数', '关闭缺陷总数'],
                source: [
                    {product: '2020-05', '创建缺陷总数': 100, '修复缺陷总数': 300, '关闭缺陷总数': 230},
                    {product: '2020-06', '创建缺陷总数': 530, '修复缺陷总数': 134, '关闭缺陷总数': 351},
                    {product: '2020-07', '创建缺陷总数': 560, '修复缺陷总数': 252, '关闭缺陷总数': 225},
                    {product: '2020-08', '创建缺陷总数': 161, '修复缺陷总数': 131, '关闭缺陷总数': 270},
                    {product: '2020-09', '创建缺陷总数': 150, '修复缺陷总数': 199, '关闭缺陷总数': 188},
                    {product: '2020-10', '创建缺陷总数': 224, '修复缺陷总数': 139, '关闭缺陷总数': 291}
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                {type: 'line',itemStyle:{ normal:{ color:'#73CD7C' } }},
                {type: 'line',itemStyle:{ normal:{ color:'#E7569F' } }},
                {type: 'line',itemStyle:{ normal:{ color:'#9256E1' } }}
            ]
      })
    },
    initChart_yxttl() {
      this.chart = echarts.init(document.getElementById(this.id))

      
      this.chart.setOption({
             legend: {},
            tooltip: {},
             toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    //dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            dataset: {
                dimensions: ['product', '任务吞吐量'],
                source: [
                    {product: '2020-05', '任务吞吐量': 230},
                    {product: '2020-06', '任务吞吐量': 351},
                    {product: '2020-07', '任务吞吐量': 225},
                    {product: '2020-08', '任务吞吐量': 270},
                    {product: '2020-09', '任务吞吐量': 188},
                    {product: '2020-10', '任务吞吐量': 291}
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                {type: 'bar',itemStyle:{ normal:{ color:'#73CD7C' } }}
            ]
      })
    },
    initChart_yhgsttl() {
      this.chart = echarts.init(document.getElementById(this.id))

      
      this.chart.setOption({
            legend: {},
            tooltip: {},
             toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    //dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            dataset: {
                dimensions: ['product', '完成吞吐量', '开发完成吞吐量', '测试完成吞吐量'],
                source: [
                    {product: '2020-05', '完成吞吐量': 100, '开发完成吞吐量': 300, '测试完成吞吐量': 230},
                    {product: '2020-06', '完成吞吐量': 530, '开发完成吞吐量': 134, '测试完成吞吐量': 351},
                    {product: '2020-07', '完成吞吐量': 560, '开发完成吞吐量': 252, '测试完成吞吐量': 225},
                    {product: '2020-08', '完成吞吐量': 161, '开发完成吞吐量': 131, '测试完成吞吐量': 270},
                    {product: '2020-09', '完成吞吐量': 150, '开发完成吞吐量': 199, '测试完成吞吐量': 188},
                    {product: '2020-10', '完成吞吐量': 224, '开发完成吞吐量': 139, '测试完成吞吐量': 291}
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                {type: 'line',itemStyle:{ normal:{ color:'#73CD7C' } }},
                {type: 'line',itemStyle:{ normal:{ color:'#E7569F' } }},
                {type: 'line',itemStyle:{ normal:{ color:'#9256E1' } }}
            ]
      })
    },
    initChart_qbzxt() {
      this.chart = echarts.init(document.getElementById(this.id))

      
      this.chart.setOption({
            legend: {},
            tooltip: {},
             toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    //dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            dataset: {
                dimensions: ['product', '积压任务消化时间', '积压需求消化时间', '积压用户故事消化时间'],
                source: [
                    {product: '2020-05', '积压任务消化时间': 1, '积压需求消化时间': 3, '积压用户故事消化时间': 2.3},
                    {product: '2020-06', '积压任务消化时间': 5.3, '积压需求消化时间': 1.3, '积压用户故事消化时间': 3.5},
                    {product: '2020-07', '积压任务消化时间': 5.6, '积压需求消化时间': 2.5, '积压用户故事消化时间': 2.2},
                    {product: '2020-08', '积压任务消化时间': 1.6, '积压需求消化时间': 1.3, '积压用户故事消化时间': 2.7},
                    {product: '2020-09', '积压任务消化时间': 1.5, '积压需求消化时间': 1.9, '积压用户故事消化时间': 1.8},
                    {product: '2020-10', '积压任务消化时间': 2.2, '积压需求消化时间': 1.3, '积压用户故事消化时间': 2.9}
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                {type: 'bar',itemStyle:{ normal:{ color:'#73CD7C' } }},
                {type: 'bar',itemStyle:{ normal:{ color:'#E7569F' } }},
                {type: 'bar',itemStyle:{ normal:{ color:'#9256E1' } }}
            ]
      })
    },
    initChart_xqclsc() {
      this.chart = echarts.init(document.getElementById(this.id))

      
      this.chart.setOption({
            legend: {},
            tooltip: {},
             toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    //dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            dataset: {
                dimensions: ['product', '需求处理时长'],
                source: [
                    {product: '2020-05', '需求处理时长': 2.3},
                    {product: '2020-06', '需求处理时长': 3.5},
                    {product: '2020-07', '需求处理时长': 2.2},
                    {product: '2020-08', '需求处理时长': 2.7},
                    {product: '2020-09', '需求处理时长': 1.8},
                    {product: '2020-10', '需求处理时长': 2.9}
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                {type: 'line',itemStyle:{ normal:{ color:'#73CD7C' } }}
            ]
      })
    },
    initChart_gzhfsj() {
      this.chart = echarts.init(document.getElementById(this.id))

      
      this.chart.setOption({
            legend: {},
            tooltip: {},
             toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    //dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            dataset: {
                dimensions: ['product', '观察值（天）', '指标值（天）', '阈值（天）'],
                source: [
                    {product: '2020-05', '观察值（天）': 100, '指标值（天）': 300, '阈值（天）': 230},
                    {product: '2020-06', '观察值（天）': 500, '指标值（天）': 130, '阈值（天）': 350},
                    {product: '2020-07', '观察值（天）': 500, '指标值（天）': 250, '阈值（天）': 220},
                    {product: '2020-08', '观察值（天）': 100, '指标值（天）': 130, '阈值（天）': 270},
                    {product: '2020-09', '观察值（天）': 100, '指标值（天）': 190, '阈值（天）': 180},
                    {product: '2020-10', '观察值（天）': 220, '指标值（天）': 130, '阈值（天）': 290}
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                {type: 'bar',itemStyle:{ normal:{ color:'#73CD7C' } }},
                {type: 'bar',itemStyle:{ normal:{ color:'#E7569F' } }},
                {type: 'bar',itemStyle:{ normal:{ color:'#9256E1' } }}
            ]
      })
    },
    initChart_bbjhwcl() {
      this.chart = echarts.init(document.getElementById(this.id))

      
      this.chart.setOption({
             legend: {},
            tooltip: {},
             toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    //dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            dataset: {
                dimensions: ['product', '版本计划完成率'],
                source: [
                    {product: '2020-05', '版本计划完成率': 15.0},
                    {product: '2020-06', '版本计划完成率': 16.0},
                    {product: '2020-07', '版本计划完成率': 22.0},
                    {product: '2020-08', '版本计划完成率': 27.0},
                    {product: '2020-09', '版本计划完成率': 18.0},
                    {product: '2020-10', '版本计划完成率': 29.1}
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
              {type: 'line',itemStyle:{ normal:{ color:'#73CD7C' } }}
            ]
      })
    },
    initChart_clsjccsl() {
      this.chart = echarts.init(document.getElementById(this.id))

      
      this.chart.setOption({
            legend: {},
            tooltip: {},
             toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    //dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            dataset: {
                dimensions: ['product', '处理时间超长任务数', '处理时间超长需求数', '处理时间超长用户故事数'],
                source: [
                    {product: '2020-05', '处理时间超长任务数': 400, '处理时间超长需求数': 800, '处理时间超长用户故事数': 930},
                    {product: '2020-06', '处理时间超长任务数': 830, '处理时间超长需求数': 734, '处理时间超长用户故事数': 551},
                    {product: '2020-07', '处理时间超长任务数': 860, '处理时间超长需求数': 652, '处理时间超长用户故事数': 825},
                    {product: '2020-08', '处理时间超长任务数': 361, '处理时间超长需求数': 431, '处理时间超长用户故事数': 470},
                    {product: '2020-09', '处理时间超长任务数': 550, '处理时间超长需求数': 999, '处理时间超长用户故事数': 888},
                    {product: '2020-10', '处理时间超长任务数': 724, '处理时间超长需求数': 539, '处理时间超长用户故事数': 391}
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                {type: 'bar',itemStyle:{ normal:{ color:'#73CD7C' } }},
                {type: 'bar',itemStyle:{ normal:{ color:'#E7569F' } }},
                {type: 'bar',itemStyle:{ normal:{ color:'#9256E1' } }}
            ]
      })
    },
     initChart_txjfzq() {
      this.chart = echarts.init(document.getElementById(this.id))

      
      this.chart.setOption({
            legend: {},
            tooltip: {},
             toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    //dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            dataset: {
                dimensions: ['product', '特性完成天数', '特性处理天数', '任务完成天数','任务处理天数'],
                source: [
                    {product: '2020-05', '特性完成天数': 400, '特性处理天数': 800, '任务完成天数': 930, '任务处理天数': 930},
                    {product: '2020-06', '特性完成天数': 830, '特性处理天数': 734, '任务完成天数': 551, '任务处理天数': 930},
                    {product: '2020-07', '特性完成天数': 860, '特性处理天数': 652, '任务完成天数': 825, '任务处理天数': 930},
                    {product: '2020-08', '特性完成天数': 361, '特性处理天数': 431, '任务完成天数': 470, '任务处理天数': 930},
                    {product: '2020-09', '特性完成天数': 550, '特性处理天数': 999, '任务完成天数': 888, '任务处理天数': 930},
                    {product: '2020-10', '特性完成天数': 724, '特性处理天数': 539, '任务完成天数': 391, '任务处理天数': 930}
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                 {type: 'bar',itemStyle:{ normal:{ color:'#73CD7C' } }},
                {type: 'bar',itemStyle:{ normal:{ color:'#E7569F' } }},
                {type: 'bar',itemStyle:{ normal:{ color:'#9256E1' } }},
                {type: 'bar',itemStyle:{ normal:{ color:'#F3D647' }}}
            ]
      })
    },
    initChart_qxsl() {
      this.chart = echarts.init(document.getElementById(this.id))

      
      this.chart.setOption({
            legend: {},
            tooltip: {},
             toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    //dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            dataset: {
                dimensions: ['product', '生产缺陷数量', '测试缺陷数量'],
                source: [
                    {product: '2020-05', '生产缺陷数量': 40, '测试缺陷数量': 800},
                    {product: '2020-06', '生产缺陷数量': 83, '测试缺陷数量': 734},
                    {product: '2020-07', '生产缺陷数量': 86, '测试缺陷数量': 652},
                    {product: '2020-08', '生产缺陷数量': 31, '测试缺陷数量': 431},
                    {product: '2020-09', '生产缺陷数量': 55, '测试缺陷数量': 999},
                    {product: '2020-10', '生产缺陷数量': 74, '测试缺陷数量': 539}
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                {type: 'bar',itemStyle:{ normal:{ color:'#73CD7C' } }},
                {type: 'bar',itemStyle:{ normal:{ color:'#E7569F' } }}
            ]
      })
    },
    initChart_csqxfbt() {
      this.chart = echarts.init(document.getElementById(this.id))

      
      this.chart.setOption({
      
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'horizontal',
            x:'center',
            y:' center',
            data: ['L1', 'L2', 'L3', 'L4']
        },
        series: [
            {
                name: '测试缺陷',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: 335, name: 'L1',itemStyle:{color:'#73CD7C'}},
                    {value: 310, name: 'L2',itemStyle:{color:'#E7569F'}},
                    {value: 234, name: 'L3',itemStyle:{color:'#9256E1'}},
                    {value: 135, name: 'L4',itemStyle:{color:'#F3D647'}}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      })
    }
  }
}
</script>
