<template>
  <div class="psq-content">
    <div class="psq-chunk">编辑问卷</div>
    <div class="psq-chunk clearfix">
      <el-button
        class="fr add-psq"
        type="primary"
        @click="finish">
        完成编辑
      </el-button>
      <el-button
        class="fr add-psq"
        type="primary"
        style="margin-right: 20px;"
        @click="view">
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
    <xz-header
      :title="title">
    </xz-header>

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
import mylib from '../mylib.js'
import _ from 'lodash'

import xzHeader from './edit/header.vue'
import xzQuestion from './edit/question.vue'
import xzSection from './edit/section.vue'

export default {
  props: ['id'],
  components: {
    xzHeader,
    xzQuestion,
    xzSection
  },
  data () {
    return {
      title: {
        name: '',
        desc: ''
      },
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
    getData () {
      console.log(this.section)
      let question = []
      let section = []
      let logic = []

      // 设置块
      _.each(this.section, (sec) => {
        let s = {
          name: sec.name,
          description: sec.description,
          item: []
        }

        // 设置问题列表
        _.each(sec.question, (ques) => {
          let q = {
            type: ques.type,
            order: question.length + 1,
            item: {
              title: ques.item.title
            }
          }
          if (ques.item.content) q.item.content = ques.item.content
          if (ques.item.setting) q.item.setting = ques.item.setting

          question.push(q)
          s.item.push(q.order)

          // 设置逻辑
          _.each(ques.item.logic, (rule, action) => {
            logic.push({
              order: q.order,
              action: action,
              rule: rule
            })
          })
        })

        s.item = s.item.join(',')
        section.push(s)
      })
      return {
        question,
        section,
        logic
      }
    },
    finish () {
      let data = this.getData()
      mylib.axios({
        type: 'post',
        url: 'questionnaire/edit',
        params: {
          id: this.id,
          name: this.title.name,
          description: this.title.desc,
          question: JSON.stringify({question: data.question}),
          section: JSON.stringify({section: data.section}),
          logic: JSON.stringify({logic: data.logic})
        },
        done (res) {

        }
      }, this)
    },
    view () {
      let data = this.getData()
    },
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
        item: _.clone(mylib.TYPE_DATA[type]['item'])
      })
    }
  },
  created () {
    mylib.axios({
      url: 'questionnaire/preview',
      params: {
        id: this.id
      },
      done (res) {
        this.title.name = res.data.name
        this.title.desc = res.data.description

        // 预处理题目逻辑
        let logic = {}
        _.each(res.data.logic, (l) => {
          logic[l.order] = logic[l.order] || {}
          logic[l.order][l.action] = l.rules
        })

        if (res.data.section.length) {
          this.section = []
          _.each(res.data.section, (sec) => {
            let s = {
              type: 'section',
              name: sec.name,
              description: sec.description,
              question: []
            }

            _.each(sec.questions, (ques) => {
              let q = {
                type: ques.type,
                item: ques.question
              }
              q['item']['logic'] = logic[ques.order] || {}
              s.question.push(q)
            })

            this.section.push(s)
          })
        }
      }
    }, this)
  },
  mounted () {
    // 获取问题类型
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
