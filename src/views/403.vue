<template>
  <div class="background">
    <div class="error">
      <div class="title">
        <span class="letter">4</span>
        <span class="letter">0</span>
        <span class="letter">3</span>
      </div>
      <div class="subtitle">
        <span class="letter">N</span>
        <span class="letter">o</span>
        <span class="letter">&nbsp;</span>
        <span class="letter">A</span>
        <span class="letter">c</span>
        <span class="letter">c</span>
        <span class="letter">e</span>
        <span class="letter">s</span>
        <span class="letter">s</span>
      </div>
      <div class="explanation">
        <p>
          Oops! Looks like you stumbled upon a dark corner.<br />
          Access to LoadCheck is limited to students and lecturers.
        </p>
        <p>
          If you believe you should have access to LoadCheck, please
          double-check you're logged in with the correct account. If you're
          having trouble, contact the system administrator for assistance.
        </p>
        <button @click="SignOut()">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '403',
  methods: {
    async SignOut() {
      this.$store
        .dispatch('msalInstanceLogout')
        .then(() => {
          this.$store.dispatch('setAccount', undefined);
          this.$router.push({ name: 'login' });
        })
        .catch((error) => {
          console.error(`error during logout: ${error}`);
        });
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Londrina+Outline&display=swap');

.background {
  background: radial-gradient(#303030, #1f1f1f);
  height: 100vh;
}

.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  height: 100vh;
}

.title {
  font-family: 'Londrina Outline', cursive;
  font-size: 6rem;
  font-weight: 700;
  text-align: center;
  text-shadow: 0 0 5px var(--BC-Pink), 0 0 10px var(--BC-Pink),
    0 0 20px var(--BC-Pink), 0 0 40px var(--BC-Pink), 0 0 80px var(--BC-Pink),
    0 0 100px var(--BC-Pink), 0 0 120px var(--BC-Pink);
  animation: blink 3s infinite linear alternate;
}

.title > .letter {
  color: #fff;
  margin: 0 9px;
}

.subtitle {
  font-family: 'Open Sans', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  padding: 8px 16px;
  text-align: center;
  text-shadow: var(--BC-Blue) 1px 1px 10px;
  animation: border-flicker 6s ease-in-out infinite alternate both;
}

.subtitle > .letter {
  color: #d6d1e8;
  margin: 0 20px;
}

.subtitle > :nth-child(1) {
  animation: flicker 6s ease-in-out 3.34s infinite alternate both;
}

.subtitle > :nth-child(2) {
  animation: flicker 6s ease-in-out 28.72s infinite alternate both;
}

.subtitle > :nth-child(4) {
  animation: flicker 6s ease-in-out 13.46s infinite alternate both;
}

.subtitle > :nth-child(5) {
  animation: flicker 6s ease-in-out 5.45s infinite alternate both;
}

.subtitle > :nth-child(6) {
  animation: flicker 6s ease-in-out 17.75s infinite alternate both;
}

.subtitle > :nth-child(7) {
  animation: flicker 6s ease-in-out 9.56s infinite alternate both;
}

.subtitle > :nth-child(8) {
  animation: flicker 6s ease-in-out 23.12s infinite alternate both;
}

.subtitle > :nth-child(9) {
  animation: flicker 6s ease-in-out 30.86s infinite alternate both;
}

.explanation {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  max-width: 600px;
}

.explanation p:first-of-type {
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
}

.explanation p {
  margin-top: 1rem;
  color: #fff;
  font-size: 14px;
  text-align: center;
}

button {
  margin-top: 2rem;
  background-color: var(--BC-Blue);
  color: #fff;
  border: none;
  padding: 0.5rem 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

button:hover {
  background-color: #1a7e79;
}

@keyframes blink {
  60%,
  70%,
  79% {
    opacity: 1;
  }

  65%,
  67%,
  76%,
  78% {
    opacity: 0.2;
  }

  66%,
  69%,
  77% {
    opacity: 0.8;
  }
}

@keyframes flicker {
  0%,
  2%,
  35%,
  37%,
  39%,
  41%,
  100% {
    opacity: 1;
  }
  1%,
  3%,
  34%,
  36%,
  38%,
  40% {
    opacity: 0;
  }
}

@keyframes border-flicker {
  0%,
  2%,
  4%,
  6%,
  33%,
  37%,
  39%,
  41%,
  100% {
    border: 2px solid white;
    box-shadow: var(--BC-Blue) 0px 0px 10px, inset var(--BC-Blue) 2px 2px 10px;
  }
  1%,
  3%,
  5%,
  34%,
  36%,
  38%,
  40% {
    border-color: transparent;
    box-shadow: unset;
  }
}
</style>
