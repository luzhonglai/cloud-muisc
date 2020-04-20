//app.js
App({
  onLaunch: function () {
    // 初始化navigationBar信息
    this.initNavigationBar()
  },
  initNavigationBar(){
    const systemInfo = wx.getSystemInfoSync();
    const rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    const navBarHeight = (function() { //导航栏高度
            let gap = rect.top - systemInfo.statusBarHeight; //动态计算每台手机状态栏到胶囊按钮间距
            return 2 * gap + rect.height;
          })();
  },
  globalData: {
    userInfo: null,
    setNavigationBar: {},
  },
});
