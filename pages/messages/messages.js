// pages/messages/messages.js
import sel from '../../service/sql/sel.js'
Page({

  data: {
    course:[],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    sel({
      db:'course'
    }).then(res => {
      this.setData({
        course:res.data
      })
      
    }).catch(error => {
      console.log(error)
    })
  },
  handleTap(event) {
      
      wx.navigateTo({
        url: '/pages/detail/detail?course_id='+JSON.stringify(event.currentTarget.dataset.course_id)
      })
  },
  handleLongtap(event) {
    console.log(event)
    wx.showActionSheet({
      itemList: ['加入课程'],
      success: function (res) {
        wx.cloud.init()
        const db = wx.cloud.database()
        const course = db.collection('course')
        const course_id = event.currentTarget.dataset.course_id
        const _ = db.command
        const openid = wx.getStorageSync('openid')
        course.where({_id:course_id}).get({
          success:function(res){
            const add_id=res.data[0]._id
            const add_teacher=res.data[0].teacher
            const add_name=res.data[0].course_name
            const add = db.collection('user-info')
            add.where({
            _openid:openid,
            }).get({
              success:function(r){
                var flag=0
                for(var i=0;i<r.data[0].learn.length;i++)
                {if(r.data[0].learn[i].course_id==course_id) flag=1}
                if(flag==0)
                {
                  add.where({
                    _openid: openid
                  }).update({
                    data: {
                      learn: _.push({ course_name: add_name, course_id: add_id, teacher: add_teacher })
                    },
                    success: function () {
                      wx.showToast({
                        title: '加入成功',
                      })
                    }
                  })
                } else {wx.showModal({
                  content: '请勿重复添加',
                  showCancel:false
                })}
                },
              false:function(err){console.log('false:',err)}})
            
            }
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})