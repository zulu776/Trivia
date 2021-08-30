//https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple
let mainForm = document.getElementById("triviaForm");
let container = document.getElementById("question-Section");

let questions = [];     //Array with question from API
let score = 0 ;         //Number of correct answers

let ans = [];           //Array of answer.
let i=0;                //Number of iterations per Question
let inc = 0;            //Count Incorrect answers
let q = 1;              //Number of questions
let r = 0;

let correctAnswer;

//
const createApiURL = e => {
    e.preventDefault()
    let category = document.getElementById("category").value;
    let difficulty = document.getElementById("difficulty").value;
    let amount = document.getElementById("amount").value;
    let type = document.getElementById("type").value;
    const API = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    fetchDataAPI(API);
};

//Call response to formulary
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
    console.log(questions[i].category)
    
};

const showQuestion = () => {
    
    if(questions.length > 0){
        correctAnswer = questions[i].correct_answer;
        randomAnswer();

        container.classList.add("question-Section");
        
        if(questions[i].incorrect_answers.length > 1) {
            container.innerHTML = 
            `
            <div class="questionsDiv">
                <div id="myProgress">
                    <div id="myBar">0%</div>
                </div>
                <p class="questionsFill">${questions[i].question}</p>
                <div class="buttonDiv">
                    <button class="buttonsAnswer" onClick="viewAnswer(this)">${ans[0]}</button>
                    <button class="buttonsAnswer" onClick="viewAnswer(this)">${ans[1]}</button>
                    <button class="buttonsAnswer" onClick="viewAnswer(this)">${ans[2]}</button>
                    <button class="buttonsAnswer" onClick="viewAnswer(this)">${ans[3]}</button>
                </div> 
                <button class="exitButton" onClick="exitView(this)">Exit</button>
            </div>
            <div class="numeroPreguntas">
            <div class="infoAnswer">
                <p class="infoClass"> Correct Answers: ${score} </p>
                <p class="infoClass"> Incorrect Answers: ${inc} </p>
            </div>
            <p class="infoClass"> Question: ${q} / ${questions.length} </p>
            </div>
            `
         
        } else {
            container.innerHTML =
            `
            <div class="questionsDiv">
                <div id="myProgress">
                    <div id="myBar">0%</div>
                </div>
                <p class="questionsFill">${questions[i].question}</p>
                <div class="buttonDiv">
                    <button class="buttonsAnswer" onClick="viewAnswer(this)">${ans[0]}</button>
                    <button class="buttonsAnswer" onClick="viewAnswer(this)">${ans[1]}</button>
                </div>
                <button class="exitButton" onClick="exitView(this)">Exit</button>
            </div>
            <div class="numeroPreguntas">
                <div class="infoAnswer">
                    <p class="infoClass"> Correct Answers:     ${score} </p>
                    <p class="infoClass"> Incorrect Answers:     ${inc} </p>
                </div>
                <p class="infoClass"> Question: ${q} / ${questions.length} </p>
            </div>
            `
        }
        count();
    } else {

        alert("La cantidad de preguntas que elegiste es muy alto. Relaja tu cerebro y elige un número menor");
        location.reload();
    }

};

const viewAnswer = button => {
    if(button.innerText === correctAnswer) {
        score++;
        console.log("Correcto");
    } else {
        inc++;
        console.log("Incorrecto");
    }

    if(questions.length - 1 !== i) {
        i++;
        q = i+1;
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

const randomAnswer = () => {
    ans = [];
    if(questions[i].incorrect_answers.length > 1){
        ans.push(questions[i].correct_answer);
        ans.push(questions[i].incorrect_answers[0]);
        ans.push(questions[i].incorrect_answers[1]);
        ans.push(questions[i].incorrect_answers[2]);
        ans.sort(function() { return Math.random()-0.5});
        console.log(ans);
    } else {
        ans.push(questions[i].correct_answer);
        ans.push(questions[i].incorrect_answers[0]);
        ans.sort(function() { return Math.random()-0.5});
        console.log(ans);
    }
}

const exitView = button => {
    container.classList.remove("question-Section")
    container.innerHTML = "";
    location.reload();
}

const count = () => {
    if (r == 0) {
        r = 1;
        var elem = document.getElementById("myBar");
        var width = 0;
        
        var id = setInterval(frame, 200);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                r = 0;
                if(questions.length - 1 !== i) {
                    i++;
                    q = i+1;
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
            } else {
                width++;           
                elem.style.width = width + "%";
                elem.innerHTML = (width/5)  + "s";
            }
        }
    }
}

//Events
mainForm.onsubmit = createApiURL;