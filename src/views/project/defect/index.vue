<template>
  <div class="xuqiu_container XQ_and_QX">
    <div class="list-head">
      <div class="btns">
        <el-button type="primary" size="medium" @click="toaddpage"> <i class="el-icon-plus" /> 创建缺陷</el-button>
        <el-select v-model="caozuo" placeholder="更多操作">
          <el-option label="缺陷统计" value="1" />
          <el-option label="高级查询" value="2" />
          <el-option label="导入缺陷" value="3" />
          <el-option label="导出缺陷" value="4" />
          <el-option label="打印缺陷卡" value="5" />
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
          <filterMenu :show.sync="showGuoLvMenu" :width="350" :left="-120" :top="46" />
        </div>
        <div class="num">
          共<span>{{ ListNum }}</span>个缺陷
        </div>
        <div class="setting">
          <i class="el-icon-setting" @click="showSettingMenu = true" />

          <drapMenu :width="180" :left="-140" :show.sync="showSettingMenu">
            <div>设置显示字段</div>
            <div class="noHighLight">
              <div class="tit">每页显示数量</div>
              <el-radio-group v-model="pageNum" size="mini">
                <el-radio-button label="10" />
                <el-radio-button label="20" />
                <el-radio-button label="50" />
              </el-radio-group>
            </div>
            <div>需求设置</div>
          </drapMenu>
        </div>

      </div>
    </div>

    <div class="table">

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
            <i class="el-icon-more" style="position:relative;left:-1px;top:1px;" />

            <div class="editmenu">
              <div class="item">编辑</div>
              <div class="item">复制</div>
              <div class="item">关注</div>
              <div class="item">删除</div>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="eventID" title="ID" />
        <vxe-table-column field="title" title="标题" tree-node width="300">
          <template slot="header">
            标题
          </template>

          <template #default="{ row }">
            <span class="titleText" @click="toEditPage"><i /> {{ row.title }}</span>
          </template>

        </vxe-table-column>

        <vxe-table-column field="version" title="发现版本">
          <template #default="{ row }">
            <span>{{ row.version ? row.version : '--' }}</span>
          </template>
        </vxe-table-column>

        <vxe-table-column field="degree" title="严重程度" :filters="severityFilters">
          <template #default="{ row }">
            <span>{{ row.degree ? row.degree : '--' }}</span>
          </template>

        </vxe-table-column>
        <vxe-table-column field="youxian" title="优先级" :edit-render="{}" sortable :filters="filterYouXian" :filter-multiple="false">

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

        <vxe-table-column field="status" title="状态" :filters="statusFilters">
          <template #default="{ row }">
            <span class="statuspan" :class="row.status | statusClass">{{ row.status }}</span>
          </template>

        </vxe-table-column>

        <vxe-table-column field="person" title="处理人" :edit-render="{}" :filters="PersonFilters">
          <template #default="{ row }">
            {{ row.person ? row.person : '--' }}
          </template>

          <template slot="edit" slot-scope="scope">

            <el-input v-model="scope.row.person" size="mini" />
          </template>

        </vxe-table-column>

        <vxe-table-column field="startTime" title="创建时间" :edit-render="{}">
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

        <vxe-table-column field="cjperson" title="创建人" :edit-render="{}" :filters="PersonFilters">
          <template #default="{ row }">
            {{ row.cjperson ? row.cjperson : '--' }}
          </template>

          <template slot="edit" slot-scope="scope">

            <el-input v-model="scope.row.cjperson" size="mini" />
          </template>

        </vxe-table-column>

        <vxe-table-column field="solve" title="解决办法" :edit-render="{}" />

      </vxe-table>

    </div>

  </div>
</template>

<script>
import drapMenu from '@/components/drapdownMenu'
import filterMenu from '@/components/drapdownMenu/filterMenu'

export default {
  name: 'Nedds',
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
      pageNum: '10',
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '吕静静',
          title: '设备管理-纽扣管理/设备信息管理：选择每页显示50条后，点击重置页面数据显示有误',
          checked: false,
          eventID: '1000037',
          version: 'V3.4.001',
          degree: '一般',
          solve: '',
          youxian: 'Middle',
          diedai: '--',
          status: '已关闭',
          cjperson: '吕静静',
          person: '吕静静',
          startTime: '2020-10-15',
          endTime: ''
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '吕静静',
          title: '巡检管理-路线管理：进入路线编辑页面，点击关联后，纽扣显示延迟',
          checked: false,
          eventID: '1000036',
          version: 'V3.4.001',
          degree: '一般',
          solve: '',
          youxian: 'Middle',
          diedai: '--',
          status: '已解决',
          cjperson: '吕静静',
          person: '吕静静',
          startTime: '2020-10-14',
          endTime: ''
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '薛婧婧',
          title: '【界面】系统管理——菜单管理：‘’添加‘’弹窗，菜单类型那一项有错位情况，需要调整',
          checked: false,
          eventID: '1000035',
          version: 'V3.4.001',
          degree: '一般',
          solve: '',
          youxian: 'Low',
          diedai: '',
          status: '已关闭',
          cjperson: '薛婧婧',
          person: '薛婧婧',
          startTime: '2020-10-10',
          endTime: ''
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '吕静静',
          title: '全局参数配置：巡检管理中的纽扣刷卡间隔是有用的不能去掉，系统管理中的系统语言设置不起作用',
          checked: false,
          eventID: '1000034',
          version: 'V3.2.001',
          degree: '一般',
          solve: '',
          youxian: 'Middle',
          diedai: '--',
          status: '已解决',
          cjperson: '吕静静',
          person: '吕静静',
          startTime: '2020-10-09',
          endTime: ''
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '薛婧婧',
          title: '快报APP-个人中心-设置：异常推送开关点击没有反应',
          checked: false,
          eventID: '1000033',
          version: 'V3.2.001',
          degree: '严重',
          solve: '',
          youxian: 'Middle',
          diedai: '--',
          status: '已关闭',
          cjperson: '薛婧婧',
          person: '薛婧婧',
          startTime: '2020-09-27',
          endTime: ''
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '吕静静',
          title: '巡检APP：巡检项连接传感器时存在以下问题：',
          checked: false,
          eventID: '1000032',
          version: 'V3.2.001',
          degree: '一般',
          solve: '',
          youxian: 'Middle',
          diedai: '--',
          status: '接受/处理',
          cjperson: '代海涛',
          person: '代海涛',
          startTime: '2020-09-27',
          endTime: ''
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '薛婧婧',
          title: '快报APP-个人中心-设置：异常推送开关点击没有反应',
          checked: false,
          eventID: '1000031',
          version: 'V3.2.001',
          degree: '严重',
          solve: '',
          youxian: 'Middle',
          diedai: '--',
          status: '已关闭',
          cjperson: '薛婧婧',
          person: '薛婧婧',
          startTime: '2020-09-27',
          endTime: ''
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '薛婧婧',
          title: '快报APP：MT2200/MT9000设备列表，见图，页面布局不合理',
          checked: false,
          eventID: '1000030',
          version: 'V3.2.001',
          degree: '建议',
          solve: '',
          youxian: 'Middle',
          diedai: '--',
          status: '已关闭',
          cjperson: '薛婧婧',
          person: '薛婧婧',
          startTime: '2020-09-27',
          endTime: ''
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '薛婧婧',
          title: '快报APP：MT2200、华为手机、小米手机字体放到最大时，见图，页面布局不合理',
          checked: false,
          eventID: '1000029',
          version: 'V3.2.001',
          degree: '提示',
          solve: '',
          youxian: 'Low',
          diedai: '--',
          status: '已关闭',
          cjperson: '薛婧婧',
          person: '薛婧婧',
          startTime: '2020-09-27',
          endTime: ''
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '薛婧婧',
          title: '快报APP-报表统计：见图，巡检项列表，正常/异常设备详情没有显示巡检项的值',
          checked: false,
          eventID: '1000028',
          version: 'V3.2.001',
          degree: '一般',
          solve: '',
          youxian: 'Low',
          diedai: '--',
          status: '已关闭',
          cjperson: '薛婧婧',
          person: '薛婧婧',
          startTime: '2020-09-27',
          endTime: ''
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '薛婧婧',
          title: '【快报APP 兼容测试】报表统计：小米、华为手机“正常/异常”模块查看巡检项，页面布局不合理',
          checked: false,
          eventID: '1000027',
          version: 'V3.2.001',
          degree: '一般',
          solve: '',
          youxian: 'Low',
          diedai: '--',
          status: '已关闭',
          cjperson: '薛婧婧',
          person: '薛婧婧',
          startTime: '2020-09-27',
          endTime: ''
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '张笑笑',
          title: '【界面】基础信息管理——人员管理；设备管理——纽扣管理、设备信息管理、移动设备管理；巡检管理——巡检项管理；作业票管理——工作前安全分析、承包商人员列表、承包商列表；作业管理——作业申请管理等9个页面给excel表格名称加上鼠标悬浮时显示绿色的交互效果，色值为#00AA21。如图',
          checked: false,
          eventID: '1000027',
          version: 'V3.2.001',
          degree: '建议',
          solve: '',
          youxian: 'Low',
          diedai: '--',
          status: '已关闭',
          cjperson: '张笑笑',
          person: '张笑笑',
          startTime: '2020-09-27',
          endTime: ''
        }
      ],
      severityFilters: [
        { label: '建议', value: '建议' },
        { label: '一般', value: '一般' },
        { label: '提示', value: '提示' },
        { label: '严重', value: '严重' }
      ],
      statusFilters: [
        { label: '已关闭', value: '已关闭' },
        { label: '已解决', value: '已解决' },
        { label: '接受/处理', value: '接受/处理' }

      ],
      filterYouXian: [
        { label: 'High', value: 'High' },
        { label: 'Middle', value: 'Middle' },
        { label: 'Low', value: 'Low' },
        { label: 'Nice to Have', value: 'Nice to Have' }
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
      this.$router.push({ name: 'xuqiuAdd', query: { from: 'quexian' }})
    },
    toEditPage() {
      this.$router.push({ name: 'quexianEdit' })
    },
    hidenavtree(e) {
      this.hidetree = e
    }
  }
}
</script>

<style lang="scss" scoped>

.titleText {
  cursor: pointer;
  i {
    display:inline-block;
    width: 32px;
    height:12px;
    background: url('../../../assets/setting/storysprite.png') no-repeat;
    background-position: 8px -76px;

  }
}
.titleText:hover {
  color: #5d9bfc;
}
.navtree {
  margin-left: 20px;
  height: 100%;
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
