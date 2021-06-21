<template>
  <div class="settings-xuqiu settings">

    <div class="settings_title fz18">需求</div>

    <div class="copy" @click="showCopyDialog = true">
      <i class="el-icon-document-copy" />
      复制需求配置至
    </div>

    <ul class="settings_navlist">
      <li><span @click="$navigate('ziduanSZ')">字段设置</span></li>
      <li><span @click="$navigate('xianshi')">显示设置</span></li>
      <li><span @click="$navigate('gongzuoliu')">工作流设置</span></li>
      <li><span @click="$navigate('qiyongSZ')">启用设置</span></li>
    </ul>
    <copyDialog
      :dialog-visible.sync="showCopyDialog"
    />
  </div>
</template>

<script>
import copyDialog from '../components/copySettingDialog'
export default {
  name: 'SettingsXuqiu',
  components: { copyDialog },
  data() {
    return {
      showCopyDialog: false
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
.copy {
  color: #3582fb ;
  padding-top: 16px;
  font-size: 14px;;
  text-decoration: underline;
  cursor: pointer;
}
</style>
