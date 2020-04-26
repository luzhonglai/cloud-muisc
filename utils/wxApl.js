const host = "http://neteasecloudmusicapi.zhaoboy.com"; // 接口域名

const wxPromise = (request) => (obj = {}) =>
  new Promise((resolve, reject) => {
    obj = obj || {},
    obj.success = (res) => {
      resolve(res.data);
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

const request = (url, data) => {
  const options = { url, data };
  return Request(options);
};

// wx内置方法支持 支持promise
Object.keys(wx).forEach((key) => {
  if (!(key in axios)) {
    Object.defineProperty(axios, key, {
      get: () => wxPromise(wx[key]),
    });
  }
});

export default request;