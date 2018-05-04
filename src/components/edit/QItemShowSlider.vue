<template>
<el-row :gutter="20">
  <el-col :span="4" style="text-align: right;">
    <span v-html="item.content.min.title + '【' + item.content.min.val + '】'"></span>
  </el-col>
  <el-col :span="16">
    <el-slider :min="item.content.min.val" :max="item.content.max.val"></el-slider>
  </el-col>
  <el-col :span="4">
    <span v-html="item.content.max.title + '【' + item.content.max.val + '】'"></span>
  </el-col>
</el-row>
</template>

<script>
export default {
  props: ['item']
}
</script>

