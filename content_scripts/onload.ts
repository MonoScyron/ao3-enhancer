import { ORIGIN, RATING, redirectURLsRegex, TYPE, WARNING, CATEGORY } from '../export/constants';
import { parseURL, getRedirectURL } from "../export/redirect";

console.log(`AO3Extension: Extension loaded!`);

redirectURLsRegex.forEach((url) => {
    if(window.location.href.match(url)) {
        let parsed = parseURL(window.location.href);

        let type = parsed[1];
        type = type.substring(0, type.length - 1);

        // TODO: REMOVE THIS
        let rating = [RATING.MATURE];
        let warning = [WARNING.MCD];
        let category = [CATEGORY.FM];
        let tag = ["Angst", "Smut"];
        let crossover = true;
        let complete = false;
        let wordCount = [1000, 100000];
        let date = ["2021-10-2", "2022-12-23"];
        let query = "They all need hugs";
        let language = "en";

        let temp = getRedirectURL(ORIGIN[parsed[0]], TYPE[type], parsed[2], rating, warning, category, tag, crossover, complete, wordCount, date, query, language);
        console.log(`AO3Extension: ${temp}`);
    }
});