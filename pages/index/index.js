//index.js
//获取应用实例
const app = getApp();
import axios from "../../utils/wxApl";

Page({
  options: {
    name: 222,
  },
  data: {
    carouselImgUrls: [
      "https://wx1.sinaimg.cn/mw690/006cV2kkly1g90322akslj30on1hcjvf.jpg",
      "https://wx2.sinaimg.cn/mw690/006cV2kkly1g9032310y9j30on1hcdkw.jpg",
      "https://wx3.sinaimg.cn/mw690/006cV2kkly1g90323z18oj30on1hc77z.jpg",
      "https://wx1.sinaimg.cn/mw690/006cV2kkly1g90324d2mrj30on1hcwic.jpg",
      "https://wx3.sinaimg.cn/mw690/006cV2kkly1g903258itpj30on1hctby.jpg",
    ],
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    list: [],
    itemH: Number,
    showkelong: true,
    active: 0,
    tabber: [
      {
        title: "首页",
        icon: "home-o",
      },
      {
        title: "分类",
        icon: "search",
      },
      {
        title: "推荐",
        icon: "friends-o",
      },
      {
        title: "我的",
        icon: "setting-o",
      },
    ],
  },
  async onLoad() {
    this.setBarTitle();
    const data = await axios.post({
      data: {
        types: "playlist",
        id: 2884035,
      },
    });
    this.setData({});
  },
  setBarTitle(i) {
    const title = this.data.tabber[i || 0].title;
    wx.setNavigationBarTitle({
      title,
    });
  },
  onChange(event) {
    this.setBarTitle(event.detail);
    this.setData({
      active: event.detail,
    });
  },
});
