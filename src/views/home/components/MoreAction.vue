<template>
  <!-- 弹出框  默认隐藏 -->
  <!-- $event是(如果是原生事件是事件对象,如果是自定义事件是触发事件传递数据) -->
  <!-- 本来v-model绑定组件内数据show 最终show数据给了父组件 -->
  <!-- 父组件传入进入show数据v-model="showMoreAction"  名字叫value -->
  <!-- 给组件绑定了@input 事件MoreAction 接收子组件改变 -->
  <!-- 子组件值改变 关闭对话框 van-popup的值改变 @input='把当前改变的值传递给父组件' -->
  <!-- $emit('input',$event) 当van-popup的值改变,吧值传递给MoreAction -->
  <van-popup :value="value" @input="$emit('input',$event)" @open="isReport=false">
    <van-cell-group v-if="!isReport">
      <van-cell @click="disLike">不感兴趣</van-cell>
      <van-cell is-link @click="isReport=true">反馈垃圾内容</van-cell>
      <van-cell>拉黑作者</van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport=false">返回</van-cell>
      <van-cell @click="report(item.value)" v-for="item in reports" :key="item.value">{{item.label}}</van-cell>
    </van-cell-group>
  </van-popup>
</template>

<script>
import { disLike, report } from '@/api/article'
import { reports } from '@/api/constants'
export default {
  // props: ['value'],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    // 当前文章id
    articleId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      // 默认状态 未点击举报
      isReport: false,
      reports
    }
  },
  methods: {
    // 举报
    async report (type) {
      try {
        await report(this.articleId, type)
        // 提示
        this.$toast({ type: 'success', message: '操作成功' })
        // 关闭对话框
        this.$emit('input', false)
        // 通知父组件删除对应的文章
        this.$emit('on-report')
      } catch (e) {
        console.dir(e)
        if (e.response && e.response.status === 409) {
          return this.$toast({ type: 'success', message: '已经举报' })
        }
        this.$toast({ type: 'success', message: '操作失败' })
      }
    },
    // 不感兴趣
    async disLike () {
      try {
        await disLike(this.articleId)
        // 成功
        // 1.隐藏对话框
        this.$emit('input', false)
        // 2.删除(当前频道下的文章列表)对应的文章
        // 2.1通知父组件删除对应的articleId的文章
        this.$emit('on-dislike')
        // 提示
        this.$toast({ type: 'success', message: '操作成功' })
      } catch (e) {
        this.$toast({ type: 'success', message: '操作失败' })
      }
    }
  }
}
</script>

<style scoped lang='less'>
.van-popup {
  width: 80%;
  border-radius: 4px;
}
</style>
