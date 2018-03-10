var ipaData = require('../../../data/ipa-data.js');
var ipaDetail = require('../../../data/ipa-detail-data.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentItemId: -1,
    isActiveDetailMenu: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var globalData = app.globalData;
    this.setData({
      ipa: ipaData.items,
      ipaDetail: ipaDetail.items,
      isSpreadDetail: globalData.g_spreadIpaDetail
    })
  },

  // 播放音频
  onMusicTap: function (event) {
    var audioUrl = event.currentTarget.dataset.audiourl;
    // 播放音频
    wx.playBackgroundAudio({
      dataUrl: audioUrl,
    });
  },

  // 获得当前点击的 音标所在组 和 音标详情
  onSpreadTap: function (event) {
    var globalData = app.globalData;
    var currentIpa = event.target.dataset.name;
    if (currentIpa === undefined) {
      return false;
    }

    var currentIpaDetail = {};
    // 所有的 ipaDetailArr 列表
    var ipaDetailArr = this.data.ipaDetail;
    // 获得当前 ipa 的详情
    for (var i = 0; i < ipaDetailArr.length; i++) {
      if (currentIpa == ipaDetailArr[i].name) {
        currentIpaDetail = ipaDetailArr[i];
        break;
      }
    }
    // 绑定当前所在组 id 和 当前 ipa 详情
    this.setData({
      currentIpaDetail: currentIpaDetail,
      isActiveDetailMenu: true
    })
  },

  switchDetailChange: function (e) {
    var globalData = app.globalData;
    console.log(globalData.g_spreadIpaDetail, e.detail.value);
    if (e.detail.value) {
      globalData.g_spreadIpaDetail = true;
      this.setData({
        isSpreadDetail: true
      });
    } else {
      globalData.g_spreadIpaDetail = false;
      this.setData({
        isSpreadDetail: false
      });
    }
  },

  // 关闭详情菜单
  onShutdownTap: function (e) {
    this.setData({
      isActiveDetailMenu: false
    });
  }

})