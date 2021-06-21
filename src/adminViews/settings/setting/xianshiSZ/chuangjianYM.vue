<template>
  <div class="settings-chuangjian settings">
    <div class="settings_title">创建页面模板</div>
    <div class="tips">配置和管理需求创建页面模板，设置的默认模板在创建需求时被自动应用</div>

    <div v-if="info.from === 'quexian'" class="add" @click="$navigate('xinzengchuangjian_QX')">
      <i class="el-icon-plus" />
      新增创建页面模板
    </div>

    <div v-else-if="info.from === 'diedia'" class="add" @click="$navigate('xinzengchuangjian_DD')">
      <i class="el-icon-plus" />
      新增创建页面模板
    </div>

    <div v-else-if="info.from !== 'diedaijindu'" class="add" @click="$navigate('xinzengCJ')">
      <i class="el-icon-plus" />
      新增创建页面模板
    </div>
    <table v-if="info.from !== 'diedaijindu' " class="com_table" cellspacing="0">

      <colgroup>
        <col style="width: 5%;">
        <col style="width: 30%;">
        <col style="width: 50%;">
        <col style="width: 15%;">
      </colgroup>
      <thead>
        <tr>
          <th>默认</th>
          <th>模板名称</th>
          <th>详细描述</th>
          <th>操作</th>
        </tr>
      </thead>

    </table>

    <draggable v-if="info.from !== 'diedaijindu' ">
      <transition-group>
        <div v-for="(item,i) in tableData" :key="i" class="outer">
          <div class="radio">
            <span class="settings_moveIcon" />
            <el-radio v-model="item.checked" />
          </div>
          <div class="name">
            <span>{{ item.name }}</span>
          </div>
          <div class="miaoshu">
            {{ item.discribe }}
          </div>
          <div class="caozuo">
            <i v-if="info.from === 'quexian'" class="el-icon-edit-outline" @click="toEdit" />
            <i v-else class="el-icon-edit-outline" />
            <i class="el-icon-document-copy" />
            <i class="el-icon-delete" @click="deletemoban(item.name)" />
          </div>
        </div>
      </transition-group>
    </draggable>

    <table v-if="info.from === 'diedaijindu' " class="com_table diedaijindu" cellspacing="0">

      <colgroup>
        <col style="width: 5%;">
        <col style="width: 20%;">
        <col style="width: 75%;">
      </colgroup>
      <thead>
        <tr>
          <th>启用</th>
          <th>进度名称</th>
          <th>详细描述</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item , i) in diedaijindu" :key="i">
          <td>
            <el-radio v-model="item.checked" />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.info }}</td>

        </tr>
      </tbody>

    </table>
    <deleteDialog
      :dialog-visible.sync="showDeleteDialog"
      :content="deleteDialogCnt"
    />

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import deleteDialog from '../../components/deleteDialog'

export default {
  name: 'SettingsChuangjianYM',
  components: { draggable, deleteDialog },
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      tableData: [
        { checked: true, name: '系统默认模板', discribe: '系统自动创建' },
        { checked: false, name: '测试', discribe: '测试时十四' }
      ],
      toEditInfo: {
        isEdit: true
      },
      diedaijindu: [
        { checked: false, name: '迭代内所有工作的关闭进度', info: '根据所有处于结束状态的需求,缺陷的个数计算（结束状态工作项个数/总个数）' },
        { checked: false, name: '迭代内所有工作的关闭进度', info: '根据所有处于结束状态的需求,缺陷的个数计算（结束状态工作项个数/总个数）' }
      ],
      deleteDialogCnt: '',
      showDeleteDialog: false
    }
  },
  computed: {

  },
  created() {

  },
  methods: {
    toEdit() {
      this.$navigate('editchuangjian_QX', { isEdit: true })
    },
    deletemoban(e) {
      this.showDeleteDialog = true
      this.deleteDialogCnt = '确定要删除模板 " ' + e + ' " ?'
    }
  }
}
</script>
<style lang="scss" scoped>
.tips {
    font-size: 13px;
    color: #999;
    margin:24px 0 ;
    margin-top: 5px;
}
.add {
    color: #3582fb;
    cursor: pointer;
    font-size: 14px;
}
.com_table {
    margin-top: 20px;
    width: 100%;
    text-align: left;
}
.outer {
    display: flex;
    justify-content: flex-start;
    cursor: move;
    >div {
        height: 33px;
        line-height: 33px;
        border-bottom: 1px solid #efefef;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 10px;
        box-sizing: border-box;
        font-size: 14px;
        color: #3f4a56;
    }
    .radio {
        width: 5%;
    }
    .name {
        width: 30%;
        span{
            // cursor: pointer;
            cursor: default;
        }
        span:hover{
            // color: #3582fb;
        }
    }
    .miaoshu {
        width: 50%;
    }
    .caozuo {
        width: 15%;
        i{
            // cursor: pointer;
            cursor: default;
            display: inline-block;
            margin-right: 6px;
            font-size: 16px;
        }
        i:hover{
            // color: #3582fb;
        }
    }
}
.diedaijindu {
    td {
        text-align: left;
        padding: 8px 10px;
    }
    tr {
        td:nth-of-type(1){
            text-align: center;
        }
    }
}

</style>
