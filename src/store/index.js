import Vue from 'vue'
import Vuex from 'vuex'

import * as auth from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 获取用户信息（token，refersh_token）
    user: auth.getUser()
  },
  mutations: {
    // 存储信息（修改信息）
    setUser (state, user) {
      // 修改了vuex中的state 如果刷新了页面 会重新获取本地的数据，会丢失之前存储的state
      // 所以 同时修改本地存储的信息
      state.user = user
      // 更新本地用户信息
      auth.setUser(user)
    },
    // 退出删除用户信息
    delUser (state) {
      // 更新state的状态
      state.user = {}
      // 清除用户信息（更新本地存储）
      auth.delUser()
    }
  },
  actions: {

  },
  modules: {
  }
})
