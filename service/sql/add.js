export  default function add(options)
{
  wx.cloud.init()
  const db = wx.cloud.database()
  const course = db.collection('course-info')
  const name=options.name
  const url=options.url
  course.add({
    data:{
      name:name,
      url:url
    },
    success:function(res)
    {console.log(res)}
  })
}

