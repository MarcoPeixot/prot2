// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls

export default class Scene1 extends Phaser.Scene {
    constructor() {
        super({
            key: "cena_predio"
        })
    }

    preload() {
        //teste
        this.load.image('tile_teste', './assets/mapas/mapa_teste/[A]Dirt_pipo.png');
        this.load.tilemapTiledJSON('map_teste', './assets/mapas/mapa_teste/teste.json');
        this.load.image('tile_predio', './assets/mapas/predio/Tileset_3_MV.png');
        this.load.image('tile_calcada', './assets/mapas/predio/Tileset_10_MV.png');
        this.load.image('tile_arvores', './assets/mapas/predio/Tileset_21_MV.png');
        this.load.image('tile_estrada', './assets/mapas/predio/Tileset_16_MV.png');
        this.load.image('tile_cars', './assets/mapas/predio/Tileset_Cars_MV.png');
        this.load.image('tile_plantas', './assets/mapas/predio/Tileset_8_MV.png');
        this.load.image('tile_hotdog', './assets/mapas/predio/Tileset_31_MV.png');
        this.load.tilemapTiledJSON('map_predio', './assets/mapas/predio/map_meta.json');
        this.load.spritesheet("tyler", "./assets/sprites_personagens/assets_tyler/tyler_armor.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("tecla_E", "./assets/tecla.png");
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    }

    create() {
        // Trasição de fade in para quando a cena iniciar
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.criarMapa();
        this.criarPersonagem();
        
        this.control.create();
        
        this.passar = 10;
    }

    criarMapa() {
        //teste
        this.map = this.make.tilemap({ key: 'map_teste' });
        this.tilesetTeste = this.map.addTilesetImage('[A]Dirt_pipo', 'tile_teste');
        this.teste = this.map.createLayer('teste', this.tilesetTeste, 0, 0);


       

    }

    criarPersonagem() {
        // Encontra o ponto de spawn do jogador no mapa
        

        // Cria o jogador, câmera e controles
        this.tyler = new Player(this, 100, 200, 'tyler');
        this.camera = new Camera(this, this.tyler, this.map);
        this.control = new Controls(this, this.tyler);

        this.physics.add.collider(this.tyler, this.calcada);
        this.physics.add.collider(this.tyler, this.predio);
        this.physics.add.collider(this.tyler, this.carros);
        this.physics.add.collider(this.tyler, this.barreira);
        this.physics.add.collider(this.tyler, this.arvores);
        this.physics.add.collider(this.tyler, this.plantas);
        this.physics.add.collider(this.tyler, this.decoracao);
        this.physics.add.collider(this.tyler, this.carinha);

        // Cria as animações utilizando o Animacao
        Animacao.createAnimations(this, 'tyler');

        // Cria a câmera do jogador
        this.playerCamera = new Camera(this, this.tyler, this.map);


    }

    update() {
        
        this.control.update();
        console.log(this.tyler.x, this.tyler.y);
        if (this.tyler.x >= 800 && this.tyler.y <= 450) {
            this.transitionToScene2('mainScene');
        }
    }

    transitionToScene2(cena) {
        this.scene.start(cena); // Inicia a cena 1
    }
}