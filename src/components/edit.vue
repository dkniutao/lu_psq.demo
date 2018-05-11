<template>
  <div class="psq-content">
    <div class="psq-chunk">编辑问卷</div>
    <div class="psq-chunk clearfix">
      <el-button
        class="fr add-psq"
        type="primary">
        完成编辑
      </el-button>
      <el-button
        class="fr add-psq"
        type="primary"
        style="margin-right: 20px;">
        预览
      </el-button>
    </div>

    <div class="question-type">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="add"
        background-color="#126ab5"
        text-color="#fff"
        active-text-color="#fff">
        <el-menu-item
          v-for="type in QType"
          :index="type.id"
          :key="type.id">
          <i class="iconfont icon-tianjia1"></i>
          {{type.name}}
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 问卷头部标题 -->
    <xz-header></xz-header>

    <!-- 问卷问题列表 -->
    <div class="question-list">
      <div
        v-for="(sec, secIndex) in section"
        :key="'sec_' + secIndex">
        <xz-section
          v-if="sec.name"
          :type="7"
          :type-name="getTypeName(7)"
          :sec="sec"
          :section="section"
          :sec-index="secIndex"
          :point="point">
        </xz-section>
        <xz-section
          v-if="sec.description"
          :type="8"
          :type-name="getTypeName(8)"
          :sec="sec"
          :section="section"
          :sec-index="secIndex"
          :point="point">
        </xz-section>

        <xz-question
          v-for="(ques, quesIndex) in sec.question"
          :key="'ques_' + secIndex + '_' + quesIndex"
          :type="ques.type"
          :type-name="getTypeName(ques.type)"
          :item="ques.item"
          :ques-index="quesIndex"
          :sec-index="secIndex"
          :sec="sec"
          :section="section"
          :point="point">
        </xz-question>
      </div>
    </div>
  </div>
</template>

<script>
import QData from '../assets/editData.json'
import mylib from '../mylib.js'
import _ from 'lodash'

import xzHeader from './edit/header.vue'
import xzQuestion from './edit/question.vue'
import xzSection from './edit/section.vue'

export default {
  components: {
    xzHeader,
    xzQuestion,
    xzSection
  },
  data () {
    return {
      QType: [], // 题目类型
      section: [{
        type: 'section',
        name: '',
        description: '',
        question: []
      }], // 块信息
      point: ['', ''] // 当前插入题目的位置(secIndex, quesIndex)
    }
  },
  methods: {
    getTypeName (type) {
      var target = _.find(this.QType, (v) => {
        return v.id === type
      })

      return target ? target.name : ''
    },
    add (type) {
      let alias = mylib.TYPE_DATA[type]['alias']
      if (alias === 'title' || alias === 'desc') {
        this.addSection(type)
      } else {
        this.addQuestion(type)
      }
    },
    addSection (type) {
      let typeData = mylib.TYPE_DATA[type]
      let secIndex = this.point[0]
      let quesIndex = this.point[1]
      let sec = {
        type: 'section',
        name: '',
        description: '',
        question: []

      }
      if (typeData['alias'] === 'title') {
        sec['name'] = typeData['item']
      } else if (typeData['alias'] === 'desc') {
        sec['description'] = typeData['item']
      }

      let setSec = (sec) => {
        if (!sec.name && typeData['alias'] === 'title') {
          sec['name'] = typeData['item']
        } else if (!sec.description && typeData['alias'] === 'desc') {
          sec['description'] = typeData['item']
        }
      }
      // 判断是否设置了插入点
      if (secIndex === '') {
        // 插入点在最后
        let lastSec = this.section[this.section.length - 1]
        if (lastSec.question.length) {
          this.section.push(sec)
        } else {
          setSec(lastSec)
        }
      } else if (quesIndex === -1) {
        // 插入点在块后面
      } else {
        // 插入点在题后面
        let pointSec = this.section[secIndex]
        let qlen = pointSec.question.length

        // 判断是不是某个模块的最后一题
        if (qlen - 1 === quesIndex) {
          let nextSec = this.section[secIndex + 1]
          // 判断最后一题后面还有没有块
          if (nextSec) {
            setSec(nextSec)
          } else {
            this.section.splice(secIndex + 1, 0, sec)
          }
        } else {
          let pointQues = pointSec.question.splice(quesIndex - qlen + 1)
          sec['question'] = pointQues

          this.section.splice(secIndex + 1, 0, sec)
        }
      }
    },
    addQuestion (type) {
      let typeData = mylib.TYPE_DATA[type]
      let secIndex = this.point[0]
      let quesIndex = this.point[1]

      if (secIndex === '') {
        secIndex = this.section.length - 1

        let lastQues = this.section[secIndex]['question']
        quesIndex = lastQues.length ? lastQues.length - 1 : -1
      }

      this.section[secIndex].question.splice(quesIndex + 1, 0, {
        type: type,
        item: mylib.TYPE_DATA[type]['item']
      })
    }
  },
  mounted () {
    // 获取问题类型
    mylib.axios({
      url: 'questionnaire/getqtype',
      done (res) {
        this.QType = res.data
      }
    }, this)
    // @todo确定知道当前添加题目的位置，然后更新之后题目的题号
    // 就只处理section里面的question数据，这样不容易出错 (决定使用这种方案，分块处理)
    // 每次处理题目编号时，将旧的编号记住，然后遍历section，将旧的替换成新的
    // 移动标题和段落说明时，向上移写好只需要把上一条的最后一个题号拿过来放在自己的队列中即可（按照思路来）
    // 初始化section
    if (QData.section.length) {
      this.section = []

      _.each(QData.section, (sec) => {
        let v = {
          type: 'section',
          name: sec.name,
          description: sec.description,
          question: []
        }
        // 插入题目
        let num = sec.item ? sec.item.split(',') : []
        _.each(num, (n) => {
          let q = QData.question[n - 1]
          if (q) v.question.push(q)
        })

        this.section.push(v)
      })
    }
  }
}
</script>
<style scoped>
.psq-content {background: #fff;width:1200px; margin:0 auto;font-size: 14px;color: #333333;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}
.psq-chunk{border-bottom: 1px solid #e8ecf0;padding:20px;}

/*题型按钮组 start*/
.el-menu-item i{color: #fff;margin-right: 10px;position: relative;top: -1.5px;}
.el-menu--horizontal{border-bottom: none;}
.el-menu--horizontal>.el-menu-item{border-bottom: none;height: 40px;line-height: 40px;width: 120px;text-align: center;padding:0;}
/*题型按钮组 end*/

/*问卷列表 start*/
.question-list{overflow:hidden;}
/*问卷列表 end*/
</style>
