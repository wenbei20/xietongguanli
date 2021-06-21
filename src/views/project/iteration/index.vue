<template>
  <div class="app-container">
    <div class="iteration">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card shadow="never" class="navs">
            <div slot="header" class="clearfix">
              <el-button size="small" @click="createIteration" type="primary"><i class="el-icon-plus"  /> 创建迭代</el-button>
              <span style="float: right;">
                <el-button type="text" style="padding: 8px 0;"><i class="el-icon-share" /></el-button>
                <el-button type="text" style="padding: 8px 0;"><i class="el-icon-finished" /></el-button>
              </span>
            </div>
            <!--card-body-->
            <el-card shadow="never" v-for="item in navs" :key="item.id" :body-style="{ padding: '10px' }" style="margin-bottom:20px;">
              <div  class="nav-item">
                <el-avatar shape="square" :src="item.imgsrc" />
                <div class="content">
                  <div class="title">{{ item.title }}</div>
                  <div class="info">
                    <el-progress :percentage="item.progress" />
                    <span class="details" @click="iterationDetails">详情 <i class="el-icon-arrow-right" /></span>
                  </div>
                </div>
              </div>
            </el-card>
            <!--/card-body-->
          </el-card>
        </el-col>
        <el-col :span="18">
          <div class="main-box">
            <!--top-bar-->
            <el-card class="top-bar" shadow="never" :body-style="{ padding: '10px' }">
              <el-avatar shape="square" size="small" :src="defaultIcon" />
              <h4 class="title">V3.1</h4>
              <span class="descrip">2020-08-24 ~ 2020-9-20</span>
              <div style="float: right;">
              </div>
            </el-card>
            <!--top-bar-->
            <div class="tools-bar">
              <el-button type="primary" size="small" @click="$router.push({name:'xuqiuAdd'})" ><i class="el-icon-plus" /> 创建需求</el-button>
              <el-radio-group v-model="categoryActive" size="small">
                <el-radio-button v-for="radio in category" :key="radio.key" :label="radio.key">{{ radio.name }}</el-radio-button>
              </el-radio-group>
              <el-dropdown>
                <span class="el-dropdown-link">
                  按创建时间排序 <i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>按创建时间排序</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <!--board-container-->
            <div class="board-container diedai">
              <KanbanLevel :key="1" :list="kanbanData" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <NewIteration :visible-sync.sync="newIterationVisible" />
  </div>
</template>

<script>
import defaultIcon from '@/assets/icon/project-grey.png'
import KanbanLevel from '@/components/Kanban/index_level'
import NewIteration from './newIteration'

export default {
  name: 'Iteration',
  components: {
    KanbanLevel,
    NewIteration
  },
  data() {
    return {
      defaultIcon,
      navs: [
        {
          id: 's8a9sx98as89xas8x989a', title: 'V3.1', progress: 50,
          imgsrc: require('@/assets/icon/file.png')
        },
        {
          id: 's8a9sx98as89xas8x989a1', title: 'V3.0', progress: 50,
          imgsrc: require('@/assets/icon/file.png')
        },
        {
          id: 's8a9sx98as89xas8x989a2', title: 'V2.9', progress: 50,
          imgsrc: require('@/assets/icon/file.png')
        },
        {
          id: 's8a9sx98as89xas8x989a3', title: 'V2.8', progress: 50,
          imgsrc: require('@/assets/icon/file.png')
        },
        {
          id: 's8a9sx98as89xas8x989a4', title: 'V2.7', progress: 50,
          imgsrc: require('@/assets/icon/file.png')
        }
      ],
      navActive: null,
      category: [{ name: '需求', key: 'xuqiu' }, { name: '缺陷', key: 'quexian' }],
      categoryActive: 'xuqiu',
      list1: [
        { name: 'Mission', id: 1 },
        { name: 'Mission', id: 2 },
        { name: 'Mission', id: 3 },
        { name: 'Mission', id: 4 }
      ],
      kanbanData: [
        { name: '规划中', id: 1111,
          children: [
            { name: '父需求：标题内容', descrip: '设备管理-纽扣管理/设备信息管理...', count: 5, type: 'new', checked: false, id: 1 },
            { name: '新需求：接下来的规划', descrip: '巡检任务-查看-导出...', count: 4, type: 'new', time: '2020-08-20 ~ 2020-09-24', checked: false, id: 2 },
         { name: '新需求：接下来的规划', descrip: '报表管理-漏检统计...', count: 4, type: 'new', time: '2020-08-20 ~ 2020-09-24', checked: false, id: 2 },
         { name: '新需求：接下来的规划', descrip: '点击环形图会出现...', count: 4, type: 'new', time: '2020-08-20 ~ 2020-09-24', checked: false, id: 2 }

         ]
        },
        { name: '实现中', id: 2222,
          children: [
            { name: '父需求：标题内容', descrip: '隐患与异常管理——异常管理...', count: 5, type: 'bug', checked: false, id: 1 },
            { name: '父需求：标题内容', descrip: '全局参数配置-系统管理...', count: 5, type: 'bug', checked: false, id: 1 },
            { name: '父需求：标题内容', descrip: '背景图片上传以后..', count: 5, type: 'bug', checked: false, id: 1 },
            { name: '父需求：标题内容', descrip: '通知栏有提示，但是消息列表数据没有实时更新...', count: 5, type: 'bug', checked: false, id: 1 }

          ]
        },
        { name: '已完成', id: 3333,
          children: [
            { name: '父需求：标题内容', descrip: '人员管理：导入人员，角色没有显示...', count: 5, type: 'finish', checked: false, id: 1 },
            { name: '新需求：接下来的规划', descrip: '【界面】巡检管理', count: 4, type: 'finish', time: '2020-08-20 ~ 2020-09-24', checked: false, id: 2 }
          ]
        },
        { name: '已拒绝', id: 4444,
          children: [
            { name: '父需求：标题内容', descrip: '【界面】基础信息管理——人员管理：角色那一列..', count: 5, type: 'abandon', checked: false, id: 1 }
          ]
        }
      ],
      newIterationVisible: false
    }
  },
  methods: {
    createIteration() {
      console.log('创建新的迭代')
      this.newIterationVisible = true
    },
    iterationDetails() {
      console.log('详情')
      // this.$router.push(`/project/iteration/123`)
      this.$router.push({ path: '/project/iteration/details/123' })
    }
  }
}
</script>

<style lang="scss" scoped>
.iteration{ width: 100%;
  &, .el-row, .el-col{ height: 100%;}
  .navs{ height: 100%;
    ::v-deep{
      .el-card__header{ padding: 10px 20px;}
    }
    .nav-item{ width: 100%; cursor: pointer; display: flex; justify-content: flex-start; flex-wrap: nowrap;
      &.active{ background: #dfeafd; border-color: #b2c8ee;}
      .el-avatar{ margin-right: 10px; width: 50px; height: 50px;}
      .content{ flex: 1;
        .title{ font-size: 12px; line-height: 30px; height: 30px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
        .info{
          .el-progress{ width: calc(100% - 50px); display: inline-block; vertical-align: top;
            ::v-deep{
              .el-progress__text{ font-size: 12px!important; color: #999; float: left; margin: 1px 10px 0 0;}
            }
          }
          .details{ float: right; position: relative; z-index: 10;}
        }
      }
    }
  }
  .main-box{ width:100%; height: 100%;
    .top-bar{ height: 50px; margin-bottom: 10px;
      .el-avatar{ vertical-align: middle;}
      .title{ vertical-align: middle; display: inline-block; margin: 0 20px 0 10px; font-size: 16px;}
      .descrip{ vertical-align: middle; display: inline-block; font-size: 12px; color: #999;}
    }
    .tools-bar{ height: 30px; margin-bottom: 10px;
      .el-button{ vertical-align: middle;}
      .el-radio-group{ margin-left: 20px;
        .el-radio-button{
          ::v-deep{
            .el-radio-button__inner{ background-color: #f5f5f5; color: #999;}
          }
          &.is-active{
            ::v-deep{
              .el-radio-button__inner{ background-color: #fff; color: #333; border-color: #DCDFE6; box-shadow: none;}
            }
          }
        }
      }
      .el-dropdown{ margin-left: 20px; margin-top: 7px; vertical-align: top;}
    }
    .board-container{ height: calc(100% - 60px - 40px); overflow-x: auto; overflow-y: hidden;}
  }
}
</style>
