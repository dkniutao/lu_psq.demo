import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Edit from '@/components/Edit'
import Preview from '@/components/Preview'

import Setting from '@/components/setting'
import Release from '@/components/release'

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
      path: '/preview',
      name: 'preview',
      component: Preview
    }, {
      path: '/setting',
      name: 'setting',
      component: Setting
    }, {
      path: '/release',
      name: 'Release',
      component: Release
    }
  ]
})
