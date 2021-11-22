let quantidadeDePerguntas = 0;
let contadorPergunta = 1; 

//quizzesLocais()
pegarTodosOsQuizzes(); 
function pegarTodosOsQuizzes(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promessa.then(listarQuizzes);
    promessa.catch(() => alert("Algo deu errado"));
}

function listarQuizzes(quizzesDoServidor){
    const quizzes = quizzesDoServidor.data;
    const addQuizzesFeitos = document.querySelector(".quizzesFeitos");
    for(let i = 0; i < quizzes.length; i++){
        addQuizzesFeitos.innerHTML += `
        <div id="${quizzes[i].id}" class="imagemComTexto">
        <img src="${quizzes[i].image}" alt="">
        <span class="textoDaImg">${quizzes[i].title}</span>
    </div>`
    }
}

function telaDesaparece(){
    const quizzDesaparece = document.querySelector(".quizz")
    const quizzesDesaparece = document.querySelector(".quizzes")
    const telaDeCriacaoDoQuizzAparece = document.querySelector(".telaDeCriacaoDoQuizz")
    const seusQuizzesDesaparece = document.querySelector(".seusQuizzes");
    quizzDesaparece.classList.add("none");
    quizzesDesaparece.classList.add("none");
    seusQuizzesDesaparece.classList.add("none");
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
    let verificacao = true;
    if(validaTitulo.length < 20 || validaTitulo.length > 65 || validaTitulo=== "" || validaTitulo === null){
        alert("O título é inválido, deve conter de 20 a 65 caracteres");
        validaTitulo.value = "";
        verificacao = false
    }
    if(validaQtdePerguntas < 3 || validaQtdePerguntas === "" || validaQtdePerguntas === null){
        alert("Mínimo de perguntas é 3");
        validaQtdePerguntas.value = ""
        verificacao = false
    }
    if(validaQtdeNiveis < 2 || validaQtdeNiveis === "" || validaQtdeNiveis === null){
        alert("Precisa de um mínimo de 2 níveis")
        validaQtdePerguntas.value = ""
        verificacao = false
    }
    if(verificacao === true){
        quantidadeDePerguntas = validaQtdePerguntas;
        const prosseguirParaPerguntas = document.querySelector(".criacaoDasPerguntas");
        const passouPelosTestes = document.querySelector(".telaDeCriacaoDoQuizz")
        passouPelosTestes.classList.add("none");
        prosseguirParaPerguntas.classList.remove("none");
    }
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
        
        <button class="prosseguir" onclick="validaPergunta()">Prosseguir pra criar níveis</button>
        `
    }
}

function validaPergunta(){
    const validacaoDaPergunta = document.querySelectorAll(".pergunta")
    let tamanhoPergunta = validacaoDaPergunta[0].children[2].value
    let validaCor;
    let validar = true;

    for(i = 0; i < validacaoDaPergunta[0].children.length; i++){
        if(validacaoDaPergunta[0].children[i].classList.contains("corDeFundoDaPergunta") === true){
            validaCor = validacaoDaPergunta[0].children[i].value;
            if(validaCor[0] === '#' && validaCor.length <= 6){
                for(let j = 1; j < validaCor.length; j++ ){
                    if((validaCor[i] >= 'A' && validaCor[i] <= 'F') || (validaCor[i] >= 0 && validaCor[i] <= 9)){
                    }else{
                        validar = false;
                        alert("Código de cor inválido, tente com letras de A a F maiúsculas, números e iniciar com #")
                        break;
                    }
                }
            }else{
                validar = false;
                alert("Cores hexadecimais devem iniciar com # e ter até 6 caracteres")
            }
        }else if(typeof(validacaoDaPergunta[0].children[i].value) === 'string'){
             tamanhoPergunta = validacaoDaPergunta[0].children[i].value
             if(tamanhoPergunta.length < 20 ){
                 validar = false
                alert("Título deve ser superior a 20 caracteres");
            }
         }
     }

     validaResposta();
     validaRespostaIncorreta();

     function validaResposta(){
         const validaRespostaCorreta = document.querySelectorAll(".respostaCorreta");
         if(validaRespostaCorreta[0].children[1].value === null || validaRespostaCorreta[0].children[1].value === "" ){
             alert("Insira algo no campo de resposta")
         }
         if(validaRespostaCorreta[0].children[0]){
     
         }
         return true;
     }
     
     function validaRespostaIncorreta(){
         const validarRespostaIncorreta = document.querySelectorAll(".respostasIncorretas");
         if(validarRespostaIncorreta[0].children[1].value === null || validarRespostaIncorreta[0].children[1].value === ""){
             alert("Insira ao menos uma resposta incorreta");
         }
         return true;
     }

     if(validar === true && validaResposta() === true && validaRespostaIncorreta() === true){
        const continua = document.querySelector(".criacaoDasPerguntas");
        const niveisAparece = document.querySelector(".niveis");
        niveisAparece.classList.remove("none");
        continua.classList.add("none");
     }
}


function voltarPraHome(voltarHome){
    const voltar = voltarHome.parentElement;
    voltar.classList.add("none");

}
function validaNivel(){
    const validaTitulo = document.querySelector(".perguntaAberta")
    const validaAcerto = document.querySelector(".acertoNivel")
    const validaUrl = document.querySelector(".urlNivel")
    const validaDescricao = document.querySelector(".descricaoNivel")
    if(validaTitulo.length < 10 || validaTitulo=== "" || validaTitulo === null) {
        alert("O título é inválido, deve conter pelo menos 10 caracteres.");
}
    if(validaAcerto < 0 || validaAcerto > 100){
        alert("O valor deve estar entre 0 e 100")
    }
    if(validaUrl ){

    }
    if(validaDescricao.length < 30){
        alert("A descrição deve ter ao menos 30 caracteres")
    }
}

function apareceDadosNivel(botao){
    contadorPergunta++;
    const paiDoElemento = botao.parentElement;
    const avoDoElemento = paiDoElemento.parentElement;
    paiDoElemento.classList.add("none");
    if((contadorPergunta) < quantidadeDePerguntas){
    avoDoElemento.innerHTML += `
        <span class="estiloDaFonte">Nível ${contadorPergunta}</span>
        <input class="tituloNivel" type="text" placeholder="Título do nível">
        <input class="acertoNivel" type="text" placeholder="% de acerto mínima">
        <input class="urlNivel" type="url" placeholder="URL da imagem do nível">
        <input class="descricaoNivel" type="text" placeholder="Descrição do nível">
        `
    }
    else if(contadorPergunta===quantidadeDePerguntas){
            avoDoElemento.innerHTML += `    <span class="estiloDaFonte">Nível ${contadorPergunta}</span>
            <input class="tituloNivel" type="text" placeholder="Título do nível">
            <input class="acertoNivel" type="text" placeholder="% de acerto mínima">
            <input class="urlNivel" type="url" placeholder="URL da imagem do nível">
            <input class="descricaoNivel" type="text" placeholder="Descrição do nível">
            `
}
}

//Comportamento de respostas:
function selecionado(botao){
    let procuraOnclick = document.querySelectorAll(".imagemComTexto")
    for (let i = 0; i < procuraOnclick.length; i++) {
        procuraOnclick[i].removeAttribute('onclick')
        
    }
        
    opaco()
    botao.classList.remove("opaco")
    let procura = document.querySelector(".selecaoCerta")
    botao.classList.add("selecaoCerta")
    console.log(procura)
    if(procura !== null){
        procura.classList.remove("selecaoCerta")
    }
}
function opaco(){
    const classe = document.querySelectorAll(".imagemComTexto")
    for (let i = 0; i < classe.length; i++) {
        classe[i].classList.add("opaco")
        
    }
    
}

