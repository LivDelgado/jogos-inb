var game = new Phaser.Game(800, 608, Phaser.AUTO, 'palco');

	game.state.add('telaDeLoading', telaDeLoading);
	game.state.add('intro', intro);
	game.state.add('levelOne', levelOne);
	game.state.add('levelTwo', levelTwo);
	game.state.add('levelThree', levelThree);
	game.state.add('gameOver', gameOver);
	game.state.add('final', final);

	game.state.start('telaDeLoading');