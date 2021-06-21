<template>
  <div class="reportForms app-container">
    <div class="reportForms_cnt">
      <div class="areatit">缺陷统计</div>
      <div class="areacnt">
        <el-card v-for="(item,idx) in viewData.defect" :key="idx" shadow="hover" @click.native="toDetailPage">
          <div class="img" :style="{backgroundPosition:backgroundPosition(item.left,item.top)}" />
          <div class="cnt">
            <div class="tit">{{ item.name }}</div>
            <div>{{ item.cnt }}</div>
          </div>
        </el-card>
      </div>
      <div class="areatit">需求统计</div>
      <div class="areacnt">
        <el-card v-for="(item,idx) in viewData.Needs" :key="idx" shadow="hover" @click.native="toDetailPage">
          <div class="img" :style="{backgroundPosition:backgroundPosition(item.left,item.top)}" />
          <div class="cnt">
            <div class="tit">{{ item.name }}</div>
            <div>{{ item.cnt }}</div>
          </div>
        </el-card>
      </div>
      <div class="areatit">看板统计</div>
      <div class="areacnt">
        <el-card v-for="(item,idx) in viewData.board" :key="idx" shadow="hover" @click.native="toDetailPage">
          <div class="img" :style="{backgroundPosition:backgroundPosition(item.left,item.top)}" />
          <div class="cnt">
            <div class="tit">{{ item.name }}</div>
            <div>{{ item.cnt }}</div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ReportForms',
  data() {
    return {
      viewData: {
        defect: [
          { name: '缺陷分布统计', cnt: '缺陷分布统计功能', left: '-119', top: '-244' },
          { name: '缺陷趋势统计', cnt: '缺陷处理总数的变化趋势', left: '-177', top: '-244' },
          { name: '缺陷年龄统计', cnt: '统计已结束的缺陷在不同状态下停留的缺陷数量与时长', left: '-59', top: '-300' },
          { name: '其他缺陷报表', cnt: '缺陷回归分布、缺陷解决率等报表', left: '-363', top: '0' }
        ],
        Needs: [
          { name: '需求分布统计', cnt: '需求分布统计功能', left: '0', top: '-241' },
          { name: '需求时长统计', cnt: '统计需求曾经在不同状态下停留时长的分布', left: '-177', top: '-299' },
          { name: '需求关联统计', cnt: '需求关联对象统计', left: '0', top: '-299' },
          { name: '需求燃烧图', cnt: '统计迭代下已结束需求的变化趋势', left: '-237', top: '-239' },
          { name: '需求累积流图', cnt: '统计迭代下处于不同状态的需求流动变化', left: '-59', top: '-241' }
        ],
        board: [
          { name: '看板工作项统计', cnt: '看板工作项统计功能，包括状态统计、板块分布统计、成员工作统计', left: '-236', top: '-300' }
        ]
      }
    }
  },
  methods: {
    toDetailPage() {
      console.log('lala')
      this.$router.push({ name: 'reportformDetail' })
    },
    backgroundPosition(a, b) {
      return a + 'px  ' + b + 'px'
    }

  }
}
</script>
<style lang="scss" scoped >
.reportForms {
    background-color: #e9e9e9;
    height: auto;
    .reportForms_cnt {
        background: #FFF;
        height: 100%;
        padding: 0 20px;
        min-height: calc(100vh - 90px);
        .areatit {
            padding-top: 15px;
            line-height: 32px;
            font-size: 18px;
        }
        .areacnt {
            display: flex;
            flex-wrap: wrap;
            .el-card {
                width: 300px ;
                margin: 15px 30px 15px 0px;
                cursor: pointer;
                >div {
                    height: 100%;
                }
                .img {
                    width: 57px;
                    height: 57px;
                    padding: 20px 0;
                    background: url('../../../assets/setting/report.sprite.png') no-repeat;
                    background-size: 421px 360px;
                    // background-size: 502.2px 432px;
                    margin-left: 20px;

                    float: left;
                }
                .cnt {
                    margin-left: 107px;
                    .tit {
                            font-size: 15px;
                            font-weight: bold;
                            color: #3f4a56;
                            margin-bottom: 10px;
                    }
                }
            }
        }
    }
}
</style>
<style  scoped>
.reportForms .areacnt >>> .el-card__body {
    overflow: hidden;
    padding: 20px 5px;
}
</style>
