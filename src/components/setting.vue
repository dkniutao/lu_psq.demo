<template>
  <div class="setting">
    <div class="head">问卷设置</div>
    <div class="button">
      <div class="fl">
        <el-button @click="back" class="fl add-psq back" type="primary"><i class="iconfont icon-fanhui1"></i>返回</el-button>
      </div>
      <div class="fr">
        <el-button
          class="fl add-psq"
          type="primary"
          @click="publish(0)">
          保存
        </el-button>
        <el-button
          class="fl add-psq"
          type="primary"
          @click="publish(1)">
          保存并发布
        </el-button>
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
              inactive-color="#ff4949">
            </el-switch>
          </div>
        </div>
        <div class="list_content" v-show="time">
          <div class="startTime">
            <el-checkbox v-model="startCheck">开始时间</el-checkbox>
            <el-date-picker
              prefix-icon="el-icon-date"
              v-model="startTime"
              type="date"
              placeholder="选择日期时间"
              :disabled="startCheck == false"
              value-format="yyyy-MM-dd"
              @change="time_focus">
            </el-date-picker>
          </div>
          <div class="endTime">
            <el-checkbox v-model="endCheck">结束时间</el-checkbox>
            <el-date-picker
              prefix-icon="el-icon-date"
              v-model="endTime"
              type="date"
              placeholder="选择日期时间"
              :disabled="endCheck == false"
              value-format="yyyy-MM-dd"
              @change="time_focus">
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
              inactive-color="#ff4949">
            </el-switch>
          </div>
        </div>
        <div class="list_content" v-show="password">
          <div class="setting_password">
            <div>设置密码</div>
            <el-input v-model="setPassword" type="password" placeholder="请输入内容"
            @blur="passwords"></el-input>
          </div>
          <div class="surePassword">
            <div>再次确认</div>
            <el-input v-model="surePassword" type="password" placeholder="请输入内容"
            @blur="passwords"></el-input>
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
              inactive-color="#ff4949">
            </el-switch>
          </div>
        </div>
        <div class="list_content"
        v-show="power">
          <el-checkbox v-model="checked">每个IP限答一次</el-checkbox>
          <span class="hint">提示：移动网络同一地区会存在使用同一个IP的情况，不推荐使用</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mylib from '../mylib.js'
export default {
  components: {
  },
  props: ['id'],
  data () {
    return {
      time: false, // 时间设置按钮
      startTime: '', // 开始时 model
      startCheck: true, // 开始时间状态
      endTime: '', // 结束时间 model
      endCheck: true, // 开始时间状态
      password: false, // 密码设置显示隐藏
      setPassword: '', // 写入密码 model
      surePassword: '', // 确认密码 model
      power: false, // 权限设置显示隐藏
      checked: false, // IP勾选
      timeNum: 0, // 判断时间是否正确填写，0错误;1正确
      passwordNum: 0 // 判断密码是否正确填写，0错误;1正确
    }
  },
  computed: {
  },
  methods: {
    back () {
      location.href = '#/'
    },
    /**
     * [time_focus 对比时间]
     * @param  {[]}     []
     * @return {[]}     []
     */
    time_focus () {
      if (this.startTime !== '' && this.startTime !== null && this.endtTime !== '' && this.endtTime !== null) {
        this.timeNum = 0
        if (this.endTime) {
          if (this.startTime >= this.endTime) {
            this.$message('开始时间大于结束时间,请重新填写')
          } else {
            this.timeNum = 1
          }
        }
      } else {
        this.$message('开始时间未填写')
        this.timeNum = 0
      }
    },

    /**
     * [passwords 对比密码]
     * @param  {[]}     []
     * @return {[]}     []
     */
    passwords () {
      if (this.setPassword !== '' && this.surePassword !== '') {
        if (this.setPassword !== this.surePassword) {
          this.$message('密码填写有误')
          this.passwordNum = 0
        } else {
          this.passwordNum = 1
        }
      } else {
        this.passwordNum = 0
      }
    },
    /**
     * [publish 保存发布]
     * @param  {[]}     []
     * @return {[]}     []
     */
    publish (status) {
      if (this.timeNum === 1 && this.passwordNum === 1) {
        var startTime = this.startTime.toLocaleString()
        var endTime = this.endTime.toLocaleString()
        var password = this.surePassword
        if (this.checked) {
          var ipLimit = 1
        } else {
          var ipLimit = 0
        }
        var data = {
          id: '12',
          status: '0',
          startTime: startTime,
          endTime: endTime,
          password: password,
          ipLimit: ipLimit
        }
        mylib.axios({
          type: 'post',
          url: 'questionnaire/editsetting',
          params: {
            id: this.id,
            status: status,
            startTime: startTime,
            endTime: endTime,
            password: password,
            ipLimit: ipLimit,
            questionnaire_link: '/#/view/' + this.id
          },
          done (res) {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
            location.href = '#/'
          }
        }, this)
      } else {
        this.$message.error('填写有误,请重新填写')
      }
    }
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
  .setting .button .back .iconfont{
    margin-right: 15px
  }
  .setting .content .setting_list .list_head{
    overflow: hidden;
    font-size: 14px;
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
  .setting .content .setting_list .list_content .startTime{
    margin-top:15px;
  }
    .setting .content .setting_list .list_content .endTime{
    margin-top:30px;
  }
  .setting .content .setting_list .list_content .el-date-editor.el-input{
    margin-left: 41px;
  }
  .setting .content .setting_list .list_content .setting_password,.surePassword{
    overflow: hidden;
    line-height: 60px;
  }
  .setting .content .setting_list .list_content .setting_password div, .surePassword div{
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
  .setting .content .setting_list .list_content .setting_password .el-input, .surePassword .el-input{
    width: 200px;
    height: 30px;
    margin-left: 68px;
    padding-left: 0px;
  }
  .setting .content .setting_list .list_content .el-input__suffix{
    right:20px;
  }
</style>
