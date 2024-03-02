// texto.js
export default class TextManager {

    // Método estático para exibir texto letra por letra
    static showTextLetterByLetter(scene, text, textObject) {
        let index = 0;

        // Adiciona um evento de tempo para exibir cada letra do texto
        scene.time.addEvent({
            callback: () => {
                textObject.text += text[index];  // Adiciona a próxima letra ao objeto de texto
                index++;

                // Verifica se todas as letras foram exibidas
                if (index === text.length) {
                    scene.time.removeAllEvents();  // Remove todos os eventos de tempo após exibir todas as letras
                }
            },
            repeat: text.length - 1,  // Configura o número de repetições com base no comprimento do texto
            delay: 50,  // Atraso entre cada letra (em milissegundos)
            callbackScope: scene  // Define o escopo do callback como a cena
        });
    }
}
