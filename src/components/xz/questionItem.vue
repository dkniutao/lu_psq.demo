<template>
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
          <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
          </quill-editor>
        </el-col>
        <el-col :span="12">
        </el-col>
        <el-col :span="24">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="text" label="选项文字">
              <template slot-scope="scope">
                <el-input v-model="scope.row.text" placeholder="请输入选项内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="img" label="图片" width="180">
              <template slot-scope="scope">
                <i class="iconfont icon-tupian2" style="color:#126ab5;font-size: 25px;"></i>
              </template>
            </el-table-column>
            <el-table-column prop="operate" label="操作">
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
</template>
<script>

</script>
<style>
.question-item{box-sizing: border-box;border: 1px solid #126ab5;margin: 0 60px 20px;padding:20px;}
.question-item .item-header{padding-bottom:20px;margin-bottom:20px;border-bottom:1px solid #f3f3f3;}
.question-item .item-operate{padding-bottom:20px;margin-bottom:20px;border-bottom:1px solid #f3f3f3;}

.question-item .item-edit{margin-bottom: 20px;}

.title-input{width:100%;color:#333;font-size: 14px;line-height: 30px;border:none;outline: none;font-weight: bold;}

.operate-btn.el-button{border:1px solid #126ab5;border-radius: 0;color: #126ab5;padding:0 12px;font-size: 12px;height: 22px;line-height: 22px;}
.operate-btn.el-button:hover{background:#d0e1f0;}
.operate-btn.el-button .iconfont{float:left;margin-right: 6px;}

.item-submit{text-align: center;}
.question-submit.el-button--primary, .question-submit.el-button--primary.is-active, .question-submit.el-button--primary:active {background: #126ab5;border-color: #126ab5;}
.question-submit.el-button--primary:focus, .question-submit.el-button--primary:hover {background: #4188c4;border-color: #4188c4;}
.question-submit.el-button {border-radius: 0;padding: 7px 24px;}
</style>
