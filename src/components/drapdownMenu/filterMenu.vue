<template>
  <div>
    <div v-if="showMenu" class="filter_menu" :style="{left:left+'px',top:top+'px',right:right+'px',width:width+'px'}">
      <div class="title">
        过滤
        <span class="el-icon-close" @click="close" />
      </div>
      <div class="item">
        <div class="tit">
          标题
          <span class="el-icon-close" />
        </div>
        <el-input placeholder="关键字之间以空格分隔" size="small" />
      </div>

      <div class="item">
        <div class="tit">
          处理人
          <span class="el-icon-close" />
        </div>
        <el-input suffix-icon="el-icon-user" size="small" />
      </div>
      <div v-if="from === 'quexian'" class="item">
        <div class="tit">
          优先级
          <span class="el-icon-close" />
        </div>
        <el-checkbox-group v-model="checkList" class="checkboxs">
          <el-checkbox label="紧急" />
          <el-checkbox label="高" />
          <el-checkbox label="中" />
          <el-checkbox label="低" />
          <el-checkbox label="无关紧要" />
          <el-checkbox label="-空-" />
        </el-checkbox-group>
      </div>
      <div v-if="from === 'xuqiu'" class="item">
        <div class="tit">
          优先级
          <span class="el-icon-close" />
        </div>
        <el-checkbox-group v-model="checkList" class="checkboxs">
          <el-checkbox label="High" />
          <el-checkbox label="Middle" />
          <el-checkbox label="Low" />
          <el-checkbox label="Nice To Have" />
          <el-checkbox label="-空-" />
        </el-checkbox-group>
      </div>

      <div v-if="from === 'quexian'" class="item">
        <div class="tit">
          状态
          <span class="el-icon-close" />
        </div>
        <el-checkbox-group v-model="statusList" class="checkboxs">
          <el-checkbox label="新" />
          <el-checkbox label="接受/处理" />
          <el-checkbox label="已解决" />
          <el-checkbox label="已验证" />
          <el-checkbox label="重新打开" />
          <el-checkbox label="已拒绝" />
          <el-checkbox label="已关闭" />
          <el-checkbox label="-空-" />
        </el-checkbox-group>
      </div>
      <div class="more item Link_disabled_click">
        更多条件
      </div>
      <div class="btn">
        <el-button  size="small">过滤</el-button>
      </div>

    </div>

  </div>

</template>
<script>
export default {
  props: {
    show: {
      type: Boolean
    },
    left: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    },
    right: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 100
    },
    from: {
      type: String,
      default: 'quexian'
    }
  },
  data() {
    return {
      showMenu: false,
      checkList: [],
      statusList: []
    }
  },
  watch: {
    show() {
      this.showMenu = this.show
    }
  },
  methods: {
    close() {
      this.showMenu = false
      this.$emit('update:show', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.filter_menu {
    position: absolute;
    height: calc(100vh - 124px);
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 6px rgba(0,0,0,0.3);
    z-index: 9999;
    .title {
        line-height: 22px;
        color: #3f4a56;
        font-size: 14px;
        span {
            display: block;
            float: right;
            margin-top: 4px;
            font-size: 16px;
            cursor: pointer;
        }
    }
    .item{
        margin-bottom: 20px;
        .tit {
            span {
                display: none;
                float: right;
                margin-top: 12px;
                font-size: 12px;
                cursor: pointer;
            }
        }
        .tit:hover {
            span {
                display: block;
            }
        }
        .checkboxs {
            line-height: 25px;
            .el-checkbox {
                width: 40%;
                line-height: 25px;
            }
        }
    }
    .item.more {
        cursor: pointer;
        color: #3582fb;
    }
    .btn {
        border-top: 1px solid #F0F0F0;
        text-align: right;
        position: absolute;
        bottom: 0;
        left: 20px;
        padding: 20px 0;
        width: calc(100% - 40px);
    }

}
</style>
<style  scoped>
.item >>> .el-input__inner {
    border-radius: 0;
}
</style>
