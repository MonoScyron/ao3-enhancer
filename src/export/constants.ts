// Storage keys
export const STORAGE_KEYS = [
    "kudosHitRatio", "filtering", "language", "query", "tags", "warnings"
];

// Default values
export const DEFAULT_VALUES = {
    kudosHitRatio: true,
    filtering: false,
    language: [false, ""],
    query: [false, ""],
    tags: [],
    warnings: []
}

// Settings changed message
export const SETTINGS_CHANGED = "settings_changed";

/** Redirect these URLs to filter works with excluded stuff */
export const REDIRECT_URLS = [
    `https://archiveofourown.org/tags/*/works`, // Works in a tag
    `https://archiveofourown.org/tags/*/bookmarks`, // Bookmarks in a tag

    `https://archiveofourown.org/users/*/works*`, // User's works
    `https://archiveofourown.org/users/*/bookmarks*`, // User's bookmarks

    `https://archiveofourown.org/collections/*/works`, // Collection's works
    `https://archiveofourown.org/collections/*/bookmarks`// Collection's bookmarks
];

/** Cannot redirect these URLs, need to hide works with excluded stuff */
export const HIDE_URLS = [
    `https:\/\/archiveofourown\.org\/users\/`, // User's dashboard
    `https:\/\/archiveofourown\.org\/users\/.*\/series`, // User's series
    `https:\/\/archiveofourown\.org\/users\/.*\/gifts`, // User's gifts

    `https:\/\/archiveofourown\.org\/collections\/.*\/series`, // Collection's series
]

/** Origin of page to redirect */
export const enum ORIGIN {
    COLLECTIONS = 'collection_id=',
    TAGS = 'tag_id=',
    USERS = 'user_id='
}

/** Interface for a parsed work */
export interface WorkElement {
    /** Raw list element of work. Is null if work element refers to a meta element. */
    element: HTMLLIElement | null;
    href: string,
    title: string,
    authors: string[],
    recipients: string[] | null,
    fandoms: string[],
    warnings: WARNING[],
    tags: string[] | null,
    summary: string,
    series: string[] | null,
    rating: RATING,
    categories: CATEGORY[] | null,
    complete: boolean,
    language: string,
    wordCount: number,
    chapterCount: number,
    finalChapterCount: number | null,
    collections: number,
    comments: number,
    kudos: number,
    bookmarks: number,
    hits: number
};

/** Rating of works to id */
export enum RATING {
    notRated = 9,
    gen = 10,
    teen = 11,
    mature = 12,
    explicit = 13
}

/** Category of work to id */
export enum CATEGORY {
    gen = 21,
    fm = 22,
    mm = 23,
    other = 24,
    ff = 116,
    multi = 2246
}

/** Warnings of work to id */
export enum WARNING {
    choseNotToUse = 14,
    noWarningsApply = 16,
    violence = 17,
    mcd = 18,
    nonCon = 19,
    underage = 20
}
/**
 * Takes rating id of work and converts it to an enum value
 * @param id Id of rating
 * @returns RATING enum converted from id
 */
export function idToRatingEnum(id: number): RATING {
    if(id == 9)
        return RATING.notRated;
    else if(id == 10)
        return RATING.gen;
    else if(id == 11)
        return RATING.teen;
    else if(id == 12)
        return RATING.mature;
    else
        return RATING.explicit;
}

/**
 * Takes category id of work and converts it to an enum value
 * @param id Id of category
 * @returns CATEGORY enum converted from id
 */
export function idToCatetoryEnum(id: number): CATEGORY {
    if(id == 21)
        return CATEGORY.gen;
    else if(id == 22)
        return CATEGORY.fm;
    else if(id == 23)
        return CATEGORY.mm;
    else if(id == 24)
        return CATEGORY.other;
    else if(id == 116)
        return CATEGORY.ff;
    else
        return CATEGORY.multi;
}

/**
 * Takes warning id of work and converts it to an enum value
 * @param id Id of warning
 * @returns WARNING enum converted from id
 */
export function idToWarningEnum(id: number): WARNING {
    if(id == 14)
        return WARNING.choseNotToUse;
    else if(id == 16)
        return WARNING.noWarningsApply;
    else if(id == 17)
        return WARNING.violence;
    else if(id == 18)
        return WARNING.mcd;
    else if(id == 19)
        return WARNING.nonCon;
    else
        return WARNING.underage;
}

/**
 * Converts string value of a warning to the corresponding WARNING enum
 * @param warning String of warning from page
 * @returns Converted enum value of param
 */
export function warningToEnum(warning: string): WARNING {
    if(warning == "Choose Not To Use Archive Warnings")
        return WARNING.choseNotToUse;
    else if(warning == "Graphic Depictions Of Violence")
        return WARNING.violence;
    else if(warning == "Major Character Death")
        return WARNING.mcd;
    else if(warning == "No Archive Warnings Apply")
        return WARNING.noWarningsApply;
    else if(warning == "Rape/Non-Con")
        return WARNING.nonCon;
    else
        return WARNING.underage
}

/**
 * Converts string value of a rating to the corresponding RATING enum
 * @param warning String of rating from page
 * @returns Converted enum value of param
 */
export function ratingToEnum(rating: string): RATING {
    if(rating == "Not Rated")
        return RATING.notRated;
    else if(rating == "General Audiences")
        return RATING.gen;
    else if(rating == "Teen And Up Audiences")
        return RATING.teen;
    else if(rating == "Mature")
        return RATING.mature;
    else
        return RATING.explicit;
}

/**
 * Converts string value of a category to the corresponding CATEGORY enum
 * @param warning String of category from page
 * @returns Converted enum value of param
 */
export function categoryToEnum(category: string): CATEGORY {
    if(category == "F/F")
        return CATEGORY.ff;
    else if(category == "F/M")
        return CATEGORY.fm;
    else if(category == "Gen")
        return CATEGORY.gen;
    else if(category == "M/M")
        return CATEGORY.mm;
    else if(category == "Multi")
        return CATEGORY.multi;
    else
        return CATEGORY.other;
}