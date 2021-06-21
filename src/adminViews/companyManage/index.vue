<template>
  <div class="companyContainer">
    <div class="navListouter">

      <leftbar  @changeNav='changeNav'/>
    </div>
    <div class="container" >
      <!-- <div class="toptit">模板管理</div> -->
      <div class="options">
        <el-button type="primary" size="small" @click="dialogVisible = true">创建模板</el-button>
        <a class="guolvbtn" :class="{'isGuolv':isGuolv}" @click="isGuolv = !isGuolv">过滤</a>
        <!-- <div class="right">
          <i class="el-icon-setting" />
          <span class="moban">模板</span>
          <span class="num">(3项目)</span>
          <el-checkbox v-model="hide" label="显示活跃项目" style="margin-right:10px;" />
          <el-checkbox v-model="show" label="隐藏活跃项目" />
          <span class="el-icon-s-tools" @click="xianshiVisible = true"/>

        </div> -->
      </div>

      <div v-if="isGuolv" class="garyarea">
        <div>
          <span>ID</span>
          <el-input style="margin-left:16px" size="small" />
        </div>
        <div>
          <span>模板名称</span>
          <el-input style="margin-left:16px" size="small" />
        </div>
        <div>
          <span>创建人</span>
          <el-input style="margin-left:16px" size="small" />
        </div>
        <div>
          <span>创建时间</span>

          <el-date-picker
            v-model="startTime"
            style="margin-left:16px"
            type="date"
            placeholder="选择日期"
          />
          <i>-</i>
          <el-date-picker
            v-model="endTime"
            type="date"
            placeholder="选择日期"
          />
        </div>
        <div>
          <el-button type="primary" size="mini">过滤</el-button>
        </div>

      </div>


      <div class="table">
          <el-table
                  :data="lishiData"
                  class="lishiTable"
                  stripe
                  style="width: 100%"
                >
                <el-table-column label="" width="60"  style="text-align:center">
                  <!-- <el-button class="aownmenu">
                    <i class="el-icon-caret-bottom"></i>
                  </el-button> -->
                </el-table-column>
                  <el-table-column
                    prop="id"
                    label="ID"
                    width="100"
                  />
                  <el-table-column
                    prop="biaoti"
                    label="模板名称"
                    width="500"
                  />
                  <el-table-column
                    prop="total"
                    label="被使用项目数"
                    width="120"

                  />
                  <el-table-column
                    prop="person"
                    label="创建人"
                  />
                  <el-table-column
                    prop="createTime"
                    label="创建时间"
                  />
                  <!-- <el-table-column
                    prop="startTime"
                    label="开始时间"
                  />
                  <el-table-column
                    prop="endTime"
                    label="结束时间"
                  /> -->

                  <el-table-column label="操作" >
                    <span>
                      <i class="el-icon-edit-outline"></i>
                      <span class="tableSpan">编辑信息</span>

                    </span>
                    <span @click="$router.push({name:'templateSetting'})"> 
                      <i class="el-icon-setting"></i>
                      <span class="tableSpan">配置模板</span>

                    </span>
                    <span>
                      <i class="el-icon-delete"></i>
                      <span class="tableSpan">删除</span>

                    </span>

                  </el-table-column>



          </el-table>
      </div>  

      <div class="settings">
        <create :dialogVisible.sync="dialogVisible"  />
        <xianshishezhi :dialogVisible.sync="xianshiVisible"/>
      </div>
      
    </div>
    
  </div>
</template>
<script>
import leftbar from './components/leftbar'
import create from './components/createProDialog'
import xianshishezhi from './components/xianshiSZdialog.vue'


export default {
  components: { leftbar , create , xianshishezhi},
  data() {
    return {
      isGuolv: false,
      startTime: '',
      endTime: '',
      hide: true,
      show: true,
      activeNav :'1',
      lishiData:[
        {id:'40071917',biaoti:'中行外汇结算接口应用',total:'1',person:'刘峰',createTime:"2020-10-15",startTime:'2020-10-20',endTime:'2020-12-30'},
        {id:'40071916',biaoti:'BI分析数据中心支撑平台',total:'1',person:'刘峰',createTime:"2020-06-05",startTime:'2020-06-10',endTime:'2020-09-30'},
        {id:'40071915',biaoti:'客户关系CRM系统',total:'1',person:'刘峰',createTime:"2020-03-06",startTime:'2020-03-15',endTime:'2020-06-20'},
        {id:'40071914',biaoti:'中行移动端APP研发二期',total:'1',person:'刘峰',createTime:"2020-01-05",startTime:'2020-01-10',endTime:'2020-4-20'},
      ],
      dialogVisible:false,
      xianshiVisible:false
    }
  },
  methods:{
    changeNav(e){
      this.activeNav = e
    }
  }

}
</script>

<style lang="scss" scoped>
.navListouter{
    display: none;

    height: calc(100vh - 92px);
    margin-left: 20px;
    float: left;
}
.guolvbtn {
    display: inline-block;
    height: 32px;
    padding: 0 12px;
    line-height: 29px;
    border: 1px solid #cdd0d1;
    background-color: #f6f6f6;
    font-size: 14px;
    position: relative;
    top: 0;
    margin-left: 10px;
    cursor: pointer;
}
.guolvbtn:active {
    background-color: #E9E9E9;
    background-image: linear-gradient(to bottom, #EAEAEA, #E5E5E5);
    border: 1px solid #BBBEBF;
    box-shadow: inset 0 2px 3px #cdd0d1;
    color: #363b42;
}
.guolvbtn.isGuolv {
    height: 35px;
    top: 0px;
    border-bottom: none;
}

.garyarea {
    padding: 18px 0 10px 0;
    background-color: #f8f8f8;
    display: flex;
    flex-wrap: wrap;
    >div {
        margin-bottom: 30px;
        width: calc( 50% - 108px);
        padding-left: 108px;
        position: relative;
        >span {
            display: block;
            width: 108px;
            text-align: right;
            position: absolute;
            left: 0;
            top: 7px;
        }
        .el-input {

            width: 80%;
        }
        i {
            display: inline-block;margin: 0 6px;
        }
        .el-button {
            width: 97px;
            margin-left: 16px;
            font-size: 14px;
            border-radius: 2px;
        }
    }

}
.options {
    .el-button {
        font-size: 14px;
        border-radius: 2px;
    }
    .right {
      float: right;
      height: 34px;
      line-height: 34px;
      margin-right: 30px;
      font-size: 14px;
      .el-icon-setting , .el-icon-s-tools {
        font-size: 16px;;
        vertical-align: middle;
        position: relative;
        top: -1px;
      }
      .el-icon-s-tools  {
        margin-left: 12px;
      }
      .num {
        display: inline-block;
        margin: 0 12px;
      }
      .moban {
        cursor: pointer;
        color: #3582fb;
      }
    }
}
.tableSpan {
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
}

.table {
  margin-top: 18px;
  .aownmenu {
    height: 20px;
    width: 20px;
    padding: 0;
    border-radius: 2px;
  }
}
</style>

<style  scoped>
.garyarea > div >>> .el-date-editor {
    width: 38%;
}
</style>
