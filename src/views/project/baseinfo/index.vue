<template>
    <div class="app-container">
        <h3>中行移动端APP研发二期 <span>进行中</span></h3>

        <div class="card">
            <el-card class="box-card">
                <div class="cardTitle">项目描述</div>
                <p style="font-size:14px;">中行移动端APP研发二期是2020年第二批次，由总行任务下发的项目任务，项目主要完成移动端APP的二期新增需求功能，重点服务于核心银行业务、网银业务，业务覆盖总行、分行、支行、网点的个人和企业用户。</p>
                
            </el-card>
            <el-card class="box-card">
                <div class="cardTitle">项目信息</div>
                <el-row>
                    <el-col :span="3">开始时间</el-col>
                    <el-col :span="8">
                        <!-- <el-date-picker
                            size="mini"
                            v-model="startTime"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker> -->
                        2020-03-10
                    </el-col>
                    <el-col :span="3" :offset="2">结束时间</el-col>
                    <el-col :span="8">
                         <!-- <el-date-picker
                            size="mini"
                            v-model="endTime"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker> -->
                        2021-03-09

                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">开发人员</el-col>
                    <el-col :span="10">
                        5人
                        <span class="person">
                            <i class="front"></i>
                            前端：3
                            <i class="back"></i>
                            后端：2
                        </span>
                        <br>
                        <el-avatar size="medium" v-for="o in 5" :key="o" :class="{'yellow':o>3}">李</el-avatar>
                    </el-col>
                    <el-col :span="3" >测试人员</el-col>
                    <el-col :span="8">
                        3人
                        <br>
                        <el-avatar size="medium" v-for="o in 3" :key="o" >李</el-avatar>

                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">涉及产品</el-col>
                    <el-col :span="21">
                        <span class="tags">银行产品</span>
                    </el-col>
                </el-row>
            </el-card>
            <el-card class="box-card">
                <div class="cardTitle">需求</div>
                <div class="progress">
                    <div class="chart">

                        <el-progress type="circle" :show-text="false" :percentage="needs"></el-progress>
                        <div class="text">{{needs}}<span>%</span></div>
                        <div class="info">完成率<i class="el-icon-question"></i></div>
                    </div>
                   <div class="num">
                       <div>总数   ： 439个</div>
                       <div>规划中： 100个</div>
                       <div>开发中： 124个</div>
                   </div>
                   <div class="num">
                       <div>已完成： 215个</div>
                       <div>已测试： 215个</div>
                   </div>
                </div>
            </el-card>
            <el-card class="box-card">
                <div class="cardTitle">用例</div>
                <div class="progress">
                    <div class="chart">

                        <el-progress type="circle" :show-text="false" :percentage="cases"></el-progress>
                        <div class="text">{{cases}}<span>%</span></div>
                        <div class="info">完成率<i class="el-icon-question"></i></div>
                    </div>
                   <div class="num">
                       <div>总数： 1283个</div>
                       <div>功能用例： 987个</div>
                   </div>
                   <div class="num">
                       <div>安全用例： 200个</div>
                       <div>性能用例： 306个</div>
                   </div>
                </div>
            </el-card>
            
            <el-card class="box-card">
                <div class="cardTitle">缺陷</div>
                <div class="progress">
                    <div class="chart">

                        <el-progress type="circle" :show-text="false" :percentage="defeats"></el-progress>
                        <div class="text">{{defeats}}<span>%</span></div>
                        <div class="info">完成率<i class="el-icon-question"></i></div>
                    </div>
                   <div class="num">
                       <div>总数： 809个</div>
                       <div>已处理： 700个</div>
                   </div>
                   <div class="num">
                       <div>未处理： 89个</div>
                       <div>已拒绝： 20个</div>
                   </div>
                </div>
            </el-card>
            <el-card class="box-card">
                <div class="cardTitle">文档</div>
                <div class="progress">
                    <div class="chart">

                        <el-progress type="circle" :show-text="false" :percentage="documents"></el-progress>
                        <div class="text">{{documents}}<span>%</span></div>
                        <div class="info">完成率<i class="el-icon-question"></i></div>
                    </div>
                   <div class="num">
                       <div>总数：213个</div>
                       <div>审批通过： 100个</div>
                   </div>
                   <div class="num">
                       <div>未通过： 13个</div>
                       <div>普通文档： 100个</div>
                   </div>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            startTime:'',
            endTime:'',
            needs:48.9,
            cases:46,
            defeats:86.5,
            documents:46.9

        }
    }
}
</script>
<style lang="scss" scoped>
.app-container {
    min-width: 1000px;
    overflow-x: auto;
    h3{
        font-size: 16px;
        margin-top: 0;
        span{
            display: inline-block;
            padding: 0 8px;
            height: 18px;
            line-height: 18px;
            color: #fff;
            background-color: rgb(4, 179, 4);
            font-weight: normal;
            font-size: 12px;
            border-radius: 3px;
            margin-left: 12px;
        }
    }
    .card {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .box-card {
        min-height: 238px;
        width: calc(50% - 15px);
        margin-bottom: 30px;
        .cardTitle {
            font-size: 14px;
            font-weight: bold;
            color: #999;
            position: relative;
        }
        .cardTitle::after{
            content: '';
            display: block;
            position: absolute;
            left: -20px;
            top: 2px;
            width: 5px;
            height: 16px;
            background-color: #6EA9C9;
        }
        .el-row {
            margin-top: 16px;
            .el-col {
                line-height: 28px;
                color: #000;
                font-size: 14px;
                .el-avatar {
                    font-size: 14px;
                    margin-right: 6px;
                    margin-top: 6px;
                    &.yellow {
                        background-color: #B9AE76;
                    }
                }
                .person {
                    display: block;
                    float: right;
                    color: #999;
                    padding-right: 20%;
                    i{
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        border-radius: 4px;
                        margin-right: 3px;
                        background-color: #999;
                    }
                    .back {
                        margin-left: 6px;
                        background-color: #B9AE76;
                    }
                }
                .tags {
                    display: inline-block;
                    padding: 0 8px;
                    height: 24px;
                    line-height: 24px;
                    color: #fff;
                    background-color: #5FADDE;
                    border-radius: 4px;
                }
            }
        }
        .progress {
            display: flex;
            justify-content: center;
            align-items: center;
            .chart {
                min-width: 100px;
                margin-right: 50px;
                position: relative;
                padding-top: 20px;
                .text {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-60%);
                    width: 100%;
                    left: 0;
                    text-align: center;
                    font-size: 30px;
                    // font-weight: bold;
                    span{
                        font-size: 14px;
                        display: inline-block;
                        margin-left: 5px;
                    }
                }
                .info {
                    position: absolute;
                    bottom: 30px;
                    width: 100%;
                    text-align: center;
                }
            }
            .num {
                min-width: 140px;
                line-height: 30px;
                // padding-top: 30px;
                font-size: 14px;
            }
            
        }
    }
}
</style>
<style  scoped>
.box-card >>> .el-date-editor{
    width: 100%;
}
</style>