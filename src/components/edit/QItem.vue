<template>
  <div class="question-item" :class="isExpand ? 'expand' : ''">
    <div class="item-header">
      <div class="clearfix">
        <div class="fl" style="padding-right: 10px;">{{order}}. </div>
        <div class="fl" v-html="item.title"></div>
      </div>
      <div>
        <xz-question-item-show-radio
        :item="item"
        v-if="typeAlias == 'radio'">
        </xz-question-item-show-radio>

        <xz-question-item-show-checkbox
        :item="item"
        v-if="typeAlias == 'checkbox'">
        </xz-question-item-show-checkbox>

        <xz-question-item-show-input
        :item="item"
        v-if="typeAlias == 'input'">
        </xz-question-item-show-input>

        <xz-question-item-show-input-multi
        :item="item"
        v-if="typeAlias == 'inputMulti'">
        </xz-question-item-show-input-multi>

        <xz-question-item-show-rate
        :item="item"
        v-if="typeAlias == 'rate'">
        </xz-question-item-show-rate>

        <xz-question-item-show-rate-multi
        :item="item"
        v-if="typeAlias == 'rateMulti'">
        </xz-question-item-show-rate-multi>

        <xz-question-item-show-sort
        :item="item"
        v-if="typeAlias == 'sort'">
        </xz-question-item-show-sort>
      </div>
    </div>

    <div class="item-operate clearfix">
      <el-button v-show="order != '0'" class="fl operate-btn">
        在此题后插入新题
      </el-button>
      <el-button class="fr operate-btn">
        <i class="icon iconfont icon-zhidingdel"></i>最后
      </el-button>
      <el-button class="fr operate-btn">
        <i class="icon iconfont icon-icon_zhiding"></i>最前
      </el-button>
      <el-button class="fr operate-btn">
        <i class="icon iconfont icon-xiayi"></i>下移
      </el-button>
      <el-button class="fr operate-btn">
        <i class="icon iconfont icon-shangyi"></i>上移
      </el-button>
      <el-button class="fr operate-btn">
        <i class="icon iconfont icon-iconless"></i>删除
      </el-button>
      <el-button class="fr operate-btn">
        <i class="icon iconfont icon-fuzhi"></i>复制
      </el-button>
      <el-button v-show="!isExpand" class="fr operate-btn" @click="edit">
        <i class="icon iconfont icon-shuru"></i>编辑
      </el-button>
      <el-button v-show="isExpand" class="fr operate-btn" @click="complete">
        <i class="icon iconfont icon-wancheng"></i>完成
      </el-button>
    </div>

    <div class="item-edit">
      <el-row :gutter="20">
        <el-col :span="12">
          <quill-editor v-model="item.title" ref="myQuillEditor">
          </quill-editor>
        </el-col>
        <el-col :span="12">
          <div>当前题型：<strong v-html="typeName"></strong></div>
          <el-row>
            <el-col :span="5">
              <el-checkbox v-model="logic[1].checked">无条件跳题</el-checkbox>
            </el-col>
            <el-col :span="19" v-show="logic[1].checked">
              填写此题后跳转到第
              <el-select v-model="logic[1].rule" placeholder="请选择">
                <el-option
                  v-for="Q in list"
                  :key="Q.order"
                  :label="Q.order + '.' + Q.item.title"
                  :value="Q.order">
                </el-option>
              </el-select>
              题
            </el-col>
          </el-row>
          <el-row v-if="typeAlias == 'radio'">
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
                    <el-option
                      v-for="Q in list"
                      :key="Q.order"
                      :label="Q.order + '.' + Q.item.title"
                      :value="Q.order">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <el-button type="text" v-if="index == 0">+更多</el-button>
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
                  <el-select v-model="rule.question" placeholder="请选择" @change="logicQuestionChange(rule)">
                    <el-option
                      v-for="Q in list"
                      :key="Q.order"
                      :label="Q.order + '.' + Q.item.title"
                      :value="Q.order">
                    </el-option>
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

      <xz-question-item-edit-select
        :item="item"
        v-if="typeAlias == 'radio' || typeAlias == 'checkbox'">
      </xz-question-item-edit-select>

      <xz-question-item-edit-input
        :item="item"
        v-if="typeAlias == 'input'">
      </xz-question-item-edit-input>

      <xz-question-item-edit-input-multi
        :item="item"
        v-if="typeAlias == 'inputMulti'">
      </xz-question-item-edit-input-multi>

      <xz-question-item-edit-rate
        :item="item"
        v-if="typeAlias == 'rate'">
      </xz-question-item-edit-rate>

      <xz-question-item-edit-rate-multi
        :item="item"
        v-if="typeAlias == 'rateMulti'">
      </xz-question-item-edit-rate-multi>

      <xz-question-item-edit-sort
        :item="item"
        v-if="typeAlias == 'sort'">
      </xz-question-item-edit-sort>
    </div>

    <div class="item-submit">
      <el-button  class="question-submit" type="primary" @click="complete">完成编辑</el-button>
    </div>
  </div>
</template>
<script>
import mylib from '../../mylib.js'
import _ from 'lodash'

import xzQuestionItemEditSelect from './QItemEditSelect.vue'
import xzQuestionItemShowRadio from './QItemShowRadio.vue'
import xzQuestionItemShowCheckbox from './QItemShowCheckbox.vue'
import xzQuestionItemShowInput from './QItemShowInput.vue'
import xzQuestionItemEditInput from './QItemEditInput.vue'
import xzQuestionItemShowInputMulti from './QItemShowInputMulti.vue'
import xzQuestionItemEditInputMulti from './QItemEditInputMulti.vue'
import xzQuestionItemShowRate from './QItemShowRate.vue'
import xzQuestionItemEditRate from './QItemEditRate.vue'
import xzQuestionItemShowRateMulti from './QItemShowRateMulti.vue'
import xzQuestionItemEditRateMulti from './QItemEditRateMulti.vue'
import xzQuestionItemShowSort from './QItemShowSort.vue'
import xzQuestionItemEditSort from './QItemEditSort.vue'

export default {
  components: {
    xzQuestionItemEditSelect,
    xzQuestionItemShowRadio,
    xzQuestionItemShowCheckbox,
    xzQuestionItemShowInput,
    xzQuestionItemEditInput,
    xzQuestionItemShowInputMulti,
    xzQuestionItemEditInputMulti,
    xzQuestionItemShowRate,
    xzQuestionItemEditRate,
    xzQuestionItemShowRateMulti,
    xzQuestionItemEditRateMulti,
    xzQuestionItemShowSort,
    xzQuestionItemEditSort
  },
  props: ['order', 'type', 'typeName', 'item', 'list'],
  data () {
    return {
      isExpand: true,
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
    typeAlias () {
      return mylib.TYPE_ALIAS[this.type]
    }
  },
  methods: {
    // 关联逻辑选择问题
    logicQuestionChange (rule) {
      let target = _.find(this.list, function(v) {
        return v.order == rule.question
      })

      rule.option = ''
      rule.content = target ? target.item.content : []
    },
    edit () {
      this.isExpand = true
    },
    complete () {
      this.isExpand = false
    }
  }
}
</script>
<style>
/*基础 start*/
.question-item{box-sizing: border-box;border: 1px solid #fff;margin: 0 60px 20px;padding:20px;}
.question-item .item-header{padding-bottom:20px;margin-bottom:20px;border-bottom:1px solid #f3f3f3;}
.question-item .item-operate{padding-bottom:20px;margin-bottom:20px;border-bottom:1px solid #f3f3f3;}
.question-item .item-edit{margin-bottom: 20px;}
/*基础 end*/

/*悬浮 start*/
.question-item:hover{border-color:#126ab5;cursor: pointer;}
.question-item .item-operate,.question-item .item-edit,.question-item .item-submit{display: none;}
.question-item:hover .item-operate{display: block;}
.question-item .item-submit{text-align: center;}
/*悬浮 end*/

/*展开 start*/
.question-item.expand{border-color:#126ab5;cursor: initial;}
.question-item.expand .item-operate,
.question-item.expand .item-edit,
.question-item.expand .item-submit{display: block;}
/*展开 end*/

/*操作按钮 start*/
.operate-btn.el-button{border:1px solid #126ab5;border-radius: 0;color: #126ab5;padding:0 12px;font-size: 12px;height: 22px;line-height: 22px;margin-left: 10px;}
.operate-btn.el-button:hover{background:#d0e1f0;}
.operate-btn.el-button .iconfont{float:left;}
/*操作按钮 end*/

/*提交按钮 start*/
.question-submit.el-button--primary,
.question-submit.el-button--primary.is-active,
.question-submit.el-button--primary:active {background: #126ab5;border-color: #126ab5;}

.question-submit.el-button--primary:focus,
.question-submit.el-button--primary:hover {background: #4188c4;border-color: #4188c4;}

.question-submit.el-button {border-radius: 0;padding: 7px 24px;}
/*提交按钮 end*/
</style>
