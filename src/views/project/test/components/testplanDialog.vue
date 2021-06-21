<template>
  <el-dialog
    v-el-drag-dialog
    :visible="innerVisible"
    width="800px"
    title="选择测试用例"
    class="settings_qiyongDialog"
    @close="close"
  >

    <el-row>
      <el-col :span="24" class="dialogleft">

        <div class="select">
          <div class="input">
            <span>用例状态</span>
            <el-input size="mini" value="-ALL-" style="width:160px;margin-right:30px;" />

            <span>用例名称</span>
            <el-input size="mini" style="width:160px;" />
          </div>
          <div class="btns">
            <el-button size="mini" type="primary">过滤</el-button>
            <el-button size="mini">更多条件<i class="el-icon-arrow-down" /></el-button>
          </div>

          <div style="padding-top:20px;">

            <el-tree
              default-expand-all
              show-checkbox
              :data="data"
              :props="defaultProps"
              @node-click="handleNodeClick"
            />

          </div>
        </div>

      </el-col>

    </el-row>

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
    }
  },
  data() {
    return {

      innerVisible: false,
      data: [{
        label: '未规划目录',
        children: [
          { label: 'Firefox浏览器兼容性测试' },
          { label: 'Chrome浏览器兼容性测试' },
          { label: 'IE浏览器兼容性测试' }
        ]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {

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
    },
    handleNodeClick() {}
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
  padding-top: 12px;
  .select {
      .input {
          padding-left: 40px;
          margin-bottom: 20px;
          span {
              display: inline-block;
              margin-right: 8px;
          }
      }
      .btns {
          padding-left: 60px;
          margin-left:-20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #E6E6E6;

      }
      .innerText {
          float: left;
          margin-top: 6px;
          color: #999;
          i {
              display: inline-block;
              margin: 0 6px;
              font-style: normal;
              color: #000;
          }
      }
  }
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

.table_icon {
    display:inline-block;
    width: 32px;
    height:12px;
    background: url('../../../../assets/setting/storysprite.png') no-repeat;
    background-position: -32px -57px;
}
</style>
<style  scoped>
.settings_qiyongDialog >>> .el-dialog__header {
  border-bottom:1px solid #E6E6E6;
  padding-top: 10px;
}
.settings_qiyongDialog >>> .el-dialog__title {
    font-size: 16px;
}
.settings_qiyongDialog >>>  .el-dialog__headerbtn {
    top: 12px;
}
.settings_qiyongDialog >>> .el-dialog__footer {
  border-top:1px solid #E6E6E6;
}
.settings_qiyongDialog >>> .el-dialog__body {
    padding-top: 10px;
}
</style>
