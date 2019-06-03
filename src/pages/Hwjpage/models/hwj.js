import { getQuestList, postDepList, getColName, postUserList, postFinalSubmit } from '@/services/hwj';

export default {
  namespace: 'hwj',

  state: {
    questList: [],
    depList: [],
    colName: [],
    sendUsers: [],
    selectedUserIds: [],
  },

  effects: {
    *queryQuestList({ payload }, { call, put }) {
      const response = yield call(getQuestList, payload);
      yield put({
        type: 'saveQuestList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *queryColName({ payload }, { call }) {
      yield call(getColName, payload);
    },
    *queryDepList({ payload }, { call, put }) {
      const response = yield call(postDepList, payload);
      yield put({
        type: 'saveDepList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *queryUserList({ payload, callback }, { call, put }) {
      const response = yield call(postUserList, payload);
      yield put({
        type: 'saveSendUsers',
        payload: Array.isArray(response) ? response : [],
      });
      callback();
    },
    *finalSubmit({ payload, callback }, { call, put }) {
      const response = yield call(postFinalSubmit, payload);
      yield put({ type: 'resetPage' });
      if (response.errcode === 0) {
        callback();
      }
    },
  },

  reducers: {
    saveQuestList(state, { payload }) {
      return {
        ...state,
        questList: payload,
      };
    },
    saveDepList(state, { payload }) {
      return {
        ...state,
        depList: payload,
      };
    },
    saveColName(state, { payload }) {
      return {
        ...state,
        colName: payload,
      };
    },
    saveSendUsers(state, { payload }) {
      const selectedUserIds = payload.map(item => item.id);
      return {
        ...state,
        sendUsers: payload,
        selectedUserIds,
      };
    },
    addSendUsers(state, { payload }) {
      const isRepeat = state.selectedUserIds.some(item => item === payload.id);
      if (isRepeat) return state;
      return {
        ...state,
        sendUsers: [payload, ...state.sendUsers],
        selectedUserIds: [payload.id, ...state.selectedUserIds],
      };
    },
    saveUserIds(state, { payload }) {
      return {
        ...state,
        selectedUserIds: payload,
      };
    },
    resetPage(state) {
      return {
        ...state,
        sendUsers: [],
        selectedUserIds: [],
      };
    },
  },
};
