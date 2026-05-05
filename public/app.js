const { useState, useEffect } = React;

function App() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [mode, setMode] = useState('menu'); // menu, learning, results

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await fetch('/data/parsed-tests.json');
      const data = await response.json();
      setTests(data);
      setLoading(false);
    } catch (error) {
      console.error('Błąd przy ładowaniu testów:', error);
      setLoading(false);
    }
  };

  const startTest = (testIndex) => {
    setSelectedTest(testIndex);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setMode('learning');
  };

  const nextQuestion = () => {
    if (currentQuestion < tests[selectedTest].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setMode('results');
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const resetTest = () => {
    setMode('menu');
    setSelectedTest(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingBox}>
          <h1>Ładowanie testów...</h1>
          <p>Proszę czekać</p>
        </div>
      </div>
    );
  }

  if (mode === 'menu') {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1>🚴 Nauka do egzaminu na kartę rowerową</h1>
          <p>Wybierz test do nauki</p>
        </div>
        
        <div style={styles.testsGrid}>
          {tests.map((test, index) => (
            <div
              key={index}
              style={styles.testCard}
              onClick={() => startTest(index)}
            >
              <h3>Test {test.testNumber}</h3>
              <p>25 pytań</p>
              <button style={styles.button}>Zacznij naukę</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'learning' && selectedTest !== null) {
    const test = tests[selectedTest];
    const question = test.questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correct;

    return (
      <div style={styles.container}>
        <div style={styles.learningHeader}>
          <h2>Test {test.testNumber}</h2>
          <p>Pytanie {currentQuestion + 1} z {test.questions.length}</p>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${((currentQuestion + 1) / test.questions.length) * 100}%`
              }}
            />
          </div>
        </div>

        <div style={styles.questionBox}>
          <h3 style={styles.questionText}>{question.question}</h3>
          
          {question.image && (
            <img 
              src={question.image} 
              alt="Pytanie" 
              style={styles.questionImage}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
          
          <div style={styles.choicesContainer}>
            {question.choices.map((choice, idx) => (
              <button
                key={idx}
                style={{
                  ...styles.choiceButton,
                  ...(selectedAnswer === choice ? styles.choiceButtonSelected : {}),
                  ...(showAnswer && choice === question.correct ? styles.choiceButtonCorrect : {}),
                  ...(showAnswer && selectedAnswer === choice && !isCorrect ? styles.choiceButtonWrong : {})
                }}
                onClick={() => {
                  if (!showAnswer) {
                    setSelectedAnswer(choice);
                    setShowAnswer(true);
                  }
                }}
              >
                {choice}
              </button>
            ))}
          </div>

          {showAnswer && (
            <div style={{
              ...styles.explanationBox,
              ...(isCorrect ? styles.explanationCorrect : styles.explanationWrong)
            }}>
              <p style={styles.explanationTitle}>
                {isCorrect ? '✓ Poprawnie!' : '✗ Błędnie'}
              </p>
              <p style={styles.explanationText}>{question.explanation}</p>
            </div>
          )}
          
          <div style={styles.navigationButtons}>
            <button
              style={{...styles.navButton, opacity: currentQuestion === 0 ? 0.5 : 1}}
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
            >
              ← Poprzednie
            </button>
            
            <button
              style={styles.navButton}
              onClick={nextQuestion}
            >
              {currentQuestion === test.questions.length - 1 ? 'Zakończ' : 'Następne →'}
            </button>
          </div>

          <button
            style={styles.backButton}
            onClick={resetTest}
          >
            Powrót do menu
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'results') {
    return (
      <div style={styles.container}>
        <div style={styles.resultsBox}>
          <h2>Koniec testu!</h2>
          <p>Przejrzałeś wszystkie pytania w tym teście.</p>
          <button
            style={styles.button}
            onClick={resetTest}
          >
            Powrót do menu
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  header: {
    textAlign: 'center',
    color: 'white',
    marginBottom: '40px',
    marginTop: '20px'
  },
  testsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  testCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)'
    }
  },
  button: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: '15px',
    transition: 'opacity 0.2s'
  },
  learningHeader: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    background: '#e0e0e0',
    borderRadius: '4px',
    marginTop: '15px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    transition: 'width 0.3s'
  },
  questionBox: {
    background: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px'
  },
  questionText: {
    fontSize: '20px',
    marginBottom: '30px',
    lineHeight: '1.6',
    color: '#333'
  },
  questionImage: {
    maxWidth: '100%',
    maxHeight: '300px',
    marginBottom: '30px',
    borderRadius: '8px',
    display: 'block',
    margin: '0 auto 30px'
  },
  choicesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '30px'
  },
  choiceButton: {
    background: '#f5f5f5',
    border: '2px solid #ddd',
    padding: '15px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    textAlign: 'left',
    transition: 'all 0.2s',
    fontWeight: '500'
  },
  choiceButtonSelected: {
    background: '#667eea',
    color: 'white',
    borderColor: '#667eea'
  },
  choiceButtonCorrect: {
    background: '#4caf50',
    color: 'white',
    borderColor: '#4caf50'
  },
  choiceButtonWrong: {
    background: '#f44336',
    color: 'white',
    borderColor: '#f44336'
  },
  explanationBox: {
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    borderLeft: '4px solid'
  },
  explanationCorrect: {
    background: '#e8f5e9',
    borderLeftColor: '#4caf50'
  },
  explanationWrong: {
    background: '#ffebee',
    borderLeftColor: '#f44336'
  },
  explanationTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333'
  },
  explanationText: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#555'
  },
  navigationButtons: {
    display: 'flex',
    gap: '15px',
    marginTop: '30px',
    justifyContent: 'center'
  },
  navButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'opacity 0.2s'
  },
  backButton: {
    background: '#f0f0f0',
    color: '#333',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '20px',
    transition: 'background 0.2s'
  },
  loadingBox: {
    background: 'white',
    borderRadius: '12px',
    padding: '40px',
    textAlign: 'center',
    marginTop: '100px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  resultsBox: {
    background: 'white',
    borderRadius: '12px',
    padding: '40px',
    textAlign: 'center',
    marginTop: '100px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
