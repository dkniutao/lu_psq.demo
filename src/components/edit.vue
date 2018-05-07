<template>
  <div class="psq-content">
    <div class="psq-chunk">编辑问卷</div>
    <div class="psq-chunk clearfix">
      <el-button class="fr add-psq" type="primary">完成编辑</el-button>
      <el-button class="fr add-psq" type="primary" style="margin-right: 20px;">预览</el-button>
    </div>

    <div class="question-type">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="addQuestion"
        background-color="#126ab5"
        text-color="#fff"
        active-text-color="#fff">
        <el-menu-item v-for="type in QType" :index="type.id" :key="type.id">
          <i class="iconfont icon-tianjia1"></i>{{type.name}}
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 问卷头部标题 -->
    <xz-question-header></xz-question-header>

    <!-- 问卷分割线 -->
    <div class="question-line"></div>

    <!-- 问卷问题列表 -->
    <div class="question-list">
      <!-- 单选 -->
      <xz-question-item 
        v-for="item in QList" 
        :order="item.order" 
        :type="item.type" 
        :type-name="getTypeName(item.type)" 
        :item="item.item" :key="item.order" 
        :list="QList">
      </xz-question-item>
    </div>
  </div>
</template>

<script>
import QList from '../assets/question.json'
import mylib from '../mylib.js'
import _ from 'lodash'

import xzQuestionHeader from './edit/QHeader.vue'
import xzQuestionItem from './edit/QItem.vue'

export default {
  components: {
    xzQuestionHeader,
    xzQuestionItem
  },
  data () {
    return {
      QType: [],
      QList: QList
    }
  },
  methods: {
    getTypeName (type) {
      var target = _.find(this.QType, (v) => {
        return v.id == type
      })

      return target ? target.name : ''
    },
    addQuestion (type) {
      console.log(type)
    }
  },
  mounted () {
    mylib.axios({
      url: 'questionnaire/getqtype',
      done (res) {
        this.QType = res.data
      }
    }, this)
  }
}
</script>
<style scoped>
.psq-content {background: #fff;width:1200px; margin:0 auto;}
.psq-chunk{border-bottom: 1px solid #e8ecf0;padding:20px;}

/*题型按钮组 start*/
.el-menu-item i{color: #fff;margin-right: 10px;position: relative;top: -1.5px;}
.el-menu--horizontal{border-bottom: none;}
.el-menu--horizontal>.el-menu-item{border-bottom: none;height: 40px;line-height: 40px;width: 120px;text-align: center;padding:0;}
/*题型按钮组 end*/

/*问卷分割线 start*/
.question-line{height: 1px;margin:20px 80px;background: #f3f3f3;}
/*问卷分割线 end*/

/*问卷列表 start*/
.question-list{overflow:hidden;}
/*问卷列表 end*/
</style>
