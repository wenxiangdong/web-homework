<template>
  <Card class="out" title="欢迎加入">
    <a slot="extra" @click="handleToLogin">返回登陆</a>
    <Form>
      <FormItem>
        <Input prefix="ios-person" v-model="username" placeholder="用户名"/>
      </FormItem>
      <FormItem>
        <Input type="password" prefix="ios-lock" v-model="password" placeholder="密码"/>
      </FormItem>
      <FormItem>
        <Input type="password" prefix="ios-repeat" v-model="repeatPassword" placeholder="重复密码"/>
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          long
          :loading="loading"
          @click="handleSignin">注册</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
  import {signin} from '@/api/user/user-api'

  export default {
    data() {
      return {
        loading: false,
        username: '',
        password: '',
        repeatPassword: ''
      }
    },
    methods: {
      async handleSignin() {
        if (this.checkData()) {
          try {
            this.loading = true;
            await signin(this.username, this.password);
            this.$Message.success('注册成功');
          } catch (e) {
            this.$Message.error('注册失败：' + e.message);
          } finally {
            this.loading = false;
          }
        }
      },
      handleToLogin() {
        this.$router.push({name: 'Login'});
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
        if (this.password !== this.repeatPassword) {
          this.$Message.error('两次密码输入不一致');
          return false;
        }
        return true;
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
