<template>
  <div>
    <!-- 导航栏 -->
    <div class="header">
    <van-nav-bar title="黑马头条" right-text="搜索" />
    </div>
    <!-- 内容区域 -->
    <div>
    <!-- 二级路由入口 -->
      <router-view></router-view>
    </div>
    <!-- 底部 -->
    <div>
      <van-tabbar route>
        <van-tabbar-item  to='/' icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item to='/question' icon="chat-o">问答</van-tabbar-item>
        <van-tabbar-item  to='/video' icon="video-o">视频</van-tabbar-item>
        <van-tabbar-item to='/user' icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout-index',
  data () {
    return {

    }
  }
}
</script>

<style>
  .header{

  }
</style>
