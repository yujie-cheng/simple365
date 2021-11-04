export default function (name, params) {
    return new Promise((resolved, rejected) => {
      wx.cloud.callFunction({
        name,
        data: { ...params },
      })
      .then(res => {
        if(res.errMsg === "cloud.callFunction:ok" && res.result?.errMsg === "getOpenData:ok") {
          resolved(res.result.list[0])
        } else {
          rejected(res)
        }
      })
      .catch(err => rejected(err))
    })
  }