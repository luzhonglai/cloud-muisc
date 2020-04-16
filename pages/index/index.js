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
    listIcon: [
      { title: "推荐MV", icon: "/images/MV.png", link: "/pages/mv" },
      { title: "歌手榜", icon: "/images/songer.png", link: "/pages/songer" },
      { title: "歌单", icon: "/images/songList.png", link: "/pages/songlist" },
      { title: "榜单排行", icon: "/images/rank.png", link: "/pages/rank" },
    ],
  },

  onLoad() {
    this.setBarTitle();
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
