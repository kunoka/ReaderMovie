var app = getApp();
var utils = require('../../utils/utils');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    containerShow: true,
    searchPanelShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*  douban api 返回403 先注释掉 使用 gugujiankong API
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250";

    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
    */

    var inTheatrsUrl = app.globalData.gugujiankongBase + "Handler.ashx?action=getnews&type=top&count=13";
    var comingSoonUrl = app.globalData.gugujiankongBase + "Handler.ashx?action=getnews&type=guonei&count=3";
    var top250Url = app.globalData.gugujiankongBase + "Handler.ashx?action=getnews&type=guoji&count=3";
    this.getMovieListData(inTheatrsUrl, "inTheaters", "正在热映");
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
        console.log('===res===');
        console.log(res);
        // that.processDoubanData(res.data.subjects, type, categoryTitle);
        that.processGugujiankokngData(res.data, type, categoryTitle);
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },
  processGugujiankokngData: function (res, type, categoryTitle) {
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
      // console.log(temp)
      movies.push(temp);
      var readyData = {};
      readyData[type] = {
        categoryTitle: categoryTitle,
        movies: movies
      };
      this.setData(readyData);
    }
  },
  processDoubanData: function (subjects, type, categoryTitle) {
    if (typeof subjects === 'undefined') {
      return;
    }
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

  },
  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
  onBindChange: function () {
    console.log('onBindChange');
  },
  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false

    })
  }
})