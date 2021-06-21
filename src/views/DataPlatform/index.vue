<template>
    <div class="app-container">
        <div class="selectOption" :class="{'fullscreen':isAll}" >
            <selectOption  @show="hideSelectOption" @upNewDoc="upNewDoc"/>
        </div>
        <div class="forD3"  id="myD3" :class="{'fullscreen':isAll}" v-if="updateStatus === 'show'">
        </div>

        <!-- <div class="neo4jd3 word" v-else>
            <div>
                <div class="inner" v-loading="updateStatus === 'loading'">
                    <div class="word"> <svg-icon icon-class="word"  /> </div>
                    <div class="title">《中行移动端APP研发二期需求规格说明书V1.0》</div>
                    <div class="info">类型：word  大小：1.2M</div>
                </div>
                <div class="btn">
                    <el-button v-if="updateStatus === 'edit'" @click="updated">点击开始上传</el-button>
                    <span v-if="updateStatus === 'loading'">文档分析中。。。</span>
                </div>
            </div>
            
        </div> -->

        <div class="righttoolbox"  v-if="updateStatus === 'show'">
            <ul>
                <li v-for=" (item,index) in icon " :key="index" :class="item.class" >
                    <span class="img" > <img :src="item.img" alt="" > </span>
                    <span class="text">{{item.text}}</span>
                </li>
            </ul>
        </div>


        <yongliDialog
            :dialog-visible.sync="showYongliDialog"
            @updated='confirmDialog'
            />
    </div>
</template>
<script>
import selectOption from './components/selectOption'
import chartData from '@/utils/data'
import Neo4jd3 from '@/utils/d3'
import yongliDialog from './components/yongliDialog'


export default {
    components:{selectOption , yongliDialog},
    created(){
        console.log('Neo4jd3', Neo4jd3)
        this.chartData = chartData
        this.updateStatus = 'show'
        this.initChart()
    },
    data(){
        return {
            chartData:{},
            neo4j:{},
            isAll:false,
            icon:[
                {class:'quanping',img:require('@/assets/tupu/fullscreen.png'),text:'全屏',}, 
                {class:'fangda',img:require('@/assets/tupu/fangda.png'),text:'放大'}, 
                {class:'suoxiao',img:require('@/assets/tupu/suoxiao.png'),text:'缩小'}, 
                {class:'huanyuan',img:require('@/assets/tupu/huanyuan.png'),text:'还原'}, 
                {class:'xiazai',img:require('@/assets/tupu/save.png'),text:'保存'},
            ], 
            showYongliDialog:false,
            updateStatus:'show'
        }
    },
    mounted(){

        // this.initChart()
        
    },
    beforeDestroy(){
        this.neo4j.clearAll()
        this.neo4j = null
    },
    methods:{
        hideSelectOption(e){
            // this.isAll = e
        },
        confirmDialog(){},
        updated(){
            this.updateStatus = 'loading'
            setTimeout(()=>{
                this.updateStatus = 'show'
                this.initChart()
            },3000)
        },
        initChart(){
            this.$nextTick(()=>{

                this.neo4j = Neo4jd3('#myD3', {
                    neo4jData: this.chartData,
                    clickNode:  this.clickNode
                    });
            })
        },
        clickNode(){
            // console.log('lala', this)
            this.showYongliDialog = true
        },
        upNewDoc(){
            this.neo4j.clearAll()
            this.updateStatus = 'edit'
        }
    },
    
    
}
</script>
<style lang="scss" scoped>
.app-container {
    background-color: #eee;
    position: relative;
    .neo4jd3 {
        position: absolute;
        height: calc(100% - 40px);
        width: calc(100% - 380px);
        right: 20px;
        top: 20px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(128, 145, 165, 0.2);
        &.fullscreen {
            width: 100%;
        }
        &.word {
            >div {
                position: absolute;
                left: 50%;
                top:50%;
                transform: translate(-50% , -50%);
                width: 60%;
                height:260px;
                border: 1px dashed #ccc;
               .inner >div{
                    text-align: center;
                    padding-top: 20px;
                    font-size: 14px;
                    svg {
                        height: 50px;
                        width: 50px;
                    }
                }
                .info {
                    color: #999;
                }
                .btn{
                    text-align: center;
                    padding-top: 20px;
                    font-size: 14px;
                }
            }
        }
    }
    .selectOption {
        position: relative;
        z-index: 1;
        height: 100%;
        width: 310px;
        box-shadow: 0 0 10px rgba(128, 145, 165, 0.2);
        &.fullscreen {
            width: 0px;;
        }
        
    }
    .suofang {
        position: absolute;
        width: 60px;
        height: 100px;
        background-color: #f00;
        bottom: 260px;
        right: 20px;;

        > div {
            width: 40px;
            height: 40px;
        }
    }
}
.righttoolbox {
    width: 66px;
    padding: 16px 0;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 30px;
    border: 1px solid #DCDFE6;
    color: #303234;
    background-color: #fff;
     ul {
         padding: 0;
         margin: 0;
         list-style: none;
         li {
            user-select: none;
            list-style: none;
            height: 52px;
            margin: 0;
            text-align: center;
            cursor: pointer;
            background-color: #fff; 
            margin-bottom: 24px;
            .text {
                line-height: 20px;
                font-size: 14px;
                height: 20px;
                display: block;
            }
            .img {
                display: block;
                height: 24px;
                width: 24px;
                margin: 0  auto;
                margin-bottom: 8px;
                img {
                    height: 100%;
                    width: 100%;
                }
            }
            
         }
       
         li:before {
             content: ''
         }
         li:nth-last-of-type(1) {
             margin-bottom: 0;
         }
     }
}
</style>