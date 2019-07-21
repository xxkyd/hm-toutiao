<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="comments" style="width: 100%">
        <el-table-column prop="title" label="标题" width="400"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="toggleStatus(scope.row)"
               v-if="!scope.row.comment_status"
              type="success"
              size="mini"
            >打开评论</el-button>
            <el-button type="danger" @click="toggleStatus(scope.row)" v-else  size="mini">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 评论信息
      comments: [],
      //   参数
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      //   总条数
      total: 0
    }
  },
  mounted () {
    this.getCommentList()
  },
  methods: {
    async getCommentList () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
      //   总条数
      this.total = data.total_count
    },
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getCommentList()
    },
    // 改变文章评论状态
    toggleStatus (row) {
      const text1 = '您确定要打开该文章的评论功能吗？'
      const text2 =
        '关闭评论功能后用户将无法对该文章进行评论,您确定要关闭该文章的评论功能吗？'
      this.$confirm(row.comment_status ? text1 : text2, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: { data }
          } = await this.$http.put('comments/status?article_id=' + row.id, { allow_comment: !row.comment_status })
          this.$message.success('修改文章评论状态成功')
          row.comment_status = data.allow_comment
        })
        .catch(() => {

        })
    }
  }
}
</script>

<style scoped lang='less'></style>
