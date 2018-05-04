<template>
<div>
  <el-radio-group>
    <el-row>
      <el-col v-for="option in item.content" :key="option.key" :span="24">
        <el-radio :label="option.key">
          {{option.title}}
          <img v-if="option.img" :src="option.img">
        </el-radio>
      </el-col>
    </el-row>
  </el-radio-group>
</div>
</template>
<script>
export default {
  props: ['item']
}
</script>
<style scoped>
.el-radio img{display: block;margin: 5px 0 5px 28px;}
</style>
