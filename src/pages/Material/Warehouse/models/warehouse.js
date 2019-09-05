import { routerRedux } from 'dva/router';
// import { message } from 'antd';
import { fakeSubmitForm } from '@/services/api';

export default {
  namespace: 'warehouse',

  state: {
    excelData: [],
    step: 0,
  },

  effects: {
    *submitForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      // 上传成功
      yield put({
        type: 'chengeStep',
        payload: 2,
      });
      yield put(routerRedux.push('/material/excelImport/result'));
    },
  },

  reducers: {
    saveExcelData(state, { payload }) {
      return {
        ...state,
        excelData: payload,
      };
    },
    chengeStep(state, { payload }) {
      return {
        ...state,
        step: payload,
      };
    },
  },
};
