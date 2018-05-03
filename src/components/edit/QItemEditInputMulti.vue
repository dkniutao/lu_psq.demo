<template>
<div>
  <el-row>
    <el-col :span="24">
      <el-table
        :data="item.content"
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
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {
      formInline: {}
    }
  },
  methods: {
  }
}
</script>
