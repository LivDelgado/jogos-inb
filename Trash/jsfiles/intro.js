intro = function (game) {};
intro.prototype = {
	create: function (){
		game.add.image(0, 0, 'telaintro');
		
        botao1 = game.add.button(330, 408, 'playbutton', this.iniciaJogo1, this, 1, 0, 2);		
                
        game.add.button(735, 17, 'help', this.helpMenu, this, 1, 0, 2);
        game.add.button(20, 17, 'creditos', this.creditoMenu, this, 1, 0, 2);
        
		esc = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        escCredito = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	update: function (){
		if (esc.isDown) {telaAjuda.kill()};
        if (escCredito.isDown) {telaCreditos.kill()};
	},

	iniciaJogo1: function (pointer) {
		this.state.start('levelOne');
	},
	
	helpMenu: function (pointer){
		telaAjuda = game.add.image(100, 100, 'help-tela');
	},
    
    creditoMenu: function (pointer){
    	telaCreditos = game.add.image(100, 100, 'creditos-tela');
    },

};