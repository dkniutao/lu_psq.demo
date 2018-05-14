/*问卷头部标题*/
<template>
<div>
  <div class="question-header" @click="edit">
    <div class="title" v-html="title.name"></div>
    <div class="desc" v-html="title.desc">
    </div>
  </div>
  <!-- 分割线 -->
  <div class="question-line"></div>

  <el-dialog title="编辑问卷说明" :visible.sync="visible" width="800px">
    <el-form label-width="100px">
      <el-form-item label="问卷标题">
        <el-input v-model="title.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="问卷说明">
        <div class="clearfix">
          <quill-editor v-model="title.desc"
            ref="myQuillEditor"
            :options="editorOption">
          </quill-editor>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="visible = false">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {
      visible: false,
      editorOption: {
        placeholder: '请输入问卷说明',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{'script': 'sub'}, {'script': 'super'}],
            [{'color': []}, {'background': []}],
            ['image'],
            [{ 'size': ['small', false, 'large', 'huge'] }]
          ]
        }
      }
    }
  },
  methods: {
    edit () {
      this.visible = true
    }
  }
}
</script>

<style scoped>
.question-header{box-sizing: border-box;border: 1px solid #fff;margin: 20px 60px;padding:20px;}
.question-header:hover{border-color:#126ab5;cursor: pointer;}
.question-header .title{text-align: center;font-size: 18px;font-weight: bold;line-height: 24px;color: #333333;margin-bottom: 10px;}
.question-header .desc{font-size: 14px;color: #666666;}

/*问卷分割线 start*/
.question-line{height: 1px;margin:20px 80px;background: #f3f3f3;}
/*问卷分割线 end*/
</style>
