<template>
<div>
  <el-row>
    <el-col :span="12">
      <quill-editor v-model="source.title" ref="myQuillEditor" :options="editorOption">
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
</template>

<script>
export default {
  props: ['source'],
  data () {}
}
</script>
