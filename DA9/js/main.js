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
        this.load.image('view', 'assets/view.png');
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

        this.enemy1 = this.physics.add.sprite(400,150,'enemy');
        this.enemy2 = this.physics.add.sprite(300,150,'enemy');
        this.enemy3 = this.physics.add.sprite(500,450,'enemy');
        this.view1 = this.physics.add.sprite(396,276,'view').setScale(1.4).setAngle(90).setSize(100,100);
        this.view2 = this.physics.add.sprite(426,154,'view').setScale(1.4).setSize(100,100);
        this.view3 = this.physics.add.sprite(374,445,'view').setScale(1.4).setAngle(180).setSize(100,100);
        this.view1.alpha = 0.5;
        this.view2.alpha = 0.5;
        this.view3.alpha = 0.5;

        this.end = this.physics.add.sprite(750,300, 'end');
        
        this.physics.add.overlap(this.player, this.enemy1, killPlayer, null, this);
        this.physics.add.overlap(this.player, this.enemy2, killPlayer, null, this);
        this.physics.add.overlap(this.player, this.enemy3, killPlayer, null, this);
        this.physics.add.overlap(this.player, this.view1, killPlayer, null, this);
        this.physics.add.overlap(this.player, this.view2, killPlayer, null, this);
        this.physics.add.overlap(this.player, this.view3, killPlayer, null, this);
        this.physics.add.overlap(this.player, this.end, Win, null, this);

        this.alt_cursors = this.input.keyboard.addKeys({ 'up': Phaser.Input.Keyboard.KeyCodes.W, 'down': Phaser.Input.Keyboard.KeyCodes.S, 'left': Phaser.Input.Keyboard.KeyCodes.A, 'right': Phaser.Input.Keyboard.KeyCodes.D });
        
        this.sound.add('music', {loop: true, volume: 0.05}).play();

        this.flipped1 = false

        this.timer = this.time.addEvent({
            delay: 6000,
            loop:true
        });
    }
    
    update() {
        // Player Movement
        if (this.alt_cursors.left.isDown && !this.alt_cursors.right.isDown) 
        {
            this.player.setVelocityX(-150);
        }
        if (this.alt_cursors.right.isDown && !this.alt_cursors.left.isDown) 
        {
            this.player.setVelocityX(150);
        }    
        if (this.alt_cursors.up.isDown && !this.alt_cursors.down.isDown) 
        {
            this.player.setVelocityY(-150);
        }    
        if (this.alt_cursors.down.isDown && !this.alt_cursors.up.isDown) 
        {
            this.player.setVelocityY(150);
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
        if (this.timer.getElapsed() < 3000)
        {
            if (this.flipped) {
                this.flipped = false;
                this.view1.setPosition(396,276).setAngle(90);
                this.view2.setPosition(426,154).setAngle(0);
                this.view3.setPosition(374,445).setAngle(180);
            }
            this.enemy1.setVelocityY(100);
            this.view1.setVelocityY(100);

            this.enemy2.setVelocityX(67);
            this.view2.setVelocityX(67);

            this.enemy3.setVelocityX(-67);
            this.view3.setVelocityX(-67);
        } else 
        {
            if (!this.flipped) {
                this.flipped = true;
                this.view1.setPosition(404,317).setAngle(270);
                this.view2.setPosition(374,145).setAngle(180);
                this.view3.setPosition(426,454).setAngle(0);
            }
            this.enemy1.setVelocityY(-100);
            this.view1.setVelocityY(-100);

            this.enemy2.setVelocityX(-67);
            this.view2.setVelocityX(-67);

            this.enemy3.setVelocityX(67);
            this.view3.setVelocityX(67);
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
