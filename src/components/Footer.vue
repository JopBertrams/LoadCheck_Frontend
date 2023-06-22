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
}

footer p {
  position: absolute;
  right: 10px;
  bottom: 3px;
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
}

@media (max-width: 768px) {
  footer img {
    display: none;
  }

  footer p {
    position: relative;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: 0;
    text-align: center;
    color: var(--text-color);
  }

  footer p a {
    color: var(--text-color);
  }
}
</style>
