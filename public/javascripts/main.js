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

function executeAjaxForJson(path) {
    return $.ajax({
        url: "/" + path,
        type: 'GET',
        dataType: "json",
        success: function (data) {
            console.log(data);
        },
        error: function () {
            console.log("something went wrong");
        }
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

let putTileOnly = async function(ev) {
    let menu = ev.target.closest(".dropdown-menu");
    let row = menu.getAttribute("data-row");
    let col = menu.getAttribute("data-col");
    let color = ev.target.parentElement.getAttribute("data-color");
    let path = "putOnly/" + row + "/" + col + "/" + color;
    let result = await executeAjaxForJson(path);
    let resColor = result['color']
    let resPlayer = result['player']
    let resStatus = result['status']
    console.log(resPlayer)

    let alert = $("#status-alert")
    if (resColor === "none") {
        alert.text(resStatus).css("display", "block")
        websocket.send(resStatus)
    } else {
        alert.css("display", "none")
        $('#' + resColor + '-tiles-' + resPlayer + ':first-child').remove()
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
        let data =
            '{"action": "put",' +
            '"row":' + row + ','
            +'"col":' + col + ','
            +'"color":' + '"' + resColor + '"' + ','
            +'"player":' + '"' + resPlayer + '"' + ','
            +'"p1":' + result['pointsP1'] + ','
            +'"p2":' +  result['pointsP2']  +'}'

        if ( websocket.readyState === 3 || websocket.readyState === 2) {
            websocket.close();
            websocket = new WebSocket("ws://localhost:9000/websocket");

            // wait until new connection is open
            while (websocket.readyState !== 1) {
                await new Promise(r => setTimeout(r, 250));
            }
        }
        websocket.send(data)

        /**
         *         if (isOpen(websocket)) {
         *             websocket.send(data)
         *         } else {
         *             console.log("socket closed")
         *         }
         */


    }
    $("#p2-points").html(result['pointsP2'].toLocaleString());
    $("#p1-points").html(result['pointsP1'].toLocaleString());

}

function isOpen(ws) { return ws.readyState === ws.OPEN }


function updateTile(data) {
    console.log("update")
    console.log(data)
    console.log(data.color)
    let alert = $("#status-alert")
    if (data.color === "none") {
        alert.text(resStatus).css("display", "block")
    } else {
        alert.css("display", "none")
        $('#' + data.color + '-tiles-' + data.player + ':first-child').remove()
        let colorTile = document.getElementById("tile" + data.row + data.col)
        colorTile.classList.remove("opacity-noTiles")
        colorTile.firstElementChild.src = "/assets/images/" + data.color + "Button.png";

        if(data.player === 'p1') {
            $("#p1-name").removeClass("highlight")
            $("#p2-name").addClass("highlight")
        } else if (data.player === 'p2') {
            $("#p2-name").removeClass("highlight")
            $("#p1-name").addClass("highlight")
        }
    }
    $("#p2-points").html(data.p2);
    $("#p1-points").html(data.p1);
}

function addListeners() {
    for (let i = 0; i < dropdownTiles.length ; i++) {
        dropdownTiles[i].addEventListener('click', putTileOnly, false);
    }

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
    $("#p2-points").html(json.p2);
    $("#p1-points").html(json.p1);
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
            console.log(e.data)
            let json = JSON.parse(e.data)
            console.log(json)
            if (json.action === "put") {
                updateTile(json)
            } else if (json.action === "update") {
                updatePlayers(json)
            }
            addListeners()
        }
    }
}

$(document).ready(function () {
    console.log("document ready, should show websocket json??")
    connectWebSocket()
    addListeners()

})