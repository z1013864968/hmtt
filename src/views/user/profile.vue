<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" @click-right="save()" right-text="保存"></van-nav-bar>
    <!-- 单元格 -->
    <van-cell-group>
      <!-- 头像 -->
      <van-cell @click="showPhoto=true" is-link title="头像" center >
        <van-image round width="1.5rem" height="1.5rem" :src="photo" />
      </van-cell>
      <!--用户名 -->
      <van-cell @click="showName=true" is-link title="名称" :value="user.name"></van-cell>
      <!-- 性别 -->
      <van-cell @click="showGender=true" is-link title="性别" :value="user.gender===0?'男':'女'"></van-cell>
      <!-- 生日 -->
      <van-cell is-link @click="openDate()" title="生日" :value="user.birthday"></van-cell>
    </van-cell-group>
    <!-- 头像弹窗 -->
    <van-popup v-model="showPhoto" position="bottom">
     <van-cell value="本地相册选择" is-link @click="$refs.fileInput.click()" />
      <van-cell value="拍照" is-link />
    </van-popup>
    <!-- 用户名弹框 -->
    <van-popup v-model="showName" position="bottom">
      <van-field v-model="user.name" required placeholder="请输入用户名" />
    </van-popup>
    <!-- 性别弹窗 -->
    <van-popup v-model="showGender" position="bottom">
      <van-cell value="男" @click="changeGender(0)" is-link />
      <van-cell value="女" @click="changeGender(1)" is-link />
    </van-popup>
    <!-- 生日弹框 -->
    <van-popup v-model="showBirthday" position="bottom">
      <van-datetime-picker
      v-model="nowDate"
      type="date"
      :min-date="minDate"
      @cancel="showBirthday=false"
      @confirm="confirmDate"
      />
    </van-popup>
    <!-- 预览图片效果 -->
    <input type="file" @change="preview" ref="fileInput" style="display:none">
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getUserProfile, saveUserPhoto, saveUserInfo } from '@/api/user'
export default {
  name: 'user-profile',
  data () {
    return {
      // 弹窗控制
      // 拍照
      showPhoto: false,
      // 名称
      showName: false,
      // 性别
      showGender: false,
      // 日期的显示和隐藏
      showBirthday: false,
      // 最新日期
      nowDate: new Date(),
      // 最小日期
      minDate: new Date('1949-10-01'),
      photo: 'https://img.yzcdn.cn/vant/cat.jpeg',
      // 默认信息
      user: {
        name: '默认信息',
        gender: 0,
        birthday: '2019-10-17'
      }
    }
  },
  created () {
    // 获取用户资料
    this.getUserProfile()
  },
  methods: {
    // 预览图片
    preview () {
      // 文件对象
      const file = this.$refs['fileInput'].files[0]
      // 读取本地文件
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        // fileReader.result 读取数据结构  base64格式数据
        // 2. 设置给头像组件的src属性即可
        this.photo = fileReader.result
        this.showPhoto = false
      }
    },
    async save () {
      try {
        // 1. 上传头像
        const formData = new FormData()
        formData.append('photo', this.$refs.fileInput.files[0])
        await saveUserPhoto(formData)
        // 2. 保存信息
        const { name, gender, birthday } = this.user
        await saveUserInfo(name, gender, birthday)
        this.$toast.success('保存成功')
      } catch (e) {
        this.$toast.fail('保存失败')
      }
    },
    // 获取用户资料
    async getUserProfile () {
      const data = await getUserProfile()
      this.photo = data.photo
      this.user = data
    },
    // 打开日期弹框 并且让原先默认的时间赋值给一打开弹窗显示的时间
    openDate () {
      if (this.user.birthday) {
        // 让原先默认的时间赋值给一打开弹窗显示的时间
        this.nowDate = new Date(this.user.birthday)
      }
      // 打开时间弹窗
      this.showBirthday = true
    },
    // 点击时间确定按钮 默人有一个value值是你要选择的时间
    confirmDate (value) {
      // 确认时间后 把Date转换成String类型
      this.user.birthday = dayjs(value).format('YYYY-MM-DD')
      // 关闭对话框
      this.showBirthday = false
    },
    // 性别
    changeGender (gender) {
      this.user.gender = gender
      this.showGender = false
    }
  }
}
</script>

<style lang="less" scoped></style>
