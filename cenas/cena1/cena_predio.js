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
        this.map = this.make.tilemap({ key: 'map_predio' });
        this.tilesetPredio = this.map.addTilesetImage('predio', 'tile_predio');
        this.tilesetCalcada = this.map.addTilesetImage('calçada', 'tile_calcada');
        this.tilesetArvores = this.map.addTilesetImage('arvores', 'tile_arvores');
        this.tilesetEstrada = this.map.addTilesetImage('estrada', 'tile_estrada');
        this.tilesetCarro = this.map.addTilesetImage('carros', 'tile_cars');
        this.tilesetPlantas = this.map.addTilesetImage('plantas', 'tile_plantas');
        this.tilesetDecoracao = this.map.addTilesetImage('decoracao', 'tile_hotdog');

        this.estrada = this.map.createLayer('estrada', this.tilesetEstrada, 0, 0);
        this.calcada = this.map.createLayer('calcada', this.tilesetCalcada, 0, 0);
        this.barreira = this.map.createLayer('barreira', this.tilesetEstrada, 0, 0);
        this.carros = this.map.createLayer('carros', this.tilesetCarro, 0, 0);
        this.arvTras = this.map.createLayer('arvtras', this.tilesetArvores, 0, 0);
        this.arvores = this.map.createLayer('arvores', this.tilesetArvores, 0, 0);
        this.plantas = this.map.createLayer('plantas', this.tilesetPlantas, 0, 0);
        this.decoracao = this.map.createLayer('decoracao', this.tilesetDecoracao, 0, 0);
        this.carinha = this.map.createLayer('caraCachorro', this.tilesetDecoracao, 0, 0);
        this.predio = this.map.createLayer('predio', this.tilesetPredio, 0, 0);

        this.calcada.setCollisionByProperty({ collider: true });
        this.predio.setCollisionByProperty({ collider: true });
        this.carros.setCollisionByProperty({ collider: true });
        this.barreira.setCollisionByProperty({ collider: true });
        this.arvores.setCollisionByProperty({ collider: true });
        this.plantas.setCollisionByProperty({ collider: true });
        this.decoracao.setCollisionByProperty({ collider: true });
        this.carinha.setCollisionByProperty({ collider: true });

        this.carros.setDepth(10);
        this.decoracao.setDepth(10);
        this.carinha.setDepth(10);
        this.plantas.setDepth(10);

    }

    criarPersonagem() {
        // Encontra o ponto de spawn do jogador no mapa
        const spawnPoint = this.map.findObject(
            "player",
            (objects) => objects.name === "spawning point"
        );

        // Cria o jogador, câmera e controles
        this.tyler = new Player(this, spawnPoint.x, spawnPoint.y, 'tyler');
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
        Animacao.createAnimations(this);

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