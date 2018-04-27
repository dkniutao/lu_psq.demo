<template>
  <div class="psq-content">
    <div class="psq-chunk">问卷调查系统</div>
    <div class="psq-chunk">
      <el-row>
        <el-col :span="12">
          <el-button class="fl" type="primary" icon="el-icon-plus">创建问卷</el-button>
        </el-col>
        <el-col :span="12">
          <el-input class="fr" style="width: 280px;" placeholder="请输入搜索内容" v-model="keyword">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <div class="psq-table">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="排序"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          sortable
          label="发布日期">
        </el-table-column>
        <el-table-column
          :filters="[
            { text: '未发布', value: '未发布' },
            { text: '进行中', value: '进行中' },
            { text: '已暂停', value: '已暂停' },
            { text: '已结束', value: '已结束' }
          ]"
          :filter-method="filterStatus"
          prop="status"
          label="状态"
        >
        </el-table-column>
        <el-table-column
          prop="answer_count"
          label="答卷数">
        </el-table-column>
        <el-table-column
          prop="operate"
          label="操作">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        background
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import mylib from '../mylib.js'
export default {
  data () {
    return {
      keyword: '',
      currentPage: 1,
      pageSize: 20,
      total: 100,
      tableData: []
    }
  },
  methods: {
    handleSizeChange () {},
    handleCurrentChange () {},
    filterStatus () {}
  },
  mounted () {
    mylib.axios({
      url: 'questionnaire/list',
      params: {
        keyword: ''
      },
      done (res) {
        console.log(res)
      }
    })
  }
}
</script>
<style scoped>
  .psq-content {background: #fff;}
  .psq-chunk{height: 60px;line-height: 60px;border-bottom: 1px solid #e8ecf0;padding:0 20px;}
  .psq-chunk .el-row{padding-top: 10px;}
  .el-pagination{text-align: center;margin-top: 40px;}
  .psq-table{padding:10px 0 40px;}
</style>
