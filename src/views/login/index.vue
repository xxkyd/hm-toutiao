<template>
  <div class="login-container">
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form ref="loginForm" :model="loginForm" status-icon :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input style="width:240px;" v-model="loginForm.code" placeholder="请输入验证码"></el-input>
          <el-button style="float:right;">发送验证码</el-button>
        </el-form-item>

        <!-- <el-form-item prop="checkboxs">
          <el-checkbox-group v-model="loginForm.checkboxs" >
              <el-checkbox  @change="fn" name="checkboxs">
                <span class="text">我已阅读并同意</span>用户协议
                <span class="text">和</span>隐私条款
              </el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
       <!--  <el-form-item prop="checkboxs">
              <el-checkbox  @change="fn" v-model="loginForm.checkboxs">
                <span class="text">我已阅读并同意</span>用户协议
                <span class="text">和</span>隐私条款
              </el-checkbox>
        </el-form-item> -->
        <el-form-item>
              <el-checkbox :value="true">
                <span class="text">我已阅读并同意</span>用户协议
                <span class="text">和</span>隐私条款
              </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button style="width:100%;" ref="btn" type="primary" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    var checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式输入错误！'))
      }
    }
    /* var checkboxs = (rule, value, callback) => {
      if (value === true) {
        callback()
      } else {
        callback(new Error('手机号格式输入错误！'))
      }
    } */
    return {
      loginForm: {
        mobile: '15830988917',
        code: '246810'
        // checkboxs: []

      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
        /* checkboxs: [
          // { required: true, message: '请勾选', trigger: 'blur' },
          { type: 'array', required: true, message: '请勾选', trigger: 'change' }
          // { validator: checkboxs, trigger: 'blur' }
        ] */
      }
    }
  },
  methods: {
    /* login () {
      this.$refs.loginForm.validate(valid => {
        this.$http
          .post(
            'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
            this.loginForm
          )
          .then(res => {
            // 保存用户的信息，用来判断登录状态
            // sessionStorage BOm对象 全局对象 作用是保存数据
            // 是有有效期，当你关闭浏览器后就失效
            // sessionStroge.setItem(key,value)存储数据 value字符串
            // sessionStorage.getItem(key)获取数据
            // sessionStorage。removeItem(key)删除数据
            // sessionStorage.clear()清除所有的数据
            window.sessionStorage.setItem('hm-toutiao', JSON.stringify(res.data.data))
            this.$router.push('/')
          })
          .catch(() => {
            this.$message.error('手机号或验证码错误')
          })
      })
    }, */
    login () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // 发送promise对象，给你发请求
          // try{业务逻辑}catch(err){处理错误}
          try {
            const res = await this.$http.post('authorizations', this.loginForm)
            window.sessionStorage.setItem('hm-toutiao', JSON.stringify(res.data.data))
            this.$router.push('/')
          } catch (err) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    },
    fn () {
      // console.log(this.loginForm.checkboxs)
      /* if (this.loginForm.checkboxs = !this.loginForm.checkboxs) {
        alert('111')
      } */
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login-box {
    width: 400px;
    height: 330px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    img {
      display: block;
      width: 200px;
      margin: 10px auto;
    }
    .text {
      color: #4e4e4e;
    }
  }
}
</style>
