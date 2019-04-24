import { queryTaskList, queryDepartList, queryUpdateTask } from '@/services/task';
// import { queryChannelUrl, watchTaskList } from '../services/taskws'

export default {
  namespace: 'task',

  state: {
    logininfo: {},
    onlinetasklist: { data: [] },
    finshtasklist: { data: [] },
    departlist: {},
  },

  subscriptions: {
    // setup({ history, dispatch }) {
    //   if(history.location.pathname === '/task') {
    //     dispatch({type: 'getTaskList'});
    //   }
    // },
  },

  effects: {
    *getTaskList({ payload }, { call, put }) {
      const data = yield call(queryTaskList, { ...payload });
      if (data.errmsg === 'ok') {
        if (payload.by === 'online') {
          yield put({ type: 'saveOnlineTaskList', payload: data });
        } else {
          yield put({ type: 'saveFinshTaskList', payload: data });
        }
      }
    },
    *getDepartList(_, { call, put }) {
      const data = yield call(queryDepartList);
      if (data.errmsg === 'ok') {
        yield put({ type: 'saveDepartList', payload: data });
      }
    },
    *updateTask({ payload, callback }, { call, put }) {
      const data = yield call(queryUpdateTask, { ...payload });
      if (data.errcode === 0) yield put({ type: 'saveOnlineTaskList', payload: data });
      callback(data.errmsg);
    },
  },

  reducers: {
    saveOnlineTaskList(state, { payload }) {
      return {
        ...state,
        onlinetasklist: payload,
      };
    },
    updateOnlineTaskList(state, { payload }) {
      const newData = [...state.onlinetasklist.data];
      const target = newData.filter(item => item.id === payload.id);
      if (target.length > 0) {
        delete target[0].accept_time;
        delete target[0].deal_man;
        target[0].accept_time = payload.accept_time;
        target[0].deal_man = payload.deal_man;
      } else {
        newData.push(payload);
      }
      console.log(newData);
      return {
        ...state,
        onlinetasklist: {
          errmsg: state.onlinetasklist.errmsg,
          data: newData,
        },
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
    saveFinshTaskList(state, { payload }) {
      return {
        ...state,
        finshtasklist: payload,
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
