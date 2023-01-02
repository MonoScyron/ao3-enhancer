import { getRedirectURL, parseURL, } from "../export/redirect";
import { _default_values, _kudosHitRatio, _language, _query, redirectURLsRegex, RATING, TYPE, WARNING, CATEGORY, ORIGIN } from "../export/constants";
import { addKudosToHitRatios } from '../export/crawler';

// * Executed code start
console.log(`AO3Extension: Extension loaded!`);

checkDefaultStorage();

redirectURLsRegex.forEach((url: string) => {
    if(window.location.href.match(url))
        redirect();
});
addKudosToHitRatios(document);
// * Executed code end

/**
 * If no settings values are in storage, set default setting values in storage
 */
function checkDefaultStorage() {
    browser.storage.local.get([_kudosHitRatio, _language, _query]).then((value) => {
        if(Object.keys(value).length == 0) {
            browser.storage.local.set(_default_values);
        }
    });
}

/**
 * Redirect current url to url that filters excluded works
 */
function redirect() {
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

    browser.storage.local.get([_language, _query]).then((value) => {
        // Get exclude data from local storage
        if(value.language != undefined && value.language[0])
            language = value.language[1];
        if(value.query != undefined && value.query[0])
            query = value.query[1];

        let url = getRedirectURL(origin, type, id, rating, warning, category, tag, crossover, complete, wordCount, date, query, language);
        if(url != null) {
            url += parsed[3].length == 0 ? "" : "&" + parsed[3];
            // console.log(`AO3Extension: ${url}`); // DEBUGGING
            window.location.replace(url);
        }
    });
}