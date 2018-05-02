<template>
<div>
  <el-radio-group>
    <el-row>
      <el-col v-for="option in source.options" :key="option.id" :span="24">
        <el-radio :label="option.id">{{option.title}}</el-radio>
      </el-col>
    </el-row>
  </el-radio-group>
</div>
</template>
<script>
export default {
  props: ['source']
}
</script>
