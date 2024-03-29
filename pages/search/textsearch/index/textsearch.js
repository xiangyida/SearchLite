Page({
  data: {
      inputShowed: false,
      inputVal: "",
      navdata:''
  },
  onLoad() {
      this.setData({
          search: this.search.bind(this)
      })
  },
  search: function (value) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            let show = [];
            var that = this;
            wx.request({
                url: getApp().globalData.requestUrl+'/searchlite/problem/searchByString/'+value,
                method: 'GET',
                success: (res) => {
                    let data = res.data.data;
                    for(var i=0;i<data.length;i++){
                       let obj = {text:data[i].title,value: data[i]};
                       show.push(obj)
                    }
                    that.navdata = show;
                    resolve(show)
                }
              });
          }, 200)
      })
  },
  selectResult: function (e) {
      console.log(this.navdata)
      wx.navigateTo({
        url: '../../searchresult/result/searchresult?data='+JSON.stringify(this.navdata)
      })
  },
});