const droppabletiles = document.getElementsByClassName("drop-spot");
const menuButtons = document.getElementsByClassName("menu-button");
const dropdownTiles = document.getElementsByClassName("dropdown-tile");
let websocket;

websocket = new WebSocket("ws://localhost:9000/websocket")


function executeAjax(path) {
    return $.ajax({
        url: "/" + path,
        type: 'GET'
    })
}

let load = async function(ev) {
    let path = ev.target.getAttribute("data-viewname");

    if (path === "newGame") {
        let content = document.getElementById("page-content");
        content.innerHTML = await executeAjax(path);
    } else {
        await executeAjax(path);
        window.location.href = "http://localhost:9000/board";
    }
}

function addListeners() {

    for (let i = 0; i < droppabletiles.length ; i++) {
        droppabletiles[i].addEventListener('click', putTileOnly, false)
    }

    for (let i = 0; i < menuButtons.length ; i++) {
        menuButtons[i].addEventListener('click', load, false)
    }
}

async function startGame()  {
    const elements = document.getElementById("nameForm").elements;
    let player1;
    let player2;

    if (elements.item(0).value == null || elements.item(0).value === "" ) {
        player1 = "Player 1";
    } else {
        player1 = elements.item(0).value;
    }

    if (elements.item(1).value == null || elements.item(1).value === "" ) {
        player2 = "Player 2";
    } else {
        player2 = elements.item(1).value;
    }
    const path = 'game/' + player1 + '/' + player2;
    await executeAjax(path);
    window.location.href = "http://localhost:9000/board";
}

$(document).ready(function(){
    let url = window.location.href;
    $('#navbar-buttons .nav-link').each(function(){
        if (url === this.href) {
            $('#navbar-buttons .nav-link').removeClass("active");
            $(this).addClass("active");
        }
    });
});

function updatePlayers(json) {
    console.log("updating player")
    let p1 = json['player1']
    let p2 = json['player2']
    $("#p2-points").html(p2['points']);
    $("#p1-points").html(p1['points']);
    $("#p2-name").html(p2['name']);
    $("#p1-name").html(p1['name']);

    let lastColor = json['last']

    console.log("last:" + lastColor)

    let moves = json['moves']
    if(moves % 2 === 0) {
        $("#p2-name").removeClass("highlight")
        $("#p1-name").addClass("highlight")
    } else {
        $("#p1-name").removeClass("highlight")
        $("#p2-name").addClass("highlight")
    }

    updateTiles("1", p1['tiles'])
    updateTiles("2", p2['tiles'])
}

function updateTiles(player, tiles) {
    let redTiles = tiles ['red']
    let blackTiles = tiles ['black']
    let greyTiles = tiles ['grey']
    let whiteTiles = tiles ['white']

    setTileOpacity(player, 1, redTiles)
    setTileOpacity(player, 2, blackTiles)
    setTileOpacity(player, 3, greyTiles)
    setTileOpacity(player, 4, whiteTiles)
}

function setTileOpacity(player, color, tiles) {
    if (tiles === 3) {
        $('#' + player + '-' + color + 'tile0').css("display", "inline")
        $('#' + player + '-' + color + 'tile1').css("display", "inline")
        $('#' + player + '-' + color + 'tile2').css("display", "inline")
    } else if (tiles === 2) {
        $('#' + player + '-' + color + 'tile0').css("display", "none")
        $('#' + player + '-' + color + 'tile1').css("display", "inline")
        $('#' + player + '-' + color + 'tile2').css("display", "inline")
    } else if (tiles === 1) {
        $('#' + player + '-' + color + 'tile0').css("display", "none")
        $('#' + player + '-' + color + 'tile1').css("display", "none")
        $('#' + player + '-' + color + 'tile2').css("display", "inline")
    } else if (tiles === 0) {
        $('#' + player + '-' + color + 'tile0').css("display", "none")
        $('#' + player + '-' + color + 'tile1').css("display", "none")
        $('#' + player + '-' + color + 'tile2').css("display", "none")
    }
}

function updateBoard(json) {
    let cells = json['cells'];
    for(let r = 2 ; r < 14 ; r++) {
        for(let c = 2 ; c < 14 ; c++ ) {
            let cell = cells[r][c]
            let colorTile = document.getElementById("tile" + r + c)
            if(cell !== "none") {
                console.log("id : tile" + r + c)
                if (colorTile !== null && colorTile.classList !== null) {
                    colorTile.classList.remove("opacity-noTiles")
                    colorTile.firstElementChild.src = "/assets/images/" + cell + "Button.png";
                }
            } else {
                if (colorTile !== null && colorTile.classList !== null) {
                    colorTile.classList.add("opacity-noTiles")
                    colorTile.firstElementChild.src = "/assets/images/noTile.png";
                }
            }
        }
    }
}

function updateGame(json) {
    console.log("updating game")
    updatePlayers(json)
    updateBoard(json)
}

function connectWebSocket() {

    websocket.onopen = function(event) {
        console.log("opening connection to Websocket")
        websocket.send("opening connection")
    }

    websocket.onclose = function () {
        console.log("Closed connection to Websocket")
    }

    websocket.onerror = function (error) {
        console.log("Websocket caused error: " + error)
    }

    websocket.onmessage = function (e) {
        console.log("message recieved")
        if (typeof e.data === "string") {
            let json = JSON.parse(e.data)
            updateGame(json)
            addListeners()
        }
    }
}

$(document).ready(function () {
    console.log("document ready, should show websocket json??")
    connectWebSocket()
    addListeners()
})

