<template>
  <div class="content">
    <Sidebar isSidebarActive="students" />
    <div class="main">
      <div id="search_filters">
        <div id="search">
          <p>Search on name</p>
          <input type="text" />
        </div>
        <div id="filters">
          <div id="filter">
            <font-awesome-icon icon="fa-solid fa-filter" />
          </div>
          <div id="sort">
            <font-awesome-icon icon="fa-solid fa-arrow-up-wide-short" />
          </div>
        </div>
      </div>
      <div id="students">
        <div id="student">
          <p id="name">John Doe</p>
          <div id="next_loadshedding">
            <p>Next Loadshedding</p>
            <p>09:00 - 11:00</p>
          </div>
          <div id="loadshedding_during_class">
            <p>Loadshedding during class</p>
            <p>Yes</p>
          </div>
        </div>
        <div id="student">
          <p id="name">John Doe</p>
          <div id="next_loadshedding">
            <p>Next Loadshedding</p>
            <p>09:00 - 11:00</p>
          </div>
          <div id="loadshedding_during_class">
            <p>Loadshedding during class</p>
            <p>Yes</p>
          </div>
        </div>
        <div id="student">
          <p id="name">John Doe</p>
          <div id="next_loadshedding">
            <p>Next Loadshedding</p>
            <p>13:00 - 15:00</p>
          </div>
          <div id="loadshedding_during_class">
            <p>Loadshedding during class</p>
            <p class="no">No</p>
          </div>
        </div>
        <div id="student">
          <p id="name">John Doe</p>
          <div id="next_loadshedding">
            <p>Next Loadshedding</p>
            <p>13:00 - 15:00</p>
          </div>
          <div id="loadshedding_during_class">
            <p>Loadshedding during class</p>
            <p class="no">No</p>
          </div>
        </div>
        <div id="student">
          <p id="name">John Doe</p>
          <div id="next_loadshedding">
            <p>Next Loadshedding</p>
            <p>21:00 - 23:00</p>
          </div>
          <div id="loadshedding_during_class">
            <p>Loadshedding during class</p>
            <p class="no">No</p>
          </div>
        </div>
        <div id="student">
          <p id="name">John Doe</p>
          <div id="next_loadshedding">
            <p>Next Loadshedding</p>
            <p>09:00 - 11:00</p>
          </div>
          <div id="loadshedding_during_class">
            <p>Loadshedding during class</p>
            <p>Yes</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';

export default {
  name: 'Students',
  components: {
    Sidebar,
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
}

.main {
  padding: 2rem;
  width: 100%;
}

#search_filters {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 2rem;
  align-items: center;
}

#search_filters #search {
  display: flex;
  flex-direction: column;
}

#search_filters #search p {
  margin-bottom: 0.5rem;
}

#search_filters #search input {
  width: 20rem;
  height: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  padding: 0.5rem;
}

#search_filters #filters {
  display: flex;
  flex-direction: row;
  margin-left: 2rem;
  height: 100%;
}

#search_filters #filters #filter {
  margin-right: 1rem;
}

#search_filters #filters svg {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  color: var(--text-color);
}

#students {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}

#students #student {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--card-color);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
}

#students #student:hover {
  cursor: default;
  background-color: var(--card-hover-color);
}

#students #student #name {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

#students #student #next_loadshedding p:last-child {
  margin-bottom: 0.5rem;
}

#students #student #loadshedding_during_class p:last-child {
  margin-bottom: 0.5rem;
  color: #ff0000;
}

#students #student #loadshedding_during_class p.no {
  color: #00ff00;
}
</style>
