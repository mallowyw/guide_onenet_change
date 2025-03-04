App({
    onLaunch: function () {
        wx.getSystemInfo({
            success: e => {
              this.globalData.StatusBar = e.statusBarHeight;
              let capsule = wx.getMenuButtonBoundingClientRect();
              if (capsule) {
                   this.globalData.Custom = capsule;
                  this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
              } else {
                  this.globalData.CustomBar = e.statusBarHeight + 50;
              }
            }
          })
      },
    globalData:{
        now:(new Date()).toLocaleString()
    }
});