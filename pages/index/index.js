Page({
    data: {
      PageCur: 'plugin',
    },
    NavChange(e) {
      this.setData({
        PageCur: e.currentTarget.dataset.cur
      })
    },
    onShareAppMessage() {
      return {
        title: '测试',
      }
    },
  })