<template>
  <div class="container">
    <Header v-if="this.$route.name !== '403'" />
    <router-view />
    <Footer v-if="this.$route.name !== '403'" />
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
  mounted() {},
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
</style>
