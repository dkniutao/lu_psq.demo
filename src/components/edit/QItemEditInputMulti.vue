<template>
<div>
  <el-row>
    <el-col :span="24">
      <el-table
        :data="item.content"
        style="width: 100%">
        <el-table-column
          prop="text"
          label="标题文字">
          <template slot-scope="scope">
            <el-input v-model="scope.row.title" placeholder="请输入标题文字"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="operate"
          label="操作">
          <template slot-scope="scope">
            <el-button class="fl" type="text" @click="add(scope.row, scope.$index)">
              <i class="iconfont icon-jia1"></i>
            </el-button>
            <el-button class="fl" type="text" @click="del(scope.row, scope.$index)">
              <i class="iconfont icon-jian1"></i>
            </el-button>
            <el-button class="fl" type="text" @click="down(scope.row, scope.$index)">
              <i class="iconfont icon-xiayi" style="font-size: 25px;"></i>
            </el-button>
            <el-button class="fl" type="text" @click="up(scope.row, scope.$index)">
              <i class="iconfont icon-shangyi" style="font-size: 25px;"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
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
          <el-input-number v-model="item.setting.min" :controls="false" @blur="checkNumber('min')" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
         <el-form-item label="最大字数">
          <el-input-number v-model="item.setting.max" :controls="false" @blur="checkNumber('max')" :min="0" :max="99999999"></el-input-number>
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
    checkNumber (type) {
      setTimeout(() => {
        let set = this.item.setting

        if (set.min > set.max) {
          set[type] = ''
        }
      }, 0)
    },
    add (row, index) {
      let len = this.item.content.length
      this.item.content.splice(index + 1, 0, {
        key: len,
        title: '新标题' + len
      })
    },
    del (row, index) {
      if (this.item.content.length <= 1) return;

      this.item.content.splice(index, 1)
    },
    down (row, index) {
      if (index >= this.item.content.length - 1) return;

      this.item.content.splice(index, 1)
      this.item.content.splice(index + 1, 0, row)
    },
    up (row, index) {
      if (index <= 0) return;

      this.item.content.splice(index, 1)
      this.item.content.splice(index - 1, 0, row)
    }
  }
}
</script>
<style scoped>
.el-table .el-button .iconfont{line-height: 20px;font-size:20px;color:#126ab5}
.el-table .el-button .iconfont:hover{color:#4188c4}
</style>
