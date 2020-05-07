// pages/history/history.js
Page({
data:{
  history:''
},
onLoad:function(option){
  wx.request({
    url: 'http://127.0.0.1:8080/searchlite/user/searchRecords/'+getApp().globalData.openId,
    success: res =>{
      console.log(res.data.data)
       this.setData({
         history: res.data.data
       })
    }
  })
}
})