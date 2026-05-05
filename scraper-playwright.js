const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TESTS_COUNT = 30;
const BASE_URL = 'https://brd.edu.pl/brd2/testy_nauka';

async function scrapeTest(browser, testNumber) {
  const url = `${BASE_URL}/${testNumber}n.html`;
  console.log(`Pobieranie testu ${testNumber}...`);
  
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Czekaj na załadowanie zawartości w divie frame
    await page.waitForSelector('#frame', { timeout: 10000 }).catch(() => null);
    
    // Daj chwilę na załadowanie
    await page.waitForTimeout(2000);
    
    // Pobierz zawartość
    const content = await page.evaluate(() => {
      const frameDiv = document.getElementById('frame');
      if (frameDiv) {
        return frameDiv.innerHTML;
      }
      return document.body.innerHTML;
    });
    
    // Spróbuj wyciągnąć pytania z HTML
    const $ = require('cheerio').load(content);
    const questions = [];
    
    // Szukaj pytań w różnych strukturach
    $('div, p, tr, td').each((i, el) => {
      const text = $(el).text().trim();
      if (text.length > 20 && text.length < 500) {
        questions.push(text);
      }
    });
    
    return {
      testNumber,
      url,
      htmlContent: content,
      extractedCount: questions.length,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Błąd przy pobieraniu testu ${testNumber}:`, error.message);
    return {
      testNumber,
      url,
      error: error.message
    };
  } finally {
    await page.close();
  }
}

async function main() {
  const browser = await chromium.launch();
  const allTests = [];
  
  for (let i = 1; i <= TESTS_COUNT; i++) {
    const testData = await scrapeTest(browser, i);
    allTests.push(testData);
    
    // Czekaj między żądaniami
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  await browser.close();
  
  // Zapisz dane
  const outputDir = path.join(__dirname, 'public', 'data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(outputDir, 'tests.json'),
    JSON.stringify(allTests, null, 2)
  );
  
  console.log(`\n✓ Pobrano ${TESTS_COUNT} testów`);
  console.log(`✓ Dane zapisane w: ${path.join(outputDir, 'tests.json')}`);
}

main().catch(console.error);
