const droppabletiles = document.getElementsByClassName("drop-spot");
const tiles = document.getElementsByClassName("player-tile");
const navLink = document.querySelectorAll(".nav-link");
const menuButtons = document.getElementsByClassName("menu-button");
const dropdownTiles = document.getElementsByClassName("dropdown-tile");

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

let putTileOnly = async function(ev) {
    console.log("hey, yes");
    let menu = ev.target.closest(".dropdown-menu");
    let row = menu.getAttribute("data-row");
    let col = menu.getAttribute("data-col");
    let color = ev.target.parentElement.getAttribute("data-color");
    let result = await putOnly(row, col, color);
    console.log(result);
    document.getElementById("tile" + row + col).firstElementChild.src = "/assets/images/" + result['color'] + "Button.png";

}
let drop = async function(ev) {
    console.log(ev.target.getAttribute("data-row"));
    let row = ev.target.getAttribute("data-row");
    let col = ev.target.getAttribute("data-column");
    let tileID = ev.dataTransfer.getData("text");
    let color = document.getElementById(tileID).getAttribute("data-color");
    let valid = await checkRules(row, col, color)
    $.ajax({
        url:'/put/' + row + '/' + col + '/' + color,
        type: 'GET'
    });
};

let drag = function(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

for (let i = 0; i < dropdownTiles.length ; i++) {
    dropdownTiles[i].addEventListener('click', putTileOnly, false);
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