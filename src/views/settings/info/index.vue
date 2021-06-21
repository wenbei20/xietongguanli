<template>
  <div class="settings-info">

    <div class="topinfo" :class="{'hideMore':maininfoState.hideMore}">
      <div class="avator">
        <div >
          <svg-icon icon-class="project" />
        </div>
        <span>更换图标<br>（120X120）</span>
      </div>
      <div class="info">
        <div class="name">
          <span v-if="!maininfoState.editName" @click="showInput('editName')">{{ maininfo.name }}</span>
          <el-input v-else ref="editName" v-model="maininfo.name" @blur="hideInput('editName')" />
        </div>
        <div class="describe gray">
          <span v-if="!maininfoState.editDescribe" @click="showInput('editDescribe')">{{ maininfo.describe ? maininfo.describe : '点击添加详细描述' }}</span>
          <el-input v-else ref="editDescribe" v-model="maininfo.describe" @blur="hideInput('editDescribe')" />
        </div>

        <div class="otherInfo">
          <div>
            <span class="tit">管理员</span>
            <span>{{ maininfo.admin }}</span>
          </div>
          <div>
            <span class="tit">项目成员</span>
            <span>{{ maininfo.personNum }}</span>
          </div>
          <div>
            <span class="tit">创建人</span>
            <span>{{ maininfo.createPerson }}</span>
          </div>
          <div>
            <span class="tit">创建时间</span>
            <span>{{ maininfo.createTime }}</span>
          </div>
          <div>
            <span class="tit">开始时间</span>
            <span v-if="!maininfoState.editBeginTime" @click="showInput('editBeginTime')">{{ maininfo.beginTime ? maininfo.beginTime : '--' }}</span>
            <el-date-picker
              v-else
              ref="editBeginTime"
              v-model="maininfo.beginTime"
              value-format="yyyy-MM-dd"
              align="top"
              type="date"
              placeholder=" "
              @blur="hideInput('editBeginTime')"
            />
          </div>
          <div>
            <span class="tit">结束时间</span>
            <span v-if="!maininfoState.editEndTime" @click="showInput('editEndTime')">{{ maininfo.endTime ? maininfo.endTime : '--' }}</span>
            <el-date-picker
              v-else
              ref="editEndTime"
              v-model="maininfo.endTime"
              value-format="yyyy-MM-dd"
              align="top"
              type="date"
              placeholder=" "
              :picker-options="pickerOptions"
              @blur="hideInput('editEndTime')"
            />
          </div>
          <div>
            <span class="tit">项目状态</span>
            <span>{{ maininfo.status }}</span>
            <el-button plain class="endObj" @click="dialogVisible = true">结束项目</el-button>
          </div>
        </div>

      </div>

      <div class="showMore">
        <span @click="changeHideMore"> 展开信息</span>

      </div>
    </div>

    <div class="navtit">常用设置</div>
    <div class="nav">
      <div class="item">
        <div class="title person"><i></i> 成员与权限</div>
        <div class="nav_item" @click="$navigate('chengyuan')">成员</div>
        <div class="nav_item" @click="$navigate('yonghuzu')">用户组权限</div>
      </div>
      <div class="item">
        <div class="title app"><i></i> 应用设置</div>
        <div class="nav_item" @click="$navigate('xuqiu')">需求</div>
        <div class="nav_item" @click="$navigate('quexianSZ')">缺陷</div>
        <div class="nav_item" @click="$navigate('diedai')">迭代</div>
      </div>
      <div class="item">
        <div class="title other" @click="$navigate('otherSet')"><i></i> 其他设置</div>
        <div class="nav_item" @click="$navigate('banben')">版本</div>
        <div class="nav_item" @click="$navigate('jixian')">基线</div>
      </div>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <i class="el-icon-warning-outline warnIcon" />
      <span>是否要结束项目</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

export default {
  name: 'SettingsInfo',

  data() {
    return {
      maininfo: {
        name: 'text项目',
        describe: '',
        admin: 'pp',
        personNum: '1',
        createPerson: 'pp',
        createTime: '2020-09-06',
        beginTime: '',
        endTime: '',
        status: '开始'
      },
      maininfoState: {
        editName: false,
        editDescribe: false,
        editBeginTime: false,
        editEndTime: false,
        hideMore: true
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      dialogVisible: false
    }
  },
  computed: {

  },
  created() {

  },
  methods: {
    showInput(e) {
      this.maininfoState[e] = true
      this.$nextTick(() => {
        this.$refs[e].focus()
      })
    },
    hideInput(e) {
      this.maininfoState[e] = false
    },
    changeHideMore() {
      this.maininfoState.hideMore = !this.maininfoState.hideMore
    }
  }
}
</script>
<style lang="scss" scoped>

.topinfo {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  padding: 42px 0;
  background-color: #F9F9F9;
  position: relative;
  overflow: hidden;
  max-height: 1000px;
  transition: max-height ease 0.5s;
  &.hideMore {
    max-height: 232px;
    min-height: 232px;
    transition: max-height ease 0.5s;
  }

  .avator {
    width: 200px;
    position: relative;
    cursor: pointer;
    div{
      height: 120px;
      width: 120px;
      margin: 0 auto;
      border-radius: 4px;
      background-color: #55CAC8;
      text-align: center;
      svg {
        margin-top: 20px;
        height: 60px;
        width: 60px;
      }
    }

    span {
      display: none;
      position: absolute;
      top:86px;
      left: 40px;
      background-color: #6299B7;
      border-radius: 0 0 4px 4px;
      width: 120px;
      height: 34px;
      padding: 3px 0;
      line-height: 14px;
      text-align: center;
      font-size: 12px;
      color: #fff;
    }
  }
  .avator:hover span {
    display: block;
  }
  .info {
    flex-grow: 1;
    max-width: 800px;
    .name {
      height: 60px;
      margin-bottom: 40px;
      span {
        font-size: 20px;
        color: #535e6c;
      }
        margin-bottom: 20px;
    }
    .gray{

      color:#808994;
    }
    .describe {
      height: 40px;
    }
    .otherInfo {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      color:#808994;
      > div {
        width: 50%;
        height: 36px;
        line-height: 36px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tit {
        display: inline-block;
        width: 80px;
      }
    }
  }
}

.warnIcon {
  width: 40px;
  height: 40px;
  color: #F8A203;
  vertical-align: middle;
  margin: 0 20px;
}
.warnIcon::before {
  display: inline-block;
  font-size: 40px;

}
.endObj {
  margin-left: 20px;
}
.showMore {
  position: absolute;
  width: 100%;
  height: 42px;
  bottom: 0px;
  right: 0px;
  background-color: #F9F9F9;
  span {
    display: block;
    height: 16px;
    width: 70px;
    position: absolute;
    top: 0;
    right:  60px;
    color:#808994;
    cursor: pointer;
    font-size: 14px;
  }
}
.showMore span:hover{
  color: #333;
}
.navtit {
  height: 80px;
  line-height: 80px;
  padding-left: 35px;
  font-size: 16px;
  color: #535e6c;
}
.nav {
  display: flex;
  justify-content: flex-start;
  .item {
    padding: 20px 10px 10px;
    width: 178px;
    height: 270px;
    border: 1px solid #F2F2F4;
    border-radius: 2px;
    margin: 0 10px 0 35px;
    .title {
      font-size: 16px;
      color: #555;
      margin-bottom: 18px;
      line-height: 36px;
      padding-left: 44px;
      position: relative;
      i {
        display: block;
        position: absolute;
        width: 44px;
        height: 36px;
        left: 0;
        top: 0;
      }
    }
    .nav_item {
      padding-left: 44px;
      line-height: 28px;
      color: #4d7db7;
      cursor: pointer;
      font-size: 14px;;
    }
    .nav_item:hover {
      color: #4e8bee;
    }

    .person i{
      background: url('../../../assets/setting/project-info.sprite.png') no-repeat;
      background-position: -42px -42px;
    }
    .app i{
      background: url('../../../assets/setting/project-info.sprite.png') no-repeat;
      background-position: 0px 0px;
    }
    .other i{
      background: url('../../../assets/setting/project-info.sprite.png') no-repeat;
      background-position: 0 -42px;
    }
  }
}

</style>
