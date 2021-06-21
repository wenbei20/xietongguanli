<template>
  <div class="XQ_and_QX gray editxuqiu">
    <div class="editcontainer">

      <div class="header">
        <el-link :underline="false" @click="goBack"><i class="el-icon-back" /> 返回</el-link>
        <el-divider direction="vertical" />
        <span>《中行移动端APP研发二七需求规格说明书V1.0》文档审批信息</span>
        <!-- <i class="el-icon-star-off" :class="{'starPro':starPro}" @click="starPro = !starPro" /> -->
        <div class="select">
          <el-button size="mini" style="color:#fff;" type="primary" @click="$router.push({name:'createApproval'})">编辑</el-button>

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
                  <p>编写罐区标准作业智能巡检系统解决方案</p>
                </div>
              </el-tab-pane>

              <el-tab-pane name="second">
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

            </el-tabs>

            <div class="fujian">

              <div class="btn">
                <span class="tit">关联文档</span>
                <span class="add" style="color:#3f4a56;">
                  <svg-icon icon-class="word" class="docIcon" />
                  《中行移动端APP研发二七需求规格说明书V1.0》
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
                <span :class="{'active':xiayizhuangtai === 1}" @click="changeStatus(1)">
                  <i class="el-icon-success" />
                  转向开发部审批</span>
                <span :class="{'active':xiayizhuangtai === 2 ,'green': true}" @click="changeStatus(2)">
                  <i class="el-icon-success" />
                  已通过</span>
                <span :class="{'active':xiayizhuangtai === 3 ,'red': true}" @click="changeStatus(3)">
                  <i class="el-icon-success" />
                  已拒绝</span>

                <div class="outer">
                  <div>
                    <span>处理人</span>
                    <el-dropdown trigger="click" placement="bottom-start" class="Common_select">
                      <span class="el-dropdown-link bgf" style="width:200px">
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
              <el-button type="primary" @click="$router.push({name:'approval'})">流转</el-button>
            </div>

          </el-col>
          <el-col :span="6" class="right">
            <div class="xuqiuform">
              <div class="xuqiuform_tit">基本信息

                <span class="el-icon-setting" />
              </div>

              <div class="item">
                <span>状态</span>
                <div>
                  <i class="zhuangtai">已实现</i>
                </div>
              </div>
              <div class="item">
                <span>需求</span>
                <div>
                  --
                </div>
              </div>

              <div class="item">
                <span>迭代</span>
                <div>
                  --
                </div>
              </div>
              <div class="item">
                <span>处理人</span>
                <div>
                  刘峰
                </div>
              </div>
              <div class="item">
                <span>抄送人</span>
                <div>
                  王小虎
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
  components: { /* Tinymce, */ viewSetting, xuqiuDialog },
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
      showXuqiuDialog: false,
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
      searchgroup: [],
      searchtext: '',
      missionList: [
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
        }
      ]

    }
  },
  computed: {
    selectedJoinGroup() {
      return this.searchgroup.join(';')
    }
  },
  created() {
    if (this.$route.query && this.$route.query.from === 'quexian') {
      this.isQueXian = true
    }
  },
  methods: {
    changechaxun() {

    },
    goBack() {
      this.$router.go(-1)
    },
    tabClick(e) {
      if (e.index === '6') {
        this.showSettingDialog = true
      }
    },
    changeStatus(e) {
      this.xiayizhuangtai = e
    }
  }
}
</script>
<style lang="scss" scoped >
.docIcon {
  display: inline-block;
  width: 20px;
  height: 20px;
  position: relative;
  top: 2px;;
}
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
                        &.green {
                          border-color: green;
                          color: green;
                        }
                        &.red {
                          border-color: #f00;
                          color: #f00;
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
