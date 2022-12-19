<template>
  <div class="col-board" id="board-grid">
    <div v-for="row in getNumbers(3, 16)" class="btn-group board-tile-padding" id="board-grid-row">
      <div v-for="col in getNumbers(3, 16)">
        <EmptyTile v-if="cells[row][col] === 'none'"></EmptyTile>
        <Tile v-else :color="cells[row][col]"></Tile>
      </div>
      </div>
    </div>
</template>

<script>
import EmptyTile from "./EmptyTile.vue";
import Tile from "./Tile.vue";
import axios from 'axios';
export default {
  name: 'BoardGrid',
  props: {
    cells: Array
  },
  components: {Tile, EmptyTile},
  methods:{
    getNumbers:function(start,stop){
      return new Array(stop-start).fill(start).map((n,i)=>n+i);
    }
  },
  created() {
    console.log(this.cells);
  }
}
</script>

<style>

.col-board {
  flex: 0 0 40%;
  padding: 1em;
}

.board-tile-padding {
  padding: 2px;
}

</style>