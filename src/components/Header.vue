<template>
  <header>
    <img id="header_image" src="../assets/images/header.png" alt="Header" />
    <div id="user" v-if="isAuthenticated">
      <p id="name">Welcome Mr. Venter</p>
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
  data() {
    return {
      // TODO: Add check to see if user is authenticated
      isAuthenticated: false,
    };
  },
};
</script>

<style scoped>
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
</style>
