<template>
<div>
  <div class="item-title">
    <span v-text="item.order + '.'"></span>
    {{item.question.title}}
  </div>
  <template v-if="alias == 'radio'">
  </template>
</div>
</template>
<script>
  import _ from 'lodash'
  import mylib from '@/mylib.js'
  export default {
    props: ['item'],
    data () {
      return {}
    },
    computed: {
      alias () {
        return mylib.TYPE_DATA[this.item.type]['alias']
      }
    },
    methods: {

    }
  }
</script>
<style scoped>
.item-title span{margin-right: 20px;}
</style>
