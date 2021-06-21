<template>
  <div class="app-container notice-container">
    <el-row>
      <el-col :span="12">
        <h3 style="margin-top:0px;">我的工作台</h3>
      </el-col>
      <el-col :span="12" style="text-align:right;">
        <span style="color:#666;cursor:pointer">
          <i class="el-icon-setting" />
          工作台配置
        </span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <!--我的待办-->
      <el-col :span="12">
        <el-card class="box-card" :body-style="{ padding: '0', height: '448px' }">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;">我的待办</span>
            <span style="float: right;">
              <el-button type="text" size="small" style="padding: 5px 0; font-size: 14px;"><i class="el-icon-refresh-left" /></el-button>
              <el-button type="text" size="small" style="padding: 5px 0; font-size: 14px;"><i class="el-icon-more-outline" /></el-button>
            </span>
          </div>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            :cell-style="cellStyle"
            :header-cell-style="cellStyle"
            class="daiban"
          >
            <el-table-column prop="title" label="标题" min-width="280">
              <template slot-scope="scope">
                <div class="onelineCol" @click="topage(scope.row.route)">

                  <span :class="['sprite',scope.row.category]" />
                  {{ scope.row.title }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <el-tag>{{ statusMapping[scope.row.status] }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="priority" label="优先级">
              <template slot-scope="scope">
                <template v-if="scope.row.priority">
                  <span :class="['youxianTag' , scope.row.priority]">{{ scope.row.priority }}</span>

                </template>
                <template v-else>--</template>
              </template>
            </el-table-column>
            <el-table-column prop="belong" label="所属项目" />
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="tableData.length"
          />
        </el-card>
      </el-col>
      <!--我的任务-->
      <el-col :span="12">
        <el-card class="box-card" :body-style="{ padding: '0' }">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;">我的任务</span>
          </div>
          <el-calendar v-model="calendarValue" />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px;">
      <!--我的动态-->
      <el-col :span="12">
        <el-card class="box-card" :body-style="{ padding: '0', height: '448px' }">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;">我的动态</span>
            <span style="float: right;">
              <el-button type="text" size="small" style="padding: 5px 0; font-size: 14px;"><i class="el-icon-refresh-left" /></el-button>
              <el-button type="text" size="small" style="padding: 5px 0; font-size: 14px;"><i class="el-icon-more-outline" /></el-button>
            </span>
          </div>
          <div class="list">
            <div v-for="(item, index) in dongtai" :key="index" class="item">
              <h4 class="header">
                {{ item.title }}
                <span>{{ item.updateTime }}</span>
                <span style="float: right;">{{ item.belong }}</span>
              </h4>
              <div class="descrip">
                <el-tag size="mini">item</el-tag>
                {{ item.descrip }}
              </div>
            </div>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="tableData.length"
          />
        </el-card>
      </el-col>
      <!--我的关注-->
      <el-col :span="12">
        <el-card class="box-card" :body-style="{ padding: '0', height: '448px' }">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;">我的关注</span>
            <span style="float: right;">
              已选：
              <el-dropdown>
                <span class="el-dropdown-link">
                  需求 <i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>需求</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button type="text" size="small" style="padding: 5px 0; font-size: 14px; margin-left:20px;"><i class="el-icon-refresh-left" /></el-button>
              <el-button type="text" size="small" style="padding: 5px 0; font-size: 14px;"><i class="el-icon-more-outline" /></el-button>
            </span>
          </div>
          <el-table
            :data="follow"
            stripe
            style="width: 100%"
            :cell-style="cellStyle"
            :header-cell-style="cellStyle"
            class="daiban"
          >
            <el-table-column width="60">
              <template slot-scope="scope">
                <span style="color: #e6a23c">
                  <i v-if="scope.row.collect" class="el-icon-star-off" />
                  <i v-else class="el-icon-star-off" />
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="title" label="标题">
              <template slot-scope="scope">
                <div class="onelineCol">

                  <span :class="['sprite',scope.row.category]" />
                  {{ scope.row.title }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="followDate" label="关注时间" />
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <el-tag>{{ statusMapping[scope.row.status] }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="priority" label="优先级">
              <template slot-scope="scope">
                <template v-if="scope.row.priority">
                  <span :class="['youxianTag' , scope.row.priority]">{{ scope.row.priority }}</span>

                </template>
                <template v-else>--</template>

              </template>
            </el-table-column>
            <el-table-column prop="dealUser" label="处理人" />
            <el-table-column prop="createUser" label="创建人" />
            <el-table-column prop="iteration" label="迭代" />
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="tableData.length"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'AdminSystemCenter',
  data() {
    return {
      tableData: [
        { category: 'STORY', title: '巡检地图对瓦片格式多层级支持', status: '2', priority: 'Middle', belong: '巡检管理软件V3.0_P19010', route: 'AdminNeeds' },
        { category: 'BUG', title: '蓝星星火-巡检app-终端已提交数据，在任务一览界面显示未提交', status: '2', priority: 'Middle', belong: '产品需求池', route: 'AdminDefect' },
        { category: 'BUG', title: '【蓝星星火巡检后台】基础信息的巡检终端设置选择车间级删除终端编码成功后仍然保留', status: '2', priority: null, belong: '产品需求池', route: 'AdminDefect' },
        { category: 'STORY', title: '九江石化服务器漏洞扫描以及漏洞修复', status: '1', priority: 'High', belong: '产品需求池', route: 'AdminNeeds' },
        { category: 'STORY', title: '零一众方案集成', status: '1', priority: '', belong: '产品需求池', route: 'AdminNeeds' },
        { category: 'TASK', title: '配置库备份恢复机制制定', status: '3', priority: '', belong: '测试部日常管理_TD19001', route: 'AdminMission' }

      ],
      statusMapping: {
        '1': '接受/处理',
        '2': '实现中',
        '3': '规划中'
      },
      calendarValue: new Date(),
      dongtai: [
        { title: '新建了 【任务】', updateTime: '2小时前', belong: '巡检管理软件V3.0_P19010', descrip: '修改榆林化学技术方案' },
        { title: '编辑了 【需求】', updateTime: '13小时前', belong: '巡检管理软件V3.0_P19010', descrip: '终端软件更新web端开发' },
        { title: '编辑了 【需求】', updateTime: '14小时前', belong: '巡检管理软件V3.0_P19010', descrip: '版本号' },
        { title: '编辑了 【需求】', updateTime: '14小时前', belong: '巡检管理软件V3.0_P19010', descrip: '更新日志' },
        { title: '新建了 【任务】', updateTime: '2020-10-16 11:20', belong: '巡检管理软件V3.0_P19010', descrip: '根据开会结果的反馈重新整理菜单整合页' }
      ],
      follow: [
        { collect: false, id: '1018723', category: 'STORY', title: '按照部门统计巡检漏检结果', followDate: '2020-10-11', status: '1', priority: 'High', dealUser: '赵鹏翔;刘彩萍', createUser: '赵鹏翔', iteration: 'V3.2' },
        { collect: false, id: '1003470', category: 'STORY', title: '终端软件更新web端开发', followDate: '2020-09-30', status: '2', priority: 'High', dealUser: '刘峰', createUser: '刘峰', iteration: '--' },
        { collect: false, id: '1003031', category: 'STORY', title: '系统管理', followDate: '2020-09-27', status: '1', priority: 'High', dealUser: '安喜喜', createUser: '安喜喜', iteration: '--' },
        { collect: false, id: '1002704', category: 'STORY', title: '调试同步巡检任务数据接口', followDate: '2020-09-25', status: '3', priority: 'Middle', dealUser: '代海涛', createUser: '代海涛', iteration: '--' },
        { collect: false, id: '1003026', category: 'STORY', title: '调试下载临时任务接口', followDate: '2020-09-15', status: '2', priority: 'Middle', dealUser: '代海涛', createUser: '代海涛', iteration: 'V3.2' },
        { collect: false, id: '1002733', category: 'STORY', title: '优化视频视频录制播放功能', followDate: '2020-09-06', status: '1', priority: 'Middle', dealUser: '代海涛', createUser: '代海涛', iteration: '--' }
      ]
    }
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (!columnIndex) {
        return { 'padding-left': '20px' }
      }
    },
    topage(e) {
      this.$router.push({ name: e })
    }
  }
}
</script>

<style lang="scss" scoped>
.notice-container {
  padding-bottom: 20px;
  height: auto;
}
.el-pagination{ padding: 10px 5px; text-align: right;}
.el-calendar{
  ::v-deep{
    .el-calendar-day{ height: 50px;}
  }
}
.list{ padding: 5px 20px;
  .item{
    & + .item{ margin-top: 20px;}
    .header{ font-size: 14px; margin: 15px 0;
      span{ font-size: 12px; color: #ccc; font-weight: 400;}
    }
    .descrip{ padding-left: 20px;}
  }
}
.daiban .sprite {
  display: inline-block;
  width: 28px;
  height: 12px;
  background: url('~@/assets/setting/storysprite.png') no-repeat;
  &.STORY{
    background-position: -33px -56px;

  }
  &.BUG {
    width: 20px;
    background-position: 0px -76px;
  }
  &.TASK{
    background-position: -85px -19px;

  }
}
.onelineCol {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}
.youxianTag {
  display: inline-block;
    height: 20px;
    padding: 0 10px;
    line-height: 20px;
    color:#fff;
    border-radius: 2px;
    font-size: 12px;
    cursor: pointer;
    background-color: #f85e5e;

    &.Low {
      background-color: #97afd0;
    }
    &.Nice {
      background-color: #97afd0;
    }
    &.High {
      background-color: #f85e5e;
    }
    &.Middle {
      background-color: #93c36b;
    }
}
</style>
