import { CATEGORY, getRedirectURL, ORIGIN, parseURL, RATING, redirectURLsRegex, TYPE, WARNING } from "../export/redirect";
import { _language } from "../export/constants";
import { addKudosToHitRatios } from '../export/crawler';

console.log(`AO3Extension: Extension loaded!`);

// Check to see if current url needs to be redirected
checkRedirect();
addKudosToHitRatios(document);

function checkRedirect() {
    redirectURLsRegex.forEach((url: string) => {
        if(window.location.href.match(url)) {
            let parsed = parseURL(window.location.href);

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

            let rating: RATING[] = [];
            let warning: WARNING[] = [];
            let category: CATEGORY[] = [];
            let tag: string[] = [];
            let crossover = "";
            let complete = "";
            let wordCount: number[] = [];
            let date: string[] = [];
            let query = "";
            let language = "";

            browser.storage.local.get([_language]).then((value) => {
                // Get exclude data from local storage
                if(value.language != undefined && value.language[0])
                    language = value.language[1];

                let url = getRedirectURL(origin, type, id, rating, warning, category, tag, crossover, complete, wordCount, date, query, language);
                if(url != null) {
                    url += parsed[3].length == 0 ? "" : "&" + parsed[3];
                    // console.log(`AO3Extension: ${url}`); // DEBUGGING
                    window.location.replace(url);
                }
            });
        }
    });
}