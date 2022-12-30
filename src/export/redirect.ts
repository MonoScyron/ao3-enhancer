const _constants = require("./constants");

/**
 * Returns redirect URL to contain excluded tags, overriding the previous URL's history
 * @param {ORIGIN} origin Origin of document
 * @param {TYPE} type Type of works being shown ('work' or 'bookmark')
 * @param {string} id ID of the url to redirect
 * @param excludeRatings Ratings to exclude
 * @param excludeWarnings Warnings to exclude
 * @param excludeCategories Categories to exclude
 * @param excludeTags Tags to exclude
 * @param crossoverBool Include, exclude, or exclusively show crossover works
 * @param completeBool Include, exclude, or exclusively show complete works
 * @param wordCountNums Limit works to given word count interval
 * @param dateArr Limit works to given date interval
 * @param query Query within results
 * @param languageId ID of language to limit works to
 * @returns URL to redirect to
 */
exports.getRedirectURL = function getRedirectURL(origin: typeof _constants.ORIGIN, type: typeof _constants.TYPE, id: string, excludeRatings: typeof _constants.RATING[] = null, excludeWarnings: typeof _constants.WARNING[] = null, excludeCategories: typeof _constants.CATEGORY[] = null, excludeTags: string[] = null, crossoverBool: boolean = null, completeBool: boolean = null, wordCountNums: number[] = null, dateArr: string[] = null, query: string = null, languageId: string = null): string {
    let typeVal = type.valueOf();

    // * Exclude
    let ratings = "";
    excludeRatings?.forEach((r) =>
        ratings += `exclude_${typeVal}_search[rating_ids][]=${r.valueOf()}&`
    );
    let archiveWarnings = "";
    excludeWarnings?.forEach((w) =>
        archiveWarnings += `exclude_${typeVal}_search[archive_warning_ids][]=${w.valueOf()}&`
    );
    let categories = "";
    excludeCategories?.forEach((c) =>
        categories += `exclude_${typeVal}_search[category_ids][]=${c.valueOf()}&`
    );

    let tags = `${typeVal}_search[excluded_tag_names]=`;
    excludeTags?.forEach((t) =>
        tags += `${t.valueOf()},`
    );
    if(excludeTags.length > 0)
        tags = tags.substring(0, tags.length - 1) + "&";
    else
        tags = "";

    let crossover = "";
    if(crossoverBool != null) {
        crossover = `${typeVal}_search[crossover]=${crossoverBool ? "T" : "F"}&`;
    }
    let complete = "";
    if(completeBool != null) {
        complete = `${typeVal}_search[complete]=${completeBool ? "T" : "F"}&`;
    }
    let wordCount = "";
    if(wordCountNums != null) {
        if(wordCountNums[0] != null)
            wordCount += `${typeVal}_search[words_from]=${wordCountNums[0]}&`;
        if(wordCountNums[1] != null)
            wordCount += `${typeVal}_search[words_to]=${wordCountNums[1]}&`;
    }
    let date = "";
    if(dateArr != null) {
        if(dateArr[0] != null)
            date += `${typeVal}_search[date_from]=${dateArr[0]}&`;
        if(dateArr[1] != null)
            date += `${typeVal}_search[date_to]=${dateArr[1]}&`;
    }
    let searchWithinResults = query == null ? "" : `${typeVal}_search[query]=${query}&`;
    let language = languageId == null ? "" : `${typeVal}_search[language_id]=${languageId}&`;

    let redirect = `https://archiveofourown.org/${typeVal}s?${ratings}${archiveWarnings}${categories}${tags}${crossover}${complete}${wordCount}${date}${searchWithinResults}${language}commit=Sort+and+Filter&`;

    // Redirect to a collection
    if(origin == _constants.ORIGIN.COLLECTIONS) {
        redirect += `collection_id=${id}`;
    }
    // Redirect to a user
    else if(origin == _constants.ORIGIN.USERS) {
        redirect += `user_id=${id}`;
    }
    // Redirect to works
    else {
        redirect += `tag_id=${id}`;
    }
    return redirect;
}

/**
 * Parses an AO3 url and returns its origin, search type, and id.
 * @param {string} baseURL URL to be parsed
 * @returns origin='works', 'bookmarks', or 'collections'
 * @returns searchType='work' or 'bookmark'
 * @returns id=id of fandom (if origin='works'), id of user (if origin='bookmarks), or id of collection (if origin='collections')
 */
exports.parseURL = function parseURL(baseURL: string): [origin: string, searchType: string, id: string] {
    let split = baseURL.split('/');
    return [split[3], split[5], split[4]];
}
