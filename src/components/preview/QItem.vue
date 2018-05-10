<template>
<div>
  <div class="item-title">
    <el-row>
      <div
        class="order fl"
        v-text="item.order + '.'">
      </div>
      <div
        class="title fl"
        v-text="item.question.title">
      </div>
    </el-row>
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
                <img class="fl" v-if="option.img" :src="option.img" alt="">
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
              v-for="option in item.question.content"
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
            :rows="item.question.setting.height"
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
    alias () {
      return mylib.TYPE_DATA[this.item.type]['alias']
    }
  },
  methods: {
  }
}
</script>
<style scoped>
.item-title .order{width:10px;margin-right: 20px;}

.item-content{margin-left: 30px;}
.el-col{padding-top:20px;}

.el-textarea {width: 800px;}
</style>
