<template>
<div>
  <div class="question-item" :class="{'edit': isEdit, 'hover': isPoint}">
    <div class="item-header">
      <!-- 标题和段落 -->
      <div class="item-title clearfix">
        <div
          class="title fl"
          v-html="sec[modelType]">
        </div>
      </div>
    </div>

    <div class="item-operate clearfix">
      <template v-if="canOperate">
        <el-button
          class="fl operate-btn"
          :class="{hover: isPoint}"
          @click="setPoint">
          在此题后插入新题
        </el-button>
      </template>
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
      <!-- 标题和段落 -->
      <el-row>
        <el-col :span="24">
          <quill-editor v-model="sec[modelType]" ref="myQuillEditor">
          </quill-editor>
        </el-col>
      </el-row>
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

export default {
  props: ['point', 'type', 'typeName', 'secIndex', 'sec', 'section'],
  data () {
    return {
      isEdit: false
    }
  },
  computed: {
    canOperate () {
      if (this.alias === 'title') {
        if (this.sec.description) return false
      }
      return true
    },
    isPoint () {
      if (this.point[0] === this.secIndex && this.point[1] === '-1') {
        return true
      }
      return false
    },
    alias () {
      return mylib.TYPE_DATA[this.type]['alias']
    },
    modelType () {
      if (this.alias === 'title') return 'name'
      if (this.alias === 'desc') return 'description'
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
      this.$set(this.point, 1, '-1')
    },
    edit () {
      this.isEdit = true
    },
    complete () {
      this.isEdit = false
    },
    up () {
    },
    down () {

    },
    last () {

    },
    first () {

    },
    del () {

    },
    copy () {
    }
  },
  created () {
    let secIndex = this.sec['secIndex']
    let quesIndex = -1

    if (this.point[0] === secIndex && this.point[1] === quesIndex) {
      this.point = this.secIndex
      this.point = -1
    }

    this.sec['secIndex'] = this.secIndex
    this.sec['quesIndex'] = -1
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
