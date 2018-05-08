<template>
<div class="clearfix">
  <span class="fl">{{item.content[0]['title']}}</span>
  <el-radio-group class="fl">
    <el-radio 
      v-for="option in item.content" 
      :label="option.score" 
      :title="option.title">
      {{option.score}}
    </el-radio>
  </el-radio-group>
  <span class="fl">{{item.content[item.content.length - 1]['title']}}</span>
</div>
</template>

<script>
export default {
  props: ['item']
}
</script>
