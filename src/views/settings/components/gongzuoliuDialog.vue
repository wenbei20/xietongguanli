<template>
  <el-dialog
    v-el-drag-dialog
    :visible="innerVisible"
    width="800px"
    title="配置流转的附加字段和授权用户"
    class="settings_qiyongDialog"
    @close="close"
  >
    <div class="current">
        <b>当前流转：</b>
        <span>接受/处理</span>
        <i class="arrow"></i>
        <span>接受/处理</span>
    </div>

    <div class="settings">
        <div class="settings_title fw">附加字段配置</div>
        <div class="settings_tips" >配置状态流转过程中需要额外填写的字段，可以设置是否必填和默认值。</div>
        <div  class="settings_add" >
            <i class="el-icon-plus" />
             添加字段
        </div>

        <table  class="com_table" cellspacing="0">

        <colgroup>
            <col style="width: 21%;">
            <col style="width: 21%;">
            <col style="width: 40%;">
            <col style="width: 9%;">
            <col style="width: 9%;">
        </colgroup>
        <thead>
            <tr>
                <th>属性名称</th>
                <th>默认值类型</th>
                <th>默认值/默认值字段</th>
                <th>是否必填</th>
                <th>删除</th>
            </tr>
        </thead>

        </table>

        <draggable >
        <transition-group>
            <div v-for="(item,i) in tableData" :key="i" class="outer">
                <div class="radio">
                    <span class="settings_moveIcon" />
                    <el-select size="mini" v-model="item.person" >
                      <el-option v-for="(item , idx) in personList" :key="idx" :label="item" :value="idx"></el-option>
                    </el-select>
                </div>
                <div class="name">
                    <el-select size="mini" v-model="item.default" >
                      <el-option  label="字段值"></el-option>
                      <el-option  label="固定值"></el-option>
                    </el-select>
                </div>
                <div class="miaoshu">
                    <el-checkbox-group v-model="item.ziduan">
                      <el-checkbox v-for="(item , idx) in personList" :key="idx" :label="item"></el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="caozuo">
                    <el-checkbox v-model="item.isMust">{{""}}</el-checkbox>
                </div>
                <div class="delete">
                    <i class="el-icon-close"></i>
                </div>
            </div>
        </transition-group>
        </draggable>

        <div class="outer">
            <div class="radio">评论</div>
            <div class="name">
                <el-select size="mini" v-model="comment.default" >
                      <el-option :value="1" label="字段值"></el-option>
                      <el-option :value="2" label="固定值"></el-option>
                </el-select>
            </div>
            <div class="miaoshu">
                <el-input size="mini" v-model="comment.ziduan"></el-input>
            </div>
            <div class="caozuo">
                <el-checkbox v-model="comment.isMust">{{""}}</el-checkbox>
            </div>
            <div class="delete">
            </div>
        </div>

    </div>




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
      comment:{
          default:"",
          ziduan:'',
          isMust:''
      },
      innerVisible: false,
      tableData: [
        {person:'', isMust: true, ziduan: [], default: '' },
        {person:'', isMust: false, ziduan: [], default: '' }
      ],
      personList:['处理人' , '创建人' , '测试人员' , '审核人' , '开发人员','验证人','最后修改人','关闭人','修复人']
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
    margin-bottom: 4px;
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

.current {
    height: 38px;
    line-height: 38px;
    margin: 20px 0;
    span {
        display: inline-block;
        border: 2px solid #A3C0E4;
        background: #F8FAFE;
        padding: 10px 20px;
        border-radius: 4px;
        box-shadow: 2px 2px 6px rgba(0,0,0,0.1);

    }
    .arrow {
        display: inline-block;
        width: 0;
        height: 0;
        border: 8px dashed transparent;
        border-left-style: solid;
        border-left-color: #A3C0E4;
        margin-left: 8px;
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
.allProgram {
    min-height: 300px;
    padding-left: 20px;
    padding-top: 20px;
    .el-checkbox {
        margin-bottom: 0px;
    }
}
.settings {
    padding: 0;
    padding-top: 30px;
    .settings_tips {
        color: #666666;
    }
    .outer {
        display: flex;
        border-bottom: 1px solid #E6E6E6;
        >div {
            padding: 10px 10px;
        }
        .radio {
            width: 21%;
        }
        .name {
            width: 21%;
        }
        .miaoshu {
            width: 40%;
            .el-checkbox {
                width: 50%;
            }
        }
        .caozuo {
            width: 9%;
        }
        .delete {
            width: 9%;
        }
        .el-select {
            width: 120px;
        }
    }
    .com_table {
        th {
            text-align: left;
        }
        

    }
}
</style>
<style  scoped>
.settings_qiyongDialog >>> .el-dialog__body {
    padding: 0 10px;
}
</style>
