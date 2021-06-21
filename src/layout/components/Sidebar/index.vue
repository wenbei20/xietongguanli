<template>
  <div :class="{'has-logo':showLogo}" class="sidebarOuter">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="authorityType !== 'admin' ? variables.menuBg : variables.menuBg2"
        :text-color="authorityType !== 'admin' ? variables.menuText : variables.menuText2"
        :unique-opened="false"
        :active-text-color="authorityType !== 'admin' ? variables.menuActiveText : variables.menuActiveText2"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    
    <div :class="['changeUser',authorityType ,isCollapse ? 'isCollapse' :'']" @click="changeRoles">
      <div class="name" v-if="!isCollapse">{{changeUser.name}}</div>
      <div class="img">
        <img :src="changeUser.src" alt="">
      </div>
    </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import adminImg from "@/assets/entry/manager.png"
import projectImg from "@/assets/entry/code.png"

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      renderRoutes: [],
      changeUser:{
        src:adminImg,
        name:'系统管理员入口'
      }
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar',
      'authorityType'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      console.log('this.sidebar.opened', this.sidebar.opened)
      return !this.sidebar.opened
    }
  },
  watch:{
    authorityType:{
      handler(val){
        if(val === 'admin'){
          this.changeUser={src:projectImg,name:'项目成员入口'}
        }else if(val === 'user'){
          this.changeUser={src:adminImg,name:'系统管理员入口'}
        }
      },
      immediate:true
    }
  },
  created() {
    this.renderRoutes = this.authorityType === 'admin' ? this.permission_routes[0] : this.permission_routes
    console.log(53, this.$store.state, this.permission_routes, this.authorityType)
  },
  methods:{
    changeRoles(){
      let type = this.authorityType === 'admin' ? 'user' : 'admin' 
      this.$store.dispatch('app/setAuthorityType', type)
      if (type === 'admin') {
        this.$router.push('/adminSystem')
      } else {
        this.$router.push('/notice')
      }

    }
  }
}
</script>

<style lang="scss" scoped>




// admin权限
#app.admin{
  .sidebar-container{ background: #004564; border: none;}
}



.changeUser {


  

  &.admin {
    
    background-color:rgba(255, 255, 255,0.2);
    color: #fff;
    
  }
  &.user {
    background-color:rgba(60, 115, 197,0.2);
    color: #3c73c5;
  }

  &.isCollapse {
    left: 0;
    background-color: transparent;
    .img {
      width: 30px;
      img {
        width: 30px;
      }
    }
  }
  width: 90%;
  position: absolute;
  bottom: 20px;
  left: 9px;
  height: 60px;
  padding: 10px;
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;
  .name {
    float: right;
    height: 40px;
    line-height: 40px;
    width: calc(100% - 50px);
    font-size: 15px;
  }
  .img {
    float: left;
    width: 40px;
    img {
      width: 40px;
    }
  }
}
</style>
<style  scoped>

.sidebarOuter >>> .el-scrollbar__view{
  position: relative;
  padding-bottom: 100px;
  min-height: 100%;
}
</style>
