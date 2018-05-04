<template>
<div>
  <el-row>
    <el-col :span="24">
      <el-table :data="item.content" style="width: 100%">
        <el-table-column label="选项文字">
          <template slot-scope="scope">
            <el-input v-model="scope.row.title" placeholder="请输入选项文字"></el-input>
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
        <el-table-column label="操作">
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
    add (row, index) {
      let len = this.item.content.length
      this.item.content.splice(index + 1, 0, {
        score: index + 2,
        title: '新选项' + len
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
