<template>
  <div class="XQ_and_QX gray editxuqiu">
    <div class="editcontainer">

      <div class="header">
        <el-link :underline="false" @click="goBack"><i class="el-icon-back" /> 返回</el-link>
        <el-divider direction="vertical" />
        <span>【ID1003470】终端软件更新web端开发</span>
        <i class="el-icon-star-off" :class="{'starPro':starPro}" @click="starPro = !starPro" />
        <div class="select">
          <!-- <el-button size="mini" style="color:#fff;" type="primary" @click="$router.push({name:'xuqiuAdd'})">编辑</el-button> -->

          <el-dropdown trigger="click">

            <el-button size="mini">
              更多
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>

            <el-dropdown-menu slot="dropdown" class="editdropdown">
              <el-dropdown-item>删除</el-dropdown-item>
              <el-dropdown-item>移动</el-dropdown-item>
              <el-dropdown-item class="line">复制</el-dropdown-item>
              <el-dropdown-item>创建子需求</el-dropdown-item>
              <el-dropdown-item>关联需求</el-dropdown-item>
              <el-dropdown-item>创建缺陷</el-dropdown-item>
              <el-dropdown-item>打印缺陷</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <div class="link">
            <i class="el-icon-link" />
            <div class="drapdown_menu">
              <div>复制标题与链接</div>
            </div>
          </div>

        </div>
      </div>

      <div class="editouter">
        <el-row>
          <el-col :span="18" class="left" style="padding-bottom:20px;">
            <el-tabs v-model="activeName" @tab-click="tabClick">
              <el-tab-pane label="详细信息" name="first">

                <div class="maininfo">
                  <p>需求来源：生产经营部覃水科长
现状：打点的时候，若小于三分钟，终端会提示与上一个巡检点不足三分钟，但可以点击「继续」巡检该巡检点。也可以点击取消等到达三分钟再巡检。
客户要求达到：当该点距离上一个巡检点不足三分钟，终端无法进入下一个巡检点内容，无法打点。</p>
                </div>
              </el-tab-pane>
              <el-tab-pane name="second">
                <div slot="label">
                  子需求 {{ xiangxinum }}
                </div>

                <div class="sonheader">
                  <div style="overflow:hidden;margin-bottom:10px;max-height:18px">

                    <span class="add">
                      <i class="el-icon-plus" />
                      快速添加子需求
                    </span>
                    <div class="right">
                      <span>查看状态树</span>
                      <i class="el-icon-setting" />
                    </div>
                  </div>

                  <vxe-table
                    ref="xTree"
                    highlight-hover-row
                    :auto-resize="true"
                    auto-resize
                    border="none"
                    class="vxetable"
                    :edit-config="{trigger: 'click', mode: 'cell',showIcon:false}"
                    :data="tableData"
                  >
                    <vxe-table-column field="eventID" title="ID" />
                    <vxe-table-column field="title" title="标题">

                      <template #default="{ row }">
                        <span class="titleText">{{ row.title }}</span>
                      </template>

                    </vxe-table-column>
                    <vxe-table-column field="diedai" title="迭代">
                      <template #default="{ row }">
                        <b>{{ row.diedai }}</b>
                      </template>

                    </vxe-table-column>
                    <vxe-table-column field="youxian" title="优先级" :edit-render="{}">

                      <template #default="{ row }">
                        <span>{{ row.youxian }}</span>
                      </template>

                      <template slot="edit" slot-scope="scope">
                        <span>{{ scope.row.youxian }}</span>
                        <div class="edityouxian">
                          <ul>
                            <li class="empty">--空--</li>
                            <li class="high">High</li>
                            <li class="middle">Middle</li>
                            <li class="low">Low</li>
                            <li class="nice">Nice to Have</li>
                          </ul>
                        </div>
                      </template>

                    </vxe-table-column>

                    <vxe-table-column field="status" title="状态">
                      <template #default="{ row }">
                        <b>{{ row.status }}</b>
                      </template>

                    </vxe-table-column>

                    <vxe-table-column field="person" title="处理人" :edit-render="{}">
                      <template #default="{ row }">
                        {{ row.person ? row.person : '--' }}
                      </template>

                      <template slot="edit" slot-scope="scope">
                        <!-- <span>{{scope.row.youxian}}</span>
                                                            <div class="edityouxian">
                                                                <ul>
                                                                    <li class="empty">--空--</li>
                                                                    <li class="high">High</li>
                                                                    <li class="middle">Middle</li>
                                                                    <li class="low">Low</li>
                                                                    <li class="nice">Nice to Have</li>
                                                                </ul>
                                                            </div> -->
                        <el-input v-model="scope.row.person" size="mini" />
                      </template>

                    </vxe-table-column>

                    <vxe-table-column field="startTime" title="预计开始" :edit-render="{}">
                      <template #default="{ row }">
                        {{ row.startTime ? row.startTime : '--' }}
                      </template>

                      <template slot="edit" slot-scope="scope">

                        <el-date-picker
                          v-model="scope.row.startTime"
                          :clearable="false"
                          type="date"
                          placeholder="选择日期"
                        />
                      </template>

                    </vxe-table-column>

                    <vxe-table-column field="endTime" title="预计结束" :edit-render="{}">
                      <template #default="{ row }">
                        {{ row.endTime ? row.endTime : '--' }}
                      </template>

                      <template slot="edit" slot-scope="scope">

                        <el-date-picker
                          v-model="scope.row.endTime"
                          :clearable="false"
                          type="date"
                          placeholder="选择日期"
                        />
                      </template>

                    </vxe-table-column>

                  </vxe-table>

                </div>

              </el-tab-pane>
              <el-tab-pane name="third">
                <div slot="label">
                  变更历史 {{ biangengnum }}
                </div>

                <el-table
                  :data="lishiData"
                  class="lishiTable"
                  stripe
                  style="width: 100%"
                >
                  <el-table-column
                    prop="no"
                    label="序号"
                    width="60"
                  />
                  <el-table-column
                    prop="changeTime"
                    label="变更时间"
                    width="180"
                  />
                  <el-table-column
                    prop="person"
                    label="变更人"
                  />
                  <el-table-column
                    prop="status"
                    label="变更类型"
                  />
                  <el-table-column
                    prop="ziduan"
                    label="变更字段"
                  />
                  <el-table-column
                    prop="before"
                    label="变更前"
                  />
                  <el-table-column
                    prop="after"
                    label="变更后"
                  />
                </el-table>

              </el-tab-pane>
              <el-tab-pane name="fourth">
                <div slot="label">
                  缺陷 {{ biangengnum }}
                </div>
                <el-table
                  :data="lishiData"
                  class="lishiTable"
                  stripe
                  style="width: 100%"
                >
                  <el-table-column
                    prop="no"
                    label="标题"
                    width="260"
                  />
                  <el-table-column
                    prop="changeTime"
                    label="优先级"
                    width="180"
                  />
                  <el-table-column
                    prop="person"
                    label="严重程度"
                  />
                  <el-table-column
                    prop="status"
                    label="状态"
                  />
                  <el-table-column
                    prop="ziduan"
                    label="处理人"
                  />
                  <el-table-column
                    prop="before"
                    label="创建人"
                  />
                  <el-table-column
                    prop="after"
                    label="操作"
                  />
                </el-table>
              </el-tab-pane>

              <el-tab-pane name="seven">
                <div slot="label">
                  关联任务2
                </div>
                <el-table
                  :data="missionList"
                  class="lishiTable"
                  stripe
                  style="width: 100%"
                >
                  <el-table-column
                    prop="id"
                    label="ID"
                    width="60"
                  />
                  <el-table-column
                    prop="title"
                    label="标题"
                    width="280"
                  />
                  <el-table-column
                    prop="xuqiu"
                    label="需求"
                  />
                  <el-table-column
                    prop="diedai"
                    label="迭代"
                  />
                  <el-table-column
                    prop="status"
                    label="状态"
                  />
                  <el-table-column
                    prop="gongshi"
                    label="预计工时"
                  />
                  <el-table-column
                    prop="person"
                    label="创建人"
                  />
                  <el-table-column
                    prop="startTime"
                    label="预计开始"
                  />
                  <el-table-column
                    prop="endTime"
                    label="预计结束"
                  />
                </el-table>
              </el-tab-pane>
              <el-tab-pane name="five">
                <div slot="label">
                  测试用例 {{ xiangxinum }}
                </div>

                <div class="sonheader">
                  <div style="overflow:hidden;margin-bottom:10px;max-height:18px">

                    <span class="add">
                      <i class="el-icon-plus" />
                      快速添加用例
                    </span>

                    <span class="add" @click="showXuqiuDialog = true" style="margin-left:8px;">
                      <i class="el-icon-search" />
                      关联用例
                    </span>
                    
                  </div>

                  <vxe-table
                    ref="xTree"
                    highlight-hover-row
                    :auto-resize="true"
                    auto-resize
                    border="none"
                    class="vxetable"
                    :edit-config="{trigger: 'click', mode: 'cell',showIcon:false}"
                    :data="tableData"
                  >
                    <vxe-table-column field="eventID" title="ID" />
                    <vxe-table-column field="title" title="标题">

                      <template #default="{ row }">
                        <span class="titleText">{{ row.title }}</span>
                      </template>

                    </vxe-table-column>
                    <vxe-table-column field="diedai" title="迭代">
                      <template #default="{ row }">
                        <b>{{ row.diedai }}</b>
                      </template>

                    </vxe-table-column>
                    <vxe-table-column field="youxian" title="优先级" :edit-render="{}">

                      <template #default="{ row }">
                        <span>{{ row.youxian }}</span>
                      </template>

                      <template slot="edit" slot-scope="scope">
                        <span>{{ scope.row.youxian }}</span>
                        <div class="edityouxian">
                          <ul>
                            <li class="empty">--空--</li>
                            <li class="high">High</li>
                            <li class="middle">Middle</li>
                            <li class="low">Low</li>
                            <li class="nice">Nice to Have</li>
                          </ul>
                        </div>
                      </template>

                    </vxe-table-column>

                    <vxe-table-column field="status" title="状态">
                      <template #default="{ row }">
                        <b>{{ row.status }}</b>
                      </template>

                    </vxe-table-column>

                    <vxe-table-column field="person" title="处理人" :edit-render="{}">
                      <template #default="{ row }">
                        {{ row.person ? row.person : '--' }}
                      </template>

                      <template slot="edit" slot-scope="scope">
                        <!-- <span>{{scope.row.youxian}}</span>
                                                            <div class="edityouxian">
                                                                <ul>
                                                                    <li class="empty">--空--</li>
                                                                    <li class="high">High</li>
                                                                    <li class="middle">Middle</li>
                                                                    <li class="low">Low</li>
                                                                    <li class="nice">Nice to Have</li>
                                                                </ul>
                                                            </div> -->
                        <el-input v-model="scope.row.person" size="mini" />
                      </template>

                    </vxe-table-column>

                    <vxe-table-column field="startTime" title="预计开始" :edit-render="{}">
                      <template #default="{ row }">
                        {{ row.startTime ? row.startTime : '--' }}
                      </template>

                      <template slot="edit" slot-scope="scope">

                        <el-date-picker
                          v-model="scope.row.startTime"
                          :clearable="false"
                          type="date"
                          placeholder="选择日期"
                        />
                      </template>

                    </vxe-table-column>

                    <vxe-table-column field="endTime" title="预计结束" :edit-render="{}">
                      <template #default="{ row }">
                        {{ row.endTime ? row.endTime : '--' }}
                      </template>

                      <template slot="edit" slot-scope="scope">

                        <el-date-picker
                          v-model="scope.row.endTime"
                          :clearable="false"
                          type="date"
                          placeholder="选择日期"
                        />
                      </template>

                    </vxe-table-column>

                  </vxe-table>

                </div>

              </el-tab-pane>

              <el-tab-pane name="111">
                <div slot="label">
                  <i class="el-icon-setting" />
                  显示设置
                </div>
              </el-tab-pane>
            </el-tabs>

            <div class="fujian">

              <div class="btn">
                <span class="tit">附件</span>
                <span class="add Link_disabled_click">
                  <i class="el-icon-plus" />
                  添加
                </span>
              </div>
            </div>

            <div class="fujian">

              <div class="btn">
                <span class="tit">评论</span>
                <span class="add Link_disabled_click">
                  <i class="el-icon-plus" />
                  添加
                </span>
              </div>
            </div>

            <div class="next">
              <div class="next_tit">下一状态</div>
              <div class="next_cnt">
                <span  :class="{'active':xiayizhuangtai === 1}" @click="changeStatus(1)">
                  <i class="el-icon-success" />
                  保持为已实现</span>
                <span  :class="{'active':xiayizhuangtai === 2}" @click="changeStatus(2)">
                  <i class="el-icon-success" />
                  规划中</span>

                

                <div class="outer">
                  <div>
                    <span>处理人</span>
                    <el-dropdown trigger="click" placement="bottom-start" class="Common_select">
                      <span class="el-dropdown-link bgf">
                        {{ selectedJoinGroup }}<i class="el-icon-arrow-down el-icon--right" />
                      </span>

                      <el-dropdown-menu slot="dropdown" class="com_dropdownmenu">
                        <div class="Common_select_Search">
                          <el-input
                            v-model="searchtext"
                            prefix-icon="el-icon-search"
                            size="small"
                          /></div>
                        <el-checkbox-group v-model="searchgroup">
                          <el-checkbox label="成员1" />
                          <el-checkbox label="成员2" />
                          <el-checkbox label="成员3" />
                          <el-checkbox label="成员4" />
                        </el-checkbox-group>
                      </el-dropdown-menu>
                    </el-dropdown>
                   
                  </div>
                  <div>
                    <span>评论</span>
                    <el-input v-model="comment" style="width:605px" />
                  </div>
                </div>
              </div>
            </div>

            <div class="liuzhuanbtn">
              <el-button type="primary" @click="$router.push({name:'AdminNeeds'})">保存</el-button>
            </div>

          </el-col>
          <el-col :span="6" class="right">
            <div  class="xuqiuform">
              <div class="xuqiuform_tit">基本信息

                <!-- <span class="el-icon-setting" /> -->
              </div>

              <div class="item">
                <span>状态</span>
                <div>
                  <i class="zhuangtai">已实现</i>
                </div>
              </div>
              <div class="item">
                <span>父需求</span>
                <div>
                  --
                </div>
              </div>
              <div class="item">
                <span>需求分类</span>
                <div>
                  未分类
                </div>
              </div>
              <div class="item">
                <span>迭代</span>
                <div>
                  --
                </div>
              </div>
              <div class="item">
                <span>优先级</span>
                <div>
                  <span class="yxj">High</span>
                </div>
              </div>
              <div class="item">
                <span>处理人</span>
                <div>
                  刘峰
                </div>
              </div>
              <div class="item">
                <span>模块</span>
                <div>
                  --
                </div>
              </div>
              <div class="item">
                <span>预计开始</span>
                <div>
                  2019-03-04

                </div>
              </div>
              <div class="item">
                <span>预计结束</span>
                <div>
                  2019-03-06
                </div>
              </div>
              <div class="item">
                <span>创建人</span>
                <div>
                  刘峰
                </div>
              </div>
              <div class="item">
                <span>创建时间</span>
                <div>
                  2019-02-26 18:29:11
                </div>
              </div>
              <div class="item">
                <span>完成时间</span>
                <div>
                  2019-02-28 16:40:44
                </div>
              </div>
              <div class="item">
                <span>预估工时</span>
                <div>
                  2小时
                </div>
              </div>
              <div class="item">
                <span>完成工时</span>
                <div>
                  0人时
                </div>
              </div>
              <div class="item">
                <span>剩余工时</span>
                <div>
                  0人时
                </div>
              </div>
              <div class="item">
                <span>超出工时</span>
                <div>
                  -2人时
                </div>
              </div>
              
              

            </div>
            
          </el-col>
        </el-row>
      </div>

      <!-- <div class="editbtns">
                    <el-button type="primary">提交</el-button>
                    <el-button >保存草稿</el-button>
                    <el-button >取消</el-button>
            </div> -->

    </div>
    <viewSetting :dialog-visible.sync="showSettingDialog" />
    <xuqiuDialog :dialog-visible.sync="showXuqiuDialog" />
  </div>
</template>
<script>
// import Tinymce from '@/components/Tinymce'
import xuqiuDialog from './components/xuqiuDialog'
import viewSetting from './components/viewSetting'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0
}

export default {
  components: { /* Tinymce, */ viewSetting  , xuqiuDialog},
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      options: '1',
      title: '',
      notitle: true,
      diedai: '1',
      youxian: '1',
      person: '',
      startTime: '',
      endTime: '',
      showSelectDialog: false,
      starPro: false,
      activeName: 'first',
      xiangxinum: 2,
      biangengnum: 5,
      chuliren: '',
      comment: '',
      developer: '',
      xiayizhuangtai: 1,
      showXuqiuDialog:false,
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          title: '更新日志',
          checked: false,
          eventID: '1003479',
          youxian: 'high',
          diedai: '--',
          status: '规划中',
          person: '刘峰',
          startTime: '2019-03-05',
          endTime: '2019-03-06'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          title: '版本号',
          checked: false,
          eventID: '1003471',
          youxian: 'high',
          diedai: '--',
          status: '已拒绝',
          person: '刘峰',
          startTime: '2019-03-04',
          endTime: '2019-03-05'
        }
      ],

      lishiData: [
        { no: '1', changeTime: '2019-02-26 18:44:03', person: '刘峰', status: '手动变更', ziduan: '预计结束', before: '--', after: '2019-03-06' },
        { no: '2', changeTime: '2019-02-26 18:44:00', person: '刘峰', status: '手动变更', ziduan: '预计开始', before: '--', after: '2019-03-04' },
        { no: '3', changeTime: '2019-02-26 18:40:15', person: '刘峰', status: '手动变更', ziduan: '优先级', before: '--', after: 'High' },
        { no: '4', changeTime: '2019-02-26 18:39:56', person: '刘峰', status: '手动变更', ziduan: '处理人', before: '--', after: 'u5218u5cf0;' },
        { no: '5', changeTime: '2019-02-26 18:29:40', person: '刘峰', status: '手动变更', ziduan: '迭代', before: '服务端', after: '--' }
      ],
      baseInfo: {

      },
      showSettingDialog: false,
      isQueXian: false,
      searchgroup:[],
      searchtext:'',
      missionList:[
        {
          id: 1,
          xuqiu: '--',
          date: '2016-05-02',
          name: '王小虎',
          title: '根据开会结果的反馈重新整理菜单整合页',
          checked: false,
          eventID: '1018946',
          youxian: 'High',
          diedai: '--',
          status: '已完成',
          person: '张笑笑',
          startTime: '2020-10-16',
          gongshi: '2',
          endTime: '2020-10-16'
        },
        {
          id: 2,
          xuqiu: '--',
          date: '2016-05-04',
          name: '王小虎',
          title: '修改菜单整合页面以及做演示交互效果',
          checked: false,
          eventID: '1018941',
          youxian: 'Low',
          diedai: '--',
          status: '已完成',
          person: '张笑笑',
          startTime: '2020-10-14',
          gongshi: '16',
          endTime: '2020-10-15'
        },
      ]


    }
  },
  created() {
    if (this.$route.query && this.$route.query.from === 'quexian') {
      this.isQueXian = true
    }
  },
  computed:{
    selectedJoinGroup(){
      return this.searchgroup.join(';')
    }
  },
  methods: {
    changechaxun() {

    },
    goBack(){
      this.$router.go(-1)
    },
    tabClick(e) {
      if (e.index === '6') {
        this.showSettingDialog = true
      }
    },
    changeStatus(e){
      this.xiayizhuangtai = e
    }
  }
}
</script>
<style lang="scss" scoped >
.XQ_and_QX {
    .header {
        .el-icon-star-off {
            font-size: 24px;
            margin-left: 30px;
            vertical-align: top;
            cursor: pointer;
        }

        .starPro {
            color: #3582fb;
        }

        height: 65px;
        .el-button {
            width: 80px;
            border-radius: 2px;
            height: 30px;
            border-color: #d7e6fe;
            color: #3582fb;
        }
        .select > .el-button {
            margin-right: 14px;
        }
        .el-dropdown {
            position: relative;
            top:-1px;
        }
        .link {
            display: inline-block;
            font-size: 16px;
            padding-left: 12px;
            margin-left: 5px;
            border-left:1px solid #d7e6fe ;
            position: relative;
            .drapdown_menu {
                left: -100px;
                top: 20px;
                display: none;
            }
        }
        .link:hover {
            .drapdown_menu {
                display: block;
            }
        }

    }

    .maininfo {
        height: 200px;
        position: relative;
        padding: 10px 10px 8px 10px;
        p {
            font-size: 14px;
            color:#000000;
        }
    }
    .editouter {
        border-bottom: none;
        .left {
            height: 100%;
            .el-tabs {
                padding-bottom: 20px;
                border-bottom: 1px solid #d7e6fe;
                min-height: 200px;
            }

            .add  {
              cursor: pointer;
            }

            .fujian {
                    padding: 20px 0;
                    .title {
                        font-size: 14px;
                        color: #3f4a56;
                        line-height: 22px;
                        margin-bottom: 20px;
                    }
                    .btn {
                        .tit {
                            color: #8091a5;
                            display: inline-block;
                            margin-right: 30px;
                            font-size: 14px;
                        }
                        .add {
                            color: #3582fb;
                            display: inline-block;
                            font-size: 13px;
                            cursor: pointer;
                            i{
                                font-weight: bold;
                            }

                        }

                    }
                }
            .next {
                .next_tit {
                    height: 16px;
                    line-height: 16px;
                    font-size: 16px;
                    padding: 20px 0 15px 0;
                    box-sizing: content-box;
                }
                .next_cnt {
                    padding:  0 20px;
                    > span {
                        display: inline-block;
                        height: 28px;
                        line-height: 28px;
                        padding:  0 10px;
                        border-radius: 14px;
                        border: 1px solid #b0bac5;
                        cursor: pointer;
                        text-align: center;
                        margin-right: 10px;
                        position: relative;
                        i {
                            display: none;
                            position: absolute;
                            right: -7px;
                            top: -8px;
                            font-size: 16px;
                        }
                    }
                    .active {
                        border-color: #3582fb;
                        color: #3582fb;
                        i {
                            display: block;
                        }
                    }

                    .outer {
                        background-color: #f8f8f8;
                        padding: 15px 20px;
                        margin-top: 20px;
                        .el-input {
                            margin: 0;
                        }
                        >div {
                            padding-left: 120px;
                            margin-bottom: 16px;
                            position: relative;
                            >span {
                                display: block;
                                position: absolute;
                                left: 0px;
                                top: 8px;
                            }
                            .developer {
                              display: inline-block;
                              margin-left: 109px;
                              >span {
                                margin-right: 16px;
                              }
                            }
                        }
                    }

                }
            }
            .liuzhuanbtn {
                margin-top: 20px;
                padding-left: 20px;
            }

        }
        .sonheader {
            .add {
                color: #999999;
                .el-icon-plus {
                    margin-right: 12px;
                }
            }
            .right{
                float: right;
                color: #8091a5;
                span {
                    color: #8091a5;
                    font-size: 13px;
                }
                i {
                    font-size: 16px;
                    margin-left: 20px;
                }
            }
            .vxetable {
                width: 100%;
                min-width: 881px;

                .el-date-editor {
                    width: 130px;

                    .el-input__inner {
                        font-size: 12px;
                        padding-right: 0;
                    }
                }

            }
        }

        .right {
            .xuqiuform {
                border-bottom: none;
                .xuqiuform_tit {
                    color: #49535f;
                    font-size: 14px;
                    padding-bottom: 20px;
                    .el-icon-setting {
                        float: right;
                        font-size: 16px;
                        cursor: pointer;
                    }
                }
            }
            .item {
                i {
                    font-style: normal;
                }
                >span {
                    top: 0 !important;
                }
                .yxj {
                    display: inline-block;
                    padding: 0 10px;
                    line-height: 20px;
                    border-radius: 2px;
                    font-size: 12px;
                    min-height: 20px;
                    background-color: #9AAFD0;
                    color: #fff;
                }
                .zhuangtai {
                  display: inline-block;
                  height: 22px;
                  border: 1px solid #3582fb;
                  border-radius: 11px;
                  padding: 2px 10px;
                  color: #3582fb;
                }
                .jinji {
                  display: inline-block;
                  padding: 0 10px;
                  line-height: 20px;
                  border-radius: 2px;
                  background-color: #f85e5e;
                  color: #fff;
                }
                .degree {
                  color: #f85e5e;
                  i {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 4px;
                    background-color: #f85e5e;
                  }
                }
            }
        }
    }
}

.hasTagsView .app-main .XQ_and_QX .editouter {
    min-height: calc(100vh - 191px);
    .left {
        height: calc(100vh - 191px);
        overflow-y: auto;

    }
    .right {
        height: calc(100vh - 191px);
        overflow-y: auto;

    }
}

.app-main .XQ_and_QX .editouter {
    min-height: calc(100vh - 47px);
    .left {
        height: calc(100vh - 47px);
        overflow-y: auto;

    }
    .right {
        height: calc(100vh - 47px);
        overflow-y: auto;

    }

}
.el-dropdown-link {
    display: inline-block;
    height: 30px;
    width: 240px;
    border: 1px solid #b0bac5;
    padding: 3px 20px 3px 6px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    margin-left: 12px;
    i {
        position: absolute;
        right: 12px;
        top: 6px
    }
}

</style>

<style  scoped>
.editouter >>> .vxe-table.border--default .vxe-table--header-wrapper {
                    background-color: #fff;
                    /* border-bottom: 1px solid #dfe6ee; */
                }

.vxetable

.vxetable >>>  .el-date-editor .el-input__inner  {
    font-size: 12px;
    padding-right: 0;
}

.el-table >>> th {
    font-weight: normal;
}
.XQ_and_QX .editcontainer .editouter .left .next_cnt .el-input  >>> .el-input__inner  {

    border: 1px solid #DCDFE6;
}
.editdropdown  >>> .line {
    border-bottom: 1px solid #dfe6ee;
  }
.editdropdown  >>>   .el-dropdown-menu__item {
  font-size: 12px;
}
</style>
