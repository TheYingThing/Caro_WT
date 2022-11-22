const droppabletiles = document.getElementsByClassName("drop-spot");
const tiles = document.getElementsByClassName("player-tile");
const navLink = document.querySelectorAll(".nav-link");
const menuButtons = document.getElementsByClassName("menu-button");

function executeAjax(path) {
    return $.ajax({
        url: "/" + path,
        type: 'GET'
    })
}

let load = async function(ev) {
    await executeAjax(ev.target.getAttribute("data-viewname"));
    window.location.href = "http://localhost:9000/board";
}

let putTileOnly = async function(color) {
    let tile = document.getElementById("tile");
    let row = tile.getAttribute("data-row");
    console.log(row);
    let col = tile.getAttribute("data-col");
    console.log(col);
    console.log(color);
    const path = '/putOnly/' + row + '/' + col + '/' + color;
    let result = await executeAjax(path);
    const id = row + col;
    console.log(id);

    if (result) {
        const tileToReplace = document.getElementById(id);
        if (tileToReplace) {
            console.log("not undifinded");
            document.getElementById(id).firstChild.src = "@routes.Assets.versioned(\"images/" + color + "Button.png\")";
        } else {
            console.log("undifinded");
        }
    }
}

for (let i = 0; i < droppabletiles.length ; i++) {
    droppabletiles[i].addEventListener('click', putTileOnly, false)
}

for (let i = 0; i < menuButtons.length ; i++) {
    menuButtons[i].addEventListener('click', load, false)
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
    const path = '/game/' + p1 + '/' + p2;
    await executeAjax(path);
    window.location.href = "http://localhost:9000/board";
}

$(document).ready(function(){
    let url = window.location.href;
    console.log(url);
    console.log(this.href);
    $('#navbar-buttons .nav-link').each(function(){
        if (url === this.href) {
            $('#navbar-buttons .nav-link').removeClass("active");
            $(this).addClass("active");
        }
    });
});