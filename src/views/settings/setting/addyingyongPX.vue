<template>
  <div class="settings">

    <div class="settings_tips">拖拽可启用或关闭应用</div>

    <div class="cntbox">
      <div class="left">
        <div class="comtit">已启用应用</div>
        <div class="container">
          <div class="subtit">主导航栏</div>
          <div class="mainnav">
            <div v-for="(item ,i) in navlist" :key="i" class="moveitem">
              <span class="settings_moveIcon" />
              {{ item.name }}
              <span class="el-icon-error" />
            </div>

          </div>

          <div class="subtit">更多显示</div>
          <div class="mainnav morenav">
            <div class="moretip">拖动到这里在“更多”中显示应用</div>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="comtit">待启用应用</div>
        <div class="container" />

      </div>
    </div>
    <div class="btns">
      <el-button type="primary" @click="$navigate('setting')">保存</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SettingsXuqiu',
  data() {
    return {
      navlist: [
        { name: '缺陷' },
        { name: '需求' },
        { name: '看板' },
        { name: '故事墙' },
        { name: '报表' },
        { name: '迭代' },
        { name: '文档' }
      ]
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
.copy {
  color: #3582fb ;
  padding-top: 16px;
  font-size: 14px;;
  text-decoration: underline;
  cursor: pointer;
}
.cntbox {
    display: flex;
    .left {
        width: 700px;
        margin-right: 20px;
        .container {
            background: #F5F5F7;
            border-bottom: #D9D9D9;
            position: relative;
            padding: 20px;
        }
        .mainnav {
            white-space: nowrap;
            padding: 15px 10px;
            min-height: 44px;
            position: relative;
            border: 1px solid #e5e5e5;
            background: #fff;

        }
        .subtit {
            color: #999;
            margin: 0 0 10px 0;
            font-size: 14px;
        }
        .morenav {
            height: 440px;
            .moretip {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50% , -50%);
                color: #999;
            }
        }

    }
    .right {
        width: 315px;
        .container {
            height: 616px;
            color: #666;
            background: #F5F5F7;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 20px;
        }
    }
}

.comtit {
    color: #363b42;
    font-weight: bold;
    font-size: 14px;
    padding-left: 20px;
    background: #eaeaea;
    height: 35px;
    line-height: 35px;
}
.settings_tips {
    margin-bottom: 20px;
}
.btns {
    margin-top: 20px;
}

.moveitem {
    display: inline-block;
    width: 80px;
    height: 32px;
    line-height: 32px;
    margin: 5px 0;
    position: relative;
    vertical-align: top;
    cursor: move;
    border-radius: 2px;
    border: 1px solid transparent;
    padding: 0px 5px 0px 0;
    font-size: 14px;
    z-index: 1;
    padding-left: 5px;
    .el-icon-error {
        color: #4076DC;
        font-size: 16px;
        position: absolute;
        right: -8px;
        top: -8px;
        z-index: 999;
        display: none;
        cursor: pointer;
    }
    .settings_moveIcon {
        opacity: 0;
        margin-right: -5px;
    }
}
.item:hover {
        border-color: #3278dd;
        .el-icon-error {
            display: inline-block;
        }
        .settings_moveIcon  {
            opacity: 1;
        }
}
</style>
