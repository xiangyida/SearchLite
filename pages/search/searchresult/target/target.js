// pages/search/searchresult/target/target.js
Page({
  data:{
    proname:'',
    ansname:'',
    proid:'',
    myurl:'https://fuguangyu-1254071215.cos.ap-shanghai.myqcloud.com/problem/'
  },
onLoad: function(option){
  this.setData({
    proname:option.pro_name,
    ansname:option.ans_name,
    proid:option.pro_id
  })
  //历史记录页面，无需再次添加搜题历史
  if(this.data.proid != null){
    wx.request({
      url: 'http://127.0.0.1:8080/searchlite/user/recordSearch?openId='+getApp().globalData.openId+'&problemId='+this.data.proid,
    })
  }
  
}
})