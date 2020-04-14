// pages/home/home.js

import add from '../../service/sql/add.js'
import sel from '../../service/sql/sel.js'
import del from '../../service/sql/del.js'

Page({
  data: {

  },

  handleAdd() {
    add({
      name: 'test',
      url: '192.168.0.1'
    }),
    wx.showToast({
      title: '添加成功',
    })
  },
  handleDel() {
    del({
      name: 'test'
    }),
    wx.showToast({
      title: '删除成功',
    })
  },
  handleSel() {
    sel(),
    wx.showToast({
      title: '查询成功',
    })
  }
  
})