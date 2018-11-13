var gameOver = function (game){};

gameOver.prototype = {
	create: function(){
		game.add.image(0, 0, 'derrota');
		reinicie1 = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	},

	update: function(){
		if (reinicie1.isDown){game.state.start('intro')}
	},
}