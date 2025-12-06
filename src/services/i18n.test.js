import i18n from './i18n.js';

// Mock the Locale variable
let Locale;

global.Locale = Locale;

// Test cases
const testDates = [
    new Date('2025-12-06T00:00:00Z'), // ISO format
    new Date('2025-06-15T00:00:00Z')  // Another sample date
];

const locales = ['en-US', 'es-MX'];

locales.forEach((locale) => {
    global.Locale = locale; // Set the locale
    console.log(`Testing locale: ${locale}`);

    testDates.forEach((date) => {
        const formattedDate = i18n.formatDate(date);
        console.log(`Date: ${date.toISOString()} => Formatted: ${formattedDate}`);
    });
});