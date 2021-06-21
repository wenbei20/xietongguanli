<template>
  <div class="settings-chuangjian settings">
    <div class="settings_title fz18">成员设置</div>

    <div class="addperson">
      <el-button type="primary" @click="showAddPerson = true">
        <i class="el-icon-plus" />添加成员
      </el-button>
    </div>

    <div class="options">
      <el-row>
        <el-col :span="1">
          <span class="yhz">用户组</span>
        </el-col>
        <el-col :span="22">
          <div>

            <span v-for="(item , i) in groupList" :key="i" class="spanouter">
              <span :class="{'active':activeTagidx === i}" @click="changeActive(i)"> {{ item.name }}({{ item.num }}) </span>
            </span>
          </div>
        </el-col>
        <el-col :span="1">
          <i class="el-icon-setting" />
        </el-col>
      </el-row>
    </div>

    <table class="com_table" cellspacing="0">

      <colgroup>
        <col style="width: 5%;">
        <col style="width: 10%;">
        <col style="width: 8%;">
        <col style="width: 10%;">
        <col style="width: 4%;">
        <col style="width: 12%;">
        <col style="width: 18%;">
        <col style="width: 11%;">
        <col style="width: 6%;">
      </colgroup>
      <thead>
        <tr>
          <th>
            <el-checkbox v-model="allchecked" />
          </th>
          <th>成员昵称</th>
          <th>真实姓名</th>
           <th>职位</th>
          <th>性别</th>
           <th>部门</th>
          <th>邮箱</th>
          <th>用户组</th>
          <th>状态</th>
        </tr>
      </thead>
      <tbody style="width:100%">
        <tr v-for="(item,i) in tableData" :key="i" class="td">
          <td class="moretd">
            <el-checkbox v-model="item.checked" />
            <i class="el-icon-more" @click="item.showmenu = true" />
            <div v-if="item.showmenu" class="menu">
              <ul>
                <li>设为主管理员</li>
                <li>编辑成员</li>
                <li>移除项目</li>
              </ul>
              <div class="dialog" @click="item.showmenu = false" />
            </div>
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.realname }}</td>
          <td>{{ item.bumen }}</td>
          <td>{{ item.xinb }}</td>
          <td>{{ item.zhiw }}</td>
          <td>{{ item.youx }}</td>
          <td>{{ item.yongh }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>

    </table>

    <!-- <div v-for="(item,i) in tableData" :key="i" class="outer" >
                <div class="radio">
                    <el-checkbox v-model="item.checked"></el-checkbox>
                </div>
                <div class="name">
                    <span>{{item.name}}</span>
                </div>
                <div class="miaoshu">
                    {{item.discribe}}
                </div>
                <div class="caozuo">
                    <i class="el-icon-edit-outline" @click="toEdit" v-if="info.from === 'quexian'"></i>
                    <i class="el-icon-edit-outline" v-else></i>
                    <i class="el-icon-document-copy"></i>
                    <i class="el-icon-delete"></i>
                </div>
            </div> -->
    <addPerson
      :dialog-visible.sync="showAddPerson"
    />
  </div>
</template>

<script>
import addPerson from '../components/addPersonDialog'

export default {
  name: 'SettingsChuangjianYM',
  components: {
    addPerson
  },
  props: {
    info: {
      type: Object,
      default: {}

    }
  },
  data() {
    return {
      tableData: [
        { checked: false, name: '丁枉桓', realname: '枉桓', bumen: '产品经理', xinb: '男', zhiw: '软件技术部', youx: 'dingwanghuan@qq.com', yongh: '普通员工-研发', status: '在职', showmenu: false },
        { checked: false, name: '代海涛', realname: '海涛', bumen: 'android开发', xinb: '男', zhiw: '软件技术部', youx: 'daihaitao@qq.com', yongh: '普通员工-研发', status: '在职', showmenu: false },
        { checked: false, name: '何文龑', realname: '文龑', bumen: '	实施工程师', xinb: '男', zhiw: '软件技术部', youx: 'hewenyan@qq.com', yongh: '普通员工-研发', status: '在职', showmenu: false },
        { checked: false, name: '党增博', realname: '增博', bumen: '技术副总监', xinb: '男', zhiw: '软件技术部', youx: '	dangzengbo@qq.com', yongh: '普通员工-研发', status: '在职', showmenu: false },
        { checked: false, name: '刘保德', realname: '保德', bumen: '项目经理', xinb: '男', zhiw: '软件技术部', youx: 'liubaode@qq.com', yongh: '普通员工', status: '在职', showmenu: false },
        { checked: false, name: '卓玉保', realname: '玉保', bumen: '实施工程师', xinb: '男', zhiw: '软件技术部', youx: 'zhuoyubao@qq.com', yongh: '普通员工', status: '在职', showmenu: false },
        { checked: false, name: '吕静静', realname: '静静', bumen: '软件测试工程师', xinb: '男', zhiw: '软件技术部', youx: 'lvjingjing@qq.com', yongh: '普通员工', status: '在职', showmenu: false },
        { checked: false, name: '孙阳阳', realname: '阳阳', bumen: '常务副总经理', xinb: '女', zhiw: '软件技术部', youx: 'sunyangyang@qq.com', yongh: '普通员工-测试', status: '在职', showmenu: false },
        { checked: false, name: '季文彬', realname: '文彬', bumen: '总工程师', xinb: '女', zhiw: '软件技术部', youx: 'jiwenbin@qq.com', yongh: '普通员工-测试', status: '在职', showmenu: false },
        { checked: false, name: '安野', realname: '安野', bumen: 'UI设计师', xinb: '女', zhiw: '软件技术部', youx: 'anye@qq.com', yongh: '普通员工-前端', status: '在职', showmenu: false },
        { checked: false, name: '张展', realname: '张展', bumen: 'android开发', xinb: '女', zhiw: '软件技术部', youx: 'zhangzhan@qq.com', yongh: '普通员工', status: '在职', showmenu: false },
        { checked: false, name: '张笑笑', realname: '笑笑', bumen: '实施工程师', xinb: '女', zhiw: '软件技术部', youx: 'zhangxiaoxiao@qq.com', yongh: '普通员工', status: '在职', showmenu: false },
        { checked: false, name: '徐盼飞', realname: '盼飞', bumen: '销售副总监', xinb: '女', zhiw: '软件技术部', youx: 'xupanfei@qq.com', yongh: '普通员工', status: '在职', showmenu: false },
        { checked: false, name: '朱永见', realname: '永见', bumen: '产品经理', xinb: '女', zhiw: '软件技术部', youx: 'caoning@qq.com', yongh: '普通员工', status: '在职', showmenu: false },
      ],
      toEditInfo: {
        isEdit: true
      },
      groupList: [
        { name: '所有', num: '43' },
        { name: '管理员', num: '5' },
        { name: '普通成员', num: '37' },
        { name: '研发', num: '8' },
        { name: '测试', num: '3' },
        { name: '销售', num: '0' },
        { name: '工程', num: '10' },
        { name: '产品', num: '3' }
      ],
      allchecked: false,
      activeTagidx: 0,
      showAddPerson: false

    }
  },
  computed: {

  },
  created() {

  },
  methods: {
    toEdit() {
      this.$navigate('editchuangjian_QX', { isEdit: true })
    },
    changeActive(e) {
      this.activeTagidx = e
    }
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
    cursor: move;
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
    .miaoshu {
        width: 50%;
    }
    .caozuo {
        width: 15%;
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

.com_table {
    th {
        text-align: left;
        font-size: 14px;
    }
    td {
        text-align: left;
        padding: 8px 10px;
        font-size: 14px;
    }
}
.el-icon-more {
    transform: rotateZ(90deg);
    margin-left: 10px;
    position: relative;
    top: 2px;
    color: #8091a5;
    display: none;
}
.td:hover {
    .el-icon-more {
        display: inline-block;
    }
}
.addperson {
    margin: 20px 0;
}
.options {
    padding-left: 24px;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #fafafa;
    margin-bottom: -20px;
    .yhz {
        font-size: 14px;
        color: #666;
       line-height: 32px;
    }
    .el-icon-setting {
        font-size: 32px;
        color: #aaa;
        margin-top: 30px;
    }
    .spanouter {
        display: inline-block;
        width: 186px;
        span {
            display: inline-block;
            padding: 0 8px;
            height: 34px;
            line-height: 34px;
            font-size: 14px;
            cursor: pointer;
            margin-bottom: 8px;
            color: #4d7db7;
        }
        span:hover {
            background-color: #e1eaf8;
        }
        .active {
            color: #4f8ff5;
            background-color: #e1eaf8;
        }
    }
}
.moretd {
    position: relative;
    .menu {
        position: absolute;
        // width: ;
        .dialog {
            position: fixed;
            top:0;
            left: 0;
            right: 0;
            bottom: 0;
            // background-color: rgba(0,0,0,.2);
            z-index: 1002;
        }
        ul {
            position: absolute;
            background-color: #fff;
            z-index: 1003;
            padding: 5px 0;
            box-shadow: 0 0 6px rgba(0,0,0,0.3);
            left: 36px;
            top: -10px;
            li {
                white-space: nowrap;
                list-style: none;
                padding: 0 15px;
                line-height: 2.4;
                cursor: pointer;
            }
            li:hover {
                background-color: #eaf2ff;
                color: #5d9bfc;
            }
        }
    }
}

</style>
