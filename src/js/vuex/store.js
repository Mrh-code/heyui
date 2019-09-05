import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {//声明变量，在组件中可直接使用
    User: {},
    msgCount: {
      messages: 5
    },
    siderCollapsed: false
  },
  mutations: {
    updateAccount(state, data) {
      state.User = data;
    },
    updateSiderCollapse(state, isShow) {//边栏的数据和是否展示
      setTimeout(() => {
        G.trigger('page_resize');
      }, 600)
      state.siderCollapsed = isShow;
    },
    updateMsgCount(state, data) {
      state.msgCount = data;
    }
  },
  actions: {
    updateAccount(context, data) {
      context.commit('updateAccount', data);
    },
    updateSiderCollapse(context, data) {
      context.commit('updateSiderCollapse', data);
    },
    updateMsgCount(context, data) {
      context.commit('updateMsgCount', data);
    }
  },
  getters: {
    account: state => {
      return state.User;
    },
    siderCollapsed: state => {
      return state.siderCollapsed;
    },
    msgCount: state => {
      return state.msgCount;
    }
  }
});
