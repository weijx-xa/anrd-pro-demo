import { queryMtype } from '@/services/basic';

export default {
  namespace: 'basic',

  state: {
    mtype: [],
    thisMaterial: {},
    thisPerson: {},
  },

  effects: {
    *fetchMtype({ payload }, { call, put }) {
      const response = yield call(queryMtype, payload);
      yield put({
        type: 'saveMtype',
        payload: response,
      });
    },
    // *add({ payload, callback }, { call, put }) {
    //   const response = yield call(addRule, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
    // *remove({ payload, callback }, { call, put }) {
    //   const response = yield call(removeRule, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
  },

  reducers: {
    saveMtype(state, { payload }) {
      return {
        ...state,
        mtype: payload,
      };
    },
    saveThisMaterial(state, { payload }) {
      return {
        ...state,
        thisMaterial: payload,
      };
    },
  },
};
