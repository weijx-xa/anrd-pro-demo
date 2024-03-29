import {
  getQuestList,
  postDepList,
  getQuestInfo,
  postUserList,
  postFinalSubmit,
  getAnswerList,
  getAnswerInfos,
} from '@/services/hwj';
import moment from 'moment';

export default {
  namespace: 'hwj',

  state: {
    questList: [],
    questInfo: {
      CountyId: [],
    },
    depList: [],
    colName: [],
    sendUsers: [],
    selectedUserIds: [],
    answerList: [],
    answerInfo: {},
  },

  effects: {
    *queryQuestList({ payload }, { call, put }) {
      const response = yield call(getQuestList, payload);
      yield put({
        type: 'saveQuestList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *queryAnswerInfo({ payload, callback }, { call }) {
      const response = yield call(getAnswerInfos, { qid: payload.activity });
      if (typeof response.data !== 'undefined' && Array.isArray(response.data)) {
        // 有返回试卷
        const answerInfo = response.data;
        const answer = JSON.parse(payload.answer);
        const contents = Object.keys(answer).map(qid => {
          const thisQuest = answerInfo.find(item => item.indexOf(`${qid}:`) !== -1);
          const thisAnswer = () => {
            // 没有答案不是选择题
            if (!answerInfo.some(item => item.indexOf(`${qid}#1`) !== -1)) return answer[qid];
            // 是不是多选
            const answers = answer[qid].split(',');
            if (answers.length === 1) {
              return answerInfo.find(item => item.indexOf(`${qid}#${answer[qid]}:`) !== -1);
            }
            return answers
              .map(aid => answerInfo.find(item2 => item2.indexOf(`${qid}#${aid}:`) !== -1))
              .join(',');
          };
          return `${thisQuest}${thisAnswer()}`;
        });
        callback(contents);
      }
    },
    *queryQuestInfo({ payload, callback }, { call, put }) {
      const response = yield call(getQuestInfo, payload);
      yield put({
        type: 'saveQuestInfo',
        payload: {
          questInfo: {
            qid: response.qid,
            userid: typeof response.userid === 'undefined' ? '' : response.userid,
            username: typeof response.username === 'undefined' ? '' : response.username,
            created_at:
              typeof response.created_at === 'undefined'
                ? ''
                : moment(response.created_at).format('YYYY-MM-DD HH:mm:ss'),
            updated_at:
              typeof response.updated_at === 'undefined'
                ? ''
                : moment(response.updated_at).format('YYYY-MM-DD HH:mm:ss'),
            CountyId: typeof response.CountyId === 'undefined' ? [] : JSON.parse(response.CountyId),
            selectedUserIds:
              typeof response.selectedUserIds === 'undefined'
                ? []
                : JSON.parse(response.selectedUserIds),
            submittedUserIds:
              typeof response.submittedUserIds === 'undefined'
                ? []
                : JSON.parse(response.submittedUserIds),
            业务条线: typeof response.业务条线 === 'undefined' ? [] : JSON.parse(response.业务条线),
            在职状态: typeof response.在职状态 === 'undefined' ? [] : JSON.parse(response.在职状态),
            学历: typeof response.学历 === 'undefined' ? [] : JSON.parse(response.学历),
            性别: typeof response.性别 === 'undefined' ? [] : JSON.parse(response.性别),
            政治面貌: typeof response.政治面貌 === 'undefined' ? [] : JSON.parse(response.政治面貌),
            用工方式: typeof response.用工方式 === 'undefined' ? [] : JSON.parse(response.用工方式),
            维护专业: typeof response.维护专业 === 'undefined' ? [] : JSON.parse(response.维护专业),
            职务: typeof response.职务 === 'undefined' ? [] : JSON.parse(response.职务),
          },
          sendUsers: typeof response.sendUsers === 'undefined' ? [] : response.sendUsers,
        },
      });
      const step = typeof response.userid === 'undefined' ? 1 : 2;
      callback(response.qid, step);
    },
    // *queryColName({ payload }, { call }) {
    //   yield call(getColName, payload);
    // },
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
    *queryAnswerList({ payload }, { call, put }) {
      const response = yield call(getAnswerList, payload);
      yield put({
        type: 'saveAnswerList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    saveQuestList(state, { payload }) {
      return {
        ...state,
        questList: payload,
      };
    },
    saveAnswerList(state, { payload }) {
      return {
        ...state,
        answerList: payload,
      };
    },
    saveQuestInfo(state, { payload }) {
      return {
        ...state,
        questInfo: payload.questInfo,
        sendUsers: payload.sendUsers,
        selectedUserIds: payload.questInfo.selectedUserIds,
      };
    },
    saveAnswerInfo(state, { payload }) {
      return {
        ...state,
        answerInfo: { ...state.answerInfo, [payload.qid]: payload.data },
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
