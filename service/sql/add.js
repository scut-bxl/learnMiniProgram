export  default function add(options)
{
  return new Promise(
    (resolve, reject) => {
  wx.cloud.init()
  const db = wx.cloud.database()
  const course = db.collection(options.db)
  const name=options.course_name
  const teacher=options.teacher
  const openid=wx.getStorageSync('openid')
   course.add({
         data:{
           course_name:name,teacher:teacher,url:[],video:[]
         },
         success:function(res){
         resolve(res)
         console.log('添加成功',res)}
       })
      
      //有的话就在原来的基础上加入数据
    /*  if(res.data.length>0)
      {
        console.log(">0")
        course.doc(openid).update({
          data:{
            wait: db.command.push({ course_name: name, teacher: teacher, url: [], video: []})
          },
          success:function(res){wx.showToast({
            title: '添加成功',
          })}
          ,false:function(err){console.log(err)}
        })
      };*/

    })
}

