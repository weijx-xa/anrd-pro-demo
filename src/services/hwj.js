import request from '@/utils/request';
import { stringify } from 'qs';

export async function getColName() {
  return request('/hwj/colName');
}

export async function getQuestList() {
  return request(`/hwj/getuserq`);
}

export async function getQuestInfo(params) {
  return request(`/hwj/questByQid?${stringify(params)}`);
}

export async function postDepList() {
  return request(`/hwj/postDepList`);
}

export async function postUserList(params) {
  return request('/hwj/postUserList', {
    method: 'POST',
    data: params,
  });
}

export async function postFinalSubmit(params) {
  return request('/hwj/postFinalSubmit', {
    method: 'POST',
    data: params,
  });
}

export async function getAnswerList() {
  return request(`/hwj/showAnswerList`);
}
