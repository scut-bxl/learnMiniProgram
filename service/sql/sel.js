export default function sel() {
  return new Promise(
    (resolve,reject) =>{
      wx.cloud.init()
      const db = wx.cloud.database()
      const course = db.collection('user-info')
      course.where
        ({
        }).get({
          data: {
          },
          success: function (res) { 
            resolve(res)
            console.log('sel查询成功') },
            fail:function(err){
              reject(err)
            }
        })
    }
  )
  
}

