<template>
  <header>
    <img id="header_image" src="../assets/images/header.png" alt="Header" />
    <div id="user" v-if="this.$store.getters.isAuthenticated">
      <p id="name">Welcome {{ this.$store.getters.getAccount.name }}</p>
      <img
        id="profile_picture"
        src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
        alt="Avatar"
      />
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
header {
  position: relative;
  overflow: hidden;
}

header #header_image {
  width: 100%;
}

header #user {
  position: absolute;
  top: 4rem;
  right: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

header #user #name {
  margin-right: 1rem;
}

header #user #profile_picture {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

@media (max-width: 768px) {
  header #header_image {
    width: 250%;
  }
}
</style>
