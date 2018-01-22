var app = getApp();
var utils = require('../../utils/utils');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250";

    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getMovieListData: function (url, type, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Content-Type': ''
      },
      success: function (res) {
        console.log('success');
        console.log(res);
        that.getMovieData(res.data.subjects, type, categoryTitle);
      },
      fail: function (res) {
        console.log('fail')
      }
    })
  },
  getMovieData: function (subjects, type, categoryTitle) {
    if (typeof subjects === 'undefined'){
      return;
    }
    console.log(subjects)
    var movies = [];

    for (var i = 0; i < subjects.length; i++) {
      var movie = subjects[i];
      var temp = {
        title: movie.title.length >= 6 ? movie.title.substr(0, 6) + '...' : movie.title,
        coverageUrl: movie.images.large.replace('img7', 'img3'),
        average: movie.rating.average,
        movieId: movie.id,
        stars: utils.convertStarArray(movie.rating.stars)
      }
      console.log(temp)
      movies.push(temp)
    }
    var readyData = {};
    readyData[type] = {
      categoryTitle: categoryTitle,
      movies: movies
    };
    this.setData(readyData);
  },
  onMoreTap: function (event) {
    console.log(event)
    var category = event.currentTarget.dataset.category;
    console.log('category1', category)
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })
  },
  onReady: function () {

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