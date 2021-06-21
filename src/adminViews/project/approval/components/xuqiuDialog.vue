<template>
  <el-dialog
    v-el-drag-dialog
    :visible="innerVisible"
    width="800px"
    title="选择用例"
    class="settings_qiyongDialog"
    @close="close"
  >

    <el-row>
      <el-col :span="14" class="dialogleft">

        <div class="select">
          <div class="input">
            <span>标题</span>
            <el-input size="mini" style="width:160px;margin-right:30px;" />

            <span>迭代</span>
            <el-input size="mini" style="width:160px;">-ALL-</el-input>
          </div>
          <div class="btns">
            <el-button size="mini" type="primary">过滤</el-button>
            <el-button size="mini">更多条件<i class="el-icon-arrow-down" /></el-button>
          </div>

          <div class="innertable">
            <el-table
              :data="tableData"
              style="width: 100%"
            >
              <el-table-column
                type="selection"
                width="55"
              />
              <el-table-column
                label="标题"
                width="259"
              >
                <template slot-scope="scope">
                  <span class="table_icon" /> {{ scope.row.address }}
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="处理人"
                width="80"
              />
              <el-table-column
                prop="status"
                label="状态"
                width="80"
              />
            </el-table>

            <div style="text-align:right;padding:6px 0 6px 12px;">
              <div class="innerText">共<i>36</i>条对象</div>
              <el-pagination
                background
                layout="prev, pager, next"
                :total="20"
              />
            </div>
          </div>
        </div>

      </el-col>
      <el-col :span="10" class="dialogcnt">
        <div>
          <!-- <div style="color:#8091a5;padding-left:5px;">请勾选需要关联的需求</div> -->
          <div class="inner">
              <div id="myD3"></div>
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

import chartData from '@/utils/data'
import Neo4jd3 from '@/utils/d3'
import elDragDialog from '@/directive/el-drag-dialog'
export default {
  directives: { elDragDialog },
  props: {
    dialogVisible: {
      type: Boolean
    }
  },
  created(){
        this.chartData = chartData
  },
  data() {
    return {
      tableData: [{
        status: '实现中',
        name: '王小虎',
        address: '测试产品'
      }, {
        status: '已实现',
        name: '王小虎',
        address: '测试产品'
      }, 
      {
        status: '实现中',
        name: '王小虎',
        address: '测试产品'
      },
      {
        status: '已实现',
        name: '王小虎',
        address: '测试产品'
      }],
      innerVisible: false,
      chartData:{},
      neo4j:{},
    }
  },
  computed: {

  },
  watch: {
    dialogVisible() {
      this.innerVisible = this.dialogVisible

      if(this.dialogVisible) {
        this.$nextTick(()=>{

            this.neo4j = Neo4jd3('#myD3', {
                neo4jData: this.chartData,
                isNoColorTool:true
                   
                });
        })
      }
    }
  },
  mounted(){
        
        
  },
  beforeDestroy(){
      this.neo4j.clearAll()
      this.neo4j = null
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
  .select {
      .input {
          padding-left: 4px;
          margin-bottom: 20px;
          span {
              display: inline-block;
              margin-right: 8px;
          }
      }
      .innertable {
        margin-left: -20px;
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
.inner {
  margin-top: -12px;
  // padding-right: 18px;
  height: 100%;
  min-height: 364px;
  >div {
    overflow: hidden;
    // padding: 8px 5px;
    height: 100%;
    width: 100%;
    height: 364px;
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
  padding: 12px 0 0 20px;
}
</style>
