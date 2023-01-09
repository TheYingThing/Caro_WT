<template>
  <q-icon class="shadow-none opacity-noTiles board-tile-padding" :id="'tile' + row + col"
          style="width: 30px; height: 30px">
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
import Tile from "./Tile.vue";
import axios from "axios";

export default {
  name: 'Empty-Tile',
  components: {Tile},
  props: ['row', 'col'],
  data() {
    return {
      none: 'none',
      red: 'red',
      black: 'black',
      grey: 'grey',
      white: 'white',
    }
  },
  methods: {
    putTileOnly(row, col, color, colorId) {
      let path = "putOnly/" + row + "/" + col + "/" + color;
      axios.get('http://localhost:9000/' + path)
          .then(function (response) {
            let result = response.data;
            let resColor = result["color"]
            let resPlayer = result['player']
            let resStatus = result['status']
            let resTiles = result['tiles']
            let placedTile = 3 - resTiles
            console.log(resPlayer)

            let p;
            if (resPlayer === 'p1') {
              p = 1;
            } else {
              p = 2;
            }

            let alert = $("#status-alert")
            if (resColor === "none") {
              alert.text(resStatus).css("display", "block")
            } else {
              alert.css("display", "none")
              console.log(p + "-" + colorId + "-tile-" + placedTile)
              $('#' + resPlayer + '-' + color + '-tile-' + placedTile).css("display", "none")
              let colorTile = document.getElementById("tile" + row + col)
              colorTile.classList.remove("opacity-noTiles")
              colorTile.firstElementChild.src = "/src/assets/images/" + result['color'] + "Button.png";

              if (resPlayer === 'p1') {
                $("#p1-name").removeClass("highlight")
                $("#p2-name").addClass("highlight")
              } else if (resPlayer === 'p2') {
                $("#p2-name").removeClass("highlight")
                $("#p1-name").addClass("highlight")
              }
            }
            $("#p2-points").html(result['pointsP2'].toLocaleString());
            $("#p1-points").html(result['pointsP1'].toLocaleString());

          }.bind(this));
    }
  }
}
</script>

<style>
.tile-img {
  width: 34px;
  height: 34px;
}

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
}
</style>

