// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls

export default class Scene3 extends Phaser.Scene{
    constructor(){
        super({
            key: "cena_castelo"
        })
    }

    preload(){
        this.load.tilemapTiledJSON('map_castle', './assets/mapas/castelo/mapa castelo.json');
        this.load.image('assets', './assets/mapas/castelo/objetos.png');
        this.load.spritesheet("tyler", "./assets/sprites_personagens/assets_tyler/tyler_armor.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("tecla_E", "./assets/tecla.png");
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);

    }

    create(){
        // Trasição de fade in para quando a cena iniciar
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.criarMapa();
        this.criarPersonagem();
        this.control.create();
        this.voltar = 20;
    }

    criarMapa(){
        this.map = this.make.tilemap({key:'map_castle'});
        this.tilesetObject = this.map.addTilesetImage('objetos', 'assets')

        this.ground = this.map.createLayer('ground', this.tilesetObject, 0, 0);
        this.objects = this.map.createLayer('objects', this.tilesetObject, 0, 0);
        this.decoracao = this.map.createLayer('decoracao', this.tilesetObject, 0, 0);

        this.objects.setCollisionByProperty({collider: true})

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

        // Adiciona colisor entre o jogador e o chão
        this.physics.add.collider(this.tyler, this.objects);

        // Cria as animações utilizando o Animacao
        Animacao.createAnimations(this);

        // Cria a câmera do jogador
        this.playerCamera = new Camera(this, this.tyler, this.map);

        
    }

    update(){
        this.control.update();

        if(this.tyler.x < this.voltar){
            
            this.transitionToScene2('scene2');
        }
        console.log(this.tyler.x < this.voltar);
    }

    transitionToScene2(cena) {
        this.scene.start(cena); // Inicia a cena 1
    }
}