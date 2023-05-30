import { InteractionType } from '@azure/msal-browser';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { Client } from '@microsoft/microsoft-graph-client';
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
      scopes: [
        'user.read',
        'profile',
        'openid',
        'Calendars.Read.Shared',
        'Calendars.Read',
      ],
      account: undefined,
      authProviderOptions: undefined,
      authProvider: undefined,
      graphClient: undefined,
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
    msalInstanceLogout(state) {
      state.msalInstance.logoutPopup();
    },
    setAuthProviderOptions(state) {
      state.authProviderOptions = {
        account: state.account,
        interactionType: InteractionType.Silent,
        scopes: state.scopes,
      };
    },
    setAuthProvider(state) {
      state.authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
        state.msalInstance,
        state.authProviderOptions
      );
    },
    setGraphClient(state) {
      state.graphClient = Client.initWithMiddleware({
        authProvider: state.authProvider,
      });
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
    msalInstanceLogout(context) {
      context.commit('msalInstanceLogout');
    },
    setAuthProviderOptions(context) {
      context.commit('setAuthProviderOptions');
    },
    setAuthProvider(context) {
      context.commit('setAuthProvider');
    },
    setGraphClient(context) {
      context.commit('setGraphClient');
    },
  },
  getters: {
    getMsalConfig(state) {
      return state.msalConfig;
    },
    getMsalInstance(state) {
      return state.msalInstance;
    },
    getScopes(state) {
      return state.scopes;
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
    getGraphClient(state) {
      return state.graphClient;
    },
  },
});

export default store;
