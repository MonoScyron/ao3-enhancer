import { RATING, redirectURLsRegex, WARNING } from "./constants";
import { ORIGIN, redirect } from './redirect';

console.log(`AO3Extension: Extension loaded!`);

redirectURLsRegex.forEach((url) => {
    if(window.location.href.match(url)) {
        let parsed = parseURL(window.location.href);

        let type = parsed[1];
        type = type.substring(0, type.length - 1);

        // TODO: REMOVE THIS
        let rating = [RATING.MATURE];
        let language = "en";

        redirect(document, ORIGIN[parsed[0]], type, parsed[2], rating, null, null, null, null, null, null, null, null, language);
    }
});

/**
 * Parses an AO3 url and returns its origin, search type, and id.
 * @param {string} baseURL URL to be parsed
 * @returns origin='works', 'bookmarks', or 'collections'
 * @returns searchType='work' or 'bookmark'
 * @returns id=id of fandom (if origin='works'), id of user (if origin='bookmarks), or id of collection (if origin='collections')
 */
function parseURL(baseURL: string): [origin: string, searchType: string, id: string] {
    let split = baseURL.split('/');
    return [split[3], split[5], split[4]];
}
