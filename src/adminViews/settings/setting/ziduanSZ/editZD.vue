<template>
  <div class="settings">

    <div class="settings_title fz18">编辑系统字段</div>

    <el-row>
      <el-col :span="2" class="left">
        <div class="tit">字段名 <span>*</span> ：</div>
      </el-col>
      <el-col :span="22">
        <el-input v-model="name" disabled placeholder="" size="small " style="width:168px;" /><br>
      </el-col>
    </el-row>

    <el-row v-if="info.from !== 'diedia'">
      <el-col :span="2" class="left">
        <div class="tit">字段备注 ：</div>
      </el-col>
      <el-col :span="22">
        <el-input v-model="textarea" type="textarea" size="small" style="width:449px;" /><br>
        <div class="settings_tips">备注信息可以用来提示用户如何填写字段值(比如“请输入数字”)</div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2" class="left">
        <div class="tit">字段类型 <span>*</span> ：</div>
      </el-col>
      <el-col :span="22">
        <el-select v-model="type" disabled placeholder="请选择" size="small">
          <el-option
            key="1"
            label="字符串"
            value="1"
          />
        </el-select>
        <br>
        <div class="settings_tips">根据需要可选择不同的字段类型,选择的字段类型会对是否配置字段选项产生影响</div>
      </el-col>
    </el-row>

    <el-row>

      <el-col :span="22" :offset="2">
        <div>
          <span>字段值选项：</span>
          <span class="settings_add" @click="addoptions">
            <i class="el-icon-plus" />
            增加选项
          </span>
        </div>
        <div class="optionsList">
          <draggable>
            <transition-group>
              <div v-for="(item,i) in optionsList" :key="i" class="optionsItem">
                <span />
                <el-input v-model="item.value" size="mini" />
                <i class="el-icon-close" />
              </div>
            </transition-group>
          </draggable>
        </div>

        <el-button size="small" type="primary" @click="navigate">确认</el-button>
        <el-button size="small" @click="navigate">取消</el-button>

      </el-col>
    </el-row>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'SettingsEditZD',
  components: { draggable },
  props: {
    info: {
      type: Object,
      default: () => {}

    }
  },
  data() {
    return {
      name: '需求类型',
      textarea: '',
      type: '',
      allselect: false,
      ismust: false,
      optionsList: [{ value: '业务需求' }, { value: '其他' }, { value: 'qwe' }, { value: '1231' }]
    }
  },
  computed: {

  },
  created() {
    if (this.info.from) {
      this.optionsList = []
    }
  },
  methods: {
    addoptions() {
      this.optionsList.push({ value: '' })
    },
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
.optionsItem {
    .el-input {
        width: 168px;
    }
    padding: 4px 0;
    span {
        display: inline-block;
        position: relative;
        top: 4px;
        width: 10px;
        height: 16px;
        background: url('data:image/gif;base64,R0lGODlhBgAOAJEAAL+/v7q6uv///wAAACH5BAEHAAIALAAAAAAGAA4AAAISBCRmuOjPTlIR2hlbu06DIBkFADs=') ;
        background-repeat: no-repeat;
        cursor: move;
    }
}
.optionsList {
    margin: 10px 0;

}
</style>
