//Component Object
Component({
  properties: {
    imgUrls: {
      type: Array,
      value: "",
      observer() {},
    },
  },
  data: {
    currentIndex: 0
  },
  methods: {
    swiperChange(e) {
      this.setData({
        currentIndex: e.detail.current
      });
    }
  },
  created: function() {},
  attached: function() {},
  ready: function() {},
  moved: function() {},
  detached: function() {},
});