<template>
<div>
  <el-row>
    <el-col :span="12">
      <quill-editor v-model="source.title" ref="myQuillEditor">
      </quill-editor>
    </el-col>
    <el-col :span="12">
    </el-col>
    <el-col :span="24">
      <el-table :data="source.options" style="width: 100%">
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
  <el-dialog title="上传图片" width="800px" :visible.sync="dialogFormVisible">
    <div style="margin-bottom: 15px;">
      <el-input placeholder="可直接粘贴图片地址">
        <el-button slot="append">确定</el-button>
      </el-input>
    </div>
    <div>
      <el-upload
        class="upload-demo"
        drag
        :action="url"
        :data="data"
        name="file[]"
        :on-success="success">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import mylib from '../../mylib.js'
export default {
  props: ['source'],
  data () {
    return {
      url: mylib.URL + 'questionnaire/upload?access-token=' + mylib.ACCESS_TOKEN ,
      dialogFormVisible: true,

    }
  },
  methods: {
    success (response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
    },
    uploadImg (scope) {

    },
    add (scope) {
      this.source.options.splice(scope.$index + 1, 0, {
        id: '1',
        title: scope.$index + 1
      })
    },
    del (scope) {
      this.source.options.splice(scope.$index, 1)
    }
  }
}
</script>

<style scoped>
.el-table .el-button .iconfont{font-size:20px;color:#126ab5}
</style>
