<template>
  <el-dialog
    v-el-drag-dialog
    :visible="innerVisible"
    width="840px"
    title="选择模板"
    class="settings_qiyongDialog"
    @close="close"
  >

   <div class="tit">
       <el-input v-model="mobantext" placeholder="" style="width:428px;"></el-input>


   </div>

   <el-tabs v-model="activeName" @tab-click="handleClick" class="dialogTabs">
      <el-tab-pane label="所有" name="first">
        <div class="cardouter all">
            <div class="item" v-for="(ele , i ) in allList" :key="i" >
                <div>
                  <div class="title">{{ele.name}}</div>
                  <div class="img" :style="{backgroundPosition: backgroundPosition(ele.left, ele.right)}"></div>
                  <span>详情</span>

                </div>
            </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="研发管理" name="second">
        <div class="cardouter yanfa">
            <div class="item" v-for="(ele , i ) in allList" :key="i"  v-if="ele.bankuai === 'yanfa' ">
                <div >
                  <div class="title">{{ele.name}}</div>
                  <div class="img" :style="{backgroundPosition: backgroundPosition(ele.left, ele.right)}"></div>
                  <span>详情</span>

                </div>
            </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="市场营销" name="third">
        <div class="cardouter yinxiao">
            <div class="item" v-for="(ele , i ) in allList" :key="i"  v-if="ele.bankuai === 'yinxiao' ">
                <div>
                  <div class="title">{{ele.name}}</div>
                  <div class="img" :style="{backgroundPosition: backgroundPosition(ele.left, ele.right)}"></div>
                  <span>详情</span>

                </div>
            </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="人事行政" name="fourth">
        <div class="cardouter renshi">
            <div class="item" v-for="(ele , i ) in allList" :key="i"  v-if="ele.bankuai === 'renshi' ">
                <div>
                  <div class="title">{{ele.name}}</div>
                  <div class="img" :style="{backgroundPosition: backgroundPosition(ele.left, ele.right)}"></div>
                  <span>详情</span>

                </div>
            </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="其他" name="five">
        <div class="cardouter qita">
            <div class="item" v-for="(ele , i ) in allList" :key="i" v-if="ele.bankuai === 'qita' ">
                <div>
                  <div class="title">{{ele.name}}</div>
                  <div class="img" :style="{backgroundPosition: backgroundPosition(ele.left, ele.right)}"></div>
                  <span>详情</span>

                </div>
            </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="自定义" name="six">
        <div class="cardouter zidingyi">
            <div class="item" v-for="(ele , i ) in allList" :key="i"  v-if="ele.bankuai === 'zidingyi' ">
                <div>
                  <div class="title">{{ele.name}}</div>
                  <div class="img" :style="{backgroundPosition: backgroundPosition(ele.left, ele.right)}"></div>
                  <span>详情</span>

                </div>
            </div>
        </div>
      </el-tab-pane>
  </el-tabs>

   <!-- <div class="cardouter">
       <div class="item" v-for="(ele , i ) in 5" :key="i" >
           <div>
            <div class="title">text项目模板</div>
            <div class="img"></div>
            <span>详情</span>

           </div>
       </div>
   </div> -->

   

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
      
      innerVisible: false,
      selectedPro:1,
      name:'',
      descirbe:'',
      mobantext:'空白模板',
      activeName:'first',
      allList:[
        {name:'需求管理',left:-786 , right:-119 , bankuai:'yanfa'},
        {name:'bug管理',left:-597 , right:-241 , bankuai:'yanfa'},
        {name:'设计管理',left:0 , right:-493 , bankuai:'yanfa'},
        {name:'敏捷看板',left:-599 , right:-124 , bankuai:'yanfa'},
        {name:'用户反馈',left:-196 , right:-496 , bankuai:'yinxiao'},
        {name:'招聘管理',left:0 , right:-611 , bankuai:'renshi'},
        {name:'新员工管理',left:-389 , right:-490 , bankuai:'renshi'},
        {name:'周计划',left:-790 , right:-359 , bankuai:'qita'},
        {name:'任务跟进',left:-790 , right:-240 , bankuai:'qita'},
      ]
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
    handleClick(){},
    backgroundPosition(a,b){
      
      return a+'px  '+b +'px'
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
    font-size: 16px;
    color: #8091a5;
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
.cardouter {
    padding: 0 0 0 24px;
    max-height:396px;
    overflow-y: auto;
    min-height: 264px; 
    .item {
        display: inline-block;
        width: 190px;
        height: 116px;
        background-color: #ffffff;
        border-radius: 2px;
        border: 2px solid transparent;
        margin: 10px 10px 0 0;
        cursor: pointer;
        position: relative;
        border-radius: 4px;
        >div {
            box-shadow: 0 0 5px 0 rgba(0,0,0,0.2);
            height: 100%;
            position: relative;
          border-radius: 4px;
        }
        .title {
            height: 32px;
            color: #3f4a56;
            line-height: 32px;
            font-size: 12px;
            position: absolute;
            top: calc(50% - 16px);
            text-align: center;
            width: 100%;
            color: #fff;
            font-size: 16px;
            z-index: 1;
        }
        .el-icon-success {
            display: none;
            position: absolute;
            right: 0;
            bottom: 0;
            font-size: 24px;
            color: #4580FA;
        }
        span {
            display: none;
            position: absolute;
            bottom: -22px;
            left: -2px;
            height: 18px;
            line-height: 18px;
            padding: 0 4px;
            background-color: #8091a5;
            color: #fff;
            cursor: pointer;
        }
        .img {
            // height: calc(100% - 30px);
            height: 100%;
            // width: calc(100% + 4px);
            // margin: 0 0 -2px -2px;
            // background: url('../../../assets/setting/createprogram1.png') no-repeat ;
            background: url('../../../assets/setting/board.sprite.png') no-repeat ;
            background-size: 976px 726px;
            // background-position: center;
            position: relative;
            border-radius: 4px;
        }
        .img:after{
          content:'';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,.2);
          border-radius: 4px;
        }
    }
    .select {
        border-color:  #3582fb;
        span {
            display: inline-block;

        }
        .el-icon-success {
            display: block;
        }
    }
    
}
.tit {
  text-align: center;
  padding-bottom: 10px;
}
.inputarea {
    .el-input{
        border-radius: 2px;
    }
}

.knowCreate {
    color: #3582fb;
    i {
        margin-right: 8px;
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
    /* padding: 20px 20px 10px 20px */
    padding: 0;
}
.settings_qiyongDialog >>> .el-dialog__header {
  padding-top: 10px;
  text-align: center;
  font-size: 14px;
}

.settings_qiyongDialog >>> .el-dialog__title {
  font-size: 16px;
}

.settings_qiyongDialog >>> .el-dialog__headerbtn {
  top: 13px;
}
.inputarea >>> .el-input__inner {
    border-radius: 2px;
    border: 1px solid #b0bac5;
}
.inputarea >>> .el-textarea__inner {
    border-radius: 2px;
    border: 1px solid #b0bac5;
}

.dialogTabs >>> .el-tabs__nav {
  margin: 0 166px;
}
</style>
