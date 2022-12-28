import { RATING, WARNING, CATEGORY, ORIGIN } from '../background/constants';

/**
 * Returns redirect URL to contain excluded tags, overriding the previous URL's history
 * @param {ORIGIN} origin Origin of document
 * @param {string} type Type of works being shown ('work' or 'bookmark')
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
export function getRedirectURL(origin: ORIGIN, type: string, id: string, excludeRatings: RATING[] = null, excludeWarnings: WARNING[] = null, excludeCategories: CATEGORY[] = null, excludeTags: string[] = null, crossoverBool: boolean = null, completeBool: boolean = null, wordCountNums: number[] = null, dateArr: string[] = null, query: string = null, languageId: string = null): string {
    // * Exclude
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
    let tags = "";
    excludeTags?.forEach((t) =>
        tags += `${type}_search[excluded_tag_names]=${t.valueOf()}&`
    );
    let crossover = "";
    if(crossoverBool != null) {
        crossover = `${type}_search[crossover]=${crossoverBool ? "T" : "F"}&`;
    }
    let complete = "";
    if(completeBool != null) {
        complete = `${type}_search[complete]=${completeBool ? "T" : "F"}&`;
    }
    let wordCount = "";
    if(wordCountNums != null) {
        if(wordCountNums[0] != null)
            wordCount += `${type}_search[words_from]=${wordCountNums[0]}&`;
        if(wordCountNums[1] != null)
            wordCount += `${type}_search[words_to]=${wordCountNums[1]}&`;
    }
    let date = "";
    if(dateArr != null) {
        if(dateArr[0] != null)
            date += `${type}_search[date_from]=${dateArr[0]}&`;
        if(dateArr[1] != null)
            date += `${type}_search[date_to]=${dateArr[1]}&`;
    }
    let searchWithinResults = query == null ? "" : `${type}_search[query]=${query}&`;
    let language = languageId == null ? "" : `${type}_search[language_id]=${languageId}&`;

    let redirect = `https://archiveofourown.org/${origin.valueOf()}?${ratings}${archiveWarnings}${categories}${tags}${crossover}${complete}${wordCount}${date}${searchWithinResults}${language}commit=Sort+and+Filter&`;

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