<template>
  <div class="entry">
    <div class="topbar">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :size="'small'" style="background: rgba(0, 0, 0, .2); vertical-align: middle;">李</el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="header">请选择一种角色登录系统</div>
    <div class="nav">
      <div class="item admin" @click="entry('admin')">
        <div class="title">系统管理人员入口</div>
        <div class="content"><img :src="managerIcon"></div>
        <div class="handle">点击进入</div>
      </div>
      <div class="item developer" @click="entry('user')">
        <div class="title">项目成员入口</div>
        <div class="content"><img :src="codeIcon"></div>
        <div class="handle">点击进入</div>
      </div>
    </div>
  </div>
</template>

<script>
import managerIcon from '@/assets/entry/manager.png'
import codeIcon from '@/assets/entry/code.png'

export default {
  name: 'Entry',
  data() {
    return {
      managerIcon,
      codeIcon
    }
  },
  methods: {
    async entry(type) {
      await this.$store.dispatch('app/setAuthorityType', type)
      if (type === 'admin') {
        this.$router.push('/adminSystem')
      } else {
        this.$router.push('/notice')
      }
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.entry{ width: 100%; height: 100%; background: url('~@/assets/login/login-bg.jpg') no-repeat; background-size: 100% 100%; overflow: hidden;
  .topbar{ height: 30px; padding: 10px; text-align: right;}
  .header{ font-size: 24px; line-height: 2.5; text-align: center; color: #fff; margin-top: 100px;}
  .nav{ width: fit-content; margin: 30px auto 0;
    .item{ text-align: center; display: inline-block; font-size: 16px; background: rgba(255, 255, 255, .1); color: #fff; cursor: pointer; transition: all .2s linear;
      & + .item{ margin-left: 50px;}
      .title{ width: 100%; height: 50px; line-height: 50px; font-weight: 800;}
      .content{ width: 200px; height: 160px; padding: 30px;
        img{ display: block; width: auto; height: 100%; margin: 0 auto;}
      }
      .handle{ width:100%; height: 50px; line-height: 50px;}
      &.admin{
        .title{ background: #3c73c5;}
      }
      &.developer{
        .title{ background: #33b1e3;}
      }
      &:hover{ background: rgba(0, 0, 0, .1); box-shadow: 0 10px 15px rgba(0, 0, 0, .15);}
    }
  }
}
</style>
