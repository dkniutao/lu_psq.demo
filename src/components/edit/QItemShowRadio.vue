<template>
<div>
  <el-radio-group>
    <el-row>
      <el-col v-for="option in item.content" :key="option.key" :span="24">
        <el-radio :label="option.key">{{option.title}}</el-radio>
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
