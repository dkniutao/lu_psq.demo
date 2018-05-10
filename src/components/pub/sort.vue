<template>
<div>
  <div
    class="xz-sort"
    v-for="sort in content"
    :key="sort.key"
    @click="setSort(sort)">
      <span aria-checked="mixed" class="xz-sort__input">
        <span class="xz-sort__inner">12</span>
      </span>

      <span class="xz-sort__label">
        {{sort.title}}
      </span>
  </div>
</div>
</template>
<script>
export default {
  props: ['value', 'content'],
  methods: {
    setSort (sort) {
      console.log(sort);

    }
  }
}
</script>
<style scoped>
.xz-sort {color: #333333;font-size: 14px;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;padding-top: 20px;}

.xz-sort__input{cursor: pointer;outline: 0;line-height: 1;vertical-align: middle;}
.xz-sort__input {display: inline-block;position: relative;white-space: nowrap;}

.xz-sort__inner{font-size:12px;color:#126ab5;line-height:16px;text-align:center;display: inline-block;position: relative;border: 1px solid #126ab5;-webkit-box-sizing: border-box;box-sizing: border-box;width: 18px;height: 18px;background-color: #fff;z-index: 1;-webkit-transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);}

.xz-sort__label {display: inline-block;padding-left: 10px;line-height: 19px;font-size: 14px;}
</style>
