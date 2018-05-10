import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Edit from '@/components/Edit'

import Setting from '@/components/setting'
import Release from '@/components/release'
import Share from '@/components/share'

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
      path: '/setting',
      name: 'setting',
      component: Setting
    }, {
      path: '/release',
      name: 'Release',
      component: Release
    }, {
      path: '/share',
      name: 'Share',
      component: Share
    }
  ]
})
