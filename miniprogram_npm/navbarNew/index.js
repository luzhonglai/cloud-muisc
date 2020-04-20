//Component Object
const getNavigation = getApp().globalData.setNavigationBar;
Component({
  properties: {
    navbar: {
      type: Object,
      value: {
        flag: true, //是否使用navbar
        title: "顶部导航", // 自定义导航标题
      },
    },
  },
  data: {
    navBarHeight: getNavigation.navBarHeight,
    menuRight: getNavigation.menuRight,
    menuBotton: getNavigation.menuBotton,
    menuHeight: getNavigation.menuHeight,
  },
  methods: {
    init() {
      console.log(getApp());
    },
  },
  created() {
    this.init();
  },
  attached() {},
  ready: function () {},
  moved: function () {},
  detached: function () {},
});
