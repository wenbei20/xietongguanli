<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane v-for="tab in tabsGroup" :key="tab" :label="tab + '年'">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-card class="ad ad1" shadow="never">
                  <strong>5</strong> 个批次
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card class="ad ad2" shadow="never">
                  <strong>36</strong> 个任务
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card class="ad ad3" shadow="never">
                  <strong>321</strong> 个项目
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card class="ad ad4" shadow="never">
                  <strong>105</strong> 个产品
                </el-card>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-card class="notice-card" shadow="never" :body-style="{ padding: 10 }">
              <div slot="header" class="clearfix">
                <span style="font-size: 14px;">项目公告</span>
              </div>
              <div class="notice-list">
                <div v-for="(el,idx) in noticeList" :key="idx" class="item">
                  <span class="notice_name"> {{ el.name }}</span>
                  <span class="notice_time">{{ el.date }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-radio-group v-model="radioActive" class="radioTabs">
          <el-radio-button :label="1">{{ tab }}年度第一批次</el-radio-button>
          <el-radio-button :label="2">{{ tab }}年度第二批次</el-radio-button>
          <el-radio-button :label="3">{{ tab }}年度第三批次</el-radio-button>
        </el-radio-group>
        <h4 style="font-size: 16px;">批次内任务执行情况</h4>
        <el-table
          :data="taskExecution"
          border
          style="width: 100%"
        >
          <el-table-column prop="no" label="任务编号" />
          <el-table-column prop="name" label="任务名称" />
          <el-table-column prop="createBy" label="创建人" />
          <el-table-column prop="createTime" label="创建时间" />
          <el-table-column prop="taskStatus" label="任务状态" />
          <el-table-column prop="needCount" label="需求个数" />
          <el-table-column prop="bugCount" label="缺陷个数" />
          <el-table-column prop="taskCount" label="任务项个数" />
          <el-table-column prop="exampleCount" label="用例数量" />
          <el-table-column prop="testCount" label="测试计划数量" />
          <el-table-column prop="gourpCount" label="参与人数" />
        </el-table>
        <h4 style="font-size: 16px;">批次内项目开发情况</h4>
        <el-table
          :data="projectDeveloping"
          border
          style="width: 100%"
        >
          <el-table-column prop="no" label="项目编号" />
          <el-table-column prop="name" label="项目名称" />
          <el-table-column prop="createBy" label="创建人" />
          <el-table-column prop="createTime" label="创建时间" />
          <el-table-column prop="taskStatus" label="项目状态" />
          <el-table-column prop="needCount" label="需求个数" />
          <el-table-column prop="bugCount" label="缺陷个数" />
          <el-table-column prop="taskCount" label="任务项个数" />
          <el-table-column prop="exampleCount" label="用例数量" />
          <el-table-column prop="testCount" label="测试计划数量" />
          <el-table-column prop="gourpCount" label="参与人数" />
        </el-table>
        <h4 style="font-size: 16px;">批次内产品研发情况</h4>
        <el-table
          :data="productDeveloping"
          border
          style="width: 100%"
        >
          <el-table-column prop="no" label="产品编号" />
          <el-table-column prop="name" label="产品名称" />
          <el-table-column prop="createBy" label="创建人" />
          <el-table-column prop="createTime" label="创建时间" />
          <el-table-column prop="taskStatus" label="产品状态" />
          <el-table-column prop="needCount" label="需求个数" />
          <el-table-column prop="bugCount" label="缺陷个数" />
          <el-table-column prop="taskCount" label="任务项个数" />
          <el-table-column prop="exampleCount" label="用例数量" />
          <el-table-column prop="testCount" label="测试计划数量" />
          <el-table-column prop="gourpCount" label="参与人数" />
        </el-table>
        <el-row>
          <el-col :span="8">
            <h4 style="font-size: 16px;">需求类型分布统计</h4>
            <div id="radarChart1" style="width: 100%; height: 200px;" />
          </el-col>
          <el-col :span="8">
            <h4 style="font-size: 16px;">缺陷分布统计</h4>
            <div id="radarChart2" style="width: 100%; height: 200px;" />
          </el-col>
          <el-col :span="8">
            <h4 style="font-size: 16px;">用例分布统计</h4>
            <div id="radarChart3" style="width: 100%; height: 200px;" />
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'AdminSystemIndex',
  data() {
    return {
      tabsGroup: ['2020', '2019', '2018', '2017'],
      noticeList:[
        {name:'软件中心测试管理系统研发需求评审',date:'2020-10-11'},
        {name:'测试部新创建项目2个',date:'2020-10-11'},
        {name:'2020分行任务启动',date:'2020-10-11'},
        {name:'网银转账产品启动',date:'2020-10-11'},
      ],
      radioActive: 1,
      tableData: [
        {
          no: 'a000001',
          name: '',
          createBy: '',
          createTime: '',
          taskStatus: '',
          needCount: '',
          bugCount: '',
          taskCount: '',
          exampleCount: '',
          testCount: '',
          gourpCount: ''
        },
        {
          no: 'a000002',
          name: '',
          createBy: '',
          createTime: '',
          taskStatus: '',
          needCount: '',
          bugCount: '',
          taskCount: '',
          exampleCount: '',
          testCount: '',
          gourpCount: ''
        },
        {
          no: 'a000003',
          name: '',
          createBy: '',
          createTime: '',
          taskStatus: '',
          needCount: '',
          bugCount: '',
          taskCount: '',
          exampleCount: '',
          testCount: '',
          gourpCount: ''
        }
      ],
      taskExecution:[
        {
          no: '202001',
          name: '2020分行任务',
          createBy: '李明',
          createTime: '2020-10-26 ',
          taskStatus: '执行中',
          needCount: '1657',
          bugCount: '587',
          taskCount: '365',
          exampleCount: '658',
          testCount: '2',
          gourpCount: '20'
        },
        {
          no: '202002',
          name: '2020测试任务',
          createBy: '李明',
          createTime: '2020-10-26',
          taskStatus: '审批中',
          needCount: '563',
          bugCount: '246',
          taskCount: '487',
          exampleCount: '894',
          testCount: '1',
          gourpCount: '18'
        },
        {
          no: '202003',
          name: '2020香港任务',
          createBy: '李明',
          createTime: '2020-10-26',
          taskStatus: '未开启',
          needCount: '0',
          bugCount: '0',
          taskCount: '0',
          exampleCount: '0',
          testCount: '0',
          gourpCount: '0'
        }
      ],
      projectDeveloping:[
        {
          no: '2020-P001',
          name: '软件中心测试管理系统研发',
          createBy: '戴强',
          createTime: '2020-10-18',
          taskStatus: '执行中',
          needCount: '358',
          bugCount: '1426',
          taskCount: '125',
          exampleCount: '985',
          testCount: '1',
          gourpCount: '35'
        },
        {
          no: '2020-P002',
          name: '行信APP升级',
          createBy: '戴强',
          createTime: '2020-10-18',
          taskStatus: '执行中',
          needCount: '80',
          bugCount: '254',
          taskCount: '20',
          exampleCount: '548',
          testCount: '1',
          gourpCount: '18'
        },
        {
          no: '2020-P003',
          name: '核心网银接口平台',
          createBy: '戴强',
          createTime: '2020-10-18',
          taskStatus: '执行中',
          needCount: '23',
          bugCount: '154',
          taskCount: '0',
          exampleCount: '365',
          testCount: '1',
          gourpCount: '9'
        }
      ],
      
      productDeveloping:[
        {
          no: '2020-CP001',
          name: '网银转账',
          createBy: '李煜',
          createTime: '2020-09-20',
          taskStatus: '执行中',
          needCount: '36',
          bugCount: '235',
          taskCount: '53',
          exampleCount: '568',
          testCount: '1',
          gourpCount: '13'
        },
        {
          no: '2020-CP002',
          name: '核心银行',
          createBy: '李煜',
          createTime: '2020-09-20',
          taskStatus: '执行中',
          needCount: '78',
          bugCount: '968',
          taskCount: '98',
          exampleCount: '456',
          testCount: '1',
          gourpCount: '9'
        },
        {
          no: '2020-CP003',
          name: 'BI分析数据中心支撑平台',
          createBy: '李煜',
          createTime: '2020-09-20',
          taskStatus: '执行中',
          needCount: '65',
          bugCount: '536',
          taskCount: '76',
          exampleCount: '236',
          testCount: '1',
          gourpCount: '10'
        }
      ],
      chart1: null,
      chart2: null,
      chart3: null,
      option1: {
        tooltip: {},
        legend: {
          top: 0,
          left: 'center',
          itemWidth: 10,
          itemHeight: 10,
          // data: ['已实现', '已拒绝','规划中','实现中']
        },
        
        series: [{
          type: 'pie',
          center: ['50%', '60%'],
          // roseType: 'radius',
          radius: '70%',
          data: [
           
            {value: 280, name: '已实现'},
            {value: 20, name: '已拒绝'},
            {value: 50, name: '规划中'},
            {value: 230, name: '实现中'},
          ]
        }]
      },
      option2: {
        tooltip: {},
        legend: {
          top: 0,
          left: 'center',
          itemWidth: 10,
          itemHeight: 10,
          // data: ['效率', '质量','完成率','主管评价','绩效考评']
        },
        
        series: [{
          type: 'pie',
          center: ['50%', '60%'],
          // roseType: 'area',
          radius: '70%',
          data: [
           
            {value: 20, name: '致命'},
            {value: 65, name: '严重'},
            {value: 356, name: '一般'},
            {value: 145, name: '提示'},
            {value: 32, name: '建议'}
          ]
        }]
      },
      option3: {
        tooltip: {},
        legend: {
          top: 0,
          left: 'center',
          itemWidth: 10,
          itemHeight: 10,
        },
        
        series: [{
          // type: 'radar',
          type: 'pie',
          center: ['50%', '60%'],
          radius: '70%',
          data: [
           
            {value: 230, name: '功能测试'},
            {value: 90, name: '安全测试'},
            {value: 83, name: '性能测试'},
          ]
        }]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.renderChart('1')
      this.renderChart('2')
      this.renderChart('3')
    })
  },
  methods: {
    renderChart(n) {
      this['chart' + n] = echarts.init(document.getElementById('radarChart' + n))
      // 使用刚指定的配置项和数据显示图表。
      this['chart' + n].setOption(this['option'+n])
    }
  }
}
</script>

<style lang="scss" scoped>
.ad{ height: 100px; line-height: 100px; text-align: center; font-size: 12px; color: #fff; background-size: 100% 100%;
  ::v-deep{
    .el-card__body{ padding: 0;}
  }
  strong{ font-size: 24px;}
  &.ad1{ background: #287dd0 url('~@/assets/system/ad1.jpg') no-repeat;}
  &.ad2{ background: #47aae5 url('~@/assets/system/ad2.jpg') no-repeat;}
  &.ad3{ background: #73d2b5 url('~@/assets/system/ad3.jpg') no-repeat;}
  &.ad4{ background: #fc8b3b url('~@/assets/system/ad4.jpg') no-repeat;}
}
.notice{
  &-card{
    ::v-deep{
      .el-card__header{ padding: 10px;}
      .el-card__body{ padding: 10px; height: 120px;}
    }
  }
  &-list{
    .item{ font-size: 14px; line-height: 1.5; margin: 3px 0;overflow: hidden;
        span {
          display: block;
        }
        .notice_time {
          width: 75px;float: right;
        }
        .notice_name {
          float: left;
          width: calc(100% - 80px);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          
        }
    
    }
  }
}
.radioTabs{ margin-top: -40px;}
</style>
