// Tymczasowe dane przykładowe do testowania aplikacji
const sampleTests = [
  {
    testNumber: 1,
    questions: [
      {
        id: 1,
        question: "1: Na tym skrzyżowaniu, rowerzysta:",
        image: "../skrzy/row4.jpg",
        choices: [
          "ustępuje pierwszeństwa pojazdowi nr 3",
          "musi ustąpić pierwszeństwa pojazdowi nr 2",
          "jedzie pierwszy, bo jedzie prosto"
        ],
        correct: "musi ustąpić pierwszeństwa pojazdowi nr 2",
        explanation: "Tam, gdzie drogi są tak samo ważne (równorzędne), obowiązuje zasada prawej strony - rowerzysta ma po swojej prawej stronie samochód nr 2, więc musi go przepuścić."
      },
      {
        id: 2,
        question: "2: Omijanie:",
        image: "../syt/omi4.jpg",
        choices: [
          "jest zabronione na drogach rowerowych",
          "to przejeżdżanie obok nieporuszającego się pojazdu, uczestnika ruchu lub przeszkody"
        ],
        correct: "to przejeżdżanie obok nieporuszającego się pojazdu, uczestnika ruchu lub przeszkody",
        explanation: "Omijanie to przejeżdżanie obok nieporuszającego się pojazdu, uczestnika ruchu lub przeszkody."
      }
    ]
  },
  {
    testNumber: 2,
    questions: [
      {
        id: 1,
        question: "1: Na takiej elektrycznej deskorolce, nie wolno jeździć:",
        image: "../syt/testy25/uto_desk_elektr.jpg",
        choices: [
          "w strefie zamieszkania",
          "po chodniku",
          "po wyznaczonym na jezdni pasie ruchu dla rowerów"
        ],
        correct: "po wyznaczonym na jezdni pasie ruchu dla rowerów",
        explanation: "Na elektrycznej deskorolce należy jeździć po drodze dla rowerów. Można jeździć po chodniku lub drodze dla pieszych tylko wtedy, gdy brakuje wydzielonej drogi dla rowerów."
      },
      {
        id: 2,
        question: "2: Wyprzedzanie jest dozwolone na:",
        image: "../syt/wyprz4.jpg",
        choices: [
          "skrzyżowaniu dróg równorzędnych",
          "przejściu dla pieszych o ruchu kierowanym"
        ],
        correct: "skrzyżowaniu dróg równorzędnych",
        explanation: "Wyprzedzanie jest dozwolone na skrzyżowaniu dróg równorzędnych."
      }
    ]
  }
];

const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public/data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(
  path.join(outputDir, 'parsed-tests.json'),
  JSON.stringify(sampleTests, null, 2)
);

console.log('✓ Utworzono dane przykładowe');
