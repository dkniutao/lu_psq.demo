<template>
<div>
  <el-row>
    <el-col :span="24">
      <el-form :inline="true" class="demo-form-inline">
        <el-row>
          <el-col :span=24>
            <el-form-item label="最小值">
              <el-input-number v-model="item.content.min.val" :controls="false"></el-input-number>
            </el-form-item>
            <el-form-item label="最小值显示文本">
              <el-input v-model="item.content.min.title" placeholder="最小值显示文本"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=24>
            <el-form-item label="最大值">
              <el-input-number v-model="item.content.max.val" :controls="false"></el-input-number>
            </el-form-item>
            <el-form-item label="最大值显示文本">
              <el-input v-model="item.content.max.title" placeholder="最大值显示文本"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
  methods: {}
}
</script>
