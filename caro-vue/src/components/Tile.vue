<template>
  <span class="board-tile-padding">
  <img v-if="color === none" class="tile-img" src="@/assets/images/noTile.png" alt="no tile">
  <img v-else-if="color === 'red'" class="tile-img" src="@/assets/images/redButton.png" alt="red tile">
  <img v-else-if="color === 'black'" class="tile-img" src="@/assets/images/blackButton.png" alt="black tile">
  <img v-else-if="color === 'grey'" class="tile-img" src="@/assets/images/greyButton.png" alt="grey tile">
  <img v-else-if="color === 'white'" class="tile-img" src="@/assets/images/whiteButton.png" alt="white tile">

  </span>
</template>

<script>
export default {
  name: 'Tile',
  props: ['color'],
}
</script>

<style>

.tile-img {
  width: 30px;
  height: 30px;
}

.board-tile-padding {
  padding: 2px;
}
</style>

