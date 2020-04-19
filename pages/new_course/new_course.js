// pages/new_course/new_course.js
import add from '../../service/sql/add.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course:"",
    teacher:"",
    course_id:""
  },
  handleInCourse(e){
    this.data.course=e.detail.value
  },
  handleInTeacher(e){
    this.data.teacher = e.detail.value
  },
  handleBtClick(event){
    if(!this.data.course)
    {
      wx.showModal({
        showCancel:false,
        confirmText:'好的',
        confirmColor:"#000000",
        content: '请输入课程名称',
      })
    }
    else if(!this.data.teacher)
    {
      wx.showModal({
        showCancel: false,
        confirmText: '好的',
        confirmColor: "#000000",
        content: '请输入教师名称',
      })
    }
    else{
      add({
        db:'wait_course',
        course_name:this.data.course,
        teacher:this.data.teacher
      }).then(res => {
        wx.cloud.init()
        const db = wx.cloud.database()
        const course = db.collection('user-info')
        const openid = wx.getStorageSync('openid')
        const _=db.command
        course.where({_openid:openid}).update({
          data: {
            teach: _.push([{
              course_id: res._id,
              course_name: this.data.course,
              teacher: this.data.teacher,
            }])
          }, success: function (res) { 
            wx.showToast({
              title: '添加成功',
              success: function () {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1000)
              }
            })},
          false: function () { console.log('更新失败') }
        })
        
      }).catch(error => {
        console.log(error)
      })
      //回到上级菜单
      
    } 
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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