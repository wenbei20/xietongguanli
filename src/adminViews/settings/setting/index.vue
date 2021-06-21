<template>
  <div class="settings-setting settings">

    <div class="settings_title">应用设置</div>

    <el-button type="primary" class="addbtn" @click="$navigate('addyingyong')">
      <i class="el-icon-plus" />
      添加应用与排序
    </el-button>

    <div class="navlist">
      <div class="item">
        <div class="img" @click="$navigate('xuqiu')" >
          <svg-icon icon-class="xuqiu" />
        </div>
        <div class="cnt">
          <div class="tit">需求</div>
          <ul>
            <li @click="$navigate('ziduanSZ')">字段设置</li>
            <li @click="$navigate('xianshi')">显示设置</li>
            <li @click="$navigate('gongzuoliu')">工作流设置</li>
            <li @click="$navigate('qiyongSZ')">启动设置</li>
          </ul>
        </div>
        <span class="copy" @click="showCopyDialog = true">复制配置</span>
      </div>
      <div class="item">
        <div class="img" @click="$navigate('quexianSZ')" >
          <svg-icon icon-class="Bugs" />
        </div>
        <div class="cnt">
          <div class="tit">缺陷</div>
          <ul>
            <li @click="$navigate('ziduanSZ_QX')">字段设置</li>
            <li @click="$navigate('xianshiSZ_QX')">显示设置</li>
            <li @click="$navigate('gongzuoliu_QX')">工作流设置</li>
            <li @click="$navigate('qiyongSZ_QX')">启动设置</li>
          </ul>
        </div>
        <span class="copy" @click="showCopyDialog = true">复制配置</span>
      </div>
      <div class="item">
        <div class="img" @click="$navigate('diedai')" >
          <svg-icon icon-class="diedai" />
        </div>
        <div class="cnt">
          <div class="tit">迭代</div>
          <ul>
            <li @click="$navigate('diedaiziduan')">字段设置</li>
            <li @click="$navigate('xianshiSZ_DD')">显示设置</li>
            <li @click="$navigate('diedaijindu')">迭代进度</li>
          </ul>
        </div>
        <span class="copy" @click="showCopyDialog = true">复制配置</span>
      </div>
      <div class="item">
        <div class="img" >
          <svg-icon icon-class="renwu" />

        </div>
        <div class="cnt">
          <div class="tit">任务</div>
          <ul>
            <li >字段设置</li>
          </ul>
        </div>
        <span class="copy">复制配置</span>
      </div>
      <div class="item">
        <div class="img" >
          <svg-icon icon-class="jihua" />
        </div>
        <div class="cnt">
          <div class="tit">测试计划</div>
          <ul>
            <li >字段设置</li>
            <li >显示设置</li>
          </ul>
        </div>
        <span class="copy">复制配置</span>
      </div>
      <div class="item">
        <div class="img" >
          <svg-icon icon-class="yongliceshi" />
        </div>
        <div class="cnt">
          <div class="tit">测试用例</div>
          <ul>
            <li >字段设置</li>
            <li >显示设置</li>
          </ul>
        </div>
        <span class="copy">复制配置</span>
      </div>
    </div>

    <copyDialog
      :dialog-visible.sync="showCopyDialog"
    />

  </div>
</template>

<script>
import copyDialog from '../components/copySettingDialog'
export default {
  name: 'SettingsSetting',
  components: { copyDialog },
  data() {
    return {
      showCopyDialog: false
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
.navlist {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .item {
    height: 99px;
    width: 486px;
    margin: 0 20px 20px 0;
    border: 1px solid #dfe6ee ;
    padding: 10px 10px 10px 10px;
    overflow: hidden;
    position: relative;
    .img {
      float: left;
      height: 79px;
      width: 71px;
      background-color: #f8f8f8;
      margin-right: 20px;
      cursor: pointer;
      text-align: center;
      svg {
        margin-top: 20px;
        width: 40px;
        height: 40px;
      }
    }
    .cnt {
      padding-top: 13px;
      box-sizing: border-box;
      height: 100%;
      padding-left: 91px;
      // float: left;
      .tit {
        font-size: 16px;
        height: 40px;
        color: #3f4a56 ;
        font-weight: bold;
      }
      ul {
        overflow: hidden;
        margin: 0;
        padding: 0;
        width: 100%;
        li{
          list-style: none;
          float: left;
          color: #8091a5;
          cursor: pointer;
          font-size: 14px;
          margin-right: 25px;
        }
        li:hover{
          color: #3582fb;
        }
      }
    }
    .copy {
      display: none;
      color: #8091a5;
      position: absolute;
      top: 8px;
      right: 12px;
      font-size: 14px;
      cursor: pointer;
    }
    .copy:hover {
      color: #3582fb;
    }
  }
  .item:hover .copy {
    display: block;
  }
}
.addbtn {
  margin-bottom: 16px;
  margin-top: 16px;
}
</style>
