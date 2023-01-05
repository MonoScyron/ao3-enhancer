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
export enum ORIGIN {
    COLLECTIONS = 'collection_id=',
    TAGS = 'tag_id=',
    USERS = 'user_id='
}