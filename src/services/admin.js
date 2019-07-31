// import { stringify } from 'qs';
import request from '../utils/request';

export async function queryAdminGroup(params) {
  return request('/admin/get_admin_group', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryRules(params) {
  return request('/admin/get_rules', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
