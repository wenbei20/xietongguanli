<template>
  <div class="settings-setting settings">

    <div v-if="info.from === 'quexian'" class="settings_title fz18">缺陷查看页面设置</div>
    <div v-else class="settings_title fz18">需求查看页面设置</div>

    <div v-if="info.from === 'quexian'" class="settings_tips">设置缺陷查看页面显示字段 (处理人、优先级等部分字段固定显示在最上方)</div>
    <div v-else class="settings_tips">设置需求查看页面显示字段 (处理人、优先级等部分字段固定显示在最上方)</div>

    <div style="padding-left:20px;margin-top:16px;">
      <el-radio-group v-model="optionSelect">
        <el-radio label="1" style="margin-bottom:24px;">与创建页面一致（推荐）</el-radio><br>
        <el-radio label="2">自定义</el-radio>
      </el-radio-group>

      <div v-if="optionSelect === '2'" style="margin-top:20px">
        选择状态：
        <el-select v-model="status" style="width:85px;" placeholder="请选择" size="mini">
          <el-option key="1" label="规划中" value="1" />
          <el-option key="2" label="实现中" value="2" />
          <el-option key="3" label="已实现" value="3" />
          <el-option key="4" label="已拒绝" value="4" />
        </el-select>
      </div>

      <div v-if="optionSelect === '2'" class="outer" style="margin-top:20px">

        <div class="settings_transform transform">
          <p class="tit">配置显示字段</p>

          <el-transfer
            v-model="value"
            filter-placeholder="请输入城市拼音"
            :data="data"
            :titles="['候选字段','当前状态显示字段']"
          />
        </div>
      </div>

      <div style="height:46px;" />

      <el-button size="small" type="primary" @click="toxianshi">保存</el-button>
      <el-button v-if="optionSelect === '2'" size="small" @click="toxianshi">保存 & 同步到其他状态</el-button>
      <el-button size="small" @click="toxianshi">取消</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SettingsChakanYM',
  props: {
    info: {
      type: Object,
      default: {}

    }
  },
  data() {
    const generateData = _ => {
      const data = []
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
      const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu']
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        })
      })
      return data
    }
    return {
      optionSelect: '1',
      status: '',
      data: generateData(),
      value: []
    }
  },
  computed: {

  },
  created() {

  },
  methods: {
    toxianshi(){
      if(this.info.from === 'diedia'){
        this.$navigate('xianshiSZ_DD')
      }else if(this.info.from === 'quexian'){
        this.$navigate('xianshiSZ_QX')
      }else {
        this.$navigate('xianshi')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.outer {
    width: 700px;
    background: #fafafa;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #f3f3f3;
    .transform {
        .tit {
            font-weight: bold;
            padding-bottom: 5px;
            color: #666;
        }

    }
}

.transform >>> .el-checkbox__label {
    font-size: 12px;
}
</style>
