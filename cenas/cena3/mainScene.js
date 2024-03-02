// mainScene.js
import Animacoes from '../../player/animation.js';  // Importa o módulo de animações
import Player from '../../player/player.js';        // Importa o módulo do jogador
import Camera from '../../player/camera.js';        // Importa o módulo da câmera
import Controls from '../../player/controles.js';   // Importa o módulo de controles
import Texto from '../../player/texto.js';          // Importa o módulo de texto

var mudarCena = 0;  // Variável global para controlar a mudança de cena

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'mainScene'
        });
    }

    preload() {
        // Carrega os assets necessários para a cena
        this.load.image("tile_grass", "./assets/mapas/novo_mapa/grass.png");
        this.load.image("tile_water", "./assets/mapas/novo_mapa/water.png");
        this.load.image("tile_objetos", "./assets/mapas/novo_mapa/objetos.png");
        this.load.tilemapTiledJSON("map_florest", "./assets/mapas/novo_mapa/new_map.json");
        this.load.spritesheet("tyler", "./assets/sprites_personagens/assets_tyler/tyler_armor.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("vanessa", "./assets/sprites_personagens/assets_vanessa/vanessa_lado.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("tecla_E", "./assets/tecla.png");
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);   
    }

    create() {
        // Trasição de fade in para quando a cena iniciar
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        // Inicializa a cena
        this.criarMapa();       // Configuração e criação do mapa
        this.criarPersonagem();  // Criação do jogador e controles
        this.criarNpc();         // Configuração e criação do NPC
        this.controls.create();

        // Configurações adicionais da cena
        this.transicaoPonte = 1000;
        this.textoJaExibido = false;
        this.segundaMensagemExibida = false;
        this.tecla_E = this.add.sprite(this.tyler.x, this.tyler.y - 40, "tecla_E").setOrigin(0.5, 0.5).setVisible(false).setScale(0.1);
    }

    criarMapa() {
        // Criação do mapa
        this.map = this.make.tilemap({ key: "map_florest" });     // Criação da instância do mapa
        this.tilesetGrass = this.map.addTilesetImage("grass", "tile_grass");  // Adição do tileset de grama
        this.tilesetWater = this.map.addTilesetImage("water", "tile_water");  // Adição do tileset de água
        this.tilesetObject = this.map.addTilesetImage("objetos", "tile_objetos");  // Adição do tileset de objetos

        // Adição das camadas do mapa
        this.ground = this.map.createLayer("ground", this.tilesetGrass, 0, 0);
        this.water = this.map.createLayer("water", this.tilesetWater, 0, 0);
        this.ponte = this.map.createLayer("ponte", this.tilesetObject, 0, 0);
        this.object = this.map.createLayer("object", this.tilesetObject, 0, 0);

        // Configuração de colisões
        this.water.setCollisionByProperty({ collider: true });
        this.object.setCollisionByProperty({ collider: true });
        this.object.setDepth(10);
    }

    criarPersonagem() {
        // Criação do jogador
        if (mudarCena === 0) {
            this.tyler = new Player(this, 100, 400, 'tyler');  // Criação do jogador em uma posição específica
            this.controls = new Controls(this, this.tyler);     // Criação dos controles associados ao jogador
        }
        if (mudarCena === 1) {
            this.tyler = new Player(this, 900, 400, 'tyler');  // Criação do jogador em outra posição
            this.controls = new Controls(this, this.tyler);     // Criação dos controles associados ao jogador
        }

        // Configuração de colisões do jogador com elementos do mapa
        this.physics.add.collider(this.tyler, this.water);
        this.physics.add.collider(this.tyler, this.object);

        // Inicialização das animações do jogador
        Animacoes.createAnimations(this);
        
        // Criação da câmera seguindo o jogador
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

    colisaoComNpc() {
        // Tratamento de colisão com o NPC
        this.textoVanessa.text = '';
        Texto.showTextLetterByLetter(this, "Olá, seja bem-vindo Tyler", this.textoVanessa);

        this.textoJaExibido = true;

        // Adiciona um atraso antes de exibir a segunda mensagem
        setTimeout(() => {
            this.textoVanessa.text = '';
            Texto.showTextLetterByLetter(this, "Siga em frente!", this.textoVanessa);

            // Adiciona um atraso antes de limpar o texto após a segunda mensagem
            setTimeout(() => {
                this.textoVanessa.text = '';
            }, 2000);
        }, 2000);
    }

    update() {
        // Atualização da cena a cada quadro
        this.controls.update();  // Atualiza os controles
        this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 40);

        // Verifica se o jogador alcançou o ponto de transição para a próxima cena
        if (this.tyler.x >= this.transicaoPonte) {
            this.transicaoCena2('scene2');  // Inicia a transição para a próxima cena
            mudarCena = 1;  // Atualiza a variável global para indicar a mudança de cena
        }

        // Verifica se há overlap entre o jogador e o NPC Vanessa
        const overlapping = this.physics.overlap(this.tyler, this.vanessa);

        if (overlapping) {
            this.tecla_E.setVisible(true);

            // Verifica se a tecla "E" foi pressionada
            if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
                this.colisaoComNpc();  // Chama a função de interação com o NPC Vanessa
            }
        } else {
            this.tecla_E.setVisible(false);
        }
    }

    transicaoCena2(cena) {
        this.scene.start(cena);  // Inicia a transição para a próxima cena
    }
}
