<template>
    <Card class="out" title="电影网">
      <!--<div slot="extra">-->
        <!--没有账号？<a @click="handleToSignin">注册</a>-->
      <!--</div>-->
      <a slot="extra" @click="handleToSignin">注册</a>
      <Form>
        <FormItem>
          <Input prefix="ios-person" v-model="username"/>
        </FormItem>
        <FormItem>
          <Input type="password" prefix="ios-lock" v-model="password"/>
        </FormItem>
        <FormItem>
          <Checkbox v-model="remember" style="float: right;">记住我</Checkbox>
        </FormItem>
        <FormItem>
          <Button
            type="primary" long :loading="loading" @click="handleLogin">登录</Button>
        </FormItem>
      </Form>
    </Card>
</template>

<script>
  import {login} from '@/api/user/user-api'
  import {Logger} from '@/utils/logger'

  export default {
    name: 'Login',
    data() {
      return {
        loading: false,
        username: '',
        password: '',
        remember: true
      }
    },
    mounted() {
      this.initData();
    },
    methods: {
      async handleLogin() {
        if (this.checkData()) {
          this.rememberOrNot();
          try {
            this.loading = true;
            await login(this.username, this.password);
            this.$Message.success('登录成功');
            this.$router.push({name: 'Movies'});
          } catch (e) {
            this.$Message.error('登录失败：' + e.message);
          } finally {
            this.loading = false;
          }
        }
      },
      handleToSignin() {
        this.$router.push({name: 'Signin'});
      },
      checkData() {
        if (!this.username) {
          this.$Message.error('别忘记填写用户名哦');
          return false;
        }
        if (!this.password) {
          this.$Message.error('别忘记填写密码哦');
          return false;
        }
        return true;
      },
      rememberOrNot() {
        let USERNAME = 'username';
        let PASSWORD = 'password';
        if (this.remember) {
          window.localStorage.setItem(USERNAME, this.username);
          window.localStorage.setItem(PASSWORD, this.password);
        } else {
          window.localStorage.removeItem(USERNAME);
          window.localStorage.removeItem(PASSWORD);
        }
      },
      initData() {
        let USERNAME = 'username';
        let PASSWORD = 'password';
        let username =  window.localStorage.getItem(USERNAME);
        let password =  window.localStorage.getItem(PASSWORD);
        Logger.info('Login', username, password);
        if (username !== 'null' && password !== 'null') {
          this.username = username;
          this.password = password;
        }
      }
    }
  }
</script>

<style scoped>
.out {
  width: 400px;
  margin: auto;
}
</style>
