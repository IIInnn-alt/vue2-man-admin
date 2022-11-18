<!--
 * @Author: mn
 * @Date: 2022-07-08 15:15:08
 * @LastEditors: mn
 * @LastEditTime: 2022-10-27 16:32:46
 * @Description: login
-->
<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="login-banner">
        <img src="../../assets/images/login_banner.png" alt="" srcset="" />
      </div>
      <div class="login-box">
        <h5>Vue2 Man Admin</h5>
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
          <el-form-item prop="username" class="mt-30">
            <el-input
              v-model.trim="loginForm.username"
              placeholder="请输入账号"
              autocomplete="off"
              @keyup.enter.native="handleLogin"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" class="mt-30">
            <el-input
              type="password"
              v-model.trim="loginForm.password"
              placeholder="请输入密码"
              show-password
              autocomplete="off"
              @keyup.enter.native="handleLogin"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkCode" class="mt-30">
            <el-row type="flex" justify="space-between">
              <el-col :span="14">
                <el-input
                  type="text"
                  v-model.trim="loginForm.checkCode"
                  autocomplete="off"
                  placeholder="输入验证码"
                ></el-input>
              </el-col>
              <el-col :span="9">
                <el-button type="info" :disabled="codeCheck.codeStatus" @click="getCheckCode" class="codeBtn">
                  {{ codeCheck.codeContent }}
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item class="mt-20">
            <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item class="mt-20">
            <el-button type="primary" class="loginBtn" :loading="loadStatus" @click.native.prevent="handleLogin">
              <span v-if="!loadStatus">立即登录 →</span>
              <span v-else>登陆中...</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import { timeFix } from '@/utils/self'
export default {
  name: 'login',
  data() {
    return {
      loadStatus: false,
      codeCheck: {
        codeStatus: false,
        codeContent: '获取验证码'
      },
      loginForm: {
        username: 'admin',
        password: '123456',
        rememberMe: false,
        checkCode: ''
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入账号'
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入密码'
          }
        ],
        checkCode: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入验证码'
          }
        ]
      },
      timer: null, //定时器
      countDown: 10 //倒计时秒数
    }
  },
  created() {},
  methods: {
    // vuex 辅助函数 注册user/Login方法 命名为Login
    ...mapActions({
      Login: 'user/Login'
    }),
    // 获取验证码
    getCheckCode() {
      this.codeCheck.codeStatus = true
      this.codeCheck.codeContent = '获取中...'
      // 开始请求
      setTimeout(() => {
        this.$api.getCheckCode().then(res => {
          this.$message.success(res.message)
          this.loginForm.checkCode = res.checkCode
          // 开启定时器
          if (this.timer) {
            clearInterval(this.timer)
          }
          this.countDown = 10
          this.timer = setInterval(() => {
            this.countDown--
            if (this.countDown == 0) {
              clearInterval(this.timer)
              this.timer = null
              this.codeCheck.codeStatus = false
              this.codeCheck.codeContent = '重新获取'
              return
            }
            this.codeCheck.codeContent = `倒计时${this.countDown}s`
          }, 1000)
        })
      }, 1000)
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loadStatus = true
          // 通过 vuex  调用  actions里面的方法,login,把参数传进去., login方法中return出来 .then可在此使用
          // this.$store
          //   .dispatch("user/login", this.loginForm)
          //   .then((result) => {
          //     // 成功后
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
          // 通过辅助函数  mapActions  直接调用this.Login  (user/login 已经赋值给了Login)
          this.Login(this.loginForm)
            .then(res => {
              if (res.code == 200) {
                // 成功后、跳转
                this.$notify({
                  title: `${timeFix()},${res.data.username}`,
                  message: `欢迎登录系统`,
                  type: 'success',
                  duration: 3000
                })
                this.$router.push('/')
              } else {
                this.$notify({
                  title: '登录失败',
                  message: `${res.message}`,
                  type: 'error'
                })
                this.loadStatus = false
              }
            })
            .catch(err => {
              console.log(err, '登录')
              this.loadStatus = false
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../../assets/images/login_bg.jpg') no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-wrapper {
    width: 1020px;
    height: 465px;
    border-radius: 5px;
    box-shadow: 1.5px 3.99px 27px #0000001a;
    background-color: #fff9;
    display: flex;
    .login-banner {
      width: 509px;
      height: inherit;
      border-right: 1px solid #e5e7eb;
      padding: 40px;
      img {
        height: 380px;
      }
    }
    .login-box {
      width: 510px;
      height: inherit;
      display: flex;
      flex-direction: column;
      justify-content: center;
      h5 {
        padding: 15px;
        font-size: 24px;
        color: #6a6a6a;
        font-weight: 400;
        text-align: center;
        margin: 0;
      }
      .codeBtn {
        width: 100%;
        font-size: 16px;
        height: 45px;
      }
      .loginBtn {
        width: 100%;
        font-size: 16px;
        height: 45px;
      }
    }
  }
}
::v-deep {
  .el-input {
    // border: 1px solid red;
    border-radius: 3px;
    font-size: 16px;
    height: 45px;
    line-height: 45px;
    .el-input__inner {
      height: inherit;
      background: rgba(255, 255, 255, 1);
      color: rgb(51, 54, 57);
      &::placeholder {
        color: #babbbd;
      }
      &:focus {
        // box-shadow: 0 0 3px #1890ff;
        box-shadow: 0 0 0 2px rgba(49, 108, 114, 0.2);
      }
    }
  }
  .el-checkbox {
    color: rgb(51, 54, 57);
    height: 24px;
    line-height: 24px;
  }
  .el-form {
    .el-form-item {
      padding: 0 75px;
      margin-bottom: 0px;
    }
  }
}
.mt-20 {
  margin-top: 15px;
}
.mt-30 {
  margin-top: 25px;
}
</style>
