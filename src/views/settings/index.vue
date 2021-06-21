<template>
  <div class="settings-container">
    <el-row class="el_row">
      <!-- 菜单 -->
      <el-col style="width:230px;">
        <el-menu
          default-active="info"
          @select="menuSelect"
        >

          <div class="title-leftnav">
            <i class="el-icon-menu" />
            项目设置</div>

          <el-menu-item index="info">
            <span slot="title">项目信息</span>
          </el-menu-item>
          <el-menu-item index="setting">
            <span slot="title">应用设置</span>
          </el-menu-item>
          <el-menu-item index="power">
            <span slot="title">成员与权限</span>
          </el-menu-item>
          <el-menu-item index="report">
            <span slot="title">消息设置</span>
          </el-menu-item>
          <el-menu-item index="otherSet">
            <span slot="title">其他设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col style="position:relative;overflow-y:auto;width:calc(100% - 230px)">
        <topNav v-if="activeComponent!=='info'" :router-items="subRouterItems" @navigate="navigate" />

        <component :is="activeComponent" :info="componentInfo" @navigate="navigate" />

      </el-col>
    </el-row>
  </div>
</template>

<script>

import info from './info'
import otherSet from './otherSet'
import power from './power'
import report from './report'
import setting from './setting'
import xuqiu from './setting/xuqiu'
import xianshi from './setting/xianshiSZ.vue'
import topNav from '@/components/subBreadcrumb'
import chuangjianYM from './setting/xianshiSZ/chuangjianYM'
import xinzengCJ from './setting/xianshiSZ/xinzengchuangjian'
import ziduanSZ from './setting/ziduanSZ.vue'
import xinzengZD from './setting/ziduanSZ/xinzengZD'
import editZD from './setting/ziduanSZ/editZD'
import editYM from './setting/xianshiSZ/editYM'
import chakanYM from './setting/xianshiSZ/chakanYM'
import qiyongSZ from './setting/qiyongSZ'
import gongzuoliu from './setting/gongzuoliuSZ'
import quexianSZ from './setting/quexianSZ'
import qiyongSZ_QX from './setting/quexian/qiyongSZ'
import gonggong from './otherSet/gonggong/index'
import mokuai from './otherSet/gonggong/mokuai/index'
import banben from './otherSet/gonggong/banben/index'
import addmokuai from './otherSet/gonggong/mokuai/addmokuai'
import editbanben from './otherSet/gonggong/banben/editbanben'
import jixian from './otherSet/gonggong/jixian/index'
import addjixian from './otherSet/gonggong/jixian/addjixian'
import shitu from './otherSet/shitu/index'
import xuqiushitu from './otherSet/shitu/shitutable'
import chengyuan from './power/chengyuan'
import yonghuzu from './power/yonghuz'
import changyuanqiyong from './power/qiyongSZ'
import diedai from './setting/diedai'
import gongzuoliuEdit from './setting/gongzuoliu/edit'
import addyingyong from './setting/addyingyongPX'

import subRouter from '@/utils/settings-routers'
export default {
  name: 'Settings',
  components: {
    info,
    otherSet,
    power,
    report,
    setting,
    xuqiu,
    topNav,
    xianshi,
    chuangjianYM,
    xinzengCJ,
    ziduanSZ,
    xinzengZD,
    editZD,
    editYM,
    chakanYM,
    qiyongSZ,
    gongzuoliu,
    quexianSZ,
    qiyongSZ_QX,
    gonggong,
    mokuai,
    banben,
    addmokuai,
    editbanben,
    jixian,
    addjixian,
    shitu,
    xuqiushitu,
    chengyuan,
    yonghuzu,
    changyuanqiyong,
    diedai,
    gongzuoliuEdit,
    addyingyong

  },
  data() {
    return {
      activeComponent: 'info',
      componentInfo: {},
      realComp: ''
    }
  },
  computed: {
    subRouterItems() {
      if (this.realComp) {
        return subRouter[this.realComp] ? subRouter[this.realComp].items : []
      } else {
        return subRouter[this.activeComponent] ? subRouter[this.activeComponent].items : []
      }
    }
  },
  created() {
  },
  methods: {
    menuSelect(index) {
      console.log('index', index)
      this.activeComponent = index
    },
    navigate(route, info) {
      this.realComp = ''
      this.componentInfo = {}

      if (subRouter[route] && subRouter[route].isSameComp) {
        this.activeComponent = subRouter[route].isSameComp
        this.realComp = route
      } else {
        this.activeComponent = route
      }

      if (info) {
        this.componentInfo = { ...info }
      }

      if (subRouter[route] && subRouter[route].from) {
        this.componentInfo.from = subRouter[route].from
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    .settings-container .el-row {
        height: 100%;
    }

    .settings-container .el-row .el-col{
        height: 100%;
    }

    .settings-container .el-menu {
        height: 100%;
    }
    .hasTagsView .app-main .settings-container {
        height: calc(100vh - 50px);
        background-color: #fff;
    }
    .app-main .settings-container {
        height: calc(100vh - 50px);
    }

    .settings-container {
      min-width: 1200px;
      // overflow-x: auto;
      .el-menu-item.is-active {
        position: relative;
        background: #fff;
        font-weight: bold;
      }
      .el-menu-item.is-active:after {
        content: '';
        display: block;
        width: 4px;
        height: 100%;
        position: absolute;
        left: 1px;
        top: 0;
        background-color: #3278dd;
      }
      .el-menu-item {
        height: 44px;
        line-height: 44px;
        padding: 0 20px 0 47px !important;
      }
    }
    .title-leftnav {
      margin-top: 15px;
      font-size: 14px;
      padding-left: 12px;
      height: 42px;
      line-height: 42px;
      color: #1b212e;
    }
    .el-menu {
      background: #f1f2f3;
    }
</style>
