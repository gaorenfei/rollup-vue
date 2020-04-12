<template>
  <div class="v-list">
    <slot />
    <div class="v-list-date">
      <div class="v-list-date-label">当前时间：</div>
      <div class="v-list-date-text">{{ date }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "vueTest",
  data() {
    return {
      date: new Date()
    };
  }
};
</script>
<style lang="less" scoped>
.v-list-date-label {
  color: blue;
}
</style>
