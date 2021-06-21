<template>
  <el-dialog
    v-el-drag-dialog
    :visible="innerVisible"
    width="660px"
    title="生成项目模板"
    class="settings_qiyongDialog"
    @close="close"
  >

   <div class="tit">
       选择一个已有的项目生成模板
   </div>

   <div class="cardouter">
       <!-- <div class="item" v-for="(ele , i ) in 5" :key="i" :class="{'select':i === selectedPro}">
           <div>
            <div class="title">text项目模板</div>
            <div class="img"></div>
            <i class="el-icon-success"></i>
            <span>详情</span>

           </div>
       </div> -->


      <el-select v-model="degree" filterable placeholder="请选择" size="mini" style="width:100%">
        <el-input v-model="testcoltext" prefix-icon="el-icon-search" size="mini" class="select_innerIpt" />
        <el-option label="轻量团队看板" :value="1" />
        <el-option label="test项目" :value="2" />
        <el-option label="敏捷研发管理" :value="3" />
      </el-select>
   </div>

    <div class="tit" style="margin:20px 0 8px 0;">
            模板信息
    </div>
   <div class="inputarea">
        <el-input size="mini" style="margin-bottom:12px;" v-model="name" placeholder="模板名称"></el-input>

   </div>
    <div class="tit" style="margin:20px 0 8px 0;">
            模板描述
    </div>
    <div class="inputarea">

        <el-input size="mini" type="textarea" v-model="descirbe" placeholder="模板描述（可选）"></el-input>
   </div>

    <div slot="footer" class="dialog-footer">
      <el-row>
        <!-- <el-col :span="6" style="text-align:left">
            <span class="knowCreate">
                <i class="el-icon-video-play"></i>
                一分钟了解创建项目

            </span>
        </el-col> -->

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
      jichuList: [],
      person: [],
      zidingyiList: [],
      innerVisible: false,
      selectedPro:1,
      name:'',
      descirbe:'',
      degree:'',
      testcoltext:''

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
    .item {
        display: inline-block;
        width: 128px;
        height: 116px;
        background-color: #ffffff;
        border-radius: 2px;
        border: 2px solid transparent;
        margin: 25px 20px 0 0;
        cursor: pointer;
        >div {
            box-shadow: 0 0 5px 0 rgba(0,0,0,0.2);
            height: 100%;
            position: relative;
        }
        .title {
            height: 32px;
            padding: 0 10px;
            color: #3f4a56;
            line-height: 32px;
            font-size: 12px;
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
            height: calc(100% - 32px);
            // width: calc(100% + 4px);
            // margin: 0 0 -2px -2px;
            background: url('../../../assets/setting/createprogram1.png') no-repeat;
            background-position: center;
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
    .item:hover {
        border-color:  #3582fb;
        span {
            display: inline-block;

        }
    }
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
    padding: 20px 20px 10px 20px
}
.inputarea >>> .el-input__inner {
    border-radius: 2px;
    border: 1px solid #b0bac5;
}
.inputarea >>> .el-textarea__inner {
    border-radius: 2px;
    border: 1px solid #b0bac5;
}
</style>
