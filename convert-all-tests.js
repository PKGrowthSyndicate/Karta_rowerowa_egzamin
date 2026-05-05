const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'public', 'data');

// Spróbuj wczytać all-tests.json
const allTestsPath = path.join(dataDir, 'all-tests.json');

if (!fs.existsSync(allTestsPath)) {
  console.error('Plik all-tests.json nie istnieje. Uruchom najpierw scraper-final.js');
  process.exit(1);
}

const allTests = JSON.parse(fs.readFileSync(allTestsPath, 'utf8'));

const convertedTests = [];

allTests.forEach(test => {
  if (test.success && test.questions && Array.isArray(test.questions)) {
    const converted = {
      testNumber: test.testNumber,
      questions: test.questions.map((q, idx) => ({
        id: idx + 1,
        question: q.question || '',
        image: q.image || '',
        choices: q.choices || [],
        correct: q.correct || '',
        explanation: q.explanation || ''
      }))
    };
    
    convertedTests.push(converted);
    console.log(`✓ Test ${test.testNumber}: ${test.questions.length} pytań`);
  } else {
    console.log(`✗ Test ${test.testNumber}: Nie udało się pobrać pytań`);
  }
});

// Zapisz skonwertowane testy
const outputPath = path.join(dataDir, 'parsed-tests.json');
fs.writeFileSync(outputPath, JSON.stringify(convertedTests, null, 2));

console.log(`\n✓ Skonwertowano ${convertedTests.length} testów`);
console.log(`✓ Dane zapisane w: ${outputPath}`);
