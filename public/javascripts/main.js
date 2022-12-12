const droppabletiles = document.getElementsByClassName("drop-spot");
const menuButtons = document.getElementsByClassName("menu-button");
const dropdownTiles = document.getElementsByClassName("dropdown-tile");
let websocket;

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

$(document).ready(function () {
    console.log("document ready, should show websocket json??")
    addListeners()
})

