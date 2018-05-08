<template>
  <div class="release_questionnaire">
    <div class="head">发布问卷</div>
    <div class="banner">
      <div class="success"><i class="iconfont icon-xiaolianchenggong"></i>发布成功 ！</div>
    </div>
    <div class="content">
      <div class="link">
        <span>问卷链接</span>
        <span><input type="text"></span>
        <el-button class="add-psq" type="primary">复制</el-button>
      </div>
      <div class="code">
        <span>问卷二维码</span>
        <div><img src="" alt=""></div>
        <span><el-button class="add-psq" type="primary" @click="dialogTableVisible = true">下载二维码</el-button></span>
      </div>
      <div class="share">
        <span>第三方分享</span>
        <span>
          <i class="iconfont"
          v-for="(icon, index) in share"
          :key="index"
          :class="icon"
          :style="{color:(index==item_index? showColor:'')}"
          @mouseover="overShow(index)"
          @mouseout="outShow(index)"
          @click="sharemsg(index)"></i>
        </span>
      </div>
    </div>
 
    <el-dialog title="下载二维码" :visible.sync="dialogTableVisible" width="800px">
      <el-table :data="gridData" border>
        <el-table-column property="date" label="尺寸" width="210"></el-table-column>
        <el-table-column property="name" label="使用场景" width="280"></el-table-column>
        <el-table-column  label="下载">
          <template slot-scope="scope">
            <i class="icon" :class="scope.row.icon"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: [
  ],
  data () {
    return {
      share: ['icon-weixin1', 'icon-QQ', 'icon-kongjian', 'icon-weibo1'], // 分享图标
      showColor: '', // 替换分享图标
      item_index: '', // 分享图标当前index值
      gridData: [{
        date: '150*150',
        name: '常规尺寸',
        icon: 'iconfont icon-xiazai'
      }, {
        date: '256*256',
        name: '适合插入文档使用',
        icon: 'iconfont icon-xiazai'
      }, {
        date: '512*512',
        name: '适合插入PPT使用',
        icon: 'iconfont icon-xiazai'
      }, {
        date: '1024*1024',
        name: '适合印刷出版社使用',
        icon: 'iconfont icon-xiazai'
      }],
      dialogTableVisible: false, //dialog 弹窗
    }
  },
  computed: {
  },
  methods: {
    /**
     * [overShow 鼠标移入图标颜色]
     * @param  {[number]} index [当前图标的index值]
     * @return {[type]}       [description]
     */
    overShow (index) {
      this.item_index = index
      if (index === 0) {
        this.showColor = '#50b674'
      } else if (index === 1) {
        this.showColor = '#30a5dd'
      } else if (index === 2) {
        this.showColor = '#f5bc32'
      } else if (index === 3) {
        this.showColor = '#ea5d5c'
      }
    },
    /**
     * [outShow 鼠标移出图标颜色]
     * @param  {[number]} index [当前图标的index值]
     * @return {[type]}       [description]
     */
    outShow (index) {
      this.showColor = '#999'
    },
    /**
     * [share 分享链接]
     * @param  {[number]} index [当前图标的index值]
     * @return {[type]} [description]
     */
    sharemsg (index) {
      console.log(1111)
      if (index === 0) {
        window.location.href = ''
      } else if (index === 1) {
        window.window.open ("http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESC}}&pics={{IMAGE}}&summary={{SUMMARY}}")
      } else if (index === 2) {
        window.window.open ("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESC}}&summary={{SUMMARY}}&site={{SOURCE}}&pics={{IMAGE}}")
      } else if (index === 3) {
        window.window.open ("http://service.weibo.com/share/mobile.php?url={{URL}}&title={{DESC}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}")
      }
    },

  },
  created () {
  },
  mounted () {
  }
}
</script>
<style scoped>
  .release_questionnaire{
    width: 1200px;
    height: 1056px;
    margin:0 auto;
    background: #fff;
  }
  .release_questionnaire .head{
    padding-left: 19px;
    font-size: 16px;
    line-height: 59px;
    border-bottom: 1px solid #e8ecf0;
  }
  .release_questionnaire .banner{
    height: 200px;
    line-height: 200px;
    color: #126ab5;
    text-align: center;
    border-bottom:1px solid #e8ecf0;
  }
  .release_questionnaire .banner .success,.iconfont{
    display: inline-block;
    font-size: 24px;
  }
  .release_questionnaire .banner .iconfont{
    float: left;
    padding-right: 20px;
    font-size: 40px;
  }
  .release_questionnaire .content div{
    margin: 15px 0;
  }
  .release_questionnaire .content div span:first-child{
    display: inline-block;
    width: 135px;
    padding-left: 40px;
    line-height: 30px;
  }
  .release_questionnaire .content .link input{
    width: 620px;
    height: 30px;
  }
  .release_questionnaire .content .link button{
    position: relative;
    left: -5px;
    top: 1px;
  }
  .release_questionnaire .content  button{
    border-radius: 0;
    padding: 9px 29px;
  }
  .release_questionnaire .content .code div{
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: #ffffff;
    border: solid 1px #cccccc;
  }
  .release_questionnaire .content .code .el-button{
    position: relative;
    top: 5px;
    margin-left: 40px;
  }
  .release_questionnaire .content .share i.iconfont{
    position: relative;
    top: 5px;
    margin-right: 15px;
    font-size: 30px;
    color: #999999;
    cursor: pointer;
  }
  .release_questionnaire .icon-xiazai{
    color: #126ab5;
    cursor: pointer;
  }
</style>
<style>
  /*弹窗*/
  .release_questionnaire .el-dialog__header{
    height: 50px;
    padding: 0 0 0 20px;
    background: #eee;
  }
  .release_questionnaire .el-dialog__title{
    line-height: 50px;
    font-size: 16px;
  }
  .release_questionnaire .el-dialog__headerbtn{
    top: 18px;
  }
  .release_questionnaire .el-dialog__body{
    padding: 20px 40px 40px;
  }
  .release_questionnaire .el-table thead{
    text-align: center;
    background: #f3f3f3;
  }
  .release_questionnaire .el-table td, .el-table th{
    height: 40px;
    padding: 0;
  }
  .release_questionnaire .el-table th.is-leaf{
    padding-left: 83px;
  }
  .release_questionnaire .el-table--border td, .el-table--border th{
    border-right: none;
    padding-left: 83px;
  }
</style>
