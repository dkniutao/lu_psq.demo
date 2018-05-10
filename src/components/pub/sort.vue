<template>
<div>
  <div
    class="xz-sort clearfix"
    v-for="sort in content"
    :key="sort.key">
      <label @click="setSort(sort)">
        <span class="fl xz-sort__inner" v-html="getOrder(sort)"></span>

        <span class="fl xz-sort__label">
          {{sort.title}}
        </span>
      </label>
  </div>
</div>
</template>
<script>
export default {
  props: ['value', 'content'],
  methods: {
    setSort (sort) {
      let order = _.findIndex(this.value, (v) => {
        return +v === +sort.key
      })

      if (order !== -1) {
        this.value.splice(order, 1)
        return
      }

      this.value.push(sort.key)
    },
    getOrder (sort) {
      let order = _.findIndex(this.value, (v) => {
        return +v === +sort.key
      })

      return order !== -1 ? (order + 1) : ''
    }
  }
}
</script>
<style scoped>
.xz-sort {color: #333333;font-size: 14px;padding-top: 20px;}
.xz-sort label{cursor: pointer;}

.xz-sort__inner{font-size:12px;color:#126ab5;line-height:16px;text-align:center;display: inline-block;position: relative;border: 1px solid #126ab5;-webkit-box-sizing: border-box;box-sizing: border-box;width: 18px;height: 18px;background-color: #fff;z-index: 1;}

.xz-sort__label {padding-left: 10px;line-height: 18px;font-size: 14px;}
</style>
