import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Edit from '@/components/Edit'
import Preview from '@/components/Preview'

import Setting from '@/components/setting'

import Release from '@/components/release'
import Share from '@/components/share'

import Statistic from '@/components/statistic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }, {
      path: '/edit/:name',
      name: 'edit',
      component: Edit,
      props: true
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
    }, {
      path: '/share',
      name: 'Share',
      component: Share
    }, {
      path: '/statistic',
      name: 'Statistic',
      component: Statistic
    }
  ]
})
