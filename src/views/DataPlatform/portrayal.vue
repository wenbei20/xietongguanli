<template>
  <el-row class="portrayal">
    <el-col class="left">
      <el-tree
        :data="treeData"
        :props="defaultProps"
        node-key="id"
        :default-expanded-keys="['1-1']"
        :default-expand-all="true"
        @node-click="handleNodeClick"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <i :class="['custom-icon', data.icon]" />
          <span>{{ node.label }}</span>
        </span>
      </el-tree>
    </el-col><!--/left-->
    <el-col class="right">
      <div class="part-title">部门用户</div>
      <el-card class="userGroup" shadow="never" body-style="padding: 15px 20px;">
        <el-row :gutter="20">
          <el-col v-for="el in users" :key="el.id" :span="4">
            <el-avatar size="mini" style="vertical-align: middle;" :class="{'active':el.id === '1'}">{{ el.value }}</el-avatar>
            {{ el.name }}
          </el-col>
        </el-row>
      </el-card>
      <el-row :gutter="20" style="margin-top: 10px;">
        <el-col :span="16">
          <el-card class="personal" shadow="never">
            <div class="el-row">
              <el-col :span="12" class="left">
                <el-avatar :src="mainAvatar" />
                <div class="name">张晓明</div>
                <div class="tags">
                  <el-tag type="primary" effect="dark">前端开发工程师</el-tag>
                  <br>
                  <el-tag type="success" size="small" effect="dark">在职</el-tag>
                  <el-tag type="warning" size="small" effect="dark">SE1</el-tag>
                </div>
              </el-col>
              <el-col :span="12" class="right">
                <el-row class="details">
                  <el-col :span="12">
                    <h6>部门：</h6><p>开发部门</p>
                  </el-col>
                  <el-col :span="12">
                    <h6>团队：</h6><p>大数据中台组</p>
                  </el-col>
                  <el-col :span="12">
                    <h6>年龄：</h6><p>28岁</p>
                  </el-col>
                  <el-col :span="12">
                    <h6>工作时间：</h6><p>5年</p>
                  </el-col>
                  <el-col :span="24">
                    <h6>入职时间：</h6><p>2017年3月28日</p>
                  </el-col>
                </el-row>
                <div class="title">擅长技术</div>
                <div class="area">
                  <el-tag v-for="t in tags" :key="t" size="small">{{ t }}</el-tag>
                </div>
              </el-col>
            </div>
          </el-card>
          <el-row style="margin-top: 10px;">
            <el-col :span="12">
              <div class="part-title">能力分析</div>
              <div class="nengli">
                <div class="title">{{ nengli.title }}</div>
                <el-divider />
                <div class="content">
                  <div v-for="li in nengli.list" :key="li" class="item">{{ li }}</div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div ref="radarChart" style="width: 100%; height: 300px;" />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <div class="part-title">历年参与的项目</div>
          <div class="list">
            <div v-for="(item, index) in xiangmu" :key="index" class="item">
              <div class="title">{{ item.title }}</div>
              <div class="info">
                <el-tag v-for="tag in item.tags" :key="tag" type="info" effect="plain">{{ tag }}</el-tag>
              </div>
              <div class="other">{{ item.time }}</div>
            </div>
          </div>
          <div class="part-title">历年参与的产品</div>
          <div class="list">
            <div v-for="(item, index) in chanpin" :key="index" class="item">
              <div class="title">{{ item.title }}</div>
              <div class="info">
                <el-tag v-for="tag in item.tags" :key="tag" type="info" effect="plain">{{ tag }}</el-tag>
              </div>
              <div class="other">{{ item.time }}</div>
            </div>
          </div>
        </el-col>
      </el-row><!--/el-row-->
      <el-row style="margin-top: 10px;">
        <el-col :span="24">
          <div class="part-title">岗位与职级评定</div>
          <el-table
            :data="pingding"
            style="width: 100%"
          >
            <el-table-column prop="date" label="任职时间" width="180" />
            <el-table-column prop="name" label="部门名称" width="180" />
            <el-table-column label="职级" min-width="80">
              <template slot-scope="scope">
                <el-tag style=" margin: 5px;">{{ scope.row.tags[0] }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="岗位" min-width="180">
              <template slot-scope="scope">
                <el-tag style=" margin: 5px;">{{ scope.row.tags[1] }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row><!--/el-row-->
      <el-row style="margin-top: 10px;">
        <el-col :span="24">
          <div class="part-title">工作绩效考评</div>
          <div class="kaoping">
            <div v-for="(item, index) in kaoping" :key="index" :class="['item', item.star.includes('A') ? 'high' : null]">
              <div class="title">{{ item.time }}</div>
              <div class="count">{{ item.star }}</div>
            </div>
          </div>
        </el-col>
      </el-row><!--/el-row-->
    </el-col><!--/right-->
  </el-row>
</template>

<script>
import mainAvatar from '@/assets/icon/user.png'
import echarts from 'echarts'

export default {
  name: 'Portrayal',
  data() {
    return {
      treeData: [
        {
          id: '1-1',
          label: '中国银行股份有限公司软件中心',
          children: [
            {
              id: '1-1-1',
              label: '部门',
              icon: 'el-icon-user',
              children: [
                {
                  id: '1-1-1-1',
                  label: '大数据部门',
                  icon: 'el-icon-user'
                },
                {
                  id: '1-1-1-2',
                  label: '测试部门',
                  icon: 'el-icon-user'
                },
                {
                  id: '1-1-1-3',
                  label: '开发部门',
                  icon: 'el-icon-user',
                  children: [
                    {
                      id: '1-1-1-3-1',
                      label: '前端研发部门',
                      icon: 'el-icon-user'
                    },
                    {
                      id: '1-1-1-3-2',
                      label: '后端研发部门',
                      icon: 'el-icon-user'
                    }
                  ]
                }
              ]
            },
            {
              id: '1-1-2',
              label: '项目',
              icon: 'el-icon-document',
              children: [
                {
                  id: '1-1-2-1',
                  label: '中行外汇结算接口应用',
                  icon: 'el-icon-document'
                },
                {
                  id: '1-1-2-2',
                  label: '中行移动端APP研发二期',
                  icon: 'el-icon-document'
                }
              ]
            },
            {
              id: '1-1-3',
              label: '团队',
              icon: 'el-icon-office-building',
              children: [
                {
                  id: '1-1-2-1',
                  label: '数据中台组',
                  icon: 'el-icon-office-building'
                },
                {
                  id: '1-1-2-2',
                  label: '数据接口组',
                  icon: 'el-icon-office-building'
                }
              ]
            },
            {
              id: '1-1-4',
              label: '产品',
              icon: 'el-icon-box',
              children: [
                {
                  id: '1-1-2-1',
                  label: '数据中台组',
                  icon: 'el-icon-box'
                },
                {
                  id: '1-1-2-2',
                  label: '数据接口组',
                  icon: 'el-icon-box'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
        icon: 'icon'
      },
      users: [
        { id: '1', name: '张晓明', value: 'ad1' },
        { id: '2', name: '用户2', value: 'ad2' },
        { id: '3', name: '用户3', value: 'ad3' },
        { id: '4', name: '用户4', value: 'ad4' },
        { id: '5', name: '用户5', value: 'ad5' }
      ],
      chart: null,
      option: {
        tooltip: {},
        legend: {
          top: 20,
          left: 'center',
          itemWidth: 10,
          itemHeight: 10,
          data: ['平均值', '张晓明']
        },
        color: ['#5377e9', '#3fe5dd'],
        radar: {
        // shape: 'circle',
          radius: '50%',
          center: ['50%', '60%'],
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#5377e9',
              borderRadius: 3,
              padding: [5, 5, 3]
            }
          },
          indicator: [
            { name: '效率', max: 6500 },
            { name: '质量', max: 16000 },
            { name: '完成率', max: 30000 },
            { name: '主管评价', max: 38000 },
            { name: '绩效考评', max: 52000 }
          ]
        },
        series: [{
          type: 'radar',
          // areaStyle: {normal: {}},
          data: [
            {
              value: [4300, 10000, 28000, 35000, 50000],
              name: '平均值',
              areaStyle: {
                color: 'rgba(83, 119, 233, 0.9)'
              }
            },
            {
              value: [5000, 14000, 28000, 31000, 42000],
              name: '张晓明',
              areaStyle: {
                color: 'rgba(63, 229, 221, 0.9)'
              }
            }
          ]
        }]
      },
      mainAvatar,
      tags: ['Java', 'Vue', 'Hadoop', 'Redis', 'Css'],
      nengli: {
        title: '参与项目数量： 6',
        list: [
          '效率：85% (平均：83%)',
          '质量：92% (平均：89%)',
          '完成率：90% (平均：98%)',
          '主管评价：优 (平均：良)',
          '绩效考评：A+ (平均：A)'
        ]
      },
      xiangmu: [
        { title: '客户关系CRM系统', tags: ['开发工程师'], time: '2017年12月' },
        { title: '中行移动端APP研发二期', tags: ['技术经理'], time: '2019年01月' }
      ],
      chanpin: [
        { title: '中行外汇结算接口应用', tags: ['开发工程师'], time: '2017年6月' },
        { title: 'BI分析数据中心支撑平台', tags: ['技术经理'], time: '2019年6月' }
      ],
      pingding: [
        {
          date: '2016年12月',
          name: '入职大数据分析组',
          tags: ['工程师E3', '前端开发工程师']
        },
        {
          date: '2017年06月',
          name: '数据中台组',
          tags: ['高级工程师SE1', '技术经理']
        },
        {
          date: '2018年08月',
          name: '数据接口组',
          tags: ['高级工程师SE1', '技术经理']
        }
      ],
      kaoping: [
        { time: '2018年Q1', star: 'B' },
        { time: '2018年Q2', star: 'A' },
        { time: '2018年Q3', star: 'A+' },
        { time: '2018年Q4', star: 'B' },
        { time: '2019年Q1', star: 'A' },
        { time: '2019年Q2', star: 'A+' },
        { time: '2019年Q3', star: 'B' },
        { time: '2019年Q4', star: 'A' },
        { time: '2020年Q1', star: 'A' }
      ]
    }
  },
  mounted() {
    this.renderChart()
  },
  methods: {
    handleNodeClick(data) {
      console.log(57, data)
    },
    renderChart() {
      this.chart = echarts.init(this.$refs.radarChart)
      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(this.option)
    }
  }
}
</script>

<style lang="scss" scoped>
.portrayal{ min-height: 100%; background: #fff;
  > .el-col{ min-height: 100%; height: 100%; padding: 10px;}
  > .left{ width: 240px; border-right: #e5e5e5 solid 1px;
    .el-tree{
      ::v-deep{
        .el-tree-node{ font-size: 14px; color: #333; font-weight: 600;
          &__content{ height: 30px; line-height: 30px;}
          &__expand-icon{ display: none;}
          &__children{
            .el-tree-node{ font-weight: 400;}
          }
          &.is-current{
            > .el-tree-node__content{ color: #1890ff;}
          }
        }
      }
      .custom-icon{ margin: 0 5px;}
    }
  }
  > .right{ width: calc(100% - 240px); padding: 10px 20px; border-left: #e5e5e5 solid 1px; margin-left: -1px;
    .part-title{ font-size: 16px; font-weight: 800; line-height: 1; margin: 10px 0 20px; padding: 0 10px; border-left: 3px solid #1890ff; color: #151515;}
    .userGroup{ border: none; background: #eef3ff; margin-bottom: 20px;
      .el-avatar{ background: #b3bbd0;
        &.active{background: #5377e9;}
      }
    }
    .personal{ background: #5377e9 url('~@/assets/login/login-bg.jpg') no-repeat left bottom; height: 300px; border: none; color: #fff;
      ::v-deep{
        .el-card__body{ padding: 0; height: 100%;
          > .el-row{
            &, & > .el-col{ height: 100%;}
          }
        }
      }
      .left{ text-align: center; padding: 10px;
        .el-avatar{ width: 120px; height: 120px; margin-top: 20px;}
        .name{ font-size: 20px; font-weight: 800; line-height: 2.5; padding: 0;}
        .el-tag--dark{ font-weight: 400; margin: 5px;}
      }
      .right{ background: rgba(255, 255, 255, .1); padding: 15px 20px!important;
        .details{ padding: 0; line-height: 1.5; font-size: 14px;
          .el-col{ padding: 3px 0;
            h6{ font-size: 12px; color: rgba(0, 0, 0, .5); margin: 0;}
            p{ font-size: 14px; margin: 0;}
          }
        }
        .title{ font-size: 12px; margin: 10px 0; font-weight: 800; color: rgba(0, 0, 0, .5);}
        .area{ background: rgba(0, 0, 0, .1); padding: 5px; border-radius: 5px;
          .el-tag{ margin: 5px; background: rgba(255, 255, 255, .1); border-color: rgba(255, 255, 255, .1); color: #fff;}
        }
      }
    }
    .list{ overflow: hidden;
      .item{ font-size: 14px; line-height: 1.8; background: #eef3ff; border-radius: 4px; margin-bottom: 10px; padding: 10px;
        .title{ font-size: 14px; font-weight: 600; margin-bottom: 10px;}
        .info{ display: inline-block; width: calc(100% - 100px);}
        .other{ width: 90px; float: right; font-size: 12px; text-align: right; margin-top: 5px; color: rgba(0, 0, 0, .5);}
      }
    }
    .nengli{ background: #eef3ff; padding: 10px;
      .title{ font-size: 12px; line-height: 1.8; font-weight: 800;}
      .el-divider{ background: #d6ddec; margin:10px 0;}
      .content{
        .item{ font-size: 14px; line-height: 1.8;}
      }
    }
    .kaoping{
      &:after{ content: ''; clear: both; display: table; line-height: 0;}
      .item{ width: 10%; float: left; margin: 10px; padding: 0; background: #eef3ff; border-radius: 4px; text-align: center; overflow: hidden;
        .title{ color: #fff; padding: 10px; background: #afc2ef;}
        .count{ font: 20px/2.5 Arial; color: #8c8c8c; }
        &.high{
          .title{ background: #7b9ae4;}
          .count{ color: #3d52de;}
        }
      }
    }
  }
}
</style>
