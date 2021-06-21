<template>
  <div class="settings-xianshi settings">

    <div v-if="info.from === 'quexian'" class="settings_title fz18">缺陷字段设置</div>
    <div v-else-if="info.from === 'diedia'" class="settings_title fz18">迭代字段设置</div>
    <div v-else class="settings_title fz18">需求字段设置</div>
    <div class="settings_tips">
      最多可以配置10个自定义字段
    </div>
    <div v-if="info.from === 'quexian'" style="margin:20px 0 12px 0;">
      <span class="settings_add" @click="$navigate('xinzengZD_QX')">
        <i class="el-icon-plus" />
        增加自定义字段
      </span>
    </div>

    <div v-else-if="info.from === 'diedia'" style="margin:20px 0 12px 0;">
      <span class="settings_add" @click="$navigate('xinzengZD_DD')">
        <i class="el-icon-plus" />
        增加自定义字段
      </span>
    </div>

    <div v-else style="margin:20px 0 12px 0;">
      <span class="settings_add" @click="$navigate('xinzengZD')">
        <i class="el-icon-plus" />
        增加自定义字段
      </span>
    </div>

    <table class="com_table" cellspacing="0">

      <colgroup>
        <col style="width: 40%;">
        <col style="width: 26%;">
        <col style="width: 10%;">
        <col style="width: 24%;">
      </colgroup>
      <thead>
        <tr>
          <th>字段名</th>
          <th>字段类型</th>
          <th>系统字段</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in tableData" :key="i">
          <td>{{ item.name }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.system }}</td>
          <td>
            <i v-if="info.from === 'quexian'" class="el-icon-edit-outline" @click="$navigate('editZD_QX')" />
            <i v-else-if="info.from === 'diedia'" class="el-icon-edit-outline" @click="$navigate('editZD_DD')" />
            <i v-else class="el-icon-edit-outline" @click="$navigate('editZD')" />
            <i v-if="info.from !== 'quexian'" class="el-icon-delete " @click="dialogVisible = true" />
          </td>
        </tr>
      </tbody>

    </table>

    <el-dialog
      v-if="info.from !== 'quexian'"
      v-el-drag-dialog
      class="delete"
      :visible.sync="dialogVisible"
      width="450px"
    >

      <el-row>
        <el-col :span="6">
          <i class="el-icon-warning dialogWarn" />
        </el-col>
        <el-col :span="16" class="dialogcnt">
          删除自定义字段后，历史需求的<span>对应字段值将会被清空，且无法恢复</span>，请谨慎操作。

        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-row>
          <el-col :span="18" :offset="6">
            <el-checkbox v-model="showDialogBtn">我已了解风险</el-checkbox>

            <el-button type="primary" :disabled="!showDialogBtn" @click="dialogVisible = false">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog'
export default {
  name: 'SettingsZhiduan',
  directives: { elDragDialog },
  props: {
    info: {
      type: Object,
      default: () => {}

    }
  },
  data() {
    return {
      tableData: [
        { name: '需求类型', type: '单选下拉列表', system: '是' },
        { name: '需求来源', type: '单选下拉列表', system: '是' }
      ],
      dialogVisible: false,
      showDialogBtn: false,
      naviType: ''
    }
  },
  computed: {

  },
  created() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.com_table {
    text-align: left;
    td {
        text-align: left;
    }
}
.dialogWarn {
    font-size: 60px;
    color: #F8A203;
    display: inline-block;
    margin-left: 20px;
}
.dialogcnt {
    font-size: 16px;
    line-height: 20px;
    padding-bottom: 20px;
    span {
        color: #f00
    }
}
.dialog-footer .el-checkbox {
    float: left;
    margin-top: 8px;
}
</style>
<style  scoped>
.delete >>> .el-dialog__header {
  border-bottom: none;
}
</style>
