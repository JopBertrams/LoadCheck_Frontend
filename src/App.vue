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

useDark({
  storageKey: 'loadcheck-color-scheme',
});

export default {
  name: 'App',
  components: {
    Header,
    Footer,
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
