<template>
<div class="clearfix">
  <el-table
    :data="item.setting"
    border
    style="width: 100%">
    <el-table-column
      prop="title"
      label=""
      width="180">
    </el-table-column>
    <el-table-column
      v-for="column in item.content"
      :label="column.title + '(分值:' + column.score + ')'">
      <template slot-scope="scope">
        <el-radio :label="column.score">&nbsp;</el-radio>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  props: ['item']
}
</script>
