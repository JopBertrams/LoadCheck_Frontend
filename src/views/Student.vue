<template>
  <LoadingSymbol v-if="isLoading" class="loading" />
  <div class="notLoading" v-else>
    <div v-if="student.loadshedding_area == null" class="noAddress">
      <font-awesome-layers class="icon" style="z-index: -1">
        <font-awesome-icon icon="fa-solid fa-house" />
        <font-awesome-icon icon="fa-solid fa-slash" style="color: red" />
      </font-awesome-layers>
      <h1>No area given yet</h1>
      <h3>Please enter the suburb you're currently living</h3>
      <form class="addressForm" @submit.prevent>
        <input type="text" id="area" name="area" v-model="search" />
        <ul v-if="results.length > 0">
          <h3>Please select the correct suburb:</h3>
          <li v-for="result in results" :key="result.area_name">
            <p
              @click="
                selectArea(result.item.area_name, result.item.calendar_name)
              "
            >
              <span>
                {{
                  result.item.area_name.replace(
                    /(^\w{1})|(\s+\w{1})/g,
                    (letter) => letter.toUpperCase()
                  )
                }}
              </span>
              ({{
                result.item.municipality.replace(
                  /(^\w{1})|(\s+\w{1})/g,
                  (letter) => letter.toUpperCase()
                )
              }},
              {{
                result.item.province.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                  letter.toUpperCase()
                )
              }})
            </p>
          </li>
        </ul>
      </form>
    </div>
    <div class="address" v-else>
      <font-awesome-icon icon="fa-solid fa-house" class="icon" />
      <h1>
        Suburb given for loadshedding: <br />
        {{ student.loadshedding_area }}
      </h1>
      <button @click="removeLoadsheddingArea()">Click here to change</button>
    </div>
    <button @click="SignOut()" id="signOut">Log out</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import LoadingSymbol from '../components/LoadingSymbol.vue';
import { useFuse } from '@vueuse/integrations/useFuse';
import loadsheddingAreas from '../area_metadata.yaml';

export default {
  name: 'Student',
  components: {
    LoadingSymbol,
  },
  setup() {
    const data = ref([]);
    loadsheddingAreas.area_details.forEach((area) => {
      area.areas.forEach((subarea) => {
        // Check if subarea.name is an array or 1 string
        if (Array.isArray(subarea.name)) {
          subarea.name.forEach((areaName) => {
            data.value.push({
              calendar_name: area.calendar_name,
              province: subarea.province,
              municipality: subarea.municipality,
              area_name: areaName,
            });
          });
        } else {
          data.value.push({
            calendar_name: area.calendar_name,
            province: area.province,
            municipality: area.municipality,
            area_name: subarea.name,
          });
        }
      });
    });
    const search = ref('');
    const options = {
      fuseOptions: {
        keys: ['area_name'],
        isCaseSensitive: false,
      },
      resultLimit: 3,
      matchAllWhenSearchEmpty: false,
    };
    const { results } = useFuse(search, data, options);
    return { data, search, options, results };
  },
  data() {
    return {
      isLoading: true,
      student: {},
    };
  },
  mounted() {
    this.getStudentFromDb();
  },
  methods: {
    SignOut() {
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
    getStudentFromDb() {
      const studentId = this.$store.getters.getUser.mailNickname;
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/students/${studentId}`)
        .then((response) => {
          this.student = response.data;
          this.isLoading = false;
        });
    },
    selectArea(areaName, calendarName) {
      const studentId = this.$store.getters.getUser.mailNickname;
      axios
        .patch(`${import.meta.env.VITE_BACKEND_URL}/students/${studentId}`, {
          loadshedding_area: areaName,
          calendar_name: calendarName,
        })
        .then(() => {
          this.student.loadshedding_area = areaName;
        });
    },
    removeLoadsheddingArea() {
      const studentId = this.$store.getters.getUser.mailNickname;
      axios
        .patch(`${import.meta.env.VITE_BACKEND_URL}/students/${studentId}`, {
          loadshedding_area: null,
          calendar_name: null,
        })
        .then(() => {
          this.student.loadshedding_area = null;
        });
    },
  },
};
</script>

<style scoped>
.loading {
  margin: auto auto;
  display: block;
  width: 100px;
  height: 100px;
}

.notLoading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto auto;
  width: 100%;
  height: 100%;
}

.noAddress,
.address {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: auto auto;
  width: 100%;
  height: 100%;
}

.icon {
  margin-top: 20px;
  width: 100px;
  height: 100px;
}

.icon svg {
  width: 100px;
  height: 100px;
}

.noAddress h1,
.address h1 {
  font-size: 2.5rem;
  font-family: 'Bebas Neue', cursive;
}

.address h1 {
  text-align: center;
}

.addressForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.addressForm input {
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  color: black;
  font-size: 1.2rem;
  width: 100%;
  transition: border 0.2s ease-in-out;
  max-width: 500px;
}

.addressForm input:focus {
  outline: none;
  border: 1px solid var(--BC-Blue);
}

.addressForm ul {
  margin: 10px 0;
  padding: 10px;
  width: 100%;
}

.addressForm h3 {
  text-align: center;
}

.addressForm ul li {
  list-style: none;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
}

.addressForm ul li:hover {
  background-color: var(--card-hover-color);
  border-radius: 5px;
  cursor: pointer;
  font-weight: bolder;
}

.addressForm ul li p {
  text-overflow: ellipsis;
  overflow: hidden;
}

.addressForm ul li p span {
  font-weight: bolder;
}

button {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: var(--BC-Blue);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
