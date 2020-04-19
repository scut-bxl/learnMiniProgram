export default function sel(options) {
  return new Promise(
    (resolve,reject) =>{
      wx.cloud.init()
      const db = wx.cloud.database()
      const _data = db.collection(options.db)
      _data.where
        ({
          _id:options.course_id
        }).get({
          data: {
          },
          success: function (res) { 
            resolve(res)
            console.log('sel查询成功',res) },
            fail:function(err){
              reject(err)
            }
        })
    }
  )
  
}

