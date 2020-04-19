import add from '../../service/sql/add.js'
import sel from '../../service/sql/sel.js'
import del from '../../service/sql/del.js'
 const types=['learn','teach'];
 var index=0;
 Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses:{
      learn: [],
      teach: []
    },
    currentType:'learn'
  },
   handleTabclick(event){ 
     index=event.detail.index;
     const type=types[index]
     this.setData({
       currentType:type
     })
   },
   handleTap(event){
     console.log('处理单击事件',event)
     wx.navigateTo({
       url: '/pages/detail/detail?course_id='+JSON.stringify(event.currentTarget.dataset.course_id)
     })
      
   },
   handleLongtap(event){
     var x=this
     if(index==0){
     wx.showActionSheet({
       itemList: ['退出课程'],
       success:function(res)
       {
         wx.cloud.init()
         const db = wx.cloud.database()
         const course = db.collection('user-info')
         const openid = wx.getStorageSync('openid')
         course.where({ _openid: openid }).update({
           data:{
             learn: db.command.pull({course_id: event.currentTarget.dataset.course_id})
           }
         }).then(r=>{
           wx.showToast({
             title: '退出成功',
           })
           course.where({ _openid: openid }).get().then(t=>{
             console.log("t:",t)
             x.setData({
               courses: t.data[0]
             })
           })
         })
      }
     })
     }else {
       wx.showActionSheet({
         itemList: ['删除课程'],
         success: function (res) { 

           wx.cloud.init()
           const db = wx.cloud.database()
           const course = db.collection('user-info')
           const openid = wx.getStorageSync('openid')
           course.where({ _openid: openid }).update({
             data: {
               teach: db.command.pull({ course_id: event.currentTarget.dataset.course_id })
             }
           }).then(r => {
             wx.showToast({
               title: '删除成功',
             })
             course.where({ _openid: openid }).get().then(t => {
               console.log("t:", t)
               x.setData({
                 courses: t.data[0]
               })
             })
           })
           }
       })
     }
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // 在这里进行请求数据
    


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
    wx.cloud.init()
    const db = wx.cloud.database()
    const openid = wx.getStorageSync('openid')
    const _data = db.collection('user-info')
    _data.where
      ({
        _openid: openid
      }).get().then(res => {
        this.setData({ courses: res.data[0] })
      })
   /* sel({
      db: 'user-info'
    }).then(res => {
      this.setData({
        courses: res.data[0],
      })
      console.log('sel的结果：', res)

    }).catch(error => {
      console.log(error)
    })*/
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