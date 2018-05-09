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
  </div>
</div>
</template>
<script>
import _ from 'lodash'
import mylib from '@/mylib.js'
export default {
  props: ['item'],
  data () {
    return {
      radio: '',
      checkbox: []
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
</style>
