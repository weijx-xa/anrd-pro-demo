import department from './geographic/department.json';

const rules = [
  {
    id: 1,
    key: 1,
    app: 'wcgjpc',
    name: 'dashboard/analysis',
    title: '图表分析',
    type: 1,
    status: 1,
    condition: '',
  },
  {
    id: 2,
    key: 2,
    app: 'wcgjpc',
    name: 'dashboard/table',
    title: '电子表格',
    type: 1,
    status: 1,
    condition: '',
  },
  {
    id: 3,
    key: 3,
    app: 'wcgjpc',
    name: 'keeper/mtype',
    title: '材料科目管理',
    type: 1,
    status: 1,
    condition: '',
  },
  {
    id: 4,
    key: 4,
    app: 'wcgjpc',
    name: 'keeper/citykeeper',
    title: '地市库存',
    type: 1,
    status: 0,
    condition: '',
  },
  {
    id: 5,
    key: 5,
    app: 'wcgjpc',
    name: 'dashboard/table',
    title: '县区库存',
    type: 1,
    status: 1,
    condition: '',
  },
];

const adminGroup = [
  {
    id: 1,
    title: '超级管理员',
    domain: 4,
    status: 1,
  },
  {
    id: 2,
    title: '管理员',
    domain: 4,
    status: 1,
  },
  {
    id: 3,
    title: '地市库管员',
    domain: 2,
    status: 1,
  },
  {
    id: 4,
    title: '县区库管员',
    domain: 2,
    status: 1,
  },
  {
    id: 5,
    title: '班组长',
    domain: 2,
    status: 1,
  },
];

function getGroup(req, res) {
  return res.json(adminGroup);
}

function getRules(req, res) {
  return res.json(rules);
}

function getDepList(req, res) {
  return res.json(department);
}

export default {
  'POST /admin/get_admin_group': getGroup,
  'POST /admin/post_dep_list': getDepList,
  'POST /admin/get_rules': getRules,
};
