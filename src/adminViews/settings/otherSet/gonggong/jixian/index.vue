<template>
  <div class="settings-chuangjian settings">
    <div class="settings_title">基线设置</div>

    <div class="settings_tips">
      配置和管理产品项目的基线，支持人工的基线创建。
    </div>

    <div class="add" @click="$navigate('addjixian')">
      <span>
        <i class="el-icon-plus" />
        新增基线
      </span>
    </div>

    <div>
      <span>按状态显示版本：</span>
      <el-select v-model="version" style="width:85px;margin-right:20px" size="mini">
        <el-option label="所有" value="1" />
        <el-option label="未关闭" value="2" />
        <el-option label="已关闭" value="3" />
      </el-select>
      <span>按状态显示版本：</span>
      <el-select v-model="version" style="width:85px;" size="mini">
        <el-option label="所有" value="1" />
        <el-option label="未关闭" value="2" />
        <el-option label="已关闭" value="3" />
      </el-select>
    </div>

    <div class="Setting_btns_blue">

      <el-button size="small">设置为已完成</el-button>
      <el-button size="small">设置为未完成</el-button>
      <el-button size="small">导出列表</el-button>

    </div>

    <table class="com_table" cellspacing="0">

      <colgroup>
        <col style="width: 5%;">
        <col style="width: 30%;">
        <col style="width: 9%;">
        <col style="width: 9%;">
        <col style="width: 9%;">
        <col style="width: 9%;">
        <col style="width: 9%;">
        <col style="width: 9%;">
        <col style="width: 11%;">
      </colgroup>
      <thead>
        <tr>
          <th>
            <el-checkbox v-model="tableAllselect" />
          </th>
          <th>标题</th>
          <th>发布时间</th>
          <th>创建人</th>
          <th>创建时间</th>
          <th>最近更新人</th>
          <th>状态</th>
          <th>版本类型</th>
          <th>操作</th>
        </tr>
      </thead>

    </table>

    <div v-for="(item,i) in tableData" :key="i" class="outer">
      <div class="radio">
        <el-checkbox v-model="item.checked" />
      </div>
      <div class="name">
        <span>{{ item.name }}</span>
      </div>
      <div class="fbtime">
        {{ item.fbtime }}
      </div>
      <div class="person">
        {{ item.person }}
      </div>
      <div class="cjtime">
        {{ item.cjtime }}
      </div>
      <div class="zjgxperson">
        {{ item.zjgxperson }}
      </div>
      <div class="status">
        {{ item.status }}
      </div>
      <div class="banben">
        {{ item.banben }}
      </div>
      <div class="caozuo">
        <i class="el-icon-edit-outline" @click="$navigate('editjixian')" />
      </div>
    </div>

    <div class="Setting_btns_blue">

      <el-button size="small">设置为已完成</el-button>
      <el-button size="small">设置为未完成</el-button>
      <el-button size="small">导出列表</el-button>

    </div>

  </div>
</template>

<script>

export default {
  name: 'SettingsChuangjianYM',
  props: {
    info: {
      type: Object,
      default: {}

    }
  },
  data() {
    return {
      tableAllselect: false,
      tableData: [
        { checked: true, name: '系统默认模板', fbtime: '2020-08-02', person: 'admin', cjtime: '2020-09-07', zjgxperson: 'test', status: '正常版本', banben: '创建' },
        { checked: false, name: '测试', fbtime: '2020-08-02', person: 'admin', cjtime: '2020-09-07', zjgxperson: 'test', status: '正常版本', banben: '四' }
      ],
      toEditInfo: {
        isEdit: true
      },
      version: '1'
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
        width: 5%;
    }
    .name {
        width: 30%;
        span{
            cursor: pointer;
        }
        span:hover{
            color: #3582fb;
        }
    }
    .fbtime {
        width: 9%;
    }
    .person {
        width: 9%;
    }
    .cjtime {
        width: 9%;
    }
    .zjgxperson {
        width: 9%;
    }
    .status {
        width: 9%;
    }
    .banben {
        width: 9%;
    }
    .caozuo {
        width: 11%;
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
    padding: 16px 0;
}
.guolvbtn {
    display: inline-block;
    height: 29px;
    padding: 0 12px;
    line-height: 29px;
    border: 1px solid #cdd0d1;
    background-color: #f6f6f6;
    font-size: 14px;
    position: relative;
    top: 2px;
    margin-left: 10px;
    cursor: pointer;
}
.guolvbtn:active {
    background-color: #E9E9E9;
    background-image: linear-gradient(to bottom, #EAEAEA, #E5E5E5);
    border: 1px solid #BBBEBF;
    box-shadow: inset 0 2px 3px #cdd0d1;
    color: #363b42;
}
.guolvbtn.isGuolv {
    height: 35px;
    top: 2px;
    border-bottom: none;
}
.garyarea {
    padding: 18px 0 10px 92px;
    margin-top: 1px;
    background-color: #f8f8f8;
    >div {
        margin-bottom: 30px;
    }
}

.Setting_btns_blue {
    margin-top: 20px;
}
</style>
