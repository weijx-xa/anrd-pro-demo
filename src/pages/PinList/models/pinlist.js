import { queryPinList } from '@/services/api';

export default {
  namespace: 'pinlist',

  state: {
    list: [],
  },

  effects: {
    *fetchPinList({ payload }, { call, put }) {
      const response = yield call(queryPinList, payload);
      yield put({
        type: 'savePinList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    savePinList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
