// pages/practice/practice-topic/practice-topic.js
var ipaData = require('../../../data/ipa-data.js');
var ipaDetail = require('../../../data/ipa-detail-data.js');
var app = getApp();
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
      ipa: ipaData.items
    })
  },

  onTopicTap: function (e) {
    wx.navigateTo({
      url: 'topic-detail/topic-detail?name=' + e.currentTarget.dataset.name + '&page=1',
    })
  },


})