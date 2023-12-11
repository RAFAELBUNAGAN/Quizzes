const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: 'Berlin', correct: false },
      { text: 'Madrid', correct: false },
      { text: 'Paris', correct: true },
      { text: 'Rome', correct: false },
    ]
  },
  {
    question: "What is the capital of Philippines?",
    answers: [
      { text: 'Manila', correct: true },
      { text: 'Madrid', correct: false },
      { text: 'Makati', correct: false },
      { text: 'Malabon', correct: false },
    ]
  },
  {
    question: "What is the capital of India?",
    answers: [
      { text: 'Jakarta', correct: false },
      { text: 'Manila', correct: false },
      { text: 'New Dehli', correct: true },
      { text: 'Rome', correct: false },
    ]
  },
  {
    question: "What is the capital of Japan?",
    answers: [
      { text: 'Tokyo', correct: true },
      { text: 'Seoul', correct: false },
      { text: 'Paris', correct: false },
      { text: 'Taipei', correct: false },
    ]
  },
  {
    question: "What is the capital of Turkey?",
    answers: [
      { text: 'Tokyo', correct: false },
      { text: 'Ankara', correct: true },
      { text: 'Paris', correct: false },
      { text: 'Taipei', correct: false },
    ]
  },
  {
    question: "What is the capital of Korea?",
    answers: [
      { text: 'Tokyo', correct: false },
      { text: 'Seoul', correct: true },
      { text: 'Paris', correct: false },
      { text: 'Taipei', correct: false },
    ]
  },
  {
    question: "What is the capital of Taiwan?",
    answers: [
      { text: 'Tokyo', correct: false },
      { text: 'Seoul', correct: false },
      { text: 'Paris', correct: false },
      { text: 'Taipei', correct: true },
    ]
  },
  {
    question: "What is the capital of Tailand?",
    answers: [
      { text: 'Bangkok', correct: true },
      { text: 'Seoul', correct: false },
      { text: 'Dili', correct: false },
      { text: 'Taipei', correct: false },
    ]
  },
  {
    question: "What is the capital of Timor-Leste?",
    answers: [
      { text: 'Bangkok', correct: false },
      { text: 'Seoul', correct: false },
      { text: 'Dili', correct: true },
      { text: 'Taipei', correct: false },
    ]
  },
  {
    question: "What is the capital of Laos?",
    answers: [
      { text: 'Bangkok', correct: false },
      { text: 'Kuala Lumpur', correct: false },
      { text: 'Beirut', correct: false },
      { text: 'Vientiane', correct: true },
    ]
  },
];
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answers-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
currentQuestionIndex = 0;
score = 0;
nextButton.InnerHTML= 'Next';
showQuestion();
}
function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button= document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
});
}

function resetState() {
  nextButton.innerHTML = 'Next';
  nextButton.style.display = 'none';

  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if(isCorrect){
    selectedBtn.classList.add('correct');
    score++;
  }else{
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === 'true'){
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = 'Play Again';
  nextButton.style.display = 'block';
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }
  else{
    showScore();
  }
}

nextButton.addEventListener('click', () => {
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }
  else{
    startQuiz();
  }
});

startQuiz();