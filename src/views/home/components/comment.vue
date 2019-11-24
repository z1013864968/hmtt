<template>
  <div class="comment">
    <!-- 评论列表 -->
    <van-list @load="getComments()" :immediate-check="false" v-model="loading" :finished="finished" finished-text="没有更多了">
      <div class="item van-hairline--bottom van-hairline--top" v-for="item in comments" :key="item.com_id.toString()">
        <van-image
          round
          width="1rem"
          height="1rem"
          fit="fill"
          :src="item.aut_photo"
        />
        <div class="info">
          <p>
            <span class="name">{{item.aut_name}}</span>
            <span style="float:right">
              <span class="van-icon van-icon-good-job-o zan"></span>
              <span class="count">{{item.like_count}}</span>
            </span>
          </p>
          <p>{{item.content}}</p>
          <p>
            <span class="time">{{item.pubdate|relTime}}</span>&nbsp;
            <van-tag plain @click="showReply=true">{{item.reply_count}} 回复</van-tag>
          </p>
        </div>
      </div>
    </van-list>
    <!-- 底部输入框 -->
    <div class="reply-container van-hairline--top">
      <van-field v-model="value" placeholder="写评论...">
        <van-loading v-if="submiting" slot="button" type="spinner" size="16px"></van-loading>
        <span class="submit" v-else slot="button">提交</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import { getCommentsOrReplys } from '@/api/article'
export default {
  data () {
    return {
    // 提交中...
      submiting: false,
      // 输入框内容
      value: '',
      // 评论列表加载中
      loading: false,
      // 评论列表加载完成
      finished: false,
      // 偏移量
      offset: null,
      comments: []
    }
  },
  // 当前组件是在article组件上使用的,这个组件会被缓存
  // 我们的目的是:每次进入文章的时候,都拿到最新的评论数据
  // 什么时候来加载评论数据?当激活(activated)的时候加载第一次数据
  // van-list 在初始化的时候会主动触发一次@load事件
  // 这时就要使用van-list的一个属性 immediate-check=false 会不默认的触发@load事件
  activated () {
    // 重置数据
    this.comments = []
    this.loading = true
    this.finished = false
    // 加载频道列表
    this.getComments()
  },
  methods: {
    async getComments () {
      const data = await getCommentsOrReplys({
        type: 'a',
        source: this.$route.params.id,
        offset: this.offset
      })
      this.comments.push(...data.results)
      //  结束加载中效果
      this.loading = false
      //   判断是否还有数据
      if (data.last_id > data.end_id) {
        // 加载下一页数据 需要上一次加载数据最后的ID
        this.offset = data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  margin-top: 10px;
  /deep/ .item {
    display: flex;
    padding: 10px 0;
    .info {
      flex: 1;
      padding-left: 10px;
      .name{
        color:#069;
      }
      .zan{
        vertical-align:middle;
        padding-right:2px;
      }
      .count{
        vertical-align:middle;
        font-size:10px;
        color: #666;
      }
      .time{
        color: #666;
      }
      p {
        padding: 5px 0;
        margin: 0;
      }
    }
  }
  /deep/ .van-button:active::before {
    background: transparent;
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
  .submit {
    font-size: 12px;
    color: #3296fa;
  }
}
</style>
