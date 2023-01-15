<template>
  <div class="content-body">
    <div class="row">
      <Player :moves="moves" :name="player1Name" :points="player1Points" :tiles="player1Tiles" :player-id="p1" :turn="turn"></Player>
      <BoardGrid :cells="cells" :status="status"></BoardGrid>
      <Player :moves="moves" :name="player2Name" :points="player2Points" :tiles="player2Tiles" :player-id="p2" :turn="turn"></Player>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BoardGrid from "./BoardGrid.vue";
import Player from "./Player.vue";

export default {
  components: {Player, BoardGrid},
  data() {
    return {
      cells: [],
      player1Name: "",
      player2Name: "",
      player1Points: "",
      player2Points: "",
      player1Tiles: [],
      player2Tiles: [],
      moves:"",
      p1: "p1",
      p2: "p2",
      turn: "",
      status: ""
    }
  },
  name: "Board",
  methods: {
    getBoard() {
      axios.get('http://localhost:9000/board/json')
          .then(function (response) {
            let board = response.data;
            this.cells = board["cells"]
            let player1 = board["player1"]
            this.player1Name = player1["name"]
            this.player1Points = player1["points"]
            this.player1Tiles = player1["tiles"]
            let player2 = board["player2"]
            this.player2Name = player2["name"]
            this.player2Points = player2["points"]
            this.player2Tiles = player2["tiles"]
            this.moves = board["moves"]
            this.status = board["status"]

            if (this.moves % 2 === 0) {
              this.turn = this.p1;
            } else {
              this.turn = this.p2;
            }
          }.bind(this));
    }
  },
  created() {
    this.getBoard();
  },
  updated() {
    this.getBoard();
  }
}
</script>

<style scoped>
.row {
  padding-top: 50px;
  display: flex;
  justify-content: center;
}


</style>