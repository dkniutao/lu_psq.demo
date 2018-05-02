<template>
<div>
  <el-row>
    <el-col :span="12">
      <quill-editor v-model="source.title"
        ref="myQuillEditor">
      </quill-editor>
    </el-col>
    <el-col :span="12">

    </el-col>
    <el-col :span="24">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 20px;">
        <el-form-item label="高度">
          <el-select v-model="formInline.region" placeholder="">
            <el-option label="1行" value="1"></el-option>
            <el-option label="2行" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最小字数">
          <el-input-number v-model="formInline.region" :controls="false"></el-input-number>
        </el-form-item>
         <el-form-item label="最大字数">
          <el-input-number v-model="formInline.region" :controls="false"></el-input-number>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  props: ['source'],
  data () {
    return {
      formInline: {}
    }
  },
  methods: {
  }
}
</script>
