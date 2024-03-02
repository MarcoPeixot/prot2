// Player.js
export default class Player extends Phaser.Physics.Arcade.Sprite {
    // Construtor que recebe a cena, as coordenadas (x, y) e a textura como parâmetros
    constructor(scene, x, y, texture) {
        // Chama o construtor da classe pai (Phaser.Physics.Arcade.Sprite)
        super(scene, x, y, texture);

        // Adiciona o jogador à cena e configura a física
        scene.add.existing(this);
        scene.physics.add.existing(this);
     

        // Define a escala do jogador
        this.setScale(1.2);
    }

    // Método de atualização do jogador, recebe o objeto "cursors" como parâmetro
    update(cursors, joyStick) {
        // Zera a velocidade do jogador para evitar movimentos indesejados
        this.body.setVelocity(0);
        

        // Verifica as teclas pressionadas e define a velocidade do jogador
        if (cursors.right.isDown || joyStick.right) {
            this.body.setVelocityX(200);
        } else if (cursors.left.isDown|| joyStick.left) {
            this.body.setVelocityX(-200);
        } if (cursors.down.isDown|| joyStick.down) {
            this.body.setVelocityY(200);
        } else if (cursors.up.isDown|| joyStick.up) {
            this.body.setVelocityY(-200);
        }

        // Verifica a direção do movimento e reproduz a animação correspondente
        if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
            if (this.body.velocity.y < 0) {
                this.anims.play('subir', true);
            } else if (this.body.velocity.y > 0) {
                this.anims.play('descer', true);
            } else if (this.body.velocity.x < 0) {
                this.anims.play('andar_esquerda', true);
            } else if (this.body.velocity.x > 0) {
                this.anims.play('andar_direita', true);
            }
        } else {
            // Se o jogador não estiver se movendo, para a animação
            this.anims.stop();
        }
    }
}
