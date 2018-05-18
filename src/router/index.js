import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Edit from '@/components/Edit'
import Preview from '@/components/Preview'

import Setting from '@/components/setting'

import Release from '@/components/release'
import Share from '@/components/share'

import Statistic from '@/components/statistic'
import Template from '@/components/template'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }, {
      path: '/edit/:id',
      name: 'edit',
      component: Edit,
      props: true
    }, {
      path: '/preview/:id',
      name: 'preview',
      props: true,
      component: Preview
    }, {
      path: '/setting/:id',
      name: 'setting',
      props: true,
      component: Setting
    }, {
      path: '/release/:id',
      name: 'Release',
      props: true,
      component: Release
    }, {
      path: '/share/:id',
      name: 'Share',
      props: true,
      component: Share
    }, {
      path: '/statistic',
      name: 'Statistic',
      component: Statistic
    }, {
      path: '/template',
      name: 'template',
      component: Template
    }
  ]
})
