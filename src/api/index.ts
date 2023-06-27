/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-27 07:58:48
 */
import qs from "qs"
import { ApiBase } from "./config";

export function getData(params:any={page:1,pageSize:16}) {
  // return getViewInitData("/blogApi/article?total=10&page=1&pageSize=16");
  // 
  return fetch(ApiBase + "/blogApi/article?" + qs.stringify(params) , {
    headers: { Accept: "application/json" },
  });
}

export function getClass() {
  return fetch(ApiBase + "/blogApi/group", {
    headers: { Accept: "application/json" },
  });
}

export function getArticleDetils(id: string) {
  return fetch(ApiBase + "/blogApi/article/" + id, {
    headers: { Accept: "application/json" },
  });
}

export function getLabels() {
  return fetch(ApiBase + "/blogApi/label/", {
    headers: { Accept: "application/json" },
  });
}
