<template>
  <div class="XQ_and_QX gray">
    <div class="editcontainer">

      <div class="header">
        <el-link :underline="false" @click="goBack"><i class="el-icon-back" /> 返回</el-link>
        <el-divider direction="vertical" />
        <span>创建测试计划</span>
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
              <el-input v-model="title" placeholder="计划名称" />

            <!-- </el-tooltip> -->

            <Tinymce ref="editor" v-model="postForm.content" :height="300" style="margin-bottom:16px;" />

          </el-col>
          <el-col :span="6" class="right">
            <div class="xuqiuform">
              <div class="item">
                <span>迭代</span>
                <div>
                  <el-select v-model="diedai" filterable placeholder="请选择" size="mini">
                    <el-option label="--空--" :value="1" />
                  </el-select>
                </div>
              </div>
              <div class="item">
                <span>版本</span>
                <div>
                  <el-select v-model="banben" filterable placeholder="请选择" size="mini">
                    <el-option label="--空--" :value="1" />
                  </el-select>
                </div>
              </div>
              <div class="item">
                <span>状态</span>
                <div>
                  <el-select v-model="zhuangtai" filterable placeholder="请选择" size="mini">
                    <el-option label="--空--" :value="1" />
                  </el-select>
                </div>
              </div>
              <div class="item">
                <span>测试类型</span>
                <div>
                  <el-select v-model="type" filterable placeholder="请选择" size="mini">
                    <el-option label="--空--" :value="1" />
                  </el-select>
                </div>
              </div>
              <div class="item">
                <span>开始时间</span>
                <div>
                  <el-select v-model="startTime" filterable placeholder="请选择" size="mini">
                    <el-option label="--空--" :value="1" />
                  </el-select>
                </div>
              </div>
              <div class="item">
                <span>结束时间</span>
                <div>
                  <el-select v-model="endTime" filterable placeholder="请选择" size="mini">
                    <el-option label="--空--" :value="1" />
                  </el-select>
                </div>
              </div>
              <div class="item">
                <span>测试负责人</span>
                <div>
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
              </div>

            </div>

            <div class="fujian">

              <div class="btn">
                <span class="tit">附件</span>
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
        <el-button type="primary" @click="$router.push({name:'testplan'})">提交</el-button>
        <el-button @click="$router.push({name:'testplan'})">取消</el-button>
      </div>

    </div>
    <xuqiuDialog :dialog-visible.sync="showSelectDialog" />
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import xuqiuDialog from '@/components/relationRequireDialog/xuqiuDialog'
import Tinymce from '@/components/Tinymce'

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
  components: { Tinymce, draggable, xuqiuDialog },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      options: '1',
      title: '',
      notitle: true,
      diedai: '',
      youxian: 1,
      banben: '',
      zhuangtai: '',
      type: '',
      person: '',
      startTime: '',

      degree: '',
      endTime: '',
      showSelectDialog: false,
      isQueXian: false,
      miaoshuType: 1,
      fuzeren: '',
      searchgroup:[],
      searchtext:'',
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
    },
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    },
    changechaxun() {

    }
  }
}
</script>
<style  scoped >
.editdropdown  >>> .line {
    border-bottom: 1px solid #dfe6ee;
  }
.editdropdown  >>>   .el-dropdown-menu__item {
  font-size: 12px;
}

.noborder >>> .el-input__inner {
    border: none !important;
}
</style>
<style lang="scss" scoped>
.settings_moveIcon{
    display: inline-block;
    position: relative;
    top: 4px;
    width: 10px;
    height: 16px;
    background: url('data:image/gif;base64,R0lGODlhBgAOAJEAAL+/v7q6uv///wAAACH5BAEHAAIALAAAAAAGAA4AAAISBCRmuOjPTlIR2hlbu06DIBkFADs=') ;
    background-repeat: no-repeat;
    cursor: move;
}
.com_table th {
    text-align: left;
}
.stepType{
    margin-bottom: 20px;
    .outer {
        display: flex;
        border-bottom: 1px solid #dfe6ee;
        >div {
            line-height: 30px;
        }
        .noborder {
            margin: 0 !important;
        }
        .move {
            width: 2%;
        }
        .radio {
            width: 8%;
        }
        .name {
            width: 30%;
        }
        .miaoshu {
            width: 30%;
        }
        .caozuo {
            width: 30%;
            >div {
                height: 36px;
                background: url('../../../assets/setting/step_miaoshu.jpg') no-repeat;
                background-position:  center;
                cursor: pointer;
            }

        }
    }
}

</style>
