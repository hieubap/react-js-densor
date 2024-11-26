import axios from "axios";
import { MutableRefObject, createRef } from "react";
const API_URL = window.location.origin.includes("localhost:3000")
  ? "http://localhost:8800"
  : // : "http://14.225.205.222:8800"
    "https://api-gala.bapber.online";
const API_FILE = "https://api-gala.bapber.online";
export const FILE_URL = API_URL + "/file/";
export const requestHeaders = {
  authorization: "",
  "Content-Type": "application/json",
};

export const requestFetch = (
  methodType: string,
  url: string,
  body?: any,
  headers?: any
) => {
  return new Promise((resolve, reject) => {
    let fetchParam: any = {
      method: methodType,
      headers: { ...requestHeaders, ...(headers || {}) },
    };
    if (methodType.toLowerCase() !== "get") {
      fetchParam.body = JSON.stringify(body);
    }
    const clearUrl = url.startsWith("http") ? url : API_URL + url;
    return fetch(clearUrl, fetchParam)
      .then((json) => {
        if (!json.ok) {
          reject(json);
          return;
        }
        return json.json();
      })
      .then(resolve)
      .catch((e) => {
        // window.location.href = "/maintain";
        reject(e);
      });
  });
};

export const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.set("file", file);

    const r = localStorage.getItem("authInfo");
    const token = r ? "Bearer " + JSON.parse(r).token : "";
    fetch(API_URL + "/vape-dong-anh/upload", {
      method: "post",
      headers: {
        // "Content-Type": "application/json",
        Authorization: token,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
};

// export const headers = {
//   // Authorization:
//   //   "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODAwZDQ5YjM4ZmJhZTVkZDZmNmE3ZiIsInVzZXJuYW1lIjoibmdvaGlldTE4MTFAZ21haWwuY29tIiwiZW1haWwiOiJuZ29oaWV1MTgxMUBnbWFpbC5jb20iLCJyb2xlcyI6WyJBUFBfVVNFUiIsIkFQUF9BRE1JTiIsIk1FUkNIQU5UX1VTRVIiLCJBdXRoZW50aWNhdGVkIl0sImFkZHJlc3MiOiIweGQ0M0YyOTc1REUxMTNFM0NENzllYjdmMzUxRTZENzg4RTA1NWVjNzEiLCJpYXQiOjE3MTM4MzgyNDMsImV4cCI6MTcxMzkxMDI0MywiaXNzIjoiSVZJUlNFIn0.E3ADD3-0tHpI_Y3yMBLubXJB8hOCLhLUNYu0jEk29OEAbe2XrBguyPrtdVAVj2HUTvKXxMSjWj0P6xVYQV78sjD2OMMyBRHtoYavD-eVQsliTk6iWRS4h70YN_6aSej_p1LUZigWKmJ6Z4_KEaixMQrrJOhNZhtn-4mLnEUcklEZR5PLyu0yGuaH4qENCDP818GmrvvtvQChL2KHi-R4n2Ca4OXdwgm0CQHDanGLIzXRQlxlwbPyTuFjWm2RURNtw_dBa8QC3CHzHmLnmelNFU0H72Y5HI-XhAggDNg2oJH0eatNk8c4_7m8naFt0zfDmQ4xufLyKybzRmXW-NQW2A",
//   "Content-Type": "application/json",
//   "If-None-Match": "",
//   timezone_offset: new Date().getTimezoneOffset() / 60,
// };

export const client = axios.create({ headers: requestHeaders });

client.interceptors.request.use(async (config) => {
  // let state = store.getState();
  // let token = state.syncAccount.userDetail?.access_token
  //   ? 'Bearer ' + state.syncAccount.userDetail?.access_token
  //   : state.syncAccount.access_token
  //   ? 'Bearer ' + state.syncAccount.access_token
  //   : global.accessToken;
  let token = requestHeaders.authorization;
  let lang = "en";
  config.headers.lang = lang;
  if (token && !config["ignoreToken"]) {
    config.headers.Authorization = token;
  }
  config.timeout = 20000;
  console.log(config, "config...", config);
  return config;
});

client.interceptors.response.use(
  (response) => {
    // console.log(response, "response????");
    // if (response.data.code === 401) {
    // }
    // if (refModalLoading.current) {
    //   refModalLoading.current.hide();
    // }
    return response.data;
  },
  (error) => {
    console.log(error, error?.response?.data);
    if (error?.toString()?.includes("timeout of")) {
      // refConfirmBottom.current &&
      //   refConfirmBottom.current.open({
      //     type: 'error',
      //     title: t('warning'),
      //     content: t('serverCannotRequestPleaseCheckNetwork'),
      //   });
      // } else if (error?.response?.status === 401) {
    } else {
      try {
        if (error.response.data) {
          return Promise.reject(error.response.data);
        }
      } catch (error) {
        // return Promise.reject("Anonymous");
      }
    }
    console.log(error, "error?");
    return Promise.reject(error);
  }
);

export const Method = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  OPTIONS: "options",
  HEAD: "head",
  PATCH: "patch",
};

export const getApiUrl = (origin?: "ai" | "file" | boolean) => {
  // const url = store.getState().application.HOST;
  if (origin == "file") return API_FILE; // "http://14.225.205.222:8800";
  // const domain = __DEV__ ? GLOBAL.request.HOST : GLOBAL.request.HOST;

  return API_URL;
  // return window.location.origin.includes("localhost:3000")
  //   ? "http://localhost:8800"
  //   : "http://14.225.205.222:8800";
};

export const getApiFileProduct = () => {
  return getApiUrl(true) + "/upload/public?path=";
  // return "https://datahub.ivirse.com/api";
};

export const getApiFile = () => {
  return getApiUrl(true) + "/upload/public?path=";
  // return "https://datahub.ivirse.com/api";
};

export const convertFileUrl = (url: string) => {
  if (!url) return url;
  if (["https://", "http://", "file://"].some((i) => url.startsWith?.(i)))
    return url;
  return getApiUrl("file") + "/file/" + url;
  // return "https://datahub.ivirse.com/api";
};
// export const getPrefixFile = () => {
//   return getApi;
// };

const clearUrlApi = (url) =>
  ["https://", "http://", "file://"].some((i) => url.startsWith(i))
    ? url
    : getApiUrl() + url;

const tag401: MutableRefObject<boolean> = createRef();
export const requestApi = async (
  url: string,
  data: any,
  {
    method = Method.GET,
    addHeaders = {},
    callback = (response) => response,
  }: any = {}
) => {
  try {
    console.log(url, "url", data);

    const clearUrl = clearUrlApi(url);

    const response = await client[method](
      ...(method === Method.GET
        ? [
            clearUrl,
            { params: data, headers: { ...requestHeaders, ...addHeaders } },
          ]
        : [clearUrl, data, { headers: { ...requestHeaders, ...addHeaders } }])
    );

    if (response.code === 401 && !tag401.current) {
      tag401.current = true;
      window.location.href = "/p/login";
      return;
    }

    return callback(response);
  } catch (e) {
    if (e?.code) {
      return e;
    }
    throw new Error(e);
  }
};

export const requestPage = (url: string, data: any, payload?: any) => {
  return requestApi(url, data, {
    ...(payload || {}),
    callback: (response) => {
      if (response.code === 200 || response.code === 0) {
        return response;
      } else {
        return Promise.reject(response.data);
      }
    },
  });
};

export const requestData = async (url: string, data: any, payload?: any) => {
  return requestApi(url, data, {
    ...(payload || {}),
    callback: (response) => {
      if (response.code === 200 || response.code === 0) {
        return response.data;
      } else {
        return Promise.reject(response);
      }
    },
  });
  // try {
  //   console.log(url, "url", data);
  //   // const url = store.getState().application.HOST + _url;
  //   const clearUrl = clearUrlApi(url);
  //   const response = await client[method](
  //     ...(method === Method.GET
  //       ? [clearUrl, { params: data, headers }]
  //       : [clearUrl, data, { headers }])
  //   );
  //   // console.log(response, "response+++++");

  //   if (response.code === 200 || response.code === 0) {
  //     return response.data;
  //   } else {
  //     // setTimeout(() => {
  //     //   InteractionManager.runAfterInteractions(() => {
  //     //     AppUtils.showError(response.message);
  //     //   });
  //     // }, 1000);
  //     return Promise.reject(response.data);
  //   }
  // } catch (e) {
  //   throw new Error(e.message || e?.toString());
  //   // return Promise.reject(e);
  //   // onError && onError(e);
  //   // AppUtils.showError(t('anErrorOccurred'));
  //   // handleError(e);
  //   // return {
  //   //   status: 'ERROR',
  //   //   message: e.message,
  //   // }
  // }
};
