let quantidadeDePerguntas = 0;
let quantidadeDeNiveis = 0;
let contadorNivel = 1;
let tituloQuizz;
let imgQuizz;

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
        <div id="${quizzes[i].id}" class="imagemComTexto" onclick="quizzSelecionado(${quizzes[i].id})">
        <img src="${quizzes[i].image}"  alt="">
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
    const validaUrlImagemQuizz = document.querySelector(".urlImagemQuizz");
    const validaQtdePerguntas = document.querySelector(".qtdePerguntasQuizz").value
    const validaQtdeNiveis = document.querySelector(".qtdeNiveisQuizz").value
    let verificacao = true;
    tituloQuizz = validaTitulo;
    imgQuizz = validaUrlImagemQuizz.value

    const url = validaUrlImagemQuizz.value
    if(validaTitulo.length < 20 || validaTitulo.length > 65 || validaTitulo=== "" || validaTitulo === null){
        alert("O título é inválido, deve conter de 20 a 65 caracteres");
        verificacao = false
    }
   
    try {
         new URL(url);
    } catch (_) {
        verificacao = false;
    }

    if(validaQtdePerguntas < 3 || validaQtdePerguntas === "" || validaQtdePerguntas === null){
        alert("Mínimo de perguntas é 3");
        validaQtdePerguntas.value = ""
        verificacao = false
    }
    if(validaQtdeNiveis < 2 || validaQtdeNiveis === "" || validaQtdeNiveis === null){
        alert("Precisa de um mínimo de 2 níveis")
        validaQtdeNiveis.value = ""
        verificacao = false
    }
    if(verificacao === true){
        quantidadeDePerguntas = validaQtdePerguntas;
        quantidadeDeNiveis = validaQtdeNiveis;
        const prosseguirParaPerguntas = document.querySelector(".criacaoDasPerguntas");
        const passouPelosTestes = document.querySelector(".telaDeCriacaoDoQuizz")
        passouPelosTestes.classList.add("none");
        prosseguirParaPerguntas.classList.remove("none");
        preencherAparece();
    }else{
        alert("verifique os dados e tente novamente");
    }
}

function preencherAparece(){
    const avoDoElemento = document.querySelector(".criacaoDasPerguntas");
    avoDoElemento.classList.remove("none");
    for(let i = 1; i <= quantidadeDePerguntas; i++ ){
        avoDoElemento.innerHTML += `
        <div class="pergunta flexColumn">
            <span class="estiloDaFonte">Pergunta ${i}</span>
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
        `
        if(i === parseInt(quantidadeDePerguntas)){
            avoDoElemento.innerHTML += `        
            <button class="prosseguir" onclick="validaPergunta()">Prosseguir pra criar níveis</button>
            `
        }
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
        for(let i = 0; i < validaRespostaCorreta[0].children.length; i++){
            if(validaRespostaCorreta[0].children[i].classList.contains("inputRespostaCorreta")){
                if(validaRespostaCorreta[0].children[i].value === null || validaRespostaCorreta[0].children[i].value === "" ){
                    alert("Insira algo no campo de resposta")
                }
            }
            if(validaRespostaCorreta[0].children[i].classList.contains("urlRespostaCorreta")){
             let url = validaRespostaCorreta[0].children[i].value;
                try {
                  new URL(url);
                } catch (_) {
                  return false;  
                }
                return true;
            }
        }
    }
     
     function validaRespostaIncorreta(){
        const validarRespostaIncorreta = document.querySelectorAll(".respostasIncorretas");
        console.log(validarRespostaIncorreta)
        for(let i = 0; i < validarRespostaIncorreta[0].children.length; i++){
            if(validarRespostaIncorreta[0].children[i].classList.contains("respostaIncorreta")){
                if(validarRespostaIncorreta[0].children[i].value === null || validarRespostaIncorreta[0].children[i].value === "" ){
                    alert("Insira algo no campo de resposta")
                }
            }
            if(validarRespostaIncorreta[0].children[i].classList.contains("url")){
             let url = validarRespostaIncorreta[0].children[i].value;
                try {
                  new URL(url);
                } catch (_) {
                  return false;  
                }
                return true;
            }
        }
     }

     if(validar === true && validaResposta() === true && validaRespostaIncorreta() === true){
        const continua = document.querySelector(".criacaoDasPerguntas");
        const niveisAparece = document.querySelector(".niveis");
        niveisAparece.classList.remove("none");
        continua.classList.add("none");
        apareceDadosNivel()
     }else{
         alert("Verifique todos os campos e tente novamente")
     }
}


function voltarPraHome(voltarHome){
    const voltar = voltarHome.parentElement;
    const home = document.querySelector(".seusQuizzes")
    const continuacaoHome = document.querySelector(".quizzes")
    home.classList.remove("none");
    continuacaoHome.classList.remove("none")
    voltar.classList.add("none");
    
}

function validaNivel(){
    const validaTitulo = document.querySelectorAll(".tituloNivel")
    const validaAcerto = document.querySelectorAll(".acertoNivel")
    const validaUrl = document.querySelectorAll(".urlNivel")
    const validaDescricao = document.querySelectorAll(".descricaoNivel")
    let verificacao = true;

    console.log(validaTitulo);
    console.log(validaAcerto);
    console.log(validaUrl);
    console.log(validaDescricao);

    for(let i = 0; i < validaTitulo.length; i++){
        if(validaTitulo[i].length < 10 ) {
            alert("O título é inválido, deve conter pelo menos 10 caracteres.");
            verificacao = false
        }
    }

    for(let k = 0; k < validaAcerto.length; k++){
        if(validaAcerto[k].value < 0 || validaAcerto[k].value > 100  ) {
            alert("O valor deve estar entre 0 e 100")
            verificacao = false;
        }
    }

    for(let m = 0; m < validaUrl.length; m++){
        try {
            new URL(validaUrl[m].value);
        } catch (_) {
           verificacao = false;
        }
    }

    for(let n = 0; n < validaDescricao.length; n++){
        if(validaDescricao[n].length < 30){
            alert("A descrição deve ter ao menos 30 caracteres")
            verificacao = false;
        } 
    }


    if(verificacao === true){
        const avancar = document.querySelector(".niveis")
        const sucessoDoQuizz = document.querySelector(".telaDeSucessoCriacaoQuizz")
        avancar.classList.add("none");
        sucessoDoQuizz.classList.remove("none");
        const respostaCorreta = document.querySelector(".inputRespostaCorreta").value
        const imgRespostaCorreta = document.querySelector(".urlRepostaCorreta").value
        let quizz;
        quizz = {
            title: tituloQuizz,
            image: imgQuizz,
        }
    }else{
        alert("verifique os dados e tente novamente")
    }
}


function apareceDadosNivel(){
    const avoDoElemento = document.querySelector(".niveis"); 
    for (let i = 1; i <= quantidadeDeNiveis ; i++){         
    avoDoElemento.innerHTML +=`       
    <div class="perguntaAberta flexColumn">
        <span class="estiloDaFonte">Nível ${i}</span>
        <input class="tituloNivel" type="text" placeholder="Título do nível">
        <input class="acertoNivel" type="text" placeholder="% de acerto mínima">
        <input class="urlNivel" type="url" placeholder="URL da imagem do nível">
        <input class="descricaoNivel" type="text" placeholder="Descrição do nível">
    </div>`
        if(i === 1){
            let sempreZero = document.querySelector(".tituloNivel").value
            sempreZero = 0;
        } 
      }     
      avoDoElemento.innerHTML +=
      `<button class="prosseguir" onclick="validaNivel()">Finalizar Quizz</button>`     

}

function preencherArrayDeObjetos(){
    let questions;
    const todosOsTextosDaPergunta = document.querySelectorAll(".textoDaPergunta")
    const todasAsCoresDasPerguntas = document.querySelectorAll(".corDeFundoDaPergunta")
    const todasAsRespostasCorretas = document.querySelectorAll(".inputRespostaCorreta")
    const todasAsImagensCorretas = document.querySelectorAll(".urlRespostaCorreta")
    const todasAsRespostasIncorretas = document.querySelectorAll(".respostaIncorreta")
    const todasAsImagensIncorretas = document.querySelectorAll(".url")

    for(let i = 0; i < quantidadeDePerguntas; i++){
        questions = {
            title: todosOsTextosDaPergunta[i].value,
            color: todasAsCoresDasPerguntas[i].value,
        }
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

function quizzSelecionado(id){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/" + id)
    promessa.then(listarQuizzSelecionado)
}
function listarQuizzSelecionado(dadosQuizz){    
   const quizz = dadosQuizz.data;
   const titulo = quizz.title
   const imagem = quizz.image
   const niveis = quizz.levels
   const perguntas = quizz.questions
   let addQuizz = document.querySelector(".quizzEscolhido")
   let addTitulo = document.querySelector(".imagemTitulo")
   let addPerguntas = document.querySelector(".boxPerguntas")
   let addResultado = document.querySelector(".boxResultado")

   console.log(perguntas)
   addQuizz.innerHTML = `
   <div class="imagemTitulo">            
       <span>${titulo}</span>
   </div>
/*      <div class="perguntasQuizz">
           <div class="boxPerguntas">
               <div class="tituloPergunta">${perguntas[0].title}</div>
               <div class="boxImagem">
                   <div class="imagemEDescricao">
                       <img src="${perguntas[0].answers[0].image}" alt="">
                       <span>${perguntas[0].answers[0].text}</span>
                   </div>
                   <div class="imagemEDescricao">
                       <img src="${perguntas[0].answers[0].image}" alt="">
                       <span>${perguntas[0].answers[0].text}</span>
                   </div>
                   <div class="imagemEDescricao">
                       <img src="${perguntas[0].answers[0].image}" alt="">
                       <span>${perguntas[0].answers[0].text}</span>
                   </div>
                   <div class="imagemEDescricao">
                       <img src="${perguntas[0].answers[0].image}" alt="">
                       <span>${perguntas[0].answers[0].text}</span>
                   </div>
               </div>
           </div>
           <div class="boxResultado">
               <div class="acerto">88% de acerto: Você é praticamente um aluno de Hogwarts!</div>    
               <div class="imagemEDescricaoFinal">
                   <img src="https://pbs.twimg.com/profile_images/693185418997698560/6GJjHCU7_400x400.jpg" alt="">
                   <span>Parabéns Potterhead! Bem-vindx a Hogwarts, aproveite o loop infinito de comida e clique no botão abaixo para usar o vira-tempo e reiniciar este teste.</span>
               </div>
           </div>
           <button class="criarPergunta">Reiniciar Quizz</button>
           <span class="home" onclick="voltarPraHome(this)">Voltar pra home</span>
       </div> */
   
   `
   document.querySelector(".imagemTitulo").style.backgroundImage = `url(${imagem})`;


}