Page({
  data: {
    height:0,

  },
  onLoad() {
    this.ctx = wx.createCameraContext()
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        })
      }
    })
  },
  takePhoto:function() {
    
    
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res.tempImagePath)
        // this.setData({
        //   src: res.tempImagePath
        // })
        wx.navigateTo({
          url: '../handle/handle?path=' + res.tempImagePath,
        })
      }
    })
  },

  chooseImage:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("初始路径")
        console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        wx.navigateTo({
          url: '../handle/handle?path=' + res.tempFilePaths,
        })
      }
    })
  },
 
  
  error(e) {
    console.log(e.detail)
  }
})