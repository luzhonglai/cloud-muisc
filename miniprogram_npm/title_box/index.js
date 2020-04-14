Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    title: {
      type: String,
    },
    path: {
      type: String,
    },
    isNavigator: {
      type: Boolean,
      value: false,
    },
    titleSize: {
      type: String,
      value: '44rpx',
    },
    isBoldTitle: {
      type: Boolean,
      value: false,
    },
    titlePadding: {
      type: String,
      value: '30rpx',
    },
    boxPadding: {
      type: String,
    },
  },
});
