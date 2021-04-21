class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = pointImg;
        this.visible = true;
    }
}

class Beer {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = beerImg;
        this.visible = true;
    }
}

class Project {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = projectImg;
        this.visible = true;
    }
}

class Player {
    constructor() {
        this.x = 200;
        this.y = defaultPlayerPos;
        this.vx = 0;
        this.vy = 0;
        this.image = playerImg;
    }
}

class Door {
    constructor(x, y, open) {
        this.x = x;
        this.y = y;
        this.open = open;
        this.visible = true;
        this.visited = false;
        this.image = doorOpenImg;
    }
}