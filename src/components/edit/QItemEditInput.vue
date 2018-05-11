<template>
<div>
  <el-row>
    <el-col :span="24">
      <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px;">
        <el-form-item label="高度">
          <el-select v-model="item.setting.height" placeholder="">
            <el-option
              v-for="i in 10"
              :label="i + '行'"
              :value="i"
              :key="i">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最小字数">
          <el-input-number
            v-model="item.setting.min"
            :controls="false"
            :min="0"
            :max="99999"
            @blur="checkNumber('min')">
          </el-input-number>
        </el-form-item>
         <el-form-item label="最大字数">
          <el-input-number
            v-model="item.setting.max"
            :controls="false"
            :min="0"
            :max="99999"
            @blur="checkNumber('max')">
          </el-input-number>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {}
  },
  methods: {
    checkNumber (type) {
      setTimeout(() => {
        let set = this.item.setting

        if (set.min > set.max) {
          set[type] = ''
        }
      }, 0)
    }
  }
}
</script>
