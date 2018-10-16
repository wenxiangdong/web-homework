import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/user/Login';
import Signin from '@/components/user/Signin';
import MovieList from '@/components/movie/MovieList';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/movies',
      name: 'Movies',
      component: MovieList
    }
  ]
})
