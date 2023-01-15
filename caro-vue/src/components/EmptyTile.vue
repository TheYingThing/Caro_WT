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
import $ from 'jquery';


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
      noneBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAK0lEQVRIie3NMREAMAgEMMC/tPdUXHAdEgPpJK+OzFUkk8lkMplMJpN9mS0qlQOZEPedEwAAAABJRU5ErkJggg==",
      redBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAABCaVRYdE1pY3Jvc29mdC5HYW1lRFZSLklkAAAAZW4tdXMAAGYyY2Q0NjlhLWNiZWUtNGYxZC1iNzY4LWNiYzE2MzAyMDkzNyUxQdsAAABNaVRYdE1pY3Jvc29mdC5HYW1lRFZSLlRpdGxlAAAAZW4tdXMAAGNvbG9yIHBpY2tlciAtIEdvb2dsZSBTZWFyY2ggLSBHb29nbGUgQ2hyb21lEyYDSgAAADRpVFh0TWljcm9zb2Z0LkdhbWVEVlIuQXV0aG9yAAAAZW4tdXMAAE1pY3Jvc29mdCBHYW1lIERWUooun3sAAAA0aVRYdE1pY3Jvc29mdC5HYW1lRFZSLkJhc2ljAAAAZW4tdXMAADAhISEhISEwISEwISExMzM3ISF/zRQDAAAAZWlUWHRNaWNyb3NvZnQuR2FtZURWUi5CYXNpY0hhc2gAAABlbi11cwAANTVkZjExMWE1MjlkNWY4YWRiNzk3N2U0NTRmMzdmZjUyMDMyZjdhNjVmODBhZDBlMTY5YmM2NDM3Y2NmOWI0YpP6+fAAAAC9aVRYdE1pY3Jvc29mdC5HYW1lRFZSLkV4dGVuZGVkAAEAZW4tdXMAAHicfYyxDsIgFEX/5c3FFIrUMrt0cbGTxuH18RqbtGAAjYnx30U/wPHmnHNfsATCpXdgYVLktOlQ0Mgs9CSdGFuzK5OkaWpVd00LFdxiIE7pgCuXiK4xrLzhJxf04Jjm4MHKClLGmIf5J6kSC6mEbAclrZZ2q09FZ+/+Cyu7Gff3iLm89v7IFLxLYOsvyugwI9jz5f0BpZM6o6gdqnQAAABgaVRYdE1pY3Jvc29mdC5HYW1lRFZSLkhhc2gAAABlbi11cwAANDQ3ZDY3NDc4NWZlOGRiOTk2ZTIxNWFkZTkzNTdiYWRlMzBlNWQ2NDFlNjJmYWExMTM4MmE2Nzk1MmJjNzhlYpv6bCcAAAAhdEVYdENyZWF0aW9uIFRpbWUAMjAyMDoxMjoxNyAyMjo0MTo1NFmCXawAAAA0SURBVEhL7c0hFQAwDMTQ6/xbqcaOzEBAyV4+CUx1Mll2Xlc5QZwgThAniBPECeIE+WWSXHpEAd6eFrCBAAAAAElFTkSuQmCC",
      blackBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAA1SURBVEhL7c2xDQAwDMMwp///nHToAxqyFCJgeFQl6btV5/0qI4gRxAhiBDGCGEGMIL9EkgHQLwExeO5aQQAAAABJRU5ErkJggg==",
      greyBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAzSURBVEhL7c2hAQAwDITAbyf8/ZdJTRdAxHEGyWk7WXZ/VzlBnCBOECeIE8QJ4gRxAiQP5eQCI2KRoTIAAAAASUVORK5CYII=",
      whiteBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAySURBVEhL7c2hFQAgDMTQK/vv3CJYIKKGl28iU31l2Xld5QRxgjhBnCBOECeIE+SXSTJFYAQuGaPHiQAAAABJRU5ErkJggg=="
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

