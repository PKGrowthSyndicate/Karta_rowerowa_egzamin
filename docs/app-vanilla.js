let tests = [];
let currentMode = 'menu'; // menu, learning
let selectedTestIndex = null;
let currentQuestionIndex = 0;
let selectedAnswer = null;
let showAnswer = false;

const app = document.getElementById('app');

async function loadTests() {
  try {
    const response = await fetch('/data/parsed-tests.json');
    tests = await response.json();
    renderMenu();
  } catch (error) {
    console.error('Błąd przy ładowaniu testów:', error);
    app.innerHTML = '<div class="loading-box"><h1>Błąd!</h1><p>Nie udało się załadować testów</p></div>';
  }
}

function renderMenu() {
  currentMode = 'menu';
  let html = `
    <div class="header">
      <h1>🚴 Nauka do egzaminu na kartę rowerową</h1>
      <p>Wybierz test do nauki</p>
    </div>
    <div class="tests-grid">
  `;
  
  tests.forEach((test, index) => {
    html += `
      <div class="test-card" onclick="startTest(${index})">
        <h3>Test ${test.testNumber}</h3>
        <p>25 pytań</p>
        <button class="button">Zacznij naukę</button>
      </div>
    `;
  });
  
  html += '</div>';
  app.innerHTML = html;
}

function startTest(testIndex) {
  selectedTestIndex = testIndex;
  currentQuestionIndex = 0;
  selectedAnswer = null;
  showAnswer = false;
  renderQuestion();
}

function renderQuestion() {
  currentMode = 'learning';
  const test = tests[selectedTestIndex];
  const question = test.questions[currentQuestionIndex];
  const totalQuestions = test.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  let html = `
    <div class="learning-header">
      <h2>Test ${test.testNumber}</h2>
      <p>Pytanie ${currentQuestionIndex + 1} z ${totalQuestions}</p>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${progress}%"></div>
      </div>
    </div>

    <div class="question-box">
      <h3 class="question-text">${question.question}</h3>
  `;
  
  if (question.image) {
    // Konwertuj ścieżkę względną na pełny URL
    let imageUrl = question.image;
    if (imageUrl.startsWith('../')) {
      imageUrl = 'https://brd.edu.pl/brd2/testy_nauka/' + imageUrl;
    }
    html += `<img src="${imageUrl}" alt="Pytanie" class="question-image" onerror="this.style.display='none'">`;
  }
  
  html += '<div class="choices-container">';
  
  question.choices.forEach((choice, idx) => {
    let classes = 'choice-button';
    
    if (showAnswer) {
      if (choice === question.correct) {
        classes += ' correct';
      } else if (selectedAnswer === choice && selectedAnswer !== question.correct) {
        classes += ' wrong';
      }
    } else if (selectedAnswer === choice) {
      classes += ' selected';
    }
    
    const disabled = showAnswer ? 'disabled' : '';
    html += `<button class="${classes}" onclick="selectAnswer('${choice.replace(/'/g, "\\'")}', '${question.correct.replace(/'/g, "\\'")}', ${idx})" ${disabled}>${choice}</button>`;
  });
  
  html += '</div>';
  
  if (showAnswer) {
    const isCorrect = selectedAnswer === question.correct;
    const explanationClass = isCorrect ? 'explanation-correct' : 'explanation-wrong';
    const title = isCorrect ? '✓ Poprawnie!' : '✗ Błędnie';
    
    html += `
      <div class="explanation-box ${explanationClass}">
        <p class="explanation-title">${title}</p>
        <p class="explanation-text">${question.explanation}</p>
      </div>
    `;
  }
  
  html += '<div class="navigation-buttons">';
  
  if (currentQuestionIndex > 0) {
    html += `<button class="nav-button" onclick="previousQuestion()">← Poprzednie</button>`;
  } else {
    html += `<button class="nav-button" disabled>← Poprzednie</button>`;
  }
  
  if (currentQuestionIndex < totalQuestions - 1) {
    html += `<button class="nav-button" onclick="nextQuestion()">Następne →</button>`;
  } else {
    html += `<button class="nav-button" onclick="nextQuestion()">Zakończ</button>`;
  }
  
  html += '</div>';
  html += '<button class="back-button" onclick="backToMenu()">Powrót do menu</button>';
  html += '</div>';
  
  app.innerHTML = html;
}

function selectAnswer(choice, correct, idx) {
  if (!showAnswer) {
    selectedAnswer = choice;
    showAnswer = true;
    renderQuestion();
  }
}

function nextQuestion() {
  const test = tests[selectedTestIndex];
  if (currentQuestionIndex < test.questions.length - 1) {
    currentQuestionIndex++;
    selectedAnswer = null;
    showAnswer = false;
    renderQuestion();
  } else {
    backToMenu();
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    selectedAnswer = null;
    showAnswer = false;
    renderQuestion();
  }
}

function backToMenu() {
  selectedTestIndex = null;
  currentQuestionIndex = 0;
  selectedAnswer = null;
  showAnswer = false;
  renderMenu();
}

// Załaduj testy przy starcie
loadTests();
