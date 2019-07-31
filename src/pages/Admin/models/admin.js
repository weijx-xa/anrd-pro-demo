import { queryAdminGroup, queryRules } from '@/services/admin';

export default {
  namespace: 'admin',

  state: {
    userGroup: [],
    rules: [],
    visible: false,
    showModal: '',
    thisTitle: '',
  },

  effects: {
    *fetchUserGroup(_, { call, put }) {
      const response = yield call(queryAdminGroup);
      yield put({
        type: 'saveUserGroup',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchRules(_, { call, put }) {
      const response = yield call(queryRules);
      console.log(response);
      yield put({
        type: 'saveRules',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *changeModal({ payload }, { put }) {
      yield put({
        type: 'changeModalState',
        payload,
      });
    },
  },

  reducers: {
    saveUserGroup(state, { payload }) {
      return {
        ...state,
        userGroup: payload,
      };
    },
    saveRules(state, { payload }) {
      return {
        ...state,
        rules: payload,
      };
    },
    changeModalState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
