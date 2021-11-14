let carrosCorrida = [];
let game;

window.onload = function () {
    setCarro();
    let buttonIniciar = document.getElementById('iniciarBotao');
    buttonIniciar.addEventListener('click', function () {
        this.className = 'ativado';
        mudarImagem();
        game = setInterval(moveImage, 100);
    });
};

function mudarImagem() {
    for (let i = 0; i < 4; i++) {
        let carroCorrida = carrosCorrida[i];
        let carroElement = document.getElementById(`carro${i + 1}`);
        carroElement.src = `images/${carroCorrida.imagem}.gif`;
        carroElement.style.left = '0px';
    }
}

class Carro {
    constructor(nome, imagem, velocidade) {
        this.nome = nome;
        this.imagem = imagem;
        this.velocidade = velocidade;
    }
}

function setCarro() {
    for (let i = 0; i < 4; i++) {
        carrosCorrida[i] = new Carro(
            `carro${i + 1}`,
            `carro${i + 1}`,
            randomize(10, 20),
        );
    }
}

function randomize(min, max) {
    return min + Math.round(Math.random() * (max - min));
}

function moveImage() {
    for (let i = 0; i < 4; i++) {
        let carroCorrida = carrosCorrida[i];
        let carroElement = document.getElementById(`carro${i + 1}`);

        carroElement.style.left = parseInt(carroElement.style.left.substr(0, carroElement.style.left.indexOf('px'))) + carroCorrida.velocidade + 'px';

        if (parseInt(carroElement.style.left.substr(0, carroElement.style.left.indexOf('px'))) >= 660) {
            fim(i);
        }
    }
}

function fim(vencedor) {
    clearInterval(game);
    for (let i = 0; i < 4; i++) {
        let carroElement = document.getElementById(`carro${i + 1}`);
        let carroCorrida = carrosCorrida[i];
        carroElement.src = `images/i_${carroCorrida.imagem}.png`;
        if (i == vencedor) {
            document.getElementById(`vencedor${i + 1}`).innerHTML = `<div class="vencedor"><img src="images/trofeu.png"><p>Vencedor!</p>`;
        }
    }
}
