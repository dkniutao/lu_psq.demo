<template>
<div>
  <el-row>
    <el-col :span="24">
      <el-table :data="item.content" style="width: 100%">
        <el-table-column prop="text" label="选项文字">
          <template slot-scope="scope">
            <el-input v-model="scope.row.title" placeholder="请输入选项内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="img" label="图片" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="uploadImg(scope)">
              <i class="iconfont icon-tupian2" style="color:#126ab5;font-size: 25px;"></i>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button class="fl" type="text" @click="add(scope)">
              <i class="iconfont icon-jia1"></i>
            </el-button>
            <el-button class="fl" type="text" @click="del(scope)">
              <i class="iconfont icon-jian1"></i>
            </el-button>
            <el-button class="fl" type="text" @click="down(scope)">
              <i class="iconfont icon-xiayi"></i>
            </el-button>
            <el-button class="fl" type="text" @click="up(scope)">
              <i class="iconfont icon-shangyi"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <xz-upload-img :visible.sync="uploadImgVisible"></xz-upload-img>
</div>
</template>

<script>
import xzUploadImg from './uploadImg.vue'
export default {
  components: {
    xzUploadImg
  },
  props: ['item'],
  data () {
    return {
      uploadImgVisible: false,
    }
  },
  methods: {
    uploadImg (scope) {
      this.uploadImgVisible = true
    },
    add (scope) {
      this.item.content.splice(scope.$index + 1, 0, {
        key: '1',
        title: scope.$index + 1
      })
    },
    del (scope) {
      this.item.content.splice(scope.$index, 1)
    }
  }
}
</script>

<style scoped>
.el-table .el-button .iconfont{font-size:20px;color:#126ab5}
</style>
