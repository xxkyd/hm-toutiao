<template>
  <div class="container" v-loading="loading">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div style="margin-bottom:20px;">
        <!-- 按钮式的单选框 -->
        <el-radio-group
          size="small"
          @change="search()"
          style="float:left;"
          v-model="reqParams.collect"
        >
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 绿色按钮 -->
        <el-button @click="dialogVisible=true" size="small" style="float:right;" type="success">添加素材</el-button>
        <div style="clear:both;"></div>
      </div>
      <!-- 图片列表 -->
      <ul class="img-list">
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="fot" v-if="!reqParams.collect">
            <span class="el-icon-star-off" @click="toggleFav(item)" :class="{red:item.is_collected}"></span>
            <span class="el-icon-delete" @click="delImage(item.id)"></span>
          </div>
        </li>
      </ul>
      <el-pagination
        v-if="total>reqParams.per_page"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
        background
        layout="prev, pager, next"
      ></el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        :headers="headers"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 参数对象
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      //   素材列表
      images: [],
      //   加载数据
      loading: false,
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm-toutiao')).token
      }
    }
  },
  created () {
    //   获取素材列表数据
    this.getImages()
  },
  methods: {
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      this.loading = true
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      //   获取数据成功
      this.images = data.results
      this.loading = false
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    handleSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.dialogVisible = false
        this.getImages()
        this.imageUrl = null
      }, 2000)
    },
    async toggleFav (item) {
      const { data: { data } } = await this.$http.put('user/images/' + item.id, {
        collect: !item.is_collected
      })
      // 成功
      this.$message.success('成功')
      item.is_collected = data.collect
    },
    // 删除图片
    delImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete('user/images/' + id)
        this.$message.success('删除成功')
        this.getImages()
      }).catch(() => {

      })
    }
  }
}
</script>

<style scoped lang="less">
.img-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  li {
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    float: left;
    margin-right: 30px;
    margin-bottom: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .fot {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
