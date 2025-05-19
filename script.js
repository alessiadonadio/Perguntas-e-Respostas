// Função para embaralhar um array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Troca os elementos
  }
}

const questions = [
  {
    question: "Qual é a capital do Brasil?",
    answers: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
    correct: 2
  },
  {
    question: "Qual é o maior planeta do sistema solar?",
    answers: ["Terra", "Marte", "Júpiter", "Saturno"],
    correct: 2
  },
  {
    question: "Quem escreveu 'Dom Casmurro'?",
    answers: ["Machado de Assis", "José de Alencar", "Clarice Lispector", "Monteiro Lobato"],
    correct: 0
  },
  {
    question: "Em que ano o homem pisou na Lua pela primeira vez?",
    answers: ["1965", "1969", "1972", "1959"],
    correct: 1
  },
  {
    question: "Quantos estados tem o Brasil?",
    answers: ["24", "26", "27", "25"],
    correct: 2
  },
  {
    question: "Qual das seguintes linguagens é considerada orientada a objetos?",
    answers: ["Java", "HTML", "CSS", "SQL"],
    correct: 0
  },
  {
    question: "Qual é o elemento químico com símbolo 'O'?",
    answers: ["Ouro", "Oxigênio", "Osmium", "Óxido"],
    correct: 1
  },
  {
    question: "Qual é a fórmula da água?",
    answers: ["CO2", "H2O", "NaCl", "H2SO4"],
    correct: 1
  },
  {
    question: "Qual animal é conhecido como 'rei da selva'?",
    answers: ["Tigre", "Leão", "Elefante", "Pantera"],
    correct: 1
  },
  {
    question: "Qual é o maior oceano do planeta?",
    answers: ["Atlântico", "Índico", "Ártico", "Pacífico"],
    correct: 3
  },
  {
    question: "Quem pintou a Mona Lisa?",
    answers: ["Leonardo da Vinci", "Michelangelo", "Van Gogh", "Picasso"],
    correct: 0
  },
  {
    question: "Qual linguagem é usada para estilizar páginas web?",
    answers: ["HTML", "CSS", "JavaScript", "Python"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("result").textContent = "";
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("feedback").textContent = "";
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").textContent = q.question;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  document.getElementById("feedback").textContent = "";

  // Cria uma cópia das alternativas para embaralhar
  const shuffledAnswers = [...q.answers];
  shuffleArray(shuffledAnswers);  // Embaralha as alternativas

  // Exibe as alternativas embaralhadas
  shuffledAnswers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(btn, index, shuffledAnswers);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(button, selected, shuffledAnswers) {
  const correctIndex = questions[currentQuestion].correct;
  const correctAnswer = questions[currentQuestion].answers[correctIndex];
  
  const buttons = document.querySelectorAll(".answers button");
  
  buttons.forEach(btn => btn.disabled = true); // Desativa todos os botões
  
  if (shuffledAnswers[selected] === correctAnswer) {
    button.classList.add("correct");
    document.getElementById("feedback").textContent = "✅ Resposta correta!";
    score++;
  } else {
    button.classList.add("wrong");
    const correctButton = Array.from(buttons).find(btn => btn.textContent === correctAnswer);
    correctButton.classList.add("correct");
    document.getElementById("feedback").textContent = "❌ Resposta errada!";
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  const total = questions.length;
  document.getElementById("question").textContent = "";
  document.getElementById("answers").innerHTML = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("result").textContent = `Você acertou ${score} de ${total} perguntas.`;
  document.getElementById("restartBtn").style.display = "inline-block";
}

startQuiz();
