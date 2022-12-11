<template>
  <img v-if="tileColor === 'none'" class="tile-img" src="@/assets/images/noTile.png)" alt="no tile">
  <img v-else class="tile-img" v-bind:src="tilePath" alt="no tile">
</template>

<script setup>
export default {
  name: 'Tile',
  props: ['tileColor'],
  computed: {
    tilePath: function () {
      return "@/assets/images/" + tileColor + "Button.png"
    }
  }
}
</script>

<style>
.tile-img {
  width: 30px;
  height: 30px;
}
</style>

