<template>
  <div class="board-column">
    <div class="board-column-header">

      <span class="cardTitle" @click="editcardname">
        <b>{{ navName }}</b>
        <i />
        <span>{{ list.length }}</span>
      </span>

      <el-input v-if="EditName" ref="input" v-model="navName" :class="{'err':NameEmpty}" size="small" placeholder="" @blur="saveName" />

      <div class="more">
        <i class="el-icon-more" @click="showmenu" />
        <drapmenu :show.sync="showTopMenu" :width="106">
          <div>修改板块标题</div>
          <div>复制板块</div>
          <div>删除板块</div>
        </drapmenu>

      </div>

    </div>
    <draggable
      :list="list"
      v-bind="$attrs"
      :group="group"
      class="board-column-content"
      :set-data="setData"
      animation="300"
    >
      <div
        v-for="element in list"
        :key="element.id"
        :class="['board-item', element.type]"
      >

        <div class="cnt">
          <div class="title">{{ element.name + element.id }}</div>

          <div v-if="element.descrip" class="descrip">
            {{ element.descrip }}
          </div>

          <div v-if="element.time" class="time">
            <i class="el-icon-time" /> <span>{{ element.time }}</span>
          </div>

          <div class="colorTags">
            <span v-for="(item,idx) in element.tags" :key="idx" :class="item" />
          </div>

          <div v-if="element.count" class="count">
            规模 {{ element.count }}
          </div>
          <div v-if="element.label" class="label">
            <span>{{ element.label }}</span>
          </div>

          <div v-if="element.label" class="moremenu" @click="element.showMenu = !element.showMenu">
            <i class="el-icon-caret-bottom" />
            <drapmenu :show.sync="element.showMenu" :width="106">
              <div>修改名称</div>
              <div>标签</div>
              <div>开始时间</div>
              <div>截至时间</div>
              <div>负责人</div>
              <div>参与人</div>
              <div>移动</div>
              <div>复制</div>
              <div>删除</div>
            </drapmenu>
          </div>

          <el-checkbox v-model="element.checked">{{ "" }}</el-checkbox>
        </div>

      </div>
    </draggable>

    <div v-if="addmoreinfo" class="board-item addmore">
      <div v-if="!addMore" @click="addMore = true">
        <i class="el-icon-plus" />
        <span>添加新的工作项 . . .</span>
      </div>
      <div v-else class="CardAdd">
        <div>
          <el-input ref="addmoreinput" v-model="addInfo.title" :class="{'err':addTitleEmpty}" placeholder="输入新工作项标题" />
        </div>
        <div>
          <i class="el-icon-time" />

          <el-date-picker
            v-model="addInfo.time"
            size="mini"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />

        </div>
        <div>
          <i class="el-icon-user" />

          <el-input ref="addmoreinput" v-model="addInfo.person" size="mini" style="width:200px;" placeholder="负责人" />
        </div>
        <div class="btns">
          <b>添加标签</b>
          <el-button type="primary" size="mini" @click="addItem">确定</el-button>
          <el-button size="mini" @click="cancalAdd">取消</el-button>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import drapmenu from '@/components/drapdownMenu'

export default {
  name: 'DragKanbanDemo',
  components: {
    draggable,
    drapmenu
  },
  props: {
    headerText: {
      type: String,
      default: 'Header'
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    },
    group: {
      type: String,
      default: 'group'
    },
    name: {
      type: String,
      default: ''
    },
    addmoreinfo: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      navName: '',
      NameEmpty: false,
      EditName: false,
      showTopMenu: false,
      addMore: false,
      addInfo: {
        title: '',
        time: '',
        person: ''
      },
      addTitleEmpty: false
    }
  },
  created() {
    this.navName = this.name
  },
  methods: {
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    },
    dragend() {
      // this.$emit('dragEnd', this.list.length)
    },
    saveName() {
      this.NameEmpty = false

      if (!this.navName) {
        this.NameEmpty = true
        return
      } else {
        this.EditName = false
      }
    },
    editcardname() {
      this.EditName = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    showmenu() {
      this.showTopMenu = true
    },
    addItem() {
      this.addTitleEmpty = false
      if (!this.addInfo.title) {
        this.addTitleEmpty = true
        return
      }
    },
    cancalAdd() {
      this.addMore = false
      this.addTitleEmpty = false
    }
  }
}
</script>
<style lang="scss" scoped>
.board-column { width: 280px; height: 100%; border-radius: 3px; margin-right: 10px; flex-shrink: 0;

  .board-column-header { height: 45px; line-height: 50px; padding: 6px; border: 1px solid #D0D0D0; background:#F8F8F8; border-radius: 2px 2px 0 0; position: relative;
    .el-input {
      display: block;
      position: absolute;
      left: 6px;
      top:0px;
      width: 246px;
      height: 32px;
      &.err {
        border-color: #f00;
      }
    }
    .more {
      opacity: 0;
      position: absolute;
      right: 0;
      top: 0px;
      width: 20px;
      height: 100%;
      line-height: 48px;
      i {
        font-size: 16px;
        transform: rotateZ(90deg);
        color: #8091a5;
      }
    }
    .cardTitle{ display: block; height: 32px; line-height: 32px; padding-left: 10px; margin-right: 20px; border-radius: 4px;
      b{
        font-size: 15px;
        color: #3b434d;
      }
      i {
         display: inline-block;
         height: 6px;
         width: 6px;
         background-color: #b0bac5;
         border-radius: 3px;
         vertical-align: middle;
         position: relative;
         top: -2px;
         margin: 0 6px;
      }
      span {
        font-size: 14px;
        color: #b0bac5;
      }
    }
    .cardTitle:hover {
      background: #ECECEC;
    }
  }
  .board-column-header:hover {
    .more {
      opacity: 1;
    }
  }
  .board-column-content{ border: 1px solid #D0D0D0; border-top: none;}
  .board-item {
    cursor: pointer;
    width: calc(100% + 2px);
    min-height: 31px;
    margin-left: -1px;
    margin-bottom: -1px;
    background-color: #fff;
    text-align: left;
    line-height: 31px;
    padding: 5px 10px;
    box-sizing: border-box;
    border:1px solid  #D0D0D0;

    .cnt {
      padding: 0 15px 0 32px;
      position: relative;
      .el-checkbox {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .colorTags {
      span{
          display: inline-block;
          height: 17px;
          line-height: 17px;
          font-size: 12px;
          color: #fff;
          margin: 0 5px 5px 0;
          padding: 0 5px;
          border-radius: 2px;
          min-width: 24px;
          vertical-align: bottom;
      }
      .red {
        background-color: #FC6D65;
      }
      .orange {
        background-color: #FFB166;
      }
      .yellow {
        background-color: #E7BB0E;
      }
      .green {
        background-color: #93C36B;
      }
      .blue {
        background-color: #699BFF;
      }

    }
    .label {
      text-align: right;
      span {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        border-radius: 3px;
        background-color: #acb5c3;
        color: #fff;
        max-width: 70px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding:0 5px;
      }
    }
  }
  .board-item.addmore {
    margin: -1px 0 0 0;
    border-radius:  0 0 2px 2px;
    font-size: 14px; width: 100%;
    i{
      font-size: 16px;
      margin-right: 6px;
    }
    span {
      color: #7b9196;
      opacity: 0;
    }

    .CardAdd {
        >div {
          margin-bottom: 10px;
        }
        .btns {
          padding-top: 10px;
          border-top: 1px solid #ececec;
          text-align: right;
          b {
            display: block;
            float: left;
            font-weight: normal;
            color: #a4a4a4;
          }
        }
    }

  }
  .addmore:hover{
    span{
      opacity: 1;
    }
    background-color: #F5F6F7;
  }
}
// 看板
.board-container{ width: 100%;
  &.diedai{ // （迭代版本）
    .board-column{ margin-right: 20px;
      &-header{ border-bottom: none; background: #fff;}
      &-content{ background: #fff; padding: 0 10px 10px; height: calc(100% - 55px); overflow-y: auto;}
    }
    .board-item { cursor: pointer; width: calc(100% - 10px); min-height: 31px; max-height:100%; margin: 10px 5px; background-color: #fff; text-align: left; line-height: 31px; padding: 5px 10px 10px; box-sizing: border-box; border:1px solid #D0D0D0; box-shadow: none;
      &.new{ border-left: 4px solid #41cc83;}
      &.bug{ border-left: 4px solid #e34949;}
      &.finish{ border-left: 4px solid #ccc;}
      &.abandon{ border-left: 4px solid #ccc;}
      .cnt{ padding-right: 0;}
      .title{ color: #999;}
      .descrip{ font-size: 14px; line-height: 1.5;}
      .time{ color: #ccc;}
      .count{ text-align: right; line-height: 20px;}
    }
  }
  &.storywall{ // （故事墙）
    .board-column{ margin-right: -1px;
    // min-width: 355px;
    width: 25%;
      &-header{ background: #5572e8; text-align: center;
        .cardTitle{
          &:hover{ background: rgba(0, 0, 0, .1);}
          b{ color: #fff;}
          i{ background: rgba(255, 255, 255, .5);}
          span{ color: rgba(255, 255, 255, .5);}
        }
        .more{
          i{ color: rgba(255, 255, 255, .5);}
        }
      }
      &-content{ height: calc(100% - 45px); background: #fff; padding: 10px;}
    }
    .board-item { display: inline-block; width: calc(50% - 5px); vertical-align: top; line-height: 2;
      &:nth-of-type(odd) { margin-right: 10px;}
      &.new{ border-left: 4px solid #41cc83;}
      &.bug{ border-left: 4px solid #e34949;}
      &.finish{ border-left: 4px solid #ccc;}
      &.abandon{ border-left: 4px solid #ccc;}
      .cnt{ padding: 0;}
      .descrip{ color: #5572e8;}
      .time{ color: #ccc;}
      .el-checkbox{ display: none;}
    }
  }
}

.board-item:hover .moremenu{
  opacity: 1;
}
.moremenu {
  position: absolute;
  opacity: 0;
  right: 14px;
  top:4px;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border-radius: 2px;
  border: 1px solid #D0D0D0;
}
</style>
<style scoped>
.el-input.err >>> .el-input__inner {
  border-color: #f00;
}
.CardAdd >>> .el-date-editor {
  width: 200px;
  padding: 3px 3px;
}
.CardAdd >>>  .el-range-separator {
  position: relative;
  top: 1px;
}
</style>

