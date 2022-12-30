const _redirect = require("../export/redirect");

console.log(`AO3Extension: Extension loaded!`);

_redirect.redirectURLsRegex.forEach((url: string) => {
    if(window.location.href.match(url)) {
        let parsed = _redirect.parseURL(window.location.href);

        let type = parsed[1];
        type = type.substring(0, type.length - 1);

        // TODO: REMOVE THIS
        let rating = [_constants.RATING.MATURE];
        let warning = [_constants.WARNING.MCD];
        let category = [_constants.CATEGORY.FM];
        let tag = ["Angst", "Smut"];
        let crossover = true;
        let complete = false;
        let wordCount = [1000, 100000];
        let date = ["2021-10-2", "2022-12-23"];
        let query = "They all need hugs";
        let language = "en";

        let temp = _redirect.getRedirectURL(_constants.ORIGIN[parsed[0]], _constants.TYPE[type], parsed[2], rating, warning, category, tag, crossover, complete, wordCount, date, query, language);
        console.log(`AO3Extension: ${temp}`);
    }
});