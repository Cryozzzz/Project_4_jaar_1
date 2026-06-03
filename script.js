const questions = [
    {
        question: "wat is nepnieuws?",
        answers: [
            { text: "Nieuws dat altijd op televisie komt", correct: false },
            { text: "Nieuws dat bewust onjuiste of misleidende informatie bevat", correct: true },
            { text: "nieuws op televisie", correct: false },
            { text: "nieuws dat altijd waar is", correct: false },
        ]
    },
    {
        question: "Welke van deze dingen kan een risico van AI zijn?",
        answers: [
            { text: "Desinformatie verspreiden", correct: false },
            { text: "Deepfakes maken", correct: false },
            { text: "Privacyproblemen veroorzaken", correct: false },
            { text: "Alle bovenstaande antwoorden", correct: true },
        ]
    },
    {
        question: "Waarom maken mensen soms nepnieuws?",
        answers: [
            { text: "Om mensen te informeren", correct: false },
            { text: "Om geld te verdienen of mensen te beïnvloeden", correct: true },
            { text: "Omdat ze het leuk vinden", correct: false },
            { text: "Om mensen te pesten", correct: false },
        ]
    },
    {
        question: "Wat is een waarschuwingssignaal van nepnieuws?",
        answers: [
            { text: "Een betrouwbare bron wordt genoemd", correct: false },
            { text: "Een neutrale titel", correct: false },
            { text: "Een sensationele titel die sterke emoties oproept", correct: true },
            { text: "Meerdere bronnen bevestigen het nieuws", correct: false },
        ]
    },
    {
        question: "wat is gevaarlijk aan nepnieuws en AI?",
        answers: [
            { text: "het kan je dood maken", correct: false },
            { text: "mensen kunnen het geloven ", correct: true },
            { text: "Een sensationele titel die sterke emoties oproept", correct: false },
            { text: "het is echt", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer_Buttons");
const nextButton = document.getElementById("next_Btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
        question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${ questions.length}!`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
       startQuiz();
    }
});

startQuiz();
