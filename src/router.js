import Vue from 'vue'
import Router from 'vue-router'
import RepoSearch from './views/RepoSearch.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RepoSearch',
      component: RepoSearch
    }
  ]
})
