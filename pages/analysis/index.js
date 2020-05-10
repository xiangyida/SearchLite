import * as echarts from '../../ec-canvas/echarts'; //引入echarts.js
var word = [];
var count = [];
var time = [];
var frequent =[];
var Chart = null;
var Chart_1 = null;
Page({
  data: {
    ec: {
      lazyLoad: true 
    },
    ec1: {
      lazyLoad: true 
    }
  },
  onLoad: function (options) {
    this.echartsComponnet = this.selectComponent('#word_count');
    this.echartsLineComponnet = this.selectComponent('#search_frequency');
    this.getData(); //获取数据
  },
  getData: function () {
    if (!Chart){
      this.init_echarts(); //初始化图表
    }else{
      this.setOption(Chart); //更新数据
    }
    if(!Chart_1){
      this.init_echarts_1();
    }else{
      this.setOption_1(Chart_1);
    }
    wx.request({
      url: getApp().globalData.requestUrl+'/searchlite/analysis/wordCount',
      method: 'GET',
      success: (res) => {
        let d = res.data
        for(var w in d){
          word.push(w)
          count.push(d[w])
        }
        this.init_echarts();//初始化图表
      }
    }),
    wx.request({
      url: getApp().globalData.requestUrl+'/searchlite/analysis/searchFrequency',
      method: 'GET',
      success: (res) => {
        let d = res.data
        console.log(d)
        for(var w in d){
          let t = d[w].cntTime;
          t = t.substring(10,19)
          time.push(t)
          frequent.push(d[w].cnt)
        }
        this.init_echarts_1();//初始化图表
      }
    });
  },
  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption(Chart);
      return Chart;
    });
  },
  init_echarts_1: function () {
    this.echartsLineComponnet.init((canvas, width, height) => {
      Chart_1 = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption1(Chart_1);
      return Chart_1;
    });
  },
  setOption: function (Chart) {
    Chart.clear();  // 清除
    Chart.setOption(this.getOption());  //获取新数据
  },
  setOption1: function (Chart) {
    Chart.clear();  // 清除
    Chart.setOption(this.getOption1());  //获取新数据
  },
  getOption: function () {
    var option = {
       xAxis: {
        type: 'category',
        data: word,
        axisLabel: {interval:0,rotate:40 }
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: count,
        type: 'bar',
        itemStyle: {
          normal: {
            color: '#23d713', //改变折线点的颜色
            barStyle: {
              color: '#23d713' //改变折线颜色
            }
          }
        },
          }]
    }
    return option;
  },
  
  getOption1: function () {
    var option = {
      xAxis: {
        type: 'category',
        data: time,
        axisLabel: {interval:0,rotate:40 }
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: frequent,
        type: 'line',
        itemStyle: {
          normal: {
            color: '#23d713', //改变折线点的颜色
            lineStyle: {
              color: '#23d713' //改变折线颜色
            }
          }
        },
    }]
    }
    return option;
  },
  onPullDownRefresh: function(){
    this.onLoad()
  }

})