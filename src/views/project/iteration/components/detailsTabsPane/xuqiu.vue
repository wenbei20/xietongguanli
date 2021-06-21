<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col>
        <el-link type="info" :underline="false"><i class="el-icon-plus" /> 快速创建需求</el-link>
      </el-col>
      <el-col class="paneTools" style="text-align: right;">
        <span>（6 需求）</span>
        <el-link type="info" :underline="false"><i class="el-icon-s-operation" /> 过滤</el-link>
        <el-checkbox>需求</el-checkbox>
        <!-- <el-link type="info" :underline="false"><i class="el-icon-s-operation" /> 需求</el-link> -->
        <el-link type="info" :underline="false"><i class="el-icon-setting" /></el-link>
      </el-col>
    </el-row>
    <div class="table-box">
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
        <!-- <vxe-table-column type="checkbox" width="40" :resizable="false" />
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
        <vxe-table-column field="eventID" title="ID" /> -->
        <vxe-table-column field="title" title="标题" tree-node>
          <template slot="header">
            <i v-if="isAllExpand" class="el-icon-remove-outline biaotiicon" @click="closeAllNode" />
            <i v-else class="el-icon-circle-plus-outline biaotiicon" @click="closeAllNode" />
            标题
          </template>

          <template v-slot="{ row }">
            <span class="titleText">
              <el-tag size="mini">story</el-tag>
              {{ row.title }}
            </span>
          </template>

        </vxe-table-column>
        <vxe-table-column field="youxian" title="优先级" :edit-render="{}">

          <template v-slot="{ row }">
            <span>{{ row.youxian }}</span>
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
          <template v-slot="{ row }">
            <b>{{ row.diedai }}</b>
          </template>

        </vxe-table-column>

        <vxe-table-column field="status" title="状态">
          <template v-slot="{ row }">
            <b>{{ row.status }}</b>
          </template>

        </vxe-table-column>

        <vxe-table-column field="person" title="处理人" :edit-render="{}">
          <template v-slot="{ row }">
            {{ row.person ? row.person : '--' }}
          </template>
          <template slot="edit" slot-scope="scope">
            <el-input v-model="scope.row.person" size="mini" />
          </template>
        </vxe-table-column>

        <vxe-table-column field="startTime" title="预计开始" :edit-render="{}">
          <template v-slot="{ row }">
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
          <template v-slot="{ row }">
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
export default {
  name: 'TabsPaneXuqiu',
  props: {
    type: {
      default: 'xuqiu',
      type: String
    }
  },
  data() {
    return {
      caozuo: '',
      shitu: '我负责的',
      ListNum: 11,
      isAllExpand: true,
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          title: '巡检地图...',
          checked: false,
          eventID: '1000037',
          youxian: 'high',
          diedai: 'V3.1.1',
          status: '已实现',
          person: 'admin',
          startTime: '',
          endTime: ''
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          title: '按照部门...',
          checked: false,
          eventID: '1000037',
          youxian: 'high',
          diedai: 'V3.1.2',
          status: '已实现',
          person: 'admin',
          startTime: '',
          endTime: ''
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          title: '系统管理...',
          checked: false,
          eventID: '1000037',
          youxian: 'high',
          diedai: 'V3.1.2',
          status: '已实现',
          person: 'admin',
          startTime: '',
          endTime: '',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              title: '作业票项..',
              checked: false,
              eventID: '100004343',
              youxian: 'high',
              diedai: 'V3.1.1.1',
              status: '已实现',
              person: 'admin',
              startTime: '',
              endTime: ''
            },
            {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              title: '作业票项...',
              checked: false,
              eventID: '100001212',
              youxian: 'high',
              diedai: 'V3.1.1.2',
              status: '已实现',
              person: 'admin',
              startTime: '',
              endTime: ''
            }]
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          title: '系统管理...',
          checked: false,
          eventID: '1000037',
          youxian: 'high',
          diedai: 'V3.0.1',
          status: '已实现',
          person: 'admin',
          startTime: '',
          endTime: ''
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
    }
  }
}
</script>

<style lang="scss" scoped>
.paneTools{
  span, a, label { vertical-align: middle; margin-left: 10px; color: #333;}
  span{ color: #999;}
  label{ vertical-align: top;}
}
.vxetable{ margin-top: 10px;}
</style>
