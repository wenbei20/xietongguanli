<template>
  <el-dialog
    title="创建迭代"
    :visible.sync="ownVisible"
    @close="handleCancel"
    width="800px"
  >
    <el-row :gutter="20" type="flex" align="middle">
      <el-col :span="16">
        <el-input placeholder="输入迭代标题" />
      </el-col>
      <el-col :span="8">
        <div class="cover">
          <el-avatar shape="square" :src="defaultIcon" style="width: 60px; height: 60px;" />
          <div class="content">
            <div class="handle"><a href="##" class="text-primary">选择迭代封面</a></div>
            <div class="info">图片大小建议小于1M</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-divider style="background: #eee;" />
    <el-row :gutter="10">
      <el-col :span="4" style=" padding-top: 7px; text-align: right;">
        开始时间：
      </el-col>
      <el-col :span="8">
        <el-date-picker
          v-model="date1"
          type="date"
          placeholder="选择日期"
        />
      </el-col>
      <el-col :span="4" style=" padding-top: 7px; text-align: right;">
        结束时间：
      </el-col>
      <el-col :span="8">
        <el-date-picker
          v-model="date2"
          type="date"
          placeholder="选择日期"
        />
      </el-col>
    </el-row>
    <div class="box">
      <a href="##"><i class="el-icon-document" /> 点击添加迭代目标</a>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import defaultIcon from '@/assets/icon/project.png'
import { Handler } from 'mockjs'

export default {
  props: {
    visibleSync: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      defaultIcon,
      date1: '',
      date2: '',
      ownVisible:false,
    }
  },
  created(){
  },
  watch:{
    visibleSync:{
      handler(val){
        this.ownVisible = val
      },
      immediate:true
    }
  },
  methods: {
    handleOk() {
      this.ownVisible = false
      //
      this.$emit('update:visibleSync' , false)
    },
    handleCancel() {
      this.ownVisible = false
      this.$emit('update:visibleSync' , false)

    }
  }
}
</script>

<style lang="scss" scoped>
.cover{
  .el-avatar{ display: inline-block; vertical-align: middle; margin-right: 10px;}
  .content{ display: inline-block; vertical-align: middle; font-size: 12px; line-height: 20px;
    .handle{
      a { color: #1890ff;}
    }
  }
}
.box{ height: 100px; padding: 20px 0;}
</style>
