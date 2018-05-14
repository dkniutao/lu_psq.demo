<template>
  <div class="psq-content">
    <div class="psq-chunk">问卷调查系统</div>
    <div class="psq-chunk clearfix" style="padding:15px 20px;">
      <el-button class="fl add-psq" type="primary" icon="el-icon-plus">创建问卷</el-button>
      <el-input class="fr search-psq" style="width: 280px;" placeholder="请输入搜索内容" v-model="keyword">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div class="psq-table">
      <el-table
        :data="tableData"
        @filter-change="filterChange"
        @sort-change="sortChange"
        style="width: 100%">
        <el-table-column
          type="index"
          width="100"
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
            <el-button
              v-if="scope.row.status == 0 || scope.row.status == 2"
              type="text">
              <i class="iconfont icon-fabu"></i>
              发布
            </el-button>
            <el-button
              v-if="scope.row.status == 1"
              type="text">
              <i class="iconfont icon-zanting"></i>
              暂停
            </el-button>
            <el-button type="text">
              <i class="iconfont icon-tongji"></i>
              统计
            </el-button>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="iconfont icon-gengduo1"></i>
                更多
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <i class="iconfont icon-daochu"></i>
                  导出word格式
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="iconfont icon-tubiao212"></i>
                  分享问卷
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="iconfont icon-daochu1"></i>
                  设为模板
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="iconfont icon-fuzhi"></i>
                  复制
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="iconfont icon-shuru"></i>
                  编辑
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="iconfont icon-iconless"></i>
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="total"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
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
          this.total = +res.data._meta.totalCount + 100
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
.psq-content {background: #fff;color:#333333;font-size: 14px;width:1600px;margin:0 auto;}
.psq-chunk{border-bottom: 1px solid #e8ecf0;padding:20px;}
.el-pagination{text-align: center;margin-top: 40px;}
.psq-table{padding:10px 0 40px;}
</style>
<style>

/*表格样式覆盖 start*/
.el-table{color:#666666;}
.el-table th, .el-table td{padding: 0;line-height: 40px;border: none;}
.el-table th{background-color: #f3f3f3;color:#333333;}
.el-table td{border-bottom:1px solid #f3f3f3;}
.el-table--enable-row-hover .el-table__body tr:hover>td{background-color: #d0e1f0;}
/*表格样式覆盖 end*/

/*标签样式覆盖 start*/
.el-tag{height: 22px;line-height: 20px;}
.el-tag--info{background-color: #fff;border-color: #999999;color:#999999;}
.el-tag--success{background-color: #fff;border-color: #009688;color:#009688;}
.el-tag--danger{background-color: #fff;border-color: #df1a1a;color:#df1a1a;}
.el-tag--warning{background-color: #fff;border-color: #f89b38;color:#f89b38;}
/*标签样式覆盖 end*/

/*下拉样式 start*/
.el-dropdown{margin-left: 10px;color:#126ab5;}
.el-dropdown-menu{border-color: #126ab5;border-radius: 0;}
.el-dropdown-menu__item{color:#126ab5;}
.el-popper[x-placement^=bottom] .popper__arrow{border-bottom-color: #126ab5;}
/*下拉样式 end*/

/*page start*/
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{background-color: #fff;color:#333333;border:1px solid #ccc;border-radius: 0;}
.el-pagination.is-background .el-pager li:not(.disabled).active{background-color: #126ab5;border-radius: 0;border-color:#126ab5;}
.el-pagination__total{color:#333333;}
/*page end*/
</style>
