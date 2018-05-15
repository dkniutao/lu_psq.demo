<template>
  <div class="release_questionnaire">
    <div class="head">发布问卷</div>
    <div class="banner">
      <div class="success"><i class="iconfont icon-xiaolianchenggong"></i>发布成功 ！</div>
    </div>
    <xz-question-content></xz-question-content>
  </div>
</template>

<script>
import XzQuestionContent from './ReleaseShare/QcontentShareRelease.vue'

export default {
  components: {
    XzQuestionContent
  },
  props: [
  ],
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
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
</style>
