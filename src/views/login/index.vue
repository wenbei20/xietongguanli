<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <el-row>
        <el-col :span="15" class="loginPic_outer"><img :src="loginPic" class="login-pic"></el-col>
        <el-col :span="7" :offset="2">
          <el-card>
            <div class="title-container">
              <img :src="ydLoginLogo" class="ydLoginLogo">
              <!-- <img :src="ydLogo" class="ydLogo"> -->
              <!-- <img :src="logo" class="logo"> -->
              <!-- <h3 class="title">Login Form</h3> -->
            </div>
            <el-tabs v-model="tabsActive" @tab-click="tabsChange">
              <!--密码登录-->
              <el-tab-pane label="密码登录" name="password">
                <el-form-item prop="username">
                  <span class="svg-container">
                    <svg-icon icon-class="user" />
                  </span>
                  <el-input
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                  />
                </el-form-item>

                <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                  <el-form-item prop="password">
                    <span class="svg-container">
                      <svg-icon icon-class="password" />
                    </span>
                    <el-input
                      :key="passwordType"
                      ref="password"
                      v-model="loginForm.password"
                      :type="passwordType"
                      placeholder="Password"
                      name="password"
                      tabindex="2"
                      autocomplete="on"
                      @keyup.native="checkCapslock"
                      @blur="capsTooltip = false"
                      @keyup.enter.native="handleLogin"
                    />
                    <span class="show-pwd" @click="showPwd">
                      <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                  </el-form-item>
                </el-tooltip>

                <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 10px;" @click.native.prevent="handleLogin">登 录</el-button>

                <div style="position: relative; margin-bottom: 20px; text-align: right;">
                  <div class="tips">
                    <a href="###">找回密码？</a>
                  </div>
                </div>
                <el-alert title="技术支持：北京盈动创想信息科技有限公司" type="info" :closable="false" />
              </el-tab-pane>
              <!--/密码登录-->

              <!--短信验证码-->
              <el-tab-pane label="短信验证码" name="message">
                <el-form-item prop="password">
                  <el-input v-model="input3" placeholder="手机号" class="input-with-select">
                    <el-select slot="prepend" v-model="select" placeholder="中国 +86" style="width: 120px;">
                      <el-option label="中国 +86" value="1" />
                      <el-option label="美国 +10" value="2" />
                      <el-option label="日本 +20" value="3" />
                    </el-select>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="input3" placeholder="输入验证码" class="input-with-select">
                    <el-button slot="append">获取验证码</el-button>
                  </el-input>
                </el-form-item>
                <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 10px;" @click.native.prevent="handleLogin">登 录</el-button>
              </el-tab-pane>
              <!--/短信验证码-->

              <!--行信二维码-->
              <el-tab-pane label="行信二维码" name="qrcode">
                <div style="text-align: center; font-size: 12px;">
                  <img :src="qrcode">
                  <p>请使用“行信”APP扫码登录</p>
                </div>
              </el-tab-pane>
              <!--/行信二维码-->
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </el-form>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import SocialSign from './components/SocialSignin'

import loginPic from '@/assets/login/login-pic.png'
import logo from '@/assets/login/logo.jpg'
import ydLogo from '@/assets/login/ydLogo.png'
import ydLoginLogo from '@/assets/login/yd-login-logo.png'
import qrcode from '@/assets/login/qrcode.png'

export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginPic,
      logo,
      qrcode,
      ydLogo,
      ydLoginLogo,
      tabsActive: 'password',
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      input3: '',
      select: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    tabsChange(tab, event) {
      console.log(tab, event)
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              // 登录成功后，暂时先进入引导页面
              this.$router.push({ path: '/entry' })
              // this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#eee;
$light_gray:#333;
$cursor: #999;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .login-pic{ width: 100%;}
  .el-input {
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #f4f4f5;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url("~@/assets/login/login-bg.jpg") no-repeat;
  background-size: 100% 100%;
  // background-color: $bg;
  overflow: hidden;
  .el-card{
    ::v-deep{
      .el-card__body{ padding: 20px 40px;}
    }
  }

  .el-tabs{
    ::v-deep{
      .el-tabs__nav-wrap{
        &:after{ background-color: transparent;}
      }
      .el-tabs__content{ padding: 10px 0; height: 310px;}
      .el-tabs__nav{ clear: both; margin: 0 auto;}
      .el-tabs__item{ font-size: 16px; font-weight: 400; color: #999;
        &.is-active{ color: #1890ff; font-weight: 800;}
      }
    }
  }

  .login-form { position: relative; width: 1360px; max-width: 100%; padding: 160px 0; margin: 0 auto; overflow: hidden;
    ::v-deep{
      .input-with-select{ width: 100%;
        .el-input-group__prepend{ background-color: transparent; border-color: transparent;}
        .el-select{
          .el-input{ width: 100%;}
        }
        .el-input-group__append{ border: 1px solid #f4f4f5; background: #fff; color: #333;}
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #333;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container { position: relative; text-align: center; padding: 10px 0; margin-bottom: 10px;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .loginPic_outer {
    overflow: hidden;

  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
.logo {
  height: 70px;
  vertical-align: middle;
}
.ydLogo {
  height: 40px;
  vertical-align: middle;
}
.ydLoginLogo {
  height: 60px;
}
</style>
