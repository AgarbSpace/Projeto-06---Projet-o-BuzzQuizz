let quantidadeDePerguntas = 0;
let contadorPergunta = 1; 

//quizzesLocais()

function telaDesaparece(){
    const quizzDesaparece = document.querySelector(".quizz")
    const quizzesDesaparece = document.querySelector(".quizzes")
    const telaDeCriacaoDoQuizzAparece = document.querySelector(".telaDeCriacaoDoQuizz")
    quizzDesaparece.classList.add("none")
    quizzesDesaparece.classList.add("none");
    telaDeCriacaoDoQuizzAparece.classList.remove("none");
}

function quizzesLocais(){
    const quizzExiste = document.querySelector(".seusQuizzes .quizzesLocais .imagemComTexto");
    if(quizzExiste !== null){
        const quizzDesaparece = document.querySelector(".quizz")
        const seusQuizzesAparece = document.querySelector(".seusQuizzes");
        quizzDesaparece.classList.add("none")
        seusQuizzesAparece.classList.remove("none");
    }
}

function validaQuizz(){
    const validaTitulo = document.querySelector(".tituloQuizz").value
    const validaQtdePerguntas = document.querySelector(".qtdePerguntasQuizz").value
    const validaQtdeNiveis = document.querySelector(".qtdeNiveisQuizz").value
    if(validaTitulo.length < 20 || validaTitulo.length > 65 || validaTitulo=== "" || validaTitulo === null){
        alert("O título é inválido, deve conter de 20 a 65 caracteres");
        validaTitulo.value = "";
    }
    if(validaQtdePerguntas < 3 || validaQtdePerguntas === "" || validaQtdePerguntas === null){
        alert("Mínimo de perguntas é 3");
        validaQtdePerguntas.value = ""
    }
    if(validaQtdeNiveis < 2 || validaQtdeNiveis === "" || validaQtdeNiveis === null){
        alert("Precisa de um mínimo de 2 níveis")
        validaQtdePerguntas.value = ""
    }

    quantidadeDePerguntas = validaQtdePerguntas;
}

function preencherAparece(icone){
    contadorPergunta++;
    const paiDoElemento = icone.parentElement;
    const avoDoElemento = paiDoElemento.parentElement;
    paiDoElemento.classList.add("none");
    if((contadorPergunta) < quantidadeDePerguntas){
    avoDoElemento.innerHTML += `
    <div class="pergunta flexColumn">
        <span class="estiloDaFonte">Pergunta ${contadorPergunta}</span>
        <input class="textoDaPergunta" type="text" placeholder="Texto da pergunta">
        <input class="corDeFundoDaPergunta" type="text" placeholder="Cor de fundo da pergunta">
    </div>
    
    <div class="respostaCorreta flexColumn">
        <span class="estiloDaFonte">Resposta correta</span>
        <input class="inputRespostaCorreta" type="text" placeholder="Resposta correta">
        <input class= "urlRespostaCorreta" type="text" placeholder="URL da imagem">
    </div>
    
    <div class="respostasIncorretas flexColumn">
        <span class="estiloDaFonte">Respostas incorretas</span>
        <input class="respostaIncorreta" type="text" placeholder="Resposta incorreta 1">
        <input class="url" type="text" placeholder="URL da imagem 1">
        <input class="respostaIncorreta" type="text" placeholder="Resposta incorreta 2">
        <input class="url" type="text" placeholder="URL da imagem 2">
        <input class="respostaIncorreta" type="text" placeholder="Resposta incorreta 3">
        <input class="url" type="text" placeholder="URL da imagem 3">
        </div>

    <div class="flex containerPergunta"> 
    <span class="estiloDaFonte">Pergunta ${contadorPergunta + 1}</span>
    <ion-icon name="create-outline" onclick ="preencherAparece(this)"></ion-icon>
    </div>    `
    }else if(contadorPergunta === parseInt(quantidadeDePerguntas)){
        avoDoElemento.innerHTML += `
        <div class="pergunta flexColumn">
            <span class="estiloDaFonte">Pergunta ${contadorPergunta}</span>
            <input class="textoDaPergunta" type="text" placeholder="Texto da pergunta">
            <input class="corDeFundoDaPergunta" type="text" placeholder="Cor de fundo da pergunta">
        </div>
        
        <div class="respostaCorreta flexColumn">
            <span class="estiloDaFonte">Resposta correta</span>
            <input class="inputRespostaCorreta" type="text" placeholder="Resposta correta">
            <input class= "urlRespostaCorreta" type="text" placeholder="URL da imagem">
        </div>
        
        <div class="respostasIncorretas flexColumn">
            <span class="estiloDaFonte">Respostas incorretas</span>
            <input class="respostaIncorreta" type="text" placeholder="Resposta incorreta 1">
            <input class="url" type="text" placeholder="URL da imagem 1">
            <input class="respostaIncorreta" type="text" placeholder="Resposta incorreta 2">
            <input class="url" type="text" placeholder="URL da imagem 2">
            <input class="respostaIncorreta" type="text" placeholder="Resposta incorreta 3">
            <input class="url" type="text" placeholder="URL da imagem 3">
        </div>
        
        <button class="prosseguir" onclick="validaPergunta(); validaResposta(); validaRespostaIncorreta()">Prosseguir pra criar níveis</button>
        `
    }
}

function validaPergunta(){
    const validacaoDaPergunta = document.querySelectorAll(".pergunta")
    let tamanhoPergunta = validacaoDaPergunta[0].children[2].value
    let validaCor;

    for(i = 0; i < validacaoDaPergunta[0].children.length; i++){
        if(validacaoDaPergunta[0].children[i].classList.contains("corDeFundoDaPergunta") === true){
            validaCor = validacaoDaPergunta[0].children[i].value;
            if(validaCor[0] === '#' && validaCor.length <= 6){
                for(let j = 1; j < validaCor.length; j++ ){
                    if((validaCor[i] >= 'A' && validaCor[i] <= 'F') || (validaCor[i] >= 0 && validaCor[i] <= 9)){
                    }else{
                        alert("Código de cor inválido, tente com letras de A a F maiúsculas, números e iniciar com #")
                        break;
                    }
                }
            }else{
                alert("Cores hexadecimais devem iniciar com # e ter até 6 caracteres")
            }
        }else if(typeof(validacaoDaPergunta[0].children[i].value) === 'string'){
             tamanhoPergunta = validacaoDaPergunta[0].children[i].value
             if(tamanhoPergunta.length < 20 ){
                alert("Título deve ser superior a 20 caracteres");
            }
         }
     }
}

function validaResposta(){
    const validaRespostaCorreta = document.querySelectorAll(".respostaCorreta");
    if(validaRespostaCorreta[0].children[1].value === null || validaRespostaCorreta[0].children[1].value === "" ){
        alert("Insira algo no campo de resposta")
    }
    if(validaRespostaCorreta[0].children[0]){

    }
}

function validaRespostaIncorreta(){
    const validarRespostaIncorreta = document.querySelectorAll(".respostasIncorretas");
    if(validarRespostaIncorreta[0].children[1].value === null || validarRespostaIncorreta[0].children[1].value === ""){
        alert("Insira ao menos uma resposta incorreta");
    }
    
}