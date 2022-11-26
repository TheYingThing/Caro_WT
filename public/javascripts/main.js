const droppabletiles = document.getElementsByClassName("drop-spot");
const menuButtons = document.getElementsByClassName("menu-button");
const dropdownTiles = document.getElementsByClassName("dropdown-tile");

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
    console.log(resColor)
    let alert = document.getElementById("status-alert")
    if (resColor === "none") {
        alert.textContent = resStatus
        console.log(resStatus)
        alert.style.display = "block"

        if(resPlayer === 'p1') {
            let points = document.getElementById("p2-points")
            points.innerHTML = result['pointsP2'].toLocaleString()
        } else if (resPlayer === 'p2') {
            let points = document.getElementById("p1-points")
            points.innerHTML = result['pointsP1'].toLocaleString()
        }
    } else {
        alert.style.display = "none"
        let tiles = document.getElementById(resColor + "-tiles-" + resPlayer)
        tiles.firstElementChild.remove()
        let colorTile = document.getElementById("tile" + row + col)
        colorTile.classList.remove("opacity-noTiles")
        colorTile.firstElementChild.src = "/assets/images/" + result['color'] + "Button.png";

        if(resPlayer === 'p1') {
            document.getElementById(resPlayer + "-name").classList.remove("highlight")
            document.getElementById("p2-name").classList.add("highlight")
        } else if (resPlayer === 'p2') {
            document.getElementById(resPlayer + "-name").classList.remove("highlight")
            document.getElementById("p1-name").classList.add("highlight")
        }

        let points = document.getElementById(resPlayer + "-points")

        if(resPlayer === 'p1') {
            points.innerHTML = result['pointsP1'].toLocaleString()
        } else if (resPlayer === 'p2') {
            points.innerHTML = result['pointsP2'].toLocaleString()
        }
    }

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
    const path = '/game/' + player1 + '/' + player2;
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