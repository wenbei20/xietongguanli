<template>
  <el-dialog
    v-el-drag-dialog
    :visible="innerVisible"
    width="40%"
    title="显示设置"
    class="settings_qiyongDialog"
    @close="close"
  >
    <el-row class="checktitle">
      <el-col :span="12">可选对象</el-col>
      <el-col :span="12">已选对象（最多可设置7个对象</el-col>
    </el-row>
    <el-row>
      <el-col :span="12" class="left cnt">
        <div class="inner" />

      </el-col>
      <el-col :span="12" class="right cnt">
        <div class="inner">
          <draggable>
            <transition-group>
              <div v-for="(item,i) in optionsList" :key="i" class="optionsItem">
                <span class="moveIcon" />
                <span>{{ item.name }}</span>
                <i class="el-icon-close" />
              </div>
            </transition-group>
          </draggable>
        </div>

      </el-col>
    </el-row>

    <div slot="footer" class="dialog-footer">
      <el-row>
        <el-col :span="18" :offset="6">

          <el-button size="small" type="primary" @click="confirm">提交</el-button>
          <el-button size="small" @click="close">取 消</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import draggable from 'vuedraggable'
import elDragDialog from '@/directive/el-drag-dialog'
export default {
  components: { draggable },
  directives: { elDragDialog },
  props: {
    dialogVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      optionsList: [
        { name: '子需求' },
        { name: '变更历史' },
        { name: '缺陷' }
      ],
      innerVisible: false
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

.checktitle {
  font-size: 12px;
  color: #8091a5;
  margin-bottom: 8px;
}
.moveIcon{
    display: inline-block;
    position: relative;
    top: 4px;
    width: 10px;
    height: 16px;
    background: url('data:image/gif;base64,R0lGODlhBgAOAJEAAL+/v7q6uv///wAAACH5BAEHAAIALAAAAAAGAA4AAAISBCRmuOjPTlIR2hlbu06DIBkFADs=') ;
    background-repeat: no-repeat;
    cursor: move;
}

.cnt {
  border: 1px solid #b0bac5;
  padding: 7px 0 ;
  .inner {
    height: 246px;
    width: 100%;
    .optionsItem {
      padding: 4px 15px;
      i {
        display: block;
        float: right;
        margin-top: 5px;
      }
    }
  }
}
.cnt.right {
  border-left: none;
}
</style>
