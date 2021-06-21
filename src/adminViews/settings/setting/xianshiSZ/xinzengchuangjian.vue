<template>
  <div class="settings">

    <div class="settings_title">新增创建页面模板</div>

    <div class="cnt">

      <div class="baseinfo">
        <div class="tit">模板基本信息</div>
        <div class="item">
          模板：
          <el-input style="width:422px;height:28px" size="mini" />
          <span>*</span>
          (<50 字符)
        </div>
        <div class="item">
          描述：
          <el-input style="width:422px;height:28px" size="mini" />
          (<100 字符)
        </div>
      </div>

      <div class="itemtitle">
        <div>设置模板</div>
        <span>在下面部分定制需求模板，包括默认的需求标题，描述模板，同时定义启用的需求属性字段，定义字段的显示顺序以及是否为必填项。如果你需要增加更多的属性字段，请进入‘需求自定义字段’设置。</span>
      </div>

      <div class="biaoti">
        <p>标题：</p>
        <div>
          <el-input style="width:422px;height:28px" size="mini" />
          (<50 字符)
        </div>
      </div>

      <div class="xiangxi">
        <p>详细描述：</p>
        <div>
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </div>
      </div>

      <div class="ziduan">
        <p class="tit">已选字段
          <span>
            <i class="el-icon-plus" />
            增加字段
          </span>
        </p>
        <div>
          <table class="com_table" cellspacing="0">

            <colgroup>
              <col style="width: 8%;">
              <col style="width: 60%;">
              <col style="width: 8%;">
              <col style="width: 24%;">
            </colgroup>
            <thead>
              <tr>
                <th>字段名称</th>
                <th>默认值</th>
                <th>是否必填字段</th>
                <th>操作</th>
              </tr>
            </thead>

          </table>

          <div class="outer">
            <div class="radio">需求分类</div>
            <div class="name">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>选项1</el-dropdown-item>
                  <el-dropdown-item>选项2</el-dropdown-item>
                  <el-dropdown-item>选项3</el-dropdown-item>
                  <el-dropdown-item disabled>选项4</el-dropdown-item>
                  <el-dropdown-item divided>选项5</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="miaoshu">
              <el-checkbox v-model="xqfl" />
            </div>
            <div class="caozuo">
              <i class="el-icon-close" />
            </div>
          </div>

          <draggable>
            <transition-group>

              <!-- 迭代 -->
              <div key="0" class="outer">
                <div class="radio">
                  <span class="settings_moveIcon" />
                  迭代</div>
                <div class="name">
                  <el-select v-model="diedai" placeholder="请选择" size="mini">
                    <el-option
                      key="1"
                      label="黄金糕"
                      value="1"
                    />
                  </el-select>
                </div>
                <div class="miaoshu">
                  <el-checkbox v-model="xqfl" />
                </div>
                <div class="caozuo">
                  <i class="el-icon-close" />
                </div>
              </div>

              <div key="1" class="outer">
                <div class="radio">
                  <span class="settings_moveIcon" />

                  优先级</div>
                <div class="name">
                  <el-select v-model="diedai" placeholder="请选择" size="mini">
                    <el-option
                      key="1"
                      label="选项1"
                      value="1"
                    />
                  </el-select>
                </div>
                <div class="miaoshu">
                  <el-checkbox v-model="xqfl" />
                </div>
                <div class="caozuo">
                  <i class="el-icon-close" />
                </div>
              </div>
              <div key="2" class="outer">
                <div class="radio">
                  <span class="settings_moveIcon" />
                  处理人</div>
                <div class="name">
                  <el-select v-model="diedai" placeholder="请选择" size="mini">
                    <el-option
                      key="1"
                      label="黄金糕"
                      value="1"
                    />
                  </el-select>
                </div>
                <div class="miaoshu">
                  <el-checkbox v-model="xqfl" />
                </div>
                <div class="caozuo">
                  <i class="el-icon-close" />
                </div>
              </div>
              <div key="3" class="outer">
                <div class="radio">
                  <span class="settings_moveIcon" />
                  预计开始</div>
                <div class="name">
                  <el-date-picker
                    v-model="starttime"
                    size="mini"
                    type="date"
                    placeholder="选择日期"
                  />
                </div>
                <div class="miaoshu">
                  <el-checkbox v-model="xqfl" />
                </div>
                <div class="caozuo">
                  <i class="el-icon-close" />
                </div>
              </div>
              <div key="4" class="outer">
                <div class="radio">
                  <span class="settings_moveIcon" />
                  预计结束</div>
                <div class="name">
                  <el-date-picker
                    v-model="endtime"
                    size="mini"
                    type="date"
                    placeholder="选择日期"
                  />
                </div>
                <div class="miaoshu">
                  <el-checkbox v-model="xqfl" />
                </div>
                <div class="caozuo">
                  <i class="el-icon-close" />
                </div>
              </div>
            </transition-group>
          </draggable>

        </div>

        <div v-if="info.from !== 'quexian'">

          <div class="settings_title fw" style="margin-top:30px;">自动创建预设对象</div>

          <ul class="chuangjiannav">
            <li class="active">创建预设子需求</li>
          </ul>

          <div class="settings_tips">使用本模板创建需求时，系统将自动创建需求的子需求</div>

          <div class="addxuqiu">
            <div v-for="(item,i) in XuqiuList" :key="i" class="item">
              <el-input v-model="item.value" size="mini" />
              <span>*</span>
              <i class="el-icon-close" />
            </div>

          </div>

          <div class="settings_add" style="margin: 16px 0 20px 0;" @click="addxuqiu">
            <i class="el-icon-plus" />
            新增预设子需求
          </div>

          <div class="checkbottom">
            <el-checkbox>默认以需求标题为前缀</el-checkbox>
            <el-tooltip class="item" effect="dark" placement="right">
              <div slot="content">勾选此项后，系统自动创建<br>子需求的标题为：需求标题 - 预设子需求标题。</div>
              <i class="el-icon-question" />

            </el-tooltip>
          </div>

          <div style="margin-top:20px;">
            <el-button size="small" type="primary" @click="navigate">提交</el-button>
            <el-button size="small" @click="navigate">取消</el-button>
          </div>

        </div>

        <div v-else style="margin-top:60px;">
          <el-button size="small" type="primary" @click="navigate">提交</el-button>
          <el-button size="small" @click="navigate">取消</el-button>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import draggable from 'vuedraggable'

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
  name: 'SettingsXinzengYM',
  components: { Tinymce, draggable },
  props: {
    info: {
      type: Object,
      default: () => {}

    }
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      xqfl: false,
      diedai: '',
      starttime: '',
      endtime: '',
      XuqiuList: []
    }
  },
  computed: {

  },
  created() {

  },
  methods: {
    addxuqiu() {
      this.XuqiuList.push({ value: '' })
    },
    navigate() {
      if (this.info.from === 'quexian') {
        this.$navigate('chuangjianYM_QX')
      } else if (this.info.from === 'diedia') {
        this.$navigate('chuangjianYM_DD')
      } else {
        this.$navigate('chuangjianYM')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.cnt {
    padding-right: 20px;

    .baseinfo {
        padding: 10px;
        background-color: #fafafa;
        border-radius: 4px;
        border: 1px solid #f3f3f3;
        color: #666;
        box-sizing: border-box;
        margin-top: 10px;
        font-size: 13px;
    }
    .item{
        padding: 7px 0 ;
        span {
            color: #f00;
        }
    }
    .tit {
        margin-bottom: 5px;
    }
    .itemtitle {
        margin-top: 35px;
        div{
            font-weight: bold;
            padding-bottom: 5px;
        }
        span {
            color: #999;
        }
    }
    .com_table {
        width: 100%;
        text-align: left;
    }
}

.outer {
    display: flex;
    justify-content: flex-start;
    cursor: move;
    >div {
        height: 33px;
        line-height: 33px;
        border-bottom: 1px solid #efefef;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 10px;
        box-sizing: border-box;
        font-size: 14px;
        color: #3f4a56;
    }
    .radio {
        width: 8%;

    }
    .name {
        width: 60%;
        span{
            cursor: pointer;
        }
        span:hover{
            color: #3582fb;
        }
        .el-select {
            width: 220px;
        }
    }
    .miaoshu {
        width: 8%;
    }
    .caozuo {
        width: 24%;
        i{
            cursor: pointer;
            display: inline-block;
            margin-right: 6px;
            font-size: 16px;
        }
        i:hover{
            color: #3582fb;
        }
    }
}
.settings {
    padding-bottom: 50px;
}
.ziduan {
    .tit {
        padding: 10px 0;
        span {
            color: #3582fb;
            display: inline-block;
            margin-left: 10px;
            font-size: 14px;
            cursor: pointer;
        }
    }
    .el-dropdown-link {
        display: inline-block;
        width: 220px;
        height: 26px;
        padding: 0 10px;
        border:1px solid #b0bac5;
        vertical-align: middle;
        position: relative;
        i {
            position: absolute;
            right: 10px;
            top:6px;
        }
    }
}
.chuangjiannav {
    width: 100%;
    margin-top: 8px;
    border-bottom: 1px solid #dfe6ee;
    line-height: 20px;
    height: 20px;
    padding: 0;
    li {
        display: inline-block;
        height: 100%;
        position: relative;
        // border-bottom: 2px solid #3582fb;
    }
    li.active::after{
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background-color: #3582fb;
        position: absolute;
        bottom: -2px;
        left: 0;
    }
}
.addxuqiu {
    margin-top: 20px;
    .el-input {
        width: 234px;
    }
    span {
        color: #f00;
        display: inline-block;
        margin: 0 10px;
    }
    i {
        font-size: 22px;
        display: inline-block;
        vertical-align: middle;
    }
    .item {
        margin-bottom: 4px;
    }
}
.checkbottom {
    i {
        font-size: 16px;
        display: inline-block;
        margin-left: 12px;
    }
}
</style>
