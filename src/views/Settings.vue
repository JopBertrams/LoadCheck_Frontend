<template>
  <div class="content">
    <Sidebar isSidebarActive="settings" />
    <div class="main">
      <div>
        <h3>Dark Mode</h3>
        <label class="switch">
          <input
            type="checkbox"
            v-bind:checked="isDark"
            @click="toggleDark()"
          />
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark({
  storageKey: 'loadcheck-color-scheme',
});
const toggleDark = useToggle(isDark);

export default {
  name: 'Settings',
  components: {
    Sidebar,
  },
  data() {
    return {
      isDark,
      toggleDark,
    };
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
}

.main {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
}

.main div {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
}

.main div h3 {
  margin-right: 1rem;
}

.main .switch {
  position: relative;
  display: inline-block;
  width: 75px;
  height: 30px;
}

.main .switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.main .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.main .slider:before {
  position: absolute;
  content: '';
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 4px;
  background-color: var(--BC-Pink);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.main input:checked + .slider {
  background-color: #000000;
}

.main input:focus + .slider {
  box-shadow: 0 0 2px #000000;
}

.main input:checked + .slider:before {
  -webkit-transform: translateX(41px);
  -ms-transform: translateX(41px);
  transform: translateX(41px);
}

.main .slider.round {
  border-radius: 34px;
}

.main .slider.round:before {
  border-radius: 50%;
}
</style>
