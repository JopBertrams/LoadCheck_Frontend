<template>
  <div class="content">
    <h1>LoadCheck</h1>
    <div id="login">
      <button @click="SignIn()">Login with Microsoft Account</button>
      <VTooltip
        :placement="'bottom'"
        :triggers="isMobile ? ['click'] : ['hover']"
        class="tooltip"
      >
        <font-awesome-icon icon="fa-solid fa-circle-info" />
        <template #popper="{ hide }">
          <div id="tooltip-info">
            <p>
              LoadCheck uses your Belgium Campus <br />
              Microsoft Account as authentication <br />
              to retrieve classes in your calendar.
            </p>
            <button v-if="isMobile" @click="hide()">OK</button>
          </div>
        </template>
      </VTooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      // TODO: Add check to see if user is on mobile
      isMobile: false,
    };
  },
  methods: {
    async SignIn() {
      await this.$store.state.msalInstance
        .loginPopup({
          scopes: this.$store.getters.getScopes,
        })
        .then(async () => {
          const myAccounts = this.$store.state.msalInstance.getAllAccounts();
          this.$store.state.account = myAccounts[0];
          this.$store.dispatch('setAuthProviderOptions');
          this.$store.dispatch('setAuthProvider');
          this.$store.dispatch('setGraphClient');

          let user = await this.$store.getters.getGraphClient
            .api('/me/?$select=id,department,mailNickname')
            .get();

          // Choosing user department for development purposes
          if (process.env.NODE_ENV == 'development') {
            let department = prompt(
              'Please enter department (Student/Lecturer/Other):'
            );
            if (department == null || department == '') {
              console.info(
                "No department entered. User's own department will be used."
              );
            } else {
              user.department = department;
            }
          }

          this.$store.dispatch('setUser', user);

          if (user.department == 'Student') {
            this.$router.push({ name: 'student', params: { id: user.id } });
          } else if (user.department == 'Lecturer') {
            this.$router.push({ name: 'dashboard' });
          } else {
            this.$router.push({ name: '403' });
          }
        })
        .catch((error) => {
          console.error(`error during authentication: ${error}`);
        });
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-family: 'Bebas Neue';
  font-size: 4rem;
}

#login {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
}

#login button {
  background-color: var(--BC-Blue);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

#login button:hover {
  background-color: #24aea7;
}

#login .tooltip {
  margin-left: 2rem;
}

#login svg {
  color: var(--BC-Pink);
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
}

#login svg:hover {
  color: #65002f;
}

#tooltip-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#tooltip-info p {
  color: white;
  text-align: center;
}

#tooltip-info button {
  background-color: var(--BC-Blue);
  color: white;
  border: none;
  padding: 0.4rem;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
</style>
