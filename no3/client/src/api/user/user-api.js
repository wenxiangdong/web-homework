import {HttpMethods, request} from '@/api/base-request'

export const login = async (username, password) => {
  return request('/users/login', {username, password}, HttpMethods.POST);
}

export const signin = async (username, password) => {
  return request('/users/signin', {username, password}, HttpMethods.POST);
}
