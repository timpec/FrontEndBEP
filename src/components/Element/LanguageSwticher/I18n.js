import i18n from 'i18next';
import en from './en.json';
import fi from './fi.json';

i18n

    .init({
        fallbackLng: 'fi',
        interpolation: {
            escapeValue: false
        },

        react: {   
            wait: false,
            nsMode: 'default'
        },

        resources: {
            en: { translation: en },
            fi: { translation: fi }
        }
    }, err => {
        if (err) {
            console.error('Error loading translation files', err); // eslint-disable-line
            return;
        }
    })

export default i18n;
 
