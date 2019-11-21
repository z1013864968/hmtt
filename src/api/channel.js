// 导出 频道相关的API函数
import request from '@/utils/request'
import store from '@/store'

// 存储都使用这个key  对应值是  json字符串是数组类型
const KEY = 'hmtt-84-channel'
/**
 * 获取我的频道（未登录，获取的系统默认给的频道）
 */
export const getMyChannels = () => {
  // 该函数的返回值必须是promise 使用的时候用了await
  // 1.登陆状态 直接调用接口即可
  // 2.未登录状态
  // 2.1 如果本地未存储频道数据 （获取默认频道数据，存储在本地，返回数据）
  // 2.2 如果本地存储了频道数据 （获取本地频道数据即可）
  return new Promise(async (resolve, reject) => {
    const { user } = store.state
    if (user.token) {
      const data = await request('/app/v1_0/user/channels', 'get')
      resolve(data)
    } else {
      // 获取本地存储频道数据
      const str = window.localStorage.getItem(KEY) || '[]'
      // 转换成数组
      const localStorage = JSON.parse(str)
      // 如果本地未存储
      if (!localStorage.length) {
        const data = await request('/app/v1_0/user/channels', 'get')
        window.localStorage.setItem(KEY, JSON.stringify(data.channels))
        resolve(data)
      } else {
        resolve({ channels: localStorage })
      }
    }
  })
}

// 获取全部频道
export const getAllChannels = () => {
  return request('/app/v1_0/channels', 'get')
}
