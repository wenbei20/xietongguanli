<template>
  <div class="settings-xianshi settings">

    <div class="settings_title fz18">工作流设置</div>
    <div class="settings_tips">
      定义产品项目需求流转的状态变更，用户可以为每个状态配置不同的需求显示字段，并且可以设置状态流转时的效果
    </div>
    <div>
      <span class="settings_add" style="margin:16px 0 8px 0" @click="gongzuoliuAdd">
        <i class="el-icon-plus" />
        增加工作流
      </span>
    </div>

    <table class="com_table" cellspacing="0">

      <colgroup>
        <col style="width: 5%;">
        <col style="width: 30%;">
        <col style="width: 34%;">
        <col style="width: 10%;">
        <col style="width: 10%;">
        <col style="width: 11%;">
      </colgroup>
      <thead>
        <tr>
          <th>启用</th>
          <th>工作流名称</th>
          <th>工作流说明</th>
          <th>最后修改人</th>
          <th>操作</th>
          <th>变更历史</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in tableData" :key="i">
          <td style="padding-left:13px;"><el-radio v-model="item.select" /></td>
          <td>{{ item.name }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.system }}</td>
          <td>
            <i class="el-icon-edit-outline" @click="gongzuoliuEdit" />
            <i class="el-icon-delete" @click="deleteitem(item.name)" />
          </td>
          <td>
            <span>查看</span>
          </td>
        </tr>
      </tbody>

    </table>
    <deleteDialog
      :dialog-visible.sync="showDeleteDialog"
      :content="deleteName"
    />
  </div>
</template>

<script>
import deleteDialog from '../components/deleteDialog'
export default {
  name: 'SettingsGongzuoliu',
  components: { deleteDialog },
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      tableData: [
        { name: '需求类型', type: '单选下拉列表', system: 'pp', select: false },
        { name: '需求来源', type: '单选下拉列表', system: 'pp', select: false }
      ],
      deleteName: '',
      showDeleteDialog: false
    }
  },
  computed: {

  },
  created() {

  },
  methods: {
    gongzuoliuAdd() {
      if (this.info.from === 'quexian') {
        this.$navigate('gongzuoliuAdd_QX')
      } else {
        this.$navigate('gongzuoliuAdd')
      }
    },
    gongzuoliuEdit() {
      if (this.info.from === 'quexian') {
        this.$navigate('gongzuoliuEdit_QX')
      } else {
        this.$navigate('gongzuoliuEdit')
      }
    },
    deleteitem(e) {
      this.deleteName = '确定删除工作流“' + e + '”？'
      this.showDeleteDialog = true
    }
  }
}
</script>
<style lang="scss" scoped>
.com_table {
    text-align: left;
    td {
        text-align: left;
    }
    th {
        padding: 8px 5px;
    }
}
</style>
