<template>
<div class="psq-content">
  <div class="psq-header psq-chunk">
    <div class="title" v-html="data.name"></div>
    <div class="desc" v-html="data.description"></div>
  </div>
  <div class="psq-section">
    <div
      v-for="(section, index) in data.section"
      :key="index">
      <div
        v-if="section.name"
        v-text="getChinaNumber(index + 1)  + '、' + section.name"
        class="psq-section-title psq-chunk">
      </div>
      <div
        v-if="section.description"
        v-text="section.description"
        class="psq-section-desc psq-chunk">
      </div>

      <div class="psq-list">
        <xz-item
          class="psq-chunk"
          v-for="Q in section.questions"
          :item="Q"
          :section="data.section"
          :key="Q.id"
          :logic="logic"
          @find-logic="findLogic">
        </xz-item>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import _ from 'lodash'
import mylib from '../mylib.js'
import xzItem from './preview/QItem.vue'

export default {
  props: ['id'],
  components: {
    xzItem
  },
  data () {
    return {
      data: {},
      logic: {}
    }
  },
  methods: {
    findLogic (ques) {
      console.log(ques)
    },
    getChinaNumber (num) {
      const CNUM = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
      const UNIT = ['', '十', '百', '千', '万', '亿'];
      const EXUNIT = ['', '万', '亿'];
      num = parseInt(num, 10)
      let arr = num.toString().split('').reverse()
      let chunk = []
      let temp = []
      for (let i = 0; i < arr.length; i++) {
        temp.push(arr[i])

        if (i !== 0 && (i + 1) % 4 === 0 || i === arr.length - 1) {
          chunk.push(temp)
          temp = []
        }
      }
      let res = ''
      for (let i = 0; i < chunk.length; i++) {
        let temp = ''
        for (let j = 0; j < chunk[i].length; j++) {
          temp = CNUM[chunk[i][j]] + UNIT[j] + temp
        }
        temp += EXUNIT[i]

        res = temp + res
      }
      res = res
      .replace(/零十/, '零')
      .replace(/零百/, '零')
      .replace(/零千/, '零')
      .replace(/^一十/, '十')
      .replace(/零+/, '零')
      .replace(/零$/, '')

      return res
    }
  },
  mounted () {
    mylib.axios({
      url: 'questionnaire/preview',
      params: {
        id: this.id
      },
      done (res) {
        this.data = res.data
        // 设置跳题逻辑
        _.each(res.data.logic, (l) => {
          if (l.action === '1')
          {
            this.logic[l.order] = this.logic[l.order] || {}
            this.logic[l.order]['all'] = l.rules
          } else if (l.action === '2') {
            this.logic[l.order] = this.logic[l.order] || {}
            this.logic[l.order] = _.extend(this.logic[l.order], l.rules)
          } else if (l.action === '3') {
            _.each(l.rules, (key, ques) => {
              if (!(this.logic[ques] && this.logic[ques][key])) {
                this.logic[ques] = this.logic[ques] || {}
                this.logic[ques][key] = l.order
              }
            })
          }
        })
      }
    }, this)
  }
}
</script>
<style scoped>
.psq-content {font-size: 14px;background: #fff;width:1200px; margin:0 auto;padding:60px;color: #333333;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}
.psq-chunk{border-bottom: 1px solid #f3f3f3;margin:0 20px;padding:20px 0;}

/*问卷说明 start*/
.psq-header{box-sizing: border-box;padding-bottom: 40px;}
.psq-header .title{text-align: center;font-size: 18px;font-weight: bold;line-height: 24px;margin-bottom: 10px;}
.psq-header .desc{font-size: 14px;color: #666666;}
/*问卷说明 end*/

/*标题和段落 start*/
.psq-section-title{font-weight: bold;padding-top:40px;}
/*标题和段落 end*/

/*问题列表 start*/
.psq-list .psq-chunk{padding-top: 40px;}
/*问题列表 end*/
</style>
