import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      msalConfig: {
        auth: {
          clientId: import.meta.env.VITE_MS_CLIENT_ID,
          authority: import.meta.env.VITE_MS_AUTHORITY,
        },
        cache: {
          cacheLocation: 'localStorage',
        },
      },
      msalInstance: undefined,
      account: undefined,
      accessToken: '',
    };
  },
  mutations: {
    setMsalInstance(state, msalInstance) {
      state.msalInstance = msalInstance;
    },
    setMsalInstanceActiveAccount(state, account) {
      state.msalInstance.setActiveAccount(account);
    },
    setAccount(state, account) {
      state.account = account;
    },
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    msalInstanceLogout(state) {
      state.msalInstance.logoutPopup();
    },
  },
  actions: {
    setMsalInstance(context, msalInstance) {
      context.commit('setMsalInstance', msalInstance);
    },
    setMsalInstanceActiveAccount(context, account) {
      context.commit('setMsalInstanceActiveAccount', account);
    },
    setAccount(context, account) {
      context.commit('setAccount', account);
    },
    setAccessToken(context, token) {
      context.commit('setAccessToken', token);
    },
    msalInstanceLogout(context) {
      context.commit('msalInstanceLogout');
    },
  },
  getters: {
    getMsalConfig(state) {
      return state.msalConfig;
    },
    isAuthenticated(state) {
      return state.account !== undefined;
    },
    getAllMsalAccounts(state) {
      return state.msalInstance.getAllAccounts();
    },
    getAccount(state) {
      return state.account;
    },
  },
});

export default store;
