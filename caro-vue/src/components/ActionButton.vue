<template>
    <v-btn v-on:click="callPlayServer(path)">{{ title }}</v-btn>
</template>

<script>
import axios from "axios";
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

</style>