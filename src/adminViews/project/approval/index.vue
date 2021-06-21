<template>
  <div class="app-container">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <el-dropdown style="margin-right: 10px;">
          <el-button type="primary">
            新建<i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>文件</el-dropdown-item>
            <el-dropdown-item>文件夹</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button plain>上传</el-button>
        <!-- <el-button plain>发起审批</el-button> -->
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
                  min-width="120"
                >
                  <template slot-scope="scope">
                    <i v-if="scope.row.type === 'folder'" class="el-icon-folder" />
                    <i v-if="scope.row.type === 'picture'" class="el-icon-picture-outline" />
                    {{ scope.row.title }}
                  </template>
                </el-table-column>

                <el-table-column
                  prop="status"
                  min-width="55"
                  label="状态"
                />

                <el-table-column
                  min-width="55"
                  label="审批"
                >
                  <template slot-scope="scope">
                    <el-button size="small" @click="$router.push({name:scope.row.route})"> {{ scope.row.examine }}</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="创建人"
                  min-width="120"
                />
                <el-table-column
                  label="最后修改日期"
                  min-width="120"
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
        },
        {
          label: '发起审批的',
          icon: 'el-icon-chat-dot-square',
          children: [
            {
              label: '审批中',
              icon: 'el-icon-folder'
            },
            {
              label: '审批完成',
              icon: 'el-icon-folder'
            }
          ]
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
        { date: '2020-10-20', status: '审批中', examine: '发起审批', route: 'createApproval', name: 'admin', type: 'folder', title: '新建文件夹' },
        { date: '2016-10-20', status: '审批完成', examine: '查看审批过程', route: 'editApproval', name: 'admin', type: 'picture', title: 'app.png' }
      ],
      multipleSelection: []
    }
  },
  methods: {
    tabClick(data) {
      console.log(data)
    },
    handleNodeClick(data) {
      console.log(126, data)
    },
    handleSelectionChange() {}
  }
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
