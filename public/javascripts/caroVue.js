const app = Vue.createApp({})

app.component('action-button-group', {
    template: `
        <a class="btn btn-secondary grey-button" type="button" href="http://localhost:9000/save">Save</a>
        <a class="btn btn-secondary grey-button" type="button" href="http://localhost:9000/undo">Undo</a>
        <a class="btn btn-secondary grey-button" type="button" href="http://localhost:9000/redo">Redo</a>
        <a class="btn btn-secondary grey-button" type="button" href="http://localhost:9000/score">End Game</a>
    `
})

app.component('tile', {
    props: ['color'],
    template: `
      <img v-if="color === 0" class="player-tile" src="/assets/images/noTile.png" alt="red tile">
      <img v-else-if="color === 1" class="player-tile" src="/assets/images/redButton.png" alt="red tile">
      <img v-else-if="color === 2" class="player-tile" src="/assets/images/blackButton.png" alt="red tile">
      <img v-else-if="color === 3" class="player-tile" src="/assets/images/greyButton.png" alt="red tile">
      <img v-else-if="color === 4" class="player-tile" src="/assets/images/whiteButton.png" alt="red tile">
    `
})

app.component('tile-list', {
    props: ['count', 'color', 'player'],
    template: `
        <div class="tile-padding">
            <span v-for="n in count" class="tile-padding" :id="player + '-' + color + '-Tile-' + n">
                <tile :color=color></tile>
             </span>
        </div>
    `
})

app.mount('#page-content')