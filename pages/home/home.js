import add from '../../service/sql/add.js'
import sel from '../../service/sql/sel.js'
import del from '../../service/sql/del.js'
 const types=['learn','teach'];
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
     const index=event.detail.index;
     const type=types[index]
     this.setData({
       currentType:type
     })

   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // 在这里进行请求数据
   
    sel().then(res =>{
      this.setData({
        courses: res.data[0],  
      })
      console.log('sel的结果：',res)
      
    }).catch(error=>{
      console.log(error)
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