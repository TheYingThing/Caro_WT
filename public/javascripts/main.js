const droppabletiles = document.getElementsByClassName("drop-spot");
const tiles = document.getElementsByClassName("player-tile");
const navLink = document.querySelectorAll(".nav-link");

let allowDrop = function(ev) {
    ev.preventDefault();
};

let drop = function(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    document.getElementById(data).classList.add("set-tile");
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
if (navLink.length) {
    navLink.forEach((navLink) => {
        navLink.addEventListener('click', (e) => {
          navLink.forEach((navItem) => {
              navLink.classList.remove('active');
          });
          e.preventDefault();
          navLink.classList.add('active');
        });
    });
}




