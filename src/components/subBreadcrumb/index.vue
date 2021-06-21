<template>
  <div class="subbreadcrumb">
    当前位置：&nbsp;
    <span v-for="(item, idx) in routerItems" :key="idx">
      <i :class="{'clickable':item.component}" @click="navigate(item.component)">{{ item.name }}</i>
      <span v-if="idx!==routerItems.length-1" class="arrow">></span>
    </span>
  </div>
</template>

<script>

export default {

  name: 'Subbreadcrumb',
  props: {
    routerItems: {
      type: Array
    }
  },
  data() {
    return {
    }
  },
  computed: {

  },
  created() {

  },
  methods: {
    navigate(route) {
      if (route) {
        this.$emit('navigate', route)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.subbreadcrumb {
    line-height: 46px;
    font-size: 12px;
    color: #8091a5;
    position: absolute;
    padding-left: 25px;
    top: 4px;
    left: 0;
    background-color: #fff;
    z-index: 99;
    i {
      font-style: normal;
      display: inline-block;
    }
    .arrow {
      display: inline-block;
      margin: 0 6px;
    }
    .clickable {
      cursor: pointer;
    }
}
</style>
