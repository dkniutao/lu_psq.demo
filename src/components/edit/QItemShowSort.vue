<template>
<el-checkbox-group>
    <el-row>
      <el-col v-for="option in item.content" :key="option.id" :span="24">
        <el-checkbox :label="option.id" :key="option.id">
          {{option.title}}
          <img v-if="option.img" :src="option.img">
        </el-checkbox>
      </el-col>
    </el-row>
</el-checkbox-group>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style scoped>
.el-checkbox img{display: block;margin: 5px 0 5px 5px;}
</style>

