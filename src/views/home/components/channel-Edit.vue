<template>
  <van-action-sheet :value="value" @input="$emit('input',$event)" title="编辑频道">
    <div class="channel">
      <div class="tit">
        我的频道：
        <span class="tip">点击可进入频道</span>
        <van-button v-if="!editing" @click="editing=true" size="mini" type="info" plain>编辑</van-button>
        <van-button v-else @click="editing=false" size="mini" type="danger" plain>完成</van-button>
      </div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="(item,i) in myChannels" :key="item.id">
          <span class="f12" @click="enterChannel(i)" :class="{red:activeIndex===i}">{{item.name}}</span>
          <van-icon class="btn" name="cross" v-if="editing&&i!==0"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="channel">
      <div class="tit">可选频道：</div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="item in optionalChannels" :key="item.id">
          <span class="f12">{{item.name}}</span>
          <van-icon class="btn" name="plus"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
  </van-action-sheet>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  props: {
    //  控制屉式菜单 显示隐藏
    value: {
      type: Boolean,
      default: false
    },
    // 我的频道
    myChannels: {
      type: Array,
      // 如果默认值是复杂数据类型,必须是函数返回
      default: () => []
    },
    // 激活的频道索引
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // 控制编辑按钮和完成按钮
      editing: false,
      //   全部频道
      allChannels: []
    }
  },
  created () {
    // 获取全部频道数据
    this.getAllChannels()
  },
  computed: {
    optionalChannels () {
      // 可选频道=全部频道-我的频道
      // 在遍历全部频道的时候 去我的频道上找
      // 如果找到 不是可选频道不因该出现在新数组中
      // 如果找到 是可选频道出现在新数组中
      // 用this.allChannels.filter(item=>{布尔类型})
      return this.allChannels.filter(
        item =>
          this.myChannels.findIndex(MyItem => MyItem.id === item.id) === -1
      )
    }
  },
  methods: {
    // 点击进入频道
    enterChannel (index) {
      // 把当前的index传递给父组件
      // 父组件去修改 activeIndex的值即可
      // this.$emit('updata:activeIndex', index)
      this.$emit('update:activeIndex', index)
      // 关闭对话框
      this.$emit('input', false)
    },
    // 获取全部频道
    async getAllChannels () {
      const data = await getAllChannels()
      this.allChannels = data.channels
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup--bottom {
  &.van-popup--round {
    border-radius: 0;
  }
}
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}
.channel {
  padding: 10px;
  .tit {
    line-height: 3;
    .tip {
      font-size: 10px;
      color: #999;
    }
  }
  .van-button {
    float: right;
    margin-top: 7px;
  }
  .btn {
    position: absolute;
    bottom: 0;
    right: 0;
    background: #ddd;
    font-size: 12px;
    color: #fff;
  }
  .f12 {
    font-size: 12px;
    color: #555;
  }
  .red {
    color: red;
  }
}
</style>
