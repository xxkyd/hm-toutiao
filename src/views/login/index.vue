<template>
    <div class="login-container">
        <el-cord class="login-box">
            <img src="../../assets/images/logo_index.png" alt="">
        </el-cord>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
    .login-container{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background:url(../../assets/images/login_bg.jpg) no-repeat center / cover;
        .login-box{
            width: 400px;
            height: 300px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            background: #fff;
            img{
                display: block;
                width: 200px;
                margin: 10px auto;
            }
        }
    }
</style>
