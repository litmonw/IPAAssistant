var ipaData = require('../../../data/ipa-data.js');
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
      ipa: ipaData.ipaList
    })
  },

  onMusicTap: function (event) {
    var audioUrl = event.currentTarget.dataset.audiourl;
    wx.playBackgroundAudio({
      dataUrl: audioUrl,
    })
  }
})