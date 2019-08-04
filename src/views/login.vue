<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
      <div class="logon-header"> <img style="vertical-align:middle" src="https://storage.googleapis.com/csq-oms-static/csq/images/logo-main.png" alt=""> <span style="vertical-align: middle;"> -- IMS </span>  </div>
      <h3 class="title">{{ $t('systemname') }} </h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" :placeholder="$t('placeholderusername')" auto-complete="off" type="text">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" :placeholder="$t('password')" type="password" auto-complete="off" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="loginForm.code" :placeholder="$t('placeholderverificationcode')" auto-complete="off" style="width: 63%" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode">
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">{{ $t('rememberme') }}</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:50%;" @click.native.prevent="handleLogin">
          <span v-if="!loading">{{ $t('login') }}</span>
          <span v-else>{{ $t('loggingin') }}</span>
        </el-button>
        <a href="pages-recoverpw.html" class="text-muted"> <svg-icon icon-class="password"/> {{ $t('forgotpassword') }} </a>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div v-if="$store.state.settings.showFooter" id="el-login-footer">
      <span v-html="$store.state.settings.footerTxt"/>
      <span> ⋅ </span>
      <a href="http://www.beian.miit.gov.cn" target="_blank">{{ $store.state.settings.caseNumber }}</a>
    </div>
  </div>
</template>

<script>
import { encrypt } from '@/utils/rsaEncrypt'
import Config from '@/config'
import { getCodeImg } from '@/api/login'
import Cookies from 'js-cookie'
import i18n from '../lang/lang'

var lang = i18n.messages.en
export default {
  name: 'Login',
  data() {
    return {
      codeUrl: '',
      cookiePass: '',
      loginForm: {
        username: 'admin',
        password: '123456',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: lang.errorusername }],
        password: [{ required: true, trigger: 'blur', message: lang.errorpassword }],
        code: [{ required: true, trigger: 'change', message: lang.errorverificationcode }]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getCode()
    this.getCookie()
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = 'data:image/gif;base64,' + res.img
        this.loginForm.uuid = res.uuid
      })
    },
    getCookie() {
      const username = Cookies.get('username')
      let password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? '' : password
      password = password === undefined ? this.loginForm.password : password
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        code: ''
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        const user = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          rememberMe: this.loginForm.rememberMe,
          code: this.loginForm.code,
          uuid: this.loginForm.uuid
        }
        if (user.password !== this.cookiePass) {
          user.password = encrypt(user.password)
        }
        if (valid) {
          this.loading = true
          if (user.rememberMe) {
            Cookies.set('username', user.username, { expires: Config.passCookieExpires })
            Cookies.set('password', user.password, { expires: Config.passCookieExpires })
            Cookies.set('rememberMe', user.rememberMe, { expires: Config.passCookieExpires })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          this.$store.dispatch('Login', user).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
            this.getCode()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: #f5f5f5;
    background-image: initial;
    background-position-x: initial;
    background-position-y: initial;
    background-size: initial;
    background-repeat-x: initial;
    background-repeat-y: initial;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    background-color: rgb(245, 245, 245);
   // background-image:url(	https://docs-1255840532.cos.ap-shanghai.myqcloud.com/3968.jpg );
   // background-size: cover;
  }
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }

  .login-form {
    border-radius: 6px;
   // background: #ffffff;
    width: 400px;
    padding: 25px 25px 5px 25px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon{
      height: 39px;width: 14px;margin-left: 2px;
    }
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 33%;
    display: inline-block;
    height: 38px;
    float: right;
    img{
      cursor: pointer;
      vertical-align:middle
    }
  }
  .logon-header {
    margin: 0px 0px 20px 80px
  }
  .el-input__prefix {
    // position: absolute;
    // height: 100%;
    left: -20px;
    top: 1px;
    text-align: center;
    color: #c0c4cc;
    -webkit-transition: all .3s;
    transition: all .3s;
  }
  span.el-input__prefix {
   // padding: .5rem .75rem;
   //  padding-top: 0.5rem;
    padding-right: 0.75rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.25;
    color: #495057;
    text-align: center;
    background-color: #e9ecef;
    border: 1px solid rgba(0,0,0,.15);
    border-top-color: rgba(0, 0, 0, 0.15);
    border-top-style: solid;
    border-top-width: 1px;
    border-right-color: rgba(0, 0, 0, 0.15);
    border-right-style: solid;
    border-right-width: 1px;
    border-bottom-color: rgba(0, 0, 0, 0.15);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-left-color: rgba(0, 0, 0, 0.15);
    border-left-style: solid;
    border-left-width: 1px;
    border-image-source: initial;
    border-image-slice: initial;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
    border-radius: .25rem;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }
</style>
