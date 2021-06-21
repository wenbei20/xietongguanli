<template>
    <div class="selectOption" :class="{'hide':!show}">
        <div>
            <span>产品列表</span><br>
            <el-dropdown trigger="click" placement="bottom-start">
              <span class="el-dropdown-link">
                {{ selectedGroup }}<i class="el-icon-arrow-down el-icon--right" />
              </span>

              <el-dropdown-menu slot="dropdown" class="com_dropdownmenu">
                <div class="Search">
                  <el-input
                    
                    prefix-icon="el-icon-search"
                    size="small"
                  /></div>
                <el-checkbox-group v-model="project">
                  <el-checkbox label="中银日积月累-日计划（美元版）" />
                  <el-checkbox label="中银理财“稳赢”" />
                  <el-checkbox label="中银策略-智富" />
                  <el-checkbox label="中银新股增值理财计划" />
                  <el-checkbox label="中银平稳收益理财计划" />
                  <el-checkbox label="中银货币市场增值理财计划" />
                  <el-checkbox label="中银智富理财计划" />
                </el-checkbox-group>
              </el-dropdown-menu>
            </el-dropdown>
        </div>


        <div>
            <span>项目列表</span><br>
            <el-dropdown trigger="click" placement="bottom-start">
              <span class="el-dropdown-link">
                {{ programGroup }}<i class="el-icon-arrow-down el-icon--right" />
              </span>

              <el-dropdown-menu slot="dropdown" class="com_dropdownmenu">
                <div class="Search">
                  <el-input
                    
                    prefix-icon="el-icon-search"
                    size="small"
                  /></div>
                <el-checkbox-group v-model="program">
                  <el-checkbox label="项目1" />
                  <el-checkbox label="项目2" />
                  <el-checkbox label="项目3" />
                  <el-checkbox label="项目4" />
                </el-checkbox-group>
              </el-dropdown-menu>
            </el-dropdown>
        </div>

        <div>
            <span>功能列表</span><br>
            <el-dropdown trigger="click" placement="bottom-start">
              <span class="el-dropdown-link">
                {{ programfunctions }}<i class="el-icon-arrow-down el-icon--right" />
              </span>

              <el-dropdown-menu slot="dropdown" class="com_dropdownmenu">
                <div class="Search">
                  <el-input
                    
                    prefix-icon="el-icon-search"
                    size="small"
                  /></div>
                <el-checkbox-group v-model="functions">
                  <el-checkbox label="功能1" />
                  <el-checkbox label="功能2" />
                  <el-checkbox label="功能3" />
                  <el-checkbox label="功能4" />
                </el-checkbox-group>
              </el-dropdown-menu>
            </el-dropdown>
        </div>


        <div class="btns">
            <!-- <el-button type="primary" size="small" @click="$emit('upNewDoc')" ><i class="el-icon-upload"></i> 上传新文档</el-button> -->
            <span>层级：</span>
            <el-select v-model="levelNum" placeholder="选择层级" size="mini" style="width:80px;">
              <el-option v-for="o in 3" :key="o"  :value="o | levelforNum"></el-option>
            </el-select>
            
            <el-button  size="mini" style="float:right" >开始分析</el-button>
        </div>


        <div class="tabs">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="产品" name="first">
                <div class="liouter">
                  <div v-for="(item ,idx) in productList" :key="idx" class="item">{{item}}</div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="项目" name="second">
              <div class="liouter">
                  <div v-for="(item ,idx) in projectList" :key="idx" class="item">{{item}}</div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="功能" name="third">
              <div class="liouter">
                  <div v-for="(item ,idx) in functionsList" :key="idx" class="item">{{item}}</div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="用例" name="fourth">
              <div class="liouter">
                  <div v-for="(item ,idx) in caseList" :key="idx" class="item">{{item}}</div>
                </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="hideBtn" @click="hidemenu" >
          <i :class="{'el-icon-arrow-left':!show ,'el-icon-arrow-right':show }" />
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            project:[],
            program:[],
            functions:[],
            show:true,
            activeName:'first',
            productList:[
              'BI分析数据中心支撑平台',
              '客户关系CRM系统',
            ],
            projectList:[
              '中行外汇结算接口应用',
              '中行移动端APP研发二期',
            ],
            functionsList:[
              '用户登录',
              '即时转账',
            ],
            caseList:[
              '使用密码进行登录',
              '扫描行信二维码登录'
            ],
            levelNum:''
        }
    },
    computed:{
        selectedGroup(){
            return this.project.join(';')
        },
        programGroup(){
            return this.program.join(';')
        },
        programfunctions(){
            return this.functions.join(';')
        },
       
    },
    filters:{
      levelforNum(val){
        return val+"级"
      }
    },
    methods:{
      
      hidemenu() {
        // this.show = !this.show
        // this.$emit('show', this.show)
      },
      handleClick(){}
    }
}
</script>
<style lang="scss" scoped>
.selectOption {
    background-color: #fff;
    width: 310px;
    padding: 10px ;
    padding-top: 20px;
    position: relative;
}
.el-dropdown-link {
    display: inline-block;
    height: 30px;
    width: 290px;
    border: 1px solid #ccc;
    padding: 3px 20px 3px 6px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    i {
        position: absolute;
        right: 12px;
        top: 6px
    }
}

.com_dropdownmenu {
    .Search {
        .el-input {
            padding:  0 16px 12px 16px;
        }
    }
    .el-checkbox-group {
            padding: 0 0 0 16px;
    }
}
.selectOption {
    >div {
        margin-bottom: 10px;
        > span {
          display: inline-block;
          margin-bottom: 6px;
          font-size: 14px;
        }
    }
    .btns {
      padding-top: 10px;
      .el-button {
        width: 108px;
      }
    }
}

.hideBtn {
    position: absolute;
    right: -12px;
    top: calc(50% - 25px);
    height: 50px;
    width: 10px;
    border-radius:  0 10px 10px 0;
    background: #acb7c1;
    cursor: pointer;
    line-height: 50px;
    text-align: center;
    color:#fff;
    font-size: 14px;
    i {
        width: 10px;
        position: relative;
        left: -2px;
    }
}

.tabs {
  margin-top: 30px;
}

.liouter {
  .item {
    border: 1px solid #BFCBD9;
    height: 30px;
    line-height: 30px;
    padding: 0 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    margin-bottom: 6px;
  }
}

.selectOption.hide {
  width: 0px;
  padding: 0px;
  margin-left: -20px;
  >div:not(.hideBtn) {
    display: none;
  }
}


</style>
<style  scoped>
.Search >>> .el-input__inner {
            border: none;
            border-bottom: 1px solid #DCDFE6;
}
.Search >>> .el-input__prefix {
    left: 10px;
    top: -5px;
}
.selectOption >>> .el-tabs__nav {
  margin: 0 29px;
}
</style>