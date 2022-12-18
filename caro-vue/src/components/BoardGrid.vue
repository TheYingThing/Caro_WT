<template>
  <div class="col-board" id="board-grid">
    <div v-for="(row, col) in board.cells" class="btn-group" id="board-grid-row">
      <EmptyTile v-if="board.cells[row][col] === 'none'"></EmptyTile>
      <Tile v-else :tileColor="board.cells[row][col]"></Tile>
    </div>
  </div>
</template>

<script>
import EmptyTile from "./EmptyTile";
import Tile from "../App";
import axios from 'axios';
export default {
  name: 'BoardGrid',
  data() {
    return {
      board: ""
    }
  },
  components: {Tile, EmptyTile},
  methods: {
    getBoard() {
      axios.get('http://localhost:9000/board/json')
          .then(function (response) {
        this.board = response.data;
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