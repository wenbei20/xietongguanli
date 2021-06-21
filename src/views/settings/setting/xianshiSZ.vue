<template>
  <div class="settings-xianshi settings">

    <div class="settings_title">显示设置</div>

    <ul v-if="info.from === 'quexian'" class="settings_navlist">
      <li><span @click="$navigate('chuangjianYM_QX')">创建页面模板</span></li>
      <li><span @click="$navigate('editYM_QX')">编辑页面设置</span></li>
      <li><span @click="$navigate('chakanYM_QX')">查看页面设置</span></li>
    </ul>

    <!-- 迭代 -->
    <ul v-else-if="info.from === 'diedia'" class="settings_navlist">
      <li><span @click="$navigate('chuangjianYM_DD')">创建页面模板</span></li>
      <li><span @click="$navigate('diedaijindu')">迭代进度</span></li>
    </ul>

    <ul v-else class="settings_navlist">
      <li><span @click="$navigate('chuangjianYM')">创建页面模板</span></li>
      <li><span @click="$navigate('editYM')">编辑页面设置</span></li>
      <li><span @click="$navigate('chakanYM')">查看页面设置</span></li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'SettingsXianshi',
  props: {
    info: {
      type: Object,
      default: {}

    }
  },
  data() {
    return {
      naviType: ''
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

</style>
