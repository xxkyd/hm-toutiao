<template>
  <div class="container">
    <p>头部</p>
    <p><slot name="content" :test="innerData">内容</slot></p>
    <p><slot name="footer" :test="innerData1">底部</slot></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      innerData: '组件内部数据',
      innerData1: '内部数据'
    }
  }
}
</script>

<style>

</style>
