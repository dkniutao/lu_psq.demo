<template>
<el-dialog title="上传图片" width="800px" :visible.sync="visible">
  <div style="margin-bottom: 15px;">
    <el-input placeholder="可直接粘贴图片地址" :value="imgurl">
      <el-button slot="append">确定</el-button>
    </el-input>
  </div>

  <div>
    <el-upload
      class="upload-demo"
      drag
      :action="url"
      name="file[]"
      :on-success="success">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>

  <div slot="footer" class="dialog-footer">
    <el-button @click="visible = false">取 消</el-button>
    <el-button type="primary" @click="visible = false">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import mylib from '../../mylib.js'
export default {
  props: ['visible'],
  data () {
    return {
      imgurl: '',
      url: mylib.URL + 'questionnaire/upload?access-token=' + mylib.ACCESS_TOKEN ,
    }
  },
  watch: {
    visible () {
      this.$emit('update:visible', this.visible)
    }
  },
  methods: {
    success (response, file, fileList) {
      this.imgurl = mylib.ROOT + response.data.item[0];
    }
  }
}
</script>
