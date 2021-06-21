<template>
  <el-dialog
    v-el-drag-dialog
    :visible="innerVisible"
    :modal="false"
    width="900px"
    title="关联用例"
    class="settings_qiyongDialog"
    @close="close"
  >

    <el-row>
      <el-col :span="24" class="dialogleft">

        <div class="select">
          
         

          <div class="innertable">
            <el-table
              :data="tableData"
              style="width: 100%"
            >
              
              
              <!-- <el-table-column
                type="selection"
                min-width="55"
              /> -->



              <el-table-column
                label="项目/产品名称"
                min-width="130"
                prop="address"
              >
                
              </el-table-column>
              <el-table-column
                label="用例名称"
                min-width="160"
              >
                  <template slot-scope="scope">
                    <span class="table_icon" /> {{ scope.row.name }}
                  </template>


              </el-table-column>
              <el-table-column
                prop="status"
                label="用例类型"
                min-width="70"
              />
              <el-table-column
                prop="doc"
                label="项目/产品文档"
                min-width="240"
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
     
    </el-row>

    <!-- <div slot="footer" class="dialog-footer">
      <el-row>
        <el-col :span="18" :offset="6">

          <el-button type="primary" @click="confirm">确 定</el-button>
          <el-button @click="close">取 消</el-button>
        </el-col>
      </el-row>
    </div> -->
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
  created(){
  },
  data() {
    return {
      tableData: [{
        status: '功能测试',
        name: '用户登录测试 ',
        address: 'BI分析数据中心支撑平台',
        doc:'《BI分析数据中心支撑平台接口设计文档》'
      }, {
        status: '安全测试',
        name: '用户密码后台存储是否加密',
        address: '客户关系CRM系统',
        doc:'《客户关系CRM系统需求规格说明书V9.0》'
      }, 
      {
        status: '功能测试',
        name: '验证码刷新测试',
        address: '中行外汇结算接口应用',
        doc:'《中行外汇结算接口应用接口设计文档V3.2》'
      },
      {
        status: '安全测试',
        name: '网络传输中是否加密',
        address: '中行移动端APP研发二期',
        doc:'《中行移动端APP研发二期需求规格说明书V1.0》'
      },
      {
        status: '安全测试',
        name: '不同级别用户登录测试',
        address: '中行移动端APP研发二期',
        doc:'《中行移动端APP研发二期需求规格说明书V1.0》'
      }],
      innerVisible: false,
    }
  },
  computed: {

  },
  watch: {
    dialogVisible() {
      this.innerVisible = this.dialogVisible

    }
  },
  mounted(){
        
        
  },
  methods: {
    confirm() {
      this.$emit('update:dialogVisible', false)
      this.$emit('updated')
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
  // border-right:1px solid #E6E6E6;
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
    background: url('../../../assets/setting/storysprite.png') no-repeat;
    background-position: -77px -37px;
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
  padding: 12px ;
}
</style>
