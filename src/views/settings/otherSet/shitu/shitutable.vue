<template>
  <div class="settings-chuangjian settings">
    <div v-if="info.from === 'xuqiu'" class="settings_title fz18">需求视图</div>
    <div v-if="info.from === 'diedai'" class="settings_title fz18">迭代视图</div>
    <div v-if="info.from === 'quexian'" class="settings_title fz18">缺陷视图</div>

    <div v-if="info.from === 'xuqiu'" class="add">
      <i class="el-icon-plus" />
      创建需求视图
    </div>

    <div v-if="info.from === 'diedai'" class="add">
      <i class="el-icon-plus" />
      创建迭代视图
    </div>

    <div v-if="info.from === 'quexian'" class="add">
      <i class="el-icon-plus" />
      创建缺陷视图
    </div>

    <table class="com_table" cellspacing="0">

      <colgroup>
        <col style="width: 3%;">
        <col style="width: 8%;">
        <col style="width: 8%;">
        <col style="width: 50%;">
        <col style="width: 8%;">
        <col style="width: 8%;">
        <col style="width: 15%;">
      </colgroup>
      <thead>
        <tr>
          <th />
          <th>默认视图</th>
          <th>启用视图</th>
          <th>视图描述</th>
          <th>视图类型</th>
          <th>创建人</th>
          <th>操作</th>
        </tr>
      </thead>

    </table>

    <draggable>
      <transition-group>
        <div v-for="(item,i) in tableData" :key="i" class="outer">
          <div class="move">
            <span class="settings_moveIcon" />
          </div>
          <div class="radio">
            <el-radio v-model="item.radio" />
          </div>
          <div class="checkbox">
            <el-checkbox v-model="item.checked" />
          </div>
          <div class="miaoshu">
            {{ item.discribe }}
          </div>
          <div class="type">
            <span>{{ item.type }}</span>
          </div>
          <div class="person">
            {{ item.person }}
          </div>
          <div class="caozuo">
            <i class="el-icon-edit-outline" />
            <i class="el-icon-delete" />
          </div>
        </div>
      </transition-group>
    </draggable>

  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'SettingsChuangjianYM',
  components: { draggable },
  props: {
    info: {
      type: Object,
      default: {}

    }
  },
  data() {
    return {
      tableData: [
        { radio: false, type: '系统视图', person: 'system', checked: true, name: '需求', discribe: '所有的' },
        { radio: false, type: '系统视图', person: 'system', checked: false, name: '需求', discribe: '我负责的' },
        { radio: false, type: '系统视图', person: 'system', checked: false, name: '需求', discribe: '我关注的饿' },
        { radio: false, type: '系统视图', person: 'system', checked: false, name: '需求', discribe: '我负责的未完成的' },
        { radio: false, type: '系统视图', person: 'system', checked: false, name: '测试', discribe: '我创建的' },
        { radio: false, type: '系统视图', person: 'system', checked: false, name: '测试', discribe: '所有子需要求' },
        { radio: false, type: '系统视图', person: 'system', checked: false, name: '测试', discribe: '所有父需求' },
        { radio: false, type: '系统视图', person: 'system', checked: false, name: '测试', discribe: '当前迭代下的' },
        { radio: false, type: '系统视图', person: 'system', checked: false, name: '测试', discribe: '规划到迭代中的子需求' },
        { radio: false, type: '系统视图', person: 'system', checked: false, name: '测试', discribe: '魏桂华到迭代中的子需求' },
        { radio: false, type: '系统视图', person: 'system', checked: false, name: '测试', discribe: '待规划需求Backlog' },
        { radio: false, type: '系统视图', person: 'system', checked: false, name: '测试', discribe: '我创建的未完成的' }
      ],
      toEditInfo: {
        isEdit: true
      }
    }
  },
  computed: {

  },
  created() {

  },
  methods: {
    toEdit() {
      this.$navigate('editchuangjian_QX', { isEdit: true })
    }
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
        width: 8%;
    }
    .move{
        width: 3%;
    }
    .checkbox {
        width: 8%;
    }
    .type {
        width: 8%;
    }
    .person {
        width: 8%;
    }
    .miaoshu {
        width: 50%;
    }
    .caozuo {
        width: 15%;
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
    margin-top: 20px;
}

</style>
