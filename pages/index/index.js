//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    list: [],
    kelong: {
      top: 0,
      color: "",
      index: ""
    },
    itemH: Number,
    showkelong: true
  },
  onLoad() {
    const query = wx.createSelectorQuery();
    // 页面初始化获取item节点高度
    query
      .select(".item")
      .boundingClientRect(res => {
        this.data.itemH = res.height;
      })
      .exec();
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: "../logs/logs"
    });
  },
  onHide() {
    const app = getApp();
    app.globalData.list = this.data.list;
  },
  addItem() {
    const color = () => {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      var rgb = "(" + r + "," + g + "," + b + ")";
      return rgb;
    };
    const listNum = this.data.list.length;
    const arry = {
      color: color(),
      index: listNum + 1
    };
    this.setData({
      [`list[${listNum}]`]: arry
    });
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
});