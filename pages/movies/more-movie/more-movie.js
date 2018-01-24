// pages/movies/more-movie/more-movie.js
var app = getApp();
var utils = require('../../../utils/utils.js');
var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    navigateTitle: "",
    requestUrl: "",
    totalCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    console.log('category', category);
    this.data.navigateTitle = category;
    var dataUrl;
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.gugujiankongBase + "Handler.ashx?action=getnews&type=top&count=20";
        break;
      case "即将上映":
        dataUrl = app.globalData.gugujiankongBase + "Handler.ashx?action=getnews&type=guonei&count=20";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.gugujiankongBase + "Handler.ashx?action=getnews&type=guoji&count=20";
        break;
    }
    utils.http(dataUrl, this.processGugujiankongData);
    this.data.requestUrl = dataUrl;
    // utils.http(dataUrl, this.processDoubanData);
  },
  onScrollLower: function () {
    console.log('onScrollLower')
  },
  processGugujiankongData: function (res) {
    var res = res.data;
    console.log(res)
    var movies = [];
    var starArr = ['10', '15', '20', '25', '30', '35', '40', '45', '50'];
    for (var idx in res) {
      var movie = res[idx];
      // console.log(movie)
      var title = movie.title.length >= 6 ? movie.title.substr(0, 6) + '...' : movie.title
      var temp = {
        title: title,
        coverageUrl: movie.thumbnail_pic_s,
        average: utils.GetRandomNum(60, 100),
        movieId: movie.Id.Pid,
        stars: utils.convertStarArray(starArr[utils.GetRandomNum(1, 8)])
      }
      movies.push(temp);

      this.setData({
        movies: movies
      });
    }
  },
  processDoubanData: function (moviesDouban) {
    if (typeof moviesDouban === 'undefined') {
      return;
    }
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...'
      }
      var movie = subjects[i];
      var temp = {
        stars: utils.convertStarArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large.replace('img7', 'img3'),
        movieId: subject.id
      }
      movies.push(temp);
    }
    this.setData({
      movies: movies
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },
  onScrollLower: function(e) {
    console.log('onScrollLower',e)
    var nextUrl = this.data.requestUrl;
    nextUrl = nextUrl.replace('20','');
    this.data.totalCount += 20;
    nextUrl = nextUrl + this.data.totalCount;
    utils.http(nextUrl, this.processGugujiankongData);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})