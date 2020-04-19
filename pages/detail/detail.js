// pages/detail/detail.js
import add from '../../service/sql/add.js'
import sel from '../../service/sql/sel.js'
import del from '../../service/sql/del.js'
var url=[]
var video= []
Page({
  /**
   * 页面的初始数据
   */
  data: {
    course_name:"",
    teacher:"",
    currentType:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let _courseid = JSON.parse(options.course_id)
    sel({
      db:'course',
      course_id: _courseid
    }).then(res=>{
      console.log('详情页面的一次查询',res)
      this.setData({
        course_name: res.data[0].course_name,
        teacher: res.data[0].teacher,
        url: res.data[0].url,
        video: res.data[0].video,
        currentType: res.data[0].url
      })
    }).catch(err=>{
      sel({
        db: 'wait_course',
        course_id: _courseid
      }).then(res => {
        this.setData({
          course_name: res.data[0].course_name,
          teacher: res.data[0].teacher,
          url: res.data[0].url,
          video: res.data[0].video,
          currentType: res.data[0].url
        })
      })
    })
  
  },
  handleTabClick(event)
  {
    const index = event.detail.index;
    if (index == 0)
       {this.setData({
           currentType:url
         })}
         else{
      this.setData({
        currentType:video
      })
         }
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