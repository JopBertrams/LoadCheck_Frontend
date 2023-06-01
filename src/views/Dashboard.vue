<template>
  <div class="content">
    <Sidebar isSidebarActive="dashboard" />
    <div class="main">
      <div id="classes" class="rounded">
        <div id="datepicker">
          <div @click="goToLastWeek()" id="arrow_left">
            <font-awesome-icon icon="fa-solid fa-arrow-left" />
          </div>
          <div id="dates">
            <div
              id="monday"
              class="date"
              v-bind:class="selectedDay.day == 1 ? 'is-active' : ''"
              @click="selectDay(1)"
            >
              <p>{{ daysThisWeek[0].day }}</p>
              <p>{{ daysThisWeek[0].date }}</p>
            </div>
            <div
              id="tuesday"
              class="date"
              v-bind:class="selectedDay.day == 2 ? 'is-active' : ''"
              @click="selectDay(2)"
            >
              <p>{{ daysThisWeek[1].day }}</p>
              <p>{{ daysThisWeek[1].date }}</p>
            </div>
            <div
              id="wednesday"
              class="date"
              v-bind:class="selectedDay.day == 3 ? 'is-active' : ''"
              @click="selectDay(3)"
            >
              <p>{{ daysThisWeek[2].day }}</p>
              <p>{{ daysThisWeek[2].date }}</p>
            </div>
            <div
              id="thursday"
              class="date"
              v-bind:class="selectedDay.day == 4 ? 'is-active' : ''"
              @click="selectDay(4)"
            >
              <p>{{ daysThisWeek[3].day }}</p>
              <p>{{ daysThisWeek[3].date }}</p>
            </div>
            <div
              id="friday"
              class="date"
              v-bind:class="selectedDay.day == 5 ? 'is-active' : ''"
              @click="selectDay(5)"
            >
              <p>{{ daysThisWeek[4].day }}</p>
              <p>{{ daysThisWeek[4].date }}</p>
            </div>
          </div>
          <div @click="goToNextWeek()" id="arrow_right">
            <font-awesome-icon icon="fa-solid fa-arrow-right" />
          </div>
        </div>
        <div class="noClass" v-if="classesToday.length == 0">
          <p>No classes today &#127881;</p>
        </div>
        <div class="class" v-for="Class in classesToday" :key="Class.subject">
          <div class="subject">
            <span>{{ Class.subject }}</span>
          </div>
          <div class="location_time">
            <p>{{ Class.location }}</p>
            <p>{{ Class.time }}</p>
          </div>
          <div class="students">
            <p>32 students - 12 online</p>
          </div>
          <!-- TODO: Add hover tooltip -->
          <font-awesome-icon
            icon="fa-solid fa-circle-exclamation"
            class="warning"
            v-if="Class.warning"
          />
          <font-awesome-icon
            icon="fa-solid fa-circle-check"
            class="info"
            v-else
          />
        </div>
        <!-- <div id="PM" class="class">
          <div class="subject">
            <span>UAX381</span>
          </div>
          <div class="location_time">
            <p>Lambda</p>
            <p>PM</p>
          </div>
          <div class="students">
            <p>5 students - 22 online</p>
          </div>
          <font-awesome-icon icon="fa-solid fa-circle-check" class="info" />
        </div> -->
      </div>
      <div id="tests" class="rounded">
        <p id="title">Tests this Friday</p>
        <div id="classes">
          <div id="AM" class="class">
            <div class="subject">
              <span>AIN371</span>
            </div>
            <div class="location_time">
              <p>Kappa 2</p>
              <p>AM</p>
            </div>
            <div class="students">
              <p>4 students with loadshedding</p>
            </div>
            <!-- TODO: Add hover tooltip -->
            <font-awesome-icon
              icon="fa-solid fa-circle-exclamation"
              class="warning"
            />
          </div>
          <div id="PM" class="class">
            <div class="subject">
              <span>UAX381</span>
            </div>
            <div class="location_time">
              <p>Lambda</p>
              <p>PM</p>
            </div>
            <div class="students">
              <p>1 student with loadshedding</p>
            </div>
            <!-- TODO: Add hover tooltip -->
            <font-awesome-icon icon="fa-solid fa-circle-check" class="info" />
          </div>
        </div>
      </div>
      <div id="loadshedding_campus" class="rounded">
        <p id="title">Loadshedding Tshwane Campus</p>
        <div id="loadshedding_schedule">
          <div id="today">
            <p>Today</p>
            <p>08:00 - 10:00</p>
            <p>12:00 - 14:00</p>
            <p>16:00 - 20:00</p>
          </div>
          <div id="tomorrow">
            <p>Tomorrow</p>
            <p>08:00 - 10:00</p>
            <p>12:00 - 14:00</p>
            <p>16:00 - 20:00</p>
          </div>
        </div>
      </div>
      <div id="students_with_loadshedding" class="rounded">
        <p id="title">Students with loadshedding during class</p>
        <p id="number_of_students">12</p>
        <p id="more_than_yesterday">10 more than yesterday</p>
      </div>
      <div id="percentage_with_loadshedding" class="rounded">
        <p id="title">Percentage of students with loadshedding this week</p>
        <canvas id="myChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Chart from 'chart.js/auto';
import { useDark } from '@vueuse/core';

const isDark = useDark({
  storageKey: 'loadcheck-color-scheme',
});

const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const data = {
  labels: labels,
  datasets: [
    {
      label: 'AM',
      backgroundColor: 'rgb(173, 1, 81)',
      borderColor: 'rgb(173, 1, 81)',
      data: [0, 10, 5, 2, 19],
    },
    {
      label: 'PM',
      backgroundColor: 'rgb(42, 210, 201)',
      borderColor: 'rgb(42, 210, 201)',
      data: [0, 18, 15, 10, 5],
    },
  ],
};

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
  },
  data() {
    return {
      loadsheddingChart: null,
      chartConfig: {
        type: 'line',
        data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: isDark.value ? 'white' : 'black',
                callback: (value, index, values) => {
                  return `${value}%`;
                },
              },
              grid: {
                color: isDark.value ? '#C7C7C7' : '#C7C7C7',
              },
            },
            x: {
              ticks: {
                color: isDark.value ? 'white' : 'black',
              },
              grid: {
                color: isDark.value ? '#C7C7C7' : '#C7C7C7',
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label || '';

                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += `${context.parsed.y}%`;
                  }
                  return label;
                },
              },
            },
            legend: {
              labels: {
                color: isDark.value ? 'white' : 'black',
              },
            },
          },
        },
      },
      calendar: null,
      classesToday: [],
      daysThisWeek: [
        {
          day: 'Mon',
          date: null,
          fullDate: null,
        },
        {
          day: 'Tue',
          date: null,
          fullDate: null,
        },
        {
          day: 'Wed',
          date: null,
          fullDate: null,
        },
        {
          day: 'Thur',
          date: null,
          fullDate: null,
        },
        {
          day: 'Fri',
          date: null,
          fullDate: null,
        },
      ],
      currentDate: new Date(),
      selectedDay: {
        day: new Date().getDay(),
        date: new Date(),
      },
    };
  },
  async mounted() {
    Chart.defaults.font.family = 'AvantGarde';
    Chart.defaults.font.size = 16;
    this.loadsheddingChart = new Chart(
      document.getElementById('myChart'),
      this.chartConfig
    );

    this.getDatesForDatepicker();

    await this.getCalendar();
    this.getClassesOfToday();
  },
  methods: {
    getDatesForDatepicker() {
      let currentDate = this.currentDate;

      // Calculate the current day of the week (0-6, where Sunday is 0)
      let currentDayOfWeek = currentDate.getDay();

      // Calculate the difference in days between the current day and Monday
      let daysToMonday = (currentDayOfWeek + 7 - 1) % 7;

      this.daysThisWeek.forEach(function (day, index) {
        // Calculate the desired date by adding the difference in days to Monday's date
        let desiredDate = currentDate.getDate() + (index - daysToMonday);

        // Create a new date object for calculations to avoid modifying the original currentDate
        let calculatedDate = new Date(currentDate.getTime());
        calculatedDate.setDate(desiredDate);

        // Adjust the desired date if it goes beyond the current month
        if (calculatedDate.getMonth() !== currentDate.getMonth()) {
          if (desiredDate > currentDate.getDate()) {
            // Date is in the next month
            calculatedDate.setMonth(currentDate.getMonth() + 1);
            desiredDate -= new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              0
            ).getDate();
          } else {
            // Date is in the previous month
            calculatedDate.setMonth(currentDate.getMonth() - 1);
            desiredDate += new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              0
            ).getDate();
          }
        }

        let formattedDate = calculatedDate
          .getDate()
          .toString()
          .padStart(2, '0');

        day.date = formattedDate;
        day.fullDate = calculatedDate;
      });
    },
    async goToLastWeek() {
      this.currentDate.setDate(this.currentDate.getDate() - 7);
      this.getDatesForDatepicker();

      await this.getCalendar();
      this.selectedDay.date.setDate(this.selectedDay.date.getDate() - 7);
      this.getClassesOfToday();
    },
    async goToNextWeek() {
      this.currentDate.setDate(this.currentDate.getDate() + 7);
      this.getDatesForDatepicker();

      await this.getCalendar();
      this.selectedDay.date.setDate(this.selectedDay.date.getDate() + 7);
      this.getClassesOfToday();
    },
    selectDay(day) {
      this.selectedDay.day = day;
      this.selectedDay.date = this.daysThisWeek[day - 1].fullDate;
      this.getClassesOfToday();
    },
    async getCalendar() {
      let startdatetime = new Date(this.daysThisWeek[0].fullDate);
      startdatetime.setHours(2, 1, 0);
      let enddatetime = new Date(this.daysThisWeek[4].fullDate);
      enddatetime.setDate(enddatetime.getDate() + 1);
      enddatetime.setHours(1, 59, 0);
      this.calendar = await this.$store.getters.getGraphClient
        .api(
          `/me/calendarview?startdatetime=${startdatetime.toISOString()}&enddatetime=${enddatetime.toISOString()}&$select=subject,start,end,location&$top=50`
        )
        .get();
    },
    getClassesOfToday() {
      let classes = [];
      let regex = /^[A-Z]{3}\d{3}$/;
      this.calendar.value.forEach((event) => {
        let start = new Date(event.start.dateTime);
        let now = this.selectedDay.date;
        if (start.getDay() == now.getDay()) {
          if (event.subject.slice(0, 6).match(regex) == null) {
            return;
          }

          let time = 'AM';
          if (start.getHours() > 10) {
            time = 'PM';
          }
          let location = '';
          if (event.location.displayName.includes('Virtual')) {
            location = 'Online';
          } else {
            location = event.location.displayName;
          }
          classes.push({
            subject: event.subject.slice(0, 6),
            location: location,
            time: time,
            students: '',
            warning: false,
          });
        }
      });
      this.classesToday = classes;
    },
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
  display: grid;
  grid-template-columns: repeat(2, 1fr) 0.2fr 1fr 0.2fr 1fr;
  grid-template-rows: repeat(2, 1fr) repeat(3, 0.5fr) repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  width: 100%;
}

#classes {
  display: flex;
  flex-direction: column;
  grid-area: 1 / 1 / 4 / 3;
  background-color: var(--card-color);
}

#classes #datepicker {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

#classes #datepicker #arrow_left,
#classes #datepicker #arrow_right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: var(--BC-Blue);
  color: var(--text-color);
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
}

#classes #datepicker #dates {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
}

#classes #datepicker #dates .date {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

#classes #datepicker #dates .date p:nth-child(2) {
  font-size: 20px;
  font-weight: bold;
}

#classes #datepicker #dates .date.is-active {
  background-color: var(--BC-Blue);
  border-radius: 50px;
  width: 50px;
  height: 75px;
}

#classes .class,
#classes .noClass {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 50px;
  margin: 10px;
  padding: 10px;
}

#classes .noClass p {
  font-size: 20px;
  font-weight: bold;
}

#classes .subject {
  min-width: 70px;
}

#classes .subject span {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#classes .subject span::after {
  content: '';
  display: inline-block;
  margin-left: 10px;
  width: 5px;
  height: 40px;
  border-radius: 50px;
  background-color: var(--BC-Blue);
}

#classes .location_time {
  display: flex;
  flex-direction: column;
}

#classes .students {
  display: flex;
  flex-direction: column;
}

#classes .warning,
#classes .info {
  margin-left: 30px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: orangered;
}

#classes .info {
  color: green;
}

#tests {
  grid-area: 5 / 1 / 8 / 3;
  background-color: var(--card-color);
}

#tests #title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0 0 20px;
}

#tests #classes {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
}

#tests .class {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 50px;
  margin: 10px;
  padding: 10px;
}

#tests .subject {
  min-width: 70px;
}

#tests .subject span {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#tests .subject span::after {
  content: '';
  display: inline-block;
  margin-left: 10px;
  width: 5px;
  height: 40px;
  border-radius: 50px;
  background-color: var(--BC-Blue);
}

#tests .location_time {
  display: flex;
  flex-direction: column;
}

#tests .students {
  display: flex;
  flex-direction: column;
}

#tests .warning,
#tests .info {
  margin-left: 30px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: orangered;
}

#tests .info {
  color: green;
}

#loadshedding_campus {
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-area: 1 / 4 / 3 / 5;
  background-color: var(--BC-Pink);
}

#loadshedding_campus #title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px;
  color: #fff;
}

#loadshedding_campus #loadshedding_schedule {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
}

#loadshedding_campus #loadshedding_schedule div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#loadshedding_campus #loadshedding_schedule div p {
  color: #fff;
}

#loadshedding_campus #loadshedding_schedule div p:nth-child(1) {
  font-weight: bold;
  margin-bottom: 10px;
}

#students_with_loadshedding {
  grid-area: 1 / 6 / 3 / 7;
  background-color: var(--BC-Pink);
}

#students_with_loadshedding #title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px;
  color: #fff;
  text-align: center;
}

#students_with_loadshedding #number_of_students {
  font-size: 50px;
  font-weight: bold;
  color: #fff;
  margin: 20px 0 0 20px;
}

#students_with_loadshedding #more_than_yesterday {
  font-size: 16px;
  color: #fff;
  margin-left: 20px;
}

#percentage_with_loadshedding {
  grid-area: 4 / 4 / 8 / 7;
  background-color: var(--card-color);
}

#percentage_with_loadshedding #title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0 0 20px;
}

#percentage_with_loadshedding #myChart {
  padding: 20px;
}

.rounded {
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
