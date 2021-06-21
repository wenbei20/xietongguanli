<template>
  <div class="boardContainer">
    <div class="header">
      <div class="template">
        <div class="btn">
          <i class="el-icon-arrow-down" />
        </div>
        <span ref="nameText" class="name" @click="editName">{{ name }}</span>
        <el-input v-show="nameEdit" ref="nameinput" v-model="name" size="mini" :style="{width:nameEditWidth+'px'}" @blur="nameEdit = false" />
        <span class="line" />

        <span class="add" @click="showCreate = true">
          <i class="el-icon-circle-plus-outline" />
          新建看板
        </span>

      </div>

      <div class="options">
        <el-radio-group v-model="views">
          <el-radio-button label="base">
            <i class="el-icon-s-data" />
          </el-radio-button>
          <el-radio-button label="person">
            <i class="el-icon-user-solid" />
          </el-radio-button>
        </el-radio-group>

        <!-- <el-select v-model="viewType" class="viewselect" size="small">
          <el-option label="板块视图" value="plate" />
          <el-option label="列表视图" value="list" />
        </el-select> -->
        <div class="menu">
          <i class="el-icon-s-operation" @click="showDrapmenu = true" />
          <drapmenu :show.sync="showDrapmenu" :left="-100" :width="146">
            <div>关闭看板</div>
            <div>删除看板</div>
          </drapmenu>
        </div>
      </div>
    </div>
    <div class="dragInner">
      <Kanbanlevel v-if="views==='base'" :key="1" :list="dragList" :addmoreinfo="true" />
      <Kanbanlevel v-else :key="1" :list="dragPersonList" :addmoreinfo="true" class="personList" />

    </div>

    <create
      :dialog-visible.sync="showCreate"
    />
  </div>
</template>
<script>
import drapmenu from '@/components/drapdownMenu'
import Kanbanlevel from '@/components/Kanban/index_level'
import create from './components/createProDialog'

export default {
  name: 'Board',
  components: { drapmenu, Kanbanlevel, create },
  data() {
    return {
      nameEdit: false,
      name: '空白模板',
      nameEditWidth: '',
      views: 'base',
      viewType: 'plate',
      showDrapmenu: false,
      showCreate: false,
      dragList: [

        { name: '待处理', id: 1111,
          children: [
            { name: '隐藏新增线路菜单中：“线路模式、ID类型、巡检顺序”菜单', checked: false, tags: ['red', 'orange', 'yellow', 'green', 'blue'], id: 1 },
            { name: '值别，名称改为“班组”', checked: false, tags: [], id: 2 },
            { name: '增加漏检统计', checked: false, tags: [], id: 3 }
          ]
        },
        { name: '测试', id: 2222,
          children: [
            { name: '【Bug转需求】人员管理：修改人员所在组织机构，保存按钮一直转圈没反应', checked: false, tags: [], id: 11, time: '2020/10/01-至今' },
            { name: '巡检3.1报表部分bug处理', checked: false, tags: ['red', 'orange', 'yellow', 'green', 'blue'], id: 22, time: '' }
          ]
        },
        { name: '已完成', id: 3333,
          children: [
            { name: '巡检地图对瓦片格式多层级支持', checked: false, tags: [], id: 64, time: '' }
          ]
        },
        { name: '进行中', id: 4444,
          children: [
            { name: '巡检系统bug修复，优化', checked: false, tags: [], id: 42, time: '' },
            { name: '变更路线统计', checked: false, tags: [], id: 53, time: '' }
          ]
        }
      ],
      dragPersonList: [

        { name: '未分配', id: 1111,
          children: [
            { name: '隐藏新增线路菜单中：“线路模式、ID类型、巡检顺序”菜单', checked: false, tags: [], id: 1, showMenu: false, label: '项目启动阶段' },
            { name: '值别，名称改为“班组”', checked: false, tags: [], id: 2, showMenu: false, label: '项目启动阶段' },
            { name: '增加漏检统计', checked: false, tags: [], id: 3, showMenu: false, label: '项目启动阶段' },
            { name: '增加漏检统计', checked: false, tags: [], id: 4, showMenu: false, label: '过程策略阶段' },
            { name: '增加漏检统计', checked: false, tags: [], id: 5, showMenu: false, label: '过程策略阶段' },
            { name: '增加漏检统计', checked: false, tags: [], id: 6, showMenu: false, label: '过程策略阶段' },
            { name: '增加漏检统计', checked: false, tags: [], id: 7, showMenu: false, label: '过程策略阶段' }
          ]
        }

      ]

    }
  },
  methods: {
    editName() {
      this.nameEdit = true

      this.$nextTick(() => {
        this.nameEditWidth = this.$refs.nameText.offsetWidth

        this.$refs.nameinput.focus()
      })
    }
  }
}
</script>
<style lang="scss" scoped>

.header {
    padding: 15px 25px 15px 10px;
    height: 63px;
    display: flex;
    justify-content: space-between;
    .template {
        position: relative;
        .btn {
            display: inline-block;
            height: 26px;
            width: 26px;
            font-size: 14px;
            text-align: center;
            line-height: 28px;
            color :#fff;
            background-color: #79AAEE;
            border-radius: 4px;
            margin-right: 6px;
        }

        .name {
            display: inline-block;
            font-size: 16px;
            padding: 6px 10px;
            border-radius: 4px;
            cursor: text;
            font-weight: bold;
            color: #000;
        }
        .name:hover {
            background-color: #e5e5e5;;
        }
        .el-input {
            font-size: 16px;
            font-weight: bold;
            position: absolute;
            left: 32px;
            top: 3px;
        }
        .line {
            display: inline-block;
            width: 2px;
            height: 16px;
            background-color: #b0bac4;
            vertical-align: middle;
            position: relative;
            top: -2px;
            margin: 0 18px 0 10px;
        }
        .add {
            cursor: pointer;
            font-size: 14px;
            color: #3582fb;
        }
    }

    .options {

        .el-radio-button {
            .el-icon-s-data {
                font-size: 20px;
            }
            .el-icon-user-solid {
                font-size: 20px;
            }

 }

        .viewselect {
            width: 100px;
            margin-left: 12px;
            position: relative;
            top: 2px;
            height: 34px;
        }
        .menu {
            display: inline-block;
            font-size: 20px;
            padding-left: 16px;
            margin-left: 20px;
            border-left: 1px solid #dbdfe0;position: relative;
            top: 3px;
            i {
                cursor: pointer;
            }
            i:hover {
                color: #4f90f8;
            }
            .drapdown_menu {
                left: -40px;
                top: 40px;
            }
        }
    }
}
</style>
<style  scoped>
.template >>> .el-input__inner {
    padding: 6px 8px;
}

.options >>> .el-radio-button__inner {
    padding: 7px 10px;
}
.viewselect >>> .el-input__inner {
    height: 34px;
    line-height: 34px;
    border-radius: 4px;
    color: #999;
}
.dragInner {
    padding: 15px 25px 15px 10px;

}
.personList >>> .board-item .cnt .title {
  padding-right: 20px;
}
</style>
