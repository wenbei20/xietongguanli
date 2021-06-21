<template>
  <div class="settings-setting settings">

    <div v-if="info.from === 'quexian'" class="settings_title fz18">缺陷编辑页面设置</div>
    <div v-else class="settings_title fz18">需求编辑页面设置</div>

    <div v-if="info.from === 'quexian'" class="settings_tips">设置缺陷编辑页面显示字段</div>
    <div v-else class="settings_tips">设置需求编辑页面显示字段</div>

    <div style="padding-left:20px;margin-top:16px;">
      <el-radio-group v-model="optionSelect">
        <el-radio label="1" style="margin-bottom:24px;">与创建页面一致（推荐）</el-radio><br>
        <el-radio label="2">与查看页面一致</el-radio>
      </el-radio-group>
      <div style="height:46px;" />

      <el-button size="small" type="primary" @click="navigate">确认</el-button>
      <el-button size="small" @click="navigate">取消</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SettingsEditYM',
  props: {
    info: {
      type: Object,
      default: {}

    }
  },
  data() {
    return {
      optionSelect: '1'
    }
  },
  computed: {

  },
  created() {

  },
  methods: {
    navigate() {
      if (this.info.from === 'quexian') {
        this.$navigate('xianshiSZ_QX')
      } else if (this.info.from === 'diedia') {
        this.$navigate('xianshiSZ_DD')
      } else {
        this.$navigate('xianshi')
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
