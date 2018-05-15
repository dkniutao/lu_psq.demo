<template>
  <div class="release_questionnaire">
    <div class="head">分享问卷</div>
    <xz-questionnaire-content></xz-questionnaire-content>
  </div>
</template>

<script>
import xzQuestionnaireContent from './ReleaseShare/QcontentShareRelease.vue'

export default {
  components: {
    xzQuestionnaireContent
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
</style>

