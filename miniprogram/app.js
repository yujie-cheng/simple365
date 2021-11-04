// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.cloud.init({
      env: 'test-9gcf6ovj7e299251',
    })    
    // 登录
    wx.login({
      success: res => {
        console.log(res, '用户登录');
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    utils: 'miniprogram/utils',
    pages: 'miniprogram/pages'
  }
})
