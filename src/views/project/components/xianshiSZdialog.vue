<template>
  <el-dialog
    v-el-drag-dialog
    :visible="innerVisible"
    width="660px"
    title="设置显示字段"
    class="settings_qiyongDialog"
    @close="close"
  >

    <div class="checkboxarea">
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="(item , i) in allSelect" :key="i" :label="item.name" :disabled="item.disabled" />
      </el-checkbox-group>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-row>

        <el-col :span="18" :offset="6">

          <el-button type="primary" @click="confirm">创建</el-button>
          <el-button @click="close">取消</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog'

export default {
  directives: { elDragDialog },
  props: {
    dialogVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      checkList: ['项目名称', 'ID', '项目人数', '创建人', '创建时间', '开始时间', '结束时间'],
      innerVisible: false,
      allSelect: [
        { name: 'ID' },
        { name: '项目名称', disabled: true },
        { name: '项目人数' },
        { name: '创建人' },
        { name: '创建时间' },
        { name: '开始时间' },
        { name: '结束时间' }
      ]
    }
  },
  computed: {
    selected() {
      return [...this.jichuList, ...this.person, ...this.zidingyiList]
    }
  },
  watch: {
    dialogVisible() {
      this.innerVisible = this.dialogVisible
    }
  },
  created() {

  },
  methods: {
    confirm() {
      this.$emit('update:dialogVisible', false)
      this.innerVisible = false
    },
    close() {
      this.$emit('update:dialogVisible', false)
      this.innerVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>

.settings_qiyongDialog {
  .tit {
    font-size: 16px;
    color: #8091a5;
  }
  .el-checkbox {
    margin-bottom: 10px;
    width: 25%;
    margin-right: 0;
  }
}

::-webkit-scrollbar {
    width: 9px;
    height: 9px;
}
::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: rgba(0,0,0,0.1);
    -webkit-box-shadow: -2px 0 0 #fff inset, 1px 0 0 #fff inset, 0 -1px 0 rgba(255,255,255,0.9) inset, 0 1px 0 rgba(255,255,255,0.9) inset;
}
::-webkit-scrollbar-track {
    border-radius: 8px;
    background-color: rgba(0,0,0,0);
}
</style>

<style  scoped>
 .settings_qiyongDialog >>> .el-dialog__body {
     min-height: 300px;
 }
</style>
