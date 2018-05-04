<template>
<el-row>
  <el-col :span="24">
    <el-input type="textarea" :rows="item.setting.height"></el-input>
  </el-col>
</el-row>
</template>

<script>
export default {
  props: ['item']
}
</script>
