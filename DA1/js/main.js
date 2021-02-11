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
		this.load.image('ground', 'assets/grass.png');
		this.load.image('crate', 'assets/crate.png');
		this.load.image('redSwitch', 'assets/redSwitch.png');
		this.load.image('redSwitchOpen', 'assets/redSwitchOpen.png');
		this.load.image('yellowSwitch', 'assets/yellowSwitch.png');
		this.load.image('yellowSwitchOpen', 'assets/yellowSwitchOpen.png');
		this.load.image('greenSwitch', 'assets/greenSwitch.png');
		this.load.image('greenSwitchOpen', 'assets/greenSwitchOpen.png');
		this.load.spritesheet('dude', 'assets/dude.png', 
		{frameWidth: 22, frameHeight: 21});
		this.load.spritesheet('flag', 'assets/flag.png',
		{frameWidth: 21, frameHeight: 21, spacing: 1})
		this.load.audio('lever', 'assets/lever.wav')
		this.load.audio('music', 'assets/music.wav')
		this.load.audio('win', 'assets/win.wav')
    }
    
	
    create() {
		// Code from http://phaser.io/tutorials/making-your-first-phaser-3-game/part3
		this.add.image(400, 300, 'sky');
		this.platforms = this.physics.add.staticGroup();
		var addlist = [21, 579, 63, 579, 105, 579, 147, 579, 189, 579, 231, 579, 273, 579, 315, 579, 357, 579, 399, 579, 441, 579, 483, 579, 525, 579, 567, 579, 609, 579, 651, 579, 693, 579, 735, 579, 777, 579, 819, 579];
		for (var i = 0; i < addlist.length; i += 2) this.platforms.create(addlist[i], addlist[i+1], 'ground').setScale(2).refreshBody();
		
		addlist = [250, 537, 450, 537, 470, 495, 670, 537, 650, 495,  630, 453];
		for (var i = 0; i < addlist.length; i += 2) this.platforms.create(addlist[i], addlist[i+1], 'crate').setScale(2).refreshBody();
		
		this.redSwitch = this.physics.add.sprite(740, 537, 'redSwitch').setScale(2);

		// Code from http://phaser.io/tutorials/making-your-first-phaser-3-game/part5
		this.player = this.physics.add.sprite(100, 450, 'dude').setScale(2);

		this.player.setCollideWorldBounds(true);

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 6 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'turn',
			frames: [ { key: 'dude', frame: 0 } ],
			frameRate: 20
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 3 }),
			frameRate: 10,
			repeat: -1
		});
		this.physics.add.collider(this.player, this.platforms);
		this.physics.add.collider(this.redSwitch, this.platforms);
		this.physics.add.collider(this.redSwitch, this.player);

		// Code from http://phaser.io/tutorials/making-your-first-phaser-3-game/part8
		this.physics.add.overlap(this.player, this.redSwitch, pressRedSwitch, null, this);
		
		this.cursors = this.input.keyboard.createCursorKeys();

		this.sound.add('music', {loop: true, volume: 0.05}).play();
    }
    
    update() {
		// Code from http://phaser.io/tutorials/making-your-first-phaser-3-game/part7
		if (this.cursors.left.isDown)
		{
			this.player.setVelocityX(-160);

			this.player.anims.play('left', true);
		}
		else if (this.cursors.right.isDown)
		{
			this.player.setVelocityX(160);

			this.player.anims.play('right', true);
		}
		else
		{
			this.player.setVelocityX(0);

			this.player.anims.play('turn');
		}

		if (this.cursors.up.isDown && this.player.body.touching.down)
		{
			this.player.setVelocityY(-250);
		}
		if (this.flag != null) this.flag.anims.play('wave', true);
    }
}
function pressRedSwitch(player, redSwitch) {
	redSwitch.disableBody(true, true);
	this.redSwitchOpen = this.physics.add.sprite(740, 537, 'redSwitchOpen').setScale(2);
	this.physics.add.collider(this.redSwitchOpen, this.platforms);
	this.physics.add.collider(this.redSwitchOpen, this.player);
	this.sound.add('lever', {loop: false}).play();
	var addlist = [21, 453, 63, 453, 105, 453, 21, 411, 63, 411, 21, 369, -21, 327];
	for (var i = 0; i < addlist.length; i += 2) this.platforms.create(addlist[i], addlist[i+1], 'crate').setScale(2).refreshBody();

	this.yellowSwitch = this.physics.add.sprite(21, 327, 'yellowSwitch').setScale(2);

	this.physics.add.collider(this.yellowSwitch, this.platforms);
	this.physics.add.collider(this.yellowSwitch, this.player);
	this.physics.add.overlap(this.player, this.yellowSwitch, pressYellowSwitch, null, this);
}
function pressYellowSwitch(player, yellowSwitch) {
	yellowSwitch.disableBody(true, true);
	this.yellowSwitchOpen = this.physics.add.sprite(21, 327, 'yellowSwitchOpen').setScale(2);
	this.physics.add.collider(this.yellowSwitchOpen, this.platforms);
	this.physics.add.collider(this.yellowSwitchOpen, this.player);
	this.sound.add('lever', {loop: false}).play();
	var addlist = [300, 327, 500, 327, 700, 327, 742, 327, 742, 285];
	for (var i = 0; i < addlist.length; i += 2) this.platforms.create(addlist[i], addlist[i+1], 'crate').setScale(2).refreshBody();
	this.platforms.create(784, 243, 'null').setScale(2).refreshBody();

	this.greenSwitch = this.physics.add.sprite(742, 243, 'greenSwitch').setScale(2);

	this.physics.add.collider(this.greenSwitch, this.platforms);
	this.physics.add.collider(this.greenSwitch, this.player);
	this.physics.add.overlap(this.player, this.greenSwitch, pressGreenSwitch, null, this);

}
function pressGreenSwitch(player, greenSwitch) {
	greenSwitch.disableBody(true, true);
	this.greenSwitchOpen = this.physics.add.sprite(742, 243, 'greenSwitchOpen').setScale(2);
	this.physics.add.collider(this.greenSwitchOpen, this.platforms);
	this.physics.add.collider(this.greenSwitchOpen, this.player);
	this.sound.add('lever', {loop: false}).play();
	var addlist = [105, 243, 147, 159, 189, 75, 315, 75, 357, 75];
	for (var i = 0; i < addlist.length; i += 2) this.platforms.create(addlist[i], addlist[i+1], 'crate').setScale(2).refreshBody();
	this.platforms.create(399, 33, 'null').setScale(2).refreshBody();
	this.end = this.physics.add.sprite(353, 33, 'null').setScale(2);
	

	this.flag = this.physics.add.sprite(357, 33, 'flag').setScale(2);
	this.anims.create({
		key: 'wave',
		frames: this.anims.generateFrameNumbers('flag', { start: 0, end: 1 }),
		frameRate: 6,
		repeat: -1
	});
	this.physics.add.collider(this.flag, this.platforms);
	this.physics.add.collider(this.flag, this.player);
	this.physics.add.collider(this.end, this.platforms);

	this.physics.add.overlap(this.player, this.end, victory, null, this);
}
function victory() {
	this.sound.add('win', {loop: false, volume: 0.05}).play();
	let style = {font: "25px Verdana", fill: "#99FF99", align: "center"};
    let text = this.add.text(this.cameras.main.centerX, 100, "You Win!", style);
    text.setOrigin(0.5, 0.0);
}
const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: MyScene,
    // Code from http://phaser.io/tutorials/making-your-first-phaser-3-game/part3
    physics: { default: 'arcade',
	    arcade: {
            gravity: { y: 300 },
            debug: false
        } },
});
