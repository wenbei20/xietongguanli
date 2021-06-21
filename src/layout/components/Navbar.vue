<template>
  <div class="navbar">
    <!-- <h4 class="logo">测试管理系统</h4> -->
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->

    <el-popover
      v-if="$route.path.includes('project') && $route.path !== '/project/index'  && !isAdmin  "
      class="currentProject"
      placement="bottom-start"
      width="300"
      trigger="click"
    >
      <div class="popoverProject">
        <el-input
          placeholder="查询项目名称"
          size="small"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
        <el-divider content-position="left">所有项目</el-divider>
        <div class="list">
          <div class="item active">中行移动端APP研发二期</div>
          <div class="item">中行外汇结算接口应用</div>
          <div class="item">BI分析数据中心支撑平台</div>
          <div class="item">客户关系CRM系统</div>
        </div>
      </div>
      <el-button slot="reference">
        <el-avatar shape="square" :size="'small'" :src="fileUrl" /> 中行移动端APP研发二期 <i class="el-icon-arrow-down el-icon--right" />
      </el-button>
    </el-popover>

    <div v-if="$route.path.includes('project') && $route.path !== '/project/index'  && !isAdmin" class="navBarMenu">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item v-for="item in navBarMenu" :key="item.name" :index="item.name">
          {{ item.meta.title }}
          <i v-if="item.name === 'setting'" class="el-icon-setting" />
        </el-menu-item>

        <!-- add -->
        <!-- <el-submenu index="more" class="moreMenu">
          <template slot="title">更多</template>
          <el-menu-item  v-for="ele in moreNavBarMenu" :key="ele.name" :index="ele.name">
              {{ele.meta.title}}
              <i v-if="ele.name === 'setting'" class="el-icon-setting" />

          </el-menu-item>

        </el-submenu> -->
        <!-- add -->

      </el-menu>
    </div>

    <div v-if="$route.path.includes('dataPlatform') && !isAdmin" class="navBarMenu">
      <el-menu :default-active="dataActiveIndex" class="el-menu-demo" mode="horizontal" @select="handleDataSelect">
        <el-menu-item v-for="item in dataPlatformMenu" :key="item.name" :index="item.path">
          {{ item.meta.submenu }}
        </el-menu-item>
      </el-menu>
    </div>

    <!-- <div v-if="$route.path.includes('companyManage') && !isAdmin" class="navBarMenu">
      <el-menu :default-active="CompanyActiveIndex" class="el-menu-demo" mode="horizontal" @select="handleCompanySelect">
        <el-menu-item v-for="item in companyManage" :key="item.name" :index="item.path">
          {{ item.meta.submenu }}
        </el-menu-item>
      </el-menu>
    </div> -->

    <div class="right-menu">
      <el-input
        v-model="searchValue"
        size="mini"
        placeholder="输入搜索内容"
        suffix-icon="el-icon-search"
        class="search"
      />

      <el-popover
        placement="bottom-end"
        title="标题"
        width="200"
        trigger="click"
        content="消息通知..."
      >
        <el-button slot="reference" size="mini" type="text" style="font-size: 14px; vertical-align: top; margin: 10px 10px 0;">
          <i class="el-icon-bell" />
        </el-button>
      </el-popover>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :size="'small'" style=" vertical-align: middle;">李</el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import fileUrl from '@/assets/icon/file.png'

export default {
  components: {
    Hamburger
  },
  data() {
    return {
      fileUrl,
      currentRoute: this.$route,
      navBarMenu: [],
      dataPlatformMenu: [],
      companyManage: [],
      activeIndex: 'Baseinfo',
      dataActiveIndex: '',
      CompanyActiveIndex: 'index',
      searchValue: '',
      moreNavBarMenu: [],
      isAdmin:false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
  
    // isAdmin(){
      
    //   return this.$store.state.app.authorityType === 'admin'
    // }
  },
  watch: {
    $route(val) {
      // console.log(55, val)
      // console.log('isAdmin',this.$store.state )
      this.isAdmin = this.$store.state.app.authorityType === 'admin'
      this.refreshRouteArr()
      console.log('isAdmin', this.isAdmin)

    }
  },
  created() {

    this.refreshRouteArr()
    
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push(`/project/${key.toLowerCase()}`)
    },
    handleDataSelect(key, keyPath) {
      this.$router.push(`/dataPlatform/${key.toLowerCase()}`)
    },
    handleCompanySelect(key) {
      this.$router.push(`/companyManage/${key.toLowerCase()}`)
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    refreshRouteArr(){
        if(this.$route.meta.roles && this.$route.meta.roles.includes('user')){
          this.navBarMenu = this.$store.state.permission.addRoutes
            .find((item) => item.path.includes('/project')).children.slice(1)
            .filter((item) => !item.meta.hide)

          

          this.dataPlatformMenu = this.$store.state.permission.addRoutes
            .find((item) => item.path.includes('/dataPlatform')).children
            .filter((item) => !item.meta.hide)

          // this.companyManage = this.$store.state.permission.addRoutes
          //   .find((item) => item.path.includes('/companyManage')).children
          //   .filter((item) => !item.meta.hide)

          this.dataActiveIndex = this.dataPlatformMenu[0] ? this.dataPlatformMenu[0].path : ''
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.navbar { height: 50px; overflow: hidden; position: relative; background: #566fe9 url("~@/assets/login/login-bg.jpg") no-repeat; box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .logo{ vertical-align: middle; color: #fff; background: rgba(0, 0, 0, .1); float: left; font-size: 16px; text-align: center; line-height: 50px; font-weight: 100; margin: 0; padding: 0; width: 209px;}

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }
    .search{ width: 150px; vertical-align: top;
      ::v-deep{
        .el-input{
          &__inner{ border-radius: 100px; background: transparent; border: 0 none; color: #fff;
            &::-webkit-input-placeholder{ color: rgba(255, 255, 255, 0.5);}
          }
          &__suffix{ color: #fff;}
        }
      }
    }
    .el-button{ color: #fff;}
    .right-menu-item { display: inline-block; padding: 0 8px; height: 100%; font-size: 14px; color: #fff; vertical-align: text-bottom;

      &.hover-effect { cursor: pointer; transition: background .3s;

        &:hover { background: rgba(0, 0, 0, .025) }
      }
    }

    .avatar-container { margin-right: 30px;

      .avatar-wrapper { position: relative;

        .el-avatar{ background: rgba(0, 0, 0, .2);}
        .user-avatar { cursor: pointer; width: 40px; height: 40px; border-radius: 10px; }

        .el-icon-caret-bottom { cursor: pointer; position: absolute; right: -20px; top: 15px; font-size: 12px; }
      }
    }
  }
}

.currentProject{ color: #fff; margin-left: 50px; vertical-align: middle;
  > .el-button{ border: none; background: transparent; color: #fff; padding: 10px 0;}
  .el-avatar{vertical-align: -0.55em; margin-right: 5px;}
}

.popoverProject{
  .list{ margin-top: 10px;
    .item{ font-size: 14px; line-height: 30px; padding: 5px 15px; margin-bottom: 5px; border-radius: 4px; cursor: pointer; transition: all .2s;;
      &:hover{ background: #f6f6f9; color: #333;}
      &.active{ background: #f1f4ff; color: #1890ff; font-weight: 600;}
    }
  }
}

.navBarMenu{ display: inline-block; width: fit-content; margin: 0 0 0 50px; height: 50px; vertical-align: middle;
  .el-menu--horizontal{ background: transparent;
    > .el-menu-item{ height: 50px; line-height: 50px; color: #fff;
      &:hover{ background: transparent;}
      &.is-active{
        &, &:hover{ background: rgba(0, 0, 0, .1); border-bottom: #fce132 solid 3px;}
      }
    }
  }
}

.el-icon-setting {
  color:#fff;
}

// admin权限
#app.admin{
  .navbar{ background: #fff; border-bottom: #eee solid 1px;
    .right-menu {
      .search{
        ::v-deep{
          .el-input{
            &__inner{ border-radius: 100px; background: transparent; border: 0 none; color: #333;
              &::-webkit-input-placeholder{ color: rgba(0, 0, 0, 0.5);}
            }
            &__suffix{ color: #333;}
          }
        }
      }
    }
    .right-menu{
      .el-button{ color: #333;}
      .avatar-container {
        .avatar-wrapper {
          .el-avatar{ background: #004564;}
        }
      }
    }
  }
  .navBarMenu{
    .el-menu--horizontal{
      > .el-menu-item{ color: #999;
        &:hover{ background: transparent;}
        &.is-active{
          &, &:hover{ color: #333; font-weight: 800; background: transparent; border-bottom: #004564 solid 3px;}
        }
      }
    }
  }
}
</style>
