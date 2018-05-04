<template>
  <div class="setting">
    <div class="head">问卷设置</div>
    <div class="button">
      <div class="fl">
        <el-button class="fl add-psq back" type="primary"><img src="../assets/back.png" alt="">返回</el-button>
      </div>
      <div class="fr">
        <el-button class="fl add-psq" type="primary">保存</el-button>
        <el-button class="fl add-psq" type="primary">保存并发布</el-button>
      </div>
    </div>
    <div class="content">
      <div class="setting_list">
        <div class="list_head">
          <div>时间设置</div>
          <div>
            <el-switch
              v-model="time"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="setting($event,1)">
            </el-switch>
          </div>
        </div>
        <div class="list_content" v-show="timeShow">
          <div class="start_time">
            <el-checkbox v-model="start_check">开始时间</el-checkbox>
            <el-date-picker
              prefix-icon="el-icon-date"
              v-model="start_time"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
          <div class="end_time">
            <el-checkbox v-model="end_check">结束时间</el-checkbox>
            <el-date-picker
              prefix-icon="el-icon-date"
              v-model="end_time"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="setting_list">
        <div class="list_head">
          <div class="list">密码设置</div>
          <div class="list">
            <el-switch
              v-model="password"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="setting($event, 2)">
            </el-switch>
          </div>
        </div>
        <div class="list_content" v-show="passwordShow">
          <div class="setting_password">
            <div>设置密码</div>
            <el-input v-model="set_password" placeholder="请输入内容"></el-input>
          </div>
          <div class="sure_password">
            <div>再次确认</div>
            <el-input v-model="sure_password" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </div>
      <div class="setting_list">
        <div class="list_head">
          <div>权限设置</div>
          <div>
            <el-switch
              v-model="power"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="setting($event, 3)">
            </el-switch>
          </div>
        </div>
        <div class="list_content"
        v-show="powerShow">
          <el-checkbox v-model="checked">每个IP限答一次</el-checkbox>
          <span class="hint">提示：移动网络同一地区会存在使用同一个IP的情况，不推荐使用</span>
        </div>
      </div>
    </div>
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
      time: false, // 时间设置按钮
      timeShow: true, // 时间设置显示隐藏
      start_time: '', // 开始时 model
      start_check: 'true', // 开始时间状态
      end_time: '', // 结束时间 model
      end_check: 'true', // 开始时间状态
      password:false,
      power:false,
      checked:false,
      passwordShow: false, // 密码设置显示隐藏
      set_password: '', // 写入密码 model
      sure_password: '',  // 确认密码 model
      powerShow: false, //权限设置显示隐藏

    }
  },
  computed: {
  },
  methods: {
    /**
     * [时间设置显示隐藏]
     * @param  {[type]} $event    [布尔值判断当前设置显示隐藏]
     * @return {[number]}   num   [1:时间设置,2]
     */
    setting_time ($event) {
      console.log('$event', $event)
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>
<style scoped>
  .setting{
    width: 1200px;
    height: 1056px;
    margin:0 auto;
    background: #fff;
  }
  .setting .head{
    padding-left: 20px;
    line-height: 58px;
    border-bottom: 1px solid #e8ecf0;
  }
  .setting .button{
    height: 60px;
    overflow: hidden;
    border-bottom: 1px solid #e8ecf0;
  }
  .setting .button .fl button{
    margin: 20px 0 11px 20px;
  }
  .setting .button .fr button{
    margin:20px 20px 11px 0;
  }
  .setting .button .back{
    width: 130px;
  }
  .setting .button .back img{
    float: left;
    position: relative;
    top: -1px;
    left: 14px;
    margin-right: 15px
  }
  .setting .content .setting_list .list_head{
    overflow: hidden;
  }
  .setting .content .setting_list .list_head div{
    float: left;
    line-height: 60px;
  }
  .setting .content .setting_list .list_head div:first-child{
    width: 137px;
    text-align: center;
  }
  .setting .content .setting_list .list_head div:last-child{
    margin-top:10px;
  }
  .setting .content .setting_list .list_content{
    padding-left: 137px;
  }
  .setting .content .setting_list .list_content .start_time{
    margin-top:15px;
  }
    .setting .content .setting_list .list_content .end_time{
    margin-top:30px;
  }
  .setting .content .setting_list .list_content .el-date-editor.el-input{
    margin-left: 41px;
  }
  .setting .content .setting_list .list_content .setting_password,.sure_password{
    overflow: hidden;
    line-height: 60px;
  }
  .setting .content .setting_list .list_content .setting_password div, .sure_password div{
    font-size: 14px;
    float: left;
  }
  .setting .content .setting_list .list_content .hint{
    font-size: 12px;
    margin-left:39px;
    color: #df1a1a
  }

</style>
<style>
  .setting .content .setting_list .list_content .el-input__inner{
    width: 200px;
    height: 30px;
  }
  .setting .content .setting_list .list_content .el-input__icon{
    line-height: 30px;
    font-size: 16px;
  }
  .setting .content .setting_list .list_content .setting_password .el-input, .sure_password .el-input{
    width: 200px;
    height: 30px;
    margin-left: 68px;
    padding-left: 0px;
  }
</style>
