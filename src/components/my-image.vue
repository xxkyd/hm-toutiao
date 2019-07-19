<template>
  <div class="image-container">
    <!-- 图片按钮 -->
    <div class="img-btn" @click="openDialog">
      <img :src="value||defaultImage" alt />
    </div>
    <!--对话框  -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <span>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="素材库" name="image">
            <!-- 单选框 -->
            <div style="margin-bottom:10px;">
              <el-radio-group v-model="reqParams.collect" @change="search()" size="small">
                <el-radio-button :label="false">全部</el-radio-button>
                <el-radio-button :label="true">收藏</el-radio-button>
              </el-radio-group>
            </div>
            <!-- 图片列表 -->
            <div
              class="img-item"
              :class="{selected:selectedImageUrl === item.url}"
              @click="selectedImage(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="reqParams.per_page"
              :current-page="reqParams.page"
              @current-change="pager"
            ></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="上传图片" name="upload">
            <el-upload
              class="avatar-uploader"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              :show-file-list="false"
              :headers="headers"
              name="image"
              :on-success="handleSuccess"
            >
              <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tab-pane>
        </el-tabs>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      // 控制对话框显示隐藏
      dialogVisible: false,
      //   控制选中的选项卡
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      total: 0,
      selectedImageUrl: null,
      uploadImageUrl: null,
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('hm-toutiao')).token
      },
      defaultImage
    }
  },
  methods: {
    //   确认
    confirmImage () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) return this.$message.warning('请选择素材')
        // this.value = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
        if (!this.uploadImageUrl) return this.$message.warning('请上传图片')
        // this.value = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    },
    openDialog () {
      this.dialogVisible = true
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
    },
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
    }
  }
}
</script>

<style scoped lang='less'>
.avatar-uploader {
  text-align: center;
}
.image-container {
  display: inline-block;
  margin-right: 20px;
}
.img-item {
  width: 150px;
  height: 120px;
  border: 1px solid #ddd;
  display: inline-block;
  margin-right: 10px;
  position: relative;
  &.selected {
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center/ 50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
}
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
