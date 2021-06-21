<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <!-- <img v-if="logoImg" :src="logoImg" class="sidebar-logo">
        <h1 v-else class="sidebar-title">
          <img :src="logoText">
        </h1> -->
        <h1 class="sidebar-title collapse">
          <img :src="ydLogo" alt="" class="ydLogo">
          <!-- <svg-icon icon-class="ceshiLogo" /> -->
        </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <!-- <img v-if="logoImg" :src="logoImg" class="sidebar-logo">
        <h1 class="sidebar-title">
          <img :src="logoText">
        </h1> -->
        <h1 class="sidebar-title">

          <!-- <svg-icon icon-class="ceshiLogo" /> -->
          <img :src="ydLogo" alt="" class="ydLogo">
          <span class="innerLogoText">{{ title }} </span>

        </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
// import logoImg from '@/assets/main/logo-img.png'
import ydLogo from '@/assets/login/ydLogo.png'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '盈动项目协作平台 V1.0',
      ydLogo
      // logoImg,
      // logoText
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  // transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  // opacity: 0;

}

.sidebar-logo-container {
  position: relative;
  width: 100% ;
  height: 50px;
  line-height: 50px;
  background: #fff;
  // text-align: center;
  // overflow: hidden;
  border-bottom: #515DD3 solid 1px;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      // display: inline-block;
      display: block;
      background-color: #515DD3;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      padding-left: 14px;
      // vertical-align: middle;

      &.collapse {
          svg {
            // left: 8px;
          }
      }
      svg {
        width: 26px;
        height: 26px;
        position: relative;
        top: 6px;
        left: 0;
        margin-right: 12px;
      }
      img { vertical-align: middle;}
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
.sidebar-logo-container:after{
  content: '';
  display: block;
  height: calc(100% + 1px);
  width: 1px ;
  position: absolute;
  right: -1px;
  top: 0px;
  background-color: #515DD3;
}

// admin权限
#app.admin{
  .sidebar-logo-container{ border-bottom: none;
    .sidebar-logo-link {
      .sidebar-title{ background: #004564;}
    }
    &:after{ display: none;}
  }
}
.ydLogo {
  height: 30px;
  margin-right: 10px;
}
</style>
