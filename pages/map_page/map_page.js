const app = getApp()
const API_URL = 'https://api.heclouds.com/devices/982044910/'
const API_KEY = 'RMbyJ3/B1OUbyrw/un/f4ZiuaOy5LK0Op3naT7vfK4g='
const Key_Token = 'version=2018-10-31&res=products%2F538002&et=1667551744&method=md5&sign=P0m%2BWOCKNVXKSE0lzo3%2FqQ%3D%3D'
Page({
  data: {
    name: '',
    address: '',
    latitude: '',
    longitude: ''
  },
  getLocation: function () {
    var _this = this;
    wx.chooseLocation({
      success: function (res) {
        var name = res.name
        var address = res.address
        var latitude = res.latitude
        var longitude = res.longitude
        _this.setData({
          name: name,
          address: address,
          latitude: latitude,
          longitude: longitude
        })
      },
      complete(r){
        console.log(r)
      }
    })
  },
  OneNet_Post:function(){
    let data={
      "datastreams": [
        {"name": "name", "address": "address", "latitude": "latitude", "longitude": "longitude" },
      ]
    }
    wx.request({
      url: API_URL + "/datapoints",
      method:'POST',
      header:{
        "content-type": 'application/json',
        "api-key": API_KEY
      },
      data:JSON.stringify(data),
      success(res){
        console.log("更新数据成功",res)
        wx.navigateTo({
           url: '/pages/index/index',
        });
      },
      fail: function(res){
        wx.showToast({ title: '系统错误' })
      },
      complete:function(res){
        wx.hideLoading()
      }
    });
  },
})
