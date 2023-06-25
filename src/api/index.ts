/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-25 15:11:44
 */
import { ApiBase } from "./config";

export function getData() {
  // return getViewInitData("/blogApi/article?total=10&page=1&pageSize=16");
  return fetch(ApiBase + "/blogApi/article?total=10&page=1&pageSize=16", {
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
  return fetch(ApiBase + "/blogApi/labels/", {
    headers: { Accept: "application/json" },
  });
}
