function Questions(question, choices, answer) {
    this.question = question;
    this.answer = answer;
    this.choices = choices;
}

const questions = [
    new Questions("JavaScript supports", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Questions("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Questions("Which is not a JavaScript Framework?", ["Python Script", "JQuery", "Django", "NodeJS"], "Django"),
    new Questions("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Questions("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
    this.correctAns = [];
}

const quiz = new Quiz(questions);
Quiz.prototype.checkAnswer = function (answer) {
    quiz.score = quiz.questions[quiz.questionIndex].answer === answer ? quiz.score + 1 : quiz.score;
    quiz.correctAns[quiz.questionIndex] = quiz.questions[quiz.questionIndex].answer === answer || false;
}
Quiz.prototype.buttonClicked = function () {
    quiz.checkAnswer(this.innerText);
    if (quiz.questionIndex + 1 === quiz.questions.length) {
        quiz.showTotal();
    } else {
        quiz.questionIndex++;
        quiz.loadQuestion();
    }
}
Quiz.prototype.showTotal = function () {
    const question = document.getElementById("question");
    const progress = document.getElementById("progress");
    const buttons = document.getElementsByClassName("buttons")[0];
    question.innerHTML = `<h2>Total Score is ${quiz.score * 100 / 5} </h2><h3>Total correct answers are ${quiz.score}`;
    buttons.style.display = "none";
    progress.style.display = "none";

    quiz.indication();
}
Quiz.prototype.indication = function () {
    const goal = document.getElementById("goal");
    let goalInnerHtml = "";
    for (let i = 0; i < quiz.questions.length; i++) {
        const ck = (x) => x === true ? 'correct' :  x === false ? 'wrong' : 'na'
        goalInnerHtml += `<span class=${ck(quiz.correctAns[i])}></span>`;
    }
    goal.innerHTML = goalInnerHtml;
}
Quiz.prototype.loadQuestion = function () {
    const question = document.getElementById("question");
    const progress = document.getElementById("progress");
    progress.innerText = `Question ${quiz.questionIndex + 1} of ${quiz.questions.length}`
    question.innerText = quiz.questions[quiz.questionIndex].question;
    for (let i = 0; i < quiz.questions[quiz.questionIndex].choices.length; i++) {
        const choice = document.getElementById("choice" + i);
        const button = document.getElementById("btn" + i);
        choice.innerText = quiz.questions[quiz.questionIndex].choices[i];
        button.addEventListener("click", quiz.buttonClicked);
    }
    quiz.indication();
}

quiz.loadQuestion();