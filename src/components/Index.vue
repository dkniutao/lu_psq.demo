<template>
  <div class="psq-content">
    <div class="psq-chunk">问卷调查系统</div>
    <div class="psq-chunk">
      <el-row>
        <el-col :span="12">
          <el-button class="fl add-psq" type="primary" icon="el-icon-plus">创建问卷</el-button>
        </el-col>
        <el-col :span="12">
          <el-input class="fr" style="width: 280px;" placeholder="请输入搜索内容" v-model="keyword">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <div class="psq-table">
      <el-table
        :data="tableData"
        @filter-change="filterChange"
        @sort-change="sortChange"
        style="width: 100%">
        <el-table-column
          width="100"
          prop="id"
          label="排序">
        </el-table-column>
        <el-table-column
          prop="name"
          label="标题">
        </el-table-column>
        <el-table-column
          width="260"
          sortable
          prop="create_time"
          label="发布日期">
        </el-table-column>
        <el-table-column
          width="140"
          :filters="[
            { text: '未发布', value: 0 },
            { text: '进行中', value: 1 },
            { text: '已暂停', value: 2 },
            { text: '已结束', value: 3 }
          ]"
          column-key="status"
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 0" type="info">未发布</el-tag>
            <el-tag v-if="scope.row.status == 1" type="success">进行中</el-tag>
            <el-tag v-if="scope.row.status == 2" type="danger">已暂停</el-tag>
            <el-tag v-if="scope.row.status == 3" type="warning">已结束</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          width="130"
          prop="answer_count"
          label="答卷数">
        </el-table-column>
        <el-table-column
          prop="operate"
          width="400"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text"><i class="iconfont icon-fabu"></i>发布</el-button>
            <el-button type="text"><i class="iconfont icon-zanting"></i>暂停</el-button>
            <el-button type="text"><i class="iconfont icon-tongji"></i>统计</el-button>
          </template>
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
      total: 0,
      create_time: '',
      status: [],
      tableData: []
    }
  },
  methods: {
    renderTable () {
      mylib.axios({
        url: 'questionnaire/list',
        params: {
          keyword: this.keyword,
          page: this.currentPage,
          status: this.status.length ? this.status.join(',') : '',
          sort: this.create_time ? 'create_time ' + this.create_time : ''
        },
        done (res) {
          this.tableData = res.data.items
          this.currentPage = +res.data._meta.currentPage
          this.pageSize = +res.data._meta.perPage
          this.total = +res.data._meta.totalCount
        }
      }, this)
    },
    resetTable () {
      this.currentPage = 1
      this.renderTable()
    },
    handleSizeChange () {},
    handleCurrentChange () {},
    filterChange (filters) {
      this.status = filters.status
      this.resetTable()
    },
    sortChange (sort) {
      this.create_time = sort.order ? sort.order.replace(/ending/ig, '') : ''
      this.resetTable()
    },
    search () {
      this.resetTable()
    }
  },
  mounted () {
    this.renderTable()
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
