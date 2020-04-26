const app = getApp();
const API = require("../../Apl/apl");
Page({
  data: {
    loading: false,
    color: "#000",
    background: "#fff",
    show: true,
    animated: false,
    banners: [],
  },

  onLoad() {
    this.initPages();
  },
  async initPages() {
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
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
        const bannersData = brannersResp.banners;
        const playlists = songsheetResp.playlists.slice(0, 6);
        const result = newsongResp.result.slice(0, 6);
        const albums = newLstResp.albums.slice(0, 6);
        const djRadios = djRadiosResp.djRadios.slice(0, 6);
        const banners = bannersData.map((item) => item.imageUrl);
        this.setData({
          banners,
          newsong: result,
          songsheet: playlists,
          djRadios: djRadios,
          albums,
        });
        wx.hideLoading();
      }
    );
  },

  // 搜索页面
  onSearchPage() {
    wx.navigateTo({
      url: "/pages/search/index",
    });
  },
});
