<template>
  <div class="XQ_and_QX gray editxuqiu">
    <div class="editcontainer">

      <div class="header">
        <el-link :underline="false" @click="goBack"><i class="el-icon-back" /> 返回</el-link>
        <el-divider direction="vertical" />
        <span>【ID1000038】注册功能测试</span>
        <!-- <i class="el-icon-star-off" :class="{'starPro':starPro}" @click="starPro = !starPro" /> -->
        <span class="nowstatus">当前状态：<i>开启</i></span>
        <div class="select">
          <el-button size="mini" type="primary" style="color:#fff;width:auto;" @click="showSettingDialog = true">规则&执行</el-button>
          <el-button size="mini">测试报告</el-button>

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
              <el-tab-pane label="详情" name="first">

                <div class="maininfo">
                  <b>执行情况</b><br>
                  <p>There is no content of test plan ， 快来<i class="Link_disabled_click">规划测试内容</i>吧</p>
                  <b>整体情况</b><br>
                  <br>
                  <p><span>需求总数：</span>0</p>
                  <p><span>用例总数：</span>0</p>
                  <p><span>测试执行进度：</span>0%</p>
                  <p><span>通过率：</span>0%</p>
                  <p><span>发现Bug总数：</span>0</p>
                </div>
              </el-tab-pane>
              <el-tab-pane name="second">
                <div slot="label">
                  关联的Bug {{ xiangxinum }}
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
                    :auto-resize="true"
                    highlight-hover-row
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

            <div class="liuzhuanbtn">
              <el-button type="primary" @click="$router.push({name:'testplan'})">保存</el-button>
              <el-button @click="$router.push({name:'testplan'})">取消</el-button>
            </div>

          </el-col>
          <el-col :span="6" class="right">
            <div class="xuqiuform">
              <div class="xuqiuform_tit">基本信息

                <span class="el-icon-setting" />
              </div>

              <div class="item">
                <span>版本</span>
                <div>
                  版本1
                </div>
              </div>
              <div class="item">
                <span>状态</span>
                <div>
                  开启
                </div>
              </div>
              <div class="item">
                <span>测试类型</span>
                <div>
                  功能测试
                </div>
              </div>
              <div class="item">
                <span>开始时间</span>
                <div>
                  2020-02-06 18:20:12
                </div>
              </div>
              <div class="item">
                <span>结束时间</span>
                <div>
                  2020-05-06 12:32:15
                </div>
              </div>
              <div class="item">
                <span>测试负责人</span>
                <div>
                  --

                </div>
              </div>
              <div class="item">
                <span>创建人</span>
                <div>
                  --
                </div>
              </div>
              <div class="item">
                <span>创建时间</span>
                <div>
                  2020-02-06 18:20:12
                </div>
              </div>
              <div class="item">
                <span>最后修改人</span>
                <div>
                  --
                </div>
              </div>
              <div class="item">
                <span>最后修改时间</span>
                <div>
                  2020-05-06 12:32:15
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
    <testPlan :dialog-visible.sync="showSettingDialog" />
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import testPlan from './components/testplanDialog'

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
  components: {
    Tinymce,
    testPlan
  },
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
      xiangxinum: 4,
      biangengnum: 5,
      chuliren: '',
      comment: '',
      developer: '',
      xiayizhuangtai: 1,
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          title: 'test000001',
          checked: false,
          eventID: '1000037',
          youxian: 'high',
          diedai: '迭代1',
          status: '已实现',
          person: 'admin',
          startTime: '2020-09-05',
          endTime: '2020-09-05'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          title: 'test0002',
          checked: false,
          eventID: '1000037',
          youxian: 'high',
          diedai: '迭代1',
          status: '已实现',
          person: 'admin',
          startTime: '',
          endTime: ''
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          title: 'test0002',
          checked: false,
          eventID: '1000037',
          youxian: 'high',
          diedai: '迭代1',
          status: '已实现',
          person: 'admin',
          startTime: '',
          endTime: '',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              title: 'test0002',
              checked: false,
              eventID: '100004343',
              youxian: 'high',
              diedai: '迭代1',
              status: '已实现',
              person: 'admin',
              startTime: '',
              endTime: ''
            },
            {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              title: 'test0002',
              checked: false,
              eventID: '100001212',
              youxian: 'high',
              diedai: '迭代1',
              status: '已实现',
              person: 'admin',
              startTime: '',
              endTime: ''
            }]
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          title: 'test0003',
          checked: false,
          eventID: '1000037',
          youxian: 'high',
          diedai: '迭代1',
          status: '已实现',
          person: 'admin',
          startTime: '',
          endTime: ''
        }
      ],

      lishiData: [
        { no: '1', changeTime: '2020-10-08 20:14:59', person: 'admin', status: '手动变更', ziduan: '详细描述', before: '实现中', after: '已实现' },
        { no: '1', changeTime: '2020-10-08 20:14:59', person: 'admin', status: '手动变更', ziduan: '详细描述', before: '实现中', after: '已实现' },
        { no: '1', changeTime: '2020-10-08 20:14:59', person: 'admin', status: '手动变更', ziduan: '详细描述', before: '实现中', after: '已实现' },
        { no: '1', changeTime: '2020-10-08 20:14:59', person: 'admin', status: '手动变更', ziduan: '详细描述', before: '实现中', after: '已实现' },
        { no: '1', changeTime: '2020-10-08 20:14:59', person: 'admin', status: '手动变更', ziduan: '详细描述', before: '实现中', after: '已实现' }
      ],
      baseInfo: {

      },
      showSettingDialog: false,
      isQueXian: false
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
    goBack(){
      this.$router.go(-1)
    }, 
    tabClick() {}
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
        .nowstatus {
            font-weight: normal;
            font-size: 12px;
            display: inline-block;
            margin-left: 16px;
            i{
                display: inline-block;
                font-style: normal;
                color: rgb(165, 165, 57);
                margin-left: 8px;
            }
        }
        .starPro {
            color: #3582fb;
        }

        height: 65px;
        .el-button {
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
        height: 400px;
        position: relative;
        padding: 10px 10px 8px 10px;
        p {
            font-size: 14px;
            span {
                display: inline-block;
                width: 140px;
            }
            i{
                font-style: normal;
                color: #3582fb;
            }
        }

    }
    .editouter {
        border-bottom: none;
        .left {
            height: 100%;
            position: relative;
            .el-tabs {
                padding-bottom: 20px;
                border-bottom: 1px solid #d7e6fe;
                min-height: 200px;
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
                // position: absolute;
                // bottom: 20px;
                margin-top: 20px;
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
