<template>
  <div class="tablecnt">
    <div class="title">
      <h3>{{ title }}</h3>
      <span @click="addtongzhi">
        <i class="el-icon-plus" />
        创建新通知
      </span>
    </div>
    <table class="com_table" cellspacing="0">
      <colgroup>
        <col style="width: 239px;">
        <col style="width: 425px;">
        <col style="width: 230px;">
        <col style="width: 106px;">
      </colgroup>
      <thead>
        <tr>
          <th>事件</th>
          <th>接收人</th>
          <th>接收方式</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <!--  新增 -->
        <tr v-if="showAdd" v-loading="addLoading" class="thisAdd">
          <td>
            <el-dropdown trigger="click" placement="bottom-start">
              <span class="el-dropdown-link">
                {{ addData.event.length ? addEvent : '选择事件' }}<i class="el-icon-arrow-down el-icon--right" />
              </span>

              <el-dropdown-menu slot="dropdown" class="com_dropdownmenu">
                <el-checkbox-group v-model="addData.event">
                  <el-checkbox label="创建" />
                  <el-checkbox label="更新" />
                  <el-checkbox label="状态变更" />
                  <el-checkbox label="删除" />
                  <el-checkbox label="评论" />
                </el-checkbox-group>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
          <td class="editable">
            <el-dropdown trigger="click" placement="bottom-start">
              <span class="el-dropdown-link">
                {{ addData.person.length ? addPerson : '接收人' }}<i class="el-icon-arrow-down el-icon--right" />
              </span>

              <el-dropdown-menu slot="dropdown" class="com_dropdownmenu">
                <el-checkbox-group v-model="addData.person">
                  <el-checkbox label="操作发起人" />
                  <el-checkbox label="负责人" />
                  <el-checkbox label="参与人" />
                  <el-checkbox label="创建人" />
                </el-checkbox-group>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
          <td class="editable">
            <el-dropdown trigger="click" placement="bottom-start">
              <span class="el-dropdown-link">
                {{ addData.receive.length ? addReceive : '接收方式' }}<i class="el-icon-arrow-down el-icon--right" />
              </span>

              <el-dropdown-menu slot="dropdown" class="com_dropdownmenu">
                <el-checkbox-group v-model="addData.receive">
                  <el-checkbox label="邮件" />
                  <el-checkbox label="公众号" />
                  <el-checkbox label="站内信" />
                </el-checkbox-group>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
          <td>
            <el-button type="primary" @click="Addinfo">添加</el-button>
            <el-button @click="cancalAdd">取消</el-button>
          </td>
        </tr>

        <!--  展示 -->
        <tr v-for="(item,idx) in tableData" :key="idx" class="notadd">
          <td class="editable">
            <el-dropdown trigger="click" placement="bottom-start">
              <span v-if="item.event.length" class="el-dropdown-link">
                {{ item.event | joinstring }}<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <span v-else class="el-dropdown-err">
                必须选择一项
              </span>
              <el-dropdown-menu slot="dropdown" class="com_dropdownmenu">
                <el-checkbox-group v-model="item.event">
                  <el-checkbox label="创建" />
                  <el-checkbox label="更新" />
                  <el-checkbox label="状态变更" />
                  <el-checkbox label="删除" />
                  <el-checkbox label="评论" />
                </el-checkbox-group>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
          <td class="editable">
            <el-dropdown trigger="click" placement="bottom-start">
              <span v-if="item.person.length" class="el-dropdown-link">
                {{ item.person | joinstring }}<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <span v-else class="el-dropdown-err">
                必须选择一项
              </span>
              <el-dropdown-menu slot="dropdown" class="com_dropdownmenu">
                <el-checkbox-group v-model="item.person">
                  <el-checkbox label="操作发起人" />
                  <el-checkbox label="负责人" />
                  <el-checkbox label="参与人" />
                  <el-checkbox label="创建人" />
                </el-checkbox-group>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
          <td class="editable">
            <el-dropdown trigger="click" placement="bottom-start">
              <span v-if="item.receive.length" class="el-dropdown-link">
                {{ item.receive | joinstring }}<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <span v-else class="el-dropdown-err">
                必须选择一项
              </span>
              <el-dropdown-menu slot="dropdown" class="com_dropdownmenu">
                <el-checkbox-group v-model="item.receive">
                  <el-checkbox label="邮件" />
                  <el-checkbox label="公众号" />
                  <el-checkbox label="站内信" />
                </el-checkbox-group>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
          <td>
            <i class="el-icon-delete delete" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  filters: {
    joinstring(value) {
      return value.join('|')
    }
  },
  props: {
    title: {
      type: String
    }
    // tableData:{
    //     type:Array,
    // }
  },
  data() {
    return {
      tableData: [
        { event: ['创建'], person: ['操作发起人'], receive: ['邮件'] }
      ],
      showAdd: false,
      addData: {
        event: [],
        receive: [],
        person: []
      },
      addLoading: false
    }
  },
  computed: {
    addEvent() {
      return this.addData.event.join('|')
    },
    addReceive() {
      return this.addData.receive.join('|')
    },
    addPerson() {
      return this.addData.person.join('|')
    }
  },
  methods: {
    addtongzhi() {
      this.showAdd = true
    },
    cancalAdd() {
      this.showAdd = false
      this.addData = { event: [], receive: [], person: [] }
    },
    Addinfo() {
      // 验证

      this.$emit('addItem', this.addData)
    }
  }
}
</script>
<style lang="scss" scoped>
.tablecnt {
    width: 1000px;
    .title {
        h3 {
            display: inline-block;
            margin-right: 30px;
            font-size: 14px;
        }
        span {
            color: #3582fb;
            cursor: pointer;
            font-size: 14px;
        }
    }
    >>> .el-checkbox {
        display: block;
    }
}
</style>
