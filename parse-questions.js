const fs = require('fs');
const path = require('path');

// Wczytaj dane z tests-sample.json
const sampleData = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'public/data/tests-sample.json'),
  'utf8'
));

const parsedTests = [];

sampleData.forEach(test => {
  if (test.scriptContent) {
    try {
      // Wyciągnij zmienną quiz z JavaScript
      const quizStart = test.scriptContent.indexOf('var quiz = [');
      const quizEnd = test.scriptContent.indexOf('];', quizStart) + 2;
      
      if (quizStart !== -1 && quizEnd > quizStart) {
        let quizStr = test.scriptContent.substring(quizStart + 11, quizEnd - 2);
        
        // Zamień znaki nowych linii i spacje na pojedyncze spacje
        quizStr = quizStr.replace(/\s+/g, ' ');
        
        // Zamień : na : (jeśli są spacje)
        quizStr = quizStr.replace(/"\s*:\s*/g, '":');
        
        // Dodaj nawiasy
        quizStr = '[' + quizStr + ']';
        
        try {
          const questions = JSON.parse(quizStr);
          
          parsedTests.push({
            testNumber: test.testNumber,
            questions: questions.map((q, idx) => ({
              id: idx + 1,
              question: q.question,
              image: q.image,
              choices: q.choices,
              correct: q.correct,
              explanation: q.explanation
            }))
          });
          
          console.log(`✓ Test ${test.testNumber}: ${questions.length} pytań`);
        } catch (e) {
          console.error(`✗ Test ${test.testNumber}: Błąd parsowania JSON - ${e.message}`);
        }
      }
    } catch (error) {
      console.error(`✗ Test ${test.testNumber}: ${error.message}`);
    }
  }
});

// Zapisz sparsowane pytania
const outputPath = path.join(__dirname, 'public/data/parsed-tests.json');
fs.writeFileSync(outputPath, JSON.stringify(parsedTests, null, 2));

console.log(`\n✓ Zapisano ${parsedTests.length} testów w: ${outputPath}`);
