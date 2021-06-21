<template>
  <div class="app-container documentation-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">

        <div class="content">

          <div class="tags">
            <span :class="{'active':active.first === 1}" @click="active.first = 1">项目<i>1</i></span>
            <span :class="{'active':active.first === 2}" @click="active.first = 2">产品<i>0</i></span>
            <span :class="{'active':active.first === 3}" @click="active.first = 3">年度批次<i>1</i></span>
          </div>

          <div class="cards">

            <div class="btns">
              <el-radio-group v-model="statusNav" size="medium">
                <el-radio-button label="全部（22个）" />
                <el-radio-button label="进行中（12个）" />
                <el-radio-button label="已完成（10个）" />
              </el-radio-group>
            </div>

            <div class="add" @click="showCreate = true">
              <div>
                <i class="el-icon-plus" /><br>
                <span>创建项目</span>
              </div>
            </div>
            <div class="item">
              <div class="tit">
                <div>中行外汇结算接口应用</div>
              </div>
            </div>
            <div class="item">
              <div class="tit">
                <div>BI分析数据中心支撑平台</div>
              </div>
            </div>
            <div class="item">
              <div class="tit">
                <div>客户关系CRM系统</div>
              </div>
            </div>
            <div class="item">
              <div class="tit">
                <div>中行移动端APP研发二期</div>
              </div>
            </div>
          </div>

        </div>
      </el-tab-pane>
      <el-tab-pane label="我加入的" name="second">

        <div class="content">
          <div class="tags">
            <span :class="{'active':active.second === 1}" @click="active.second = 1">项目<i>1</i></span>
            <span :class="{'active':active.second === 2}" @click="active.second = 2">产品<i>0</i></span>
            <span :class="{'active':active.second === 3}" @click="active.second = 3">年度批次<i>1</i></span>
          </div>

          <div class="cards">
            <div class="add" @click="showCreate = true">
              <div>
                <i class="el-icon-plus" /><br>
                <span>创建项目</span>
              </div>
            </div>
            <div class="item">
              <div class="tit">
                <div>巡检管理软件V3.0_P19010</div>
              </div>
            </div>
            <div class="item">
              <div class="tit">
                <div>移动作业监控软件</div>
              </div>
            </div>
            <div class="item">
              <div class="tit">
                <div>硬件研发缺陷管理</div>
              </div>
            </div>
            <div class="item">
              <div class="tit">
                <div>测试部日常管理</div>
              </div>
            </div>
          </div>

        </div>
      </el-tab-pane>
      <el-tab-pane label="我创建的" name="third">

        <div class="content">
          <div class="tags">
            <span :class="{'active':active.third === 1}" @click="active.third = 1">项目<i>1</i></span>
            <span :class="{'active':active.third === 2}" @click="active.third = 2">产品<i>0</i></span>
            <span :class="{'active':active.third === 3}" @click="active.third = 3">年度批次<i>1</i></span>
          </div>

          <div class="cards">
            <div class="add" @click="showCreate = true">
              <div>
                <i class="el-icon-plus" /><br>
                <span>创建项目</span>
              </div>
            </div>
            <div class="item">
              <div class="tit">
                <div>巡检管理软件V3.0_P19010</div>
              </div>
            </div>
            <div class="item">
              <div class="tit">
                <div>移动作业监控软件</div>
              </div>
            </div>
            <div class="item">
              <div class="tit">
                <div>硬件研发缺陷管理</div>
              </div>
            </div>
            <div class="item">
              <div class="tit">
                <div>测试部日常管理</div>
              </div>
            </div>
          </div>

        </div>
      </el-tab-pane>
    </el-tabs>

    <createPro :dialog-visible.sync="showCreate" />
  </div>
</template>

<script>
import createPro from './components/createProDialog'

export default {
  name: 'Project',
  components: { createPro },
  data() {
    return {
      activeName: 'first',
      showCreate: false,
      active: {
        first: 1,
        second: 1,
        third: 1
      },
      statusNav: '全部（22个）'

    }
  },
  mounted() {
    const allitem = document.querySelectorAll('.cards .item')
    allitem.forEach(item => {
      item.onclick = () => {
        this.$router.push({ name: 'Baseinfo' })
      }
    })
  },
  methods: {
    handleClick() {
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    background-color: #fff;
  }
  .tags {
    float: left;
    padding: 30px 0;
    width: 226px;
    span {
      display: inline-block;
      height: 44px;
      margin-bottom: 12px;
      width: 100%;
      cursor: default;
      height: 36px;
      line-height: 36px;
      padding:  0 16px;
      font-size: 14px;
      color: rgb(34, 27, 27);
      border-radius: 4px;
      color: #978998;
      cursor: pointer;
      i {
        font-style: normal;
        float: right;
        color: #978998;
      }
    }
    .active{
      background-color: #F5F9FF;
      color: #398BF7;
    }
  }
  .cards {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: calc(100% - 256px);
    margin-left: 256px;
    padding-top: 30px;
    .btns {
      width: 100%;
      margin-bottom: 20px;

    }
    .btns:after {
      display: none !important;
    }
    >div:not(.btns) {
      width: 240px;
      height: 130px;
      border-radius: 4px;
      margin-right: 20px;
      cursor: pointer;
      margin-bottom: 16px;
      position: relative;
      overflow: hidden;
      >div {
        position: relative;
        z-index: 1;
      }
    }
    >div:not(.add) {

    }
    >div:not(.add):after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 100%;
      height: 100%;
      background: url('../../assets/setting/project_bg.png') no-repeat;
      background-size: cover;
      background-position: center;
      transition: all linear 0.2s;

    }
    >div:not(.add):hover:after {
      transform: translate(-50%,-50%) scale(1.2);
    }
    .add {
      border:1px solid #ccc;
      text-align: center;
      >div {
        padding-top: 36px;
        i {
          font-size: 30px;
        }
        span {
          font-size: 14px;
          line-height: 30px;
        }
      }
    }
    .item {
        background-color: #666;
        color: #fff;
        .tit {
          padding: 20px 0 0 20px;
          color: #fff;
          font-size: 16px;
        }
    }
  }
</style>
<style scoped>
.app-container >>> .el-tabs__item {
  font-size: 14px;
}
.app-container >>> .el-tabs__nav-wrap::after {
  width: 800px;
}
</style>
