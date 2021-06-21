<template>
  <div class="settings">

    <div v-if="info.from === 'quexian'" class="settings_title fz18">增加缺陷自定义字段</div>
    <div v-else-if="info.from === 'diedia'" class="settings_title fz18">增加迭代自定义字段</div>
    <div v-else class="settings_title">增加需求自定义字段</div>

    <el-row>
      <el-col :span="3" class="left">
        <div class="tit">字段名 <span>*</span> ：</div>
      </el-col>
      <el-col :span="21">
        <el-input v-model="name" placeholder="" size="small " style="width:168px;" /><br>
        <div class="settings_tips">输入一个符合阅读习惯的短名字,最多30个字符,不能是系统字段,且不能与已有的自定义字段重名</div>
      </el-col>
    </el-row>

    <el-row v-if="info.from !== 'diedia'">
      <el-col :span="3" class="left">
        <div class="tit">字段备注 ：</div>
      </el-col>
      <el-col :span="21">
        <el-input v-model="name" type="textarea" size="small" style="width:449px;" /><br>
        <div class="settings_tips">备注信息可以用来提示用户如何填写字段值(比如“请输入数字”)</div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="3" class="left">
        <div class="tit">字段类型 <span>*</span> ：</div>
      </el-col>
      <el-col :span="21">
        <el-select v-model="type" placeholder="请选择" size="small">
          <el-option
            key="1"
            label="单行文本框"
            value="1"
          />
          <el-option
            key="1"
            label="单选下拉列表"
            value="1"
          />
          <el-option
            key="1"
            label="复选框"
            value="1"
          />
          <el-option
            key="1"
            label="单选框"
            value="1"
          />
          <el-option
            key="1"
            label="多行文本框"
            value="1"
          />
          <el-option
            key="1"
            label="人名输入框"
            value="1"
          />
          <el-option
            key="1"
            label="日期"
            value="1"
          />
          <el-option
            key="1"
            label="数值型"
            value="1"
          />
        </el-select>
        <br>
        <div class="settings_tips">根据需要可选择不同的字段类型,选择的字段类型会对是否配置字段选项产生影响</div>
      </el-col>
    </el-row>

    <el-row v-if="info.from !== 'diedia'">
      <el-col :span="3" class="left">
        <div class="tit">应用到创建页模板：</div>
      </el-col>
      <el-col :span="21">
        <div class="table">
          <table class="com_table" cellspacing="0">

            <colgroup>
              <col style="width: 8%;">
              <col style="width: 72%;">
              <col style="width: 20%;">
            </colgroup>
            <thead>
              <tr>
                <th><el-checkbox v-model="allselect" /></th>
                <th>模板名称</th>
                <th>是否必填<el-checkbox v-model="ismust" /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><el-checkbox v-model="allselect" /></td>
                <td>test模板2</td>
                <td><el-checkbox v-model="ismust" /></td>
              </tr>
            </tbody>

          </table>

          <el-button size="small" type="primary" @click="navigate">确认</el-button>
          <el-button size="small" @click="navigate">取消</el-button>

        </div>
      </el-col>
    </el-row>

    <el-row v-else>

      <el-col :span="21" :offset="3">
        <div class="table">

          <el-button size="small" type="primary" @click="navigate">确认</el-button>
          <el-button size="small" @click="navigate">取消</el-button>

        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'SettingsXinzengZD',
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      name: '',
      type: '',
      allselect: false,
      ismust: false
    }
  },
  computed: {

  },
  created() {

  },
  methods: {
    navigate() {
      if (this.info.from === 'quexian') {
        this.$navigate('ziduanSZ_QX')
      } else if (this.info.from === 'diedia') {
        this.$navigate('diedaiziduan')
      } else {
        this.$navigate('ziduanSZ')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
settings
.settings_title {
    padding-bottom: 30px;
}
.left {
    text-align: right;
    .tit {
        line-height: 32px;
        span {
            color: #f00;
        }
    }
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
