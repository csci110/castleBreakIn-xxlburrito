import {game, Sprite} from "./sgc/sgc.js";

game.setBackground("grass.png");

class Wall extends Sprite() {
    constructor(x, y, name, image) {
        super();
        this.accelerateOnBounce = false;
    }
}

new Wall(0, 0, "A spooky castle wall", "castle.png");
