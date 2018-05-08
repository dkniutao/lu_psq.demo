<template>
<div>
  <el-row>
    <el-col :span="24">
      <xz-sort-table
        :data="item.content">
        <el-table-column
          prop="text"
          label="标题文字">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.title"
              placeholder="请输入标题文字">
            </el-input>
          </template>
        </el-table-column>
      </xz-sort-table>
    </el-col>
    <el-col :span="24">
      <el-form
        :inline="true"
        class="demo-form-inline"
        style="margin-top: 20px;">
        <el-form-item label="高度">
          <el-select
            v-model="item.setting.height"
            placeholder="">
            <el-option
              v-for="i in 10"
              :label="i + '行'"
              :value="i">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最小字数">
          <el-input-number
            v-model="item.setting.min"
            :controls="false"
            @blur="checkNumber('min')"
            :min="0"
            :max="99999">
          </el-input-number>
        </el-form-item>
         <el-form-item label="最大字数">
          <el-input-number
            v-model="item.setting.max"
            :controls="false"
            @blur="checkNumber('max')"
            :min="0"
            :max="99999">
          </el-input-number>
        </el-form-item>
      </el-form>
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
  },
  methods: {
    checkNumber (type) {
      setTimeout(() => {
        let set = this.item.setting

        if (set.min > set.max) {
          set[type] = ''
        }
      }, 0)
    }
  }
}
</script>
