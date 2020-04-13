
var app = getApp();
// 获取显示区域长宽
const device = wx.getSystemInfoSync()
const W = device.windowWidth
const H = device.windowHeight - 50

let cropper = require('../welCropper/welCropper.js');



Page({
  data: {
    hidden: true,
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
        console.log(res)
        wx.uploadFile({
          url: 'https://www.lxxcx.xyz/lixue/problem/searchByPicture', //仅为示例，非真实的接口地址
          filePath: res,
          name: 'file',
          header: {
            'Content-Type': 'multipart/form-data',
          },
          formData: {
            method: 'POST'   //请求方式
          },
          success: function (res) {
            that.setData({
              hidden: true
            })
            var str = JSON.stringify(res.data)
            console.log("sssss")
            console.log(res.data)
            wx.navigateTo({
              url: '../search/search?str=' + res.data + "&flag=" + "3"
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

        // 将选取图片传入cropper，并显示cropper
        // mode=rectangle 返回图片path
        // mode=quadrangle 返回4个点的坐标，并不返回图片。这个模式需要配合后台使用，用于perspective correction
        // let modes = ["rectangle", "quadrangle"]
        // let mode = modes[1]   //rectangle, quadrangle
        that.showCropper({
          src: tempFilePath,
          mode: mode,
          sizeType: ['original', 'compressed'],   //'original'(default) | 'compressed'
          callback: (res) => {
            wx.uploadFile({
              url: 'https://www.lxxcx.xyz/lixue/problem/searchByPicture', //仅为示例，非真实的接口地址
              filePath: res,
              name: 'file',
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                console.log("上传文件的JSON")
                console.log(res.data)
                wx.navigateTo({
                  url: '../search/search?str=' + res.data + "&flag=" + "3"
                })
              }
            })

            // that.hideCropper() //隐藏，我在项目里是点击完成就上传，所以如果回调是上传，那么隐藏掉就行了，不用previewImage
          }
        })
      }
    })
  }
})
