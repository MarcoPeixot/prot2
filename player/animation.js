// AnimationManager.js
export default class AnimationManager {
    // Método estático para criar animações, recebe a cena como parâmetro
    static createAnimations(scene, sprite) {
        // Criação da animação 'descer'
        scene.anims.create({
            key: 'descer', // Nome da animação
            frames: scene.anims.generateFrameNumbers(sprite, { start: 0, end: 2 }), // Gera números de quadros
            frameRate: 10, // Taxa de quadros por segundo
            repeat: -1 // -1 para repetição infinita
        })

        // Criação da animação 'andar_esquerda'
        scene.anims.create({
            key: 'andar_esquerda',
            frames: scene.anims.generateFrameNumbers(sprite, { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        })

        // Criação da animação 'andar_direita'
        scene.anims.create({
            key: 'andar_direita',
            frames: scene.anims.generateFrameNumbers(sprite, { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        })

        // Criação da animação 'subir'
        scene.anims.create({
            key: 'subir',
            frames: scene.anims.generateFrameNumbers(sprite, { start: 9, end: 11 }),
            frameRate: 10,
            repeat: -1
        })
    }
}
