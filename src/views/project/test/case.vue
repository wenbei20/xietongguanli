<template>
  <div class="xuqiu_container XQ_and_QX">
    <div class="list-head">
      <div class="btns">
        <el-button type="primary" size="medium" @click="toaddpage"> <i class="el-icon-plus" /> 创建用例</el-button>
        <el-select v-model="caozuo" placeholder="更多操作">
          <el-option label="用例分布统计" value="1" />
          <el-option label="导出用例" value="2" />
          <el-option label="导入用例" value="3" />
          <el-option label="打印用例卡" value="4" />
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
          共<span>{{ ListNum }}</span>个用例
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

    <nav-menu
      title="测试用例"
      class="navtree"
      @show="hidenavtree"
    />

    <div class="table " :class="{'xuqiutable' : hidetree}">

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
        <vxe-table-column field="title" title="用例名称" tree-node width="300">
          <template slot="header">
            <i v-if="isAllExpand" class="el-icon-remove-outline biaotiicon" @click="closeAllNode" />
            <i v-else class="el-icon-circle-plus-outline biaotiicon" @click="closeAllNode" />

            标题
          </template>

          <template #default="{ row }">
            <span class="titleText" @click="toEditPage"><i /> {{ row.title }}</span>
          </template>

        </vxe-table-column>

        <vxe-table-column field="type" title="用例类型" :filters="typeFilters" :filter-multiple="false">
          <template #default="{ row }">
            <span>{{ row.type ? row.type : '' }}</span>
          </template>

        </vxe-table-column>

        <vxe-table-column field="status" title="用例状态" :filters="statusFilters">
          <template #default="{ row }">
            <span>{{ row.status ? row.status : '' }}</span>
          </template>

        </vxe-table-column>

        <vxe-table-column field="level" title="用例等级" :filters="levelFilters" :filter-multiple="false">
          <template #default="{ row }">
            <span>{{ row.level ? row.level : '' }}</span>
          </template>

        </vxe-table-column>

        <vxe-table-column field="person" title="创建人" :edit-render="{}" :filters="PersonFilters">
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
                            <li class="nice">中</li>
                        </ul>
                    </div> -->
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

      </vxe-table>

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
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          title: '用户登录测试',
          type: '功能测试',
          checked: false,
          eventID: '1000031',
          level: '高',
          diedai: '迭代1',
          status: '已实现',
          person: 'admin',
          startTime: '2020-10-10',
          endTime: ''
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          title: '用户注册测试',
          checked: false,
          type: '功能测试',
          eventID: '1000032',
          level: '高',
          diedai: '迭代1',
          status: '已拒绝',
          person: 'admin',
          startTime: '2020-10-10',
          endTime: ''
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          title: '系统设置测试',
          type: '功能测试',
          checked: false,
          eventID: '1000033',
          level: '高',
          diedai: '',
          status: '规划中',
          person: 'admin',
          startTime: '2020-10-10',
          endTime: ''
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          title: '系统巡检功能',
          type: '功能测试',
          checked: false,
          eventID: '1000034',
          level: '高',
          diedai: '迭代1',
          status: '已实现',
          person: 'admin',
          startTime: '2020-10-10',
          endTime: ''
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          title: '检索排序策略设置',
          checked: false,
          type: '功能测试',
          eventID: '1000035',
          level: '高',
          diedai: '迭代1',
          status: '已实现',
          person: 'admin',
          startTime: '2020-10-10',
          endTime: ''
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          title: '停用用户登录测试',
          checked: false,
          type: '功能测试',

          eventID: '1000036',
          level: '高',
          diedai: '迭代1',
          status: '已实现',
          person: 'admin',
          startTime: '2020-10-10',
          endTime: ''
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          title: '验证码有时效性测试',
          type: '功能测试',

          checked: false,
          eventID: '1000037',
          level: '中',
          diedai: '迭代1',
          status: '已实现',
          person: 'admin',
          startTime: '2020-10-10',
          endTime: ''
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          title: '手机号+验证码登录',
          type: '功能测试',

          checked: false,
          eventID: '1000038',
          level: '中',
          diedai: '迭代1',
          status: '已实现',
          person: 'admin',
          startTime: '2020-10-10',
          endTime: ''
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          title: '大小写敏感测试',
          type: '功能测试',

          checked: false,
          eventID: '1000039',
          level: '中',
          diedai: '迭代1',
          status: '已实现',
          person: 'admin',
          startTime: '2020-10-10',
          endTime: ''
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          title: '弹出提示信息测试',
          type: '功能测试',

          checked: false,
          eventID: '1000040',
          level: '中',
          diedai: '迭代1',
          status: '已实现',
          person: 'admin',
          startTime: '2020-10-10',
          endTime: ''
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          title: '验证码刷新测试',
          type: '功能测试',

          checked: false,
          eventID: '1000041',
          level: '中',
          diedai: '迭代1',
          status: '已实现',
          person: 'admin',
          startTime: '2020-10-10',
          endTime: ''
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          title: '不同级别用户登录测试',
          type: '功能测试',

          checked: false,
          eventID: '1000042',
          level: '中',
          diedai: '迭代1',
          status: '已实现',
          person: 'admin',
          startTime: '2020-10-10',
          endTime: ''
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          title: '忘记密码功能测试',
          type: '功能测试',

          checked: false,
          eventID: '1000043',
          level: '中',
          diedai: '迭代1',
          status: '已实现',
          person: 'admin',
          startTime: '2020-10-10',
          endTime: ''
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          title: '用户密码后台存储是否加密',
          type: '安全测试',

          checked: false,
          eventID: '1000044',
          level: '中',
          diedai: '迭代1',
          status: '已实现',
          person: 'admin',
          startTime: '2020-10-10',
          endTime: ''
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',

          title: '网络传输中是否加密',
          checked: false,
          type: '安全测试',

          eventID: '1000045',
          level: '中',
          diedai: '迭代1',
          status: '已实现',
          person: 'admin',
          startTime: '2020-10-10',
          endTime: ''
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          title: '密码输入框是否支持复制粘贴测试',
          checked: false,
          eventID: '1000046',
          level: '中',
          type: '安全测试',

          diedai: '迭代1',
          status: '已实现',
          person: 'admin',
          startTime: '2020-10-10',
          endTime: ''
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          title: 'slq注入测试',
          type: '安全测试',

          checked: false,
          eventID: '1000047',
          level: '中',
          diedai: '迭代1',
          status: '已实现',
          person: 'admin',
          startTime: '2020-10-10',
          endTime: ''
        }
      ],
      hidetree: true,
      typeFilters: [
        { label: '功能测试', value: '功能测试' },
        { label: '安全测试', value: '安全测试' }
      ],
      statusFilters: [
        { label: '已实现', value: '已实现' },
        { label: '已拒绝', value: '已拒绝' },
        { label: '规划中', value: '规划中' }
      ],
      levelFilters: [
        { label: '高', value: '高' },
        { label: '中', value: '中' },
        { label: '低', value: '低' }
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
      this.$router.push({ name: 'createCase' })
    },
    toEditPage() {
      this.$router.push({ name: 'editcase' })
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
    background-position: -79px -37px;

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
