Page({
  onTap: function (event) {
    // wx.navigateTo({
    //   url: '../posts/post',
    // });
    wx.redirectTo({
      url: '../posts/post'
    })
  },
  onTextTap: function (event) {
    console.log('onTextTap')
  },
  // 关闭或者卸载时
  onUnload: function () {
    // console.log('welcome page is unload')
  },
  // 页面被隐藏时
  onHide:function () {
    // console.log('welcome page is hide')
  }
})