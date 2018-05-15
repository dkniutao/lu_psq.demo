<template>
<div class="reports">
<div class="search">
  <div class="fl"><el-button class="add-psq" type="primary"><i class="iconfont icon-tubiao05"></i>批量导出</el-button></div>
  <div class="fr">
    <el-input placeholder="请输入内容" v-model="search"><i slot="suffix" class="iconfont icon-sousuo1"></i></el-input>
  </div>
</div>
<div class="table">
  <div class="table-list"
  v-for="(item, index) in reportsdata.questions">
    <div class="title"><span>第{{item.order}}题</span><span>{{item.question.title}}</span></div>
    <div class="list" v-if="item.type == 5">
      <el-table
        :data="item.question.content"
        style="width: 1040px"
        :default-sort = "{prop: 'count', order: 'descending'}"
        show-summary
        sum-text="合计总数">
        <el-table-column
          prop="title"
          label="选项"
          sortable
          width="400">
        </el-table-column>
        <el-table-column
          prop="count"
          label="小计"
          sortable
          width="138">
        </el-table-column>
        <el-table-column
          label="比例"
          :formatter="formatter">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.rate"></el-progress>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="list" v-if="item.type == 6">
    <div>数据修改</div>
    </div>
    <div class="list" v-if="item.type == 1 || item.type == 2">
      <el-table
        :data="item.question.content"
        style="width: 1040px"
        :default-sort = "{prop: 'count', order: 'descending'}"
        show-summary
        sum-text="合计总数">
        <el-table-column
          prop="key"
          label="选项"
          sortable
          width="400">
        </el-table-column>
        <el-table-column
          prop="count"
          label="小计"
          sortable
          width="138">
        </el-table-column>
        <el-table-column
          label="比例"
          :formatter="formatter">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.rate"></el-progress>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</div>
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
      reportsdata: {
        // 'questions': {
        //   '1': {//题号
        //     'id': '262',
        //     'q_id': '33',
        //     'type': '1',//题型
        //     'question': {
        //         'title': '你喜欢以下哪个数字？【单选题】',
        //         'content': [
        //             {
        //                 'key': 'A',
        //                 'title': '1',
        //                 'img': '',
        //                 'count': 5,//当前选项选择的数量
        //                 'rate': '83'//所占比例
        //             },
        //             {
        //                 'key': 'B',
        //                 'title': '-1',
        //                 'img': '',
        //                 'count': 1,
        //                 'rate': '17'
        //             },
        //             {
        //                 'key': 'C',
        //                 'title': '0',
        //                 'img': '',
        //                 'count': 0,
        //                 'rate': '0'
        //             }
        //         ]
        //     },
        //     'is_required': '1',
        //     'order': '1',
        //     'type_name': '单选题',//题型
        //     'answer': 'A,B,A,A,A,A',//本题作答的所有人答案
        //     'effective': 6//本题有效填写人次
        //   },
        //   '2': {
        //       'id': '263',
        //       'q_id': '33',
        //       'type': '2',
        //       'question': {
        //           'title': '以下代表真值有？【多选题】',
        //           'content': [
        //               {
        //                   'key': 'A',
        //                   'title': 'yes',
        //                   'img': '',
        //                   'count': 1,
        //                   'rate': '17'
        //               },
        //               {
        //                   'key': 'B',
        //                   'title': 'ok',
        //                   'img': '',
        //                   'count': 5,
        //                   'rate': '83'
        //               },
        //               {
        //                   'key': 'C',
        //                   'title': 'true',
        //                   'img': '',
        //                   'count': 6,
        //                   'rate': '100'
        //               },
        //               {
        //                   'key': 'D',
        //                   'title': 'no',
        //                   'img': '',
        //                   'count': 0,
        //                   'rate': '0'
        //               }
        //           ]
        //       },
        //       'is_required': '1',
        //       'order': '2',
        //       'type_name': '多选题',
        //       'answer': 'B,C,A,C,B,C,B,C,B,C,B,C',
        //       'effective': 6
        //   },
        //   '3': {
        //       'id': '264',
        //       'q_id': '33',
        //       'type': '1',
        //       'question': {
        //           'title': '哪个是数字？【单选带图片】',
        //           'content': [
        //               {
        //                   'key': 'A',
        //                   'title': 'true',
        //                   'img': 'uploads/question/201805/1523268552_751.png',
        //                   'count': 0,
        //                   'rate': '0'
        //               },
        //               {
        //                   'key': 'B',
        //                   'title': 'false',
        //                   'img': 'uploads/question/201805/1523268447_91.png',
        //                   'count': 0,
        //                   'rate': '0'
        //               },
        //               {
        //                   'key': 'C',
        //                   'title': '0',
        //                   'img': 'uploads/question/201805/1523268552_718.png',
        //                   'count': 6,
        //                   'rate': '100'
        //               }
        //           ]
        //       },
        //       'is_required': '1',
        //       'order': '3',
        //       'type_name': '单选题',
        //       'answer': 'C,C,C,C,C,C',
        //       'effective': 6
        //   },
        //   '4': {
        //       'id': '265',
        //       'q_id': '33',
        //       'type': '1',
        //       'question': {
        //           'title': '哪个是中文呢？【单选题】',
        //           'content': [
        //               {
        //                   'key': 'A',
        //                   'title': '你好',
        //                   'img': '',
        //                   'count': 6,
        //                   'rate': '100'
        //               },
        //               {
        //                   'key': 'B',
        //                   'title': 'hello',
        //                   'img': '',
        //                   'count': 0,
        //                   'rate': '0'
        //               },
        //               {
        //                   'key': 'C',
        //                   'title': 'welcome',
        //                   'img': '',
        //                   'count': 0,
        //                   'rate': '0'
        //               }
        //           ]
        //       },
        //       'is_required': '1',
        //       'order': '4',
        //       'type_name': '单选题',
        //       'answer': 'A,A,A,A,A,A',
        //       'effective': 6
        //   },
        //   '5': {
        //       'id': '266',
        //       'q_id': '33',
        //       'type': '2',
        //       'question': {
        //           'title': '你的评价是什么？【多选题】',
        //           'content': [
        //               {
        //                   'key': 'A',
        //                   'title': '厌恶',
        //                   'img': '',
        //                   'count': 0,
        //                   'rate': '0'
        //               },
        //               {
        //                   'key': 'B',
        //                   'title': '可怜',
        //                   'img': '',
        //                   'count': 0,
        //                   'rate': '0'
        //               },
        //               {
        //                   'key': 'C',
        //                   'title': '满意',
        //                   'img': '',
        //                   'count': 0,
        //                   'rate': '0'
        //               },
        //               {
        //                   'key': 'D',
        //                   'title': '不好',
        //                   'img': '',
        //                   'count': 6,
        //                   'rate': '100'
        //               },
        //               {
        //                   'key': 'E',
        //                   'title': '不满意',
        //                   'img': '',
        //                   'count': 6,
        //                   'rate': '100'
        //               }
        //           ]
        //       },
        //       'is_required': '1',
        //       'order': '5',
        //       'type_name': '多选题',
        //       'answer': 'D,E,D,E,D,E,D,E,D,E,D,E',
        //       'effective': 6
        //   },
        //   '6': {
        //       'id': '267',
        //       'q_id': '33',
        //       'type': '1',
        //       'question': {
        //           'title': '1比0大小如何？【单选题】',
        //           'content': [
        //               {
        //                   'key': 'A',
        //                   'title': '等于',
        //                   'img': '',
        //                   'count': 0,
        //                   'rate': '0'
        //               },
        //               {
        //                   'key': 'B',
        //                   'title': '大于',
        //                   'img': '',
        //                   'count': 5,
        //                   'rate': '83'
        //               },
        //               {
        //                   'key': 'C',
        //                   'title': '小于',
        //                   'img': '',
        //                   'count': 1,
        //                   'rate': '17'
        //               }
        //           ]
        //       },
        //       'is_required': '1',
        //       'order': '6',
        //       'type_name': '单选题',
        //       'answer': 'B,C,B,B,B,B',
        //       'effective': 6
        //   },
        //   '9': {
        //       'id': '270',
        //       'q_id': '33',
        //       'type': '5',
        //       'question': {
        //           'title': '【单项评分】',
        //           'content': [
        //               {
        //                   'title': '很不满意',
        //                   'score': '1',
        //                   'count': 0,
        //                   'rate': '0'
        //               },
        //               {
        //                   'title': '不满意',
        //                   'score': '2',
        //                   'count': 1,
        //                   'rate': '17'
        //               },
        //               {
        //                   'title': '一般',
        //                   'score': '3',
        //                   'count': 5,
        //                   'rate': '83'
        //               },
        //               {
        //                   'title': '满意',
        //                   'score': '4',
        //                   'count': 0,
        //                   'rate': '0'
        //               },
        //               {
        //                   'title': '很满意',
        //                   'score': '5',
        //                   'count': 0,
        //                   'rate': '0'
        //               }
        //           ]
        //       },
        //       'is_required': '1',
        //       'order': '9',
        //       'type_name': '单选评分题',
        //       'answer': '3,2,3,3,3,3',
        //       'effective': 6
        //   },
        //   '10': {
        //       'id': '271',
        //       'q_id': '33',
        //       'type': '6',
        //       'question': {
        //           'title': '【多项评分】',
        //           'content': [
        //               {
        //                   'title': '很不满意',
        //                   'score': '1',
        //                   'count0': 0,//“外观”属性很不满意所占数量
        //                   'rate1': '0',//“外观”很不满意占比
        //                   'count1': 0,//“功能”很不满意所占数量
        //                   'rate1': '0'//“功能”很不满意所占比
        //               },
        //               {
        //                   'title': '不满意',
        //                   'score': '2',
        //                   'count0': 1,
        //                   'rate0': '17',
        //                   'count1': 0,
        //                   'rate1': '0'
        //               },
        //               {
        //                   'title': '一般',
        //                   'score': '3',
        //                   'count0': 4,
        //                   'rate0': '67',
        //                   'count1': 1,
        //                   'rate1': '17'
        //               },
        //               {
        //                   'title': '满意',
        //                   'score': '4',
        //                   'count0': 1,
        //                   'rate0': '17',
        //                   'count1': 3,
        //                   'rate1': '50'
        //               },
        //               {
        //                   'title': '很满意',
        //                   'score': '5',
        //                   'count0': 0,
        //                   'rate0': '0',
        //                   'count1': 2,
        //                   'rate1': '33'
        //               }
        //           ],
        //           'setting': [
        //               {
        //                   'title': '外观'
        //               },
        //               {
        //                   'title': '功能'
        //               }
        //           ]
        //       },
        //       'is_required': '1',
        //       'order': '10',
        //       'type_name': '多项评分题',
        //       'answer': [
        //           '3,3,4,2,3,3',
        //           '4,5,5,4,4,3'
        //       ],
        //       'effective': 6
        //   }
        // }
    }
    }
  },
  computed: {
  },
  methods: {
    formatter(row, column) {
      return row.address;
    }
  },
  created () {
  },
  mounted () {
    // 获取回收概况统计
    // mylib.axios({
    //   url: 'questionnaire/frequency',
    //   params: {
    //     id: '33'
    //   },
    //   done (res) {
    //     console.log('res频数报表', res)
    //   }
    // }, this)
    console.log(this.reportsdata)
  }
}
</script>
<style scoped>
  .reports .search{
    border-bottom: 1px solid #e8ecf0;
  }
  .reports .table .table-list .title span{
    font-size: 14px;
  }
  .reports .table .table-list .title span:first-child{
    display: inline-block;
    margin: 40px 19px 20px 40px;
    font-weight: bold;
  }
  .reports .el-table{
    margin: 0 auto;
  }
</style>
