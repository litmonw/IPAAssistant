// pages/practice/practice-topic/topic-detail/topic-detail.js
var ipaDetailData = require('../../../../data/ipa-detail-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRecording: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currentPage = options.page;
    var currentIpa = options.name;
    var ipa = {};
    for (var i = 0; i < ipaDetailData.items.length; i++) {
      var ipaData = ipaDetailData.items[i];
      if (currentIpa == ipaData.name) {
        ipa = ipaData;
        break;
      }
    }
    this.setData({
      currentIpa: ipa,
      currentPage: options.page
    })
  },

  /**
   * ipa 音频播放控制事件
   * @e 事件
   */
  onMusicTap: function (e) {
    wx.playBackgroundAudio({
      dataUrl: this.data.currentIpa.audioUrl,
    })
  },

  /**
   * @e 事件
   */
  onNextTap: function (e) {
    var nextPage = parseInt(this.data.currentPage) + 1;
    wx.redirectTo({
      url: 'topic-detail?name=' + this.data.currentIpa.name + '&page=' + nextPage
    })
  },

  /**
   * @e 事件
   */
  onRecordTap: function (e) {
    var isRecording = this.data.isRecording;
    if (!isRecording) {
      this.setData({
        isRecording: true
      })
      this.recorderManager = wx.getRecorderManager();

      this.recorderManager.onStart(function () {
        console.log('recorder start');
      });

      var that = this;
      this.recorderManager.onStop(function (res) {
        that.setData({
          src: res.tempFilePath
        })
        console.log('recorder stop');
      })

      this.recorderManager.start({
        format: 'mp3'
      });
    } else {
      this.recorderManager.stop();
      this.setData({
        isRecording: false
      })
    }
  },

  // 不能使用 wx.playBackgroundAudio 必须为网络资源
  onPlaySelfTap: function (e) {
    // this.innerAudioContext = wx.createInnerAudioContext();
    // this.innerAudioContext.onError((res) => {
    //   // 播放音频失败的回调
    //   console.log(res);
    // })
    // this.innerAudioContext.src = this.data.src;  // 这里可以是录音的临时路径
    // this.innerAudioContext.play();
  }

})