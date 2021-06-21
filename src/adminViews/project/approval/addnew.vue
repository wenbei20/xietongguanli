<template>
  <div class="XQ_and_QX gray">
    <div class="editcontainer">

      <div class="header">
        <el-link :underline="false" @click="goBack"><i class="el-icon-back" /> 返回</el-link>
        <el-divider direction="vertical" />
        <span>发起文档审批</span>
        <div class="select">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              系统默认模板<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown" class="editdropdown">
              <el-dropdown-item>系统默认模板</el-dropdown-item>
              <el-dropdown-item class="line">text模板</el-dropdown-item>
              <el-dropdown-item>
                <i class="el-icon-setting" />
                设置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <div class="editouter">
        <el-row>
          <el-col :span="18" class="left" style="padding-bottom:20px;">

            <!-- <el-tooltip :value="notitle" manual class="item" effect="dark" content="必填项不能为空" placement="right"> -->
            <el-input v-model="title" placeholder="输入标题" />

            <!-- </el-tooltip> -->

            <Tinymce ref="editor" v-model="postForm.content" :height="440" />
          </el-col>
          <el-col :span="6" class="right">
            <div class="xuqiuform">
              <div class="item">
                <span>需求</span>
                <div>
                  <el-button size="mini" @click="showSelectDialog = true">
                    <i class="el-icon-search" />
                    查找
                  </el-button>
                </div>
              </div>
              <div class="item">
                <span>迭代</span>
                <div>
                  <el-select v-model="diedai" filterable placeholder="请选择" size="mini">
                    <el-option label="--空--" :value="1" />
                    <el-option :label="'运维跟踪（当前迭代）'" :value="2" />
                    <el-option :label="'V3.4（当前迭代）'" :value="3" />
                    <el-option :label="'V3.2'" :value="4" />
                    <el-option :label="'快报3.0'" :value="5" />
                    <el-option :label="'V3.1'" :value="6" />
                  </el-select>
                </div>
              </div>

              <div class="item">
                <span>处理人</span>
                <div>
                  <el-dropdown trigger="click" placement="bottom-start" class="Common_select">
                    <span class="el-dropdown-link w200">
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
              </div>

              <div class="item">
                <span>抄送人</span>
                <div>
                  <el-dropdown trigger="click" placement="bottom-start" class="Common_select">
                    <span class="el-dropdown-link w200">
                      {{ CSJoinGroup }}<i class="el-icon-arrow-down el-icon--right" />
                    </span>

                    <el-dropdown-menu slot="dropdown" class="com_dropdownmenu">
                      <div class="Common_select_Search">
                        <el-input
                          v-model="CSsearchtext"
                          prefix-icon="el-icon-search"
                          size="small"
                        /></div>
                      <el-checkbox-group v-model="CSsearchgroup">
                        <el-checkbox label="成员1" />
                        <el-checkbox label="成员2" />
                        <el-checkbox label="成员3" />
                        <el-checkbox label="成员4" />
                      </el-checkbox-group>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>

              <div class="item">
                <span>优先级</span>
                <div>
                  <el-select v-model="testcol" placeholder="" size="mini">
                    <el-option label="高" value="1" />
                    <el-option label="中" value="2" />
                    <el-option label="低" value="3" />
                  </el-select>
                </div>
              </div>
            </div>

            <div class="fujian">
              <!-- <div v-if="!isQueXian" class="title">关联对象</div> -->

              <div class="btn">
                <span class="tit">关联文档</span>
                <span class="add">
                  <i class="el-icon-plus" />
                  添加附件
                </span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="editbtns">
        <el-button type="primary" @click="topageindex">发起审批</el-button>
        <el-button @click="topageindex">取消</el-button>
      </div>

    </div>

    <xuqiuDialog :dialog-visible.sync="showSelectDialog" />
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import xuqiuDialog from '@/components/relationRequireDialog/xuqiuDialog'

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
  components: { Tinymce, xuqiuDialog },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      options: '1',
      title: '',
      notitle: true,
      diedai: 1,
      youxian: 1,
      person: '',
      startTime: '',
      degree: '',
      endTime: '',
      showSelectDialog: false,
      isQueXian: false,
      radiocheck: '1',
      testcol: '1',
      testcoltext: '',
      searchgroup: [],
      searchtext: '',
      CSsearchtext: '',
      CSsearchgroup: []
    }
  },
  computed: {
    selectedJoinGroup() {
      return this.searchgroup.join(';')
    },
    CSJoinGroup() {
      return this.CSsearchgroup.join(';')
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
    topageindex() {
      this.$router.push({ name: 'Needs' })
    }
  }
}
</script>
<style  scoped >
.radiocheck {
  line-height: 28px;
}

.editdropdown  >>> .line {
    border-bottom: 1px solid #dfe6ee;
  }
.editdropdown  >>>   .el-dropdown-menu__item {
  font-size: 12px;
}
.select_innerIpt >>> .el-input__inner {
  border: none;
  width: calc(100% - 30px);
  margin-left: 15px;
  margin-bottom: 10px;
  border-bottom:1px solid #DCDFE6;
}
</style>
