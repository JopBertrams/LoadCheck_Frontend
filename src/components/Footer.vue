<template>
  <footer>
    <p>
      Made with <span>&hearts;</span> for
      <a href="https://www.belgiumcampus.ac.za/" target="_blank"
        >Belgium Campus</a
      >
      by <a href="https://jopbertrams.nl/" target="_blank">Jop Bertrams</a> -
      2023
    </p>
    <img src="../assets/images/footer.png" alt="Footer" />
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
footer {
  position: relative;
  text-align: center;
}

footer p {
  position: absolute;
  right: 10px;
  bottom: 0;
  font-size: 0.7rem;
  color: #fff;
}

footer p span {
  color: var(--BC-Pink);
}

footer p a {
  color: #fff;
  text-decoration: none;
}

footer img {
  width: 100%;
  height: 100%;
}
</style>
