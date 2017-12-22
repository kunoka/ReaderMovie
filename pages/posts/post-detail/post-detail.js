var postsData = require('../../../data/posts-data.js')
Page({
  data: {},
  onLoad: function (option) {
    var postId = option.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    console.log('postData')
    console.log(postData)
    // this.data.postData = postData;
    this.setData(
      {postData: postData}
    )

    // var postsCollectd = {
    //   1: "true",
    //   2: "false",
    //   3: "true",
    //
    // }

    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      this.setData(
        {
          collected: postCollected
        }
      )
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
  },
  onCollectionTap: function () {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    this.showToast(postsCollected, postCollected)
  },
  onShareTap: function () {
    var itemList = [
      '分享到微信',
      '分享到朋友圈',
      '分享到QQ',
      '分享到微博'
    ];
    wx.showActionSheet({
      itemList: itemList,
      success: function(res) {
        console.log(res.tapIndex)
        wx.showModal({
          title: '',
          content: '用户' +itemList[res.tapIndex]
        })
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    });
  },
  showModal: function (postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? '是否取消收藏' : "是否收藏此文章",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确定",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          postCollected = !postCollected;
          that.setData({
            collected: postCollected
          });
          postsCollected[that.data.currentPostId] = postCollected;
          wx.setStorageSync('posts_collected', postsCollected);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }

      }
    })
  },
  showToast: function (postsCollected, postCollected) {
    var that = this;
    wx.showToast({
      title: postCollected ? '取消成功' : '收藏成功',
      icon: 'success',
      duration: 1000
    });
    postCollected = !postCollected;
    that.setData({
      collected: postCollected
    });
    postsCollected[that.data.currentPostId] = postCollected;
    wx.setStorageSync('posts_collected', postsCollected);
  }
})