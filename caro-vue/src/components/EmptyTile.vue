<template>
  <div class="board-tile-padding" id="board-tiles">
            <span type="button" class="btn btn-secondary dropdown-toggle opacity-noTiles shadow-none empty-tile"
                  data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :id="'tile' + row + col">
                <Tile :color="none"></Tile>
            </span>
    <div class="dropdown-menu">
                <span class="dropdown-item shadow-none dropdown-tile" data-color="red"
                      v-on:click="putTileOnly(row, col, 'red', 1)">
                    <Tile :color="red"></Tile>
                </span>
      <span class="dropdown-item shadow-none dropdown-tile" data-color="black"
            v-on:click="putTileOnly(row, col, 'black', 2)">
                    <Tile :color="black"></Tile>
                </span>
      <span class="dropdown-item shadow-none dropdown-tile" data-color="grey"
            v-on:click="putTileOnly(row, col, 'grey', 3)">
                    <Tile :color="gery"></Tile>
                </span>
      <span class="dropdown-item shadow-none dropdown-tile" data-color="white"
            v-on:click="putTileOnly(row, col, 'white', 4)">
                    <Tile :color="white"></Tile>
                </span>
    </div>
  </div>
</template>

<!--TODO: maybe replace this with vuetify which has menus since bootstrap is not working-->

<script>
import Tile from "./Tile.vue";

export default {
  name: 'Empty-Tile',
  components: {Tile},
  methods: {
    async putTileOnly(row, col, color, colorId) {
      let path = "putOnly/" + row + "/" + col + "/" + color;
      let result = await this.executeAjaxForJson(path);
      let resColor = result['color']
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
        websocket.send(resStatus)
      } else {
        alert.css("display", "none")
        console.log(p + "-" + colorId + "-tile-" + placedTile)
        $('#' + p + '-' + colorId + '-tile-' + placedTile).css("display", "none")
        let colorTile = document.getElementById("tile" + row + col)
        colorTile.classList.remove("opacity-noTiles")
        colorTile.firstElementChild.src = "/assets/images/" + result['color'] + "Button.png";

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
    },
    executeAjaxForJson(path) {
      return $.ajax({
        url: "http:localhost:9000/" + path,
        type: 'GET',
        dataType: "json",
        success: function (data) {
          //console.log(data);
        },
        error: function () {
          console.log("something went wrong");
        }
      })
    }
  }
}
</script>

<style>
.tile-img {
  width: 30px;
  height: 30px;
}

.opacity-noTiles {
  opacity: 0.4;
}

.empty-tile {
  border: none !important;
  padding: 0px !important;
}
</style>

