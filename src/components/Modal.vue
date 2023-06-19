<template>
  <transition>
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header"></slot>
        </header>

        <section class="modal-body">
          <slot name="body"></slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  border-radius: 5px;
  width: 500px;
}

.modal-header {
  padding: 20px;
  background-color: #f1f1f1;
  font-size: 2rem;
  border-radius: 5px 5px 0 0;
  font-family: 'Bebas Neue', cursive;
}

.modal-body {
  padding: 20px;
  font-size: 1.2rem;
  height: 100%;
}

.modal-footer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 5px;
  background-color: #f1f1f1;
  border-radius: 0 0 5px 5px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
