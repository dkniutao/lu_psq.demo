import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Edit from '@/components/Edit'
import Set from '@/components/Set'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }, {
      path: '/edit',
      name: 'edit',
      component: Edit
    }, {
      path: '/set',
      name: 'set',
      component: Set
    }
  ]
})
