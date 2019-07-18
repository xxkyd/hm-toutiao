<template>
  <el-select :value="value" @change="fn" placeholder="所有频道">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      //   频道的选项数组
      channelOptions: [{ name: 'java', id: 1 }]
    }
  },
  created () {
    // 获取频道数据
    this.getChannelOptions()
  },
  methods: {
    fn (value) {
      // value你选中的值
      this.$emit('input', value)
    },
    // 获取频道数据
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style scoped lang='less'></style>
