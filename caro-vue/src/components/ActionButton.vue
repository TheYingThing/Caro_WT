<template>
    <q-btn v-if="path === 'score'" :size="xl" rounded>
      <RouterLink to="/score">Score</RouterLink>
    </q-btn>
    <q-btn v-else v-on:click="callPlayServer(path)">
      <span>{{ title }}</span>
    </q-btn>
</template>

<script>
import axios from "axios";
import router from "../router";
import $ from 'jquery';


export default {
  name: 'ActionButton',
  props: ['path', 'title'],
  data() {
    return {
      ws: new WebSocket("ws://localhost:9000/websocket")
    }
  },
  methods: {
    async callPlayServer(path) {
      await axios.get('http://localhost:9000/' + path)
      this.$router.go()
    },
    connectWebSocket() {

      this.ws.onopen = (event) => {
        console.log("opening connection to Websocket")
        this.ws.send("opening connection")
      }

      this.ws.onclose = () => {
        console.log("Closed connection to Websocket")
      }

      this.ws.onerror = (error) => {
        console.log("Websocket caused error: " + error)
      }

      this.ws.onmessage = (e) => {
        console.log("message recieved")
        if (typeof e.data === "string") {
          let json = JSON.parse(e.data)
          console.log(json)
          this.updateGame(json)
        }
      }
    },
    updateGame(json) {
      console.log("updating game")
      this.updatePlayers(json)
      this.updateBoard(json)
    },
    updateBoard(json) {
      let cells = json['cells'];
      for (let r = 2; r < 14; r++) {
        for (let c = 2; c < 14; c++) {
          let cell = cells[r][c]
          let colorTile = document.getElementById("tile" + r + c)
          if (cell !== "none") {
            console.log("id : tile" + r + c)
            if (colorTile !== null && colorTile.classList !== null) {
              colorTile.classList.remove("opacity-noTiles")
              colorTile.firstElementChild.src = "src/assets/images/" + cell + "Button.png";
            }
          } else {
            if (colorTile !== null && colorTile.classList !== null) {
              colorTile.classList.add("opacity-noTiles")
              colorTile.firstElementChild.src = "src/assets/images/noTile.png";
            }
          }
        }
      }
    },
    updatePlayers(json) {
      console.log("updating player")
      let p1 = json['player1']
      let p2 = json['player2']
      $("#p2-points").html(p2['points']);
      $("#p1-points").html(p1['points']);
      $("#p2-name").html(p2['name']);
      $("#p1-name").html(p1['name']);

      let lastColor = json['last']

      let moves = json['moves']
      if (moves % 2 === 0) {
        $("#p2-name").removeClass("highlight")
        $("#p1-name").addClass("highlight")
      } else {
        $("#p1-name").removeClass("highlight")
        $("#p2-name").addClass("highlight")
      }

      this.updateTiles("p1", p1['tiles'])
      this.updateTiles("p2", p2['tiles'])
    },
    updateTiles(player, tiles) {
      console.log("updating tiles")
      let redTiles = tiles ['red']
      let blackTiles = tiles ['black']
      let greyTiles = tiles ['grey']
      let whiteTiles = tiles ['white']

      this.setTileOpacity(player, "red", redTiles)
      this.setTileOpacity(player, "black", blackTiles)
      this.setTileOpacity(player, "grey", greyTiles)
      this.setTileOpacity(player, "white", whiteTiles)
    },
    setTileOpacity(player, color, tiles) {
      console.log('#' + player + '-' + color + '-tile-1')
      if (tiles === 3) {
        $('#' + player + '-' + color + '-tile-1').css("display", "inline")
        $('#' + player + '-' + color + '-tile-2').css("display", "inline")
        $('#' + player + '-' + color + '-tile-3').css("display", "inline")
      } else if (tiles === 2) {
        $('#' + player + '-' + color + '-tile-1').css("display", "inline")
        $('#' + player + '-' + color + '-tile-2').css("display", "inline")
        $('#' + player + '-' + color + '-tile-3').css("display", "none")
      } else if (tiles === 1) {
        $('#' + player + '-' + color + '-tile-1').css("display", "inline")
        $('#' + player + '-' + color + '-tile-2').css("display", "none")
        $('#' + player + '-' + color + '-tile-3').css("display", "none")
      } else if (tiles === 0) {
        $('#' + player + '-' + color + '-tile-1').css("display", "none")
        $('#' + player + '-' + color + '-tile-2').css("display", "none")
        $('#' + player + '-' + color + '-tile-3').css("display", "none")
      }
    }
  },
  beforeMount() {
    this.connectWebSocket();
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

.row {
  padding-top: 2px;
}

.col {
  padding-bottom: 2px;
}

</style>