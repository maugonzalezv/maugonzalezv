// scripts/updateQuote.js

const fs = require('fs');
const path = require('path');

// 1. Leer todas las citas desde quotes.json
const quotes = JSON.parse(fs.readFileSync(path.join(__dirname, '../quotes.json')));
// 2. Elegir una cita al azar
const randomIndex = Math.floor(Math.random() * quotes.length);
const { quote, author } = quotes[randomIndex];

// 3. Leer el contenido actual de README.md
const readmePath = path.join(__dirname, '../README.md');
let readmeContent = fs.readFileSync(readmePath, 'utf8');

// 4. Patrón para detectar el bloque de la cita en el README
const quoteRegex = /(## 📝 Random Dev Quote\n\n> _“)(.*?)(”_.*\n> <sub>— )(.*?)(<\/sub>)/s;

// 5. Construir el nuevo bloque de cita con las comillas adecuadas
const newQuoteBlock = `## 📝 Random Dev Quote

> _“${quote}”_  
> <sub>— ${author}</sub>`;

// 6. Reemplazar el bloque existente en README.md
readmeContent = readmeContent.replace(quoteRegex, newQuoteBlock);

// 7. Escribir el README.md con la cita actualizada
fs.writeFileSync(readmePath, readmeContent);
