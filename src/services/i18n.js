import { locale, updateLocale } from '../app.js';

var stringsJSON = {};

const i18n = {

    //load resource json based on locale
    loadStringsJSON: async (newLocale) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`./content/${newLocale}/strings.json`, options)
            stringsJSON = await response.json();
        } catch (err) {
            console.log('Error getting strings', err);
            if (newLocale != "en-US") {
                updateLocale("en-US");
            }
        }
    },

    //load resource json based on locale
    getString: (view, key) => {
        return stringsJSON[view][key];
    },

    //determine the proper currency format based on locale and return html string
    formatCurrency: (price, color) => {
        let formatted;
        let converted = convertCurrency(price);
        formatted = new Intl.NumberFormat(locale, { style: 'currency', currency: currencyMap[locale] }).format(converted); //$NON-NLS-L$ 
        //return the formatted currency within template literal
        return `<h4>${formatted}</h4>`


    },
    //return the locale based link to html file within the 'static' folder
    getHTML: () => {
        return `${locale}/terms.html`; //$NON-NLS-L$ 
    },

    // format date according to locale
    formatDate: (date) => {
        let useLocale = currentLocal || Locale || 'en-US';

        // If the language is set to MX, use es-MX date format
        if (useLocale.toLowerCase() === 'ES') {
            useLocale = 'es-MX';
        }

        // Customize date format options based on locale
        let options;
        // Correct the locale check for Mexican Spanish
        if (useLocale.toLowerCase() === 'es-mx') {
            options = {
                weekday: 'short',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }; // Example: viernes, 5 de diciembre de 2025
        } else if (useLocale.toLowerCase() === 'en-us') {
            options = {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }; // Example: Fri, Dec 5, 2025
        } else {
            options = {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }; // Default format
        }

        return new Intl.DateTimeFormat(useLocale, options).format(date);
    },

}

//used to determine the correct currency symbol
var currencyMap = {
    'en-US': 'USD',
    'zh-CN': 'CNY',
    'es-MX': 'MXN',
    'nl-NL': 'EUR'
};

//function to perform rough conversion from galactic credits to real currencies
//Disabled for project
var convertCurrency = (price) => {
    return price;
}

export default i18n;