<template>
  <div class="xuqiu_container XQ_and_QX">
    <div class="list-head">
      <div class="btns">
        <el-button type="primary" size="medium" @click="toaddpage"> <i class="el-icon-plus" /> 创建任务</el-button>
        <el-select v-model="caozuo" placeholder="更多操作">
          <el-option label="导出任务" value="1" />
          <el-option label="导入任务" value="2" />
          <el-option label="打印任务卡" value="3" />
        </el-select>
      </div>
      <div class="options">
        <div class="shitu">
          <span style="cursor:pointer" @click="showVIewMenu = true">

            <span><i class="el-icon-view" />视图</span>
            <b class="selectview">{{ shitu }}</b>
            <i class="el-icon-arrow-down" />
          </span>

          <drapMenu :width="170" :show.sync="showVIewMenu">
            <h5 class="drapdown_tit">系统视图</h5>
            <ul class="submenu">
              <li><div>我负责的</div></li>
              <li><div>我关注的</div></li>
              <li><div>我创建的</div></li>
              <li><div>所有的</div></li>
            </ul>
            <div>
              <i class="el-icon-plus" />
              新建视图
            </div>
            <div>
              <i class="el-icon-setting" />
              配置个人视图
            </div>
            <div>
              <i class="el-icon-setting" />
              配置系统视图
            </div>
          </drapMenu>
        </div>

        <div class="guolv">
          <span @click="showGuoLvMenu = true">
            <i class="el-icon-view" />
            <span>过滤</span>

          </span>
          <filterMenu :show.sync="showGuoLvMenu" from="xuqiu" :width="350" :left="-120" :top="46" />
        </div>
        <div class="num">
          共<span>{{ ListNum }}</span>个任务
        </div>
        <div class="setting">
          <i class="el-icon-setting" @click="showSettingMenu = true" />

          <drapMenu :width="180" :left="-140" :show.sync="showSettingMenu">
            <div>设置显示字段</div>
            <div class="noHighLight">
              <div class="tit">显示方式</div>
              <el-radio-group v-model="viewWay" size="mini">
                <el-radio-button label="树形" />
                <el-radio-button label="列表" />
              </el-radio-group>
            </div>
            <div class="noHighLight">
              <div class="tit">每页显示数量</div>
              <el-radio-group v-model="pageNum" size="mini">
                <el-radio-button label="10" />
                <el-radio-button label="20" />
                <el-radio-button label="50" />
              </el-radio-group>
            </div>
            <div>用例设置</div>
          </drapMenu>

        </div>

      </div>
    </div>

    <div class="table ">

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
        <vxe-table-column field="title" title="标题" width="300">

          <template #default="{ row }">
            <span class="titleText" @click="toEditPage"><i /> {{ row.title }}</span>
          </template>

        </vxe-table-column>

        <vxe-table-column field="xuqiu" title="需求">
          <template #default="{ row }">
            <span>{{ row.xuqiu ? row.xuqiu : '--' }}</span>
          </template>

        </vxe-table-column>

        <vxe-table-column field="diedai" title="迭代">
          <template #default="{ row }">
            <span>{{ row.diedai ? row.diedai : '' }}</span>
          </template>

        </vxe-table-column>

        <vxe-table-column field="status" title="状态" :filters="statusFilters">
          <template #default="{ row }">
            <span>{{ row.status ? row.status : '--' }}</span>
          </template>

        </vxe-table-column>

        <vxe-table-column field="gongshi" title="预估工时">
          <template #default="{ row }">
            <span>{{ row.gongshi ? row.gongshi : '--' }}</span>
          </template>

        </vxe-table-column>

        <vxe-table-column field="person" title="创建人" :edit-render="{}" :filters="PersonFilters">
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

    </div>

  </div>

</template>
<script>
import drapMenu from '@/components/drapdownMenu'
import filterMenu from '@/components/drapdownMenu/filterMenu'
export default {
  name: 'Xuqiu',
  components: { drapMenu, filterMenu },
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
      caozuo: '',
      shitu: '我负责的',
      ListNum: 11,
      isAllExpand: true,
      showVIewMenu: false,
      showGuoLvMenu: false,
      showSettingMenu: false,
      viewWay: '树形',
      pageNum: '10',
      tableData: [
        {
          id: 1,
          xuqiu: '',
          date: '2016-05-02',
          name: '王小虎',
          title: '根据开会结果的反馈重新整理菜单整合页',
          checked: false,
          eventID: '1018946',
          youxian: 'High',
          diedai: '--',
          status: '已完成',
          person: '张笑笑',
          startTime: '2020-10-16',
          gongshi: '2',
          endTime: '2020-10-16'
        },
        {
          id: 2,
          xuqiu: '',
          date: '2016-05-04',
          name: '王小虎',
          title: '修改菜单整合页面以及做演示交互效果',
          checked: false,
          eventID: '1018941',
          youxian: 'Low',
          diedai: '--',
          status: '已完成',
          person: '张笑笑',
          startTime: '2020-10-14',
          gongshi: '16',
          endTime: '2020-10-15'
        },
        {
          id: 3,
          xuqiu: '',
          date: '2016-05-01',
          name: '王小虎',
          title: '修改榆林化学技术方案',
          checked: false,
          eventID: '1018940',
          youxian: 'High',
          diedai: '--',
          status: '已完成',
          person: '季文彬',
          startTime: '2020-10-16',
          gongshi: '3',
          endTime: '2020-10-16'

        },
        {
          id: 4,
          xuqiu: '',
          date: '2016-05-03',
          name: '王小虎',
          title: '修改智能巡检招标技术方案1010--长城能化',
          checked: false,
          eventID: '1018939',
          youxian: 'Nice To Have',
          diedai: '--',
          status: '已完成',
          person: '季文彬',
          startTime: '2020-10-15',
          gongshi: '3',
          endTime: '2020-10-15'
        },
        {
          id: 4,
          xuqiu: '增加漏检统计',
          date: '2016-05-03',
          name: '王小虎',
          title: '增加漏检统计-后台开发',
          checked: false,
          eventID: '1018938',
          youxian: 'Nice To Have',
          diedai: 'V3.4（当前迭代）',
          status: '未开始',
          person: '--',
          startTime: '--',
          gongshi: '0',
          endTime: '--'
        },
        {
          id: 4,
          xuqiu: '增加漏检统计',
          date: '2016-05-03',
          name: '王小虎',
          title: '增加漏检统计-前端开发',
          checked: false,
          eventID: '1018937',
          youxian: 'Nice To Have',
          diedai: 'V3.4（当前迭代）',
          status: '未开始',
          person: '--',
          startTime: '--',
          gongshi: '0',
          endTime: '--'
        },
        {
          id: 4,
          xuqiu: '增加漏检统计',
          date: '2016-05-03',
          name: '王小虎',
          title: '增加漏检统计-前端设计',
          checked: false,
          eventID: '1018936',
          youxian: 'Nice To Have',
          diedai: 'V3.4（当前迭代）',
          status: '未开始',
          person: '--',
          startTime: '--',
          gongshi: '0',
          endTime: '--'
        },
        {
          id: 4,
          xuqiu: '--',
          date: '2016-05-03',
          name: '王小虎',
          title: '参加5G智慧巡检研讨会2',
          checked: false,
          eventID: '1018935',
          youxian: 'Nice To Have',
          diedai: '--',
          status: '已完成',
          person: '季文彬',
          startTime: '2020-10-12',
          gongshi: '4',
          endTime: '2020-10-12'
        },
        {
          id: 4,
          xuqiu: '--',
          date: '2016-05-03',
          name: '王小虎',
          title: '编写智能巡检与集群指挥调度系统招标技术方案',
          checked: false,
          eventID: '1018934',
          youxian: 'Nice To Have',
          diedai: '--',
          status: '已完成',
          person: '季文彬',
          startTime: '2020-10-09',
          gongshi: '12',
          endTime: '2020-10-10'
        },
        {
          id: 4,
          xuqiu: '--',
          date: '2016-05-03',
          name: '王小虎',
          title: '修改巡检软著申请材料',
          checked: false,
          eventID: '1018933',
          youxian: 'Nice To Have',
          diedai: '--',
          status: '已完成',
          person: '杨甜甜',
          startTime: '2020-09-27',
          gongshi: '4',
          endTime: '2020-09-27'
        },
        {
          id: 4,
          xuqiu: '--',
          date: '2016-05-03',
          name: '王小虎',
          title: '巡检方案编写与修改',
          checked: false,
          eventID: '1018932',
          youxian: 'Nice To Have',
          diedai: '--',
          status: '已完成',
          person: '杨甜甜',
          startTime: '2020-09-23',
          gongshi: '8',
          endTime: '2020-09-24'
        },
        {
          id: 4,
          xuqiu: '--',
          date: '2016-05-03',
          name: '王小虎',
          title: '巡检3.0bug修复以及部分代码优化',
          checked: false,
          eventID: '1018931',
          youxian: 'Nice To Have',
          diedai: '--',
          status: '已完成',
          person: '代海涛',
          startTime: '2020-08-26',
          gongshi: '24',
          endTime: '2020-09-02'
        },
        {
          id: 4,
          xuqiu: '--',
          date: '2016-05-03',
          name: '王小虎',
          title: '查看智能安全管理平台后台系统页面，并提出意见修改',
          checked: false,
          eventID: '1018930',
          youxian: 'Nice To Have',
          diedai: '--',
          status: '已完成',
          person: '张笑笑',
          startTime: '2020-09-28',
          gongshi: '18',
          endTime: '2020-09-30'
        },
        {
          id: 4,
          xuqiu: '--',
          date: '2016-05-03',
          name: '王小虎',
          title: '与产品研发测试沟通快报app字号变大屏幕显示适配问题',
          checked: false,
          eventID: '1018929',
          youxian: 'Nice To Have',
          diedai: '--',
          status: '已完成',
          person: '张笑笑',
          startTime: '2020-09-27',
          gongshi: '6',
          endTime: '2020-09-28'
        },
        {
          id: 4,
          xuqiu: '--',
          date: '2016-05-03',
          name: '王小虎',
          title: '编写智能巡检系统解决方案',
          checked: false,
          eventID: '1018928',
          youxian: 'Nice To Have',
          diedai: '--',
          status: '已完成',
          person: '季文彬',
          startTime: '2020-09-25',
          gongshi: '4',
          endTime: '2020-09-25'
        },
        {
          id: 4,
          xuqiu: '--',
          date: '2016-05-03',
          name: '王小虎',
          title: '学习智能巡检系统',
          checked: false,
          eventID: '1018927',
          youxian: 'Nice To Have',
          diedai: '--',
          status: '已完成',
          person: '季文彬',
          startTime: '2020-09-23',
          gongshi: '56',
          endTime: '2020-09-30'
        },
        {
          id: 4,
          xuqiu: '--',
          date: '2016-05-03',
          name: '王小虎',
          title: '编写罐区标准作业智能巡检系统解决方案',
          checked: false,
          eventID: '1018926',
          youxian: 'Nice To Have',
          diedai: '--',
          status: '已完成',
          person: '季文彬',
          startTime: '2020-09-22',
          gongshi: '8',
          endTime: '2020-09-23'
        }
      ],
      hidetree: true,
      statusFilters: [
        { label: '已完成', value: '已完成' },
        { label: '未开始', value: '未开始' }
      ],
      PersonFilters: []
    }
  },
  created() {
    const newarr = this.tableData.map(item => item.person).filter(item => item !== '--')
    this.PersonFilters = [...new Set(newarr)].map(item => { return { label: item, value: item } })
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
      this.$router.push({ name: 'createmission' })
    },
    toEditPage() {
      this.$router.push({ name: 'editmission' })
    },
    hidenavtree(e) {
      this.hidetree = e
    }
  }
}
</script>
<style lang="scss"  scoped>
.titleText {
  cursor: pointer;
  i {
    display:inline-block;
    width: 32px;
    height:12px;
    background: url('../../../assets/setting/storysprite.png') no-repeat;
    background-position: -79px -18px;

  }
}
.titleText:hover {
  color: #5d9bfc;
}
.navtree {
  margin-left: 20px;
  height:calc(100% - 72px);
}
.vxetable {
  .youxianspan {
    display: inline-block;
    height: 20px;
    padding: 0 10px;
    line-height: 20px;
    color:#fff;
    border-radius: 2px;
    font-size: 12px;
    cursor: pointer;

    &.Low {
      background-color: #97afd0;
    }
    &.Nice {
      background-color: #97afd0;
    }
    &.High {
      background-color: #f85e5e;
    }
    &.Middle {
      background-color: #93c36b;
    }

  }
  .statuspan {
    display: inline-block;
    border: 1px solid #8091a5;
    color: #8091a5;
    // width: 114px;
    max-height: 66px;
    font-size: 12px;
    line-height: 20px;
    vertical-align: middle;
    border-radius: 12px;
    cursor: pointer;
    overflow: visible;
    padding: 2px 10px;

    &.gray{
      color: #999;
    }
    &.blue {
      border-color: #3582fb;
      color: #3582fb;
    }
    &.green {
      border-color: #93c46b;
      color: #93c46b;
    }
  }
}

.noHighLight {
  padding:6px 15px ;
  .tit {
    font-size: 12px;
    color: #b0bac5;
  }
}
</style>
