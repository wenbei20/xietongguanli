<template>
  <div class="xuqiu_container XQ_and_QX">
    <div class="list-head">
      <div class="btns">
        <!-- <el-button type="primary" size="mini" @click="toaddpage"> <i class="el-icon-plus" /> 创建需求</el-button> -->


        <el-dropdown trigger="click" placement="bottom-start" class="Common_select mr10" style="width:140px;">
            <span class="el-dropdown-link bgf">
              {{ yearJoinGroup ? yearJoinGroup : '请选择年度' }}<i class="el-icon-arrow-down el-icon--right" />
            </span>

            <el-dropdown-menu slot="dropdown" class="com_dropdownmenu">
              <div class="Common_select_Search">
                <el-input
                  v-model="yearText"
                  prefix-icon="el-icon-search"
                  size="small"
                /></div>
              <el-checkbox-group v-model="year">
                <el-checkbox label="2020年度" />
                <el-checkbox label="2019年度" />
                <el-checkbox label="2018年度" />
                <el-checkbox label="2017年度" />
              </el-checkbox-group>
            </el-dropdown-menu>
        </el-dropdown>


        <el-dropdown trigger="click" placement="bottom-start" class="Common_select mr10" style="width:140px;">
            <span class="el-dropdown-link bgf">
              {{ batchJoinGroup ? batchJoinGroup : '请选择批次' }}<i class="el-icon-arrow-down el-icon--right" />
            </span>

            <el-dropdown-menu slot="dropdown" class="com_dropdownmenu">
              <div class="Common_select_Search">
                <el-input
                  v-model="batchText"
                  prefix-icon="el-icon-search"
                  size="small"
                /></div>
              <el-checkbox-group v-model="batch">
                <el-checkbox label="批次1" />
                <el-checkbox label="批次2" />
                <el-checkbox label="批次3" />
                <el-checkbox label="批次4" />
              </el-checkbox-group>
            </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown trigger="click" placement="bottom-start" class="Common_select mr10" style="width:150px;">
            <span class="el-dropdown-link bgf">
              {{ projectJoinGroup ? projectJoinGroup : '请选择项目/产品' }}<i class="el-icon-arrow-down el-icon--right" />
            </span>

            <el-dropdown-menu slot="dropdown" class="com_dropdownmenu">
              <div class="Common_select_Search">
                <el-input
                  v-model="projectText"
                  prefix-icon="el-icon-search"
                  size="small"
                /></div>
              <el-checkbox-group v-model="project">
                <el-checkbox label="BI分析数据中心支撑平台" />
                <el-checkbox label="客户关系CRM系统" />
                <el-checkbox label="中行外汇结算接口应用" />
                <el-checkbox label="中行移动端APP研发二期" />
                <el-checkbox label="核心银行系统功能升级" />
                <el-checkbox label="网银系统2020需求变更" />
              </el-checkbox-group>
            </el-dropdown-menu>
        </el-dropdown>

        <el-button type="primary" size="mini" > <i class="el-icon-search" /> 查询</el-button>


        
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
          共<span>{{ ListNum }}</span>个需求
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
            <!-- <div>需求设置</div> -->
          </drapMenu>

        </div>

      </div>
    </div>

    <nav-menu
      title="需求分类"
      class="navtree"
      @show="hidenavtree"
    />

    <div class="table " :class="{'xuqiutable' : hidetree}">

      <vxe-table
        ref="xTree"
        resizable
        :auto-resize="true"
        highlight-hover-row
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
        <vxe-table-column field="youxian" title="优先级" :edit-render="{}" sortable :filters="filterYouXian" :filter-multiple="false" >

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
            <!-- <span>{{scope.row.youxian}}</span>
                    <div class="edityouxian">
                        <ul>
                            <li class="empty">--空--</li>
                            <li class="high">High</li>
                            <li class="middle">Middle</li>
                            <li class="low">Low</li>
                            <li class="nice">Nice to Have</li>
                        </ul>
                    </div> -->
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

      <!-- <div class="pagement">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="40">
          </el-pagination>
      </div> -->

    </div>

  </div>

</template>
<script>
import drapMenu from '@/components/drapdownMenu'
import filterMenu from '@/components/drapdownMenu/filterMenu'
import navMenu from '@/components/leftTreeNav'
export default {
  name: 'Xuqiu',
  components: { navMenu, drapMenu, filterMenu },
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
      year:[],
      yearText:"",
      batch:[],
      batchText:'',
      project:[],
      projectText:'',
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
      ],
      hidetree: true,
      filterYouXian:[
        {label: 'High', value: 'High'},
        {label: 'Middle', value: 'Middle'},
        {label: 'Low', value: 'Low'},
        {label: 'Nice to Have', value: 'Nice to Have'},
      ],
      PersonFilters:[],
      statusFilters:[
        {label:'已实现',value:'已实现'},
        {label:'实现中',value:'实现中'},
        {label:'规划中',value:'规划中'},
        {label:'已拒绝',value:'已拒绝'},
      ]
    }
  },
  created(){
    let newarr = this.tableData.map(item=>item.person)
    this.PersonFilters = [...new Set(newarr)].map(item=>{ return {label:item , value:item} })



  },
  computed:{
    yearJoinGroup(){
      return this.year.join(';')
    },
    batchJoinGroup(){
      return this.batch.join(';')
    },
    projectJoinGroup(){
      return this.project.join(';')
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
      this.$router.push({ name: 'AdminXuqiuAdd' })
    },
    toEditPage() {
      this.$router.push({ name: 'AdminXuqiuEdit' })
    },
    hidenavtree(e) {
      this.hidetree = e
    },
    getPersonName(arr){
      
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
    background: url('../../assets/setting/storysprite.png') no-repeat;
    background-position: -47px 0;

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
.pagement {
  text-align: right;
  padding: 20px 0;
}
</style>
