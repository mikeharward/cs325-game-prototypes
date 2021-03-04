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
        this.button = null;
        this.playing = false;
        // this.button.pressed = null
    }
    
    preload() {
        this.load.image( 'button', 'assets/button.png' );
        this.load.image( 'sky', 'assets/sky.png' );
        this.load.image('console', 'assets/console.png');
        this.load.image('balloon', 'assets/balloon.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('edge', 'assets/edge.png');
        this.load.image('cactus', 'assets/cactus.jpg');
        this.load.image('spikes', 'assets/spikes.png');
        this.load.image('flames', 'assets/flames.png');
        this.load.audio('wind', 'assets/wind woosh loop.ogg');
        this.load.audio('pop', 'assets/pop1.ogg');
    }
    
    create() {
        this.add.sprite(400,300,'sky');
        this.add.sprite(400,550, 'console');
        this.button = this.add.sprite(400,550,'button').setInteractive();
        this.balloon = this.physics.add.sprite(700,450, 'balloon').setScale(0.25);
        this.cactus = this.physics.add.sprite(760,185,'cactus').refreshBody();
        this.walls = this.physics.add.staticGroup();
        var addlist = [10,300,30,300,50,300,250,300,270,300,290,300,310,300,330,300,350,300,370,300,390,300,410,300,430,300,450,300,470,300,490,300,510,300,530,300,550,300,570,300,590,300,610,300,630,300,650,300,670,300,690,300,710,300,730,300,750,300,770,300,790,300];
	    for (var i = 0; i < addlist.length; i += 2) this.walls.create(addlist[i], addlist[i+1], 'platform').refreshBody();
        var addlist = [10,300,30,300,50,300,250,300,270,300,290,300,310,300,330,300,350,300,370,300,390,300,410,300,430,300,450,300,470,300,490,300,510,300,530,300,550,300,70,300,90,300,110,300,130,300,150,300,170,300,190,300,210,300,230,300,750,300,770,300,790,300];
        for (var i = 0; i < addlist.length; i += 2) this.walls.create(addlist[i], addlist[i+1]-145, 'platform').refreshBody();
        var addlist = [170,300,190,300,210,300,230,300,250,300,270,300,290,300,310,300,470,300,490,300,510,300,530,300,550,300,570,300,590,300,610,300];
        for (var i = 0; i < addlist.length; i += 2) this.walls.create(addlist[i], addlist[i+1]-290, 'platform').refreshBody();
        this.edges = this.physics.add.staticGroup();
        this.edges.create(-1,300,'edge');
        this.edges.create(801,300,'edge');
        this.spikes = this.physics.add.staticGroup();
        var addlist = [650,300,710,300,770,300];
        for (var i = 0; i < addlist.length; i += 2) this.spikes.create(addlist[i], addlist[i+1]-270, 'spikes').setScale(3).refreshBody();
        this.flames = this.physics.add.staticGroup();
        var addlist = [48,300,144,300];
        for (var i = 0; i < addlist.length; i += 2) this.flames.create(addlist[i], addlist[i+1]-255, 'flames').setScale(3).refreshBody();
        this.top = this.physics.add.sprite(400, -50, 'console');
        this.add.sprite(50,75,'sky').setScale(0.15)
        this.add.sprite(150,75,'sky').setScale(0.15)
        this.button.pressed = false;
        this.button.on('pointerdown', function (pointer) {
            this.pressed = true;
        });
        this.button.on('pointerup', function (pointer) {
            this.pressed = false;
        });
        this.button.on('pointerout', function (pointer) {
            this.pressed = false;
        });
        this.physics.add.overlap(this.balloon, this.top, topReached, null, this);
	    this.physics.add.collider(this.balloon, this.walls, wallHit,  null, this);
        this.physics.add.collider(this.balloon, this.edges, offMap,  null, this);
        this.physics.add.overlap(this.balloon, this.cactus, cactus, null, this);
        this.physics.add.overlap(this.balloon, this.spikes, spikes, null, this);
        this.physics.add.overlap(this.balloon, this.flames, flames, null, this);
    }
    
    update() {
        this.balloon.setVelocityY(-10);
        if (this.button.pressed) {
            this.balloon.setAccelerationX(40);
            if (!this.playing) {
                this.playing = true;
                this.sound.add('wind', {loop: false, volume: 0.5}).play();
            }
        } else {
            this.balloon.setAccelerationX(-20);
            this.playing = false;
        }
    }
}
function topReached() {
    this.balloon.disableBody(true, true);
    this.sound.add('pop', {loop: false, volume: 1}).play();
    let style = {font: "25px Verdana", fill: "#99FF99", align: "center"};
    let text = this.add.text(300, 100, "You Flew Away! :(", style);
}
function wallHit() {
    this.balloon.disableBody(true, true);
    this.sound.add('pop', {loop: false, volume: 1}).play();
    let style = {font: "25px Verdana", fill: "#99FF99", align: "center"};
    let text = this.add.text(200, 100, "You Popped! Avoid the Walls! :(", style);
}
function offMap() {
    this.balloon.disableBody(true, true);
    this.sound.add('pop', {loop: false, volume: 1}).play();
    let style = {font: "25px Verdana", fill: "#99FF99", align: "center"};
    let text = this.add.text(200, 100, "Stay on the Map! :(", style);
}
function cactus() {
    this.balloon.disableBody(true, true);
    this.sound.add('pop', {loop: false, volume: 1}).play();
    let style = {font: "25px Verdana", fill: "#99FF99", align: "center"};
    let text = this.add.text(200, 100, "The Cactus is too Sharp! :(", style);
}
function flames() {
    this.balloon.disableBody(true, true);
    this.sound.add('pop', {loop: false, volume: 1}).play();
    let style = {font: "25px Verdana", fill: "#99FF99", align: "center"};
    let text = this.add.text(200, 100, "The Flames are too Hot! :(", style);
}
function spikes() {
    this.balloon.disableBody(true, true);
    this.sound.add('pop', {loop: false, volume: 1}).play();
    let style = {font: "25px Verdana", fill: "#99FF99", align: "center"};
    let text = this.add.text(200, 100, "Spikes are Sharp, be Careful! :(", style);
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: MyScene,
    physics: { default: 'arcade' },
    });
