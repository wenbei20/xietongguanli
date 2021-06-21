<template>
  <div class="XQ_and_QX gray">
    <div class="editcontainer">

      <div class="header">
        <el-link :underline="false" @click="goBack"><i class="el-icon-back" /> 返回</el-link>
        <el-divider direction="vertical" />
        <span>创建测试用例</span>
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
            <div class="editTitle">前置条件：</div>            
            <Tinymce ref="editor" v-model="postForm.content" :height="300" style="margin-bottom:16px;" />
            <div class="editTitle">用例步骤：</div>
            <div class="miaoshutype">
              <span>描述方式：</span>
              <el-select v-model="miaoshuType" placeholder="请选择">
                <el-option label="文本描述" :value="1" />
                <el-option label="步骤描述" :value="2" />
              </el-select>
            </div>

            <div v-if="miaoshuType === 2" class="stepType">
              <table class="com_table" cellspacing="0">

                <colgroup>
                  <col style="width: 2%;">
                  <col style="width: 8%;">
                  <col style="width: 30%;">
                  <col style="width: 30%;">
                  <col style="width: 30%;">
                </colgroup>
                <thead>
                  <tr>
                    <th />
                    <th>序号</th>
                    <th>步骤描述</th>
                    <th>预期结果</th>
                    <th />
                  </tr>
                </thead>

              </table>

              <draggable>
                <transition-group>
                  <div v-for="(item,i) in 5" :key="i" class="outer">
                    <div class="move">
                      <span class="settings_moveIcon" />
                    </div>
                    <div class="radio">
                      {{ item }}
                    </div>
                    <div class="name">
                      <el-input class="noborder" placeholder="请输入步骤" />
                    </div>
                    <div class="miaoshu">
                      <el-input class="noborder" placeholder="请输入结果" />
                    </div>
                    <div class="caozuo">
                      <div />
                    </div>
                  </div>
                </transition-group>
              </draggable>
            </div>
            <Tinymce v-if="miaoshuType === 1" ref="editor1" v-model="postForm.content" :height="300" style="margin-bottom:16px;" />
            
            <div class="editTitle">预期结果：</div>
            
            <Tinymce ref="editor2" v-model="postForm.content" :height="300" style="margin-bottom:16px;" />
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
                <span>用例目录</span>
                <div>
                  <el-select v-model="diedai" filterable placeholder="请选择" size="mini">
                    <el-option label="--空--" :value="1" />
                    <el-option label="未规划目录" :value="2" />
                  </el-select>
                </div>
              </div>
              <div class="item">
                <span>用例类型</span>
                <div>
                  <el-select v-model="diedai" filterable placeholder="请选择" size="mini">
                    <el-option label="--空--" :value="1" />
                    <el-option label="类型1" :value="2" />
                  </el-select>
                </div>
              </div>
              <div class="item">
                <span>用例等级</span>
                <div>
                  <el-select v-model="youxian" filterable placeholder="请选择" size="mini">
                    <el-option label="--空--" :value="1" />
                    <el-option label="High" :value="2" />
                    <el-option label="Middle" :value="3" />
                    <el-option label="Low" :value="4" />
                    <el-option label="Nice To Have" :value="5" />
                  </el-select>
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
        <el-button type="primary" @click="$router.push({name:'testcase'})">提交</el-button>
        <el-button >连续添加</el-button>
        <el-button @click="$router.push({name:'testcase'})">取消</el-button>
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
      diedai: 1,
      youxian: 1,
      person: '',
      startTime: '',
      degree: '',
      endTime: '',
      showSelectDialog: false,
      isQueXian: false,
      miaoshuType: 1
    }
  },
  created() {
    if (this.$route.query && this.$route.query.from === 'quexian') {
      this.isQueXian = true
    }
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

.editTitle {
  font-size: 16px;
  font-weight: bold;
  line-height: 40px;
}

</style>
