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
        :list="Question"
        :section="QSection">
      </xz-question-item>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import QData from '../assets/editData.json'
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
      QType: [], //题目类型
      QSection: {}, // 标题和段落说明
      Question: [], //问题列表
      Target: 1 //当前插入题目的位置
    }
  },
  computed: {
    QList () {
      console.log('render');
      let list = _.clone(this.Question)

      _.each(this.QSection, (v, k) => {
        let item = []
        if (v.name) item.push(v.name)
        if (v.desc) item.push(v.desc)
        // 放在最后
        if (k == this.Question.length + 1) {
          list.push(item)
          return
        }
        // 放在题目前
        let index = _.findIndex(list, (l) => {
          return l.order == k
        })

        if (index != -1) {
          list.splice(index, 0, item)
        }
      })

      return _.flatten(list)
    }
  },
  methods: {
    getTypeName (type) {
      var target = _.find(this.QType, (v) => {
        return v.id == type
      })

      return target ? target.name : ''
    },
    updateListOrder () {
      _.each(this.Question, (v, k) => {
        v.order = k + 1
      })
    },
    addQuestion (type) {
      let question = mylib.TYPE_DATA[type]
      let alias = question['alias']

      if (alias === 'title' || alias === 'desc') {
        let section = this.QSection[this.Target + 1]

        if (section) {
          if (alias === 'title' && !section['name']) {
            section['name'] = {
              item: {
                title: '<strong>请输入标题</strong>'
              },
              num: this.Target + 1,
              type: type
            }

          }
          if (alias === 'desc' && !section['desc']) {
            section['desc'] = {
              item: {
                title: '请输入段落说明'
              },
              num: this.Target + 1,
              type: type
            }
          }

          delete this.QSection[this.Target + 1]
          this.$set(this.QSection, this.Target + 1, section)
        } else {
          let section = {}
          if (alias === 'title') {
            section['name'] = {
              item: {
                title: '<strong>请输入标题</strong>'
              },
              num: this.Target + 1,
              type: type
            }
          } else if (alias === 'desc') {
            section['desc'] = {
              item: {
                title: '请输入段落说明'
              },
              num: this.Target + 1,
              type: type
            }
          }

          delete this.QSection[this.Target + 1]
          this.$set(this.QSection, this.Target + 1, section)
        }
        return
      }

      this.Question.splice(this.Target, 0, {
        type: type,
        order: '',
        item: question['item']
      })
      this.updateListOrder()
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

    // 设置标题和段落
    _.each(QData.section, (v) => {
      let num = v.item.split(',')[0] //题号
      let section = []
      let setSection = (title, type) => {
        return title ? {
          item: {
            title: title
          },
          num: num,
          type: type
        } : ''
      }
      section['name'] = setSection(v.name, 7)
      section['desc'] = setSection(v.description, 8)

      this.QSection[num] = section
    })

    this.Question = QData.question
    // this.Target = this.Question.length
    this.Target = 4
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
