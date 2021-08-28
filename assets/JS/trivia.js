//https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple
let mainForm = document.getElementById("triviaForm");
let container = document.getElementById("question-Section");

let questions = [];     //Array with question from API
let score = 0 ;         //Number of correct answers

let i=0;                //Number of iterations per Question

let correctAnswer;

//funciones
const createApiURL = e => {
    e.preventDefault()
    let category = document.getElementById("category").value;
    let difficulty = document.getElementById("difficulty").value;
    let amount = document.getElementById("amount").value;
    let type = document.getElementById("type").value;
    const API = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    fetchDataAPI(API);
};

//Call responsive between formulary
const fetchDataAPI = url => {
    fetch(url)
    .then(response => response.json())
    .then(result => fillQuestions(result.results))
    .catch(err => console.log(err));
    console.log (i);
};

const fillQuestions = questionsAPI => {
    questions = questionsAPI;
    console.log(questions);
    console.log(amount.value);
    console.log(i);
    showQuestion();
};

const showQuestion = () => {
   console.log(i);
    if(questions.length > 0){
        correctAnswer = questions[i].correct_answer;

        container.classList.add("question-Section");

        if(questions[i].incorrect_answers.length > 1) {
            container.innerHTML = 
            `
            <div>
                <p class="questionsFill">${questions[i].question}</div>
                <button onClick="viewAnswer(this)">${questions[i].correct_answer}</button>
                <button onClick="viewAnswer(this)">${questions[i].incorrect_answers[0]}</button>
                <button onClick="viewAnswer(this)">${questions[i].incorrect_answers[1]}</button>
                <button onClick="viewAnswer(this)">${questions[i].incorrect_answers[2]}</button>
                <button class="exitButton" onClick="exitView(this)">Exit</button>
            </div>
            `
        } else {
            container.innerHTML =
            `
            <div>
                <p class="questionsFill">${questions[i].question}</div>
                <button onClick="viewAnswer(this)">${questions[i].correct_answer}</button>
                <button onClick="viewAnswer(this)">${questions[i].incorrect_answers[0]}</button>
                <button class="exitButton" onClick="exitView(this)">Exit</button>
            </div>
            `
        }
    } else {

        alert("La cantidad de preguntas que elegiste es muy alto. Relaja tu cerebro y elige un número menor")
    }

};

const viewAnswer = button => {
    if(button.innerText === correctAnswer) {
        score++;
        console.log("Correcto");
    } else {
        console.log("Incorrecto");
    }

    if(questions.length - 1 !== i) {
        i++;
        showQuestion();
    } else {
        // container.classList.remove("question-Section");
        container.innerHTML = "";
        if(score > ((amount.value)/2)) {
            container.innerHTML = 
            `
            <div class="scorePantalla">
            <p class="scoreP">EXCELENTE CAMPEON!!!!!</P>
            <p class="scoreP">TU SCORE FUE DE:  </p>
            <p class="scoreP">${score}</p>
            <button onClick="exitView(this)">EXIT</button>
            </div>
            `
        } else {
            container.innerHTML = 
            `
            <div class="scorePantalla">
            <p class="scoreP">NO HAS PRACTICADO LO SUFIDICIENTE</P>
            <p class="scoreP">TU SCORE FUE DE:  </p>
            <p class="scoreP">${score}</p>
            <button onClick="exitView(this)">EXIT</button>
            </div>
            `
        }
        console.log(`Juego terminado.Tu Score fue de: ${score}`);
    }
}

const exitView = button => {
    container.classList.remove("question-Section")
    container.innerHTML = "";
    location.reload();
}


//Events
mainForm.onsubmit = createApiURL;