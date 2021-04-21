// staticke herne hodnoty
let jumpLimit = -(300);
let defaultPlayerPos = canvas.height - 178;
let layout = 0;
// 0 - home
// 1 - game
// 2 - gameOver
// 3 - instructions
// 4 - choose difficulty

let difficulty = 1;
// 1 - easy
// 2 - medium
// 3 - hard

// Difficulty settings
let distance = 0; //how far in game
let levelLength = 1000;
let countOfPoints = 100;
let collectedPoints = 0;
let countOfOpenDoors = 0;
let countOfBeers = 0;
let countOfProjects = 0;
let absences = 0;
let gameOverText = null;

// Elements
let buttons = [];
// 0 - Play
// 1 - Back
// 2 - retry
// 3 - open instruction
// 4 - Sounds ON/OFF
// 5 - Play from instruction
// 6 - easy level
// 7 - medium level
// 8 - hard level
buttons[0] = new Button("HRAŤ HRU", canvas.width / 2 - 150, canvas.height / 2 - 150, 300, 80, function () {
    setLayout(4);
}, 35);
buttons[1] = new Button("Späť", canvas.width - 130, 10, 120, 40, function () {
    setLayout(0);
}, 20);
buttons[2] = new Button("OPAKOVAŤ PREDMET", canvas.width / 2 - (500 / 2), 360, 500, 100, function () {
    setLayout(1);
}, 34);
buttons[3] = new Button("OVLÁDANIE", canvas.width / 2 - 150, canvas.height / 2 - 50, 300, 80, function () {
    setLayout(3);
}, 35);
buttons[4] = new Button("Zvuky: ##", 10, 10, 120, 40, function () {
    setSounds(!sounds)}, 20);
buttons[5] = new Button("ZAČAŤ HRU", canvas.width / 2 - 160, canvas.height / 2 + 200, 300, 85, function () {
    setLayout(4);
}, 30);
buttons[6] = new Button("Ľahká", canvas.width / 2 - 125, canvas.height / 2 - 150, 250, 80, function () {
    setLevel(1);
}, 35);
buttons[7] = new Button("Stredná", canvas.width / 2 - 125, canvas.height / 2 - 50, 250, 80, function () {
    setLevel(2);
}, 35);
buttons[8] = new Button("Ťažká", canvas.width / 2 - 125, canvas.height / 2 + 50, 250, 80, function () {
    setLevel(3);
}, 35);

function move() {
    distance += 6;
}

let player = new Player();
let points = [];
let doors = [];
let beers = [];
let projects = [];

function createPoints() {
    let newPoint;
    for (let i = 0; i < countOfPoints; i++) {
        let randomX = (45) * Math.floor(Math.random() * ((levelLength - 550) / 45));
        let randomY = 42 * Math.floor(Math.random() * 10);
        newPoint = new Point(550 + randomX, 250 + randomY);
        points[i] = newPoint;
    }
}

function createBeers(count) {
    let newBeer;
    countOfBeers = Math.floor(Math.random() * count);
    for (let i = 0; i < countOfBeers; i++) {
        let randomX = 80 * Math.floor(Math.random() * ((levelLength - 550) / 80));
        let randomY = 80 * Math.floor(Math.random() * 3);
        newBeer = new Beer(550 + randomX, 250 + randomY);
        beers[i] = newBeer;
    }
}

function createProjects(count) {
    let newProject;
    countOfProjects = Math.floor(Math.random() * count);
    for (let i = 0; i < countOfProjects; i++) {
        let randomX = 300 * Math.floor(Math.random() * ((levelLength - 550) / 300));
        let randomY = 60 * Math.floor(Math.random() * 4);
        newProject = new Project(550 + randomX, 250 + randomY);
        projects[i] = newProject;
    }
}

function createDoors() {
    let newDoor;
    countOfOpenDoors = 3 + Math.floor(Math.random() * 5);
    let i;
    for (i = 0; i < countOfOpenDoors; i++) {
        let randomX = (100) * Math.floor(Math.random() * ((levelLength - 550) / 100));
        newDoor = new Door(550 + randomX, canvas.height - 206, true);
        doors[i] = newDoor;
    }
}

function checkCollisions() {
    for (let i = 0; i < countOfPoints; i++) {
        if (points[i].visible === true && points[i].x - distance > 160 && points[i].x - distance < 260
            && player.vy + player.y - 50 < points[i].y && player.vy + player.y + 120 > points[i].y) {
            points[i].visible = false;
            collectedPoints++;
            pointCollect.play();
        }
    }
    for (let i = 0; i < countOfProjects; i++) {
        if (projects[i].visible === true && projects[i].x - distance > 160 && projects[i].x - distance < 260
            && player.vy + player.y - 50 < projects[i].y && player.vy + player.y + 120 > projects[i].y) {
            projects[i].visible = false;
        }
    }
    for (let i = 0; i < countOfBeers; i++) {
        if (beers[i].visible === true && beers[i].x - distance > 160 && beers[i].x - distance < 260
            && player.vy + player.y - 50 < beers[i].y && player.vy + player.y + 120 > beers[i].y) {
            beers[i].visible = false;
            collectedPoints = collectedPoints - 5;
        }
    }
    for (let i = 0; i < countOfOpenDoors; i++) {
        if (doors[i].visited === false && doors[i].open === true && doors[i].x - distance > 160 && doors[i].x - distance < 260
            && (player.vy + player.y) < (canvas.height - 206)) {
            absences++;
            doors[i].visited = true;
        }
    }
}

function gravity() {
    if (player.vy < 0) {
        player.vy += 15;
    } else if (player.vy > 0) {
        player.vy = 0;
    } else if (player.vy === 0) {
        player.vy = 0;
        falling = false;
    }
    if (player.vy > canvas.height) { //Zázrakom by sa dostal niekde do preč
        player.vy = 0;
    }
}

let falling = false;
let keys;
window.addEventListener('keydown', function (e) {
    keys = (keys || []);
    keys[e.keyCode] = (e.type === "keydown");
    if (player.vy <= jumpLimit) falling = true;
});
window.addEventListener('keyup', function (e) {
    keys[e.keyCode] = (e.type === "keydown");
    falling = true;
});

document.addEventListener('click', function (e) {
    checkClick(buttons[4], e.clientX, e.clientY); //Zapnutie zvuku zobrazené všade

    if (layout !== 0) {
        checkClick(buttons[1], e.clientX, e.clientY); // Späť všade okrem domova
    }
    if (layout === 0) {
        checkClick(buttons[0], e.clientX, e.clientY);
        checkClick(buttons[3], e.clientX, e.clientY);
    } else if (layout === 2) {
        checkClick(buttons[2], e.clientX, e.clientY);
    } else if (layout === 3) {
        checkClick(buttons[5], e.clientX, e.clientY);
    } else if (layout === 4) {
        checkClick(buttons[6], e.clientX, e.clientY);
        checkClick(buttons[7], e.clientX, e.clientY);
        checkClick(buttons[8], e.clientX, e.clientY);
    }
});

function checkClick(element, x, y) {
    if (x > element.xLeft && x < element.xLeft + element.width && y > element.yTop && y < element.yTop + element.height) {
        element.onClick();
    }
}

setInterval(function () {
    draw();
}, 30);

function startGame(difficulty) {
    // Resetovať hodnoty
    player.vx = 0;
    player.vy = 0;
    soundtrack.play();
    distance = 0;
    collectedPoints = 0;
    absences = 0;
    gameOverText = null;
    points = [];
    doors = [];
    beers = [];
    projects = [];
    countOfOpenDoors = 0;
    countOfBeers = 0;
    countOfProjects = 0;

    // Nastaviť parametre podľa vybranej obtiažnosti
    switch (difficulty) {
        case 1:
            levelLength = 10000;
            break;
        case 2:
            levelLength = 8000;
            createProjects(2);
            createBeers(5);
            break;
        case 3:
            levelLength = 6000;
            createBeers(10);
            createProjects(5);
            break;
    }
    createPoints();
    createDoors();
}

function setLayout(e) {
    layout = e;
    if (e === 1) {
        startGame(difficulty);
    } else soundtrack.stop();
    if (e === 2) {
        if (collectedPoints >= 56) gameWin.play();
        else gameOver.play();
    }

}

function setLevel(d) {
    difficulty = d;
    setLayout(1);
}