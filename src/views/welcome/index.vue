<template>
    <div class="container">
        <img src="../../assets/images/welcome.jpg" alt="">
    </div>
</template>

<script>
export default {
  mounted () {
    this.$http
      .get('http://ttapi.research.itcast.cn/mp/v1_0/articles')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log('服务器错误' + err)
      })
  }
}
</script>

<style>
    .container{
        text-align: center;
    }
</style>
