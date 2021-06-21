<template>
  <div id="app" :class="authorityType">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState({
      authorityType: state => state.app.authorityType
    }),
    classObj() {
      return {
        admin: this.authorityType === 'admin',
        user: this.authorityType === 'user'
      }
    }
  },
  created() {
    console.log(17, this.sidebar, this.theme)
  }
}
</script>
