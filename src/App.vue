<template>
  <div class="container">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { useDark } from '@vueuse/core';
import { PublicClientApplication } from '@azure/msal-browser';

useDark({
  storageKey: 'loadcheck-color-scheme',
});

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  async created() {
    await this.$store.dispatch(
      'setMsalInstance',
      new PublicClientApplication(this.$store.getters.getMsalConfig)
    );

    if (
      this.$store.getters.isAuthenticated &&
      this.$store.getters.getGraphClient == undefined
    ) {
      this.$store.dispatch('setAuthProviderOptions');
      this.$store.dispatch('setAuthProvider');
      this.$store.dispatch('setGraphClient');
    }

    // NOT NECESSARY?

    // this.$store.state.msalInstance
    //   .handleRedirectPromise()
    //   .then((tokenResponse) => {
    //     if (tokenResponse !== null) {
    //       this.$store.state.msalInstance.setActiveAccount(
    //         tokenResponse.account
    //       );
    //     }
    //   });
  },
  mounted() {
    const accounts = this.$store.getters.getAllMsalAccounts;
    if (accounts.length > 0) {
      this.$store.dispatch('setMsalInstanceActiveAccount', accounts[0]);
      this.$store.dispatch('setAccount', accounts[0]);
    }
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
</style>
