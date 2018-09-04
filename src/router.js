import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Page from './Page.vue'
import Search from './Search.vue'
import Vote from './Vote.vue'
Vue.use(Router)

export default new Router({
  
  routes: [
    
    {
      path: '/',
      name: 'search',
      component: Search
    },
    {
      path: '/vote',
      name: 'vote',
      component: Vote
    },
    {
      path: '/:uurl',
      name: 'page',
      component: Page
    }
  ]
})
