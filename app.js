App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    wx.cloud.init(),
    wx.cloud.callFunction({
      name: 'getUserInfo',
      success: function (res) {
        
        const db = wx.cloud.database()
        const user = db.collection('users')
        user.where({
          _openid:res.result.event.userInfo.openID
        }).get({
          success:function(obj){
         
            if(obj.data==false)
            {
              user.add({
                data: {
                  num: 1
                },
                success: function () { console.log('添加完成') }
              })}
            else console.log('用户登录信息',res.result)}
        })
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
