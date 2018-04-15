var mineListData = require('../../data/mine-list-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navList: mineListData.navList
    });
  },

  onNavTap: function (event) {
    var NavUrl = event.currentTarget.dataset.navurl;
    wx.navigateTo({
      url: NavUrl,
    })
  }

})