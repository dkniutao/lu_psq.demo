<template>
  <div class="recycle">
    <div class="recycle-content">
      <div class="list" :key="index"
      v-for="(item, index) in recycleList">
        <div>{{item.title}}</div>
        <div
        v-if="index === 3">
          <span v-if="item.views.d !== 0">{{item.views.d}}<i>天</i></span>
          <span v-if="item.views.h !== 0">{{item.views.h}}<i>小时</i></span>
          <span v-if="item.views.m !== 0">{{item.views.m}}<i>分</i></span>
          <span v-if="item.views.s !== 0">{{item.views.s}}<i>秒</i></span>
        </div>
        <div v-else>{{item.views}}</div>
        <div>{{item.describe}}</div>
      </div>
    </div>
    <div class="line"></div>
    <div id="main" style="width: 1100px;height: 500px;margin:0 auto;"></div>
  </div>
</template>

<script>
import mylib from '../../mylib.js'
import echarts from 'echarts'
export default {
  components: {
  },
  props: [
  ],
  data () {
    return {
      recycleList: [
        {
          title: '浏览量',
          views: '',
          describe: '实时访问量'
        },
        {
          title: '回收量',
          views: '',
          describe: '实时回收量'
        },
        {
          title: '回收率',
          views: '',
          describe: '回收量/访问量'
        },
        {
          title: '平均完成时间',
          views: '',
          describe: '实时访问量'
        }
      ],
      charts: '',
      week_views: [], // 周浏览量详细
      week_submit: [] // 周提交量详细
    }
  },
  computed: {
  },
  methods: {
    drawPie (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        title: {
          text: '周回收概况'
        },
        legend: {
          data: ['浏览量', '回收量']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.week_views.date
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '浏览量',
            type: 'line',
            data: this.week_views.count
          },
          {
            name: '回收量',
            type: 'line',
            data: this.week_submit.count
          }
        ]
      })
    }
  },
  created () {
  },
  mounted () {
    // 获取回收概况统计
    mylib.axios({
      url: 'questionnaire/statistics',
      params: {
        id: '13'
      },
      done (res) {
        this.recycleList[0].views = res.data.views
        this.recycleList[1].views = res.data.submit
        this.recycleList[2].views = res.data.rate
        this.recycleList[3].views = res.data.avg

        this.week_views = res.data.week_views
        this.week_submit = res.data.week_submit
        console.log('resres', res)
        // 数据接收成功，调用echarts
        this.$nextTick(function () {
          this.drawPie('main')
        })
      }
    }, this)
  }
}
</script>
<style scoped>
  .recycle .recycle-content{
    overflow: hidden;
    text-align: center;
  }
  .recycle .recycle-content .list{
    float: left;
    width: 25%;
    height: 190px;
    margin: 20px 0;
    border-right: 1px solid #eee;
    box-sizing: border-box;
  }
  .recycle .recycle-content .list:last-child{
    border-right: none;
  }
  .recycle .recycle-content .list i{
    font-size: 20px;
    font-style: normal;
  }
  .recycle .recycle-content .list div:nth-child(1){
    padding-left: 20px;
    font-size: 14px;
    text-align: left;
  }
  .recycle .recycle-content .list div:nth-child(2){
    padding-top: 49px;
    font-size: 30px;
    font-weight: normal;
  }
  .recycle .recycle-content .list div:nth-child(3){
    padding-top: 31px;
    font-size: 12px;
    font-weight: normal;
    color: #666;
  }
  .recycle .line{
    width: 1040px;
    margin: 38px auto 39px;
    border-bottom: 1px solid #f3f3f3;
  }
</style>
