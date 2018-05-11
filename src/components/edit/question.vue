<template>
<div>
  <div class="question-item" :class="{'edit': isEdit, 'hover': isPoint}">
    <div class="item-header">
      <div class="item-title clearfix">
        <div
          class="order fl"
          v-text="order + '.'">
        </div>
        <div
          class="title fl"
          v-html="item.title">
        </div>
      </div>

      <div class="item-content">
        <template v-if="alias === 'radio'">
          <el-row>
            <el-radio-group>
              <el-col
                :span="24"
                v-for="option in item.content"
                :key="option.key">
                <el-radio :label="option.key">
                  {{option.title}}
                  <div v-if="option.img">
                    <img class="fl" v-if="option.img" :src="option.img">
                  </div>
                </el-radio>
              </el-col>
            </el-radio-group>
          </el-row>
        </template>

        <template v-else-if="alias === 'checkbox'">
          <el-row>
            <el-checkbox-group>
                <el-col
                  :span="24"
                  v-for="(option, index) in item.content"
                  :key="index"
                  >
                  <el-checkbox :label="option.key">
                    {{option.title}}
                    <div v-if="option.img">
                      <img class="fl" v-if="option.img" :src="option.img">
                    </div>
                  </el-checkbox>
                </el-col>
              </el-checkbox-group>
            </el-row>
        </template>

        <template v-else-if="alias === 'input'">
          <el-row>
            <el-col :span="24">
              <el-input
                type="textarea"
                :rows="item.setting.height"
                :minlength="item.setting.min"
                :maxlength="item.setting.max"
                :placeholder="placeholder">
              </el-input>
            </el-col>
          </el-row>
        </template>

        <template v-else-if="alias === 'inputMulti'">
          <el-row class="inputMulti">
            <el-col :span="24">
              <el-form
                ref="form"
                label-width="100px"
                label-position="left">
                <el-form-item
                  v-for="(option, index) in item.content"
                  :label="option.title"
                  :key="index">
                  <el-input
                    type="textarea"
                    :placeholder="placeholder"
                    :rows="item.setting.height"
                    :minlength="item.setting.min"
                    :maxlength="item.setting.max">
                  </el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </template>

        <template v-else-if="alias === 'rate'">
          <el-row class="rate">
            <el-col :span="24">
              <span class="rate-first fl">
                {{item.content[0]['title']}}
              </span>

              <el-radio-group class="fl">
                <el-radio
                  v-for="option in item.content"
                  :label="option.score"
                  :title="option.title"
                  :key="option.score">
                  {{option.score}}
                </el-radio>
              </el-radio-group>

              <span class="rate-last fl">
                {{item.content[item.content.length - 1]['title']}}
              </span>
            </el-col>
          </el-row>
        </template>

        <template v-else-if="alias === 'rateMulti'">
          <el-row class="rateMulti">
            <el-col :span="24">
              <el-table
                :data="item.setting"
                style="width: 800px">
                <el-table-column
                  prop="title"
                  label=""
                  width="100">
                </el-table-column>

                <el-table-column
                  v-for="column in item.content"
                  align="center"
                  header-align="center"
                  :label="column.title"
                  :key="column.score">
                  <template slot-scope="scope">
                    <el-radio
                      :label="column.score"
                      :title="'(分值:' + column.score + ')'">
                    </el-radio>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </template>

        <template v-else-if="alias === 'sort'">
          <xz-sort
            :content="item.content">
          </xz-sort>
        </template>

        <template v-else-if="alias === 'slider'">
          <el-row class="slider">
            <el-col :span="24">
              <span
                class="slider-first fl"
                v-html="item.content[0].title +
                '【' + item.content[0].val + '】'">
              </span>
              <el-slider
                class="fl"
                :min="+item.content[0].val"
                :max="+item.content[1].val">
              </el-slider>
              <span
                class="slider-last fl"
                v-html="item.content[1].title +
                '【' + item.content[1].val + '】'">
              </span>
            </el-col>
          </el-row>
        </template>
      </div>
    </div>

    <div class="item-operate clearfix">
      <el-button
        class="fl operate-btn"
        :class="{hover: isPoint}"
        @click="setPoint">
        在此题后插入新题
      </el-button>
      <el-button
        class="fr operate-btn"
        @click="last">
        <i class="icon iconfont icon-zhidingdel"></i>最后
      </el-button>
      <el-button
        class="fr operate-btn"
        @click="first">
        <i class="icon iconfont icon-icon_zhiding"></i>最前
      </el-button>
      <el-button
        class="fr operate-btn"
        @click="down">
        <i class="icon iconfont icon-xiayi"></i>下移
      </el-button>
      <el-button
        class="fr operate-btn"
        @click="up">
        <i class="icon iconfont icon-shangyi"></i>上移
      </el-button>
      <el-button
        class="fr operate-btn"
        @click="del">
        <i class="icon iconfont icon-iconless"></i>删除
      </el-button>
      <el-button
        class="fr operate-btn"
        @click="copy">
        <i class="icon iconfont icon-fuzhi"></i>复制
      </el-button>
      <el-button
        v-show="!isEdit"
        class="fr operate-btn"
        @click="edit">
        <i class="icon iconfont icon-shuru"></i>编辑
      </el-button>
      <el-button
        v-show="isEdit"
        class="fr operate-btn"
        @click="complete">
        <i class="icon iconfont icon-wancheng"></i>完成
      </el-button>
    </div>

    <div class="item-edit">
      <el-row :gutter="20">
        <el-col :span="12">
          <quill-editor v-model="item.title" ref="myQuillEditor">
          </quill-editor>
        </el-col>
        <el-col class="item-logic" :span="12">
          <div class="item-logic-title">当前题型：<strong v-html="typeName"></strong></div>
          <el-row>
            <el-col :span="5">
              <el-checkbox v-model="logic[1].checked">无条件跳题</el-checkbox>
            </el-col>
            <el-col :span="19" v-show="logic[1].checked">
              填写此题后跳转到第
              <el-select v-model="logic[1].rule" placeholder="请选择">
               <!--  <el-option
                  v-for="Q in list"
                  :key="Q.order"
                  :label="Q.order + '.' + Q.item.title"
                  :value="Q.order">
                </el-option> -->
              </el-select>
              题
            </el-col>
          </el-row>
          <el-row v-if="alias === 'radio'">
            <el-col :span="5">
              <el-checkbox v-model="logic[2].checked">有条件跳题</el-checkbox>
            </el-col>
            <el-col :span="19" v-show="logic[2].checked">
              <el-row :gutter="10" v-for="(rule, index) in logic[2].rule" :key="index">
                <el-col :span="8">
                  <el-select v-model="rule.option" placeholder="请选择">
                    <el-option
                      v-for="option in item.content"
                      :key="option.key"
                      :label="option.key + '.' + option.title"
                      :value="option.key">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="12">
                  <el-select v-model="rule.question" placeholder="请选择">
                   <!--  <el-option
                      v-for="Q in list"
                      :key="Q.order"
                      :label="Q.order + '.' + Q.item.title"
                      :value="Q.order">
                    </el-option> -->
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <el-button type="text" v-if="index === 0">+更多</el-button>
                  <el-button type="text" v-else>-取消</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="5">
              <el-checkbox v-model="logic[3].checked">关联逻辑</el-checkbox>
            </el-col>
            <el-col :span="19" v-show="logic[3].checked">
              <el-row :gutter="10" v-for="(rule, index) in logic[3].rule" :key="index">
                <el-col :span="12">
                  <el-select
                    v-model="rule.question"
                    placeholder="请选择"
                    @change="logicQuestionChange(rule)"
                  >
                   <!--  <el-option
                      v-for="Q in list"
                      :key="Q.order"
                      :label="Q.order + '.' + Q.item.title"
                      :value="Q.order">
                    </el-option> -->
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="rule.option" placeholder="请选择">
                    <el-option
                      v-for="option in rule.content"
                      :key="option.key"
                      :label="option.key + '.' + option.title"
                      :value="option.key">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <el-button type="text">+更多</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <xz-question-item-edit-option
        :item="item"
        v-if="alias === 'radio'
          || alias === 'checkbox'
          || alias === 'sort'">
      </xz-question-item-edit-option>

      <xz-question-item-edit-input
        :item="item"
        v-if="alias === 'input'">
      </xz-question-item-edit-input>

      <xz-question-item-edit-input-multi
        :item="item"
        v-if="alias === 'inputMulti'">
      </xz-question-item-edit-input-multi>

      <xz-question-item-edit-rate
        :item="item"
        v-if="alias === 'rate'">
      </xz-question-item-edit-rate>

      <xz-question-item-edit-rate-multi
        :item="item"
        v-if="alias === 'rateMulti'">
      </xz-question-item-edit-rate-multi>

      <xz-question-item-edit-slider
        :item="item"
        v-if="alias === 'slider'">
      </xz-question-item-edit-slider>
    </div>

    <div class="item-submit">
      <el-button
        class="question-submit"
        type="primary"
        @click="complete">
        完成编辑
      </el-button>
    </div>
  </div>
</div>
</template>
<script>
import mylib from '../../mylib.js'
import _ from 'lodash'
import xzSort from '@/components/pub/sort.vue'
import xzQuestionItemEditOption from './QItemEditOption.vue'
import xzQuestionItemEditInput from './QItemEditInput.vue'
import xzQuestionItemEditInputMulti from './QItemEditInputMulti.vue'
import xzQuestionItemEditRate from './QItemEditRate.vue'
import xzQuestionItemEditRateMulti from './QItemEditRateMulti.vue'
import xzQuestionItemEditSlider from './QItemEditSlider.vue'

export default {
  components: {
    xzSort,
    xzQuestionItemEditOption,
    xzQuestionItemEditInput,
    xzQuestionItemEditInputMulti,
    xzQuestionItemEditRate,
    xzQuestionItemEditRateMulti,
    xzQuestionItemEditSlider
  },
  props: ['point', 'type', 'typeName', 'item', 'quesIndex', 'secIndex', 'sec', 'section'],
  data () {
    return {
      isEdit: false, // 是否进入编辑状态
      logic: {
        '1': {
          checked: true,
          rule: ''
        },
        '2': {
          checked: true,
          rule: [{
            option: '',
            question: ''
          }, {
            option: '',
            question: ''
          }]
        },
        '3': {
          checked: true,
          rule: [{
            question: '',
            option: ''
          }]
        }
      }
    }
  },
  computed: {
    isPoint () {
      if (this.point[0] === this.secIndex && this.point[1] === this.quesIndex) {
        return true
      }
      return false
    },
    order () {
      let o = this.quesIndex + 1
      for (let i = 0; i < this.secIndex; i++) {
        o += +this.section[i].question.length
      }
      return o
    },
    alias () {
      return mylib.TYPE_DATA[this.type]['alias']
    },
    isTitle () {
      return this.alias === 'title' || this.alias === 'desc'
    },
    placeholder () {
      let set = this.item.setting

      if (set.min && set.max) {
        if (set.min === set.max) {
          return set.min + '个字'
        } else {
          return set.min + '到' + set.max + '个字'
        }
      } else if (set.min) {
        return '最少' + set.min + '个字'
      } else if (set.max) {
        return set.max + '个字以内'
      } else {
        return ''
      }
    }
  },
  methods: {
    setPoint () {
      if (this.isPoint) {
        this.$set(this.point, 0, '')
        this.$set(this.point, 1, '')
        return
      }
      this.$set(this.point, 0, this.secIndex)
      this.$set(this.point, 1, this.quesIndex)
    },
    // 关联逻辑选择问题
    logicQuestionChange (rule) {
    //   let target = _.find(this.list, function(v) {
    //     return v.order === rule.question
    //   })

    //   rule.option = ''
    //   rule.content = target ? target.item.content : []
    },
    edit () {
      this.isEdit = true
    },
    complete () {
      this.isEdit = false
    },
    // updateList () {
    //   _.each(this.list, (v, k) => {
    //     v.order = k + 1
    //   })
    // },
    up () {
      // if (this.isTitle) {
      //   return
      // }

      // let index = this.order - 1
      // if (index <= 0) return

      // this.list.splice(index, 1)

      // this.list.splice(index - 1, 0, {
      //   item: this.item,
      //   type: this.type,
      //   order: this.order
      // })

      // this.updateList()
    },
    down () {
      // if (this.isTitle) {
      //   return
      // }

      // let index = this.order - 1
      // if (index >= this.list.length - 1) return

      // this.list.splice(index, 1)

      // this.list.splice(index + 1, 0, {
      //   item: this.item,
      //   type: this.type,
      //   order: this.order
      // })

      // this.updateList()
    },
    last () {
      // let index = this.order - 1
      // if (index >= this.list.length - 1) return

      // this.list.splice(index, 1)

      // this.list.splice(this.list.length, 0, {
      //   item: this.item,
      //   type: this.type,
      //   order: this.order
      // })

      // this.updateList()
    },
    first () {
      // let index = this.order - 1
      // if (index <= 0) return

      // this.list.splice(index, 1)

      // this.list.splice(0, 0, {
      //   item: this.item,
      //   type: this.type,
      //   order: this.order
      // })

      // this.updateList()
    },
    del () {
      // let index = this.order - 1
      // this.list.splice(index, 1)

      // this.updateList()
    },
    copy () {
      // let index = this.order - 1
      // this.list.splice(index + 1, 0, {
      //   item: _.clone(this.item),
      //   type: this.type,
      //   order: this.order
      // })

      // this.updateList()
    }
  },
  created () {
    let secIndex = this.item['secIndex']
    let quesIndex = this.item['quesIndex']

    if (this.point[0] === secIndex && this.point[1] === quesIndex) {
      this.point = this.secIndex
      this.point = this.quesIndex
    }

    this.item['secIndex'] = this.secIndex
    this.item['quesIndex'] = this.quesIndex
  }
}
</script>
<style>
/*基础 start*/
.question-item{box-sizing: border-box;border: 1px solid #fff;margin: 0 60px 62px;padding:20px;}
.question-item .item-header{padding-bottom:20px;border-bottom:1px solid #f3f3f3;}
.question-item .item-operate{margin-top:20px;}
.question-item .item-edit{margin-top: 20px;}
.question-item .item-submit{margin-top: 20px;}
/*基础 end*/

/*悬浮 start*/
.question-item:hover,.question-item.hover{border-color:#126ab5;cursor: pointer;margin-bottom: 20px;}
.question-item .item-operate,.question-item .item-edit,.question-item .item-submit{display: none;}
.question-item:hover .item-operate, .question-item.hover .item-operate{display: block;}
.question-item .item-submit{text-align: center;}
/*悬浮 end*/

/*展开 start*/
.question-item.edit{border-color:#126ab5;cursor: initial;margin-bottom: 20px;}
.question-item.edit .item-operate,
.question-item.edit .item-edit,
.question-item.edit .item-submit{display: block;}
.question-item.edit .item-operate{padding-bottom:20px;border-bottom:1px solid #f3f3f3;}
/*展开 end*/

/*问题样式 start*/
.item-title .order{width:10px;margin-right: 20px;}
.item-content{margin-left: 30px;}
.item-content .el-col{padding-top:20px;}
/*问题样式 end*/

/*操作按钮 start*/
.operate-btn.el-button{border:1px solid #126ab5;border-radius: 0;color: #126ab5;padding:0 12px;font-size: 12px;height: 22px;line-height: 22px;margin-left: 10px;}
.operate-btn.el-button:hover{background:#d0e1f0;}
.operate-btn.el-button .iconfont{float:left;}
.operate-btn.el-button.hover{background: #126ab5;color:#fff;}
/*操作按钮 end*/

/*提交按钮 start*/
.question-submit.el-button--primary,
.question-submit.el-button--primary.is-active,
.question-submit.el-button--primary:active {background: #126ab5;border-color: #126ab5;}

.question-submit.el-button--primary:focus,
.question-submit.el-button--primary:hover {background: #4188c4;border-color: #4188c4;}

.question-submit.el-button {border-radius: 0;padding: 7px 24px;}
/*提交按钮 end*/

/*跳题逻辑设置 start*/
.item-logic{line-height: 30px;}
.item-logic .item-logic-title strong{margin-left:10px;}
.item-logic .el-row + .el-row{margin-top: 10px;}
.item-logic .el-row .el-button{padding: 7px;}
/*跳题逻辑设置 end*/
</style>
