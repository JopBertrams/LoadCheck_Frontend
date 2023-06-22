<template>
  <div class="content">
    <Sidebar isSidebarActive="classes" />
    <div class="main">
      <div id="search_filters">
        <div id="search">
          <p>Search on subject name</p>
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
      <div id="classes">
        <div id="class">
          <div id="subject">
            <span>AAA371</span>
          </div>
          <div id="lecturer">
            <font-awesome-icon icon="fa-solid fa-person-chalkboard" />
            <p>John Doe</p>
          </div>
          <div id="dates">
            <font-awesome-icon icon="fa-solid fa-calendar" />
            <p>15-5-2023 - 26-5-2023</p>
          </div>
          <div id="student_amount">
            <font-awesome-icon icon="fa-solid fa-users" />
            <p>32</p>
          </div>
          <div id="students_with_loadshedding">
            <font-awesome-layers>
              <font-awesome-icon icon="fa-solid fa-bolt" />
              <font-awesome-icon icon="fa-solid fa-slash" style="color: red" />
            </font-awesome-layers>
            <p>12</p>
          </div>
        </div>
        <div id="class">
          <div id="subject">
            <span>BBB371</span>
          </div>
          <div id="lecturer">
            <font-awesome-icon icon="fa-solid fa-person-chalkboard" />
            <p>John Doe</p>
          </div>
          <div id="dates">
            <font-awesome-icon icon="fa-solid fa-calendar" />
            <p>15-5-2023 - 26-5-2023</p>
          </div>
          <div id="student_amount">
            <font-awesome-icon icon="fa-solid fa-users" />
            <p>42</p>
          </div>
          <div id="students_with_loadshedding">
            <font-awesome-layers>
              <font-awesome-icon icon="fa-solid fa-bolt" />
              <font-awesome-icon icon="fa-solid fa-slash" style="color: red" />
            </font-awesome-layers>
            <p>2</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';

export default {
  name: 'Classes',
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

#classes {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

#classes #class {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--card-color);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
}

#classes #class:hover {
  cursor: default;
  background-color: var(--card-hover-color);
}

#classes #class #subject span {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#classes #class #subject span::after {
  content: '';
  display: inline-block;
  margin-left: 10px;
  width: 5px;
  height: 40px;
  border-radius: 50px;
  background-color: var(--BC-Blue);
}

#classes #class #lecturer {
  margin-left: 2rem;
}

#classes #class #dates {
  margin-left: 2rem;
}

#classes #class #student_amount {
  margin-left: 2rem;
}

#classes #class #students_with_loadshedding {
  margin-left: 2rem;
}

#classes #class #lecturer,
#classes #class #dates,
#classes #class #student_amount,
#classes #class #students_with_loadshedding {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#classes #class svg {
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
  color: var(--text-color);
}
</style>
