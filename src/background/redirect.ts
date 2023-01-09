import { ORIGIN } from "../export/enums";

/**
 * Redirect given url to url that filters excluded works
 * @param url Url to redirect
 * @param value Excluded works settings
 * @returns Url to redirect to, or null if url shouldn't be redirected
 */
export function getRedirectURL(url: string, value: { [key: string]: any }): string | null {
    // If filtering is off, return null
    if(!value.filtering)
        return null;

    let parsed = parseURL(url);

    let type = parsed[1];

    let origin: ORIGIN;
    if(parsed[0] == 'tags')
        origin = ORIGIN.TAGS;
    else if(parsed[0] == 'users')
        origin = ORIGIN.USERS;
    else
        origin = ORIGIN.COLLECTIONS;

    let id = parsed[2];

    let rating: number[] = [];
    let warning: number[] = [];
    let category: number[] = [];
    let tag: string[] = [];
    let crossover = "";
    let complete = "";
    let wordCount: number[] = [];
    let date: string[] = [];
    let query = "";
    let language = "";

    // Get exclude data from local storage
    if(value.language != undefined && value.language.length > 0)
        language = value.language;
    if(value.query != undefined && value.query.length > 0)
        query = value.query;
    if(value.tags != undefined)
        tag = value.tags;
    if(value.warnings != undefined)
        warning = value.warnings;
    if(type == 'work') {
        if(value.crossover != undefined && value.crossover.length > 0)
            crossover = value.crossover;
        if(value.completion != undefined && value.completion.length > 0)
            complete = value.completion;
        if(value.wordCount != undefined) {
            if(value.wordCount[0].length > 0)
                wordCount[0] = parseInt(value.wordCount[0]);
            if(value.wordCount[1].length > 0)
                wordCount[1] = parseInt(value.wordCount[1]);
        }
        if(value.updateDate != undefined) {
            if(value.updateDate[0].length > 0)
                date[0] = value.updateDate[0];
            if(value.updateDate[1].length > 0)
                date[1] = value.updateDate[1];
        }
    }

    let redirectUrl = constructRedirectURLHelper(origin, type, id, rating, warning, category, tag, crossover, complete, wordCount, date, query, language);
    if(redirectUrl != null) {
        redirectUrl += parsed[3].length == 0 ? "" : "&" + parsed[3];
        return redirectUrl;
    }
    else
        return null;
}

// * Private functions
/**
 * Returns redirect URL to contain excluded tags, overriding the previous URL's history
 * @param origin Origin of document
 * @param type Type of works being shown ('work' or 'bookmark')
 * @param id ID of the url to redirect
 * @param excludeRatings ID of ratings to exclude
 * @param excludeWarnings ID of warnings to exclude
 * @param excludeCategories ID of categories to exclude
 * @param excludeTags Tags to exclude
 * @param crossoverBool Include, exclude, or exclusively show crossover works
 * @param completeBool Include, exclude, or exclusively show complete works
 * @param wordCountNums Limit works to given word count interval
 * @param dateArr Limit works to given date interval
 * @param query Query within results
 * @param languageId ID of language to limit works to
 * @returns URL to redirect to
 */
function constructRedirectURLHelper(origin: ORIGIN, type: string, id: string, excludeRatings: number[] = [], excludeWarnings: number[] = [], excludeCategories: number[] = [], excludeTags: string[] = [], crossoverBool: string = "", completeBool: string = "", wordCountNums: number[] = [], dateArr: string[] = [], query: string = "", languageId: string = ""): string | null {
    // Construct exclude url queries
    let ratings = "";
    excludeRatings?.forEach((r) =>
        ratings += `exclude_${type}_search[rating_ids][]=${r.valueOf()}&`
    );
    let archiveWarnings = "";
    excludeWarnings?.forEach((w) =>
        archiveWarnings += `exclude_${type}_search[archive_warning_ids][]=${w.valueOf()}&`
    );
    let categories = "";
    excludeCategories?.forEach((c) =>
        categories += `exclude_${type}_search[category_ids][]=${c.valueOf()}&`
    );

    let tags = `${type}_search[excluded_tag_names]=`;
    excludeTags?.forEach((t) =>
        tags += `${t.valueOf()},`
    );
    if(excludeTags.length > 0)
        tags = tags.substring(0, tags.length - 1) + "&";
    else
        tags = "";

    let crossover = "";
    if(crossoverBool != "") {
        crossover = `${type}_search[crossover]=${crossoverBool}&`;
    }
    let complete = "";
    if(completeBool != "") {
        complete = `${type}_search[complete]=${completeBool}&`;
    }
    let wordCount = "";
    if(wordCountNums.length > 0) {
        if(wordCountNums[0] != null)
            wordCount += `${type}_search[words_from]=${wordCountNums[0]}&`;
        if(wordCountNums[1] != null)
            wordCount += `${type}_search[words_to]=${wordCountNums[1]}&`;
    }
    let date = "";
    if(dateArr.length > 0) {
        if(dateArr[0] != null)
            date += `${type}_search[date_from]=${dateArr[0]}&`;
        if(dateArr[1] != null)
            date += `${type}_search[date_to]=${dateArr[1]}&`;
    }
    let searchWithinResults = query == "" ? "" : `${type}_search[${type == 'bookmark' ? 'bookmarkable_' : ""}query]=${query}&`;
    let language = languageId == "" ? "" : `${type}_search[language_id]=${languageId}&`;

    // Construct full url
    if(ratings.length == 0 && archiveWarnings.length == 0 && categories.length == 0 && tags.length == 0 && crossover.length == 0 && wordCount.length == 0 && date.length == 0 && searchWithinResults.length == 0 && language.length == 0)
        return null;

    let redirect = `${type}s?${ratings}${archiveWarnings}${categories}${tags}${crossover}${complete}${wordCount}${date}${searchWithinResults}${language}commit=Sort+and+Filter&${origin.valueOf()}${id}`;
    if(origin == ORIGIN.COLLECTIONS)
        redirect = `https://archiveofourown.org/collections/${id}/` + redirect;
    else
        redirect = `https://archiveofourown.org/` + redirect;

    return redirect;
}

/**
 * Parses an AO3 url and returns its origin, search type, and id.
 * @param baseURL URL to be parsed.
 * @returns origin:'tags', 'users', or 'collections'.
 * @returns searchType: 'work' or 'bookmark'.
 * @returns id: id of fandom (if origin='works'), id of user (if origin='bookmarks), or id of collection (if origin='collections').
 * @returns extraId: Extra ids in URLs, or empty string if no extra id. Returned as full id with definition (Ex: "fandom_id=1234123").
 */
function parseURL(baseURL: string): [origin: string, searchType: string, id: string, extraId: string] {
    let split = baseURL.split('/');
    let end = split[split.length - 1].split("?");
    if(split.length > 6) {
        if(split[5] == "pseuds" && split[4] != split[6])
            return [split[3], end[0].substring(0, end[0].length - 1), split[4], `pseud_id=${split[6]}` + (end.length > 1 ? `&${end[1]}` : "")];
        else if(split[3] == 'collections')
            return [split[3], end[0].substring(0, end[0].length - 1), split[4], `tag_id=${split[6]}` + (end.length > 1 ? `&${end[1]}` : "")];
    }

    return [split[3], end[0].substring(0, end[0].length - 1), split[split.length - 2], end.length > 1 ? end[1] : ""];
}