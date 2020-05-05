Page({
  data: {
      inputShowed: false,
      inputVal: ""
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
            wx.request({
                url: 'http://127.0.0.1:8080/searchlite/problem/searchByString/'+value,
                method: 'GET',
                success: (res) => {
                    let data = res.data.data;
                    for(var i=0;i<data.length;i++){
                       let obj = {text:data[i].title,value: data[i].id};
                       show.push(obj)
                    }
                    resolve(show)
                }
              });
          }, 200)
      })
  },
  selectResult: function (e) {
      wx.navigateTo({
        url: '../result/result',
      })
  },
});