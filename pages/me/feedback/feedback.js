import Dialog from '@vant/weapp/dialog/dialog';
Page({
  data:{
    problem:'',
    contact:'',
    others:''
  },

  submit: function(){
    let message = {};
    message.problem = this.data.problem;
    message.contact = this.data.contact;
    message.others = this.data.others;
    console.log(message)
    wx.request({
      url: 'http://127.0.0.1:8080/searchlite/user/feedback/',
      method:'POST',
      data: message,
      success :res =>{
        Dialog.alert({
          message: '提交成功，感谢您的反馈'
        }).then(() => {
           wx.switchTab({
             url: '../index/index',
           })
        });
      }
    })
  }


})