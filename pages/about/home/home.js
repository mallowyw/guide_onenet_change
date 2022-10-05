Component({
    options: {
      addGlobalClass: true,
    },
    data: {
      starCount: 0,
      forksCount: 0,
      visitTotal: 0,

      userInfo: {},
      identity: "",
      name: "",

      identityText: {
        "teacher_commu": "规划师",
        "teacher_course": "文化课教师",
        "student": "学生",
        "parent": "家长"
      }
    },
    attached() {
      console.log("component attached")
      let that = this;
      wx.showLoading({
        title: '数据加载中',
        mask: true,
      })

      const name = wx.getStorageSync('name');
      const identity = wx.getStorageSync('identity');
      const userInfo = wx.getStorageSync('userInfo');
      that.setData({
          name: name,
          identity: identity,
          userInfo: userInfo
        });
      console.log(that.data);

      let i = 0;
      numDH();
      function numDH() {
        
          that.setData({
            starCount: that.coutNum(0),
            forksCount: that.coutNum(0),
            visitTotal: that.coutNum(0)
          })
        
      }
      wx.hideLoading()
    },
    methods: {
      coutNum(e) {
        if (e > 1000 && e < 10000) {
          e = (e / 1000).toFixed(1) + 'k'
        }
        if (e > 10000) {
          e = (e / 10000).toFixed(1) + 'W'
        }
        return e
      },
      CopyLink(e) {
        wx.setClipboardData({
          data: e.currentTarget.dataset.link,
          success: res => {
            wx.showToast({
              title: '已复制',
              duration: 1000,
            })
          }
        })
      }
      
      
    }
  })