<template>
  <q-icon class="shadow-none opacity-noTiles board-tile-padding" :id="'tile' + row + col" style="width: 35px; height: 35px">
    <Tile :color="none"></Tile>
    <q-menu>
      <q-list>
        <q-item clickable v-close-popup>
          <q-item-section data-color="red" v-on:click="putTileOnly(row, col, 'red', 1)">
            <Tile :color="red"></Tile>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section data-color="black" v-on:click="putTileOnly(row, col, 'black', 2)">
            <Tile :color="black"></Tile>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section data-color="grey" v-on:click="putTileOnly(row, col, 'grey', 3)">
            <Tile :color="grey"></Tile>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section data-color="white"
                          v-on:click="putTileOnly(row, col, 'white', 4)">
            <Tile :color="white"></Tile>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-icon>
</template>

<script>
import Tile from "@/components/Tile.vue";

export default {
  name: "DropdownTest",
  components: {Tile},
  data() {
    return {
      none: 'none',
      red: 'red',
      black: 'black',
      grey: 'grey',
      white: 'white',
    }
  }
}
</script>

<style scoped>
.opacity-noTiles {
  opacity: 0.4;
}

.empty-tile {
  border: none !important;
  padding: 0px !important;
}

.board-tile-padding {
  padding: 2px;
}

.shadow-none {
  box-shadow: none;
  padding: 0px !important;
}

#dropdown {

}

row {
  padding-top: unset;
}
</style>