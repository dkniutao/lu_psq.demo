<template>
<el-dialog title="上传图片" width="800px" :visible.sync="myVisible">
  <div style="margin-bottom: 15px;">
    <el-input placeholder="可直接粘贴图片地址" :value="row.img">
      <i v-if="row.img" slot="suffix" class="el-input__icon el-icon-delete" @click="delImg"></i>
      <el-button slot="append" @click="myVisible = false">确定</el-button>
    </el-input>
  </div>

  <div>
    <el-upload
      class="upload-demo"
      drag
      :action="url"
      name="file[]"
      :on-success="success"
      :show-file-list="false">
      <template v-if="row.img">
        <img :src="row.img" alt="">
      </template>
      <template v-else>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </template>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>

  <div slot="footer" class="dialog-footer">
    <el-button @click="myVisible = false">取 消</el-button>
    <el-button type="primary" @click="myVisible = false">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import mylib from '../../mylib.js'
//@todo 添加供外部使用的弹窗显示方法
export default {
  props: ['visible', 'row'],
  data () {
    return {
      myVisible: this.visible,
      url: mylib.URL + 'questionnaire/upload?access-token=' + mylib.ACCESS_TOKEN
    }
  },
  watch: {
    visible () {
      this.myVisible = this.visible
    },
    myVisible () {
      this.$emit('update:visible', this.myVisible)
    }
  },
  methods: {
    success (response, file, fileList) {
      this.row.img = mylib.ROOT + response.data.item[0]
    },
    delImg () {
      this.row.img = ''
    }
  }
}
</script>
<style scoped>
.el-input .el-input__icon{cursor: pointer;}
</style>
