import Animacoes from '../../player/animation.js';  // Importa o módulo de animações
import Player from '../../player/player.js';        // Importa o módulo do jogador
import Camera from '../../player/camera.js';        // Importa o módulo da câmera
import Controls from '../../player/controles.js';   // Importa o módulo de controles
import Texto from '../../player/texto.js';          // Importa o módulo de texto

export default class SceneOffice extends Phaser.Scene{
    
    
    
    constructor(){
        super({
            key:'cena_escritorio'
        });
    }

    preload(){
        //novo mapa
        this.load.tilemapTiledJSON("map_escritorio", "./assets/mapas/escritorio/mapa escritorio.tmj");
        this.load.spritesheet("tyler", "./assets/sprites_personagens/assets_tyler/tyler_armor.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("MainEscritorio", "./assets/mapas/escritorio/Office_Design_1real real.png");
        this.load.image("corredor", "./assets/mapas/escritorio/corredor.png");
        this.load.image("corredor_inicio", "./assets/mapas/escritorio/corredor_Meta.png");
        this.load.image("corredor_inicio", "./assets/mapas/escritorio/objetos.png");

    }

    create(){
        //Mapa escritorio
        this.criarMapa();       // Configuração e criação do mapa
        this.criarPersonagem();  // Criação do jogador e controles
        this.criarNpc();         // Configuração e criação do NPC

        
    }
    criarMapa() {
        // Cria o mapa e define o tileset
        this.map = this.make.tilemap({ key: "map_escritorio" });
        this.tileset = this.map.addTilesetImage("assets", "MainEscritorio");
        // Cria as camadas do mapa
        this.ground = this.map.createLayer("ground", this.tileset, 0, 0);
        this.objectCollider = this.map.createLayer("objectCollider", this.tileset, 0, 0);

        // Define colisões com base nas propriedades do mapa
        this.ground.setCollisionByProperty({ collider: true })
        this.objectCollider.setCollisionByProperty({ collider: true })

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
        this.physics.add.collider(this.tyler, this.ground);

        // Cria as animações utilizando o Animacao
        Animacao.createAnimations(this);

        // Cria a câmera do jogador
        this.playerCamera = new Camera(this, this.tyler, this.map);
    }
    criarNpc() {
        // Configuração inicial do NPC
        const spawnPointNpc = this.map.findObject(
            "npc1",
            (objects) => objects.name === "spawning point npc"
        );

        // Criação do NPC Vanessa
        this.vanessa = this.physics.add.sprite(spawnPointNpc.x, spawnPointNpc.y, "vanessa").setScale(1.2).setImmovable();

        // Configuração do texto associado ao NPC Vanessa
        this.textoVanessa = this.add.text(this.vanessa.x, this.vanessa.y - 40, '', { fontFamily: 'Arial', fontSize: 16, color: '#ffffff' }).setOrigin(0.5);
    }
    update() {
        // Atualiza os controles do jogador
        this.control.update();
    }
    
}