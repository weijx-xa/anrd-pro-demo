// import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryMtype(params) {
  return request('/basic/get_mtype', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function other() {
  return request('/api/notices');
}
