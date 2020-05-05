// pages/search/searchresult/target/target.js
Page({
  data:{
    proname:'',
    ansname:'',
    myurl:'https://fuguangyu-1254071215.cos.ap-shanghai.myqcloud.com/problem/'
  },
onLoad: function(option){
  this.setData({
    proname:option.pro_name,
    ansname:option.ans_name
  })
}
})