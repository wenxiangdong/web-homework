<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {HttpMethods, request} from '@/api/base-request'

export default {
  name: 'App',
  async mounted() {
  },
  methods: {
    async try() {
      throw new Error('error');
    },
    async try2() {
      try {
        await this.try();
      } catch (e) {
        console.log('catch in try2', e);
        throw e;
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
  padding-top: 50px;
}
.card {
  border: 1px solid #dcdee2;
  border-radius: 10px;
  text-align: left;
  background-color: white;
  box-sizing: content-box;
}

.card:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px;
}
.title-text {
  color: #17233d;
}

.primary-text {
  color: #515a6e;
}

.accent-text {
  color: #19be6b;
}
</style>
