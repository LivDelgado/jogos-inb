var telaDeLoading = function (game){};

telaDeLoading.prototype = {
	preload: function (){
		//intro
		game.load.image('help', 'art/intro/help.png', 32, 32);
		game.load.image('creditos', 'art/intro/creditos.png', 32, 32);
		game.load.image('playbutton', 'art/intro/play.png', 128, 64);
		game.load.image('telaintro', 'art/intro/telaintro.png', 128, 64);
		game.load.image('help-tela', 'art/intro/help-tela.png', 600, 408);
		game.load.image('creditos-tela', 'art/intro/creditos-tela.png', 600, 408);
		//play
		game.load.spritesheet('player', 'art/play/red.png', 25, 35);
		game.load.image('fundo1', 'art/play/fundo1.png', 800, 608);
		game.load.image('fundo2', 'art/play/fundo2.png', 800, 608);
		game.load.image('fundo3', 'art/play/fundo3.png', 800, 608);
		
		game.load.spritesheet('azul', 'art/play/lixos/azul.png', 32, 32);
		game.load.spritesheet('vermelho', 'art/play/lixos/vermelho.png', 32, 32);
		game.load.spritesheet('marrom', 'art/play/lixos/marrom.png', 32, 32);
		game.load.spritesheet('amarelo', 'art/play/lixos/amarelo.png', 32, 32);
		game.load.spritesheet('verde', 'art/play/lixos/verde.png', 32, 32);

		//fim do jogo
		game.load.image('vitoria', 'art/fimdojogo/final.jpg', 800, 608);
		game.load.image('derrota', 'art/fimdojogo/gameover.png', 800, 608);
	},
	
	create: function (){
		game.add.image(0, 0, 'telaintro');
		game.state.start('intro');
	}

}