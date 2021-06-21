<template>
  <div class="app-container">
    <el-row>
      <el-col class="left">
        <el-collapse
          v-model="activeName"
          accordion
        >
          <el-collapse-item
            v-for="item in collapseData"
            :key="item.id"
            :name="item.id"
          >
            <template slot="title">
              <div class="title">{{ item.header.title }}</div>
              <div class="info">
                <span>{{ item.header.time }}</span>
              </div>
              <div class="info">
                <span
                  v-for="sp in item.header.total"
                  :key="sp.name"
                >
                  {{ sp.name }}：{{ sp.num }} {{ sp.unit }}
                </span>
              </div>
            </template>
            <div class="list">
              <div
                v-for="lt in item.content"
                :key="lt.id"
                class="item"
              >
                <span class="tag">{{ lt.tag }}</span>
                <span class="title">{{ lt.title }}</span>
                <span class="level">{{ lt.level }}</span>
                <span class="num">{{ lt.num }}</span>
                <span class="handle">
                  <i class="el-icon-close" />
                </span>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col class="right">
        <el-card shadow="never">
          <div slot="header" class="clearfix">
            <el-button plain size="small">规划到迭代</el-button>
            <el-divider direction="vertical" />
            <el-radio-group v-model="radioActive">
              <el-radio :label="1" style="margin-right: 10px;">需求</el-radio>
              <el-radio :label="2">缺陷</el-radio>
            </el-radio-group>
            <div style="float: right;">
              <el-button type="text" size="small"><i class="el-icon-s-operation" /> 过滤</el-button>
              <el-divider direction="vertical" />
              <span style="margin-right: 10px;">查询7条结果</span>
              <el-button type="text" size="small" style=" font-size: 14px;"><i class="el-icon-close" /></el-button>
              <el-button type="text" size="small" style=" font-size: 14px;"><i class="el-icon-setting" /></el-button>
            </div>
          </div>
          <vxe-table
            ref="xTree"
            resizable
            highlight-hover-row
            :auto-resize="true"
            stripe
            class="vxetable"
            :tree-config="{children: 'children',iconOpen: 'el-icon-remove-outline', iconClose: 'el-icon-circle-plus-outline',expandAll:true}"
            :edit-config="{trigger: 'click', mode: 'cell',showIcon:false}"
            :data="tableData"
          >
            <vxe-table-column type="checkbox" width="40" :resizable="false" />
            <vxe-table-column width="32" class="meuntd" :resizable="false" :edit-render="{}">
              <template>
                <div class="moreOuter">
                  <i class="el-icon-more" />

                </div>
              </template>
              <template slot="edit">
                <i class="el-icon-more" style="position:relative;top:-2px;" />

                <div class="editmenu">
                  <div class="item">编辑</div>
                  <div class="item">复制</div>
                  <div class="item">关注</div>
                  <div class="item">删除</div>
                  <div class="item create">创建子需求</div>
                </div>
              </template>
            </vxe-table-column>
            <vxe-table-column field="eventID" title="ID" />
            <vxe-table-column field="title" title="标题" tree-node width="300">
              <template slot="header">
                <i v-if="isAllExpand" class="el-icon-remove-outline biaotiicon" @click="closeAllNode" />
                <i v-else class="el-icon-circle-plus-outline biaotiicon" @click="closeAllNode" />

                标题
              </template>

              <template #default="{ row }">
                <span class="titleText" @click="toEditPage"><i /> {{ row.title }}</span>
              </template>

            </vxe-table-column>
            <vxe-table-column field="youxian" title="优先级" :edit-render="{}">

              <template #default="{ row }">
                <span class="youxianspan" :class="row.youxian">{{ row.youxian }}</span>
              </template>

              <template slot="edit" slot-scope="scope">
                <span>{{ scope.row.youxian }}</span>
                <div class="edityouxian">
                  <ul>
                    <li class="empty">--空--</li>
                    <li class="high">High</li>
                    <li class="middle">Middle</li>
                    <li class="low">Low</li>
                    <li class="nice">Nice to Have</li>
                  </ul>
                </div>
              </template>

            </vxe-table-column>

            <vxe-table-column field="diedai" title="迭代">
              <template #default="{ row }">
                <span>{{ row.diedai ? row.diedai : '--' }}</span>
              </template>

            </vxe-table-column>

            <vxe-table-column field="status" title="状态">
              <template #default="{ row }">
                <span class="statuspan" :class="row.status | statusClass">{{ row.status }}</span>
              </template>

            </vxe-table-column>

            <vxe-table-column field="person" title="处理人" :edit-render="{}">
              <template #default="{ row }">
                {{ row.person ? row.person : '--' }}
              </template>

              <template slot="edit" slot-scope="scope">
                <el-input v-model="scope.row.person" size="mini" />
              </template>

            </vxe-table-column>

            <vxe-table-column field="startTime" title="预计开始" :edit-render="{}">
              <template #default="{ row }">
                {{ row.startTime ? row.startTime : '--' }}
              </template>

              <template slot="edit" slot-scope="scope">

                <el-date-picker
                  v-model="scope.row.startTime"
                  type="date"
                  placeholder="选择日期"
                />
              </template>

            </vxe-table-column>

            <vxe-table-column field="endTime" title="预计结束" :edit-render="{}">
              <template #default="{ row }">
                {{ row.endTime ? row.endTime : '--' }}
              </template>

              <template slot="edit" slot-scope="scope">

                <el-date-picker
                  v-model="scope.row.endTime"
                  type="date"
                  placeholder="选择日期"
                />
              </template>

            </vxe-table-column>

          </vxe-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'PlanIteration',
  filters: {
    statusClass(e) {
      switch (e) {
        case '已实现':
          return 'gray'
        case '实现中':
          return 'blue'
        case '规划中':
          return 'green'
        case '已拒绝':
          return 'blue'
        default :
          return 'green'
      }
    }
  },
  data() {
    return {
      activeName: '1',
      collapseData: [
        {
          id: '1',
          header: {
            title: '迭代1',
            time: '2020-08+24 ~ 2020-09-04',
            progress: 67,
            total: [
              { name: '需求', num: 6, unit: '个' },
              { name: '缺陷', num: 0, unit: '个' },
              { name: '规模', num: 5, unit: '点' }
            ]
          },
          content: [
            { id: 'a1', title: '需求1', level: 'High', tag: '5', num: 2 },
            { id: 'a2', title: '需求3', level: 'High', tag: '5', num: 3 },
            { id: 'a3', title: '标题内容33', level: 'Middle', tag: '5', num: 0 },
            { id: 'a4', title: 'test001', level: 'High', tag: '5', num: 0 }
          ]
        }
      ],
      radioActive: 1,
      isAllExpand: true,
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          title: '按照部门统计巡检漏检结果',
          checked: false,
          eventID: '1018723',
          youxian: 'High',
          diedai: 'V3.2',
          status: '已实现',
          person: '赵鹏翔;刘彩萍',
          startTime: '2020-09-07',
          endTime: '2020-09-11'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          title: '终端软件更新web端开发',
          checked: false,
          eventID: '1003470',
          youxian: 'High',
          diedai: '--',
          status: '已拒绝',
          person: '刘峰',
          startTime: '2019-03-04',
          endTime: '2019-09-11',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              title: '版本号',
              checked: false,
              eventID: '1003471',
              youxian: 'High',
              diedai: '--',
              status: '已拒绝',
              person: '刘峰',
              startTime: '2019-03-04',
              endTime: '2019-03-05',
              children: [
                {
                  id: 31,
                  date: '2016-05-01',
                  name: '王小虎',
                  title: '版本文件列表',
                  checked: false,
                  eventID: '1003481',
                  youxian: 'High',
                  diedai: '服务端',
                  status: '已拒绝',
                  person: '刘峰',
                  startTime: '2019-03-04',
                  endTime: '2019-03-04'
                }, {
                  id: 31,
                  date: '2016-05-01',
                  name: '王小虎',
                  title: '添加版本号',
                  checked: false,
                  eventID: '1003480',
                  youxian: 'High',
                  diedai: '服务端',
                  status: '已拒绝',
                  person: '刘峰',
                  startTime: '2019-03-04',
                  endTime: '2019-03-04'
                }
              ]
            }
          ]
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          title: '系统管理',
          checked: false,
          eventID: '1003031',
          youxian: 'High',
          diedai: '--',
          status: '规划中',
          person: '安喜喜',
          startTime: '--',
          endTime: '--',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              title: '系统管理菜单-（菜单管理）',
              checked: false,
              eventID: '1003480',
              youxian: 'High',
              diedai: '--',
              status: '规划中',
              person: '安喜喜',
              startTime: '--',
              endTime: '--',
              children: [
                {
                  id: 3,
                  date: '2016-05-01',
                  name: '王小虎',
                  title: '系统管理菜单-（菜单管理）列表数据及分页',
                  checked: false,
                  eventID: '1004511',
                  youxian: 'High',
                  diedai: 'WEB前端',
                  status: '已实现',
                  person: '安喜喜',
                  startTime: '2019-03-05',
                  endTime: '2019-03-05'
                },
                {
                  id: 3,
                  date: '2016-05-01',
                  name: '王小虎',
                  title: '系统管理-（菜单管理）-需求讨论',
                  checked: false,
                  eventID: '1004507',
                  youxian: 'High',
                  diedai: 'WEB前端',
                  status: '已实现',
                  person: '安喜喜',
                  startTime: '2019-03-05',
                  endTime: '2019-03-05'
                },{
                  id: 3,
                  date: '2016-05-01',
                  name: '王小虎',
                  title: '系统管理-（菜单管理）-页面搭建',
                  checked: false,
                  eventID: '1004506',
                  youxian: 'High',
                  diedai: 'WEB前端',
                  status: '已实现',
                  person: '安喜喜',
                  startTime: '2019-03-05',
                  endTime: '2019-03-05'
                },{
                  id: 3,
                  date: '2016-05-01',
                  name: '王小虎',
                  title: '添加 菜单/按钮 权限',
                  checked: false,
                  eventID: '1004505',
                  youxian: 'High',
                  diedai: 'WEB前端',
                  status: '已实现',
                  person: '安喜喜',
                  startTime: '2019-03-05',
                  endTime: '2019-03-05'
                }
              ]
            }
          ]
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          title: '调试下载临时任务接口',
          checked: false,
          eventID: '1003026',
          youxian: 'Middle',
          diedai: '--',
          status: '已实现',
          person: '代海涛',
          startTime: '2019-03-05',
          endTime: '2019-03-05'
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          title: '优化视频视频录制播放功能',
          checked: false,
          eventID: '1002733',
          youxian: 'Middle',
          diedai: '--',
          status: '已实现',
          person: '代海涛',
          startTime: '2019-02-19',
          endTime: '2019-02-19',
          children: [
            {
              id: 4,
              date: '2016-05-03',
              name: '王小虎',
              title: '优化视频录制播放',
              checked: false,
              eventID: '1002736',
              youxian: 'Middle',
              diedai: 'APP安卓',
              status: '已实现',
              person: '代海涛',
              startTime: '2019-02-19',
              endTime: '2019-02-19'
            },
            {
              id: 4,
              date: '2016-05-03',
              name: '王小虎',
              title: '优化视频录制大小',
              checked: false,
              eventID: '1002734',
              youxian: 'Middle',
              diedai: 'APP安卓',
              status: '已实现',
              person: '代海涛',
              startTime: '2019-02-19',
              endTime: '2019-02-19'
            }
          ]
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          title: '调试刷纽扣提交开始和结束时间接口',
          checked: false,
          eventID: '1002705',
          youxian: 'Middle',
          diedai: '--',
          status: '已实现',
          person: '代海涛',
          startTime: '2019-03-04',
          endTime: '2019-03-04'
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          title: '调试同步巡检任务数据接口',
          checked: false,
          eventID: '1002704',
          youxian: 'Middle',
          diedai: '--',
          status: '已实现',
          person: '代海涛',
          startTime: '2019-03-01',
          endTime: '2019-03-01'
        }
      ]
    }
  },
  methods: {
    closeAllNode() {
      if (this.isAllExpand) {
        this.$refs.xTree.clearTreeExpand()
      } else {
        this.$refs.xTree.setAllTreeExpand(true)
      }

      this.isAllExpand = !this.isAllExpand
    },
    toaddpage() {
      this.$router.push({ name: 'xuqiuAdd' })
    },
    toEditPage() {
      this.$router.push({ name: 'xuqiuEdit' })
    },
    hidenavtree(e) {
      this.hidetree = e
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row{ height: 100%;
  .el-col{ height: 100%;
    &.left{ width: 300px;
      .el-collapse{ border: #ddd solid 1px;
        ::v-deep{
          .el-collapse-item{
            &__header{ padding: 5px 10px; height: auto; line-height: 20px; display: block; background:#f7f7f7; position: relative;
              .title{ font-size: 14px; line-height: 30px; margin-right: 20px; color: #478ee6;}
              .info{ line-height: 20px; font-weight: 400; color: #9298a0;
                span{ font-size: 12px; margin-right: 10px; font-weight: 400;}
              }
            }
            &__wrap{ border-top: #ddd solid 1px;}
            &__arrow{ position: absolute; top: 13px; right: 7px;}
            &__content{ padding: 5px 0;
              .list{
                .item{ display: flex; width: 100%; font-size: 12px; line-height: 20px; padding: 5px 10px; justify-content: flex-start; align-items: center; border-bottom: #eee dashed 1px; color: #999;
                  span{ text-align: center;}
                  .tag{ width: 14px; height: 14px; line-height: 14px; background: #478ee6; color: #fff; margin-right: 10px;}
                  .title{ text-align: left; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #333;}
                  .level{ width: 60px;}
                  .num{ width: 20px;}
                  .handle{ width: 20px;}
                }
              }
            }
            &:last-child{ margin-bottom: 0;}
          }
        }
      }
    }
    &.right{ width: calc(100% - 300px - 20px); margin-left: 20px;
      .el-card{ border-radius: 0; height: 100%;
        ::v-deep{
          .el-card__header{ height: 50px; padding: 8px 10px;}
          .el-card__body{ height: calc(100% - 50px); padding: 10px; overflow-y: auto;}
        }
        .titleText { cursor: pointer;
          i { display:inline-block; width: 32px; height:12px; background: url('~@/assets/setting/storysprite.png') no-repeat; background-position: -47px 0; }
          &:hover { color: #5d9bfc; }
        }
        .navtree { margin-left: 20px; height: 100%; }
        .vxetable {
          .youxianspan { display: inline-block; height: 20px; padding: 0 10px; line-height: 20px; color:#fff; border-radius: 2px; font-size: 12px; cursor: pointer;
            &.Low { background-color: #97afd0; }
            &.Nice { background-color: #97afd0; }
            &.High { background-color: #f85e5e; }
            &.Middle { background-color: #93c36b; }
          }
          .statuspan { display: inline-block; border: 1px solid #8091a5; color: #8091a5; max-height: 66px; font-size: 12px; line-height: 20px; vertical-align: middle; border-radius: 12px; cursor: pointer; overflow: visible; padding: 2px 10px;
            &.gray{ color: #999; }
            &.blue { border-color: #3582fb; color: #3582fb; }
            &.green { border-color: #93c46b; color: #93c46b; }
          }
        }
      }
    }
  }
}
</style>
