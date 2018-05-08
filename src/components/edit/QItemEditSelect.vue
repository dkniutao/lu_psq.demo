<template>
<div>
  <el-row>
    <el-col :span="24">
      <xz-sort-table
        :content="item.content"
        :hasUpload="true">
        <el-table-column prop="text" label="选项文字">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.title"
              placeholder="请输入选项文字">
            </el-input>
          </template>
        </el-table-column>
      </xz-sort-table>
    </el-col>
  </el-row>
</div>
</template>

<script>
import xzSortTable from './sortTable.vue'
export default {
  components: {
    xzSortTable
  },
  props: ['item']
}
</script>

<style scoped>
.el-table .el-button .iconfont{line-height: 20px;font-size:20px;color:#126ab5}
.el-table .el-button .iconfont:hover{color:#4188c4}
</style>
