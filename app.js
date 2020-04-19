App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  globalData: {
    userInfo: null,
  },
  onLaunch: function () {
    wx.cloud.init(),
    wx.cloud.callFunction({
      name: 'getUserInfo',
      success: function (res) {
        const db = wx.cloud.database()
        const user = db.collection('user-info')
        
        user.where({
          _openid:res.result.openid
        }).get({
          success:function(obj){
            if(obj.data==false)
            {
              user.add({
                data: {
                  learn:[],
                  teach:[]
                },
                success: function () { 
                  wx.setStorageSync('openid', res.result.event.userInfo.openId)
                  console.log('添加完成') }
              })}
            else {
              console.log(obj)
              wx.setStorageSync('openid', res.result.event.userInfo.openId)
              console.log('用户登录信息',res.result.event.userInfo.openId)}
              }
        })
      }
    })
    /************************************************ */
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
