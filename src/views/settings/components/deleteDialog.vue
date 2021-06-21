<template>
  <el-dialog
    v-el-drag-dialog
    :visible="innerVisible"
    width="450px"

    class="settings_qiyongDialog"
    @close="close"
  >

    <i class="el-icon-warning-outline warnIcon" />
    <span>{{ content }}</span>

    <div slot="footer" class="dialog-footer">
      <el-row>
        <el-col :span="18" :offset="6">

          <el-button type="primary" @click="confirm">确 定</el-button>
          <el-button @click="close">取 消</el-button>
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
    },
    content: {
      type: String
    }
  },
  data() {
    return {

      innerVisible: false
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

.settings_tips {
  line-height: 20px;
  font-size: 13px;
}
.settings_add {
  line-height: 40px;
  font-size: 13px;
}
.tags {
  margin-top: 0px;
  i {
    display: inline-block;
    height: 24px;
    padding: 0 5px;
    line-height: 24px;
    color: #c7254e;
    vertical-align: bottom;
    margin-right: 6px;
    border: 1px solid #e1e1e8;
    margin-bottom: 5px;
    white-space: nowrap;
    word-break: break-all;
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-style: normal;
    font-size: 13px;
  }
}

.settings_qiyongDialog {
  .tit {
    font-weight: bold;
    margin: 30px 0 12px 0 ;
    font-size: 14px;
  }
  .el-checkbox {
    margin-bottom: 10px;
    width: 25%;
    margin-right: 0;
  }
}
.dialogcnt {

}
.dialogleft {
  border-right:1px solid #E6E6E6;
  margin-top: -12px;
  padding-top: 12px;
}
.ul {
  margin-top: 30px;
  padding-right: 18px;
  max-height: 500px;
  overflow-y: auto;
  >div {
    overflow: hidden;
    padding: 8px 5px;
    i {
      display: block;
      float: right;
    }
  }
}

.warnIcon {
  width: 40px;
  height: 40px;
  font-size: 40px;
  color: #F8A203;
  vertical-align: middle;
  margin: 0 20px;
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
.settings_qiyongDialog >>> .el-dialog__header  {
    border-bottom: none;
}
</style>
