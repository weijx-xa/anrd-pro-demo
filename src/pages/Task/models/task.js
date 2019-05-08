import { queryTaskList, queryDepartList, queryUpdateTask } from '@/services/task';
// import { queryChannelUrl, watchTaskList } from '../services/taskws'

export default {
  namespace: 'task',

  state: {
    tasklist: [],
    departlist: [],
  },

  subscriptions: {
    setup({ history, dispatch }) {
      if (history.location.pathname === '/task') {
        dispatch({ type: 'getDepartList' });
      }
    },
  },

  effects: {
    *getTaskList({ payload }, { call, put }) {
      const response = yield call(queryTaskList, { ...payload });
      if (response.errmsg === 'ok') {
        yield put({ type: 'saveTaskList', payload: response.data });
      }
    },
    *getDepartList(_, { call, put, select }) {
      const depList = yield select(state => state.task.departlist);
      if (depList.length > 0) return;
      const response = yield call(queryDepartList);
      yield put({ type: 'saveDepartList', payload: response });
    },
    *updateTask({ payload, callback }, { call, put }) {
      const response = yield call(queryUpdateTask, { ...payload });
      if (response.errcode === 0) yield put({ type: 'saveTaskList', payload: response.data });
      callback(response.errmsg);
    },
  },

  reducers: {
    saveTaskList(state, { payload }) {
      return {
        ...state,
        tasklist: payload,
      };
    },
    updateOnlineTaskList(state, { payload }) {
      const newData = [...state.tasklist];
      const index = newData.findIndex(item => item.id === payload.id);
      if (index === -1) {
        newData.push(payload);
      } else {
        newData[index] = payload;
      }
      console.log(newData);
      return {
        ...state,
        tasklist: newData,
      };
    },
    deleteOnlineTask(state, { payload }) {
      const newData = state.onlinetasklist.data.filter(item => item.id !== payload.id);
      return {
        ...state,
        onlinetasklist: {
          errmsg: state.onlinetasklist.errmsg,
          data: newData,
        },
      };
    },
    saveDepartList(state, { payload }) {
      return {
        ...state,
        departlist: payload,
      };
    },
  },
};
