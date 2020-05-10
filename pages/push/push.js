// pages/push/push.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: () =>{
    let show = [];
    wx.request({
        url: getApp().globalData.requestUrl+'/searchlite/user/push/'+getApp().globalData.openId,
        method: 'GET',
        success: (res) => {
            let data = res.data.data;
            for(var i=0;i<data.length;i++){
               let obj = {text:data[i].title,value: data[i]};
               show.push(obj)
            }
            wx.navigateTo({
              url: '/pages/search/searchresult/result/searchresult?data='+JSON.stringify(show)
            })
        }
      });
  },
  onPullDownRefresh: function () {
    this.onLoad()
  },
})