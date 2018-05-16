<template>
<div class="psq-content">
  <div class="psq-chunk">问卷模板</div>
  <div class="psq-chunk clearfix">
    <el-input
      class="fr search-psq"
      style="width: 280px;"
      placeholder="请输入搜索内容"
      v-model="keyword">
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="search">
      </el-button>
    </el-input>
  </div>
  <div>
    <ul>
      <li
        class="item"
        v-for="item in list"
        :key="item.id"
        v-bind:class="{open: item.open}">
        <div
          @click="openItem(item)">
          <el-row
            class="title">
            <el-col :span="22">
              {{item.name}}
            </el-col>
            <el-col :span="2">
              <i class="fr iconfont icon-xia2"></i>
            </el-col>
          </el-row>
        </div>
        <div v-show="item.open" class="view">
          <div class="content">

          </div>
          <div class="operate">
            <el-button
              class="set-template"
              type="primary"
              @click="setTemplate">
              使用此模板
            </el-button>
          </div>
        </div>
      </li>
    </ul>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="total"
      :current-page.sync="currentPage"
      :page-size="pageSize"
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
      target: '',
      keyword: '',
      currentPage: 1,
      pageSize: 20,
      total: 0,
      list: []
    }
  },
  methods: {
    openItem (item) {
      this.$set(item, 'open', !item.open)
    },
    search () {
      this.resetList()
    },
    handleCurrentChange () {
      this.renderList()
    },
    resetList () {
      this.currentPage = 1
      this.renderList()
    },
    renderList () {
      mylib.axios({
        url: 'questionnaire/templist',
        params: {
          keyword: this.keyword,
          page: this.currentPage
        },
        done (res) {
          this.list = res.data.items
          this.currentPage = +res.data._meta.currentPage
          this.pageSize = +res.data._meta.perPage
          this.total = +res.data._meta.totalCount
        }
      }, this)
    }
  },
  created () {
    this.renderList()
  }
}
</script>
<style scoped>
.psq-content {background: #fff;width:1200px; margin:0 auto;font-size: 14px;color: #333333;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}
.psq-chunk{border-bottom: 1px solid #e8ecf0;padding:20px;}
li{list-style: none;}

.item{border-bottom: 1px solid #f3f3f3;}
.item .title{height: 50px;line-height: 50px;color:#666666;padding:0 40px;}
.item .title:hover{background-color: #d0e1f0;cursor: pointer;}

.item.open .title{background-color: #f3f3f3;}
.item.open .iconfont{transform: rotate(180deg);}
.item.open .view .operate {height: 50px;line-height: 50px;background-color: #f3f3f3;text-align: center;}
.item.open .view .content{background-color: #fff;overflow-y:auto;height: 300px;}

/*按钮 start*/
.el-button--primary, .el-button--primary.is-active, .el-button--primary:active {background: #126ab5;border-color: #126ab5;}
.el-button--primary:focus, .el-button--primary:hover {background: #4188c4;border-color: #4188c4;}
.el-button {border-radius: 0;padding: 7px 24px;}
/*按钮 end*/
</style>
