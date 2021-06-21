<template>
  <div class="app-container">
    <div class="topbar">
      <el-row type="flex" justify="space-between" align="center">
        <el-col>
          选择迭代：
          <el-select v-model="diedaiActive" size="small" placeholder="请选择" style="vertical-align: middle; margin-right: 20px;">
            <el-option label="V3.1" value="a">V3.1</el-option>
          </el-select>
          <!-- <el-radio-group v-model="showType" size="small">
            <el-radio-button label="double"><i class="el-icon-menu" /></el-radio-button>
            <el-radio-button label="single"><i class="el-icon-s-data" style="transform: rotate(90deg)" /></el-radio-button>
          </el-radio-group> -->
        </el-col>
        <el-col>
          <span style="vertical-align: bottom; color: #1890ff;" class="Link_disabled_click"><i class="el-icon-question" /> 故事卡说明</span>
          <div class="legend">
            <span class="item"><i class="dot red" /> Hign</span>
            <span class="item"><i class="dot yellow" /> Medium</span>
            <span class="item"><i class="dot blue" /> Low</span>
            <span class="item"><i class="dot green" /> NiceToHave</span>
            <span class="item"><i class="dot grey" /> Empty</span>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between" align="center">
        <el-col>
          <el-button type="text" class="Link_disabled_click"><i class="el-icon-plus" /> 添加故事卡</el-button>
          <el-button type="text" class="Link_disabled_click"><i class="el-icon-refresh-left" /> 刷新</el-button>
          <span style="margin-left: 50px;">排序：</span>
          <el-select v-model="paixuActive" size="mini" placeholder="请选择" style="vertical-align: middle; margin-right: 20px;">
            <el-option label="优先级" value="a">优先级</el-option>
          </el-select>
          <span>处理人：</span>
          <el-select v-model="clrActive" size="mini" placeholder="请选择" style="vertical-align: middle; margin-right: 20px;">
            <el-option label="" value="-All-">-All-</el-option>
            <el-option label="" value="-Empty-">-Empty-</el-option>
            <el-option label="" value="-我的-">-我的-</el-option>
            <el-option label="" value="普通成员">普通成员</el-option>
            <el-option label="" value="管理员">管理员</el-option>
            <el-option label="" value="软件部">软件部</el-option>
            <el-option label="" value="代海涛">代海涛</el-option>
          </el-select>
        </el-col>
        <el-col>
          <el-button type="text" size="small" class="Link_disabled_click">状态列设置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="storywall-container">
      <!--board-container-->
      <div class="board-container storywall">
        <KanbanLevel :key="16161" :list="kanbanData" />
      </div>
    </div>
  </div>
</template>

<script>
import KanbanLevel from '@/components/Kanban/index_level'

export default {
  name: 'Storywall',
  components: {
    KanbanLevel
  },
  data() {
    return {
      showType: 'double',
      diedaiActive: 'a',
      paixuActive: '优先级',
      clrActive: '-All-',
      kanbanData: [
        { name: '规划中', id: 1111,
          children: [
            { name: '#10005061', descrip: '内侧', type: 'new',time: '2020-08-20 ~ 2020-09-24', checked: false, id: 1 },
            { name: '#10507162', descrip: '新需求接下来的新规划...', type: 'new', time: '2020-08-20 ~ 2020-09-24', checked: false, id: 2 }
          ]
        },
        { name: '实现中', id: 2222,
          children: [
            { name: '#1003251', descrip: '作业签署角色管理', type: 'bug', checked: false, id: 1 },
            { name: '#1003252', descrip: '系统UI调整', type: 'bug', checked: false, id: 1 }

          ]
        },
        { name: '已完成', id: 3333,
          children: [
            { name: '#1005690', descrip: '数据字典...', type: 'finish', checked: false, id: 1 },
            { name: '#1006379', descrip: '添加设备信息时，可选择启用，停用的状态（默认停用，启用可选）...', type: 'finish', time: '2020-08-20 ~ 2020-09-24', checked: false, id: 2 }
          ]
        },
        { name: '已拒绝', id: 4444,
          children: [
            { name: '#1003460', descrip: '权限管理...', type: 'abandon', checked: false, id: 1 }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.topbar{ height: 100px; margin-bottom: 20px; background: #fff;
  .el-row{ border-bottom: #eee solid 1px; padding: 7px 10px; height: 50px;}
  .el-col{ width: auto;}
  .legend{ display: inline-block; vertical-align: middle; line-height: 20px; font-size: 12px; margin: 7px 0 0 30px;
    .item{  margin: 0 5px;
      .dot{ display: inline-block; vertical-align: middle; width: 5px; height: 5px; border-radius: 50%; background: #ccc; margin-right: 5px;
        &.red{ background: #e23737;}
        &.yellow{ background: #f1b613;}
        &.blue{ background: #1890ff;}
        &.green{ background: #41cc8b;}
        &.grey{ background: #ccc;}
      }
    }
  }
}
.storywall-container{ height: calc(100% - 100px - 20px);
  .board-container{ height: 100%;}
}
</style>
