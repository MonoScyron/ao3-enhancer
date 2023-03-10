/** All keys in storage */
export const STORAGE_KEYS = [
    "kudosHitRatio", "filtering", "language", "query", "tags", "warnings",
    "crossover", "completion", "wordCount", "updateDate", "hideByNumFandom",
    "hideByRatio"
];

/** Default values of settings */
export const DEFAULT_VALUES = {
    kudosHitRatio: true,
    filtering: false,
    language: "",
    query: "",
    tags: [],
    warnings: [],
    crossover: "",
    completion: "",
    wordCount: ["", ""],
    updateDate: ["", ""],
    hideByNumFandom: NaN,
    hideByRatio: NaN
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