function draw() {
    ctx.fillStyle = "#eaeaea";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    switch (layout) {
        case 1:
            drawGame();
            break;
        case 0:
            drawLayoutMenu();
            break;
        case 2:
            drawGameEnd();
            break;
        case 3:
            drawInstruction();
            break;
        case 4:
            drawChooseDiff();
            break;
    }

    //General controls
    buttons[4].text = "Zvuky: " + (sounds ? "Ano" : "Nie");
    buttons[4].draw();

    if (layout !== 0) {
        buttons[1].draw();
    }
}

function drawBackground() {
    ctx.fillStyle = ctx.createPattern(sky, 'repeat');

    ctx.save();
    ctx.translate(0 - (distance / 5) % 3000, 0);
    ctx.fillRect(0, 0, 6000, 700);
    ctx.restore();

    ctx.fillStyle = ctx.createPattern(floor, 'repeat');

    ctx.save();
    ctx.translate(0 - distance % canvas.width, canvas.height - 30);
    ctx.fillRect(0, 0, canvas.width * 2, 30);
    ctx.restore();

}

function drawTitle(text) {
    ctx.fillStyle = "#222222";
    ctx.font = '60px san-serif';
    ctx.fillText(text, (canvas.width / 2) - (ctx.measureText(text).width / 2), 160);
}

function drawScore() {
    ctx.fillStyle = "#222222";
    ctx.font = '40px san-serif';
    let textScore = "Body: " + collectedPoints + "/" + countOfPoints;
    ctx.fillText(textScore, (canvas.width / 2) - (ctx.measureText(textScore).width / 2) - 45, 80);
}

function drawGame() {
    drawBackground();
    if (distance > levelLength || absences > 2) {
        setLayout(2);
    }

    if (keys && (keys[38]) && player.vy > jumpLimit && falling === false) {
        player.vy += -20;
        jump.play();
    }
    if (keys && keys[39]) {
        distance += +5;
    }

    if (keys && keys[37]) {
        distance += -4;
    }
    drawObjects();
    checkCollisions();
    drawPlayer();
    if ((keys && (keys[38])) === false || falling === true) gravity();
    move();

    for (let i = 0; i < countOfProjects; i++) {
        if (projects[i].visible === true && projects[i].x - distance < 0) {
            gameOverText = "Neodovzdaný projekt";
            collectedPoints = 0;
            setLayout(2);
        }
    }

    if (absences > 0) ctx.drawImage(absenceImg, 160, 15, 50, 50);
    if (absences > 1) ctx.drawImage(absenceImg, 230, 15, 50, 50);
    if (absences > 2) {
        gameOverText = "Priveľa absencií";
        collectedPoints = 0;
        setLayout(2);
    }
    drawScore();
}

let animateMove = 0;
function drawPlayer() {
    let image = player.image;
    if (falling) {
        image = playerFallImg;
        animateMove = 0;
    }
    else if (player.vy !== 0) {
        image = playerJumpImg;
        animateMove = 0;
    }

    ctx.drawImage(image, animateMove, 0, 79, 150, player.x + player.vx, player.y + player.vy, 79, 150);
    // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
}

setInterval(function () {
    animateMove += 79;
    if (animateMove > 237) animateMove = 0;
}, 50);

function drawChooseDiff() {
    drawTitle("Vyber obtiažnosti");
    buttons[6].draw();
    buttons[7].draw();
    buttons[8].draw();
}

//vykreslenie menu
function drawLayoutMenu() {
    drawTitle("FX Run!");
    buttons[0].draw();
    buttons[3].draw();
}

//vykreslenie ovládania
function drawInstruction() {
    drawTitle("FX Run!");
    ctx.drawImage(controls, canvas.width / 2 - 370, 200);
    buttons[5].draw();
}

//vykreslenie game over obrazovky
function drawGameEnd() {
    ctx.fillStyle = "#f50";
    ctx.font = '40px san-serif';
    let gameEndText = "Ukončený predmet";
    ctx.fillText(gameEndText, (canvas.width / 2) - (ctx.measureText(gameEndText).width / 2), 200);
    ctx.fillStyle = "#222222";
    let collectedText = "Výsledok: " + collectedPoints + " bodov";
    if (gameOverText != null) collectedText = gameOverText;
    ctx.fillText(collectedText, (canvas.width / 2) - (ctx.measureText(collectedText).width / 2), 260);

    let grade;
    if (collectedPoints <= 56) grade = 'FX';
    else if (collectedPoints <= 65) grade = 'E';
    else if (collectedPoints <= 74) grade = 'D';
    else if (collectedPoints <= 83) grade = 'C';
    else if (collectedPoints <= 92) grade = 'B';
    else grade = 'A';

    ctx.font = '70px san-serif';
    ctx.fillStyle = "#ff3a00";
    ctx.fillText(grade, (canvas.width / 2) - (ctx.measureText(grade).width / 2), 325);

    buttons[2].draw();
}

function drawObjects() {
    for (let i = 0; i < countOfPoints; i++) {
        if (points[i].visible === true)
            ctx.drawImage(points[i].image, points[i].x - distance, points[i].y, 40, 40);
    }
    for (let i = 0; i < countOfProjects; i++) {
        if (projects[i].visible === true)
            ctx.drawImage(projects[i].image, projects[i].x - distance, projects[i].y, 100, 60);
    }
    for (let i = 0; i < countOfBeers; i++) {
        if (beers[i].visible === true)
            ctx.drawImage(beers[i].image, beers[i].x - distance, beers[i].y, 76, 79);
    }
    for (let i = 0; i < countOfOpenDoors; i++) {
        if (doors[i].visible === true)
            ctx.drawImage(doors[i].image, doors[i].x - distance, doors[i].y, 16, 176);
    }
}