<template>
  <div class="settings">

    <div v-if="info.from === 'jixian'" class="settings_title fz18">编辑基线</div>
    <div v-else class="settings_title fz18">新增基线</div>

    <el-row>
      <el-col :span="2" class="left">
        <div class="tit">标题<span>*</span>：</div>
      </el-col>
      <el-col :span="22">
        <el-input v-model="name" placeholder="" size="small " style="width:168px;" /><br>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2" class="left">
        <div class="tit">版本：</div>
      </el-col>
      <el-col :span="22">
        <el-select v-model="version" style="width:168px;">
          <el-option label="正常版本" value="1" />
          <el-option label="临时版本" value="2" />
        </el-select>
        <div class="tips">预计结束：无预计结束</div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2" class="left">
        <div class="tit">详细描述：</div>
      </el-col>
      <el-col :span="22">
        <el-input type="textarea" size="small" style="width:449px;" /><br>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2" class="left">
        <div class="tit">状态：</div>
      </el-col>
      <el-col :span="22">
        <el-select v-model="status" style="width:168px;">
          <el-option label="正常版本" value="1" />
          <el-option label="临时版本" value="2" />
        </el-select>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2" class="left">
        <div class="tit">预计结束：</div>
      </el-col>
      <el-col :span="22">
        <el-date-picker
          v-model="yjendtime"
          size="small"
          type="date"
          placeholder="选择日期"
        />
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2" class="left">
        <div class="tit">处理人：</div>
      </el-col>
      <el-col :span="22">
        <el-input v-model="clr" placeholder="" size="small " style="width:168px;" /><br>
      </el-col>
    </el-row>

    <el-row>

      <el-col :span="22" :offset="2">

        <div v-if="info.from === 'jixian'" style="padding-top:20px;">
          <el-checkbox v-model="tongbu">同步更新与此模块相关数据：需求，模板，工作流附加字段</el-checkbox>
        </div>

        <div class="btns">
          <el-button size="small" @click="$navigate('jixian')">提交&返回</el-button>
          <el-button v-if="info.from !== 'jixian'" size="small">提交&继续创建</el-button>
          <el-button size="small" @click="$navigate('jixian')">取消</el-button>
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
      tongbu: true,
      version: '1',
      status: '1',
      yjendtime: '',
      clr: ''

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
.tips {
  font-size: 14px;
  margin-top: 10px;
}
</style>
