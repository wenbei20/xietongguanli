<template>
    <div class="countInner">
        <div class="tit">
            {{info}}
            <i class="el-icon-s-fold"></i>    
        </div>
        <div class="cnt">
            <div v-for="(ele , idx) in count" :key="idx" class="item">
                <count-to :start-val="0" :end-val="ele.num" :duration="2600" class="card-panel-num" />

                <div>{{ele.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import CountTo from 'vue-count-to'
export default {
    components: {
        CountTo
    },
    props:{
        info:{
            type:String,
            default:''
        },
        count:{
            type:Array,
            default:()=>[]
        }
    }
}
</script>
<style lang="scss" scoped>
.countInner {
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(128, 145, 165, 0.2);
    .tit {
        font-size: 14px;
    }
    .cnt {
        display: flex;
        justify-content: center;
        .item {
            padding: 0 20px;
            .card-panel-num {
                font-size: 32px;
                display: block;
                text-align: center;
            }
            div {
                padding : 10px 0;
            }
        }
        .item:nth-child(1) {
            .card-panel-num {
                color: #5076BF;
            }
        }
        .item:nth-child(2) {
            .card-panel-num {
                color: #1F9B50;
            }
        }
        .item:nth-child(3) {
            .card-panel-num {
                color: #f00;
            }
        }
    }
}
</style>