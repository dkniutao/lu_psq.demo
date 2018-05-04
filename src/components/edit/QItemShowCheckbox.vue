<template>
<el-checkbox-group>
    <el-row>
      <el-col v-for="option in item.content" :key="option.id" :span="24">
        <el-checkbox :label="option.id" :key="option.id">{{option.title}}</el-checkbox>
      </el-col>
    </el-row>
</el-checkbox-group>
</template>

<script>
export default {
  props: ['item']
}
</script>
