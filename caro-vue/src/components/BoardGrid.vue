<template>
  <div class="col-board" id="board-grid">
    <div v-for="cellrow in board" class="btn-group" id="board-grid-row">

      @if(controller.controller.getCellColor(row, col) == "none") {
      <div class="board-tile-padding" id="board-tiles">
                            <span type="button" class="btn btn-secondary dropdown-toggle opacity-noTiles shadow-none empty-tile"  data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="tile@row@col">
                              <Tile :tileColor=tileColor></Tile>
                            </span>
        <div class="dropdown-menu" data-row="@row" data-col="@col">
          <span class="dropdown-item shadow-none dropdown-tile" data-color="red">
            <Tile :tileColor="red"></Tile>
          </span>
          <span class="dropdown-item shadow-none dropdown-tile" data-color="black" >
            <Tile :tileColor="black"></Tile>
          </span>
          <span class="dropdown-item shadow-none dropdown-tile" data-color="grey" >
            <Tile :tileColor="grey"></Tile>
          </span>
          <span class="dropdown-item shadow-none dropdown-tile" data-color="white" >
            <Tile :tileColor="white"></Tile>
          </span>
        </div>
      </div>
      } else if(controller.controller.getCellColor(row, col) == "red") {
      <span v-else class="board-tile-padding">
                        <Tile :tileColor=></Tile>
                    </span>
      } else if(controller.controller.getCellColor(row, col) == "black") {
      <span class="board-tile-padding">
                        <img class="tile-img" src="@routes.Assets.versioned("images/blackButton.png")" alt="black tile">
                    </span>
      } else if(controller.controller.getCellColor(row, col) == "grey") {
      <span class="board-tile-padding">
                        <img class="tile-img" src="@routes.Assets.versioned("images/greyButton.png")" alt="grey tile">
                    </span>
      } else if(controller.controller.getCellColor(row, col) == "white") {
      <span class="board-tile-padding">
                        <img class="tile-img" src="@routes.Assets.versioned("images/whiteButton.png")" alt="white tile">
                    </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardGrid',
  props: ['board'],
}
</script>