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
      v-html="(index + 1)  + '、' + section.name"
      class="psq-section-title psq-chunk">
    </div>
    <div
      v-if="section.description"
      v-html="section.description"
      class="psq-section-desc psq-chunk">
    </div>

    <div class="psq-list">
      <xz-item
        class="psq-chunk"
        v-for="Q in section.questions"
        :item="Q"
        :key="Q.id">
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
      data: {}
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
