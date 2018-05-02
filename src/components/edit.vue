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
        <el-menu-item v-for="type in questionType" :index="type.id" :key="type.id"><i class="iconfont icon-tianjia1"></i>{{type.name}}</el-menu-item>
      </el-menu>
    </div>

    <!-- 问卷头部标题 -->
    <xz-question-header></xz-question-header>

    <!-- 问卷分割线 -->
    <div class="question-line"></div>

    <!-- 问卷问题列表 -->
    <div class="question-list">
      <!-- 单选 -->
      <xz-question-item index="0" type="radio"></xz-question-item>
      <xz-question-item index="1" type="checkbox"></xz-question-item>
      <xz-question-item index="2" type="gapfill"></xz-question-item>
      <xz-question-item index="3" type="multigapfill"></xz-question-item>

      <!-- 标题 -->
      <!-- <div class="question-item">
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
      </div> -->
      <!-- 段落说明 -->
      <!-- <div class="question-item">
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
      </div> -->
      <!-- 单选 -->
    <!--   <div class="question-item">
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
      </div> -->
      <!-- 多选 -->
     <!--  <div class="question-item">
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
      </div> -->

      <!-- 单项填空题 -->
     <!--  <div class="question-item">
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
      </div> -->

      <!-- 多项填空题 -->
      <div class="question-item">
        <div class="item-header">
          <input class="title-input" type="text" placeholder="请输入问题标题【多选填空题】" />
          <div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="标题1">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="标题2">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
            </el-form>
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
              <!-- <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
              </quill-editor> -->
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

      <!-- 单项评分题 -->
      <div class="question-item">
        <div class="item-header">
          <input class="title-input" type="text" placeholder="请输入问题标题【单项评分题】" />
          <div class="clearfix">
            <span class="fl">很不满意</span>
            <el-radio-group class="fl">
              <el-radio :label="3">1</el-radio>
              <el-radio :label="6">2</el-radio>
              <el-radio :label="9">3</el-radio>
            </el-radio-group>
            <span class="fl">很满意</span>
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
              <!-- <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
              </quill-editor> -->
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
                  prop="text"
                  label="分数">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.feng" :controls="false"></el-input-number>
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

      <!-- 多项评分题 -->
      <div class="question-item">
        <div class="item-header">
          <input class="title-input" type="text" placeholder="请输入问题标题【多项评分题】" />
          <div class="clearfix">
            <el-table
              :data="tableData10"
              border
              style="width: 100%">
              <el-table-column
                prop="title"
                label=""
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="1"
                width="180">
                <template slot-scope="scope">
                  <el-radio v-model="scope.row.radio" :label="1" :name="scope.row.title">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="2">
                <template slot-scope="scope">
                  <el-radio v-model="scope.row.radio" :label="2" :name="scope.row.title">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="3">
                <template slot-scope="scope">
                  <el-radio v-model="scope.row.radio" :label="3" :name="scope.row.title">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="4">
                <template slot-scope="scope">
                  <el-radio v-model="scope.row.radio" :label="4" :name="scope.row.title">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="5">
                <template slot-scope="scope">
                  <el-radio v-model="scope.row.radio" :label="5" :name="scope.row.title">&nbsp;</el-radio>
                </template>
              </el-table-column>
            </el-table>
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
              <!-- <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
              </quill-editor> -->
            </el-col>
            <el-col :span="12">

            </el-col>
            <el-col :span="24">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="text"
                  label="标题文字">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.text" placeholder="请输入标题内容"></el-input>
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
                  prop="text"
                  label="分数">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.feng" :controls="false"></el-input-number>
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

      <!-- 排序题 -->
      <div class="question-item">
        <div class="item-header">
          <input class="title-input" type="text" placeholder="请输入问题标题【排序题】" />
          <div class="clearfix">

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
              <!-- <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
              </quill-editor> -->
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
                  prop="text"
                  label="图片">
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

      <!-- 滑动条题 -->
      <div class="question-item">
        <div class="item-header">
          <input class="title-input" type="text" placeholder="请输入问题标题【滑动条题】" />
          <div class="clearfix">
            <el-slider v-model="value2"></el-slider>
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
              <!-- <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
              </quill-editor> -->
            </el-col>
            <el-col :span="12">

            </el-col>
            <el-col :span="24">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-row>
                  <el-col :span=24>
                    <el-form-item label="最小值">
                      <el-input-number v-model="formInline.region" :controls="false"></el-input-number>
                    </el-form-item>
                    <el-form-item label="最小值显示文本">
                      <el-input v-model="formInline.user" placeholder="最小值显示文本"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span=24>
                    <el-form-item label="最大值">
                      <el-input-number v-model="formInline.region" :controls="false"></el-input-number>
                    </el-form-item>
                    <el-form-item label="最大值显示文本">
                      <el-input v-model="formInline.user" placeholder="最大值显示文本"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
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
import questionHeader from './xz/questionHeader.vue'
import questionItem from './xz/questionItem.vue'
export default {
  components: {
    'xz-question-header': questionHeader,
    'xz-question-item': questionItem
  },
  data () {
    return {
      form: {},
      formInline: {
        region: 1
      },
      tableData: [{text: '选项1'}, {text: '选项2'}],
      tableData10: [{title: '外观'}, {title: '功能'}],
      radio1: '',
      checkedCities1: '',
      value2: 20,
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
    }
  },
  computed: {
    editor () {
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

/*题型按钮组 start*/
.el-menu-item i{color: #fff;margin-right: 10px;position: relative;top: -1.5px;}
.el-menu--horizontal{border-bottom: none;}
.el-menu--horizontal>.el-menu-item{border-bottom: none;height: 40px;line-height: 40px;width: 120px;text-align: center;padding:0;}
/*题型按钮组 end*/

/*问卷分割线 start*/
.question-line{height: 1px;margin:20px 80px;background: #f3f3f3;}
/*问卷分割线 end*/

/*问卷列表 start*/
.question-list{overflow:hidden;}
/*问卷列表 end*/
</style>
