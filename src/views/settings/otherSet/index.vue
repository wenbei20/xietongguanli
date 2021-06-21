<template>
  <div class="settings-otherSet settings">
    <div class="settings_title fz18">其他设置</div>
    <ul class="settings_navlist">
      <li><span @click="$navigate('gonggong')">项目公共参数设置</span></li>
      <li><span @click="$navigate('shitu')">项目系统视图设置</span></li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'SettingsOtherSet',

  data() {
    return {

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
