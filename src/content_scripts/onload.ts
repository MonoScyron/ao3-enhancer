import { CATEGORY, getRedirectURL, ORIGIN, parseURL, RATING, redirectURLsRegex, TYPE, WARNING } from "../export/redirect";
import { languageKey } from '../export/constants';

console.log(`AO3Extension: Extension loaded!`);

// Check to see if current url needs to be redirected
redirectURLsRegex.forEach((url: string) => {
    if(window.location.href.match(url)) {
        let parsed = parseURL(window.location.href);

        // ? parseURL function header sucks, use dictionary to make code legible?
        let type: TYPE;
        if(parsed[1] == 'works')
            type = TYPE.WORKS;
        else
            type = TYPE.BOOKMARKS;

        let origin: ORIGIN;
        if(parsed[0] == 'tags')
            origin = ORIGIN.TAGS;
        else if(parsed[0] == 'users')
            origin = ORIGIN.USERS;
        else
            origin = ORIGIN.COLLECTIONS;

        let id = parsed[2];

        // TODO: Get exclude data from local storage
        let rating: RATING[] = []; //[RATING.MATURE];
        let warning: WARNING[] = []; //[WARNING.MCD];
        let category: CATEGORY[] = []; // [CATEGORY.FM];
        let tag: string[] = []; //["Angst", "Smut"];
        let crossover = ""; //"T";
        let complete = ""; //"F";
        let wordCount: number[] = []; //[1000, 100000];
        let date: string[] = []; //["2021-10-2", "2022-12-23"];
        let query = ""; // "They all need hugs";

        browser.storage.local.get(languageKey).then((languageValue) => {
            let language = null;
            if(languageValue[0] == 'true')
                language = languageValue[1];
                
            // TODO: Redirect instead of logging url
            let temp = getRedirectURL(origin, type, id, rating, warning, category, tag, crossover, complete, wordCount, date, query, language);
            console.log(`AO3Extension: ${temp}`);
        });

    }
});