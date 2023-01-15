<template>
  <div class="col-lg-6 col-12 order-first order-lg-0 col-board" id="board-grid">
    <div class="actions-padding">
      <q-btn-group>
        <ActionButton v-for="(title, path) in paths" :path="path" :title="title"></ActionButton>
      </q-btn-group>
    </div>
    <div v-for="row in getNumbers(3, 16)" id="board-grid-row" class="board-row-padding">
      <span v-for="col in getNumbers(3, 16)" class="q-btn-group board-tile-padding shadow-none">
        <EmptyTile v-if="cells[row][col] === 'none'" :row="row" :col="col"></EmptyTile>
        <Tile v-else :color="cells[row][col]" class="board-tile-padding"></Tile>
      </span>
    </div>
    <div class="game-status top-padding" id="status-alert">
      <div>
          <div class="text-h4">{{ status }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import EmptyTile from "./EmptyTile.vue";
import Tile from "./Tile.vue";
import ActionButton from "./ActionButton.vue";
import $ from "jquery";

export default {
  data() {
    return {
      paths: {
        save: 'Save',
        undo: 'Undo',
        redo: 'Redo',
        score: 'Score',
      },
    }
  },
  name: 'BoardGrid',
  props: {
    cells: Array,
    status: String
  },
  components: {ActionButton, Tile, EmptyTile},
  methods: {
    getNumbers: function (start, stop) {
      return new Array(stop - start).fill(start).map((n, i) => n + i);
    }
  },
  created() {
    console.log(this.cells);
  }
}
</script>

<style>

.col-board {
  flex: 0 0 50%;
  padding: 2px;
}

.board-tile-padding {
  padding: 2px;
}

.shadow-none {
  box-shadow: none;
}

.actions-padding {
  padding-bottom: 20px;
}

.board-row-padding {
  padding-bottom: 2px;
}


</style>