const host = "http://www.muicc.cn/api.php"; // 接口域名

const wxPromise = (request) => (obj = {}) =>
  new Promise((resolve, reject) => {
    obj.success = (res) => {
      resolve(res);
    };
    obj.fail = (error) => {
      reject(error);
    };
    request(obj);
  });

// 重构配置request options 参数
const Request = (options) => {
  const url = options.url || "";
  const data = (options.data = { ...options.data });
  return wxPromise(wx.request)({
    url: `${
      url.includes(host)
        ? url
        : `${host}${url.startsWith("/") ? url : `/${url}`}`
    }`,
    data,
    header: {
      ["Content-Type"]: "application/x-www-form-urlencoded",
      ...options.header,
    },
    method: options.method || "GET",
  });
};

// 配置axios内置方法
const axios = {
  get(options = {}) {
    options.method = "GET";
    return Request(options);
  },
  post(options = {}) {
    options.method = "POST";
    return Request(options);
  },
};

// wx内置方法支持 Promise方法then回调;
Object.keys(wx).forEach((key) => {
  if (!(key in axios)) {
    Object.defineProperty(axios, key, {
      get: () => wxPromise(wx[key]),
    });
  }
});

export default axios;
