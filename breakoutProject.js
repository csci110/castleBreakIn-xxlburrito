import {game, Sprite} from "./sgc/sgc.js";

game.setBackground("background.png");

class Wall extends Sprite {
    constructor(x, y, name, image) {
        super();
        this.x = x;
        this.y = y;
        this.name = name;
        this.setImage(image);
        this.accelerateOnBounce = false;
    }
}

new Wall(0, 0, "top", "topWall.png");

let leftWall = new Wall(0, 2, "Left side wall", "sideWall.png");
let rightWall = new Wall(798, 2, "Right side wall", "sideWall.png");

class Princess extends Sprite {
    constructor() {
        super();
        this.name = "Princess Ann";
        this.setImage("ann.png");
        this.height = 48;
        this.width = 48;
        this.x = (game.displayWidth / 2) - 24;
        this.y = (game.displayHeight - 48);
        this.speedWhenWalking = 150;
        this.lives = 3;
        this.accelerateOnBounce = false;
        this.defineAnimation("left", 9, 11);
        this.defineAnimation("right", 3, 5);
    }
    handleLeftArrowKey() {
        this.speed = this.speedWhenWalking;
        this.angle = 180;
        this.playAnimation("left");
    }
    handleRightArrowKey() {
        this.speed = this.speedWhenWalking;
        this.angle = 0;
        this.playAnimation("right");
    }
    handleFirstGameLoop() {
        // Set up a text area to display the number of lives remaining.
        this.livesDisplay = game.createTextArea(game.displayWidth - 144, 20);
        this.updateLivesDisplay();
    }
    updateLivesDisplay() {
        game.writeToTextArea(this.livesDisplay, "Lives = " + this.lives);
    }
    loseALife() {
        this.lives = this.lives - 1;
        this.updateLivesDisplay();
        if (this.lives > 0) {
            new Ball();
        }
        if (this.lives <= 0) {
            game.end("The mysterious stranger has escaped\nPrincess Ann for now!" + 
            "\n\nBetter luck next time.");
        }
    }
    addALife() {
        this.lives = this.lives + 1;
        this.updateLivesDisplay();
    }
    handleGameLoop() {
        this.speed = 0;
        this.x = Math.max(this.width, this.x);
        this.x = Math.min(game.displayWidth-2*(this.width), this.x); 
    }
    handleCollision(otherSprite) {
        let horizontalOffset = this.x - otherSprite.x;
        let verticalOffset = this.y - otherSprite.y;
        if (Math.abs(horizontalOffset) < this.width / 3 && verticalOffset > this.height / 4) {
            otherSprite.angle = 90 + 2 * horizontalOffset;
        }
        return false;
    }                    
}

let ann = new Princess();

class Ball extends Sprite {
    constructor() {
        super();
        this.x = game.displayWidth / 2;
        this.y = (game.displayHeight / 2) + 48;
        this.height = 48;
        this.width = 48;
        this.name = "Spinning ball";
        this.setImage("ball.png");
        this.defineAnimation("spin", 0, 11);
        this.playAnimation("spin", true);
        this.speed = 1;
        this.angle = 50 + Math.random() * 80;
        Ball.ballsInPlay = Ball.ballsInPlay + 1;
    }
    handleGameLoop() {
        if (this.speed < 150) {
            this.speed += 2;
        }
    }
    handleBoundaryContact() {
        game.removeSprite(this);
        Ball.ballsInPlay = Ball.ballsInPlay - 1;
        if (Ball.ballsInPlay <= 0) {
             ann.loseALife();
        }
    }
    
}

Ball.ballsInPlay = 0;

new Ball();

class Block extends Sprite {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.name = "block";
        this.accelerateOnBounce = false;
        this.setImage("block1.png");
        Block.blocksToDestroy = Block.blocksToDestroy + 1;
    }
    handleCollision() {
        game.removeSprite(this);
        Block.blocksToDestroy = Block.blocksToDestroy - 1;
        if (Block.blocksToDestroy <= 0) {
            game.end("Congratulations!\n\nPrincess Ann can continue"+
            " her pursuit\nof the mysterious stranger!");
            return true;
        }
    }
}

Block.blocksToDestroy = 0;

class ExtraLifeBlock extends Block {
    constructor(x, y) {
        super (x, y);
        this.setImage("block2.png");
        Block.blocksToDestroy = Block.blocksToDestroy - 1;
    }
    handleCollision() {
        ann.addALife();
        super.handleCollision();
        return true;
    }
}

new ExtraLifeBlock(700, 500);

class ExtraBallBlock extends Block {
    constructor(x, y) {
        super(x, y);
        this.setImage("block3.png");
    }
    handleCollision() {
        super.handleCollision(); //call function in superclass
        new Ball(); //extend superclass behavior
        return true;
    }
}


for (let i = 0; i < 15; i = i + 1) {
    new Block(48 + i * 48, 32);
}

for (let i = 0; i < 15; i = i + 1) {
    new Block(24 + i * 48, 64);
}

for (let i = 0; i < 15; i = i + 1) {
    new Block(48 + i * 48, 96);
}

for (let i = 0; i < 15; i = i + 1) {
    new ExtraBallBlock(24 + i * 96, 128);
}

for (let i = 0; i < 15; i = i + 1) {
    new Block(48 + i * 48, 160);
}

for (let i = 0; i < 15; i = i + 1) {
    new Block(24 + i * 48, 192);
}

for (let i = 0; i < 15; i = i + 1) {
    new ExtraBallBlock(48 + i * 96, 224);
}

for (let i = 0; i < 15; i = i + 1) {
    new Block(24 + i * 48, 256);
}