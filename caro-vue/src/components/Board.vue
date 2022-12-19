<template>
  <div class="row">
    <BoardGrid :cells="cells"></BoardGrid>
  </div>
</template>

<script>
import axios from "axios";
import BoardGrid from "./BoardGrid.vue";

export default {
  components: {BoardGrid},
  data() {
    return {
      cells: [],
      player1Name: "",
      player2Name: "",
      player1Points: "",
      player2Points: "",
      player1Tiles: [],
      player2Tiles: [],
      moves:""
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