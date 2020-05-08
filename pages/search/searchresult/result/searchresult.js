// pages/search/textsearch/result/result.js
Page({
  data:{
      show:'',
      myurl:'https://fuguangyu-1254071215.cos.ap-shanghai.myqcloud.com/problem/'
  },
  onLoad: function(option){
    console.log(option.data)
    this.setData({
      show:JSON.parse(option.data)
    })
  },
  navToTarget:function(e){
      wx.navigateTo({
        url: '../target/target?pro_name='+e.currentTarget.dataset.proname+'&ans_name='+e.currentTarget.dataset.ansname+'&pro_id='+e.currentTarget.dataset.proid,
      })
  }
})