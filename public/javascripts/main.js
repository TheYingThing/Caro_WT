const droppabletiles = document.getElementsByClassName("drop-spot");
const tiles = document.getElementsByClassName("player-tile");
const navLink = document.querySelectorAll(".nav-link");

let allowDrop = function(ev) {
    ev.preventDefault();
};

function checkRules(row, col, color) {
    return $.ajax({
        url:'/allRules/' + row + '/' + col + '/' + color,
        type: 'GET'
    });
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

for (let i = 0; i < droppabletiles.length ; i++) {
    droppabletiles[i].addEventListener('drop', drop, false)
    droppabletiles[i].addEventListener('dragover', allowDrop, false)
}

for (let i = 0; i < tiles.length ; i++) {
    tiles[i].addEventListener('dragstart', drag, false)
}

function startGame() {
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
    window.location.href = "http://localhost:9000/game/" + player1 + "/" + player2;
}

$(document).ready(function(){
    $('#navbar-buttons .nav-link').click(function(){
        console.log("bitch");
        $('#navbar-buttons .nav-link').removeClass("active");
        $(this).addClass("active");
    });
});


