// Storage keys
export const STORAGE_KEYS = [
    "kudosHitRatio", "language", "query", "tags", "warnings"
];
// Default values
export const DEFAULT_VALUES = {
    kudosHitRatio: true,
    language: [false, ""],
    query: [false, ""],
    tags: [],
    warnings: []
}

/**
 * Redirect these URLs to filter works with excluded stuff
 */
export const REDIRECT_URLS = [
    `https:\/\/archiveofourown\.org\/tags\/.*`, // Works/bookmarks in a tag

    `https:\/\/archiveofourown\.org\/users\/.*\/works(\\?.*)?`, // User's works
    `https:\/\/archiveofourown\.org\/users\/.*\/bookmarks(\\?.*)?`, // User's bookmarks

    `https:\/\/archiveofourown\.org\/collections\/.*\/works`, // Collection's works
    `https:\/\/archiveofourown\.org\/collections\/.*\/bookmarks`// Collection's bookmarks
];

/**
 * Cannot redirect these URLs, need to hide works with excluded stuff
 */
export const HIDE_URLS = [
    `https:\/\/archiveofourown\.org\/users\/`, // User's dashboard
    `https:\/\/archiveofourown\.org\/users\/.*\/series`, // User's series
    `https:\/\/archiveofourown\.org\/users\/.*\/gifts`, // User's gifts

    `https:\/\/archiveofourown\.org\/collections\/.*\/series`, // Collection's series
]

/**
 * Origin of page to redirect
 */
export enum ORIGIN {
    COLLECTIONS = 'collection_id=',
    TAGS = 'tag_id=',
    USERS = 'user_id='
}

/**
 * Ratings to rating ids
 */
// export const RATING_ID = {
//     notRated: 9,
//     gen: 10,
//     teen: 11,
//     mature: 12,
//     explicit: 13
// }

/**
 * Warnings to warning ids
 */
// export const WARNING_ID = {
//     choseNotToUse: 14,
//     noWarnings: 16,
//     violence: 17,
//     mcd: 18,
//     nonCon: 19,
//     underage: 20
// };

/**
 * Category to category ids
 */
// export const CATEGORY_ID = {
//     gen: 21,
//     fm: 22,
//     mm: 23,
//     other: 24,
//     ff: 116,
//     multi: 2246
// }