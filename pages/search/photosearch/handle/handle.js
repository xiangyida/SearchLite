var app = getApp();
// 获取显示区域长宽
const device = wx.getSystemInfoSync()
const W = device.windowWidth
const H = device.windowHeight - 50
let cropper = require('../welCropper/welCropper.js');
Page({
  data: {
    hidden: true,
    navdata:''
  },
  onLoad: function (e) {
    var that = this
    // 初始化组件数据和绑定事件
    cropper.init.apply(that, [W, H]);
    const tempFilePath = e.path;
    that.showCropper({
      src: tempFilePath,
      sizeType: ['original'],   //'original'(default) | 'compressed'
      callback: (res) => {
        that.setData({
          hidden: false
        })
        wx.uploadFile({
          url: getApp().globalData.requestUrl+'/searchlite/problem/searchByPicture', 
          filePath: res,
          name: 'file',
          header: {
            'Content-Type': 'multipart/form-data',
          },
          formData: {
            method: 'POST'   //请求方式
          },
          success: function (r) {
            that.setData({
              hidden: true
            })
            var d= JSON.parse(r.data).data;
            console.log(d.data)
            let show = [];
            for(var i=0;i<d.length;i++){
              let obj = {text:d[i].title,value: d[i]};
              show.push(obj)
           }
           that.navdata = show;
            wx.navigateTo({
              url: '/pages/search/searchresult/result/searchresult?data='+JSON.stringify(that.navdata)
            })
          }
        })

        // that.hideCropper() //隐藏，我在项目里是点击完成就上传，所以如果回调是上传，那么隐藏掉就行了，不用previewImage
      }
    })
  },
  onShow: function(){
   
  },
  selectTap(e) {
    let that = this
    let mode = e.currentTarget.dataset.mode
    console.log(e)
    
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const tempFilePath = '../../pictures/logo.png'
        console.log(tempFilePath)
        that.showCropper({
          src: tempFilePath,
          mode: mode,
          sizeType: ['original', 'compressed'],   //'original'(default) | 'compressed'
          callback: (res) => {
            wx.uploadFile({
              url:  getApp().globalData.requestUrl+'/searchlite/problem/searchByPicture', 
              filePath: res,
              name: 'file',
              header: {
                'content-type': 'application/json'
              },
              success: function (r) {
                var d= JSON.parse(r.data).data;
                console.log(d.data)
                let show = [];
                for(var i=0;i<d.length;i++){
                  let obj = {text:d[i].title,value: d[i]};
                  show.push(obj)
                }
                that.navdata = show;
                wx.navigateTo({
                  url: '/pages/search/searchresult/result/searchresult?data='+JSON.stringify(that.navdata)
                })
                }
            })

            //that.hideCropper() //隐藏，我在项目里是点击完成就上传，所以如果回调是上传，那么隐藏掉就行了，不用previewImage
          }
        })
      }
    })
  }
})
