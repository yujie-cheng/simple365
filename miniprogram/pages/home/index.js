// index.js
// 获取应用实例
const app = getApp()
const db = wx.cloud.database()
const users = db.collection('users')
// 导入方法
import callFunc from '../../utils/callFunc.js';
import { encodeAesString } from '../../utils/aesCode.js';


Page({
  data: {
    userInfo: {},
    nickName: '',
    passWord: '',
    loginLoading: false, // 登陆的loading
    showPass: false, // 是否密码可视化
    showLoginButton: true, // 展示登陆按钮
    registerLoading: false,
    showNameErr: false, // 昵称输入错误提示
    showPasswordErr: false // 密码输入错误提示
  },
  onLoad() {
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({ userInfo, nickName: userInfo.nickName })
  },

  onShow() {
  },

  getUserProfile(e) {
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res, '2222')
        if (res.errMsg === "getUserProfile:ok") {
          let oldUserInfo = wx.getStorageSync('userInfo')
          const { nickName, avatarUrl } = res.userInfo
          oldUserInfo = {
            ...oldUserInfo,
            nickName,
            avatarUrl
          }
          wx.setStorageSync('userInfo', oldUserInfo)
          this.setData({ userInfo: oldUserInfo, nickName: oldUserInfo.nickName})
        }
      }
    })
    
  },

  // 点击密码右侧图标
  clickIcon() {
    const { showPass } = this.data
    this.setData({showPass: !showPass})
  },

  // 用户登陆
  userLogin() {
    const { userInfo } = this.data
    if(userInfo.nickName) {

    }
    this.setData({loginLoading: true, showPass: false})
  },

  // 用户注册
  userRegister() {
    const { nickName, passWord } = this.data
    if (nickName && passWord) {
      this.setData({registerLoading: true, showPass: false})
      // const codePass = encodeAesString(passWord, 'abc123456', '654321cba')
      // 进行注册，将用户信息插入数据库
      users.doc('18ed096861838b8e035310a50254ade1').update({
        data: {
          date: new Date(),
          nickName,
          passWord
        },
      })
      .then(res => {
        this.setData({ registerLoading: false })
        console.log(res);
      })
    } else {
      wx.showToast({
        title: '注册信息请填写完整哦～',
        icon: 'none'
      })
    }
  },

  // 改变button文字
  changeButton() {
    const { showLoginButton } = this.data
    this.setData({showLoginButton: !showLoginButton})
  },

  observers: {
    'userInfo.nickName userInfo.passWord': function(nickName, passWord) {
      console.log('变化出现');
      if(nickName && passWord) {
        this.setData({loginButtonDisabled: false})
      }
    }
  }
})
