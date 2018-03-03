var ipaBaseData = require('../../../data/ipa-base-data.js');
// pages/practice/practice-initial/practice-initial.js
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
      id: options.id,
      pageLen: ipaBaseData.items.length
    });
    for (var i = 0;i < ipaBaseData.items.length;i++) {
      if (options.id == ipaBaseData.items[i].id) {
        var temp = ipaBaseData.items[i];
      }
    }
    this.setData({
      ipaBaseData: temp
    });
  },

  onPreviousTap: function (event) {
    this.turnPage(-1);
  },

  onNextTap: function (event) {
    this.turnPage(1);
  }, 

  onOverTap: function (event) {
    wx.switchTab({
      url: '../practice',
    })
  },

  turnPage: function (stepNum) {
    var toPage = parseInt(this.data.id) + stepNum;
    wx.redirectTo({
      url: 'practice-initial?id=' + toPage
    });
  }

  

})