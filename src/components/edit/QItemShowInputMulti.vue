<template>
<el-row>
  <el-col :span="24">
    <el-form ref="form" label-width="80px">
      <el-form-item label="标题1">
        <el-input type="textarea" rows="1"></el-input>
      </el-form-item>
      <el-form-item label="标题2">
        <el-input type="textarea" rows="1"></el-input>
      </el-form-item>
    </el-form>
  </el-col>
</el-row>
</template>

<script>
export default {
  props: ['source']
}
</script>
