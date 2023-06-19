/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2023-06-19 21:38:39
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2023-06-19 22:08:42
 * @FilePath: \qwik-app\src\api\axios.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import { ApiBase } from "./config";
import axios from "axios";


 async function getViewInitData(
  url: string,
  method: string = "get",
  params: object = {}
) {
  let state:any =  null;

  if (!state) {
    let res: any = null;
    switch (method) {
      case "get" || "GET":
        res = await axios.get(ApiBase + url);
        break;
      case "post" || "POST":
        res = await axios.post(ApiBase + url, params);
        break;
    }

    if (res.status == 200 && res.data.code == 200) {
      // 成功
      state = res.data.data;
    } else {
      if (!import.meta.env.SSR) {
        // 客户端报错提示
      } else {
        // 服务端打印错误日志
        console.log(res.data.message);
      }
    }
   
  }

  return state;
}

export  {
  getViewInitData
}
