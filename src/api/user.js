// 提供用户相关的API函数
import request from '@/utils/request'

/**
 * 登录
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 */
export const login = ({ mobile, code }) => {
  return request('/app/v1_0/authorizations', 'post', { mobile, code })
}

/**
 * 获取个人中心首页信息
 */
export const getUserInfo = () => {
  return request('/app/v1_0/user', 'get')
}

/**
 * 获取个人中心编辑用户资料信息
 */
export const getUserProfile = () => {
  return request('/app/v1_0/user/profile', 'get')
}

/**
 * 保存头像
 * @param {FromData} fromData - 提交文件  key的值photo
 */
export const saveUserPhoto = (fromData) => {
  return request('/app/v1_0/user/photo', 'patch', fromData)
}

/**
 * 保存信息
 * @param {String} name - 用户名
 * @param {Integer} gender - 性别  0-男  1-女
 * @param {String} birthday - 生日
 */
export const saveUserInfo = (name, gender, birthday) => {
  return request('/app/v1_0/user/profile', 'patch', {
    name, gender, birthday
  })
}
