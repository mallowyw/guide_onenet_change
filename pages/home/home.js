const app=getApp();
const API_URL = 'http://api.heclouds.com/devices/982044910/'
const API_KEY = 'RMbyJ3/B1OUbyrw/un/f4ZiuaOy5LK0Op3naT7vfK4g='
Page({
    data: {
        status_guide: '待机',
        now: app.globalData.now,
        items: ['事项A','事项B','事项C'],    //WXML数组循环测试
        inputValue: ''
    },
    queryButtonHandler(event) {
        const that = this;
        wx.showModal({
            title: '操作确认',
            content: '你确认要修改吗？',
            success(res) {
                if (res.confirm) {
                    //若确认查询，调用api获取状态并更新

                    
                    that.setData({
                        status_guide: '导航'
                    }, function() {
                        wx.showToast({
                            title: '操作完成',
                            duration: 700
                        });
                    });
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
/*         this.setData({
            name:'李四'
        },function(){
            wx.showToast({
                title:'操作完成',
                duration:700
            });
        }); */
    },
    inputHandler(event) {
        this.setData({
            inputValue: event.detail.value || ''
        });
    },
    buttonHandler(event) {
        const newItem = this.data.inputValue.trim();
        if(!newItem) return;
        const itemArr = [...this.data.items,newItem];
        wx.setStorageSync('items', itemArr);
        this.setData({ items: itemArr });
    },
    onload() {
        const itemArr=wx.getStorageSync('items') || [];
        this.setData({ items: itemArr });
    },
    pageJumpHandler(event) {
        wx.navigateTo({
            url: '../image_page/image_page',
        });
    }
});