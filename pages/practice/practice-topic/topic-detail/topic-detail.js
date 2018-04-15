// pages/practice/practice-topic/topic-detail/topic-detail.js
var ipaDetailData = require('../../../../data/ipa-detail-data.js');
var wordData = require('../../../../data/word-data.js');
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
    // 获得单词数据
    var words = {};
    for (var i = 0; i < wordData.items.length; i++) {
      if (ipa.name === wordData.items[i].ipaName) {
        words = wordData.items[i].words;
      }
    }

    this.setData({
      currentWords: words,
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
    this.turnPage(1);
  },

  /**
   * @e 事件
   */
  onPreviousTap: function (e) {
    this.turnPage(-1);
  },

  turnPage: function (stepNum) {
    var toPage = parseInt(this.data.currentPage) + stepNum;
    wx.redirectTo({
      url: 'topic-detail?name=' + this.data.currentIpa.name + '&page=' + toPage
    });
  },
  

  onRestartTap: function (e) {
    wx.redirectTo({
      url: 'topic-detail?name=' + this.data.currentIpa.name + '&page=1'
    });
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

  // 单词页面
  onPlayWordTap: function (e) {
    console.log(1);
    var audioUrl = e.target.dataset.audiourl;
    wx.playBackgroundAudio({
      dataUrl: audioUrl,
    })
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
  },
})