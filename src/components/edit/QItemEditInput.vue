<template>
<div>
  <el-row>
    <el-col :span="24">
      <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px;">
        <el-form-item label="高度">
          <el-select v-model="item.setting.height" placeholder="">
            <el-option label="1行" value="1"></el-option>
            <el-option label="2行" value="2"></el-option>
            <el-option label="3行" value="3"></el-option>
            <el-option label="4行" value="4"></el-option>
            <el-option label="5行" value="5"></el-option>
            <el-option label="6行" value="6"></el-option>
            <el-option label="7行" value="7"></el-option>
            <el-option label="8行" value="8"></el-option>
            <el-option label="9行" value="9"></el-option>
            <el-option label="10行" value="10"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最小字数">
          <el-input-number v-model="item.setting.min" :controls="false"></el-input-number>
        </el-form-item>
         <el-form-item label="最大字数">
          <el-input-number v-model="item.setting.max" :controls="false"></el-input-number>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {}
  },
  methods: {
  }
}
</script>
