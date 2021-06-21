<template>
  <div class="app-container">
    <div>
      <el-tabs :lazy="true" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="任务量" name="first">
          <leftnav
            title=""
            class="leftnav"
            :tree-data="leftTreeData"
          />
          <div class="row" >
         
            <div class="charts">
              <div class="title">
                本期新增
                <i class="el-icon-s-fold"></i>
                <div class="right">
                  <el-date-picker
                    v-model="date"
                    size="mini"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
              <div class="echarts">

                <barChart id="echarts" />
              </div>

            </div>
            <div class="charts">
              <div class="title">
                期末积压
                <i class="el-icon-s-fold"></i>
                <div class="right">
                  <el-date-picker
                    v-model="date"
                    size="mini"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
              <div class="echarts">

                <barChart id="echarts_qmjy" />
              </div>

            </div>
          </div>


        </el-tab-pane>
          <el-tab-pane label="产能" name="second">
              <leftnav
                title=""
                class="leftnav"
                :tree-data="leftTreeData"
              />
              <div class="row" v-if="activeName === 'second'">
               
                <div class="charts">
                  <div class="title">
                    任务吞吐量
                    <i class="el-icon-s-fold"></i>
                    <div class="right">
                      <el-date-picker
                        v-model="date"
                        size="mini"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </div>
                  </div>
                  <div class="echarts">

                    <barChart id="echarts_yxttl" />
                  </div>

                </div>
                <div class="charts">
                  <div class="title">
                    用户故事吞吐量
                    <i class="el-icon-s-fold"></i>
                    <div class="right">
                      <el-date-picker
                        v-model="date"
                        size="mini"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </div>
                  </div>
                  <div class="echarts">

                    <barChart id="echarts_yhgsttl" />
                  </div>

                </div>
                  <div class="charts">
                  <div class="title">
                    全部子系统
                    <i class="el-icon-s-fold"></i>
                    <div class="right">
                      <el-date-picker
                        v-model="date"
                        size="mini"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </div>
                  </div>
                  <div class="echarts">

                    <barChart id="echarts_qbzxt" />
                  </div>

                </div>
              </div>
          </el-tab-pane>
          <el-tab-pane label="效率" name="third">
              <leftnav
                title=""
                class="leftnav"
                :tree-data="leftTreeData"
              />
              <div class="row" v-if="activeName === 'third'">
                <div class="count">
                  <countPanel info="超长未处理数" :count="numList2" ></countPanel>
                </div>
                <div class="count">
                  <countPanel info="超长未完成数" :count="numList" ></countPanel>
                </div>
                <div class="charts">
                  <div class="title">
                    需求处理时长
                    <i class="el-icon-s-fold"></i>
                    <div class="right">
                      <el-date-picker
                        v-model="date"
                        size="mini"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </div>
                  </div>
                  <div class="echarts">

                    <barChart id="echarts_xqclsc" />
                  </div>

                </div>

                <div class="charts">
                  <div class="title">
                    故障恢复时间
                    <i class="el-icon-s-fold"></i>
                    <div class="right">
                      <el-date-picker
                        v-model="date"
                        size="mini"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </div>
                  </div>
                  <div class="echarts">

                    <barChart id="echarts_gzhfsj" />
                  </div>

                </div>

                <div class="charts">
                  <div class="title">
                    版本计划完成率
                    <i class="el-icon-s-fold"></i>
                    <div class="right">
                      <el-date-picker
                        v-model="date"
                        size="mini"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </div>
                  </div>
                  <div class="echarts">

                    <barChart id="echarts_bbjhwcl" />
                  </div>

                </div>

                <div class="charts">
                  <div class="title">
                    处理时间超长数量
                    <i class="el-icon-s-fold"></i>
                    <div class="right">
                      <el-date-picker
                        v-model="date"
                        size="mini"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </div>
                  </div>
                  <div class="echarts">

                    <barChart id="echarts_clsjccsl" />
                  </div>

                </div>

                 <div class="charts">
                  <div class="title">
                    特性交付周期
                    <i class="el-icon-s-fold"></i>
                    <div class="right">
                      <el-date-picker
                        v-model="date"
                        size="mini"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </div>
                  </div>
                  <div class="echarts">

                    <barChart id="echarts_txjfzq" />
                  </div>

                </div>

              </div>
          </el-tab-pane>
        
          <el-tab-pane label="质量" name="five">
              <leftnav
                title=""
                class="leftnav"
                :tree-data="leftTreeData"
              />
              <div class="row"  v-if="activeName === 'five'">
             
                <div class="charts">
                  <div class="title">
                    缺陷数量
                    <i class="el-icon-s-fold"></i>
                    <div class="right">
                      <el-date-picker
                        v-model="date"
                        size="mini"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </div>
                  </div>
                  <div class="echarts">

                    <barChart id="echarts_qxsl" />
                  </div>

                </div>
                <div class="charts">
                  <div class="title">
                    测试缺陷（严重程度）分布图
                    <i class="el-icon-s-fold"></i>
                    <div class="right">
                      <el-date-picker
                        v-model="date"
                        size="mini"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </div>
                  </div>
                  <div class="echarts">

                    <barChart id="echarts_csqxfbt" />
                  </div>

                </div>
              </div>
          </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>
import leftnav from '@/components/leftTreeNav'
import barChart from './components/BarCharts'
import countPanel from './components/countPanel'

export default {
  components: { leftnav, barChart , countPanel },
  data() {
    return {
      activeName: 'first',
      systemSelect: 1,
      leftTreeData: [
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
      numList:[
        {name:'超长未处理任务数',num:3252},
        {name:'超长未处理需求数',num:442},
        {name:'超长未处理用户故事数',num:1797},
      ],
      numList2:[
        {name:'超长未完成任务数',num:1029},
        {name:'超长未完成需求数',num:634},
        {name:'超长未完成用户故事数',num:1062},
      ],
      date:''
    }
  },
  methods: {
    handleClick() {

    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
    background-color: #fff;
    height: auto;
    >div{
        height: 100%;
    }
    .leftnav {
        min-height: calc(100vh - 200px)
    }
    .row {
        width: calc(100% - 270px);
        margin-left: 270px;
        .charts {
            height: 400px;
            width: 100%;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(128, 145, 165, 0.2);
            position: relative;
            margin-bottom: 20px;

            .title {
              height: 40px;
              padding: 20px 20px 0 20px;
              width: 100%;
              font-size: 14px;
              .right {
                float: right;
              }

            }
            .echarts {
              height: 360px;
              width: 100%;
            }
        }
        .count {
          margin: 0 0 20px 0;
        }

    }
}



</style>
<style  scoped>
/* .app-container .navTree { */
    /* margin-top: 20px; */
/* } */

.app-container >>> .el-tabs__content {
    padding: 10px 4px;
}

.charts .title >>>  .el-date-editor{
  margin-top: -8px;
}
.charts .title >>> .el-input__inner {
  border: none;
}
.charts .title >>> .el-range-input {
  width: 100px;
}
.charts .title >>> .el-range-separator {
  line-height: 25px;
}

.charts .title >>> .el-date-editor--daterange.el-input__inner {
  width: 240px;
}
</style>
