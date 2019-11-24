<template>
  <div>
    <div class="header">
      <van-nav-bar title="黑马头条" left-arrow @click-left="$router.back()" />
    </div>
    <!-- 搜索框 -->
    <van-search shape="round" @search="onSearch" placeholder="请输入搜索关键词" v-model.trim="q" />
    <!-- 词条 -->
    <van-cell-group class="suggest-box" v-if="q">
      <van-cell icon="search" @click="onSearch(item.replace(`<span>${q}</span>`,q))" v-for="item in options" :key="item">
        <p v-html="item"></p>
      </van-cell>
    </van-cell-group>
    <!-- 历史纪录 -->
    <div class="history-box" v-else-if="historyList.length">
      <div class="head">
        <span>历史记录</span>
        <van-icon @click="clearHistory()" name="delete"></van-icon>
      </div>
      <van-cell-group>
        <van-cell v-for="item in historyList" :key="item">
          <a class="word_btn" @click="toSreach(item)">{{item}}</a>
          <van-icon class="close_btn" @click="delHistory(item)" slot="right-icon" name="cross" />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
// 约定本地存储的key hmtt-84-ydd-history
// 约定本地存储的value '["电脑","手机"]'
import { suggest } from '@/api/article'
const KEY = 'hmtt-84-ydd-history'
export default {
  name: 'search-index',
  data () {
    return {
      // 搜索关键字 v-model.trim自动剔除两侧的空字符
      q: '',
      // 搜索历史记录 =>历史记录存储在本地存储
      historyList: JSON.parse(window.localStorage.getItem(KEY) || '[]'),
      // 词条
      options: [],
      // 定时器
      timer: null
    }
  },
  watch: {
    q () {
    // 当值改变后就开始发请求
    // 发请求获取词条
      if (!this.q) return false
      // 优化(函数防抖)
      // 1.当你输入内容后,等待一段时间计时,如果用户没有改变内容,此时发送请求
      // 2.当你输入内容后,在等待的过程中,用户改变了内容,就重新计时(清除定时器)
      // 清除定时器
      window.clearTimeout(this.timer)
      this.timer = window.setTimeout(async () => {
        const data = await suggest(this.q)
        this.options = data.options.map(item => {
          return item.toLowerCase().replace(this.q, `<span>${this.q}</span>`)
        })
      }, 300)
    }
  },
  methods: {
    // 跳转去搜素
    toSreach (item) {
      this.$router.push({ path: '/search/result', query: { q: item } })
    },
    // 清除历史
    clearHistory () {
      this.historyList = []
      window.localStorage.setItem(KEY, JSON.stringify(this.historyList))
    },
    // 删除历史
    delHistory (key) {
      // 获取当前点击的索引
      const index = this.historyList.findIndex(item => item === key)
      // 删除
      this.historyList.splice(index, 1)
      // 存储本地
      window.localStorage.setItem(KEY, JSON.stringify(this.historyList))
    },
    onSearch (key) {
      // 触发条件：按下回车键触发，如果是手机点击虚拟键盘（输入法）中的enter按钮，搜索按钮
      // van-search在移动解析成=》imput type="search" 这种类型的输入框在移动端调用出来的
      // 虚拟键盘(enter|搜索)
      // @search()自带一个参数key 就是你要搜索的值 如果搜索框中没有内容 却点击了enter 不会跳转
      if (!key.trim()) return false
      // 追加历史纪录(排除重复的key)
      const set = new Set(this.historyList)
      // 追加
      set.add(key)
      // 把set转化为数组 =>有 1.Array.from(set) 和[...set]两个方法
      this.historyList = [...set]
      // 保存到本地
      window.localStorage.setItem(KEY, JSON.stringify(this.historyList))
      // 跳转到搜索结果 传参关键字
      this.$router.push({ path: '/search/result', query: { q: key } })
    }
  }
}
</script>

<style lang="less" scoped>
.history-box {
  padding: 0 20px;
  .head {
    line-height: 36px;
    color: #999;
    .van-icon {
      font-size: 16px;
      float: right;
      margin-top: 10px;
    }
  }
  .van-cell {
    padding: 10px 0;
  }
  .word_btn {
    color: #3296fa;
  }
  .close_btn {
    margin-top: 5px;
    color: #999;
  }
}

.suggest-box {
  /deep/ .van-cell {
    padding: 10px 20px;
    color: #999;
    p {
      span {
        color: red;
      }
    }
  }
}
</style>
