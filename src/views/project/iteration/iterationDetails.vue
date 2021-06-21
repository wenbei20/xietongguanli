<template>
  <div class="app-container">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <el-link :underline="false" @click="goBack"><i class="el-icon-back" /> 返回</el-link>
        <el-divider direction="vertical" />
        <el-tag size="mini">iteration</el-tag>
        <span class="title" style="font-size: 16px;">V3.1</span>
        <div style="float: right;">
          <el-button plain size="small">编辑</el-button>
          <el-button  size="small" @click="planIteration" type="primary">规划迭代</el-button>
          <el-button plain size="small">工作分配</el-button>
          <el-dropdown style="margin-left: 10px;">
            <el-button plain size="small">
              更多 <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>更多操作</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div><!--/card-header-->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="never" body-style="background: #ecf0f3; height: 200px;">
            <div class="card-total">
              <div class="title">
                <i class="el-icon-date" />
                <span>08月24日 - 09月04日</span>
                <span>状态：<strong class="red">开启</strong></span>
                <el-progress :percentage="50" />
              </div>
              <el-row class="list">
                <el-col v-for="t in totalList" :key="t.name" :span="8">
                  <div class="name"><i :class="t.icon" /> {{ t.name }}</div>
                  <div class="count">{{ t.count }}<span>/</span>{{ t.total }}</div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" shadow="never">
          <el-card
            :class="cardFullScreen ? 'fullScreen' : ''"
            shadow="never"
            body-style="background: #ecf0f3; height: 200px;"
          >
            <div class="card-editor">
              <div class="title">
                <span class="name">迭代目标 <i class="el-icon-edit-outline" /></span>
                <div style="float: right; cursor: pointer;">
                  <span v-if="!cardFullScreen" @click="handleFullScreen"><i class="el-icon-full-screen" /></span>
                  <span v-else @click="handleFullScreen"><i class="el-icon-close" /></span>
                </div>
              </div>
              <div class="content" contenteditable="true">
                熟悉敏捷迭代开发
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
        <el-tab-pane
          v-for="item in tabMapOptions"
          :key="item.key"
          :label="item.label + (item.num ? ` ${item.num}` : '')"
          :name="item.key"
        >
          <keep-alive>
            <DetailsTabsPane v-if="activeName==item.key" :type="item.key" />
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import DetailsTabsPane from './components/detailsTabsPane'

export default {
  name: 'IterationDetails',
  components: {
    DetailsTabsPane
  },
  data() {
    return {
      totalList: [
        { name: '需求规模', icon: 'el-icon-date', total: 5, count: 5 },
        { name: '需求个数', icon: 'el-icon-date', total: 6, count: 4 },
        { name: '缺陷个数', icon: 'el-icon-date', total: 0, count: 0 }
      ],
      cardFullScreen: false,
      tabMapOptions: [
        { label: '需求', num: '5', key: 'xuqiu' },
        { label: '缺陷', num: '0', key: 'quexian' },
        { label: '成员任务跟踪', key: 'chengyuanrenwugenzong' },
        { label: '仪表盘', key: 'yibiaopan' },
        { label: '进度图', key: 'jindutu' }
      ],
      activeName: 'xuqiu'
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    handleFullScreen() {
      this.cardFullScreen = !this.cardFullScreen
    },
    planIteration() {
      this.$router.push({ path: '/project/iteration/planIteration' })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card{
  ::v-deep{
    .el-card__header{
      .el-tag{ margin-right: 10px;}
    }
  }
  &.fullScreen{ position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 10000; height: 100%!important;
    ::v-deep{
      .el-card__body{ height: 100%!important;}
    }
  }
}
.card-total{
  .title{ font-size: 16px; color: #656872;
    i, span, .el-progress{ display: inline-block;}
    i{ margin-right: 10px;}
    span{ margin-right: 20px;}
    .red{ color: #e33939;}
    .el-progress{ width: 30%;
      ::v-deep{
        .el-progress-bar__outer{ background-color: rgba(0, 0, 0, .1);}
      }
    }
  }
  .list{ margin-top: 30px;
    .el-col{ text-align: center;}
    .name{ font-size: 12px; color: #656872; line-height: 30px;}
    .count{ font-size: 24px; line-height: 1.5; color: #1890ff;
      span{ color: #ccc; margin: 0 3px;}
    }
  }
}
.card-editor{ height: 100%;
  .title{ color: #656872; height: 20px; line-height: 20px;}
  .content{ padding: 10px; font-size: 14px; line-height: 1.5; height: calc(100% - 20px);}
}
</style>
