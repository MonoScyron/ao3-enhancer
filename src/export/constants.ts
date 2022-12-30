/**
 * Redirect these URLs to exclude works with excluded stuff
 */
exports.redirectURLsRegex = [
    `https:\/\/archiveofourown\.org\/tags\/*`, // Works/bookmarks in a tag

    `/https:\/\/archiveofourown\.org\/users\/.*\/works/`, // User's works
    `/https:\/\/archiveofourown\.org\/users\/.*\/bookmarks/`, // User's bookmarks

    `/https:\/\/archiveofourown\.org\/collections\/.*\/works/`, // Collection's works
    `/https:\/\/archiveofourown\.org\/collections\/.*\/bookmarks/`// Collection's bookmarks
];

/**
 * Cannot redirect these URLs, need to hide works with excluded stuff
 */
exports.hideURLsRegex = [
    `/https:\/\/archiveofourown\.org\/users\//`, // User's dashboard
    `/https:\/\/archiveofourown\.org\/users\/.*\/series/`, // User's series
    `/https:\/\/archiveofourown\.org\/users\/.*\/gifts/`, // User's gifts

    `/https:\/\/archiveofourown\.org\/collections\/.*\/series/`, // Collection's series
]

/**
 * Origin of page to redirect
 */
exports.ORIGIN = {
    COLLECTIONS: 'collections',
    TAGS: 'tags',
    USERS: 'users'
}

/**
 * Type of post being searched for
 */
exports.TYPE = {
    WORKS: 'work',
    BOOKMARKS: 'bookmarks'
}

/**
 * Ratings to rating ids
 */
exports.RATING = {
    NOT_RATED: 9,
    GEN: 10,
    TEEN: 11,
    MATURE: 12,
    EXPLICIT: 13
}

/**
 * Warnings to warning ids
 */
exports.WARNING = {
    CHOSE_NOT_TO_USE: 14,
    NO_WARNINGS_APPLY: 16,
    MCD: 18,
    NON_CON: 19,
    UNDERAGE: 20
}

/**
 * Category to category ids
 */
exports.CATEGORY = {
    GEN: 21,
    FM: 22,
    MM: 23,
    OTHER: 24,
    FF: 116,
    MULTI: 2246
}

// TODO: REMOVE THESE CONSTANTS
const a = `Works/bookmarks in a tag ["tags", "works", "BNHA"]
https://archiveofourown.org/tags/%E5%83%95%E3%81%AE%E3%83%92%E3%83%BC%E3%83%AD%E3%83%BC%E3%82%A2%E3%82%AB%E3%83%87%E3%83%9F%E3%82%A2%20%7C%20Boku%20no%20Hero%20Academia%20%7C%20My%20Hero%20Academia/works

https://archiveofourown.org/works?work_search[sort_column]=revised_at&work_search[other_tag_names]=&exclude_work_search[rating_ids][]=9&exclude_work_search[archive_warning_ids][]=19&exclude_work_search[category_ids][]=24&exclude_work_search[fandom_ids][]=414093&exclude_work_search[character_ids][]=10740979&exclude_work_search[relationship_ids][]=6404978&exclude_work_search[freeform_ids][]=842172&work_search[excluded_tag_names]=Fluff&work_search[crossover]=F&work_search[complete]=T&work_search[words_from]=100&work_search[words_to]=100000&work_search[date_from]=2021-10-01&work_search[date_to]=2022-12-01&work_search[query]=testing&work_search[language_id]=en&commit=Sort+and+Filter&tag_id=%E5%83%95%E3%81%AE%E3%83%92%E3%83%BC%E3%83%AD%E3%83%BC%E3%82%A2%E3%82%AB%E3%83%87%E3%83%9F%E3%82%A2+%7C+Boku+no+Hero+Academia+%7C+My+Hero+Academia
`
const b = `User's works ["users", "works", "Beastkind"]
https://archiveofourown.org/users/Beastkind/works

https://archiveofourown.org/works?work_search[sort_column]=revised_at&work_search[other_tag_names]=&exclude_work_search[rating_ids][]=10&exclude_work_search[archive_warning_ids][]=16&exclude_work_search[category_ids][]=2246&exclude_work_search[fandom_ids][]=60110101&exclude_work_search[character_ids][]=28426142&exclude_work_search[relationship_ids][]=1915937&exclude_work_search[freeform_ids][]=83632&work_search[excluded_tag_names]=Fluff&work_search[crossover]=F&work_search[complete]=T&work_search[words_from]=100&work_search[words_to]=100000&work_search[date_from]=2021-09-14&work_search[date_to]=2022-12-22&work_search[query]=testing&work_search[language_id]=en&commit=Sort+and+Filter&user_id=Beastkind
`
const c = `User's bookmarks ["users", "bookmarks", "Beastkind"]
https://archiveofourown.org/users/Beastkind/bookmarks

https://archiveofourown.org/bookmarks?bookmark_search[sort_column]=created_at&bookmark_search[other_tag_names]=&bookmark_search[other_bookmark_tag_names]=&exclude_bookmark_search[rating_ids][]=9&exclude_bookmark_search[archive_warning_ids][]=18&exclude_bookmark_search[category_ids][]=116&exclude_bookmark_search[fandom_ids][]=51602310&exclude_bookmark_search[character_ids][]=1920764&exclude_bookmark_search[relationship_ids][]=5348047&exclude_bookmark_search[freeform_ids][]=1172&bookmark_search[excluded_tag_names]=Fluff&bookmark_search[excluded_bookmark_tag_names]=&bookmark_search[bookmarkable_query]=testing&bookmark_search[bookmark_query]=&bookmark_search[language_id]=en&bookmark_search[rec]=0&bookmark_search[with_notes]=0&commit=Sort+and+Filter&user_id=Beastkind
`
const d = `Collection's works ["collections", "works", "prometheusposting"]
https://archiveofourown.org/collections/prometheusposting/works

https://archiveofourown.org/collections/prometheusposting/works?work_search[sort_column]=revised_at&work_search[other_tag_names]=&exclude_work_search[rating_ids][]=10&exclude_work_search[archive_warning_ids][]=17&exclude_work_search[category_ids][]=22&exclude_work_search[fandom_ids][]=747342&exclude_work_search[character_ids][]=25&exclude_work_search[relationship_ids][]=487837&exclude_work_search[freeform_ids][]=110&work_search[excluded_tag_names]=Fluff&work_search[crossover]=F&work_search[complete]=T&work_search[words_from]=100&work_search[words_to]=100000&work_search[date_from]=2021-08-04&work_search[date_to]=2022-12-23&work_search[query]=testing&work_search[language_id]=en&commit=Sort+and+Filter&collection_id=1024177
`
const e = `Collection's bookmarks ["collections", "bookmarks", "behold_o_sister"]
https://archiveofourown.org/collections/behold_o_sister/bookmarks

https://archiveofourown.org/collections/behold_o_sister/bookmarks?bookmark_search[sort_column]=created_at&bookmark_search[other_tag_names]=&bookmark_search[other_bookmark_tag_names]=&exclude_bookmark_search[rating_ids][]=9&exclude_bookmark_search[archive_warning_ids][]=18&exclude_bookmark_search[category_ids][]=116&exclude_bookmark_search[fandom_ids][]=232768&exclude_bookmark_search[character_ids][]=5903&exclude_bookmark_search[relationship_ids][]=10855957&exclude_bookmark_search[freeform_ids][]=12295&bookmark_search[excluded_tag_names]=Fluff&bookmark_search[excluded_bookmark_tag_names]=&bookmark_search[bookmarkable_query]=testing&bookmark_search[bookmark_query]=&bookmark_search[language_id]=en&bookmark_search[rec]=0&bookmark_search[with_notes]=0&commit=Sort+and+Filter&collection_id=1023891
`