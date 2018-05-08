<template>
<div>
  <el-row>
    <el-col :span="24">
      <xz-sort-table
        :data="item.setting">
        <el-table-column label="标题文字">
          <template slot-scope="scope">
            <el-input v-model="scope.row.title" placeholder="请输入标题文字"></el-input>
          </template>
        </el-table-column>
      </xz-sort-table>
    </el-col>

    <el-col :span="24">
      <xz-sort-table
        :data="item.content">
        <el-table-column label="选项文字">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.title"
              placeholder="请输入选项文字">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="分数" width="240">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.score"
              :controls="false"
              :min="0"
              :max="9999">
            </el-input-number>
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
  props: ['item'],
  components: {
    xzSortTable
  }
}
</script>
