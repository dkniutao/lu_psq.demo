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

import xzQuestionHeader from './edit/QHeader.vue'
import xzQuestion from './edit/question.vue'
import xzSection from './edit/section.vue'

export default {
  components: {
    xzQuestionHeader,
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
    // updateListOrder () {
    //   _.each(this.Question, (v, k) => {
    //     v.order = k + 1
    //   })
    // },
    addQuestion (type) {
      let question = {
        type: type,
        item: mylib.TYPE_DATA[type]['item']
      }
      // 设置插入点
      let secIndex = this.point[0]
      let quesIndex = this.point[1]
      // 默认插入点
      if (secIndex === '') {
        let lastSec = this.section[this.section.length - 1]
        if (lastSec.question.length) {
          secIndex = this.section.length - 1
          quesIndex = lastSec.question.length - 1
        } else {
          secIndex = this.section.length - 1
          quesIndex = -1
        }
      }
      // 插入题目
      let sec = this.section[secIndex]
      sec.question.splice(quesIndex + 1, 0, question)

      // if (this.point.type === 'section') {
      //   this.point.question.unshift(question)
      // } else {

      // }

      // @todo确定知道当前添加题目的位置，然后更新之后题目的题号
      // 就只处理section里面的question数据，这样不容易出错 (决定使用这种方案，分块处理)
      // 每次处理题目编号时，将旧的编号记住，然后遍历section，将旧的替换成新的
      // 移动标题和段落说明时，向上移写好只需要把上一条的最后一个题号拿过来放在自己的队列中即可（按照思路来）
      // let question = mylib.TYPE_DATA[type]
      // let alias = question['alias']

      // this.Question.splice(this.point, 0, {
      //   type: type,
      //   order: '',
      //   item: question['item']
      // })

      // let question = mylib.TYPE_DATA[type]
      // let alias = question['alias']

      // if (alias === 'title' || alias === 'desc') {
      //   let section = this.section[this.point + 1]

      //   if (section) {
      //     if (alias === 'title' && !section['name']) {
      //       section['name'] = {
      //         item: {
      //           title: '<strong>请输入标题</strong>'
      //         },
      //         num: this.point + 1,
      //         type: type
      //       }
      //     }
      //     if (alias === 'desc' && !section['desc']) {
      //       section['desc'] = {
      //         item: {
      //           title: '请输入段落说明'
      //         },
      //         num: this.point + 1,
      //         type: type
      //       }
      //     }

      //     delete this.section[this.point + 1]
      //     this.$set(this.section, this.point + 1, section)
      //   } else {
      //     let section = {}
      //     if (alias === 'title') {
      //       section['name'] = {
      //         item: {
      //           title: '<strong>请输入标题</strong>'
      //         },
      //         num: this.point + 1,
      //         type: type
      //       }
      //     } else if (alias === 'desc') {
      //       section['desc'] = {
      //         item: {
      //           title: '请输入段落说明'
      //         },
      //         num: this.point + 1,
      //         type: type
      //       }
      //     }

      //     delete this.section[this.point + 1]
      //     this.$set(this.section, this.point + 1, section)
      //   }
      //   return
      // }

      // this.Question.splice(this.point, 0, {
      //   type: type,
      //   order: '',
      //   item: question['item']
      // })
      // this.updateListOrder()
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
