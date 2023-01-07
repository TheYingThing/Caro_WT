<script setup>
import NavBar from './components/NavBar.vue'
import ButtonGroup from "@/components/ButtonGroup.vue";
</script>

<template>
  <body class="body-container">
    <NavBar></NavBar>
    <RouterView/>
  </body>
</template>

<style scoped>

#app {
  margin: 0 !important;
  background-color: #708090;

}

* {
  background-color: #708090;
  color: white;
  font-family: Tahoma, Arial, sans-serif;;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .body-container {
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    min-height: auto;
    overflow-y: scroll;
  }
}
</style>
