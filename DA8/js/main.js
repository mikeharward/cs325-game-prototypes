import "./phaser.js";

// You can copy-and-paste the code from any of the examples at https://examples.phaser.io here.
// You will need to change the `parent` parameter passed to `new Phaser.Game()` from
// `phaser-example` to `game`, which is the id of the HTML element where we
// want the game to go.
// The assets (and code) can be found at: https://github.com/photonstorm/phaser3-examples
// You will need to change the paths you pass to `this.load.image()` or any other
// loading functions to reflect where you are putting the assets.
// All loading functions will typically all be found inside `preload()`.

// The simplest class example: https://phaser.io/examples/v3/view/scenes/scene-from-es6-class

class MyScene extends Phaser.Scene {
    
    constructor() {
        super();
        
        this.bouncy = null;
    }
    
    preload() {
        this.load.image( 'player', 'assets/player.png' );
        this.load.image('grass', 'assets/grass.png');
        this.load.image('enemy', 'assets/enemy.png');
        this.load.image('end', 'assets/end.png');
        this.load.audio('win', 'assets/win.wav');
        this.load.audio('music', 'assets/music.wav');
        this.load.audio('lose', 'assets/lose.wav');
    }
    
    create() {
        this.physics.add.image(200,150,'grass').setScale(2);
        this.physics.add.image(600,150,'grass').setScale(2);
        this.physics.add.image(200,450,'grass').setScale(2);
        this.physics.add.image(600,450,'grass').setScale(2);

        this.player = this.physics.add.sprite(50,300,'player').setScale(0.75);
        this.player.setCollideWorldBounds(true);

        this.enemy1 = this.physics.add.sprite(300,200,'enemy');
        this.enemy2 = this.physics.add.sprite(400,40,'enemy');
        this.enemy3 = this.physics.add.sprite(400,550,'enemy');
        this.enemy4 = this.physics.add.sprite(300,400,'enemy');
        this.enemy5 = this.physics.add.sprite(400,300,'enemy');
        this.enemy6 = this.physics.add.sprite(500,200,'enemy');

        this.end = this.physics.add.sprite(750,300, 'end');
        
        this.physics.add.overlap(this.player, this.enemy1, killPlayer, null, this);
        this.physics.add.overlap(this.player, this.enemy2, killPlayer, null, this);
        this.physics.add.overlap(this.player, this.enemy3, killPlayer, null, this);
        this.physics.add.overlap(this.player, this.enemy4, killPlayer, null, this);
        this.physics.add.overlap(this.player, this.enemy5, killPlayer, null, this);
        this.physics.add.overlap(this.player, this.enemy6, killPlayer, null, this);
        this.physics.add.overlap(this.player, this.end, Win, null, this);

        this.alt_cursors = this.input.keyboard.addKeys({ 'up': Phaser.Input.Keyboard.KeyCodes.W, 'down': Phaser.Input.Keyboard.KeyCodes.S, 'left': Phaser.Input.Keyboard.KeyCodes.A, 'right': Phaser.Input.Keyboard.KeyCodes.D });
        
        this.sound.add('music', {loop: true, volume: 0.05}).play();

        this.timer = this.time.addEvent({
            delay: 4000,
            loop:true
        });
    }
    
    update() {
        // Player Movement
        if (this.alt_cursors.left.isDown && !this.alt_cursors.right.isDown) 
        {
            this.player.setVelocityX(-100);
        }
        if (this.alt_cursors.right.isDown && !this.alt_cursors.left.isDown) 
        {
            this.player.setVelocityX(100);
        }    
        if (this.alt_cursors.up.isDown && !this.alt_cursors.down.isDown) 
        {
            this.player.setVelocityY(-100);
        }    
        if (this.alt_cursors.down.isDown && !this.alt_cursors.up.isDown) 
        {
            this.player.setVelocityY(100);
        }     
        if (this.alt_cursors.left.isDown && this.alt_cursors.right.isDown) 
        {
            this.player.setVelocityX(0);
        }
        if (this.alt_cursors.up.isDown && this.alt_cursors.down.isDown) 
        {
            this.player.setVelocityY(0);
        }   
        if (!this.alt_cursors.left.isDown && !this.alt_cursors.right.isDown) 
        {
            this.player.setVelocityX(0);
        }
        if (!this.alt_cursors.up.isDown && !this.alt_cursors.down.isDown) 
        {
            this.player.setVelocityY(0);
        }

        // Enemy Movement
        if (this.timer.getElapsed() < 2000)
        {
            this.enemy1.setVelocityX(100);

            this.enemy2.setVelocityY(50);

            this.enemy3.setVelocityX(60);
            this.enemy3.setVelocityY(-60);

            this.enemy4.setVelocityX(60);
            this.enemy4.setVelocityY(60);

            this.enemy5.setVelocityX(-50);

            this.enemy6.setVelocityY(100);
        } else 
        {
            this.enemy1.setVelocityX(-100);

            this.enemy2.setVelocityY(-50);

            this.enemy3.setVelocityX(-60);
            this.enemy3.setVelocityY(60);

            this.enemy4.setVelocityX(-60);
            this.enemy4.setVelocityY(-60);

            this.enemy5.setVelocityX(50);

            this.enemy6.setVelocityY(-100);
        }

    }
}
function killPlayer() {
    this.player.disableBody(true, true);
    let style = {font: "25px Verdana", fill: "#9999FF", align: "center"};
    let text = this.add.text(250, 100, "You have been caught!", style);
    this.sound.add('lose', {loop: false, volume: 0.2}).play();
}
function Win() {
    this.player.disableBody(true, true);
    let style = {font: "25px Verdana", fill: "#9999FF", align: "center"};
    let text = this.add.text(350, 100, "You win!", style);
    this.sound.add('win', {loop: false, volume: 0.05}).play();
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: MyScene,
    physics: { default: 'arcade' },
    });
