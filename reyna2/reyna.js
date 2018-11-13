//-----------------------------------------------------------------------------
//
//  reyna.js
//
//  Autor(a): Lívia Delgado A. Carneiro
//  Iniciado: 18/10/2015, 12:21
//  Revisado: 23/10/2015, 10:17
//
//  Código completo do jogo.
//
//-----------------------------------------------------------------------------

//
// constantes
//
var alturaJogo = 608;
var larguraJogo = 800;
var alturaMundo = 5472;
var larguraMundo = 800;
var raioExplosao = 250;
var velocidadeJogador = 250;
var alturaPuloJogador = 390;
var velocidadeInimigo = 300;
var velocidadeFaca = 300;
var gravidadeJogador = 290;
var gravidadeFaca = 200;
var gravidadeExplosao = 150;
var acertosCriacaoFlor = 20;
var acertosCriacaoTesouro = 30;
var pontosColisaoFacaInimigo = 1;
var pontosColisaoJogadorFlor = 50;
var pontosColisaoJogadorTesouro = 10;
var vidasColisaoTesouro = 1;
var intervaloCriacaoInimigo = 500;
var intervaloCriacaoFaca = 600;
var fpsExplosao = 30;
var qtdeGrupoInimigos = 150;
var volumeSons = 0.02;

//
// objeto principal
//
var game = new Phaser.Game(larguraJogo, alturaJogo, Phaser.AUTO, 'palco', {preload: game_preload, create: game_create});

//
// objetos adicionais
//
var gameLoad = function(game) {};
var gameIntro = function(game) {};
var gameOnePlayer = function(game) {};
var gameTwoPlayers = function(game) {};
//var gameBattle = function(game) {};
var gameInfo = function(game) {};
var gameOver = function(game) {};

//
// variáveis
//
var nivelJogo = 1;
//var intro_esc;
//var intro_escCredito;
var demons;
var piso;
var player1;
var player2;
var flor, tesouro;
var music;
var j1_pontos = 0;
var j1_vidas = 3;
var j2_pontos = 0;
var j2_vidas = 3;
var tempoVidaInimigo = 0;
var j1_direcao = 1;
var j2_direcao = 1;
var j1_facaDireitaTempo = 0;
var j1_facaEsquerdaTempo = 0;
var j2_facaDireitaTempo = 0;
var j2_facaEsquerdaTempo = 0;
var j1_qtdeAcertos = 0;
var j2_qtdeAcertos = 0;
var j1_facaDireita;
var j1_facaEsquerda;
var j2_facaDireita;
var j2_facaEsquerda;
var j1_explosao;
var j2_explosao;
var j1_textoPontos;
var j1_textoVidas;
var j2_textoPontos;
var j2_textoVidas;
var fx_perdeu_vida;
var fx_fim_jogo;
var fx_pegou_flor;
var fx_pegou_tesouro;
var fx_acertou_faca;
var fx_lancou_faca;

//-----------------------------------------------------------------------------
//
// game
// Objeto principal do jogo.
//
//-----------------------------------------------------------------------------

//
// game_preload
//
function game_preload() {
  game.state.add('gameLoad', gameLoad);
  game.state.add('gameIntro', gameIntro);
  game.state.add('gameOnePlayer', gameOnePlayer);
  game.state.add('gameTwoPlayers', gameTwoPlayers);
//  game.state.add('gameBattle', gameBattle);
  game.state.add('gameInfo', gameInfo);
  game.state.add('gameOver', gameOver);
}

//
// game_create
//
function game_create() {
  game.state.start('gameLoad');
}

//-----------------------------------------------------------------------------
//
// gameLoad
// Carga de arquivos do jogo.
//
//-----------------------------------------------------------------------------

gameLoad.prototype = {
  //
  // preload
  //
  preload: function() {

    // intro
    // telas
    game.load.image('telainicial', 'art/intro/tela-inicial4.png', larguraJogo, alturaJogo);
    game.load.image('telaAjuda', 'art/intro/guia-teclas.png', 600, 408);
    game.load.image('telaCreditos', 'art/intro/creditos.png', 600, 408);

    // sprites (dos botões)
    game.load.spritesheet('botao1', 'art/intro/buttons.png', 279, 77);
    game.load.spritesheet('botao2', 'art/intro/buttons1.png', 279, 77);
    game.load.spritesheet('botaoAjuda', 'art/intro/buttonhelp.png', 38, 40);
    game.load.spritesheet('botaoCredito', 'art/intro/buttoncredito.png', 38, 40);

    // play (1 e 2)   
    // mapa
    game.load.spritesheet('cave', 'art/play/tilesetsAndMap/cave.png', 96, 31);
    game.load.image('fundo00', 'art/play/tilesetsAndMap/fundo00.png');
    game.load.image('fundo01', 'art/play/tilesetsAndMap/fundo01.png');
    game.load.image('fundo02', 'art/play/tilesetsAndMap/fundo02.png');
    game.load.image('fundo03', 'art/play/tilesetsAndMap/fundo03.png');
    game.load.image('tiles01', 'art/play/tilesetsAndMap/tiles01.png');
    game.load.tilemap('map', 'art/play/tilesetsAndMap/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles02', 'art/play/tilesetsAndMap/tiles02.png');
    game.load.tilemap('map1', 'art/play/tilesetsAndMap/map1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles03', 'art/play/tilesetsAndMap/tiles03.png');
    game.load.tilemap('map2', 'art/play/tilesetsAndMap/map2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles04', 'art/play/tilesetsAndMap/tiles04.png');
    game.load.tilemap('map3', 'art/play/tilesetsAndMap/map3.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('map4', 'art/play/tilesetsAndMap/map4.json', null, Phaser.Tilemap.TILED_JSON);

    // sprites
    game.load.spritesheet('reyna', 'art/play/sprites/reyna.png', 44, 49);
    game.load.spritesheet('lash', 'art/play/sprites/lash.png', 44, 49);
    game.load.spritesheet('faca-esquerda', 'art/play/faca-esquerda.png', 30, 11);
    game.load.spritesheet('faca-direita', 'art/play/faca-direita.png', 30, 11);
    game.load.spritesheet('demons00', 'art/play/sprites/demons01.png', 32, 31);
    game.load.spritesheet('flor', 'art/play/tilesetsAndMap/flower.png', 32, 32);
    game.load.spritesheet('tesouro', 'art/play/tilesetsAndMap/tesouro.png', 32, 32);
    game.load.spritesheet('pixel', 'art/play/pixel.png', 3, 3);

    // sons
    game.load.audio('perdeu_vida', 'art/audio/boss_hit.ogg');
    game.load.audio('fim_jogo', 'art/audio/player_death.ogg');
    game.load.audio('pegou_flor', 'art/audio/meow.ogg');
    game.load.audio('pegou_tesouro', 'art/audio/explode.ogg');
    game.load.audio('acertou_faca', 'art/audio/squit.ogg');
    game.load.audio('lancou_faca', 'art/audio/shotgun.ogg');

    // músicas
    game.load.audio('maroon-animals', 'art/music/animals.ogg');
    game.load.audio('maroon-maps', 'art/music/maps.ogg');
    game.load.audio('demi-confident', 'art/music/confident.ogg');
    game.load.audio('cools-kids', 'art/music/cools-kids.ogg');
    game.load.audio('elastic-heart', 'art/music/elastic-heart.ogg');
    game.load.audio('never-gonna-give-you-up', 'art/music/never-gonna-give-you-up.ogg');
    game.load.audio('take-me-to-church', 'art/music/take-me-to-church.ogg');
    game.load.audio('where-are-u-now', 'art/music/where-are-u-now.ogg');

    // gameover
    game.load.image('venceu', 'art/fimdejogo/venceu.png', larguraJogo, alturaJogo);
    game.load.image('perdeu', 'art/fimdejogo/perdeu.png', larguraJogo, alturaJogo);

  },
  //
  // create
  //
  create: function() {
    game.state.start('gameIntro');
  }
  //
  // fim
  //
};

//-----------------------------------------------------------------------------
//
// gameIntro
// Tela inicial do jogo. Contém a escolha de quantidade de jogadores.
//
//-----------------------------------------------------------------------------

gameIntro.prototype = {
  //
  // create
  //
  create: function() {

    // inicialização das variáveis
    nivelJogo = 1;
    j1_pontos = 0;
    j2_pontos = 0;
    j1_vidas = 3;
    j2_vidas = 3;
    j1_direcao = 1;
    j2_direcao = 1;

    game.add.image(0, 0, 'telainicial');

    music = game.add.audio('where-are-u-now');
    music.play();

    botao1 = game.add.button(76, 453, 'botao1', this.iniciaUmJogador, this, 1, 0, 2);
    botao1.scale.set(1.1);

    botao2 = game.add.button(437, 449, 'botao2', this.iniciaDoisJogadores, this, 1, 0, 2);
    botao2.scale.set(1.15);
    
    game.add.button(735, 17, 'botaoAjuda', this.helpMenu, this, 1, 0, 2);
    game.add.button(20, 17, 'botaoCredito', this.creditoMenu, this, 1, 0, 2);

//    intro_esc = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
//    intro_escCredito = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
  //
  // update
  //
  update: function() {
//    if (intro_esc.isDown) { telaAjuda.kill(); }
//    if (intro_escCredito.isDown) { telaCreditos.kill(); }
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      telaAjuda.kill();
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      telaCreditos.kill();
    }
  },
  //
  // iniciaJogo1
  //
  iniciaUmJogador: function(pointer) {
    this.state.start('gameOnePlayer');
  },
  //
  // iniciaJogo2
  //
  iniciaDoisJogadores: function(pointer) {
    this.state.start('gameTwoPlayers');
  },
  //
  // helpMenu
  //
  helpMenu: function(pointer) {
    telaAjuda = game.add.image(100, 100, 'telaAjuda');
    telaAjuda.kill();
  },
  //
  // creditoMenu
  //
  creditoMenu: function(pointer) {
    telaCreditos = game.add.image(100, 100, 'telaCreditos');
    telaCreditos.kill();
  }
  //
  // fim
  //
};

//-----------------------------------------------------------------------------
//
// gameOnePlayer
// Rotinas de controle para um jogador.
//
//-----------------------------------------------------------------------------

gameOnePlayer.prototype = {
  //
  // gamePlayer1_create
  //
  create: function() {

    // inicialização de variáveis
    tempoVidaInimigo = 0;
    j1_facaDireitaTempo = 0;
    j1_facaEsquerdaTempo = 0;
    j2_facaDireitaTempo = 0;
    j2_facaEsquerdaTempo = 0;
    j1_qtdeAcertos = 0;
    j2_qtdeAcertos = 0;

    // configurações do nível
    if (nivelJogo == 1) {
      velocidadeJogador = 250;
      velocidadeInimigo = 300;
      velocidadeFaca = 300;
      gravidadeJogador = 290;
      acertosCriacaoFlor = 20;
      acertosCriacaoTesouro = 30;
      intervaloCriacaoInimigo = 500;
      intervaloCriacaoFaca = 600;
    } else if (nivelJogo == 2) {
      velocidadeJogador = 350;
      velocidadeInimigo = 400;
      velocidadeFaca = 500;
      gravidadeJogador = 350;
      acertosCriacaoFlor = 30;
      acertosCriacaoTesouro = 40;
      intervaloCriacaoInimigo = 400;
      intervaloCriacaoFaca = 500;
    } else if (nivelJogo == 3) {
      velocidadeJogador = 350;
      velocidadeInimigo = 500;
      velocidadeFaca = 600;
      gravidadeJogador = 260;
      acertosCriacaoFlor = 40;
      acertosCriacaoTesouro = 50;
      intervaloCriacaoInimigo = 300;
      intervaloCriacaoFaca = 400;
    } else if (nivelJogo == 4) {
      velocidadeJogador = 300;
      velocidadeInimigo = 500;
      velocidadeFaca = 650;
      gravidadeJogador = 200;
      acertosCriacaoFlor = 50;
      acertosCriacaoTesouro = 60;
      intervaloCriacaoInimigo = 250;
      intervaloCriacaoFaca = 400;
    } else {
      velocidadeJogador = 450;
      velocidadeInimigo = 650;
      velocidadeFaca = 650;
      gravidadeJogador = 200;
      acertosCriacaoFlor = 60;
      acertosCriacaoTesouro = 70;
      intervaloCriacaoInimigo = 250;
      intervaloCriacaoFaca = 250;
    }

    // física do jogo
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = gravidadeJogador;

    // imagem fundo do jogo
    if (nivelJogo == 1) {
      game.add.image(0, 0, 'fundo00');
    } else if (nivelJogo == 2) {
      game.add.image(0, 0, 'fundo01');
    } else if (nivelJogo == 3) {
      game.add.image(0, 0, 'fundo02');
    } else if (nivelJogo == 4) {
      game.add.image(0, 0, 'fundo03');
    } else {
      game.add.image(0, 0, 'fundo02');
    }

    // define os limites do mundo
    game.world.setBounds(0, 0, 800, alturaMundo);

    // sons
    fx_perdeu_vida = game.add.audio('perdeu_vida');
    fx_perdeu_vida.allowMultiple = true;
    fx_fim_jogo = game.add.audio('fim_jogo');
    fx_fim_jogo.allowMultiple = true;
    fx_pegou_flor = game.add.audio('pegou_flor');
    fx_pegou_flor.allowMultiple = true;
    fx_pegou_tesouro = game.add.audio('pegou_tesouro');
    fx_pegou_tesouro.allowMultiple = true;
    fx_acertou_faca = game.add.audio('acertou_faca');
    fx_acertou_faca.allowMultiple = true;
    fx_lancou_faca = game.add.audio('lancou_faca');
    fx_lancou_faca.allowMultiple = true;

    // música
    music.stop();
    if (nivelJogo == 1) {
      music = game.add.audio('maroon-maps');
    } else if (nivelJogo == 2) {
      music = game.add.audio('maroon-animals');
    } else if (nivelJogo == 3) {
      music = game.add.audio('demi-confident');
    } else if (nivelJogo == 4) {
      music = game.add.audio('cools-kids');
    } else {
      music = game.add.audio('elastic-heart');
    }

    // player1 (física)
    player1 = game.add.sprite(0, 5390, 'reyna');
    game.physics.arcade.enable(player1);
    player1.body.bounce.y = 0.3;
    player1.body.collideWorldBounds = true;
    game.camera.follow(player1);

    // animações do player1
    player1.animations.add('j1_moveUp', [0, 1, 2]);
    player1.animations.add('j1_moveLeft', [3, 4, 5, 6]);
    player1.animations.add('j1_moveRight', [7, 8, 9, 10]);
    player1.animations.add('j1_moveDown', [11, 12, 13]);

    // criação do mapa do jogo
    if (nivelJogo == 1) {
      map = game.add.tilemap('map');
      map.addTilesetImage('tiles01');
    } else if (nivelJogo == 2) {
      map = game.add.tilemap('map1');
      map.addTilesetImage('tiles02');
    } else if (nivelJogo == 3) {
      map = game.add.tilemap('map2');
      map.addTilesetImage('tiles03');
    } else if (nivelJogo == 4) {
      map = game.add.tilemap('map3');
      map.addTilesetImage('tiles04');
    } else {
      map = game.add.tilemap('map4');
      map.addTilesetImage('tiles04');
    }
    piso = map.createLayer('plats');
    map.setCollisionBetween(0, 10000, true, piso);

    // demônios
    demons = game.add.group();
    demons.createMultiple(qtdeGrupoInimigos, 'demons00');
    game.physics.arcade.enable(demons);
    demons.setAll('checkWorldBounds', true);
    demons.setAll('outOfBoundsKill', true);

    // texto da pontuação
    j1_textoPontos = game.add.text(5, 5, 'Pontos: ' + j1_pontos, {font: "16px Arial", fill: "#ffffff"});
    j1_textoPontos.fixedToCamera = true;

    // texto das vidas
    j1_textoVidas = game.add.text(5, 22, 'Vidas: ' + j1_vidas, {font: "16px Arial", fill: "#ffffff"});
    j1_textoVidas.fixedToCamera = true;

    // para fazer a explosão
    j1_explosao = game.add.emitter(0, 0, 200);
    j1_explosao.makeParticles('pixel');
    j1_explosao.gravity.y = gravidadeExplosao;

    // toca a música
    music.play('', 1, true);

  },
  //
  // update
  //
  update: function() {

    // colisão das coisas
    game.physics.arcade.collide(player1, piso);
    game.physics.arcade.collide(demons, piso);
    game.physics.arcade.collide(flor, piso);
    game.physics.arcade.collide(tesouro, piso);
    game.physics.arcade.collide(player1, demons, this.colisaoJogadorInimigo); 
    game.physics.arcade.collide(player1, flor, this.colisaoJogadorFlor);
    game.physics.arcade.collide(player1, tesouro, this.colisaoJogadorTesouro);
    game.physics.arcade.collide(j1_facaDireita, piso, this.colisaoFacaPiso);
    game.physics.arcade.collide(j1_facaDireita, demons, this.colisaoFacaInimigo);
    game.physics.arcade.collide(j1_facaEsquerda, piso, this.colisaoFacaPiso);
    game.physics.arcade.collide(j1_facaEsquerda, demons, this.colisaoFacaInimigo);

    // esta linha faz o player1 parar quando não apertarmos nada
    player1.body.velocity.x = 0; 
    player1.animations.stop();

    // movimentação do personagem
    // para esquerda OU para direita
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      j1_direcao = -1;
      player1.body.velocity.x = velocidadeJogador * (-1);
      player1.play('j1_moveLeft');
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      j1_direcao = 1;
      player1.body.velocity.x = velocidadeJogador;
      player1.play('j1_moveRight');
    }
    // para cima OU para baixo
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && player1.body.onFloor()) {
      player1.body.velocity.y = alturaPuloJogador * (-1);
      player1.play('j1_moveUp');
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      player1.play('j1_moveDown');
    }
    // atira a faca
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.lancaFaca();
    }
    // ativa a função da criação de inimigos
    this.criarInimigos();
    // para ganhar o jogo
    if (player1.y < 80) {
      nivelJogo++;
      if (nivelJogo <= 5) {
        this.state.start('gameOnePlayer');
      } else {
        this.state.start('gameInfo');
      }
    }
    
  },
  //
  // criarInimigos
  // Cria os inimigos randomicamente na tela.
  //
  criarInimigos: function() {
    if ((game.time.now - tempoVidaInimigo) > intervaloCriacaoInimigo) {
      if (demons.countLiving() <= 0) {
        demons.createMultiple(qtdeGrupoInimigos, 'demons00');
      }
      var inimigo = demons.getFirstExists(false);
      inimigo.reset(Math.random() * larguraJogo, Math.random() * alturaMundo);
      inimigo.body.velocity.y = Math.random() * velocidadeInimigo;
      inimigo.body.velocity.x = Math.random() * velocidadeInimigo;
      inimigo.animations.add('bicho', [3, 4, 5]);
      inimigo.animations.play('bicho');
      tempoVidaInimigo = game.time.now;
    }
  },
  //
  // colisaoJogadorInimigo
  // Trata a colisão do jogador com o inimigo.
  //
  colisaoJogadorInimigo: function(AJogador, AInimigo) {
    fx_perdeu_vida.play();
    if (j1_vidas >= 1) {
      j1_vidas--;
      j1_exibeTextoVidas();
    }
    if (j1_vidas == 0) {
      fx_fim_jogo.play();
      // explode o jogador
      j1_criaExplosao(AJogador.x, AJogador.y);
      AJogador.kill();
      game.state.start('gameOver');
    } else {
      // explode o inimigo
      j1_criaExplosao(AInimigo.x, AInimigo.y);
      AInimigo.kill();
    }
  },
  //
  // colisaoJogadorFlor
  // Trata a colisão do jogador com uma flor.
  //
  colisaoJogadorFlor: function (AJogador, AFlor) {
    fx_pegou_flor.play();
    j1_pontos += pontosColisaoJogadorFlor;
    j1_exibeTextoPontos();
    AFlor.kill();
  },
  //
  // colisaoJogadorTesouro
  // Trata a colisão do jogador com um tesouro.
  //
  colisaoJogadorTesouro: function(AJogador, ATesouro) {
    fx_pegou_tesouro.play();
    j1_pontos += pontosColisaoJogadorTesouro;
    j1_exibeTextoPontos();
    j1_vidas += vidasColisaoTesouro;
    j1_exibeTextoVidas();
    ATesouro.kill();
  }, 
  //
  // colisaoFacaPiso
  // Trata a colisão da faça com as plataformas.
  //
  colisaoFacaPiso: function(AFaca, APiso) {
    j1_criaExplosao(AFaca.x, AFaca.y);
    AFaca.kill();
  },
  //
  // colisaoFacaInimigo
  // trata a colisão da faca com o inimigo
  //
  colisaoFacaInimigo: function(AFaca, AInimigo) {
    fx_acertou_faca.play();
    j1_pontos += pontosColisaoFacaInimigo;
    j1_exibeTextoPontos();
    j1_qtdeAcertos += 1;
    j1_criaExplosao(AInimigo.x, AInimigo.y);
    AInimigo.kill();
    AFaca.kill();
    // cria uma flor
    if ((j1_qtdeAcertos % acertosCriacaoFlor) == 0) {
      flor = game.add.sprite(Math.random() * larguraJogo, player1.y + Math.random() * 200, 'flor');
      game.physics.arcade.enable(flor);
      flor.body.immovable = true;
    }
    // cria um tesouro
    if ((j1_qtdeAcertos % acertosCriacaoTesouro) == 0) {
      tesouro = game.add.sprite(Math.random() * larguraJogo, player1.y + Math.random() * 200, 'tesouro');
      game.physics.arcade.enable(tesouro);
      tesouro.body.immovable = true;
    }
  },
  //
  // lancaFaca
  // Função para lançamento das facas que matarão os inimigos.
  //
  lancaFaca: function() {
    fx_lancou_faca.play();
    if (j1_direcao > 0) {
      if ((game.time.now - j1_facaDireitaTempo) > intervaloCriacaoFaca) {
        j1_facaDireita = game.add.sprite(player1.x, player1.y + 30, 'faca-direita');
        game.physics.arcade.enable(j1_facaDireita);
        j1_facaDireita.body.allowGravity = false;
        j1_facaDireita.body.velocity.x = velocidadeFaca;
        j1_facaDireitaTempo = game.time.now;
      }
    } else {
      if ((game.time.now - j1_facaEsquerdaTempo) > intervaloCriacaoFaca) {
        j1_facaEsquerda = game.add.sprite(player1.x, player1.y + 30, 'faca-esquerda');
        game.physics.arcade.enable(j1_facaEsquerda);
        j1_facaEsquerda.body.allowGravity = false;
        j1_facaEsquerda.body.velocity.x = velocidadeFaca * (-1);
        j1_facaEsquerdaTempo = game.time.now;
      }
    }
  }
  //
  // fim
  //
}

//-----------------------------------------------------------------------------
//
// gameTwoPlayers
// Rotinas de controle para dois jogadores.
//
//-----------------------------------------------------------------------------

gameTwoPlayers.prototype = {
  //
  // create
  //
  create: function() {

    // inicialização de variáveis
    tempoVidaInimigo = 0;
    j1_facaDireitaTempo = 0;
    j1_facaEsquerdaTempo = 0;
    j2_facaDireitaTempo = 0;
    j2_facaEsquerdaTempo = 0;
    j1_qtdeAcertos = 0;
    j2_qtdeAcertos = 0;

    // configurações do nível
    if (nivelJogo == 1) {
      velocidadeJogador = 250;
      velocidadeInimigo = 300;
      velocidadeFaca = 300;
      gravidadeJogador = 290;
      acertosCriacaoFlor = 20;
      acertosCriacaoTesouro = 30;
      intervaloCriacaoInimigo = 500;
      intervaloCriacaoFaca = 600;
    } else if (nivelJogo == 2) {
      velocidadeJogador = 350;
      velocidadeInimigo = 400;
      velocidadeFaca = 500;
      gravidadeJogador = 350;
      acertosCriacaoFlor = 30;
      acertosCriacaoTesouro = 40;
      intervaloCriacaoInimigo = 400;
      intervaloCriacaoFaca = 500;
    } else if (nivelJogo == 3) {
      velocidadeJogador = 350;
      velocidadeInimigo = 500;
      velocidadeFaca = 600;
      gravidadeJogador = 260;
      acertosCriacaoFlor = 40;
      acertosCriacaoTesouro = 50;
      intervaloCriacaoInimigo = 300;
      intervaloCriacaoFaca = 400;
    } else if (nivelJogo == 4) {
      velocidadeJogador = 300;
      velocidadeInimigo = 500;
      velocidadeFaca = 650;
      gravidadeJogador = 200;
      acertosCriacaoFlor = 50;
      acertosCriacaoTesouro = 60;
      intervaloCriacaoInimigo = 250;
      intervaloCriacaoFaca = 400;
    } else {
      velocidadeJogador = 450;
      velocidadeInimigo = 650;
      velocidadeFaca = 650;
      gravidadeJogador = 200;
      acertosCriacaoFlor = 60;
      acertosCriacaoTesouro = 70;
      intervaloCriacaoInimigo = 250;
      intervaloCriacaoFaca = 250;
    }

    // física do jogo
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = gravidadeJogador;

    // imagem fundo do jogo
    if (nivelJogo == 1) {
      game.add.image(0, 0, 'fundo00');
    } else if (nivelJogo == 2) {
      game.add.image(0, 0, 'fundo01');
    } else if (nivelJogo == 3) {
      game.add.image(0, 0, 'fundo02');
    } else if (nivelJogo == 4) {
      game.add.image(0, 0, 'fundo03');
    } else {
      game.add.image(0, 0, 'fundo02');
    }

    // define os limites do mundo
    game.world.setBounds(0, 0, 800, alturaMundo);

    // sons
    fx_perdeu_vida = game.add.audio('perdeu_vida');
    fx_perdeu_vida.allowMultiple = true;
    fx_fim_jogo = game.add.audio('fim_jogo');
    fx_fim_jogo.allowMultiple = true;
    fx_pegou_flor = game.add.audio('pegou_flor');
    fx_pegou_flor.allowMultiple = true;
    fx_pegou_tesouro = game.add.audio('pegou_tesouro');
    fx_pegou_tesouro.allowMultiple = true;
    fx_acertou_faca = game.add.audio('acertou_faca');
    fx_acertou_faca.allowMultiple = true;
    fx_lancou_faca = game.add.audio('lancou_faca');
    fx_lancou_faca.allowMultiple = true;

    // música
    music.stop();
    if (nivelJogo == 1) {
      music = game.add.audio('maroon-maps');
    } else if (nivelJogo == 2) {
      music = game.add.audio('maroon-animals');
    } else if (nivelJogo == 3) {
      music = game.add.audio('demi-confident');
    } else if (nivelJogo == 4) {
      music = game.add.audio('cools-kids');
    } else {
      music = game.add.audio('elastic-heart');
    }

    // player1 (física)
    player1 = game.add.sprite(0, 5390, 'reyna');
    game.physics.arcade.enable(player1);
    player1.body.bounce.y = 0.3;
    player1.body.collideWorldBounds = true;
    game.camera.follow(player1);

    // player2 (física)
    player2 = game.add.sprite(larguraMundo - 50, 5390, 'lash');
    game.physics.arcade.enable(player2);
    player2.body.bounce.y = 0.3;
    player2.body.collideWorldBounds = true;

    // animações do player1
    player1.animations.add('j1_moveUp', [0, 1, 2]);
    player1.animations.add('j1_moveLeft', [3, 4, 5, 6]);
    player1.animations.add('j1_moveRight', [7, 8, 9, 10]);
    player1.animations.add('j1_moveDown', [11, 12, 13]);

    // animações do player2
    player2.animations.add('j2_moveUp', [0, 1, 2]);
    player2.animations.add('j2_moveLeft', [3, 4, 5, 6]);
    player2.animations.add('j2_moveRight', [7, 8, 9, 10]);
    player2.animations.add('j2_moveDown', [11, 12, 13]);

    // criação do mapa do jogo
    if (nivelJogo == 1) {
      map = game.add.tilemap('map');
      map.addTilesetImage('tiles01');
    } else if (nivelJogo == 2) {
      map = game.add.tilemap('map1');
      map.addTilesetImage('tiles02');
    } else if (nivelJogo == 3) {
      map = game.add.tilemap('map2');
      map.addTilesetImage('tiles03');
    } else if (nivelJogo == 4) {
      map = game.add.tilemap('map3');
      map.addTilesetImage('tiles04');
    } else {
      map = game.add.tilemap('map4');
      map.addTilesetImage('tiles04');
    }
    piso = map.createLayer('plats');
    map.setCollisionBetween(0, 10000, true, piso);

    // demônios
    demons = game.add.group();
    demons.createMultiple(qtdeGrupoInimigos, 'demons00');
    game.physics.arcade.enable(demons);
    demons.setAll('checkWorldBounds', true);
    demons.setAll('outOfBoundsKill', true);

    // texto da pontuação (jogador 1)
    j1_textoPontos = game.add.text(5, 5, 'Pontos: ' + j1_pontos, {font: "16px Arial", fill: "#ffffff"});
    j1_textoPontos.fixedToCamera = true;
    // texto da pontuação (jogador 2)
    j2_textoPontos = game.add.text(larguraJogo - 115, 5, 'Pontos: ' + j2_pontos, {font: "16px Arial", fill: "#ffffff"});
    j2_textoPontos.fixedToCamera = true;

    // texto das vidas (jogador 1)
    j1_textoVidas = game.add.text(5, 22, 'Vidas: ' + j1_vidas, {font: "16px Arial", fill: "#ffffff"});
    j1_textoVidas.fixedToCamera = true;
    // texto das vidas (jogador 2)
    j2_textoVidas = game.add.text(larguraJogo - 115, 22, 'Vidas: ' + j2_vidas, {font: "16px Arial", fill: "#ffffff"});
    j2_textoVidas.fixedToCamera = true;

    // explosão (jogador 1)
    j1_explosao = game.add.emitter(0, 0, 200);
    j1_explosao.makeParticles('pixel');
    j1_explosao.gravity.y = gravidadeExplosao;

    // explosão (jogador 2)
    j2_explosao = game.add.emitter(0, 0, 200);
    j2_explosao.makeParticles('pixel');
    j2_explosao.gravity.y = gravidadeExplosao;

    // toca a música
    music.play('', 1, true);

  },
  //
  // update
  //
  update: function() {

    // colisão das coisas
    game.physics.arcade.collide(demons, piso);
    game.physics.arcade.collide(flor, piso);
    game.physics.arcade.collide(tesouro, piso);
    // colisões (jogador 1)
    game.physics.arcade.collide(player1, piso);
    game.physics.arcade.collide(player1, demons, this.j1_colisaoJogadorInimigo); 
    game.physics.arcade.collide(player1, flor, this.j1_colisaoJogadorFlor);
    game.physics.arcade.collide(player1, tesouro, this.j1_colisaoJogadorTesouro);
    game.physics.arcade.collide(j1_facaDireita, piso, this.j1_colisaoFacaPiso);
    game.physics.arcade.collide(j1_facaDireita, demons, this.j1_colisaoFacaInimigo);
    game.physics.arcade.collide(j1_facaEsquerda, piso, this.j1_colisaoFacaPiso);
    game.physics.arcade.collide(j1_facaEsquerda, demons, this.j1_colisaoFacaInimigo);
    // colisões (jogador 2)
    game.physics.arcade.collide(player2, piso);
    game.physics.arcade.collide(player2, demons, this.j2_colisaoJogadorInimigo); 
    game.physics.arcade.collide(player2, flor, this.j2_colisaoJogadorFlor);
    game.physics.arcade.collide(player2, tesouro, this.j2_colisaoJogadorTesouro);
    game.physics.arcade.collide(j2_facaDireita, piso, this.j2_colisaoFacaPiso);
    game.physics.arcade.collide(j2_facaDireita, demons, this.j2_colisaoFacaInimigo);
    game.physics.arcade.collide(j2_facaEsquerda, piso, this.j2_colisaoFacaPiso);
    game.physics.arcade.collide(j2_facaEsquerda, demons, this.j2_colisaoFacaInimigo);

    // esta linha faz o player1 parar quando não apertarmos nada
    player1.body.velocity.x = 0; 
    player1.animations.stop();
    player2.body.velocity.x = 0; 
    player2.animations.stop();

    // movimentação do personagem
    // para esquerda OU para direita
    if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
      j1_direcao = -1;
      player1.body.velocity.x = velocidadeJogador * (-1);
      player1.play('j1_moveLeft');
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
      j1_direcao = 1;
      player1.body.velocity.x = velocidadeJogador;
      player1.play('j1_moveRight');
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      j2_direcao = -1;
      player2.body.velocity.x = velocidadeJogador * (-1);
      player2.play('j2_moveLeft');
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      j2_direcao = 1;
      player2.body.velocity.x = velocidadeJogador;
      player2.play('j2_moveRight');
    }
    // para cima OU para baixo
    if (game.input.keyboard.isDown(Phaser.Keyboard.W) && player1.body.onFloor()) {
      player1.body.velocity.y = alturaPuloJogador * (-1);
      player1.play('j1_moveUp');
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
      player1.body.velocity.y = velocidadeJogador;
      player1.play('j1_moveDown');
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)  && player2.body.onFloor()) {
      player2.body.velocity.y = alturaPuloJogador * (-1);
      player2.play('j2_moveUp');
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      player2.body.velocity.y = velocidadeJogador;
      player2.play('j2_moveDown');
    }
    // atira a faca
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.j1_lancaFaca();
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      this.j2_lancaFaca();
    }
    // ativa a função da criação de inimigos
    this.criarInimigos();
    // para ganhar o jogo
    if (player1.y < 80 && player2.y < 80) {
      nivelJogo++;
      if (nivelJogo <= 5) {
        this.state.start('gameTwoPlayers');
      } else {
        this.state.start('gameInfo');
      }
    }

  },
  //
  // criarInimigos
  // Cria os inimigos randomicamente na tela.
  //
  criarInimigos: function() {
    if ((game.time.now - tempoVidaInimigo) > intervaloCriacaoInimigo) {
      if (demons.countLiving() <= 0) {
        demons.createMultiple(qtdeGrupoInimigos, 'demons00');
      }
      var inimigo = demons.getFirstExists(false);
      inimigo.reset(Math.random() * larguraJogo, Math.random() * alturaMundo);
      inimigo.body.velocity.y = Math.random() * velocidadeInimigo;
      inimigo.body.velocity.x = Math.random() * velocidadeInimigo;
      inimigo.animations.add('bicho', [3, 4, 5]);
      inimigo.animations.play('bicho');
      tempoVidaInimigo = game.time.now;
    }
  },
  //
  // j1_colisaoJogadorInimigo
  // Trata a colisão do jogador 1 com o inimigo.
  //
  j1_colisaoJogadorInimigo: function(AJogador, AInimigo) {
    fx_perdeu_vida.play();
    if (j1_vidas >= 1) {
      j1_vidas--;
      j1_exibeTextoVidas();
    }
    if (j1_vidas == 0) {
      fx_fim_jogo.play();
      // explode o jogador
      j1_criaExplosao(AJogador.x, AJogador.y);
      AJogador.kill();
      game.state.start('gameOver');
    } else {
      // explode o inimigo
      j1_criaExplosao(AInimigo.x, AInimigo.y);
      AInimigo.kill();
    }
  },
  //
  // j2_colisaoJogadorInimigo
  // Trata a colisão do jogador 2 com o inimigo.
  //
  j2_colisaoJogadorInimigo: function(AJogador, AInimigo) {
    fx_perdeu_vida.play();
    if (j2_vidas >= 1) {
      j2_vidas--;
      j2_exibeTextoVidas();
    }
    if (j2_vidas == 0) {
      fx_fim_jogo.play();
      // explode o jogador
      j2_criaExplosao(AJogador.x, AJogador.y);
      AJogador.kill();
      game.state.start('gameOver');
    } else {
      // explode o inimigo
      j2_criaExplosao(AInimigo.x, AInimigo.y);
      AInimigo.kill();
    }
  },
  //
  // j1_colisaoJogadorFlor
  // Trata a colisão do jogador 1 com uma flor.
  //
  j1_colisaoJogadorFlor: function (AJogador, AFlor) {
    fx_pegou_flor.play();
    j1_pontos += pontosColisaoJogadorFlor;
    j1_exibeTextoPontos();
    AFlor.kill();
  },
  //
  // j2_colisaoJogadorFlor
  // Trata a colisão do jogador 2 com uma flor.
  //
  j2_colisaoJogadorFlor: function (AJogador, AFlor) {
    fx_pegou_flor.play();
    j2_pontos += pontosColisaoJogadorFlor;
    j2_exibeTextoPontos();
    AFlor.kill();
  },
  //
  // j1_colisaoJogadorTesouro
  // Trata a colisão do jogador 1 com um tesouro.
  //
  j1_colisaoJogadorTesouro: function(AJogador, ATesouro) {
    fx_pegou_tesouro.play();
    j1_pontos += pontosColisaoJogadorTesouro;
    j1_exibeTextoPontos();
    j1_vidas += vidasColisaoTesouro;
    j1_exibeTextoVidas();
    ATesouro.kill();
  },
  //
  // j2_colisaoJogadorTesouro
  // Trata a colisão do jogador 2 com um tesouro.
  //
  j2_colisaoJogadorTesouro: function(AJogador, ATesouro) {
    fx_pegou_tesouro.play();
    j2_pontos += pontosColisaoJogadorTesouro;
    j2_exibeTextoPontos();
    j2_vidas += vidasColisaoTesouro;
    j2_exibeTextoVidas();
    ATesouro.kill();
  },
  //
  // j1_colisaoFacaPiso
  // Trata a colisão da faca com as plataformas.
  //
  j1_colisaoFacaPiso: function(AFaca, APiso) {
    j1_criaExplosao(AFaca.x, AFaca.y);
    AFaca.kill();
  },
  //
  // j2_colisaoFacaPiso
  // Trata a colisão da faca com as plataformas.
  //
  j2_colisaoFacaPiso: function(AFaca, APiso) {
    j2_criaExplosao(AFaca.x, AFaca.y);
    AFaca.kill();
  },
  //
  // j1_colisaoFacaInimigo
  // trata a colisão da faca atirada pelo jogador 1, com o inimigo.
  //
  j1_colisaoFacaInimigo: function(AFaca, AInimigo) {
    fx_acertou_faca.play();
    j1_pontos += pontosColisaoFacaInimigo;
    j1_exibeTextoPontos();
    j1_qtdeAcertos += 1;
    j1_criaExplosao(AInimigo.x, AInimigo.y);
    AInimigo.kill();
    AFaca.kill();
    // cria uma flor
    if ((j1_qtdeAcertos % acertosCriacaoFlor) == 0) {
      flor = game.add.sprite(Math.random() * larguraJogo, player1.y + Math.random() * 200, 'flor');
      game.physics.arcade.enable(flor);
      flor.body.immovable = true;
    }
    // cria um tesouro
    if ((j1_qtdeAcertos % acertosCriacaoTesouro) == 0) {
      tesouro = game.add.sprite(Math.random() * larguraJogo, player1.y + Math.random() * 200, 'tesouro');
      game.physics.arcade.enable(tesouro);
      tesouro.body.immovable = true;
    }
  },
  //
  // j2_colisaoFacaInimigo
  // trata a colisão da faca atirada pelo jogador 2, com o inimigo.
  //
  j2_colisaoFacaInimigo: function(AFaca, AInimigo) {
    fx_acertou_faca.play();
    j2_pontos += pontosColisaoFacaInimigo;
    j2_exibeTextoPontos();
    j2_qtdeAcertos += 1;
    j2_criaExplosao(AInimigo.x, AInimigo.y);
    AInimigo.kill();
    AFaca.kill();
    // cria uma flor
    if ((j2_qtdeAcertos % acertosCriacaoFlor) == 0) {
      flor = game.add.sprite(Math.random() * larguraJogo, player2.y + Math.random() * 200, 'flor');
      game.physics.arcade.enable(flor);
      flor.body.immovable = true;
    }
    // cria um tesouro
    if ((j2_qtdeAcertos % acertosCriacaoTesouro) == 0) {
      tesouro = game.add.sprite(Math.random() * larguraJogo, player2.y + Math.random() * 200, 'tesouro');
      game.physics.arcade.enable(tesouro);
      tesouro.body.immovable = true;
    }
  },
  //
  // j1_lancaFaca
  // Lançamento da faca pelo jogador 1.
  //
  j1_lancaFaca: function() {
    fx_lancou_faca.play();
    if (j1_direcao > 0) {
      if ((game.time.now - j1_facaDireitaTempo) > intervaloCriacaoFaca) {
        j1_facaDireita = game.add.sprite(player1.x, player1.y + 30, 'faca-direita');
        game.physics.arcade.enable(j1_facaDireita);
        j1_facaDireita.body.allowGravity = false;
        j1_facaDireita.body.velocity.x = velocidadeFaca;
        j1_facaDireitaTempo = game.time.now;
      }
    } else {
      if ((game.time.now - j1_facaEsquerdaTempo) > intervaloCriacaoFaca) {
        j1_facaEsquerda = game.add.sprite(player1.x, player1.y + 30, 'faca-esquerda');
        game.physics.arcade.enable(j1_facaEsquerda);
        j1_facaEsquerda.body.allowGravity = false;
        j1_facaEsquerda.body.velocity.x = velocidadeFaca * (-1);
        j1_facaEsquerdaTempo = game.time.now;
      }
    }
  },
  //
  // j2_lancaFaca
  // Lançamento da faca pelo jogador 2.
  //
  j2_lancaFaca: function() {
    fx_lancou_faca.play();
    if (j2_direcao > 0) {
      if ((game.time.now - j2_facaDireitaTempo) > intervaloCriacaoFaca) {
        j2_facaDireita = game.add.sprite(player2.x, player2.y + 30, 'faca-direita');
        game.physics.arcade.enable(j2_facaDireita);
        j2_facaDireita.body.allowGravity = false;
        j2_facaDireita.body.velocity.x = velocidadeFaca;
        j2_facaDireitaTempo = game.time.now;
      }
    } else {
      if ((game.time.now - j2_facaEsquerdaTempo) > intervaloCriacaoFaca) {
        j2_facaEsquerda = game.add.sprite(player2.x, player2.y + 30, 'faca-esquerda');
        game.physics.arcade.enable(j2_facaEsquerda);
        j2_facaEsquerda.body.allowGravity = false;
        j2_facaEsquerda.body.velocity.x = velocidadeFaca * (-1);
        j2_facaEsquerdaTempo = game.time.now;
      }
    }
  }
  //
  // fim
  //
};

//-----------------------------------------------------------------------------
//
// gameBattle
// Tratamento das batalhas do jogo.
//
//-----------------------------------------------------------------------------
/***
gameBattle.prototype = {
  //
  // create
  //
  create: function() {
    // do something
  },
  //
  // update
  //
  update: function() {
    // do something
  }
  //
  // fim
  //
};
***/
//-----------------------------------------------------------------------------
//
// gameInfo
// Informações finais do jogo.
//
//-----------------------------------------------------------------------------

gameInfo.prototype = {
  //
  // create
  //
  create: function() {
    game.add.image(0, 0, 'venceu');
    music.stop();
    music = game.add.audio('never-gonna-give-you-up');
    music.play('', 1, true);
    reiniciar = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  },
  //
  // gameOver_update
  //
  update: function() {
    // do something
    if (reiniciar.isDown) {
      music.stop();
      this.state.start('gameIntro');
    }
  }
  //
  // fim
  //
};

//-----------------------------------------------------------------------------
//
// gameOver
// Encerramento do jogo.
//
//-----------------------------------------------------------------------------

gameOver.prototype = {
  //
  // gameOver_create
  //
  create: function() {
    // do something
    game.add.image(0, 0, 'perdeu');
    music.stop();
    music = game.add.audio('take-me-to-church');
    music.play('', 1, true);
    reiniciar = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  },
  //
  // gameOver_update
  //
  update: function() {
    // do something
    if (reiniciar.isDown) {
      music.stop();
      this.state.start('gameIntro');
    }
  }
  //
  // fim
  //
};

//-----------------------------------------------------------------------------
//
// FUNÇÕES GERAIS
//
//-----------------------------------------------------------------------------

//
// exibeTextoPontos
//
function j1_exibeTextoPontos() {
  j1_textoPontos.text = 'Pontos: ' + j1_pontos;
}

function j2_exibeTextoPontos() {
  j2_textoPontos.text = 'Pontos: ' + j2_pontos;
}

//
// exibeTextoVidas
//
function j1_exibeTextoVidas() {
  j1_textoVidas.text = 'Vidas: ' + j1_vidas;
}

function j2_exibeTextoVidas() {
  j2_textoVidas.text = 'Vidas: ' + j2_vidas;
}

//
// criaExplosao
//
function j1_criaExplosao(APosX, APosY) {
  j1_explosao.x = APosX;
  j1_explosao.y = APosY;
  j1_explosao.start(true, raioExplosao, null, fpsExplosao);
}

function j2_criaExplosao(APosX, APosY) {
  j2_explosao.x = APosX;
  j2_explosao.y = APosY;
  j2_explosao.start(true, raioExplosao, null, fpsExplosao);
}

//-----------------------------------------------------------------------------
//
// fim de arquivo
//
//-----------------------------------------------------------------------------
