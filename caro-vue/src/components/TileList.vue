<template>
  <span v-for="n in count" class="tile-padding" :id="player + '-' + color + '-tile-' + n">
    <Tile :color=color></Tile>
   </span>
</template>

<script>
import Tile from "./Tile.vue";
export default {
  name: "TileList",
  components: {Tile},
  props: ['count', 'color', 'player'],
}
</script>

<style scoped>

.tile-padding {
  padding: 5px;
}

</style>