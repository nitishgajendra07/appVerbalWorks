var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getUserArray } from "./commonFunctions.js";
// import { main , updateScore, } from "./quizTemplate.js";
let curPage = document.title;
console.log(curPage);
window.addEventListener("load", (e) => {
    e.preventDefault();
    console.log("Entered appAptitude");
    main();
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let questions = yield fetchQuestions();
        console.log(questions);
        let answers = yield fetchAnswers();
        console.log(answers);
        const distributedArray = distributeNumbers();
        console.log(distributedArray);
        const quesOpContainer = document.querySelector(".quesOpContainer");
        console.log("quesOpContainer", quesOpContainer);
        const answersEntered = [];
        let currentQuestionIndex = 0;
        displayNextQuestion();
        function displayNextQuestion() {
            quesOpContainer.innerHTML = "";
            const currentQuestionId = distributedArray[currentQuestionIndex];
            const currentQuestion = questions.find(q => q.id === currentQuestionId);
            if (currentQuestion) {
                createQuestion(currentQuestion, quesOpContainer);
            }
            else {
                console.log("All questions displayed");
                validate(answersEntered);
            }
        }
        function validate(answersEntered) {
            let score = 0;
            for (let i = 0; i < answersEntered.length; i++) {
                let j = 0;
                for (; j < 10; j++) {
                    if (answersEntered[i].id === answers[j].q_id) {
                        if (answersEntered[i].optionChosen === answers[j].ans) {
                            score += 1;
                        }
                        break;
                    }
                }
            }
            let scoreDisp = document.createElement("p");
            scoreDisp.textContent = `Score : ${score}`;
            let retakeButton = document.createElement("button");
            retakeButton.textContent = "Retake";
            if (retakeButton) {
                retakeButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    main();
                });
            }
            let endTestButton = document.createElement("button");
            endTestButton.textContent = "End Test";
            endTestButton.addEventListener("click", (e) => {
                e.preventDefault();
                updateScore(score);
            });
            quesOpContainer.appendChild(scoreDisp);
            quesOpContainer.appendChild(retakeButton);
            quesOpContainer.appendChild(endTestButton);
            console.log("Score= ", score);
        }
        function distributeNumbers() {
            const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            for (let i = numbers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
            }
            return numbers;
        }
        function createQuestion(question, quesOpContainer) {
            console.log(question);
            console.log(quesOpContainer);
            const quesOp = document.createElement("div");
            const questionElem = document.createElement("p");
            questionElem.textContent = currentQuestionIndex + 1 + ". " + question.question;
            questionElem.classList.add("question");
            quesOp.appendChild(questionElem);
            const options = [question.option1, question.option2, question.option3, question.option4];
            options.forEach((option) => {
                const optionBtn = document.createElement("button");
                optionBtn.textContent = option;
                optionBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    answersEntered.push({ id: question.id, optionChosen: option });
                    console.log("answersEntered", answersEntered);
                    currentQuestionIndex++;
                    displayNextQuestion();
                });
                quesOp.appendChild(optionBtn);
            });
            console.log("quesOp = ", quesOp);
            quesOpContainer.appendChild(quesOp);
            console.log("question added");
            console.log("quesOpContainer = ", quesOpContainer);
        }
    });
}
export function fetchQuestions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("../verbalQuestions.json");
            if (!response.ok) {
                throw new Error("Failed to fetch questions");
            }
            return yield response.json();
        }
        catch (error) {
            console.error("Error fetching questions:", error);
            return [];
        }
    });
}
export function fetchAnswers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("../verbalAnswers.json");
            if (!response.ok) {
                throw new Error("Failed to fetch answers");
            }
            return yield response.json();
        }
        catch (error) {
            console.error("Error fetching answers:", error);
            return [];
        }
    });
}
function updateScore(curScore) {
    let dataParsed = getUserArray();
    let isUnique = checkIfLoggedInIsUnique();
    if (isUnique === false) {
        window.location.href = "index.html";
    }
    else if (isUnique == true) {
        let validUser = false;
        for (let i = 0; i < dataParsed.length; i++) {
            if (dataParsed[i].isLoggedIn === true) {
                validUser = true;
                dataParsed[i].scores.verbalScore.push(curScore);
                localStorage.setItem("userData", JSON.stringify(dataParsed));
                break;
            }
        }
        if (validUser == false) {
            alert("You need to login again");
            window.location.href = "index.html";
        }
    }
}
function checkIfLoggedInIsUnique() {
    let dataParsed = getUserArray();
    let count = 0;
    for (let i = 0; i < dataParsed.length; i++) {
        if (dataParsed[i].isLoggedIn === true) {
            count++;
        }
    }
    if (count !== 1) {
        alert("More than one users have logged in");
        return true;
    }
    else {
        return true;
    }
    // localStorage.setItem("userData",JSON.stringify(dataParsed))
    // console.log("after resetting l=isLoggedIn",dataParsed);
}
