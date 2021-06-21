<template>
  <div class="settings-xianshi settings">

    <div class="settings_title">启用设置</div>

    <ul class="settings_navlist qiyongsz">
      <li>
        <span>启用需求分类</span>
        <el-switch
          v-model="xuqiu"
        />
      </li>
      <li>
        <span>启用需求和缺陷关联</span>
        <el-switch
          v-model="qiexian"
        />
      </li>
      <li>
        <span>启用快速创建需求</span>
        <el-switch
          v-model="chuangjian"
        />
      </li>
      <li>
        <span>启用移动端状态快速流转</span>
        <el-switch
          v-model="yidong"
        />
      </li>
      <li class="tips">
        <span>复制需求校验模板</span>
        <el-switch
          v-model="fuzhi"
        />
        <div>当需求复制到此项目时必须按模板必填字段填写。</div>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'SettingsQiyongSZ',
  data() {
    return {
      xuqiu: false,
      qiexian: false,
      chuangjian: false,
      yidong: false,
      fuzhi: false
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
.settings_navlist {
    li {
        height: 65px;
        padding: 13px 20px;
        position: relative;

    }
    li.tips {
        height: 86px;
        div{
            color: #999;
            font-size: 12px;
            line-height: 20px;
        }
    }
}

</style>
