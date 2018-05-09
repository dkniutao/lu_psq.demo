<template>
<div>
  <el-table :data="data" style="width: 100%">
    <!--表格列信息-->
    <slot></slot>
    <el-table-column
      v-if="hasUpload"
      prop="img"
      label="图片"
      width="240">
      <template slot-scope="scope">
        <el-button
          type="text"
          @click="uploadImg(scope.row, scope.$index)">
          <i class="iconfont icon-tupian2" style="font-size: 25px;"></i>
          <span v-text="getImgName(scope.row.img)"></span>
        </el-button>
      </template>
    </el-table-column>
    <el-table-column prop="operate" label="操作">
      <template slot-scope="scope">
        <el-button
          class="fl"
          type="text"
          @click="add(scope.row, scope.$index)">
          <i class="iconfont icon-jia1"></i>
        </el-button>
        <el-button
          class="fl"
          type="text"
          @click="del(scope.row, scope.$index)">
          <i class="iconfont icon-jian1"></i>
        </el-button>
        <el-button
          class="fl"
          type="text"
          @click="down(scope.row, scope.$index)">
          <i class="iconfont icon-xiayi" style="font-size: 25px;"></i>
        </el-button>
        <el-button
          class="fl"
          type="text"
          @click="up(scope.row, scope.$index)">
          <i class="iconfont icon-shangyi" style="font-size: 25px;"></i>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <xz-upload-img
    ref="uploadImg">
  </xz-upload-img>
   <!--  :row="uploadImgRow"
    :visible.sync="uploadImgVisible" -->
</div>
</template>

<script>
import xzUploadImg from './uploadImg.vue'
export default {
  components: {
    xzUploadImg
  },
  props: ['data', 'hasUpload'],
  methods: {
    getImgName (url) {
      return url ? url.split('/').slice(-1)[0] : ''
    },
    uploadImg (row, index) {
      this.$refs['uploadImg'].render(row)
    },
    add (row, index) {
      let len = this.data.length
      this.data.splice(index + 1, 0, {
        key: len,
        title: '新选项' + len
      })
    },
    del (row, index) {
      if (this.data.length <= 1) return

      this.data.splice(index, 1)
    },
    down (row, index) {
      if (index >= this.data.length - 1) return

      this.data.splice(index, 1)
      this.data.splice(index + 1, 0, row)
    },
    up (row, index) {
      if (index <= 0) return

      this.data.splice(index, 1)
      this.data.splice(index - 1, 0, row)
    }
  }
}
</script>

<style scoped>
.el-table .el-button .iconfont{line-height: 20px;font-size:20px;color:#126ab5}
.el-table .el-button .iconfont:hover{color:#4188c4}
</style>
