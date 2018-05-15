<template>
  <div class="statistic">
    <div class="head">统计分析</div>
    <div class="button">
      <div class="fl">
        <el-button class="fl add-psq back" type="primary"><i class="iconfont icon-fanhui1"></i>返回</el-button>
      </div>
    </div>
    <div class="line"></div>
    <div class="page">
      <div class="pagelist" :key="index"
      :class="index == Newindex ? 'active': ''"
      v-for="(item, index) in pageList"
      @click="statisticPage(index)">{{item}}</div>
    </div>
    <div
    v-show="Newindex == 0 ? true : false">
      <xz-statistic-recyclingsituation></xz-statistic-recyclingsituation> 
    </div>
    <div
    v-show="Newindex == 1 ? true : false">
      <xz-statistic-originaldata></xz-statistic-originaldata>
    </div>
    <div
    v-show="Newindex == 2 ? true : false">
      <xz-statistic-numberreports></xz-statistic-numberreports>
    </div>
    <div
    v-show="Newindex == 3 ? true : false">
      <xz-statistic-sourceanalyse></xz-statistic-sourceanalyse>
    </div>
  </div>
</template>

<script>
import xzStatisticRecyclingsituation from './statistic/RecyclingSituation.vue'
import xzStatisticOriginaldata from './statistic/OriginalData.vue'
import xzStatisticNumberreports from './statistic/NumberReports.vue'
import xzStatisticSourceanalyse from './statistic/SourceAnalyse.vue'
export default {
  components: {
    xzStatisticRecyclingsituation,
    xzStatisticOriginaldata,
    xzStatisticNumberreports,
    xzStatisticSourceanalyse
  },
  props: [
  ],
  data () {
    return {
      pageList: ['回收概况', '原始数据', '频数报表', '来源渠道分析'], // 子页面标题
      Newindex: 0 // 存储当前点击对象的index值
    }
  },
  computed: {
  },
  methods: {
    /**
     * [statisticPage 统计分析页面切换]
     * @param  {[number]} index [当前点击对象的index值]
     * @return {[type]}       [description]
     */
    statisticPage (index) {
      this.Newindex = index
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>
<style scoped>
  /*统计分析导航样式*/
  .statistic{
    width: 1200px;
    min-height: 980px;
    margin:0 auto;
    background: #fff;
  }
  .statistic .head{
    padding-left: 20px;
    line-height: 58px;
    border-bottom: 1px solid #e8ecf0;
  }
  .statistic .button{
    height: 60px;
    overflow: hidden;
    border-bottom: 1px solid #e8ecf0;
  }
  .statistic .button .fl button{
    margin: 20px 0 11px 20px;
  }
  .statistic .button .back{
    width: 130px;
  }
  .statistic .button .back .iconfont{
    margin-right: 15px
  }
  .statistic .line{
    height: 10px;
    background: #eee;
  }
  .statistic .page{
    text-align: center;
    overflow: hidden;
    color: #666;
  }
  .statistic .page .pagelist{
    float: left;
    width: 25%;
    line-height: 59px;
    font-size: 18px;
    background: #f7f7f7;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    cursor: pointer;
  }
  .statistic .page .pagelist.active{
    color: #126ab5;
    background: #fff;
  }
  .statistic .page .pagelist:last-child{
    border-right: none;
  }
</style>
<style>

  /*子页面(原始数据频数报表)head样式*/
  .statistic .search{
    overflow: hidden;
    padding-top: 14px;
    padding-bottom: 12px;
  }
  .statistic .search .fl{
    margin-left: 20px;
    margin-top: 2px;
  }
  .statistic .search .fl .iconfont{
    margin-right: 8px;
  }
  .statistic .search .fr{
    margin-right: 21px;
  }
  .statistic .search .fr .iconfont{
    margin-right: 20px;
    font-size: 20px;
    color: #126ab5;
  }
  .statistic .search .fr .el-input__inner{
    width: 300px;
    height: 36px;
    border-radius: 20px;
    border: 1px solid #126ab5;
  }
  .statistic .search .fr .el-input__suffix{
    line-height: 36px;
  }
  /*子页面表格样式*/
  .statistic .el-table .cell, .el-table th div{
    padding-left: 0
  }
  .statistic .el-table td, .el-table th{
    padding: 8px 0;
    height: 40px;
    padding-left: 40px;
    font-size: 14px;
    font-weight: normal;
    color: #333;
  }
  .statistic .el-table th{
    border-left: 1px solid #fff;
    background: #f3f3f3;
    padding-left: 40px
  }
  .statistic .el-table th:first-child{
    border-left: none;
  }
  .statistic .el-table tr:hover>td{
    background: #d0e1f0;
  }
  .statistic .el-pagination{
    text-align: center;
    margin-top: 40px;
  }
  /*进度条样式*/
  .statistic .el-progress{
    width: 240px;
  }
  .statistic .el-table__footer-wrapper tbody td{
    background: #f3f3f3;
  }
  /*子页面(频数报表，来源渠道分析)table 边框*/
  .statistic .el-table--fit{
    border: 1px solid #f3f3f3;
  }
  .statistic .el-table::before{
    display: none;
  }
  .statistic .list{
    width: 1040px;
    padding-bottom: 20px;
    margin:0 auto;
    border-bottom: 1px solid #f3f3f3;
  }
</style>