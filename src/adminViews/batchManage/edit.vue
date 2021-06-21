<template>
  <div class="XQ_and_QX gray editxuqiu">
    <div class="editcontainer">

      <div class="header">
        <el-link :underline="false" @click="goBack"><i class="el-icon-back" /> 返回</el-link>
        <el-divider direction="vertical" />
        <span>BI分析数据中心支撑平台</span>
        <i class="el-icon-star-off" :class="{'starPro':starPro}" @click="starPro = !starPro" />
        <div class="select">
          <!-- <el-button size="mini" @click="$router.push({name:'xuqiuAdd' ,query:{from:'quexian'}})">编辑</el-button> -->

          <!-- <el-dropdown trigger="click">

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
          </el-dropdown> -->

          <!-- <div class="link">
            <i class="el-icon-link" />
            <div class="drapdown_menu">
              <div>复制标题与链接</div>
            </div>
          </div> -->

        </div>
      </div>

      <div class="editouter">
        <el-row>
          <el-col :span="18" class="left" style="padding-bottom:20px;">
            <el-tabs v-model="activeName" @tab-click="tabClick">
              <el-tab-pane label="详细信息" name="first">

                <div class="maininfo">
                  <!-- <p>1、  测温传感器：</p>
                  <p>a、    偶尔会出现连接不上的情况</p>
                  <p>b、    偶尔会出现连接成功以后，显示数据断开连接的情况</p>
                  <p>2、  测振传感器：</p>
                  <p>a、    偶尔会出现连接成功以后，显示数据断开连接的情况</p>
                  <p>b、    偶尔会出现连接上，不上传输数据的情况</p>
                  <p>c、    建议在连接的窗口加上传感器的电量显示</p>
                  <p>3、  测气传感器：</p> -->
                  <p>BI分析数据中心支撑平台由总行下发的2020年第二批次任务，在数据平台中接入项目研发、测试过程中产生的文档、案例、需求、缺陷等数据进行实时分析，为项目管理工作提供支撑。</p>

                </div>
              </el-tab-pane>
              <!-- <el-tab-pane name="second">
                <div slot="label">
                  需求 {{ xiangxinum }}
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
              </el-tab-pane> -->
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
                  保持为接受/处理
                </span>
                <span class="green" :class="{'active':xiayizhuangtai === 2}" @click="changeStatus(2)"> 
                  <i class="el-icon-success" />
                  已解决
                </span>
                <span class="red" :class="{'active':xiayizhuangtai === 3}" @click="changeStatus(3)">
                  <i class="el-icon-success" />
                  已拒绝
                </span>

                <div class="outer">
                  <div>
                    <span>处理人</span>
                    <el-dropdown trigger="click" placement="bottom-start" class="Common_select w200">
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
                    <div class="developer">

                      <span >开发人员</span>
                      <el-dropdown trigger="click" placement="bottom-start" class="Common_select w200">
                      <span class="el-dropdown-link bgf">
                        {{ KFelectedJoinGroup }}<i class="el-icon-arrow-down el-icon--right" />
                      </span>

                      <el-dropdown-menu slot="dropdown" class="com_dropdownmenu">
                        <div class="Common_select_Search">
                          <el-input
                            v-model="KFsearchtext"
                            prefix-icon="el-icon-search"
                            size="small"
                          /></div>
                        <el-checkbox-group v-model="KFsearchgroup">
                          <el-checkbox label="成员1" />
                          <el-checkbox label="成员2" />
                          <el-checkbox label="成员3" />
                          <el-checkbox label="成员4" />
                        </el-checkbox-group>
                      </el-dropdown-menu>
                    </el-dropdown>
                    </div>
                  </div>
                  <div>
                    <span>评论</span>
                    <el-input v-model="comment" style="width:613px" />
                  </div>
                </div>
              </div>
            </div>

            <div class="liuzhuanbtn">
              <el-button type="primary" @click="$router.go(-1)">保存</el-button>
            </div>

          </el-col>
          <el-col :span="6" class="right">
            
            <div class="xuqiuform">
              <div class="xuqiuform_tit">基本信息

                <!-- <span class="el-icon-setting" /> -->
              </div>

              <div class="item">
                <span>所属团队：</span>
                <div>
                  <!-- <i class="zhuangtai">接受/处理</i> -->
                  数据中台组
                </div>
              </div>
              <div class="item">
                <span>所属部门：</span>
                <div>
                  研发部
                </div>
              </div>
              <div class="item">
                <span>所属批次：</span>
                <div>
                  2020年第二批次
                </div>
              </div>
              <div class="item">
                <span>来源任务：</span>
                <div>
                  总行下发任务
                </div>
              </div>
               <div class="item">
                <span>预计开始：</span>
                <div>
                  2020-01-19
                </div>
              </div>
              <!-- <div class="item">
                <span>优先级</span>
                <div>
                  <i class="jinji">紧急</i>
                </div>
              </div> -->
              <!-- <div class="item">
                <span>严重程度</span>
                <div>
                  <span class="degree"><i /> 严重</span>
                </div>
              </div> -->
              <!-- <div class="item">
                <span>发现版本</span>
                <div>
                   V3.2.001
                </div>
              </div> -->
              <!-- <div class="item">
                <span>关闭版本</span>
                <div>
                  --
                </div>
              </div> -->
              <!-- <div class="item">
                <span>测试阶段</span>
                <div>
                  系统测试
                </div>
              </div> -->
               <div class="item">
                <span>预计结束：</span>
                <div>
                  2020-12-09
                </div>
              </div>
              <!-- <div class="item">
                <span>缺陷类型</span>
                <div>
                  功能
                </div>
              </div> -->
              <!-- <div class="item">
                <span>重现规律</span>
                <div>
                  偶现
                </div>
              </div> -->
              <!-- <div class="item">
                <span>发现阶段</span>
                <div>
                  新增
                </div>
              </div> -->
               <!-- <div class="item">
                <span>后续处理意见</span>
                <div>
                  --
                </div>
              </div> -->
              <!-- <div class="item">
                <span>创建人</span>
                <div>
                  吕静静
                </div>
              </div>
              <div class="item">
                <span>创建时间</span>
                <div>
                  2020-09-27 17:47:16
                </div>
              </div> -->
              
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
    <!-- <viewSetting :dialog-visible.sync="showSettingDialog" /> -->
    <!-- <xuqiuDialog :dialog-visible.sync="showXuqiuDialog" /> -->
  </div>
</template>
<script>
// import Tinymce from '@/components/Tinymce'
// import xuqiuDialog from './components/xuqiuDialog'
// import viewSetting from './components/viewSetting'

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
  // components: { /* Tinymce, */ viewSetting  , xuqiuDialog},
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
        { no: '1', changeTime: '2020-09-29 08:22:01', person: '李伟', status: '手动变更', ziduan: '评论', before: '查看详细', after: '查看详细' },
        { no: '2', changeTime: '2020-09-28 10:24:03', person: '代海涛', status: '手动变更', ziduan: '状态', before: '已分配', after: '接受/处理' },
        { no: '3', changeTime: '2020-09-27 18:26:47', person: '代海涛', status: '手动变更', ziduan: '评论', before: '查看详细', after: '查看详细' },
        { no: '4', changeTime: '2020-09-27 17:47:19', person: '吕静静', status: '手动变更', ziduan: '处理人', before: '--', after: '代海涛' }
      ],
      baseInfo: {

      },
      showSettingDialog: false,
      
      searchgroup:[],
      searchtext:'',
      KFsearchgroup:[],
      KFsearchtext:''
    }
  },
  created() {
   
  },
  computed:{
    selectedJoinGroup(){
      return this.searchgroup.join(';')
    },
    KFelectedJoinGroup(){
      return this.KFsearchgroup.join(';')
    }
  },
  methods: {
    changechaxun() {

    },
    goBack(){
      this.$router.go(-1)
    },
    tabClick(e) {
      if (e.index === '5') {
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
                    .active.green {
                        border-color: green;
                        color: green;
                    }
                    .active.red {
                        border-color: red;
                        color: red;
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
