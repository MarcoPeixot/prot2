// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls

var mudarCena = 0;  // Variável global para controlar a mudança de cena

// Define e exporta a classe Scene2
export default class Scene2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'scene2'
        });
    }

    // Pré-carrega os recursos necessários
    preload() {
        this.load.image("tiles", "./assets/mapas/mapa2/samplemap.png");
        this.load.tilemapTiledJSON("map_praca", "./assets/mapas/mapa2/map2.json");
        this.load.spritesheet("tyler", "./assets/sprites_personagens/novo_persona.png", { frameWidth: 32, frameHeight: 32 });
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    }



    // Cria os elementos do jogo
    create() {
        // Trasição de fade in para quando a cena iniciar
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.criarMapa();
        this.criarPersonagem();
        this.control.create();

        // Define a posição limite para a transição de cena
        this.voltarPonte = 30;
    }

    criarMapa() {
        // Cria o mapa e define o tileset
        this.map = this.make.tilemap({ key: "map_praca" });
        this.tileset = this.map.addTilesetImage("assets", "tiles");
        // Cria as camadas do mapa
        this.water = this.map.createLayer("water", this.tileset, 0, 0);
        this.ground = this.map.createLayer("ground", this.tileset, 0, 0);

        // Define colisões com base nas propriedades do mapa
        this.ground.setCollisionByProperty({ collider: true })
        this.water.setCollisionByProperty({collider: true})
    }

    criarPersonagem() {
        // Encontra o ponto de spawn do jogador no mapa
        const spawnPoint = this.map.findObject(
            "player",
            (objects) => objects.name === "spawning point"
        );

        const spawnPointVoltar = this.map.findObject(
            "voltar",
            (objects) => objects.name === "spawning point volta"
        );

        if (mudarCena === 0) {
            this.tyler = new Player(this, spawnPoint.x, spawnPoint.y, 'tyler');  // Criação do jogador em uma posição específica
            this.control = new Controls(this, this.tyler);     // Criação dos controles associados ao jogador
        }
        if (mudarCena === 1) {
            this.tyler = new Player(this, spawnPointVoltar.x, spawnPointVoltar.y, 'tyler');  // Criação do jogador em outra posição
            this.control = new Controls(this, this.tyler);     // Criação dos controles associados ao jogador
        }

        // Cria o jogador, câmera e controles
        this.camera = new Camera(this, this.tyler, this.map);
        
        // Adiciona colisor entre o jogador e o chão
        this.physics.add.collider(this.tyler, this.ground);

        // Adiciona colisor entre o jogador e a água
        this.physics.add.collider(this.tyler, this.water);

        // Cria as animações utilizando o Animacao
        Animacao.createAnimations(this);

        // Cria a câmera do jogador
        this.playerCamera = new Camera(this, this.tyler, this.map);

        this.passarPonte = 1000;
        this.passarPonteY = 200;
    }


    // Atualiza o jogo
    update() {
        // Atualiza os controles do jogador
        this.control.update();
        // Verifica se o jogador atingiu a posição de transição de cena
        if (this.tyler.x <= this.voltarPonte){
            this.transitionToScene1("mainScene")
        }

        if(this.tyler.x >= this.passarPonte && this.tyler.y <= this.passarPonteY){
            this.transitionToScene1("cena_castelo");
        }
    }

    // Método para transição para a cena 1
    transitionToScene1(cena) {
        this.scene.start(cena); // Inicia a cena 1
    }
}
