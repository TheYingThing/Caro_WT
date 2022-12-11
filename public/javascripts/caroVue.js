const app = Vue.createApp({})

app.component('action-button-group', {
    template: `
        <a class="btn btn-secondary grey-button" type="button" href="http://localhost:9000/save">Save</a>
        <a class="btn btn-secondary grey-button" type="button" href="http://localhost:9000/undo">Undo</a>
        <a class="btn btn-secondary grey-button" type="button" href="http://localhost:9000/redo">Redo</a>
        <a class="btn btn-secondary grey-button" type="button" href="http://localhost:9000/score">End Game</a>
    `
})

app.component('player-tile', {
    props: ['color'],
    template: `
      <img v-if="color === 0" class="player-tile" src="/assets/images/noTile.png" alt="red tile">
      <img v-else-if="color === 1" class="player-tile" src="/assets/images/redButton.png" alt="red tile">
      <img v-else-if="color === 2" class="player-tile" src="/assets/images/blackButton.png" alt="red tile">
      <img v-else-if="color === 3" class="player-tile" src="/assets/images/greyButton.png" alt="red tile">
      <img v-else-if="color === 4" class="player-tile" src="/assets/images/whiteButton.png" alt="red tile">
    `
})

app.component('board-tile', {
    props: ['color'],
    template: `
      <img v-if="color === 0" class="tile-img" src="/assets/images/noTile.png" alt="red tile">
      <img v-else-if="color === 1" class="tile-img" src="/assets/images/redButton.png" alt="red tile">
      <img v-else-if="color === 2" class="tile-img" src="/assets/images/blackButton.png" alt="red tile">
      <img v-else-if="color === 3" class="tile-img" src="/assets/images/greyButton.png" alt="red tile">
      <img v-else-if="color === 4" class="tile-img" src="/assets/images/whiteButton.png" alt="red tile">
    `
})

app.component('tile-list', {
    props: ['count', 'color', 'player'],
    template: `
        <div class="tile-padding">
            <span v-for="n in count" class="tile-padding" :id="player + '-' + color + '-tile-' + n">
                <player-tile :color=color></player-tile>
             </span>
        </div>
    `
})

app.component('empty-board-tile', {
    props: ['row', 'col'],
    methods: {
         async putTileOnly(row, col, color, colorId) {
            let path = "putOnly/" + row + "/" + col + "/" + color;
            let result = await this.executeAjaxForJson(path);
            let resColor = result['color']
            let resPlayer = result['player']
            let resStatus = result['status']
            let resTiles = result['tiles']
            let placedTile  = 3 - resTiles
            console.log(resPlayer)

            let p;
            if (resTiles === 'p1') {
                p = 1;
            } else {
                p = 2;
            }

            let alert = $("#status-alert")
            if (resColor === "none") {
                alert.text(resStatus).css("display", "block")
                websocket.send(resStatus)
            } else {
                alert.css("display", "none")
                console.log(p + "-" + colorId + "-tile-" + placedTile)
                $('#' + p + '-' + colorId + '-tile-' + placedTile).css("display", "none")
                let colorTile = document.getElementById("tile" + row + col)
                colorTile.classList.remove("opacity-noTiles")
                colorTile.firstElementChild.src = "/assets/images/" + result['color'] + "Button.png";

                if(resPlayer === 'p1') {
                    $("#p1-name").removeClass("highlight")
                    $("#p2-name").addClass("highlight")
                } else if (resPlayer === 'p2') {
                    $("#p2-name").removeClass("highlight")
                    $("#p1-name").addClass("highlight")
                }
            }
            $("#p2-points").html(result['pointsP2'].toLocaleString());
            $("#p1-points").html(result['pointsP1'].toLocaleString());
        },
        executeAjaxForJson(path) {
            return $.ajax({
                url: "/" + path,
                type: 'GET',
                dataType: "json",
                success: function (data) {
                    //console.log(data);
                },
                error: function () {
                    console.log("something went wrong");
                }
            })
}
    },
    template: `
        <div class="board-tile-padding" id="board-tiles">
            <span type="button" class="btn btn-secondary dropdown-toggle opacity-noTiles shadow-none empty-tile" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :id="'tile' + row + col">
                <board-tile :color=0></board-tile>
            </span>
            <div class="dropdown-menu">
                <span class="dropdown-item shadow-none dropdown-tile" data-color="red" v-on:click="putTileOnly(row, col, 'red', 1)">
                    <board-tile :color=1></board-tile>
                </span>
                <span class="dropdown-item shadow-none dropdown-tile" data-color="black" v-on:click="putTileOnly(row, col, 'black', 2)">
                    <board-tile :color=2></board-tile>               
                </span>
                <span class="dropdown-item shadow-none dropdown-tile" data-color="grey" v-on:click="putTileOnly(row, col, 'grey', 3)">
                    <board-tile :color=3></board-tile>
                </span>
                <span class="dropdown-item shadow-none dropdown-tile" data-color="white" v-on:click="putTileOnly(row, col, 'white', 4)">
                    <board-tile :color=4></board-tile>
                </span>
            </div>
        </div>
    `
})

app.mount('#page-content')