<template>
  <div class="settings-report settings">
    <div class="settings_title">消息设置</div>

    <infoTable
      title="需求通知"
    />
    <infoTable
      title="缺陷通知"
    />
    <infoTable
      title="看板工作项通知"
    />

    <div class="title">
      每日工作提醒
      <span>相关人于每日早晨收到提醒</span>
    </div>
    <div class="setcnt">
      <el-checkbox v-model="email">邮件接收</el-checkbox>
      <span class="set" @click="dialogVisible = true"><i class="el-icon-setting" /><span>设置提醒内容</span></span>
    </div>

    <el-dialog
      title="设置每日工作提醒（邮件）"
      :visible.sync="dialogVisible"
      class="tixingdialog"
      width="30%"
    >

      <el-row>
        <el-col :span="5"><span class="gznr">工作内容</span></el-col>
        <el-col :span="19">
          <el-checkbox v-model="tixingSelections.daiban" disabled>本周到期，我待办的工作</el-checkbox>
          <el-checkbox v-model="tixingSelections.chuangjian">本周到期，我创建的工作</el-checkbox>
          <el-checkbox v-model="tixingSelections.chaosong">本周到期，抄送我的工作</el-checkbox>
          <el-checkbox v-model="tixingSelections.weiwancheng" disabled>已过期，我未完成的工作</el-checkbox>
          <el-checkbox v-model="tixingSelections.chuangjianGq">已过期，我创建的工作</el-checkbox>
          <el-checkbox v-model="tixingSelections.quexian" disabled>我待处理的缺陷</el-checkbox>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">

        <el-checkbox v-model="tixingSelections.skipjiejia">智能跳过节假日</el-checkbox>

        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import infoTable from './components/table'
export default {
  name: 'SettingsReport',
  components: { infoTable },
  data() {
    return {
      email: true,
      dialogVisible: false,
      tixingSelections: {
        daiban: true,
        chuangjian: false,
        chaosong: false,
        weiwancheng: true,
        chuangjianGq: false,
        quexian: true,
        skipjiejia: true
      }
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
.tablecnt {
  margin-bottom: 55px;
}

.title {
    font-size: 14px;
    font-weight: bold;
    height: 14px;
    line-height: 14px;
    color: #3f4a56;
    margin-bottom: 20px;
    span {
          display: inline-block;
          font-size: 12px;
          color: #8091a5 ;
          vertical-align: middle;
          font-weight: normal;
          margin-left: 40px
    }
}
.setcnt {
  .set {
    font-size: 12px;
    display: inline-block;
    margin-left: 40px;
    cursor: pointer;
    span{
      color: #3582fb;
      display: inline-block;
      margin-left: 4px;
    }
  }
}
</style>
