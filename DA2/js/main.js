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
		this.UP = 0
		this.DOWN = 1
		this.LEFT = 2
		this.RIGHT = 3
		this.dead = false
    }
    
    preload() {
        this.load.image('food', 'assets/apple.png');
		this.load.image('body', 'assets/snake.png');
		this.load.image('wall', 'assets/wall.png');
		this.load.audio('music', 'assets/music.wav');
		this.load.audio('eat', 'assets/eat.wav');
		this.load.audio('lose', 'assets/lose.wav');
    }
    
	
    create() {
		this.sound.add('music', {loop: true, volume: 0.03}).play();

		this.walls = this.physics.add.staticGroup();
		for (var i = 8, j = 8; i < 640; i += 16) this.walls.create(i, j, 'wall').refreshBody();
		for (var i = 8, j = 8; j < 480; j += 16) this.walls.create(i, j, 'wall').refreshBody();
		for (var i = 632, j = 8; j < 480; j += 16) this.walls.create(i, j, 'wall').refreshBody();
		for (var i = 8, j = 472; i < 640; i += 16) this.walls.create(i, j, 'wall').refreshBody();


		// Code from http://phaser.io/examples/v3/view/games/snake/part7
		var Food = new Phaser.Class({

			Extends: Phaser.GameObjects.Image,
	
			initialize:
	
			function Food (scene, x, y)
			{
				Phaser.GameObjects.Image.call(this, scene)
	
				this.setTexture('food');
				this.setPosition(x * 16, y * 16);
				this.setOrigin(0);
	
				this.total = 0;
	
				scene.children.add(this);
			},
	
			eat: function ()
			{
				this.total++;
			}
	
		});
	
		var Snake = new Phaser.Class({
	
			initialize:
	
			function Snake (scene, x, y)
			{
				this.headPosition = new Phaser.Geom.Point(x, y);
	
				this.body = scene.add.group();
	
				this.head = this.body.create(x * 16, y * 16, 'body');
				this.head.setOrigin(0);
	
				this.alive = true;
	
				this.speed = 100;
	
				this.moveTime = 0;
	
				this.tail = new Phaser.Geom.Point(x, y);
	
				this.heading = 3;
				this.direction = 3;
			},
	
			update: function (time)
			{
				if (time >= this.moveTime)
				{
					return this.move(time);
				}
			},
	
			faceLeft: function ()
			{
				if (this.direction === 0 || this.direction === 1)
				{
					this.heading = 2;
				}
			},
	
			faceRight: function ()
			{
				if (this.direction === 0 || this.direction === 1)
				{
					this.heading = 3;
				}
			},
	
			faceUp: function ()
			{
				if (this.direction === 2 || this.direction === 3)
				{
					this.heading = 0;
				}
			},
	
			faceDown: function ()
			{
				if (this.direction === 2 || this.direction === 3)
				{
					this.heading = 1;
				}
			},
	
			move: function (time)
			{
				/**
				* Based on the heading property (which is the direction the pgroup pressed)
				* we update the headPosition value accordingly.
				* 
				* The Math.wrap call allow the snake to wrap around the screen, so when
				* it goes off any of the sides it re-appears on the other.
				*/
				switch (this.heading)
				{
					case 2:
						this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 40);
						break;
	
					case 3:
						this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 40);
						break;
	
					case 0:
						this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 30);
						break;
	
					case 1:
						this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 30);
						break;
				}
	
				this.direction = this.heading;
	
				//  Update the body segments and place the last coordinate into this.tail
				Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1, this.tail);
	
				//  Check to see if any of the body pieces have the same x/y as the head
				//  If they do, the head ran into the body

				this.hitBody = Phaser.Actions.GetFirst(this.body.getChildren(), { x: this.head.x, y: this.head.y }, 1);

				if (this.hitBody)
				{
					console.log('dead');
	
					this.alive = false;
	
					return false;
				}
				else
				{
					//  Update the timer ready for the next movement
					this.moveTime = time + this.speed;
	
					return true;
				}
			},
	
			grow: function ()
			{
				var newPart = this.body.create(this.tail.x, this.tail.y, 'body');
	
				newPart.setOrigin(0);
			},
	
			collideWithFood: function (food)
			{
				if (this.head.x === food.x && this.head.y === food.y)
				{
					this.grow();
	
					food.eat();
	
					//  Every 2 food we vary the snake speed, on average it gets faster (2/3 of the time)
					if (this.speed > 20 && food.total % 2 === 0)
					{
						this.speed -= Math.floor(Math.random()*15) - 5
					}
	
					return true;
				}
				else if ((this.head.x === 0 || this.head.y === 0) || (this.head.x === 624 || this.head.y === 464)) {
					console.log('dead');

					this.alive = false;
					
					return false;
				}
				else
				{
					return false;
				}
			},
	
			updateGrid: function (grid)
			{
				//  Remove all body pieces from valid positions list
				this.body.children.each(function (segment) {
	
					var bx = segment.x / 16;
					var by = segment.y / 16;
	
					grid[by][bx] = false;
	
				});
	
				return grid;
			}
	
		});
	
		this.food = new Food(this, 3, 4);
	
		this.snake = new Snake(this, 8, 8);
	
		//  Create our keyboard controls
		this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    update(time, delta) {
		// Code from http://phaser.io/examples/v3/view/games/snake/part7
		if (!this.snake.alive)
		{
			let style = {font: "25px Verdana", fill: "#FF0000", align: "center"};
 			let text = this.add.text(this.cameras.main.centerX, 100, "You Lose!", style);
   			text.setOrigin(0.5, 0.0);
			if (!this.dead) {
				this.sound.add('lose', {loop: false, volume: 0.2}).play();
				this.dead = true
			}
			
			return;
		}
	
		/**
		* Check which key is pressed, and then change the direction the snake
		* is heading based on that. The checks ensure you don't double-back
		* on yourself, for example if you're moving to the right and you press
		* the LEFT cursor, it ignores it, because the only valid directions you
		* can move in at that time is up and down.
		*
		if (this.cursors.left.isDown)
		{
			this.snake.faceLeft();
		}
		else if (this.cursors.right.isDown)
		{
			this.snake.faceRight();
		}
		else if (this.cursors.up.isDown)
		{
			this.snake.faceUp();
		}
		else if (this.cursors.down.isDown)
		{
			this.snake.faceDown();
		}
		*/

		// New movement function, based on mouse position
		let mousex = game.input.mousePointer.x
		let mousey = game.input.mousePointer.y
		let snakex = this.snake.head.x
		let snakey = this.snake.head.y
		let xdiff = mousex - snakex
		let ydiff = mousey - snakey
		if (Math.abs(xdiff) > Math.abs(ydiff))
		{
			if (xdiff > 0) {
				this.snake.faceRight();
			}
			else {
				this.snake.faceLeft();
			}
		}
		else if (Math.abs(ydiff) > Math.abs(xdiff))
		{
			if (ydiff > 0) {
				this.snake.faceDown();
			}
			else {
				this.snake.faceUp();
			}
		}		
		
		// Code from http://phaser.io/examples/v3/view/games/snake/part7
		if (this.snake.update(time))
		{
			//  If the snake updated, we need to check for collision against food
	
			if (this.snake.collideWithFood(this.food))
			{
				this.sound.add('eat', {loop: false, volume: 0.1}).play();

				repositionFood(this.snake, this.food);
			}
		}
		


    }
}
// Code from http://phaser.io/examples/v3/view/games/snake/part7
function repositionFood (snake, food)
{
    //  First create an array that assumes all positions
    //  are valid for the new piece of food

    //  A Grid we'll use to reposition the food each time it's eaten
    var testGrid = [];

    for (var y = 0; y < 30; y++)
    {
        testGrid[y] = [];

        for (var x = 1; x < 39; x++)
        {
			if (y > 0 && y < 29) {
				testGrid[y][x] = true;
			}
        }
    }

    snake.updateGrid(testGrid);

    //  Purge out false positions
    var validLocations = [];

    for (var y = 0; y < 30; y++)
    {
        for (var x = 0; x < 40; x++)
        {
            if (testGrid[y][x] === true)
            {
                //  Is this position valid for food? If so, add it here ...
                validLocations.push({ x: x, y: y });
            }
        }
    }

    if (validLocations.length > 0)
    {
        //  Use the RNG to pick a random food position
        var pos = Phaser.Math.RND.pick(validLocations);

        //  And place it
        food.setPosition(pos.x * 16, pos.y * 16);

        return true;
    }
    else
    {
        return false;
    }
}
const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 640,
    height: 480,
	backgroundColor: '#00FF00',
    scene: MyScene,
    physics: { default: 'arcade' },
});
