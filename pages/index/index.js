const app = getApp();
const API = require("../../Apl/apl");
Page({
  data: {
    banners: [],
    active: 0,
    tabber: [
      {
        title: "首页",
        icon: "home-o",
      },
      {
        title: "热门音乐",
        icon: "search",
      },
      {
        title: "我的",
        icon: "friends-o",
      },
    ],
  },

  onLoad() {
    this.initPageConfig();
    this.initPages();
  },

  async initPages() {
    Promise.all([
      API.getBanner({ type: 2 }),
      API.getsongsheet({
        order: "hot",
      }),
      API.getNewSong({}),
      API.getNewEst({}),
      API.getDjRadios({}),
    ]).then(
      ([
        brannersResp,
        songsheetResp,
        newsongResp,
        newLstResp,
        djRadiosResp,
      ]) => {
        const bannersData = brannersResp.data.banners;
        const playlists = songsheetResp.data.playlists.slice(0, 6);
        const result = newsongResp.data.result.slice(0, 6);
        const albums = newLstResp.data.albums.slice(0, 6);
        const djRadios = djRadiosResp.data.djRadios.slice(0, 6);
        const banners = bannersData.map((item) => item.imageUrl);
        this.setData({
          banners,
          newsong: result,
          songsheet: playlists,
          djRadios: djRadios,
          albums,
        });
      }
    );
  },
  async initPageConfig(i) {
    const menuRect = wx.getMenuButtonBoundingClientRect();
    console.log(menuRect);
    const title = this.data.tabber[i || 0].title;
    wx.setNavigationBarTitle({
      title,
    });
    this.setData({navH:app.globalData.navHeight})
  },
  onChange(event) {
    this.setBarTitle(event.detail);
    this.setData({
      active: event.detail,
    });
  },
});
