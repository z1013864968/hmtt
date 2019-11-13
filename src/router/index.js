import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout'
import Home from '@/views/home'
import Question from '@/views/question'
import Search from '@/views/search'
import Video from '@/views/video'
import User from '@/views/user'

Vue.use(VueRouter)

const routes = [
  { path: '/',
    name: 'layout-index',
    component: Layout,
    children: [
      // 主页
      { path: '/', name: 'home-index', component: Home },
      // 问答
      { path: '/question', name: 'question-index', component: Question },
      // 视频
      { path: '/video', name: 'video-index', component: Video },
      // 个人设置
      { path: '/user', name: 'user-index', component: User }

    ]
  },
  // 搜索
  { path: '/search', name: 'search-index', component: Search }
]

const router = new VueRouter({
  routes
})

export default router
