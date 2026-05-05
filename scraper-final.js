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
    await page.waitForTimeout(1000);
    
    // Pobierz pytania bezpośrednio z JavaScript
    const questions = await page.evaluate(() => {
      // Spróbuj dostać się do zmiennej quiz z okna
      if (typeof window.quiz !== 'undefined') {
        return window.quiz;
      }
      return null;
    });
    
    if (questions && Array.isArray(questions) && questions.length > 0) {
      return {
        testNumber,
        url,
        questions: questions,
        success: true
      };
    }
    
    // Jeśli quiz nie jest dostępny, pobierz HTML
    const htmlContent = await page.evaluate(() => {
      const frameDiv = document.getElementById('frame');
      if (frameDiv) {
        return frameDiv.innerHTML;
      }
      return document.body.innerHTML;
    });
    
    return {
      testNumber,
      url,
      htmlContent: htmlContent.substring(0, 10000),
      success: false
    };
  } catch (error) {
    console.error(`Błąd przy pobieraniu testu ${testNumber}:`, error.message);
    return {
      testNumber,
      url,
      error: error.message,
      success: false
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
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  await browser.close();
  
  // Zapisz dane
  const outputDir = path.join(__dirname, 'public', 'data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(outputDir, 'all-tests.json'),
    JSON.stringify(allTests, null, 2)
  );
  
  const successCount = allTests.filter(t => t.success).length;
  console.log(`\n✓ Pobrano ${TESTS_COUNT} testów`);
  console.log(`✓ Sukces: ${successCount}/${TESTS_COUNT}`);
  console.log(`✓ Dane zapisane w: ${path.join(outputDir, 'all-tests.json')}`);
}

main().catch(console.error);
