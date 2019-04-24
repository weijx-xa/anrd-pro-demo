import request from '../utils/request';

export async function queryTaskList(params) {
  return request('/task/showOnlineList', {
    method: 'POST',
    data: params,
  });
}

export function queryDepartList() {
  return request('/public/index.php/index/login/depart_list');
}

export function queryUpdateTask(params) {
  return request('/task/updateTask', {
    method: 'POST',
    data: params,
  });
}
