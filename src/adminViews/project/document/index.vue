<template>
  <div class="app-container">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <el-dropdown style="margin-right: 10px;">
          <el-button type="primary" size="small">
            新建<i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>文件</el-dropdown-item>
            <el-dropdown-item>文件夹</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button plain style="margin-right:10px;" size="small">上传</el-button>
        <!-- <el-button plain>发起审批</el-button> -->

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
      <el-row class="doc-container">
        <el-col class="left">
          <el-tree
            :data="treeData"
            :props="defaultProps"
            @node-click="handleNodeClick"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <i :class="['custom-icon', data.icon]" />
              <span>{{ node.label }}</span>
            </span>
          </el-tree>
        </el-col>
        <el-col class="right">
          <el-tabs v-model="tabsActive" @tab-click="tabClick">
            <el-tab-pane
              v-for="tab in tabs"
              :key="tab.key"
              :label="tab.name"
              :name="tab.key"
            >
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  type="selection"
                  width="55"
                />
                <el-table-column
                  prop="title"
                  label="名称"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <i v-if="scope.row.type === 'folder'" class="el-icon-folder" />
                    <i v-if="scope.row.type === 'picture'" class="el-icon-picture-outline" />
                    {{ scope.row.title }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="创建人"
                  width="120"
                />
                <el-table-column
                  label="最后修改日期"
                  width="120"
                >
                  <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'Defect',
  data() {
    return {
      treeData: [
        {
          label: '所有文件',
          icon: 'el-icon-document-copy',
          children: [
            {
              label: '新建文件夹',
              icon: 'el-icon-folder'
            }
          ]
        },
        {
          label: '我创建的',
          icon: 'el-icon-document-add'
        },
        {
          label: '我关注的',
          icon: 'el-icon-star-off'
        },
        {
          label: '我评论过的',
          icon: 'el-icon-chat-dot-square'
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
        icon: 'icon'
      },
      tabs: [
        { name: '全部文件', key: 'all' },
        { name: '文件夹', key: 'folder' },
        { name: '文档', key: 'document' },
        { name: '图片', key: 'picture' },
        { name: '思维导图', key: 'xmind' },
        { name: '其他', key: 'other' }
      ],
      tabsActive: 'all',
      tableData: [
        { date: '2020-10-20', name: 'admin', type: 'folder', title: '新建文件夹' },
        { date: '2016-10-20', name: 'admin', type: 'picture', title: 'app.png' }
      ],
      multipleSelection: [],
      year:[],
      yearText:"",
      batch:[],
      batchText:'',
      project:[],
      projectText:'',
    }
  },
  methods: {
    tabClick(data) {
      console.log(data)
    },
    handleNodeClick(data) {
      console.log(126, data)
    }
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
    },
    handleSelectionChange(){
      
    }
  },
}
</script>

<style lang="scss" scoped>
.el-card{ width: 100%; height: 100%;
  ::v-deep{
    .el-card{
      &__header{ padding: 7px 10px; height: 50px;}
      &__body{ height: calc(100% - 40px); padding: 0;}
    }
  }
}
.doc-container{ height: 100%;
  .el-col{ height: 100%;}
  .left{ width: 240px; border-right: #e6ebf5 solid 1px; padding: 10px; overflow-y: auto;
    .el-tree{
      ::v-deep{
        .el-tree-node{ font-size: 14px; color: #333; font-weight: 600;
          &__content{ height: 30px; line-height: 30px;}
          &__expand-icon{ display: none;}
          &__children{
            .el-tree-node{ color: #999; font-size: 12px; font-weight: 400;}
          }
          &.is-current{
            > .el-tree-node__content{ color: #1890ff;}
          }
        }
      }
      .custom-icon{ margin: 0 5px;}
    }
  }
  .right{ width: calc(100% - 240px); padding: 0 15px;
    .el-tabs{ height: 100%;
      ::v-deep{
        .el-tabs__content{ height: calc(100% - 80px); overflow-y: auto;}
      }
    }
  }
}
</style>
