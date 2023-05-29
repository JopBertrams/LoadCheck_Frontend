<template>
  <div class="menu-toggle">
    <div class="hamburger">
      <span></span>
    </div>
  </div>
  <aside class="sidebar">
    <h3>LoadCheck</h3>
    <nav class="menu">
      <router-link
        to="/"
        class="menu-item"
        v-bind:class="isSidebarActive == 'dashboard' ? 'is-active' : ''"
        >Dashboard</router-link
      >
      <router-link
        to="/classes"
        class="menu-item"
        v-bind:class="isSidebarActive == 'classes' ? 'is-active' : ''"
        >All classes</router-link
      >
      <router-link
        to="/students"
        class="menu-item"
        v-bind:class="isSidebarActive == 'students' ? 'is-active' : ''"
        >All students</router-link
      >
      <router-link
        to="/settings"
        class="menu-item"
        v-bind:class="isSidebarActive == 'settings' ? 'is-active' : ''"
        >Settings</router-link
      >
    </nav>
    <button id="logout" @click="SignOut()">Logout</button>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    isSidebarActive: String,
  },
  mounted() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('is-active');
      sidebar.classList.toggle('is-active');
    });
  },
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
/*#region menu-toggle*/
.menu-toggle {
  display: none;
  position: fixed;
  top: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 99px;
  background-color: #353635;
  cursor: pointer;
}

.menu-toggle .hamburger {
  position: relative;
  top: calc(50% - 2px);
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
}

.menu-toggle .hamburger span,
.menu-toggle .hamburger span::before,
.menu-toggle .hamburger span::after {
  display: block;
  position: absolute;
  width: 100%;
  height: 4px;
  border-radius: 99px;
  background-color: #fff;
  transition-duration: 0.25s;
}

.menu-toggle .hamburger span::before,
.menu-toggle .hamburger span::after {
  content: '';
}

.menu-toggle .hamburger span::before {
  top: -10px;
}

.menu-toggle .hamburger span::after {
  top: 10px;
}

.menu-toggle.is-active .hamburger span {
  transform: rotate(45deg);
}

.menu-toggle.is-active .hamburger span::before {
  top: 0;
  transform: rotate(90deg);
}

.menu-toggle.is-active .hamburger span::after {
  top: 0;
  transform: rotate(90deg);
}
/*#endregion */

.sidebar {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 250px;
  padding: 2rem 1rem;
  background-color: var(--BC-Gray);
  height: 100%;
  box-sizing: border-box;
  z-index: 1;
}

.sidebar h3 {
  color: #fff;
  font-family: 'Bebas Neue';
  font-size: 2.5rem;
  margin-bottom: 0.5em;
  text-align: center;
}

.sidebar .menu {
  margin: 0 -1rem;
}

.sidebar .menu .menu-item {
  display: block;
  padding: 1em;
  margin-left: 0.5em;
  color: #fff;
  text-decoration: none;
  transition: 0.2s linear;
  font-size: 1.5em;
}

.sidebar .menu .menu-item:hover,
.sidebar .menu .menu-item.is-active {
  color: var(--BC-Blue);
}

.sidebar .menu .menu-item.is-active {
  font-family: 'AvantGarde-Demi';
  border-radius: 20px 0 0 20px;
  background-color: var(--background-color);
}

#logout {
  margin-top: 2em;
  padding: 0.3em 0.7em;
  border: none;
  border-radius: 10px;
  background-color: var(--BC-Blue);
  color: #fff;
  font-family: 'Bebas Neue';
  font-size: 1.5em;
  cursor: pointer;
  transition: 0.2s linear;
}

#logout:hover {
  background-color: #209791;
}

@media (max-width: 1024px) {
  .sidebar {
    max-width: 200px;
  }
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }
  .sidebar {
    position: fixed;
    top: 0;
    left: -550px;
    height: 100vh;
    width: 100%;
    max-width: 200px;
    transition: 0.2s linear;
  }
  .sidebar.is-active {
    left: 0;
  }

  .sidebar h3 {
    font-size: 2rem;
  }
}
</style>
