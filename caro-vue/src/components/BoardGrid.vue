<template>
  <div class="col-lg-6 col-12 order-first order-lg-0">
      <v-btn-group>
        <ActionButton v-for="(title, path) in paths" :path="path" :title="title"></ActionButton>
      </v-btn-group>
      <div class="col-board" id="board-grid">
        <div v-for="row in getNumbers(3, 16)" class="btn-group board-tile-padding" id="board-grid-row">
          <div v-for="col in getNumbers(3, 16)">
            <EmptyTile v-if="cells[row][col] === 'none'"></EmptyTile>
            <Tile v-else :color="cells[row][col]"></Tile>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import EmptyTile from "./EmptyTile.vue";
import Tile from "./Tile.vue";
import ActionButton from "./ActionButton.vue";
export default {
  data() {
    return {
      paths : {
        save: 'Save',
        undo: 'Undo',
        redo: 'Redo',
        score: 'Score',
      },
    }
  },
  name: 'BoardGrid',
  props: {
    cells: Array
  },
  components: {ActionButton, Tile, EmptyTile},
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