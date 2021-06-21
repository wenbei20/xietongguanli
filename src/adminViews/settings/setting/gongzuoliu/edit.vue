<template>
  <div class="settings">
    <div class="steps">

      <div :class="{select: step > 0}">
        <span class="num">1</span>
        <span class="text">基本信息</span>
        <i />
        <b />
      </div>

      <div :class="{select: step > 1}">
        <span class="num">2</span>
        <span class="text">状态定义</span>
        <i />
        <b />
      </div>

      <div :class="{select:step === 3}">
        <span class="num">3</span>
        <span class="text">流转设置</span>

      </div>

    </div>

    <div v-if="step === 1" class="container">
      <div class="tit">选择创建方式</div>

      <div class="cnt">
        <div style="margin-bottom:12px;">
          <el-radio v-model="chuangjian" label="1">通过模板创建</el-radio>
          <el-select v-model="moban" size="small">
            <el-option label="system workflow" value="1" />
          </el-select>
          <i>[预览]</i>
          <div class="img" />
        </div>
        <div>
          <el-radio v-model="chuangjian" label="2">直接创建</el-radio>
        </div>
      </div>

      <div class="tit">工作流基本信息</div>

      <div class="infocnt">
        <div>
          <div class="name">工作流名称<span>*</span></div>
          <div>
            <el-input v-model="name" size="small" style="width:422px;" />
          </div>
        </div>

        <div>
          <div class="name">工作流说明</div>
          <div>
            <el-input v-model="shuoming" type="textarea" style="width:422px;" />
            <div class="btns">
              <el-button size="small" type="primary" @click="moveNext">保存&下一步</el-button>
              <el-button size="small" @click="navigate">取消</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="step === 2" class="container2">

      <div class="settings_title fw">状态定义</div>
      <div class="tips">支持添加、编辑和删除工作流状态。</div>

      <div class="add" @click="innerVisible = true">
        <i class="el-icon-plus" />
        添加状态
      </div>

      <table class="com_table" cellspacing="0">

        <colgroup>
          <col style="width: 20%;">
          <col style="width: 30%;">
          <col style="width: 10%;">
          <col style="width: 10%;">
          <col style="width: 30%;">
        </colgroup>
        <thead>
          <tr>
            <th>状态别名</th>
            <th>状态说明</th>
            <th>起始状态
              <el-tooltip class="item" effect="dark" placement="right">

                <div slot="content">
                  {{ info.from | statusTooltip }}的起始状态
                </div>
                <i class="el-icon-question" style="color:ABBFE3" />
              </el-tooltip>
            </th>
            <th>结束状态
              <el-tooltip class="item" effect="dark" placement="right">
                <div slot="content">
                  {{ info.from | statusTooltip }}的终结状态，在此状态的{{ info.from | statusTooltip }}<br>
                  在列表展现为灰色，并不会出现在<br>
                  每日工作提醒邮件中。
                </div>
                <i class="el-icon-question" style="color:ABBFE3" />
              </el-tooltip>

            </th>
            <th>操作</th>
          </tr>
        </thead>

      </table>

      <draggable>
        <transition-group>
          <div v-for="(item,i) in tableData" :key="i" class="outer">
            <div class="radio">
              <span class="settings_moveIcon" />
              {{ item.name }}
            </div>
            <div class="name">
              <span>{{ item.discribe }}</span>
            </div>
            <div class="miaoshu">
              <el-radio v-model="qishistatus" :label="item.qishi">{{ "" }}</el-radio>
            </div>
            <div class="jieshu">
              <el-checkbox v-model="item.jieshu" />
            </div>
            <div class="caozuo">
              <i class="el-icon-edit-outline" />
              <i class="el-icon-close" />
            </div>
          </div>
        </transition-group>
      </draggable>

      <div class="btns">
        <el-button size="small" @click="moveNext">保存&下一步</el-button>
        <el-button size="small" @click="step = 1">取消</el-button>
      </div>

    </div>

    <div v-if="step === 3" class="container2">
      <div class="settings_title fw">流转设置</div>
      <div class="tips">工作流流转设置，是设置工作流各状态间的先后流转关系。如果需要设置该流转，请在两个状态间的复选框内打勾。</div>

      <table class="com_table" cellspacing="0">

        <colgroup>
          <col style="width: 16%;">
          <col style="width: 12%;">
          <col style="width: 12%;">
          <col style="width: 12%;">
          <col style="width: 12%;">
          <col style="width: 12%;">
          <col style="width: 12%;">
          <col style="width: 12%;">
        </colgroup>
        <thead>
          <tr>
            <th />
            <th>新</th>
            <th>接受/处理</th>
            <th>已解决</th>
            <th>已验证</th>
            <th>重新打开</th>
            <th>已拒绝</th>
            <th>已关闭</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in liuzhuan" :key="i">
            <td>{{ item.label }}</td>
            <td>
              <el-checkbox label="" />
              <span class="moreBtn" @click="showGongzuoliu = true">
                <svg-icon icon-class="banshou" />
              </span>
            </td>
            <td>
              <el-checkbox label="" />
            </td>
            <td>
              <el-checkbox label="" />
            </td>
            <td>
              <el-checkbox label="" />
              <span class="moreBtn" @click="showGongzuoliu = true">
                <svg-icon icon-class="banshou" />
              </span>
            </td>
            <td>
              <el-checkbox label="" />
            </td>
            <td>
              <el-checkbox label="" />
            </td>
            <td>
              <el-checkbox label="" />
            </td>
          </tr>
        </tbody>

      </table>

      <div class="btns">
        <el-button size="small" type="primary" @click="navigate">保存</el-button>
        <el-button size="small" @click="navigate">取消</el-button>
      </div>
    </div>

    <el-dialog
      v-el-drag-dialog
      :visible.sync="innerVisible"
      width="40%"
      title="增加字段"
      class="settings_Dialog"
    >

      <!-- <el-row>
      <el-col :span="5" class="left">
        <div class="tit">状态原名<span>*</span> ：</div>
      </el-col>
      <el-col :span="19">
        <el-input v-model="dialoginfo.name" placeholder="" size="small " style="width:168px;" /><br>
        <div class="settings_tips">状态原名是状态的唯一标识。</div>
      </el-col>
    </el-row> -->

      <el-row>
        <el-col :span="5" class="left">
          <div class="tit">状态原名 <span>*</span> ：</div>
        </el-col>
        <el-col :span="19">
          <el-select v-model="dialoginfo.name" placeholder="请选择" size="small" style="width:168px;">
            <el-option key="1" label="新" value="1" />
            <el-option key="2" label="接受/处理" value="2" />
            <el-option key="3" label="已解决" value="3" />
            <el-option key="4" label="已验证" value="4" />
          </el-select>
          <br>
          <div class="settings_tips">状态原名是状态的唯一标识。</div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="5" class="left">
          <div class="tit">状态别名<span>*</span> ：</div>
        </el-col>
        <el-col :span="19">
          <el-input v-model="dialoginfo.othername" placeholder="" size="small " style="width:168px;" /><br>
          <div class="settings_tips">状态名称是显示在页面上的名字，最多输入28个字符。</div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="5" class="left">
          <div class="tit">状态说明：</div>
        </el-col>
        <el-col :span="19">
          <el-input v-model="dialoginfo.tips" type="textarea" size="small" style="width:449px;" /><br>
          <div class="settings_tips">最多可以输入512个字符</div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-row>
          <el-col :span="18" :offset="6">

            <el-button type="primary" @click="innerVisible = false">确 定</el-button>
            <el-button @click="innerVisible = false">取 消</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  <gongzuoliuDialog 
    :dialogVisible.sync='showGongzuoliu'
  />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import elDragDialog from '@/directive/el-drag-dialog'
import gongzuoliuDialog from '../../components/gongzuoliuDialog'

export default {
  components: { draggable ,gongzuoliuDialog },
  directives: { elDragDialog },
  filters: {
    statusTooltip(e) {
      switch (e) {
        case 'quexian' :
          return '缺陷'
          break

        case 'quexianAdd':
          return '缺陷'
          break
        default :
          return '需求'
          break
      }
    }
  },
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      step: 1,
      showGongzuoliu:false,
      chuangjian: '1',
      moban: '1',
      name: '',
      shuoming: '',
      qishistatus: '2',
      tableData: [
        { name: '实现中', discribe: '', qishi: '1', jieshu: false },
        { name: '规划中', discribe: '', qishi: '2', jieshu: false },
        { name: '已实现', discribe: '', qishi: '3', jieshu: false },
        { name: '已拒绝', discribe: '', qishi: '4', jieshu: false }
      ],

      liuzhuan: [
        { label: '从【规划中】可流转到' },
        { label: '从【接受/处理】可流转到' },
        { label: '从【已解决】可流转到' },
        { label: '从【已验证】可流转到' },
        { label: '从【重新打开】可流转到' },
        { label: '从【已拒绝】可流转到' },
        { label: '从【已关闭】可流转到' }

      ],
      innerVisible: false,
      dialoginfo: {
        name: '',
        othername: '',
        tips: ''
      }
    }
  },
  computed: {

  },
  created() {

  },
  methods: {
    moveNext() {
      if (this.step === 3) {
        this.step = 1
      } else {
        this.step++
      }
    },
    navigate() {
      if (this.info.from === 'quexian' || this.info.from === 'quexianAdd') {
        this.$navigate('gongzuoliu_QX')
      } else {
        this.$navigate('gongzuoliu')
      }
    }
  }
}
</script>
<style lang="scss" scoped>

.steps {
    display: flex;
    padding-top: 10px;
    padding-left: 15px;
    padding-bottom: 26px;
    border-bottom: 1px solid #dfe6ee;

    >div {
        position: relative;
        padding-right: 60px;
        .num {
            width: 20px;
            height: 20px;
            display: inline-block;
            color: #fff;
            text-align: center;
            vertical-align: top;
            border-radius: 10px;
            margin-top: 2px;
            background-color: #8091a5;
            margin-right: 5px;
        }
        .text {
            font-size: 16px;
            color: #3f4a56;
            display: inline-block;
        }
        i {
            display: block;
            position: absolute;
            right: 10px;
            top: 12px;
            width: 46px;
            height: 1px;
            background-color: #dfe6ee;
        }
        b {
            display: block;
            position: absolute;
            height: 8px;
            width: 1px;
            right: 14px;
            top: 6px;
            background-color: #dfe6ee;
            transform: rotateZ(-60deg);
        }
    }
    .select {
        .num {
            background-color: #3582fb;
        }
        .text {
            color: #3582fb;
            font-weight: bold;
            line-height: 26px;;
        }

    }
}

.container {
    font-size: 14px;
    .cnt {
        padding-left: 20px;
        position: relative;
        i {
            font-style: normal;
            display: inline-block;
            margin-left: 12px;
            color: #5d9bfc;
            cursor: pointer;
        }
        i:hover ~ .img {
            display: block;
        }
        .img {
            display: none;
            width: 291px;
            height: 681px;
            background: url('../../../../assets/setting/workflow.png') no-repeat;

            border: 1px solid #ccc;
            box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
            border-radius: 4px;
            position: absolute;
            left: 406px;
            top: -100px;
            z-index: 20;
        }
    }
    .tit {
        padding: 33px 0 20px 0 ;
        font-size: 14px;
        font-weight: bold;
    }

    .infocnt {
        padding-left: 20px;
        >div {
            display: flex;
            margin-bottom: 20px;

        }
        .name {
            width: 90px;
            text-align: right;
            margin-right: 12px;
            span {
                color: #f00;
            }
        }

    }
}
.btns {
    margin-top: 20px;
}

.container2 {
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
            width: 20%;
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
            width: 10%;
        }
        .jieshu {
            width: 10%;
        }
        .caozuo {
            width: 30%;
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
    .diedaijindu {
        td {
            text-align: left;
            padding: 8px 10px;
        }
        tr {
            td:nth-of-type(1){
                text-align: center;
            }
        }
    }
}

.com_table {
  td {
    text-align: left;
  }
}

.settings_Dialog {
  .left {
    text-align: right;
    .tit{
      span{
        color: #f00;
      }
    }
  }
  .settings_tips {
    margin: 8px 0 30px 0;
    color: #666666;
  }
}
.moreBtn {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: 6px;
  cursor: pointer;
  svg {
    width: 16px;
    height: 16px;
  }
}
</style>
<style  scoped>
.container  >>>  .el-radio__label {
        font-size: 14px;
}
</style>
