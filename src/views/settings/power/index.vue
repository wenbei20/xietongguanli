<template>
  <div class="settings-power settings">
    <div class="settings_title fz18">成员与权限</div>
    <ul class="settings_navlist">
      <li><span @click="$navigate('chengyuan')">成员</span></li>
      <li><span @click="$navigate('yonghuzu')">用户组权限</span></li>
      <li><span @click="$navigate('changyuanqiyong')">其他设置</span></li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'SettingsPower',

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
