var levelTwo = function (game){};

levelTwo.prototype = {
	create: function (){
		game.physics.startSystem(Phaser.Physics.ARCADE); //física ativada
		
		cursorKeys = game.input.keyboard.createCursorKeys();

		game.add.image(0, 0, 'fundo2');
		
		player = game.add.sprite(0, 0, 'player');
		game.physics.arcade.enable(player);	//o personagem tem física 
		player.body.collideWorldBounds = true;	//o personagem colide com as barreiras do mundo

		//animações do player1
		player.animations.add('esq', [5, 10, 11], 15);
        player.animations.add('dire', [1, 6, 9], 15);
        player.animations.add('cima', [0, 7, 8], 15);
        player.animations.add('baixa', [2, 3, 4], 15);

        lixoAzul = game.add.sprite(Math.random()*800, Math.random()*608, 'azul');
        lixoAmarelo = game.add.sprite(Math.random()*800, Math.random()*608, 'amarelo');
        lixoVerde = game.add.sprite(Math.random()*800, Math.random()*608, 'verde');
        lixoMarrom = game.add.sprite(Math.random()*800, Math.random()*608, 'marrom');
        lixoVermelho = game.add.sprite(Math.random()*800, Math.random()*608, 'vermelho');

        game.physics.arcade.enable(lixoAzul);
        game.physics.arcade.enable(lixoAmarelo);
        game.physics.arcade.enable(lixoVermelho);
        game.physics.arcade.enable(lixoVerde);
        game.physics.arcade.enable(lixoMarrom);

        lixoAzul.body.immovable = true;
        lixoAmarelo.body.immovable = true;
        lixoVermelho.body.immovable = true;
        lixoVerde.body.immovable = true;
        lixoMarrom.body.immovable = true;
	},
	
	update: function (){
		game.physics.arcade.collide(player, lixoAmarelo, this.morra, null, this);
		game.physics.arcade.collide(player, lixoVerde, this.morra, null, this);
		game.physics.arcade.collide(player, lixoVermelho, this.colete, null, this);
		game.physics.arcade.collide(player, lixoMarrom, this.morra, null, this);
		game.physics.arcade.collide(player, lixoAzul, this.morra, null, this);	

		player.body.velocity.x = 0; 
		player.body.velocity.y = 0;
		player.animations.stop();
		
		//	movimentação do personagem pelas setas	
		if(cursorKeys.left.isDown){player.body.velocity.x = -250; player.play('esq');};
		if(cursorKeys.right.isDown){player.body.velocity.x = 250; player.play('dire');};
		if(cursorKeys.up.isDown){player.body.velocity.y =-350; player.play('cima');};
		if(cursorKeys.down.isDown) {player.body.velocity.y =350; player.play('baixa');}
	}, 

	colete: function (){game.state.start('levelThree')},
	morra: function (){game.state.start('gameOver')}
}