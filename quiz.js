const questions = [
    {
        question: "Um welchen Artikel handelt es sich wenn wir über Gleichheit sprechen?",
        answers: [
            { text: "Artikel 3", correct: true },
            { text: "Artikel 5", correct: false },
            { text: "Artikel 4", correct: false },
            { text: "Artikel 1", correct: false },
        ]
    },
    {
        question: "Welche Merkmale sind im Artikel 3 besonders geschützt?",
        answers: [
            { text: "Alter und Größe", correct: false },
            { text: "Geschlecht und Rasse", correct: true },
            { text: "Haarfarbe und Beruf", correct: false },
            { text: "Musikgeschmack und Wohnort", correct: false },
        ]
    },
    {
        question: "Welche Bedeutung haben die Begriffe 'Männer und Frauen' im Artikel 3",
        answers: [
            { text: "Keine Bedeutung", correct: false },
            { text: "Trennung von Mann und Frau", correct: false },
            { text: "Gleichstellung von Mann und Frau", correct: true },
            { text: "Benachteiligung von Mann und Frau", correct: false },
        ]
    },
    {
        question: "Was hat Freiheit mit Artikel 3 zu tun?",
        answers: [
            { text: "Trennung von Religion und Staat", correct: false },
            { text: "Jeder darf eine Meinung haben und diese vertreten", correct: true },
            { text: "Diskriminierung ist nicht so schlimm", correct: false },
            { text: "Männer und Frauen werden unterschiedlich behandelt", correct: false },
        ]
    },
    {
        question: "Worum geht der Artikel 3 grundsätzlich?",
        answers: [
            { text: "Gleichberechtigung", correct: true },
            { text: "Religion", correct: false },
            { text: "Politik", correct: false },
            { text: "Sexuelle Orientierung", correct: false },
        ]
    },
    {
        question: "Ist es richtig das man nicht wegen politischen oder religiösen Meinungen diskriminiert werden darf?",
        answers: [
            { text: "Nein", correct: false },
            { text: "Nein, das gilt nur für religiöse Meinungen", correct: false },
            { text: "Nein, das gilt nur für politische Meinungen", correct: false },
            { text: "Ja, Niemand darf diskriminiert werden, egal worum es geht", correct: true },
        ]
    },
    {
        question: "Was bedeutet Demokratie?",
        answers: [
            { text: "Es gibt keine Wahl, jeder bestimmt für sich", correct: false },
            { text: "Das Volk besitzt keinerlei politische Macht", correct: false },
            { text: "Demokratie ist eine Regierungsform die durch absolute Macht funktioniert", correct: false },
            { text: "Demokratie ist eine Regierung die politische Macht besitzt und durch Wahlen Vertreter bestimmt", correct: true },
        ]
    },
    {
        question: "In wie viele Absätze ist der Artikel 3 unterteilt?",
        answers: [
            { text: "4", correct: false },
            { text: "2", correct: false },
            { text: "3", correct: true },
            { text: "1", correct: false },
        ]
    },
    {
        question: "Was ist eine Regierungsform?",
        answers: [
            { text: "Eine Form wie der Staat organisiert wird", correct: true },
            { text: "Eine Regierungsform kann jeder aufstellen , diese erklärt nur den Handelsvorgang", correct: false },
            { text: "wie die politische Macht von Jugendlichen bestimmt wird", correct: false },
            { text: "Eine Regierungsform kann jeder aufstellen , dies sind einfach nur persönliche Ziele", correct: false },
        ]
    },
    {
        question: "Wie werden Vertreter im Volk bestimmt?",
        answers: [
            { text: "Durch Wahlen", correct: true },
            { text: "Durch Meinungen von 10% aus dem eigenen Land", correct: false },
            { text: "Garnicht, es gibt keine Vertreter", correct: false },
            { text: "In einer App", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

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
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

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

function showScore() {
    resetState();
    questionElement.innerHTML = `Du hattest ${score} von ${questions.length} richtig!`;
    nextButton.innerHTML = "Nochmal Versuchen";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
