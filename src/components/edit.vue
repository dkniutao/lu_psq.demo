<template>
  <div class="psq-content">
    <div class="psq-chunk">编辑问卷</div>
    <div class="psq-chunk clearfix">
      <el-button class="fr add-psq" type="primary">完成编辑</el-button>
      <el-button class="fr add-psq" type="primary" style="margin-right: 20px;">预览</el-button>
    </div>

    <div class="question-type">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="addQuestion"
        background-color="#126ab5"
        text-color="#fff"
        active-text-color="#fff">
        <el-menu-item v-for="type in questionType" :index="type.id"><i class="iconfont icon-tianjia1"></i>{{type.name}}</el-menu-item>
      </el-menu>
    </div>

    <div class="question-list">
      <!-- 标题 -->
      <div class="question-item">
        <div class="item-header">
          <input class="title-input" type="text" placeholder="请输入标题" />
        </div>

        <div class="item-operate clearfix">
          <el-button class="fl operate-btn">在此题后插入新题</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-zhidingdel"></i>最后</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-icon_zhiding"></i>最前</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-xiayi"></i>下移</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-shangyi"></i>上移</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-iconless"></i>删除</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-fuzhi"></i>复制</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-shuru"></i>编辑</el-button>
        </div>

        <div class="item-edit">
          <quill-editor v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
          </quill-editor>

        </div>

        <div class="item-submit">
          <el-button class="question-submit" type="primary">完成编辑</el-button>
        </div>
      </div>
      <!-- 段落说明 -->
      <div class="question-item">
        <div class="item-header">
          <input class="title-input" type="text" placeholder="请输入段落说明" />
        </div>

        <div class="item-operate clearfix">
          <el-button class="fl operate-btn">在此题后插入新题</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-zhidingdel"></i>最后</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-icon_zhiding"></i>最前</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-xiayi"></i>下移</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-shangyi"></i>上移</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-iconless"></i>删除</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-fuzhi"></i>复制</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-shuru"></i>编辑</el-button>
        </div>

        <div class="item-edit">
          <quill-editor v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
          </quill-editor>

        </div>

        <div class="item-submit">
          <el-button class="question-submit" type="primary">完成编辑</el-button>
        </div>
      </div>
      <!-- 单选 -->
      <div class="question-item">
        <div class="item-header">
          <input class="title-input" type="text" placeholder="请输入问题标题【单选题】" />
          <div>
            <el-radio-group v-model="radio1">
              <el-row>
                <el-col :span="24">
                  <el-radio :label="3">备选项</el-radio>
                </el-col>
                <el-col :span="24">
                  <el-radio :label="6">备选项</el-radio>
                </el-col>
                <el-col :span="24">
                  <el-radio :label="9">备选项</el-radio>
                </el-col>
              </el-row>
            </el-radio-group>
          </div>
        </div>

        <div class="item-operate clearfix">
          <el-button class="fl operate-btn">在此题后插入新题</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-zhidingdel"></i>最后</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-icon_zhiding"></i>最前</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-xiayi"></i>下移</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-shangyi"></i>上移</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-iconless"></i>删除</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-fuzhi"></i>复制</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-shuru"></i>编辑</el-button>
        </div>

        <div class="item-edit">
          <el-row>
            <el-col :span="12">
              <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
              </quill-editor>
            </el-col>
            <el-col :span="12">

            </el-col>
            <el-col :span="24">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="text"
                  label="选项文字">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.text" placeholder="请输入选项内容"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="img"
                  label="图片"
                  width="180">
                  <template slot-scope="scope">
                    <i class="iconfont icon-tupian2" style="color:#126ab5;font-size: 25px;"></i>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="operate"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" style="float:left;"><i style="font-size:20px;color:#126ab5" class="iconfont icon-jia1"></i></el-button>
                    <el-button type="text" style="float:left;"><i style="font-size:20px;color:#126ab5" class="iconfont icon-jian1"></i></el-button>
                    <el-button type="text" style="float:left;"><i style="font-size:24px;color:#126ab5" class="iconfont icon-xiayi"></i></el-button>
                    <el-button type="text" style="float:left;"><i style="font-size:24px;color:#126ab5" class="iconfont icon-shangyi"></i></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>

        <div class="item-submit">
          <el-button class="question-submit" type="primary">完成编辑</el-button>
        </div>
      </div>

      <!-- 多选 -->
      <div class="question-item">
        <div class="item-header">
          <input class="title-input" type="text" placeholder="请输入问题标题【多选题】" />
          <div>
            <el-checkbox-group
              v-model="checkedCities1">
              <div>
                <el-checkbox label="city" key="city">选项1</el-checkbox>
              </div>
              <div>
                <el-checkbox label="city" key="city">选项2</el-checkbox>
              </div>
             </el-checkbox-group>
          </div>
        </div>

        <div class="item-operate clearfix">
          <el-button class="fl operate-btn">在此题后插入新题</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-zhidingdel"></i>最后</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-icon_zhiding"></i>最前</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-xiayi"></i>下移</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-shangyi"></i>上移</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-iconless"></i>删除</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-fuzhi"></i>复制</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-shuru"></i>编辑</el-button>
        </div>

        <div class="item-edit">
          <el-row>
            <el-col :span="12">
              <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
              </quill-editor>
            </el-col>
            <el-col :span="12">

            </el-col>
            <el-col :span="24">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="text"
                  label="选项文字">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.text" placeholder="请输入选项内容"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="img"
                  label="图片"
                  width="180">
                  <template slot-scope="scope">
                    <i class="iconfont icon-tupian2" style="color:#126ab5;font-size: 25px;"></i>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="operate"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" style="float:left;"><i style="font-size:20px;color:#126ab5" class="iconfont icon-jia1"></i></el-button>
                    <el-button type="text" style="float:left;"><i style="font-size:20px;color:#126ab5" class="iconfont icon-jian1"></i></el-button>
                    <el-button type="text" style="float:left;"><i style="font-size:24px;color:#126ab5" class="iconfont icon-xiayi"></i></el-button>
                    <el-button type="text" style="float:left;"><i style="font-size:24px;color:#126ab5" class="iconfont icon-shangyi"></i></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>

        <div class="item-submit">
          <el-button class="question-submit" type="primary">完成编辑</el-button>
        </div>
      </div>

      <!-- 单项填空题 -->
      <div class="question-item">
        <div class="item-header">
          <input class="title-input" type="text" placeholder="请输入问题标题【单项填空题】" />
          <div>
            <el-input
              type="textarea"
              :rows="2"
              v-model="textarea">
            </el-input>
          </div>
        </div>

        <div class="item-operate clearfix">
          <el-button class="fl operate-btn">在此题后插入新题</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-zhidingdel"></i>最后</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-icon_zhiding"></i>最前</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-xiayi"></i>下移</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-shangyi"></i>上移</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-iconless"></i>删除</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-fuzhi"></i>复制</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-shuru"></i>编辑</el-button>
        </div>

        <div class="item-edit">
          <el-row>
            <el-col :span="12">
              <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
              </quill-editor>
            </el-col>
            <el-col :span="12">

            </el-col>
            <el-col :span="24">
              <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 20px;">
                <el-form-item label="高度">
                  <el-select v-model="formInline.region" placeholder="">
                    <el-option label="1行" value="1"></el-option>
                    <el-option label="2行" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="最小字数">
                  <el-input-number v-model="formInline.region" :controls="false"></el-input-number>
                </el-form-item>
                 <el-form-item label="最大字数">
                  <el-input-number v-model="formInline.region" :controls="false"></el-input-number>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>

        <div class="item-submit">
          <el-button class="question-submit" type="primary">完成编辑</el-button>
        </div>
      </div>

      <!-- 多项填空题 -->
      <div class="question-item">
        <div class="item-header">
          <input class="title-input" type="text" placeholder="请输入问题标题【多选题】" />
          <div>
            <el-checkbox-group
              v-model="checkedCities1">
              <div>
                <el-checkbox label="city" key="city">选项1</el-checkbox>
              </div>
              <div>
                <el-checkbox label="city" key="city">选项2</el-checkbox>
              </div>
             </el-checkbox-group>
          </div>
        </div>

        <div class="item-operate clearfix">
          <el-button class="fl operate-btn">在此题后插入新题</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-zhidingdel"></i>最后</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-icon_zhiding"></i>最前</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-xiayi"></i>下移</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-shangyi"></i>上移</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-iconless"></i>删除</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-fuzhi"></i>复制</el-button>
          <el-button class="fr operate-btn"><i class="iconfont icon-shuru"></i>编辑</el-button>
        </div>

        <div class="item-edit">
          <el-row>
            <el-col :span="12">
              <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
              </quill-editor>
            </el-col>
            <el-col :span="12">

            </el-col>
            <el-col :span="24">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="text"
                  label="选项文字">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.text" placeholder="请输入选项内容"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="img"
                  label="图片"
                  width="180">
                  <template slot-scope="scope">
                    <i class="iconfont icon-tupian2" style="color:#126ab5;font-size: 25px;"></i>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="operate"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" style="float:left;"><i style="font-size:20px;color:#126ab5" class="iconfont icon-jia1"></i></el-button>
                    <el-button type="text" style="float:left;"><i style="font-size:20px;color:#126ab5" class="iconfont icon-jian1"></i></el-button>
                    <el-button type="text" style="float:left;"><i style="font-size:24px;color:#126ab5" class="iconfont icon-xiayi"></i></el-button>
                    <el-button type="text" style="float:left;"><i style="font-size:24px;color:#126ab5" class="iconfont icon-shangyi"></i></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>

        <div class="item-submit">
          <el-button class="question-submit" type="primary">完成编辑</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mylib from '../mylib.js'
export default {
  data () {
    return {
      formInline: {
        region: 1
      },
      tableData: [{text: '选项1'}, {text: '选项2'}],
      radio1: '',
      questionType: [],
      content: '<h2>I am Example</h2>',
      editorOption: {
        // some quill options
      }
    }
  },
  methods: {
    addQuestion (type) {
      console.log(type)
    },
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted () {
    mylib.axios({
      url: 'questionnaire/getqtype',
      done (res) {
        this.questionType = res.data
      }
    }, this)
  }
}
</script>
<style scoped>
  .psq-content {background: #fff;width:1200px; margin:0 auto;}
  .psq-chunk{border-bottom: 1px solid #e8ecf0;padding:20px;}

  .el-menu-item i{color: #fff;margin-right: 10px;position: relative;top: -1.5px;}
  .el-menu--horizontal{border-bottom: none;}
  .el-menu--horizontal>.el-menu-item{border-bottom: none;height: 40px;line-height: 40px;width: 120px;text-align: center;padding:0;}

  .question-list{overflow:hidden;}
  .question-item{
    box-sizing: border-box;
    border: 1px solid #126ab5;
    margin: 60px;
    padding:20px;
  }
  .question-item .item-header{
    padding-bottom:20px;
    margin-bottom:20px;
    border-bottom:1px solid #f3f3f3;
  }
  .question-item .item-operate{
    padding-bottom:20px;
    margin-bottom:20px;
    border-bottom:1px solid #f3f3f3;
  }

  .question-item .item-edit{
    margin-bottom: 20px;
  }

  .title-input{width:100%;color:#333;font-size: 14px;line-height: 30px;border:none;outline: none;font-weight: bold;}

  .operate-btn.el-button{border:1px solid #126ab5;border-radius: 0;color: #126ab5;padding:0 12px;font-size: 12px;height: 22px;line-height: 22px;}
  .operate-btn.el-button:hover{background:#d0e1f0;}
  .operate-btn.el-button .iconfont{float:left;margin-right: 6px;}

  .item-submit{text-align: center;}
  .question-submit.el-button--primary, .question-submit.el-button--primary.is-active, .question-submit.el-button--primary:active {
    background: #126ab5;
    border-color: #126ab5;
  }
  .question-submit.el-button--primary:focus, .question-submit.el-button--primary:hover {
    background: #4188c4;
    border-color: #4188c4;
  }
  .question-submit.el-button {
    border-radius: 0;
    padding: 7px 24px;
  }
</style>
