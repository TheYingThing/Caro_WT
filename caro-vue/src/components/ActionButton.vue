<template>
    <v-btn v-if="path === 'score'">
      <RouterLink to="/score">Score</RouterLink>
    </v-btn>
    <v-btn v-else v-on:click="callPlayServer(path)">{{ title }}</v-btn>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
  name: 'ActionButton',
  props: ['path', 'title'],
  methods: {
    async callPlayServer(path) {
      await axios.get('http://localhost:9000/' + path)
      this.$router.go()
    }
  }
}
</script>

<style>

router-link {
  color: inherit;
  text-underline: none;
}

a {
  color: inherit;
  text-decoration: none;
}

</style>