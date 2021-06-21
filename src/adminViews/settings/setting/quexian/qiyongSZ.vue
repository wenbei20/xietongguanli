<template>
  <div class="settings-xianshi settings">

    <div class="settings_title">启用设置</div>

    <ul class="settings_navlist qiyongsz">
      <li>
        <span>启用需求和缺陷关联</span>
        <el-switch
          v-model="guanlian"
        />
      </li>
      <li style="height:auto">
        <span>缺陷转需求后关闭缺陷</span>
        <el-switch
          v-model="qiexian"
        />
        <div style="padding-left:22px">
          <div class="settings_tips">关闭缺陷时手动更新必填字段</div>
          <div class="settings_add" @click="dialogVisible=true">
            <i class="el-icon-plus" />
            增加字段
          </div>
          <div class="tags">
            <i v-for="(item , i) in tags" :key="i">{{ item }}</i>
          </div>
        </div>
      </li>
      <li>
        <span>启用快速创建缺陷 </span>
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

    </ul>

    <!-- <el-dialog
        v-el-drag-dialog
        :visible.sync="dialogVisible"
        width="40%"
        title="增加字段"
        class="settings_qiyongDialog"
        >

        <el-row>
            <el-col :span="17" class="dialogleft">

              <div>
                <div style="color:#8091a5">可选字段</div>

                <div class="tit">基础字段</div>
                <div class="checkboxgroup">
                    <el-checkbox-group v-model="jichuList">
                      <el-checkbox label="复选框 A"></el-checkbox>
                      <el-checkbox label="复选框 B"></el-checkbox>
                      <el-checkbox label="复选框 C"></el-checkbox>
                      <el-checkbox label="禁用" ></el-checkbox>
                      <el-checkbox label="选中" ></el-checkbox>
                      <el-checkbox label="复选框 D"></el-checkbox>
                      <el-checkbox label="复选框 E"></el-checkbox>
                      <el-checkbox label="复选框 F"></el-checkbox>
                      <el-checkbox label="禁用1" ></el-checkbox>
                      <el-checkbox label="选中2" ></el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="tit">人员与时间</div>
                <div class="checkboxgroup">
                    <el-checkbox-group v-model="person">
                      <el-checkbox label="复选框 A"></el-checkbox>
                      <el-checkbox label="复选框 B"></el-checkbox>
                      <el-checkbox label="复选框 C"></el-checkbox>
                      <el-checkbox label="禁用" ></el-checkbox>
                      <el-checkbox label="选中" ></el-checkbox>
                      <el-checkbox label="复选框 D"></el-checkbox>
                      <el-checkbox label="复选框 E"></el-checkbox>
                      <el-checkbox label="复选框 F"></el-checkbox>
                      <el-checkbox label="禁用1" ></el-checkbox>
                      <el-checkbox label="选中2" ></el-checkbox>
                    </el-checkbox-group>
                </div>

                <div class="tit">
                  自定义字段
                  <span class="settings_add">
                    <i class="el-icon-plus"></i>
                    增加字段
                  </span>
                </div>
                <div class="checkboxgroup">
                    <el-checkbox-group v-model="zidingyiList">
                      <el-checkbox label="复选框 A"></el-checkbox>
                      <el-checkbox label="复选框 B"></el-checkbox>
                      <el-checkbox label="复选框 C"></el-checkbox>
                      <el-checkbox label="禁用" ></el-checkbox>
                      <el-checkbox label="选中" ></el-checkbox>
                      <el-checkbox label="复选框 D"></el-checkbox>
                      <el-checkbox label="复选框 E"></el-checkbox>
                      <el-checkbox label="复选框 F"></el-checkbox>
                      <el-checkbox label="禁用1" ></el-checkbox>
                      <el-checkbox label="选中2" ></el-checkbox>
                    </el-checkbox-group>
                </div>

              </div>

            </el-col>
            <el-col :span="7" class="dialogcnt" style="">
                <div>
                  <div style="color:#8091a5">当前选定的字段</div>
                  <div class="ul">
                    <div v-for="(item,i ) in selected" :key="i">
                      <span>{{item}}</span>
                      <i class="el-icon-close"></i>
                    </div>
                  </div>
                </div>

            </el-col>
        </el-row>

        <div slot="footer" class="dialog-footer">
            <el-row>
                <el-col :span="18" :offset="6">

                    <el-button type="primary"  @click="dialogVisible = false">确 定</el-button>
                    <el-button @click="dialogVisible = false">取 消</el-button>
                </el-col>
            </el-row>
        </div>
    </el-dialog> -->
    <selectDialog
      :dialog-visible.sync="dialogVisible"
    />
  </div>
</template>

<script>
import selectDialog from '../../components/selectDialog'
export default {
  name: 'SettingsQiyongSZ',
  components: { selectDialog },
  data() {
    return {
      guanlian: false,
      qiexian: false,
      chuangjian: false,
      yidong: false,
      tags: ['审核人'],
      dialogVisible: false,
      jichuList: [],
      person: [],
      zidingyiList: []
    }
  },
  computed: {
    selected() {
      return [...this.jichuList, ...this.person, ...this.zidingyiList]
    }
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
.settings_tips {
  line-height: 20px;
  font-size: 13px;
}
.settings_add {
  line-height: 40px;
  font-size: 13px;
}
.tags {
  margin-top: 0px;
  i {
    display: inline-block;
    height: 24px;
    padding: 0 5px;
    line-height: 24px;
    color: #c7254e;
    vertical-align: bottom;
    margin-right: 6px;
    border: 1px solid #e1e1e8;
    margin-bottom: 5px;
    white-space: nowrap;
    word-break: break-all;
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-style: normal;
    font-size: 13px;
  }
}

.settings_qiyongDialog {
  .tit {
    font-weight: bold;
    margin: 30px 0 12px 0 ;
    font-size: 14px;
  }
  .el-checkbox {
    margin-bottom: 10px;
    width: 25%;
    margin-right: 0;
  }
}
.dialogcnt {

}
.dialogleft {
  border-right:1px solid #E6E6E6;
  margin-top: -12px;
  padding-top: 12px;
}
.ul {
  margin-top: 30px;
  padding-right: 18px;
  max-height: 500px;
  overflow-y: auto;
  >div {
    overflow: hidden;
    padding: 8px 5px;
    i {
      display: block;
      float: right;
    }
  }
}

::-webkit-scrollbar {
    width: 9px;
    height: 9px;
}
::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: rgba(0,0,0,0.1);
    -webkit-box-shadow: -2px 0 0 #fff inset, 1px 0 0 #fff inset, 0 -1px 0 rgba(255,255,255,0.9) inset, 0 1px 0 rgba(255,255,255,0.9) inset;
}
::-webkit-scrollbar-track {
    border-radius: 8px;
    background-color: rgba(0,0,0,0);
}
</style>
