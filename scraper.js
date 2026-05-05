const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const TESTS_COUNT = 30;
const BASE_URL = 'https://brd.edu.pl/brd2/testy_nauka';

async function scrapeTest(testNumber) {
  const url = `${BASE_URL}/${testNumber}n.html`;
  console.log(`Pobieranie testu ${testNumber}...`);
  
  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    
    // Pobierz wszystkie pytania - szukaj w różnych strukturach
    const questions = [];
    
    // Szukaj pytań w divach, paragrafach i innych elementach
    const allText = $('body').html() || '';
    
    // Jeśli strona zawiera JavaScript, spróbuj wyciągnąć dane z komentarzy lub skryptów
    const scripts = $('script').text();
    
    return {
      testNumber,
      url,
      htmlContent: allText.substring(0, 5000), // Pierwsze 5KB do analizy
      scriptContent: scripts.substring(0, 2000),
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Błąd przy pobieraniu testu ${testNumber}:`, error.message);
    return {
      testNumber,
      url,
      error: error.message
    };
  }
}

async function main() {
  const allTests = [];
  
  for (let i = 1; i <= 3; i++) { // Zacznij od 3 testów do analizy
    const testData = await scrapeTest(i);
    allTests.push(testData);
    
    // Czekaj między żądaniami
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Zapisz dane
  const outputDir = path.join(__dirname, 'public', 'data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(outputDir, 'tests-sample.json'),
    JSON.stringify(allTests, null, 2)
  );
  
  console.log(`\n✓ Pobrano próbkę testów`);
  console.log(`✓ Dane zapisane w: ${path.join(outputDir, 'tests-sample.json')}`);
  console.log('\nZawartość pierwszego testu (do analizy):');
  console.log(allTests[0]);
}

main().catch(console.error);
