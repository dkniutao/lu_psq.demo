<template>
<el-row>
  <el-col :span="24">
    <el-form ref="form" label-width="100px">
      <el-form-item
        v-for="option in item.content"
        :label="option.title">
        <el-input
          type="textarea"
          :rows="item.setting.height"
          :minlength="item.setting.min"
          :maxlength="item.setting.max"
          :placeholder="placeholder">
        </el-input>
      </el-form-item>
    </el-form>
  </el-col>
</el-row>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    placeholder () {
      let set = this.item.setting

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
  }
}
</script>
