// We are keeping the state of the quiz
var quizStarted = false
var quizDiv = document.getElementById('quizCore')
var isLocal = false

function injectStartButton() {
    quizDiv.innerHTML = `
        <a id='startButton' class='button is-large'>Start</a>
    `
    document.getElementById('startButton').addEventListener('click', startQuizSelection)
}

function startQuizSelection(){
    quizStarted = true
    
    // Récupération de la list des quiz disponibles
    fetch('http://127.0.0.1:8887/data/quizList.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        // Construction de l'html de la list des quiz et injection dans la page
        let quizList = ''
        json.list.forEach(element => {
            quizList += `
                    <a class='button is-large quizList' data-file='${element.file}'>${element.name}</a>
                `
            });
            
            // On inject l'html de la list des boutons dans la page
            quizDiv.innerHTML = quizList

            // On crée des eventListener pour gérer le click sur un des boutons
            let quizButtons = document.getElementsByClassName('quizList')
            for(let i = 0; i < quizButtons.length; ++i){
                quizButtons[i].addEventListener('click', function(){startQuiz(this.dataset.file)})
            }
    });
}

function startQuiz(file){
    fetch(`http://127.0.0.1:8887/data/${file}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json);
    });
}


if(!quizStarted) {
    injectStartButton()
}