import { RATING, WARNING, CATEGORY } from './constants';

/**
 * Origin of page to redirect
 */
export enum ORIGIN {
    COLLECTIONS = 'collections',
    BOOKMARKS = 'bookmarks',
    WORKS = 'works'
}

/**
 * Returns redirect URL to contain excluded tags, overriding the previous URL's history
 * @param {Document} doc Document of page to redirect
 * @param {ORIGIN} origin Origin of document
 * @param {string} type Type of works being shown ('work' or 'bookmark')
 * @param {string} id Id of the url to redirect
 */
export function redirect(doc: Document, origin: ORIGIN, type: string, id: string, excludeRatings: RATING[] = null, excludeWarnings: WARNING[] = null, excludeCategories: CATEGORY[] = null, excludeTags: string[] = null, crossoverBool: boolean = null, completeBool: boolean = null, wordCountNums: number[] = null, dateArr: string[] = null, query: string = null, languageId: string = null): string {
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

    // Redirect to a collection
    // TODO: Finish this
    if(origin == ORIGIN.COLLECTIONS) {
    }
    // Redirect to a bookmark
    // TODO: Finish this
    else if(origin == ORIGIN.BOOKMARKS) {
    }
    // Redirect to works
    // TODO: Finish this
    else {

    }

    // TODO: Construct final redirect url
    return `https://archiveofourown.org/${origin.valueOf()}?`;
}