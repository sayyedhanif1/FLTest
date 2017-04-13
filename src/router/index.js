import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home'
import CreateTpl from '@/components/CreateTpl'
import Show from '@/components/Show'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: Home
    },
    {
      path: '/new',
      name: 'new',
      component: CreateTpl
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: CreateTpl,
      props: true
    },
    {
      path: '/show/:id',
      name: 'show',
      component: Show,
      props: true
    }
  ]
})
