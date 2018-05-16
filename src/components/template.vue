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
            class="header-title">
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
            <template  v-if="item.view">
              <div class="psq-header psq-chunk">
                <div class="title" v-html="item.view.name"></div>
                <div class="desc" v-html="item.view.description"></div>
              </div>
              <div class="psq-section">
                <div
                  v-for="(section, index) in item.view.section"
                  :key="index">
                  <div
                    v-if="section.name"
                    v-html="(index + 1)  + '、' + section.name"
                    class="psq-section-title psq-chunk">
                  </div>
                  <div
                    v-if="section.description"
                    v-html="section.description"
                    class="psq-section-desc psq-chunk">
                  </div>

                  <div class="psq-list">
                    <xz-item
                      class="psq-chunk"
                      v-for="Q in section.questions"
                      :item="Q"
                      :key="Q.id">
                    </xz-item>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="operate">
            <el-button
              v-if="item.view"
              class="set-template"
              type="primary"
              @click="setTemplate(item)">
              使用此模板
            </el-button>
          </div>
        </div>
      </li>
    </ul>
    <div
      style="text-align: center;padding:20px 0 15px;">
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
</div>
</template>
<script>
import mylib from '../mylib.js'
import xzItem from './preview/QItem.vue'
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
  components: {
    xzItem
  },
  methods: {
    openItem (item) {
      let open = item.open

      _.each(this.list, (l) => {
        this.$set(l, 'open', false)
      })

      this.$set(item, 'open', !open)
      if (item.open && !item.view) {
        mylib.axios({
          url: 'questionnaire/preview',
          params: {
            id: item.id
          },
          done (res) {
            this.$set(item, 'view', res.data)
          }
        }, this)
      }
    },
    getData (view) {
      let res = {
        description: view.description,
        logic: JSON.stringify({logic: view.logic}),
        question: [],
        section: []
      }
      _.each(view.section, (sec) => {
        let s = {
          name: sec.name || '',
          description: sec.description || '',
          item: []
        }

        // 设置问题列表
        _.each(sec.questions, (ques) => {
          let q = {
            type: ques.type,
            order: res.question.length + 1,
            item: {
              title: ques.question.title
            }
          }
          if (ques.question.content) q.item.content = ques.question.content
          if (ques.question.setting) q.item.setting = ques.question.setting

          res.question.push(q)
          s.item.push(q.order)

        })

        s.item = s.item.join(',')
        res.section.push(s)
      })

      res.question = JSON.stringify({question: res.question})
      res.section = JSON.stringify({section: res.section})

      return res
    },
    setTemplate (item) {
      this.$prompt('请输入新问卷名称', '创建问卷', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: item.name,
        inputPattern: /\S/,
         inputErrorMessage: '问卷名称不能为空'
      }).then(({ value }) => {
          let data = this.getData(item.view)
          data['name'] = value
          mylib.axios({
            type: 'post',
            url: 'questionnaire/create',
            params: data,
            done (res) {
              this.$message({
               type: 'success',
               message: '创建成功'
              });
              location.href = '/#/edit/' + res.data.data
            }
          }, this)
        }).catch(() => {
          this.$message({
           type: 'info',
           message: '取消创建'
          });
      });
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
.item .header-title{height: 50px;line-height: 50px;color:#666666;padding:0 40px;}
.item .header-title:hover{background-color: #d0e1f0;cursor: pointer;}

.item.open .header-title{background-color: #f3f3f3;}
.item.open .iconfont{transform: rotate(180deg);}
.item.open .view .operate {height: 50px;line-height: 50px;background-color: #f3f3f3;text-align: center;}
.item.open .view .content{background-color: #fff;overflow-y:auto;height: 300px;}

/*按钮 start*/
.el-button--primary, .el-button--primary.is-active, .el-button--primary:active {background: #126ab5;border-color: #126ab5;}
.el-button--primary:focus, .el-button--primary:hover {background: #4188c4;border-color: #4188c4;}
.el-button {border-radius: 0;padding: 7px 24px;}
/*按钮 end*/

/*问卷说明 start*/
.psq-header{box-sizing: border-box;padding-bottom: 40px;}
.psq-header .title{text-align: center;font-size: 18px;font-weight: bold;line-height: 24px;margin-bottom: 10px;}
.psq-header .desc{font-size: 14px;color: #666666;}
/*问卷说明 end*/

/*标题和段落 start*/
.psq-section-title{font-weight: bold;padding-top:40px;}
/*标题和段落 end*/

/*问题列表 start*/
.psq-list .psq-chunk{padding-top: 40px;}
/*问题列表 end*/
</style>
