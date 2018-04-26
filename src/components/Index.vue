<template>
  <div class="psq-content">
    <div class="psq-chunk">问卷调查系统</div>
    <div class="psq-chunk">
      <el-row>
        <el-col :span="12">
          <el-button class="fl" type="primary" icon="el-icon-search">创建问卷</el-button>
        </el-col>
        <el-col :span="12">
          <el-input class="fr" style="width: 280px;" placeholder="请输入内容" v-model="input4">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <div class="psq-table">
      <el-table
        :data="tableData3"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="100"
        layout="total, prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    }
  }
</script>
<style scoped>
  .psq-content {background: #fff;min-height: 100%;}
  .psq-chunk{height: 60px;line-height: 60px;border-bottom: 1px solid #e8ecf0;}
  .psq-chunk .el-row{padding-top: 10px;}
  .el-pagination{text-align: center;margin-top: 40px;}
  .psq-table{padding:10px 0 40px;}
</style>
