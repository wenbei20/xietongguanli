<template>
  <div class="settings-chuangjian settings">
    <div class="settings_title fz18">模块设置</div>

    <div class="add">
      <span @click="$navigate('addmokuai')">
        <i class="el-icon-plus" />
        添加模块
      </span>
      <span class="right" @click="innerVisible = true">
        <i class="el-icon-document-copy" />
        复制模块配置至
      </span>
    </div>

    <table class="com_table" cellspacing="0">

      <colgroup>
        <col style="width: 5%;">
        <col style="width: 25%;">
        <col style="width: 25%;">
        <col style="width: 21%;">
        <col style="width: 10%;">
        <col style="width: 14%;">
      </colgroup>
      <thead>
        <tr>
          <th style="padding-left:20px;">
            <el-checkbox v-model="tableAllchecked" />
          </th>
          <th>模块名称</th>
          <th>模块描述</th>
          <th>模块负责人</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
      </thead>

    </table>

    <draggable>
      <transition-group>
        <div v-for="(item,i) in tableData" :key="i" class="outer">
          <div class="radio">
            <span class="settings_moveIcon" />
            <el-checkbox v-model="item.checked" />
          </div>
          <div class="name">
            <span>{{ item.name }}</span>
          </div>
          <div class="miaoshu">
            {{ item.discribe }}
          </div>
          <div class="person">
            {{ item.person }}
          </div>
          <div class="time">
            {{ item.time }}
          </div>
          <div class="caozuo">
            <i class="el-icon-edit-outline" @click="$navigate('editmokuai')" />
          </div>
        </div>
      </transition-group>
    </draggable>

    <el-dialog
      v-el-drag-dialog
      :visible.sync="innerVisible"
      width="40%"
      title="增加字段"
      class="settings_qiyongDialog"
    >

      <div class="copy setting_addmokuai">
        <span>复制方式</span>
        <el-radio-group v-model="copytype">
          <el-radio label="1">
            追加
            <el-tooltip placement="right">
              <div slot="content">追加到目标项目的模块配置中，如果<br>有同名模块则跳过</div>
              <i class="el-icon-question" />
            </el-tooltip>
          </el-radio>
          <el-radio label="2">
            覆盖
            <el-tooltip placement="right">
              <div slot="content">追加到目标项目的模块配置中，如果<br>有同名模块则跳过</div>
              <i class="el-icon-question" />
            </el-tooltip>
          </el-radio>
        </el-radio-group>
      </div>

      <div>
        <div class="tit">选择目标项目</div>
      </div>

      <div>
        <ul class="dialogUl">
          <li v-for="(item , i ) in xiangmu" :key="i" :class="{'last':i===xiangmu.length -1}">
            <el-checkbox v-model="item.checked" />
            {{ item.name }}
          </li>
        </ul>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-row>
          <el-col :span="18" :offset="6">

            <el-button type="primary" @click="innerVisible = false">确 定</el-button>
            <el-button @click="innerVisible = false">取 消</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import elDragDialog from '@/directive/el-drag-dialog'

export default {
  name: 'SettingsChuangjianYM',
  components: { draggable },
  directives: { elDragDialog },
  data() {
    return {
      tableData: [
        { checked: true, name: '系统默认模板', discribe: '系统自动创建', person: 'asd', time: '2020-10-01' },
        { checked: false, name: '测试', discribe: '测试时十四', person: 'asd', time: '2020-10-01' }
      ],
      tableAllchecked: false,
      innerVisible: false,
      xiangmu: [{ name: '轻量团队看板', checked: false }, { name: 'test项目', checked: false }, { name: '敏捷研发管理', checked: false }],
      copytype: '1'

    }
  },
  computed: {

  },
  created() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.tips {
    font-size: 13px;
    color: #999;
    margin:24px 0 ;
    margin-top: 5px;
}
.add {
    color: #3582fb;
    cursor: pointer;
    font-size: 14px;
}
.com_table {
    margin-top: 20px;
    width: 100%;
    text-align: left;
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
        width: 5%;
    }
    .name {
        width: 25%;
        span{
            cursor: pointer;
        }
        span:hover{
            color: #3582fb;
        }
    }
    .miaoshu {
        width: 25%;
    }
    .person {
        width: 21%;
    }
    .time {
        width: 10%;
    }
    .caozuo {
        width: 14%;
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
.add {
    font-size: 13px;
    .right {
        display: inline-block;
        margin-left: 24px;
    }
}
.settings_title {
    margin-bottom: 12px;
}

.el-icon-question {
  color: #6CC23C;
}
.dialogUl {
  padding: 0;
  li {
    list-style: none;
    padding:8px 0 8px 20px;
    line-height: 16px;
  }
}
.copy {
  margin-bottom: 20px;
  .el-radio {
    margin-left: 16px;
    margin-right: 0px;
    font-size: 14px;
  }
}

</style>
