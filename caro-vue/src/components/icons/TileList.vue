<template>
  <div class="tile-padding">
            <span v-for="n in count" class="tile-padding" :id="player + '-' + color + '-tile-' + n">
                <player-tile :color=color></player-tile>
             </span>
  </div>
</template>

<script>
export default {
  name: "TileList",
  props: ['count', 'color', 'player']
}
</script>

<style scoped>

</style>