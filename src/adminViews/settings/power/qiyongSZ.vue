<template>
  <div class="settings">

    <div class="settings_title fz18">可选设置</div>

    <ul class="settings_navlist qiyongsz">

      <li class="tips">
        <span>允许删除自己创建的业务单</span>
        <el-switch
          v-model="fuzhi"
        />
        <div>需求、缺陷</div>
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
        font-size: 13px;
        > div{
            color: #999;
            font-size: 13px;
            line-height: 20px;
        }
    }
}

</style>
