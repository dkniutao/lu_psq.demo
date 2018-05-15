<template>
<div>
  <div class="item-title clearfix">
    <div
      class="order fl"
      v-text="item.order + '.'">
    </div>
    <div
      class="title fl"
      v-html="item.question.title">
    </div>
    <div
      class="fl"
      v-if="hasClearBtn"
      v-show="isShowClearBtn">
      <el-button
        style="padding:0"
        type="text"
        @click="clear">
        【清除选择】
      </el-button>
    </div>
  </div>
  <div class="item-content">
    <template v-if="alias === 'radio'">
      <el-row>
        <el-radio-group v-model="radio">
          <el-col
            :span="24"
            v-for="option in item.question.content"
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
        <el-checkbox-group
          v-model="checkbox">
            <el-col
              :span="24"
              v-for="(option, index) in item.question.content"
              :key="index">
              <el-checkbox :label="option.key">
                {{option.title}}
                <div v-if="option.img">
                  <img class="fl" :src="option.img">
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
            :rows="item.question.setting.height"
            :minlength="item.question.setting.min"
            :maxlength="item.question.setting.max"
            :placeholder="placeholder"
            v-model="input">
          </el-input>
        </el-col>
      </el-row>
    </template>

    <template v-else-if="alias === 'inputMulti'">
      <el-row class="inputMulti">
        <el-col :span="24">
          <el-form
            v-model="inputMulti"
            ref="form"
            label-width="100px"
            label-position="left">
            <el-form-item
              v-for="(option, index) in item.question.content"
              :label="option.title"
              :key="index">
              <el-input
                v-model="inputMulti[index]"
                type="textarea"
                :placeholder="placeholder"
                :rows="item.question.setting.height"
                :minlength="item.question.setting.min"
                :maxlength="item.question.setting.max">
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
            {{item.question.content[0]['title']}}
          </span>

          <el-radio-group class="fl" v-model="rate">
            <el-radio
              v-for="option in item.question.content"
              :label="option.score"
              :title="option.title"
              :key="option.score">
              {{option.score}}
            </el-radio>
          </el-radio-group>

          <span class="rate-last fl">
            {{item.question.content[item.question.content.length - 1]['title']}}
          </span>
        </el-col>
      </el-row>
    </template>

    <template v-else-if="alias === 'rateMulti'">
      <el-row class="rateMulti">
        <el-col :span="24">
          <el-table
            :data="item.question.setting"
            style="width: 800px">
            <el-table-column
              prop="title"
              label=""
              width="100">
            </el-table-column>

            <el-table-column
              v-for="column in item.question.content"
              align="center"
              header-align="center"
              :label="column.title"
              :key="column.score">
              <template slot-scope="scope">
                <el-radio
                  v-model="rateMulti[scope.$index]"
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
        v-model="sort"
        :content="item.question.content"
        >
      </xz-sort>
    </template>

    <template v-else-if="alias === 'slider'">
      <el-row class="slider">
        <el-col :span="24">
          <span
            class="slider-first fl"
            v-html="item.question.content[0].title +
            '【' + item.question.content[0].val + '】'">
          </span>
          <el-slider
            v-model="slider"
            class="fl"
            :min="+item.question.content[0].val"
            :max="+item.question.content[1].val">
          </el-slider>
          <span
            class="slider-last fl"
            v-html="item.question.content[1].title +
            '【' + item.question.content[1].val + '】'">
          </span>
        </el-col>
      </el-row>
    </template>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
import mylib from '@/mylib.js'
import xzSort from '@/components/pub/sort.vue'
export default {
  props: ['item'],
  components: {
    xzSort
  },
  data () {
    return {
      radio: '',
      checkbox: [],
      input: '',
      inputMulti: [],
      rate: '',
      rateMulti: [],
      slider: 0,
      sort: []
    }
  },
  computed: {
    isShowClearBtn () {
      let res = false
      switch (this.alias) {
        case 'radio':
          if (this.radio) res = true
          break
        case 'checkbox':
          if (this.checkbox.length) res = true
          break
        case 'rate':
          if (this.rate) res = true
          break
        case 'rateMulti':
          if (this.rateMulti.length) res = true
          break
      }
      return res
    },
    hasClearBtn () {
      return this.alias === 'radio' ||
        this.alias === 'checkbox' ||
        this.alias === 'rate' ||
        this.alias === 'rateMulti'
    },
    alias () {
      return mylib.TYPE_DATA[this.item.type]['alias']
    },
    placeholder () {
      let set = this.item.question.setting

      if (set.min && set.max) {
        if (set.min == set.max) {
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
    clear () {
      if (this.alias === 'radio') {
        this.radio = ''
      } else if (this.alias === 'checkbox') {
        this.checkbox = []
      } else if (this.alias === 'rate') {
        this.rate = ''
      } else if (this.alias === 'rateMulti') {
        this.rateMulti = []
      }
    }
  }
}
</script>
<style scoped>
.item-title .order{width:10px;margin-right: 20px;}

.item-content{margin-left: 30px;}
.el-col{padding-top:20px;}

.el-textarea {width: 800px;}
</style>
