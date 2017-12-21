var postsData = require('../../../data/posts-data.js')
Page({
  data: {

  },
  onLoad: function(option){
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
    }else{
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
  },
  onCollectionTap: function () {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected: postCollected
    })
  }
})