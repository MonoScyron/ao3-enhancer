import { ORIGIN, TYPE, RATING, WARNING, CATEGORY } from "./constants";

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
export function getRedirectURL(origin: ORIGIN, type: TYPE, id: string, excludeRatings: RATING[] = [], excludeWarnings: WARNING[] = [], excludeCategories: CATEGORY[] = [], excludeTags: string[] = [], crossoverBool: string = "", completeBool: string = "", wordCountNums: number[] = [], dateArr: string[] = [], query: string = "", languageId: string = ""): string | null {
    let typeVal = type.valueOf();

    // Construct exclude url queries
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
    if(crossoverBool != "") {
        crossover = `${typeVal}_search[crossover]=${crossoverBool}&`;
    }
    let complete = "";
    if(completeBool != "") {
        complete = `${typeVal}_search[complete]=${completeBool}&`;
    }
    let wordCount = "";
    if(wordCountNums.length > 0) {
        if(wordCountNums[0] != null)
            wordCount += `${typeVal}_search[words_from]=${wordCountNums[0]}&`;
        if(wordCountNums[1] != null)
            wordCount += `${typeVal}_search[words_to]=${wordCountNums[1]}&`;
    }
    let date = "";
    if(dateArr.length > 0) {
        if(dateArr[0] != null)
            date += `${typeVal}_search[date_from]=${dateArr[0]}&`;
        if(dateArr[1] != null)
            date += `${typeVal}_search[date_to]=${dateArr[1]}&`;
    }
    let searchWithinResults = query == "" ? "" : `${typeVal}_search[query]=${query}&`;
    let language = languageId == "" ? "" : `${typeVal}_search[language_id]=${languageId}&`;

    // Construct full url
    if(ratings.length == 0 && archiveWarnings.length == 0 && categories.length == 0 && tags.length == 0 && crossover.length == 0 && wordCount.length == 0 && date.length == 0 && searchWithinResults.length == 0 && language.length == 0)
        return null;
    let redirect = `https://archiveofourown.org/${typeVal}s?${ratings}${archiveWarnings}${categories}${tags}${crossover}${complete}${wordCount}${date}${searchWithinResults}${language}commit=Sort+and+Filter&`;

    // Redirect to a collection
    if(origin == ORIGIN.COLLECTIONS) {
        redirect += `collection_id=${id}`;
    }
    // Redirect to a user
    else if(origin == ORIGIN.USERS) {
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
 * @param {string} baseURL URL to be parsed.
 * @returns origin:'tags', 'users', or 'collections.'
 * @returns searchType: 'works' or 'bookmarks.'
 * @returns id: id of fandom (if origin='works'), id of user (if origin='bookmarks), or id of collection (if origin='collections').
 * @returns extraId: Extra ids in URLs, or empty string if no extra id. Returned as full id with definition (Ex: "fandom_id=1234123").
 */
export function parseURL(baseURL: string): [origin: string, searchType: string, id: string, extraId: string] {
    let split = baseURL.split('/');
    let end = split[split.length - 1].split("?");
    return [split[3], end[0], split[split.length - 2], end.length > 1 ? end[1] : ""];
}