<template>
  <div class="app-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first"></el-tab-pane>
        <el-tab-pane label="所属团队部门" name="second"></el-tab-pane>
        <el-tab-pane label="所属项目集" name="third"></el-tab-pane>
        <el-tab-pane label="所属产品集" name="fourth"></el-tab-pane>
        <el-tab-pane label="所属任务集" name="five"></el-tab-pane>
        <el-tab-pane label="所属年度批次集" name="six"></el-tab-pane>
      </el-tabs>


      <div>
        <el-row>
          <el-col :span="2" class="leftCol">成员昵称</el-col>
          <el-col :span="22" > <el-input size="mini"></el-input> </el-col>
        </el-row>
         <el-row>
          <el-col :span="2" class="leftCol">真实名称</el-col>
          <el-col :span="22" > <el-input size="mini"></el-input> </el-col>
        </el-row>
         <el-row>
          <el-col :span="2" class="leftCol">性别</el-col>
          <el-col :span="22" >
            <el-select v-model="gender" size="mini">
              <el-option value="1" label="男"></el-option>
              <el-option value="2" label="女"></el-option>
            </el-select>
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="2" class="leftCol">职位</el-col>
          <el-col :span="22" > <el-input size="mini"></el-input> </el-col>
        </el-row>
         <el-row>
          <el-col :span="2" class="leftCol">状态</el-col>
          <el-col :span="22" >
            <el-select v-model="status" size="mini">
              <el-option value="1" label="在职"></el-option>
            </el-select>
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="2" class="leftCol">用户组<span>*</span></el-col>
          <el-col :span="22" >
            <el-checkbox-group v-model="group">
              <el-checkbox label="公司管理员" ></el-checkbox>
              <el-checkbox label="公司普通成员" ></el-checkbox>
              <el-checkbox label="普通用户组01" ></el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>

         <el-row>
          <el-col :span="22" :offset="2">
            <el-button type="primary" size="small" @click="goBack">保存</el-button>
            <el-button size="small" @click="goBack">取消</el-button>
          </el-col>
        </el-row>
        
      </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeName:'first',
      gender:'',
      status:'',
      group:[]
    }
  },
  mounted() {
  },
  methods: {
    handleNodeClick(data) {
      console.log(57, data)
    },
    handleClick(){},
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.leftCol {
  text-align: right;
  margin-bottom: 20px;
  padding-right: 20px;
  line-height: 28px;
  span {
    color: #f00;
  }
}
.btns {
  padding: 0 0 0 80px;
}
.el-col {
  line-height: 28px;
}
.el-input {
  width: 240px;
}
.app-container {
  background-color: #fff;
}
</style>
