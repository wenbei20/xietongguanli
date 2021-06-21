<template>
  <div class="app-container">
    <div class="leftTree">
      <div class="title">缺陷已存报表</div>
      <div>
        <el-tree :render-content="renderFunc" :data="TreeData" :props="defaultProps" @node-click="handleNodeClick" />
      </div>
    </div>
    <div class="rightarea">
      <h2>
        <el-link :underline="false" @click="goBack"><i class="el-icon-back" /> 返回</el-link>
        <el-divider direction="vertical" />
        缺陷每日变化趋势
      </h2>
      <div class="savebtns">
        <el-button plain disabled size="small">保存</el-button>
        <el-button plain size="small" disabled>另存为</el-button>
      </div>
      <div class="item">
        <el-row style="padding-top:20px;max-height:72px;">
          <el-col :span="2" class="header">
            统计项
            <el-tooltip effect="dark" placement="right">
              <i class="el-icon-question" />
              <div slot="content">
                选择需要统计的不同Bug分类数<br>
                据，进行趋势统计。
              </div>
            </el-tooltip>
          </el-col>
          <el-col :span="6">
            <el-checkbox-group v-model="statistics">
              <el-checkbox label="创建缺陷总数" />
              <el-checkbox label="修复缺陷总数" />
              <el-checkbox label="关闭缺陷总数" />
              <el-checkbox label="未关闭缺陷总数" />
            </el-checkbox-group>
          </el-col>
          <el-col :span="3" :offset="1" class="header">
            统计时间段<span>*</span>
          </el-col>

          <el-col :span="12">
            <el-select v-model="time.type" size="mini" style="width:140px;">
              <el-option value="1" label="固定时间" />
              <el-option value="2" label="动态时间段之内" />
              <el-option value="3" label="动态时间段之前" />
            </el-select>
            从
            <el-date-picker
              v-model="time.timezoom"
              size="mini"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:214px;"
            />
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="2" class="header radio">
            是否累计
            <el-tooltip effect="dark" placement="right">
              <i class="el-icon-question" />
              <div slot="content">
                累计表示统计项随时间总数量的趋势，<br>
                不累计只反应统计时间段间的相应值。
              </div>
            </el-tooltip>
          </el-col>
          <el-col :span="6">
            <el-radio-group v-model="accumulative">
              <el-radio label="是" />
              <el-radio label="否" />
            </el-radio-group>

          </el-col>

          <el-col :span="3" :offset="1" class="header">
            统计点时间间隔 <span>*</span>
          </el-col>

          <el-col :span="12">
            <el-select v-model="timeGapType" size="mini" style="width:140px;">
              <el-option value="1" label="天" />
              <el-option value="2" label="周" />
              <el-option value="3" label="月" />
              <el-option value="4" label="年" />
            </el-select>

          </el-col>
        </el-row>
        <el-row>

          <el-col :span="6" :offset="2">
            <el-button  size="mini">生成报表</el-button>
            <el-button size="mini">
              更多条件
              <i class="el-icon-arrow-down" />
            </el-button>
            <el-button size="mini" style="border:none;">清空</el-button>
          </el-col>
          <el-col :span="3" :offset="1" class="header radio">是否包含周末</el-col>
          <el-col :span="12">
            <el-radio-group v-model="isWeekend">
              <el-radio label="是" />
              <el-radio label="否" />
            </el-radio-group>

          </el-col>
        </el-row>

      </div>
      <div class="item">
        <div class="title">
          缺陷每日变化趋势

        </div>
        <div class="cnt">
          <div id="chart1" class="chart">
            <barChart id="echarts_qxmrbh" />
          </div>
        </div>
      </div>
      <div class="item">
        <el-table
          :data="tableData"
          :cell-class-name="CellClassName"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="date"
            label="日期"
            min-width="180"
          />
          <el-table-column
            prop="all"
            label="创建缺陷总数"
            min-width="180"
          />
          <el-table-column
            prop="xiufu"
            label="修复缺陷总数"
            min-width="180"
          />
          <el-table-column
            prop="close"
            label="关闭缺陷总数"
            min-width="180"
          />
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import leftTree from '@/components/leftTreeNav/index'
import barChart from '../../DataPlatform/components/BarCharts'

export default {
  components: { leftTree, barChart },
  data() {
    return {
      statistics: [],
      accumulative: '',
      time: {
        type: '',
        timezoom: ''
      },
      timeGapType: '',
      isWeekend: '',
      tableData: [{
        date: '2020-05',
        all: '100',
        xiufu: '300',
        close: '230'
      }, {
        date: '2020-06',
        all: '530',
        xiufu: '134',
        close: '351'
      }, {
        date: '2020-07',
        all: '560',
        xiufu: '252',
        close: '225'
      }, {
        date: '2020-08',
        all: '161',
        xiufu: '131',
        close: '270'
      },
      {
        date: '2020-09',
        all: '150',
        xiufu: '199',
        close: '188'
      },
      {
        date: '2020-10',
        all: '224',
        xiufu: '139',
        close: '291'
      }
      ],
      TreeData: [
        {
          label: '缺陷分布统计',
          children: [
            { label: '缺陷状态分布图', children: [] },
            { label: '缺陷严重级别分布图', children: [] },
            { label: '缺陷处理人/状态分布图', children: [] }
          ]
        },
        {
          label: '缺陷趋势统计',
          children: [{
            label: '缺陷每日变化趋势',
            children: []
          }, {
            label: '缺陷累计变化趋势',
            children: []
          }]
        },
        {
          label: '缺陷年龄统计',
          children: [{
            label: '状态年龄报告',
            children: []
          }]
        },
        {
          label: '其他缺陷报表',
          children: [{
            label: '缺陷回归分布',
            children: []
          }, {
            label: '缺陷解决率',
            children: []
          }]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick() {},
    renderFunc(h, { node, data, store }) {
      if (data.children.length !== 0) {
        return <span class='el-tree-node__label'>{ data.label } <i class='el-icon-plus selfIcon' ></i></span>
      } else {
        return <span class='el-tree-node__label'>{data.label} <i class='el-icon-more selfIcon' ></i> </span>
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    CellClassName({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'paddleftTd'
      } else if (columnIndex === 3) {
        return 'paddrightTd'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
    text-align: right;
    padding-right: 20px;
    line-height: 30px;
    min-width: 80px;
    span {
        color: #f00;
        display: inline-block;
        margin-left: 1px;
    }
    &.radio {
        line-height: 20px;
    }
}
.el-col{
    // white-space: nowrap;
}
.rightarea {
    margin-left: 270px;
    position: relative;

    .savebtns {
        position: absolute;
        right: 0;
        top: 0;
    }

    h2 {
        margin-top: 0;
    }
    .item{
        background-color: #fff;
        box-shadow: 0 0 10px rgba(128, 145, 165, 0.2);
        // padding: 20px 8px 0 8px;
        margin-bottom: 20px;
        min-width: 1120px;
        overflow-x: auto;
        .el-row {
            padding-bottom: 15px;
            max-height: 50px;
        }
        .title {
            height: 45px;
            line-height: 45px;
            font-size: 14px;
            text-align: center;
            border-bottom: 1px solid #dfe6ee;
            >div{
                padding: 0 8px;
            }

        }
        .chart {
            width: 100%;
            height: 440px;
        }
    }
}

.leftTree {

    box-shadow: 0 0 10px rgba(128, 145, 165, 0.2);
    background-color: #fff;
    float: left;
    width: 250px;
    border-radius: 4px;
    height: 100%;
    .title {
        padding: 14px 18px 6px;
        border-bottom: 1px solid #e3e3ec;
        font-size: 15px;
    }
}

</style>
<style  scoped>
.item >>> .el-table td {
     border-bottom: none;
     text-align: center;
 }
.item >>>  .el-table th {
    /* border-bottom: none; */
    /* padding-left: 30px; */
     text-align: center;
}
.leftTree >>>  .el-tree-node__label {
    display: inline-block;
    width: 100%;
    padding-right: 10px;
}
.leftTree >>>  .el-tree-node__label .selfIcon {
    margin-top: 3px;
    float: right;
    opacity: 0;
}
.leftTree >>>  .el-tree-node__label:hover .selfIcon {
    opacity: 1;
}
.leftTree >>>  .el-tree-node__label .el-icon-more.selfIcon {
    transform: rotateZ(90deg);
}

/* .item >>> .paddleftTd {
    padding-left: 30px;
} */

</style>
