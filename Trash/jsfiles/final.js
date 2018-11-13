var final = function (game){};

final.prototype = {
		create: function(){
		game.add.image(0, 0, 'vitoria');
		reinicie = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	},

	update: function(){
		if (reinicie.isDown){game.state.start('intro')}
	},

}