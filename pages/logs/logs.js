//logs.js
const util = require('../../utils/util.js')
const app = getApp();
console.log(app.globalData.list)
Page({
  data: {
    list:'',
    kelong: {
      top: 0,
      color: "",
      index: ""
    },
    itemH: Number,
    showkelong: true
  },
  onLoad: function () {
    const list = getApp().globalData.list
    this.setData({
      list,
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    const query = wx.createSelectorQuery();
    // 页面初始化获取item节点高度
    query
      .select(".item")
      .boundingClientRect(res => {
        this.data.itemH = res.height;
      })
      .exec();
  },
  touchmove(e) {
    const { index: i } = e.target.dataset;
    const query = wx.createSelectorQuery();
    const { list, itemH } = this.data;
    const kelong = {
      top: 0,
      color: list[i].color,
      index: list[i].index
    };
    query
      .select(".list")
      .boundingClientRect(rect => {
        console.log(rect.top)
        kelong.top = e.changedTouches[0].clientY - rect.top - 30;
        if (kelong.top < -itemH) {
          kelong.top = -itemH;
        } else if (kelong.top > rect.height) {
          kelong.top = rect.height - itemH;
        }
        this.setData({
          kelong: kelong,
          showkelong: false
        });
      })
      .exec();
  },
  touchchend(e) {
    const i = e.target.dataset.index;
    const query = wx.createSelectorQuery();
    const { itemH, list, kelong } = this.data;
    let replace = null;
    query
      .select(".list")
      .boundingClientRect(rect => {
        kelong.top = e.changedTouches[0].clientY - rect.top - 30;
        const target = parseInt(kelong.top / itemH);
        console.log(target, list.length);
        if (target <= list.length) {
          replace = list[target];
          console.log(target, list.length);
          this.setData({
            [`list[${i}]`]: replace,
            [`list[${target}]`]: list[i],
            showkelong: true
          });
        }
      })
      .exec(
        this.setData({
          showkelong: true
        })
      );
  }
})
