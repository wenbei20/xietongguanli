<template>
  <div class="settings">

    <div class="settings_title fz18">添加模块</div>

    <el-row>
      <el-col :span="2" class="left">
        <div class="tit">模块名称 <span>*</span>：</div>
      </el-col>
      <el-col :span="22">
        <el-input v-model="name" placeholder="" size="small " style="width:168px;" /><br>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2" class="left">
        <div class="tit">模块描述：</div>
      </el-col>
      <el-col :span="22">
        <el-input v-model="name" type="textarea" size="small" style="width:449px;" /><br>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2" class="left">
        <div class="tit">模块名称 <span>*</span>：</div>
      </el-col>
      <el-col :span="22">
        <el-input v-model="name" placeholder="" size="small " style="width:168px;" /><br>

        <div v-if="info.from === 'mokuai'" style="padding-top:20px;">
          <el-checkbox v-model="tongbu">同步更新与此模块相关数据：需求，模板，工作流附加字段</el-checkbox>
        </div>

        <div class="btns">
          <el-button size="small" @click="$navigate('mokuai')">提交&返回</el-button>
          <el-button v-if="info.from !== 'mokuai'" size="small">提交&继续创建</el-button>
          <el-button size="small" @click="$navigate('mokuai')">取消</el-button>
        </div>

      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      name: '',
      type: '',
      allselect: false,
      ismust: false,
      tongbu: true

    }
  },
  computed: {

  },
  created() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
settings
.settings_title {
    padding-bottom: 30px;
}
.left {
    .tit {
        font-size: 14px;
        line-height: 32px;
        color: #8091a5;
        span {
            color: #f00;
        }
    }

}
.btns {
    margin-top: 16px;
}
.el-row {
    margin-top: 20px;
}
.settings_tips {
    margin-top: 12px;
}
.table {
    width: 658px;
    .com_table {
        text-align: left;
        margin-bottom: 30px;
        td {
            text-align: left;
            padding: 8px 10px;
            box-sizing: border-box;
        }
        th {
            font-size: 13px;
        }
    }
}
</style>
