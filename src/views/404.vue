<template>
  <div>
    <font-awesome-icon icon="fa-solid fa-face-frown-open" />
    <h1>404</h1>
    <p>Page not found</p>
    <button>
      <router-link to="/">Go back</router-link>
    </button>
  </div>
</template>

<script>
export default {
  name: 'notFound',
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

svg {
  width: 5rem;
  height: 5rem;
  color: var(--BC-Pink);
}

h1 {
  font-family: 'Bebas Neue', cursive;
  font-size: 10rem;
  margin: 0;
}

p {
  font-family: 'Bebas Neue', cursive;
  font-size: 2rem;
  margin: 0;
}

button {
  background-color: var(--BC-Blue);
  color: white;
  border: none;
  padding: 1rem 2rem;
  margin-top: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

button:hover {
  background-color: #24aea7;
}

button a {
  color: white;
  text-decoration: none;
}
</style>
