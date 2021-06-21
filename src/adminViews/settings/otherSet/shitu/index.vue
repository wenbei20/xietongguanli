<template>
  <div class="settings-otherSet settings">
    <div class="settings_title fz18">项目系统视图设置</div>
    <ul class="settings_navlist">
      <li><span @click="$navigate('xuqiushitu')">需求系统视图</span></li>
      <li><span @click="$navigate('quexianshitu')">缺陷系统视图</span></li>
      <li><span @click="$navigate('diedaishitu')">迭代系统视图</span></li>
    </ul>
  </div>
</template>

<script>

export default {

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
