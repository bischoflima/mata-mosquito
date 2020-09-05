let mortes = 0;
let vidas = 3;
let tempo = 15;
let tamanhoPalcoJogo = {
    altura: window.innerHeight,
    largura: window.innerWidth
}

function velocidade() {
    let nivel = (window.location.href).split("?")[1];
    switch (nivel) {
        case "facil":
            return 2000;
        case "normal":
            return 1600;
        case "medio":
            return 1200;
        case "dificil":
            return 800;
        default:
            return 2000;
    }
}

function ajustaVida() {
    if (mortes > vidas)
        window.location.href = "game-over.html";

    for (let i = 1; i <= mortes; i++) {
        if (i <= mortes) {
            document.querySelector(".coracao" + i).src = "imagens/coracao_vazio.png";
        }
    }
}

function posicaoX() {
    let posicao = Math.floor(Math.random() * tamanhoPalcoJogo.largura) - 90;
    return posicao < 90 ? 90 : posicao;
}

function posicaoY() {
    let posicao = Math.floor(Math.random() * tamanhoPalcoJogo.altura) - 90;
    return posicao < 90 ? 90 : posicao;
}

function widthAleatorio() {
    return Math.floor(50 + (Math.random() * 80));
}

function ladoAleatorio() {
    let lado = Math.floor((Math.random() * 2));
    return lado == 1 ? "scaleX(1)" : "scaleX(-1)"
}

function removeMosquito() {
    let elemento = document.querySelector(".mosquito1");
    if (elemento) {
        mortes++;
        ajustaVida();
        elemento.remove();
    }
}

function criaMosquitto() {

    removeMosquito();

    let mosquito = document.createElement("img");
    mosquito.src = "imagens/mosca.png";
    mosquito.className = "mosquito1";
    mosquito.style.left = posicaoX() + "px";
    mosquito.style.top = posicaoY() + "px";
    mosquito.style.position = "absolute";
    mosquito.style.width = widthAleatorio() + "px";
    mosquito.style.transform = ladoAleatorio();
    mosquito.onclick = function(){
        mosquito.remove();
        document.querySelector(".smash").play();
    };

    document.body.appendChild(mosquito);
}

function jogar() {
    criaMosquitto();
}

document.querySelector(".fundo").play();

let cronometro = setInterval(function () {
    if (tempo < 0) {
        clearInterval(cronometro);
        window.location.href = 'vitoria.html';
    } else {
        document.querySelector(".cronometro").innerHTML = `Tempo restante ${tempo}s`;
        tempo--;
    }
}, 1000);
let intervalo = setInterval(jogar, velocidade() );
