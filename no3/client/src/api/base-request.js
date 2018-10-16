import Axios from 'axios';
import {Logger} from '@/utils/logger'
export const baseURL = 'http://localhost:3000/rest';

const _instance = Axios.create({
  baseURL: baseURL
});

export const HttpMethods = {
  GET: 'GET',
  POST: 'POST'
}

const requestFns = {
  [HttpMethods.GET]: async (path, params = {}) => {
    return _instance.get(path, {
      params: params
    });
  },
  [HttpMethods.POST]: async (path, params = {}) => {
    let data = new URLSearchParams();
    for (let key in params) {
      data.append(key, params[key]);
    }
    return _instance.post(path, data);
  }
}
const TAG = 'request';
export const request = async (path, params = {}, method = HttpMethods.GET) => {
  if (!HttpMethods.hasOwnProperty(method)) {
    method = HttpMethods.GET
  }
  let requestFn = requestFns[method];
   try {
     let res = await requestFn(path, params);
     Logger.info(TAG, `请求${path}得到`, res);
     let data = res.data;
     if (res.status === 200) {
       if (data && !data.errorMsg) {
         return data.data;
       } else {
         throw new Error(data ? data.errorMsg : '');
       }
     } else {
       throw new Error('网络错误：' + res.status);
     }
   } catch (e) {
     throw e;
   }
}

class ServerRespons {
  constructor() {
    this.data = '';
    this.result = 0;
    this.errorMsg = '';
  }
}
