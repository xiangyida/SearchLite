// pages/history/history.js
Page({
data:{
  history:''
},
onLoad:function(option){
  wx.request({
    url: getApp().globalData.requestUrl+'/searchlite/user/searchRecords/'+getApp().globalData.openId,
    success: res =>{
      console.log(res.data.data)
       this.setData({
         history: res.data.data
       })
    }
  })
}
})