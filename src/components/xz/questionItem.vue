<template>
  <div class="question-item" :class="isExpand ? 'expand' : ''">
    <div class="item-header">
      <div class="clearfix">
        <div class="fl" style="padding-right: 10px;">{{+index + 1}}. </div>
        <div v-html="source.title"></div>
      </div>
      <div>
        <xz-question-item-radio :source="source" v-if="type == 'radio'"></xz-question-item-radio>
        <xz-question-item-checkbox :source="source" v-if="type == 'checkbox'"></xz-question-item-checkbox>
      </div>
    </div>

    <div class="item-operate clearfix">
      <el-button v-show="index != '0'" class="fl operate-btn">在此题后插入新题</el-button>
      <el-button class="fr operate-btn"><i class="iconfont icon-zhidingdel"></i>最后</el-button>
      <el-button class="fr operate-btn"><i class="iconfont icon-icon_zhiding"></i>最前</el-button>
      <el-button class="fr operate-btn"><i class="iconfont icon-xiayi"></i>下移</el-button>
      <el-button class="fr operate-btn"><i class="iconfont icon-shangyi"></i>上移</el-button>
      <el-button class="fr operate-btn"><i class="iconfont icon-iconless"></i>删除</el-button>
      <el-button class="fr operate-btn"><i class="iconfont icon-fuzhi"></i>复制</el-button>
      <el-button v-show="!isExpand" class="fr operate-btn" @click="edit"><i class="iconfont icon-shuru"></i>编辑</el-button>
      <el-button v-show="isExpand" class="fr operate-btn" @click="complete"><i class="iconfont icon-wancheng"></i>完成</el-button>
    </div>

    <div class="item-edit">
      <xz-question-item-edit-radio :source="source" v-if="type == 'radio'"></xz-question-item-edit-radio>
      <xz-question-item-edit-checkbox :source="source" v-if="type == 'checkbox'"></xz-question-item-edit-checkbox>
    </div>

    <div class="item-submit">
      <el-button  class="question-submit" type="primary" @click="complete">完成编辑</el-button>
    </div>
  </div>
</template>
<script>
import questionItemRadio from './questionItemRadio.vue'
import questionItemEditRadio from './questionItemEditRadio.vue'
import questionItemCheckbox from './questionItemCheckbox.vue'
import questionItemEditCheckbox from './questionItemEditCheckbox.vue'

export default {
  components: {
    'xz-question-item-radio': questionItemRadio,
    'xz-question-item-edit-radio': questionItemEditRadio,
    'xz-question-item-checkbox': questionItemCheckbox,
    'xz-question-item-edit-checkbox': questionItemEditCheckbox,
  },
  props: ['index', 'type'],
  data () {
    return {
      isExpand: true,
      source: {
        title: '请输入问题标题1',
        options: [{
          id: '1',
          title: '选项1'
        }, {
          id: '2',
          title: '选项2'
        }]
      }
    }
  },
  methods: {
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
/*基础 end*/

/*悬浮 start*/
.question-item:hover{border-color:#126ab5;cursor: pointer;}
.question-item .item-operate,.question-item .item-edit,.question-item .item-submit{display: none;}
.question-item:hover .item-operate{display: block;}
/*悬浮 end*/

/*展开 start*/
.question-item.expand{border-color:#126ab5;cursor: initial;}
.question-item.expand .item-operate,.question-item.expand .item-edit,.question-item.expand .item-submit{display: block;}
/*展开 end*/

.question-item .item-header{padding-bottom:20px;margin-bottom:20px;border-bottom:1px solid #f3f3f3;}
.question-item .item-operate{padding-bottom:20px;margin-bottom:20px;border-bottom:1px solid #f3f3f3;}
.question-item .item-edit{margin-bottom: 20px;}

.title-input{width:100%;color:#333;font-size: 14px;line-height: 30px;border:none;outline: none;font-weight: bold;}

.operate-btn.el-button{border:1px solid #126ab5;border-radius: 0;color: #126ab5;padding:0 12px;font-size: 12px;height: 22px;line-height: 22px;margin-left: 10px;}
.operate-btn.el-button:hover{background:#d0e1f0;}
.operate-btn.el-button .iconfont{float:left;}

.item-submit{text-align: center;}

.question-submit.el-button--primary, .question-submit.el-button--primary.is-active, .question-submit.el-button--primary:active {background: #126ab5;border-color: #126ab5;}
.question-submit.el-button--primary:focus, .question-submit.el-button--primary:hover {background: #4188c4;border-color: #4188c4;}
.question-submit.el-button {border-radius: 0;padding: 7px 24px;}
</style>
