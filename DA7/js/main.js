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
		this.flag = null;
    }
    
    preload() {
        this.load.image('sky', 'assets/sky.png');
		this.load.image('null', 'assets/null.png');
		this.load.image('crate', 'assets/crate.png');
		this.load.image('redSwitch', 'assets/redSwitch.png');
		this.load.image('redSwitchOpen', 'assets/redSwitchOpen.png');
		this.load.image('yellowSwitch', 'assets/yellowSwitch.png');
		this.load.image('yellowSwitchOpen', 'assets/yellowSwitchOpen.png');
		this.load.image('greenSwitch', 'assets/greenSwitch.png');
		this.load.image('greenSwitchOpen', 'assets/greenSwitchOpen.png');
		this.load.image('redPlatform', 'assets/redplatform.png');
		this.load.image('redPlatformfull', 'assets/redplatformfull.png');
		this.load.image('greenPlatform', 'assets/greenplatform.png');
		this.load.image('greenPlatformfull', 'assets/greenplatformfull.png');
		this.load.image('yellowPlatform', 'assets/yellowplatform.png');
		this.load.image('yellowPlatformfull', 'assets/yellowplatformfull.png');
		this.load.image('fire', 'assets/fire.png');
		this.load.image('fire2', 'assets/fire2.png');
		this.load.spritesheet('dude', 'assets/dude.png', 
		{frameWidth: 22, frameHeight: 21});
		this.load.spritesheet('flag', 'assets/flag.png',
		{frameWidth: 21, frameHeight: 21, spacing: 1})
		this.load.audio('lever', 'assets/lever.wav')
		this.load.audio('music', 'assets/music.wav')
		this.load.audio('win', 'assets/win.wav')
    }
    
	
    create() {
		this.add.image(400, 300, 'sky');
		this.platforms = this.physics.add.group({allowGravity: false});
		var addlist = [60,520,81,520,102,520,123,520,144,520,550,520,571,520,592,520,613,520,634,520,655,520,30,430,51,430,72,430,93,430,10,370,31,370,700,460,721,460,742,460,400,329,400,350,421,350,442,350,463,350,463,329,10,240,31,240,700,330,721,330,742,330,789,250,768,250,747,250,387,171,366,150,408,171,429,150,450,150,429,171,471,150,492,150,366,171,513,150,250,70,271,70,292,70,150,-10,171,-10,192,-10,250,-90,271,-90,292,-90,600,70,621,70,642,70,700,-10,721,-10,742,-10,600,-90,621,-90,642,-90,400,-150,421,-150,442,-150,463,-150,484,-150,505,-150,526,-150];
		for (var i = 0; i < addlist.length; i += 2) this.platforms.create(addlist[i], addlist[i+1], 'crate').setImmovable(true).setScale(1);
		this.redPlatform = this.physics.add.image(580,400,'redPlatform').setImmovable(true);
		this.redPlatform.body.setAllowGravity(false);
		this.greenPlatform = this.physics.add.image(150,300,'greenPlatform').setImmovable(true);
		this.greenPlatform.body.setAllowGravity(false);
		this.yellowPlatform = this.physics.add.image(400,200,'yellowPlatform').setImmovable(true);
		this.yellowPlatform.body.setAllowGravity(false);
		
		
		this.redSwitch = this.physics.add.sprite(10, 344, 'redSwitch').setScale(1.5);
		this.redSwitch2 = this.physics.add.sprite(10, 200, 'redSwitch').setScale(1.5);
		this.greenSwitch = this.physics.add.sprite(430, 325, 'greenSwitch').setScale(1.5);
		this.yellowSwitch = this.physics.add.sprite(790, 220, 'yellowSwitch').setScale(1.5);
		this.yellowSwitch2 = this.physics.add.sprite(397, 140, 'yellowSwitch').setScale(1.4);

		this.player1 = this.physics.add.sprite(600, 470, 'dude').setScale(2);
		this.player1.setCollideWorldBounds(true);
		this.redSwitch.setCollideWorldBounds(true);
		this.redSwitch2.setCollideWorldBounds(true);
		this.yellowSwitch.setCollideWorldBounds(true);
		this.yellowSwitch2.setCollideWorldBounds(true);

		this.player2 = this.physics.add.sprite(100, 470, 'dude').setScale(2);
		this.player2.setCollideWorldBounds(true);

		this.end = this.physics.add.sprite(482,-200,'null').setScale(2);
		this.flag = this.physics.add.sprite(482,-200, 'flag').setScale(2);

		this.fire = this.physics.add.sprite(400,600,'fire');
		this.fire2 = this.physics.add.sprite(400,904,'fire2');

		this.fire.body.setAllowGravity(false);
		this.fire2.body.setAllowGravity(false);

		this.anims.create({
			key: 'left1',
			frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 6 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'turn1',
			frames: [ { key: 'dude', frame: 0 } ],
			frameRate: 20
		});

		this.anims.create({
			key: 'right1',
			frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 3 }),
			frameRate: 10,
			repeat: -1
		});
		
		this.physics.add.collider(this.player1, this.platforms);
		this.physics.add.collider(this.player2, this.platforms);
		this.physics.add.collider(this.redSwitch, this.platforms);
		this.physics.add.collider(this.redSwitch, this.player1);
		this.physics.add.collider(this.redSwitch, this.player2);
		this.physics.add.collider(this.redSwitch2, this.platforms);
		this.physics.add.collider(this.redSwitch2, this.player1);
		this.physics.add.collider(this.redSwitch2, this.player2);
		this.physics.add.collider(this.greenSwitch, this.platforms);
		this.physics.add.collider(this.yellowSwitch, this.platforms);
		this.physics.add.collider(this.yellowSwitch, this.player1);
		this.physics.add.collider(this.yellowSwitch, this.player2);
		this.physics.add.collider(this.yellowSwitch2, this.platforms);
		this.physics.add.collider(this.yellowSwitch2, this.player1);
		this.physics.add.collider(this.yellowSwitch2, this.player2);
		this.redcollider = null
		this.redcollider2 = null
		this.yellowcollider = null
		this.yellowcollider2 = null
		this.greencollider = null
		this.greencollider2 = null	

		this.physics.add.overlap(this.player1, this.redSwitch, pressRedSwitch, null, this);
		this.physics.add.overlap(this.player2, this.redSwitch, pressRedSwitch, null, this);
		this.physics.add.overlap(this.player1, this.redSwitch2, pressRedSwitch2, null, this);
		this.physics.add.overlap(this.player2, this.redSwitch2, pressRedSwitch2, null, this);
		this.physics.add.overlap(this.player1, this.greenSwitch, pressGreenSwitch, null, this);
		this.physics.add.overlap(this.player2, this.greenSwitch, pressGreenSwitch, null, this);
		this.physics.add.overlap(this.player1, this.yellowSwitch, pressYellowSwitch, null, this);
		this.physics.add.overlap(this.player2, this.yellowSwitch, pressYellowSwitch, null, this);
		this.physics.add.overlap(this.player1, this.yellowSwitch2, pressYellowSwitch2, null, this);
		this.physics.add.overlap(this.player2, this.yellowSwitch2, pressYellowSwitch2, null, this);
		this.physics.add.overlap(this.player1, this.fire, Fire, null, this);
		this.physics.add.overlap(this.player2, this.fire, Fire, null, this);
		
		this.cursors = this.input.keyboard.createCursorKeys();
		this.alt_cursors = this.input.keyboard.addKeys({ 'up': Phaser.Input.Keyboard.KeyCodes.W, 'down': Phaser.Input.Keyboard.KeyCodes.S, 'left': Phaser.Input.Keyboard.KeyCodes.A, 'right': Phaser.Input.Keyboard.KeyCodes.D });
		this.sound.add('music', {loop: true, volume: 0.05}).play();
		this.redPlayed = false
		this.redPlayed2 = false
		this.greenPlayed = false
		this.yellowPlayed = false
		this.yellowPlayed2 = false
		this.anims.create({
			key: 'wave',
			frames: this.anims.generateFrameNumbers('flag', { start: 0, end: 1 }),
			frameRate: 6,
			repeat: -1
		});
		this.physics.add.collider(this.flag, this.platforms);
		this.physics.add.collider(this.end, this.platforms);

		this.physics.add.overlap(this.player1, this.end, victory1, null, this);
		this.physics.add.overlap(this.player2, this.end, victory2, null, this);
		this.victory1 = false
		this.victory2 = false
		this.stopFire = false
    }
    
    update() {
		if (!this.redPressed && this.alt_cursors.up.isDown) {
			this.redSwitch.setTexture('redSwitch');
			this.redPlayed = false;
			this.redPlatform.setTexture('redPlatform');
			if (this.redcollider != null) {
				this.physics.world.removeCollider(this.redcollider)
				this.physics.world.removeCollider(this.redcollider2)
			}
		}
		this.redPressed = false
		if (!this.redPressed2 && this.alt_cursors.up.isDown) {
			this.redSwitch2.setTexture('redSwitch');
			this.redPlayed2 = false;
			this.redPlatform.setTexture('redPlatform');
			if (this.redcollider != null) {
				this.physics.world.removeCollider(this.redcollider)
				this.physics.world.removeCollider(this.redcollider2)
			}
		}
		this.redPressed2 = false
		if (!this.greenPressed && this.cursors.up.isDown) {
			this.greenSwitch.setTexture('greenSwitch');
			this.greenPlayed = false;
			this.greenPlatform.setTexture('greenPlatform');
			if (this.greencollider != null) {
				this.physics.world.removeCollider(this.greencollider)
				this.physics.world.removeCollider(this.greencollider2)
			}
		}
		this.greenPressed = false
		if (!this.yellowPressed && this.cursors.up.isDown && !this.yellowPressed2) {
			this.yellowSwitch.setTexture('yellowSwitch');
			this.yellowPlayed = false;
			this.yellowPlatform.setTexture('yellowPlatform');
			if (this.yellowcollider != null) {
				this.physics.world.removeCollider(this.yellowcollider)
				this.physics.world.removeCollider(this.yellowcollider2)
			}
		}
		this.yellowPressed = false
		// Code from http://phaser.io/tutorials/making-your-first-phaser-3-game/part7
		if (this.cursors.left.isDown)
		{
			this.player1.setVelocityX(-80);

			this.player1.anims.play('left1', true);
		}
		else if (this.cursors.right.isDown)
		{
			this.player1.setVelocityX(80);

			this.player1.anims.play('right1', true);
		}
		else
		{
			this.player1.setVelocityX(0);

			this.player1.anims.play('turn1');
		}

		if (this.cursors.up.isDown && this.player1.body.touching.down)
		{
			this.player1.setVelocityY(-250);
		}

		if (this.alt_cursors.left.isDown)
		{
			this.player2.setVelocityX(-80);

			this.player2.anims.play('left1', true);
		}
		else if (this.alt_cursors.right.isDown)
		{
			this.player2.setVelocityX(80);

			this.player2.anims.play('right1', true);
		}
		else
		{
			this.player2.setVelocityX(0);

			this.player2.anims.play('turn1');
		}

		if (this.alt_cursors.up.isDown && this.player2.body.touching.down)
		{
			this.player2.setVelocityY(-250);
		}
		if (!this.victory1 || !this.victory2) {
			if (this.stopFire){ 
				this.fire.setVelocityY(0);
				this.fire2.setVelocityY(0);
				this.platforms.setVelocityY(13);
				this.redPlatform.setVelocityY(13);
				this.greenPlatform.setVelocityY(13);
				this.yellowPlatform.setVelocityY(13);
			} else {
				this.fire.setVelocityY(-13);
				this.fire2.setVelocityY(-13);
			}
		}
		if (this.flag != null) this.flag.anims.play('wave', true);
    }
}
function pressRedSwitch(redSwitch) {
	this.redPressed = true;
	this.redSwitch.setTexture('redSwitchOpen');
	this.redPlatform.setTexture('redPlatformfull')
	this.redcollider = this.physics.add.collider(this.redPlatform, this.player1);
	this.redcollider2 = this.physics.add.collider(this.redPlatform, this.player2);
	if (!this.redPlayed) {
		this.sound.add('lever', {loop: false}).play();
		this.redPlayed = true;
	}
}
function pressRedSwitch2(redSwitch) {
	this.redPressed2 = true;
	this.redSwitch2.setTexture('redSwitchOpen');
	this.redPlatform.setTexture('redPlatformfull')
	this.redcollider = this.physics.add.collider(this.redPlatform, this.player1);
	this.redcollider2 = this.physics.add.collider(this.redPlatform, this.player2);
	if (!this.redPlayed2) {
		this.sound.add('lever', {loop: false}).play();
		this.redPlayed2 = true;
	}
}
function pressYellowSwitch(yellowSwitch) {
	this.yellowPressed = true;
	this.yellowSwitch.setTexture('yellowSwitchOpen');
	this.yellowPlatform.setTexture('yellowPlatformfull')
	this.yellowcollider = this.physics.add.collider(this.yellowPlatform, this.player1);
	this.yellowcollider2 = this.physics.add.collider(this.yellowPlatform, this.player2);
	if (!this.yellowPlayed) {
		this.sound.add('lever', {loop: false}).play();
		this.yellowPlayed = true;
	}
}
function pressYellowSwitch2(yellowSwitch) {
	this.yellowPressed2 = true;
	this.yellowSwitch2.setTexture('yellowSwitchOpen');
	this.yellowPlatform.setTexture('yellowPlatformfull')
	this.yellowcollider = this.physics.add.collider(this.yellowPlatform, this.player1);
	this.yellowcollider2 = this.physics.add.collider(this.yellowPlatform, this.player2);
	if (!this.yellowPlayed2) {
		this.sound.add('lever', {loop: false}).play();
		this.yellowPlayed2 = true;
	}
}
function pressGreenSwitch(greenSwitch) {
	this.stopFire = true;
	this.greenPressed = true;
	this.greenSwitch.setTexture('greenSwitchOpen');
	this.greenPlatform.setTexture('greenPlatformfull')
	this.greenwcollider = this.physics.add.collider(this.greenPlatform, this.player1);
	this.greencollider2 = this.physics.add.collider(this.greenPlatform, this.player2);
	if (!this.greenPlayed) {
		this.sound.add('lever', {loop: false}).play();
		this.greenPlayed = true;
	}
	
}
function victory1() {
	this.victory1 = true
	if (this.victory1 && this.victory2) {
		this.player1.disableBody(true, true);
		this.player2.disableBody(true, true);
		this.sound.add('win', {loop: false, volume: 0.05}).play();
		let style = {font: "25px Verdana", fill: "#99FF99", align: "center"};
		let text = this.add.text(this.cameras.main.centerX, 100, "You Win!", style);
		text.setOrigin(0.5, 0.0);
	}
}
function victory2() {
	this.victory2 = true
	if (this.victory1 && this.victory2) {
		this.player1.disableBody(true, true);
		this.player2.disableBody(true, true);
		this.sound.add('win', {loop: false, volume: 0.05}).play();
		let style = {font: "25px Verdana", fill: "#99FF99", align: "center"};
		let text = this.add.text(this.cameras.main.centerX, 100, "You Win!", style);
		text.setOrigin(0.5, 0.0);
	}
}
function Fire() {
    this.player1.disableBody(true, true);
	this.player2.disableBody(true, true);
    let style = {font: "25px Verdana", fill: "#99FF99", align: "center"};
    let text = this.add.text(200, 100, "You Lose!", style);
}
const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: MyScene,
    physics: { default: 'arcade',
	    arcade: {
            gravity: { y: 300 },
            debug: false
        } },
});
