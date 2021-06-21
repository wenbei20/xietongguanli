<template>
  <div class="details-tabs-pane">
    <component :is="type" />
  </div>
</template>

<script>
import xuqiu from './xuqiu'
import quexian from './quexian'
import chengyuanrenwugenzong from './chengyuanrenwugenzong'
import yibiaopan from './yibiaopan'
import jindutu from './jindutu'

export default {
  name: 'DetailsTabsPane',
  components: {
    xuqiu,
    quexian,
    chengyuanrenwugenzong,
    yibiaopan,
    jindutu
  },
  props: {
    type: {
      default: 'xuqiu',
      type: String
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.details-tabs-pane{ width:100%;}
</style>
