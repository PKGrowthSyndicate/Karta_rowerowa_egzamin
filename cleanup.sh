#!/bin/bash

# Skrypt do czyszczenia danych tymczasowych

echo "Czyszczenie danych tymczasowych..."

# Usuń surowe dane z scrapera
rm -f public/data/all-tests.json
rm -f public/data/tests-sample.json
rm -f public/data/tests.json

echo "✓ Usunięto tymczasowe pliki"
echo "✓ Zachowano: public/data/parsed-tests.json"
echo ""
echo "Rozmiar aplikacji:"
du -sh .
