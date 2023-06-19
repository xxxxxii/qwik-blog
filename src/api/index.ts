import axios from 'axios';
import {getViewInitData} from './axios'
import { ApiBase } from "./config";

export function getData() {
    // return getViewInitData("/blogApi/article?total=10&page=1&pageSize=16");
return  fetch('https://blogyl.xyz/blogApi/article?total=10&page=1&pageSize=16', {
    headers: { Accept: 'application/json' },
  });
    return axios.get(ApiBase + "/blogApi/article?total=10&page=1&pageSize=16")
  }
  
  export function getClass() {
    return getViewInitData("/blogApi/group");
  }
  
  export function getArticleDetils(id: string) {
    return getViewInitData("/blogApi/article/" + id);
  }

