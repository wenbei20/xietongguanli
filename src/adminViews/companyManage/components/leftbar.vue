<template>
  <div class="navList">
    <div class="img">
      <div class="logo_img"><span>中</span></div>
      <div class="cnt">中国银行股份有限公司</div>
    </div>
    <div class="title">
      <span class="el-icon-office-building" />
      公司管理
    </div>
    <div class="item" :class="{'active': activeName === '1'}"  @click="changeNav('1')">项目管理</div>
    <div class="item" :class="{'active': activeName === '2'}" @click="changeNav('2')">成员管理</div>
  </div>

</template>
<script>
export default {
  props: {
  },
  data(){
    return {
      activeName:'1'

    }
  },
  methods:{
    changeNav(e){
      if(this.activeName === e) return 
      this.activeName = e
      this.$emit('changeNav' , e)
    }
  }
}
</script>
<style lang="scss" scoped>
.navList{
    width: 210px;
    .img {
        padding-top:20px;
        .logo_img {
            span {
                display: block;
                height: 50px;
                line-height: 50px;
                color: #fff;
                font-weight: bold;
                width: 50px;
                font-size: 40px;
                text-align: center;
                border-radius: 4px;
                background-color: #ffb400;
                margin: 0 auto;
            }
        }
        .cnt {
            color: #3f4a56;
            margin-bottom: 40px;
            font-size: 16px;
            text-align: center;
            margin-top: 20px;
        }
    }
    .title {
        font-size: 16px;
        margin-left: 15px;
        margin-bottom: 8px;
        color: #222;
    }
    .item{
        padding-left: 52px;
        height: 33px;
        line-height: 33px;
        font-size: 16px;
        color: #535e6c;
        cursor: pointer;
        border-left: 4px solid transparent;
    }
    .item.active {
        color: #3582fb;
        border-left: 4px solid #3582fb;
        background-color: #ebf2fe;
    }
}
</style>
