<template>
  <div>
    <h1>Page for students</h1>
    <button @click="SignOut()">Log out</button>
  </div>
</template>

<script>
export default {
  name: 'Student',
  methods: {
    async SignOut() {
      this.$store
        .dispatch('msalInstanceLogout')
        .then(() => {
          this.$store.dispatch('setAccount', undefined);
          this.$router.push({ name: 'login' });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

button {
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: var(--BC-Blue);
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
}
</style>
