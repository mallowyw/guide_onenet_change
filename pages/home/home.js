const app = getApp();
const API_URL = 'https://api.heclouds.com/devices/982044910/'
const API_KEY = 'RMbyJ3/B1OUbyrw/un/f4ZiuaOy5LK0Op3naT7vfK4g='
const Key_Token = 'version=2018-10-31&res=products%2F538002&et=1667551744&method=md5&sign=P0m%2BWOCKNVXKSE0lzo3%2FqQ%3D%3D'
//当前token到期时间为11.4下午四点多
//master_apikey: gYTmesefwkAWC8JEgZC31=yKJ2o=
const Datastream_ids = 'status_guide,coordinates'
Page({
    data: {
        now: app.globalData.now,
        res_data: { "state": "null" },
        state: {
            status_guide: '待机',
            //status_health: ['','',''],
            current_coordinates: { "latitude": 0, "longitude": 0 }
        }
    },
    //查询按钮处理
    queryButtonHandler(event) {
        const that = this;
        wx.showModal({
            title: '操作确认',
            content: '你确认要修改吗？',
            success(res) {
                if (res.confirm) {
                    //若确认查询，调用api获取状态并更新
                    that.get_Datastreams(Datastream_ids),
                        function () {
                            wx.showToast({
                                title: '操作完成',
                                duration: 700
                            });
                        }
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
    },
    //批量查询数据流并更新
    get_Datastreams(datastream_ids) {
        const that = this;
        const get_apiurl = API_URL + 'datastreams?datastream_ids=' + datastream_ids;
        console.log(get_apiurl);
        wx.request({
            url: get_apiurl,
            method: "GET",
            header: {
                "content-type": 'application/x-www-form-urlencoded',
                "Authorization": Key_Token
            },
            success: function (res) {
                console.log(res);
                if (res.statusCode === 200) {
                    let status_temp = '待机'
                    switch (res.data.data[0].current_value) {
                        case 111:
                            status_temp = '导航中...'
                            break;
                        case 222:
                            status_temp = '偏航...'
                            break;
                        case 333:
                            status_temp = '转弯...'
                            break;
                        case 444:
                            status_temp = '到达终点！'
                            break;
                        default:
                            break;
                    };
                    that.setData({
                        state: {
                            status_guide: status_temp,
                            //status_health: ['','',''],
                            current_coordinates: res.data.data[1].current_value
                        }
                    });
                } else {
                    wx.showToast({
                        title: '请求失败',
                        duration: 700
                    });
                }
            },
            fail: function () {
                wx.showToast({
                    title: '请求失败',
                    duration: 700
                });
            }
        });
    },
    // inputHandler(event) {
    //     this.setData({
    //         inputValue: event.detail.value || ''
    //     });
    // },
    // buttonHandler(event) {
    //     const newItem = this.data.inputValue.trim();
    //     if (!newItem) return;
    //     const itemArr = [...this.data.items, newItem];
    //     wx.setStorageSync('items', itemArr);
    //     this.setData({ items: itemArr });
    // },
    onload() {
        const itemArr = wx.getStorageSync('items') || [];
        this.setData({ items: itemArr });
    },
    pageJumpHandler(event) {
        wx.navigateTo({
            url: '../map_page/map_page',
        });
    }
});