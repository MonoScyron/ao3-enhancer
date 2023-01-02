// * Storage keys
// Kudos to hit ratio
export const _kudosHitRatio = "kudosHitRatio";
// Language
export const _language = "language";
// Query
export const _query = "query";
// Tags/fandoms
export const _tags = "tags";
// Default values
export const _default_values = {
    kudosHitRatio: true,
    language: [false, ""],
    query: [false, ""],
    tags: []
}

/**
 * Redirect these URLs to filter works with excluded stuff
 */
export const redirectURLsRegex = [
    `https:\/\/archiveofourown\.org\/tags\/.*`, // Works/bookmarks in a tag

    `https:\/\/archiveofourown\.org\/users\/.*\/works(\\?.*)?`, // User's works
    `https:\/\/archiveofourown\.org\/users\/.*\/bookmarks(\\?.*)?`, // User's bookmarks

    `https:\/\/archiveofourown\.org\/collections\/.*\/works`, // Collection's works
    `https:\/\/archiveofourown\.org\/collections\/.*\/bookmarks`// Collection's bookmarks
];

/**
 * Cannot redirect these URLs, need to hide works with excluded stuff
 */
export const hideURLsRegex = [
    `https:\/\/archiveofourown\.org\/users\/`, // User's dashboard
    `https:\/\/archiveofourown\.org\/users\/.*\/series`, // User's series
    `https:\/\/archiveofourown\.org\/users\/.*\/gifts`, // User's gifts

    `https:\/\/archiveofourown\.org\/collections\/.*\/series`, // Collection's series
]

/**
 * Origin of page to redirect
 */
export enum ORIGIN {
    COLLECTIONS,
    TAGS,
    USERS
}

/**
 * Type of post being searched for
 */
export enum TYPE {
    WORKS = 'work',
    BOOKMARKS = 'bookmark'
}

/**
 * Ratings to rating ids
 */
export enum RATING {
    NOT_RATED = 9,
    GEN = 10,
    TEEN = 11,
    MATURE = 12,
    EXPLICIT = 13
}

/**
 * Warnings to warning ids
 */
export enum WARNING {
    CHOSE_NOT_TO_USE = 14,
    NO_WARNINGS_APPLY = 16,
    MCD = 18,
    NON_CON = 19,
    UNDERAGE = 20
}

/**
 * Category to category ids
 */
export enum CATEGORY {
    GEN = 21,
    FM = 22,
    MM = 23,
    OTHER = 24,
    FF = 116,
    MULTI = 2246
}