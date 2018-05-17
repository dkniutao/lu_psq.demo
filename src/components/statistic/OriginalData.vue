<template>
  <div class="origina">
    <div class="search">
      <div class="fl"><el-button class="add-psq" type="primary"><i class="iconfont icon-tubiao05"></i>批量导出</el-button></div>
      <div class="fr">
        <el-input placeholder="请输入内容" v-model="search"><i slot="suffix" class="iconfont icon-sousuo1"></i></el-input>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="originaData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="排序"
          width="100">
        </el-table-column>
        <el-table-column
          label="查看"
          width="160">
          <template slot-scope="scope">
            <div class="paper">原卷</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="user_ip"
          label="IP"
          width="230">
        </el-table-column>
        <el-table-column
          prop="submit_time"
          label="提交日期"
          width="250">
        </el-table-column>
        <el-table-column
          prop="source"
          label="来源"
          width="140">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div class="operate">
              <span><i class="iconfont icon-iconless"></i>删除</span>
              <span><i class="iconfont icon-xiazai"></i>下载</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
</template>

<script>
import mylib from '../../mylib.js'

export default {
  components: {
  },
  props: [
  ],
  data () {
    return {
      search: '',
      originaData: [], // 表格数据
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页展示数量
      total: 1 // 总条目数
    }
  },
  computed: {
  },
  methods: {
    handleSizeChange () {},
    handleCurrentChange () {}
  },
  created () {
  },
  mounted () {
    // 获取回收概况统计
    mylib.axios({
      url: 'questionnaire/original',
      params: {
        id: '13'
      },
      done (res) {
        this.originaData = res.data.items
        this.total = parseInt(res.data._meta.totalCount)
        this.pageSize = parseInt(res.data._meta.perPage)
        this.currentPage = parseInt(res.data._meta.currentPage)
        console.log('res', res)
      }
    }, this)
  }
}
</script>
<style scoped>
  .origina .table .paper{
    color: #126ab5;
    cursor: pointer;
  }
  .origina .table .operate{
    color: #126ab5;
  }
  .origina .table .operate .iconfont{
    margin-right: 10px;
  }
  .origina .table .operate span{
    cursor: pointer;
  }
  .origina .table .operate span:last-child{
    margin-left: 15px;
  }

</style>
