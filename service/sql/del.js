export default function del(options) {
  wx.cloud.init()
  const db = wx.cloud.database()
  const course = db.collection('course-info')
  const name = options.name
  course.where({
    name:name
  }).remove({
    success:function(res)
    {
      console.log(res)
    }
  })
}

