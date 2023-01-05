/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/redirect.ts":
/*!************************************!*\
  !*** ./src/background/redirect.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRedirectURL = void 0;
/**
 * Redirect given url to url that filters excluded works
 * @param url Url to redirect
 * @param value Excluded works settings
 * @returns Url to redirect to, or null if url shouldn't be redirected
 */
function getRedirectURL(url, value) {
    // If filtering is off, return null
    if (!value.filtering)
        return null;
    let parsed = parseURL(url);
    let type = parsed[1];
    let origin;
    if (parsed[0] == 'tags')
        origin = "tag_id=" /* ORIGIN.TAGS */;
    else if (parsed[0] == 'users')
        origin = "user_id=" /* ORIGIN.USERS */;
    else
        origin = "collection_id=" /* ORIGIN.COLLECTIONS */;
    let id = parsed[2];
    let rating = [];
    let warning = [];
    let category = [];
    let tag = [];
    let crossover = "";
    let complete = "";
    let wordCount = [];
    let date = [];
    let query = "";
    let language = "";
    // Get exclude data from local storage
    if (value.language != undefined && value.language[0])
        language = value.language[1];
    if (value.query != undefined && value.query[0])
        query = value.query[1];
    if (value.tags != undefined)
        tag = value.tags;
    if (value.warnings != undefined)
        warning = value.warnings;
    let redirectUrl = constructRedirectURLHelper(origin, type, id, rating, warning, category, tag, crossover, complete, wordCount, date, query, language);
    if (redirectUrl != null) {
        redirectUrl += parsed[3].length == 0 ? "" : "&" + parsed[3];
        return redirectUrl;
    }
    else
        return null;
}
exports.getRedirectURL = getRedirectURL;
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
function constructRedirectURLHelper(origin, type, id, excludeRatings = [], excludeWarnings = [], excludeCategories = [], excludeTags = [], crossoverBool = "", completeBool = "", wordCountNums = [], dateArr = [], query = "", languageId = "") {
    // Construct exclude url queries
    let ratings = "";
    excludeRatings === null || excludeRatings === void 0 ? void 0 : excludeRatings.forEach((r) => ratings += `exclude_${type}_search[rating_ids][]=${r.valueOf()}&`);
    let archiveWarnings = "";
    excludeWarnings === null || excludeWarnings === void 0 ? void 0 : excludeWarnings.forEach((w) => archiveWarnings += `exclude_${type}_search[archive_warning_ids][]=${w.valueOf()}&`);
    let categories = "";
    excludeCategories === null || excludeCategories === void 0 ? void 0 : excludeCategories.forEach((c) => categories += `exclude_${type}_search[category_ids][]=${c.valueOf()}&`);
    let tags = `${type}_search[excluded_tag_names]=`;
    excludeTags === null || excludeTags === void 0 ? void 0 : excludeTags.forEach((t) => tags += `${t.valueOf()},`);
    if (excludeTags.length > 0)
        tags = tags.substring(0, tags.length - 1) + "&";
    else
        tags = "";
    let crossover = "";
    if (crossoverBool != "") {
        crossover = `${type}_search[crossover]=${crossoverBool}&`;
    }
    let complete = "";
    if (completeBool != "") {
        complete = `${type}_search[complete]=${completeBool}&`;
    }
    let wordCount = "";
    if (wordCountNums.length > 0) {
        if (wordCountNums[0] != null)
            wordCount += `${type}_search[words_from]=${wordCountNums[0]}&`;
        if (wordCountNums[1] != null)
            wordCount += `${type}_search[words_to]=${wordCountNums[1]}&`;
    }
    let date = "";
    if (dateArr.length > 0) {
        if (dateArr[0] != null)
            date += `${type}_search[date_from]=${dateArr[0]}&`;
        if (dateArr[1] != null)
            date += `${type}_search[date_to]=${dateArr[1]}&`;
    }
    let searchWithinResults = query == "" ? "" : `${type}_search[${type == 'bookmark' ? 'bookmarkable_' : ""}query]=${query}&`;
    let language = languageId == "" ? "" : `${type}_search[language_id]=${languageId}&`;
    // Construct full url
    if (ratings.length == 0 && archiveWarnings.length == 0 && categories.length == 0 && tags.length == 0 && crossover.length == 0 && wordCount.length == 0 && date.length == 0 && searchWithinResults.length == 0 && language.length == 0)
        return null;
    let redirect = `${type}s?${ratings}${archiveWarnings}${categories}${tags}${crossover}${complete}${wordCount}${date}${searchWithinResults}${language}commit=Sort+and+Filter&${origin.valueOf()}${id}`;
    if (origin == "collection_id=" /* ORIGIN.COLLECTIONS */)
        redirect = `https://archiveofourown.org/collections/${id}/` + redirect;
    else
        redirect = `https://archiveofourown.org/` + redirect;
    return redirect;
}
/**
 * Parses an AO3 url and returns its origin, search type, and id.
 * @param baseURL URL to be parsed.
 * @returns origin:'tags', 'users', or 'collections.'
 * @returns searchType: 'works' or 'bookmarks.'
 * @returns id: id of fandom (if origin='works'), id of user (if origin='bookmarks), or id of collection (if origin='collections').
 * @returns extraId: Extra ids in URLs, or empty string if no extra id. Returned as full id with definition (Ex: "fandom_id=1234123").
 */
function parseURL(baseURL) {
    let split = baseURL.split('/');
    let end = split[split.length - 1].split("?");
    if (split.length > 6) {
        if (split[5] == "pseuds" && split[4] != split[6])
            return [split[3], end[0].substring(0, end[0].length - 1), split[4], `pseud_id=${split[6]}` + (end.length > 1 ? `&${end[1]}` : "")];
        else if (split[3] == 'collections')
            return [split[3], end[0].substring(0, end[0].length - 1), split[4], `tag_id=${split[6]}` + (end.length > 1 ? `&${end[1]}` : "")];
    }
    return [split[3], end[0].substring(0, end[0].length - 1), split[split.length - 2], end.length > 1 ? end[1] : ""];
}


/***/ }),

/***/ "./src/export/constants.ts":
/*!*********************************!*\
  !*** ./src/export/constants.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.idToWarningEnum = exports.WARNING = exports.idToCatetoryEnum = exports.CATEGORY = exports.idToRatingEnum = exports.RATING = exports.HIDE_URLS = exports.REDIRECT_URLS = exports.SETTINGS_CHANGED = exports.DEFAULT_VALUES = exports.STORAGE_KEYS = void 0;
// Storage keys
exports.STORAGE_KEYS = [
    "kudosHitRatio", "filtering", "language", "query", "tags", "warnings"
];
// Default values
exports.DEFAULT_VALUES = {
    kudosHitRatio: true,
    filtering: false,
    language: [false, ""],
    query: [false, ""],
    tags: [],
    warnings: []
};
// Settings changed message
exports.SETTINGS_CHANGED = "settings_changed";
/** Redirect these URLs to filter works with excluded stuff */
exports.REDIRECT_URLS = [
    `https://archiveofourown.org/tags/*/works`,
    `https://archiveofourown.org/tags/*/bookmarks`,
    `https://archiveofourown.org/users/*/works*`,
    `https://archiveofourown.org/users/*/bookmarks*`,
    `https://archiveofourown.org/collections/*/works`,
    `https://archiveofourown.org/collections/*/bookmarks` // Collection's bookmarks
];
/** Cannot redirect these URLs, need to hide works with excluded stuff */
exports.HIDE_URLS = [
    `https:\/\/archiveofourown\.org\/users\/`,
    `https:\/\/archiveofourown\.org\/users\/.*\/series`,
    `https:\/\/archiveofourown\.org\/users\/.*\/gifts`,
    `https:\/\/archiveofourown\.org\/collections\/.*\/series`, // Collection's series
];
;
/** Rating of works to id */
var RATING;
(function (RATING) {
    RATING[RATING["notRated"] = 9] = "notRated";
    RATING[RATING["gen"] = 10] = "gen";
    RATING[RATING["teen"] = 11] = "teen";
    RATING[RATING["mature"] = 12] = "mature";
    RATING[RATING["explicit"] = 13] = "explicit";
})(RATING = exports.RATING || (exports.RATING = {}));
/**
 * Takes rating id of work and converts it to an enum value
 * @param id Id of rating
 * @returns RATING enum converted from id
 */
function idToRatingEnum(id) {
    if (id == 9)
        return RATING.notRated;
    else if (id == 10)
        return RATING.gen;
    else if (id == 11)
        return RATING.teen;
    else if (id == 12)
        return RATING.mature;
    else
        return RATING.explicit;
}
exports.idToRatingEnum = idToRatingEnum;
/** Category of work to id */
var CATEGORY;
(function (CATEGORY) {
    CATEGORY[CATEGORY["gen"] = 21] = "gen";
    CATEGORY[CATEGORY["fm"] = 22] = "fm";
    CATEGORY[CATEGORY["mm"] = 23] = "mm";
    CATEGORY[CATEGORY["other"] = 24] = "other";
    CATEGORY[CATEGORY["ff"] = 116] = "ff";
    CATEGORY[CATEGORY["multi"] = 2246] = "multi";
})(CATEGORY = exports.CATEGORY || (exports.CATEGORY = {}));
/**
 * Takes category id of work and converts it to an enum value
 * @param id Id of category
 * @returns CATEGORY enum converted from id
 */
function idToCatetoryEnum(id) {
    if (id == 21)
        return CATEGORY.gen;
    else if (id == 22)
        return CATEGORY.fm;
    else if (id == 23)
        return CATEGORY.mm;
    else if (id == 24)
        return CATEGORY.other;
    else if (id == 116)
        return CATEGORY.ff;
    else
        return CATEGORY.multi;
}
exports.idToCatetoryEnum = idToCatetoryEnum;
/** Warnings of work to id */
var WARNING;
(function (WARNING) {
    WARNING[WARNING["choseNotToUse"] = 14] = "choseNotToUse";
    WARNING[WARNING["noWarningsApply"] = 16] = "noWarningsApply";
    WARNING[WARNING["violence"] = 17] = "violence";
    WARNING[WARNING["mcd"] = 18] = "mcd";
    WARNING[WARNING["nonCon"] = 19] = "nonCon";
    WARNING[WARNING["underage"] = 20] = "underage";
})(WARNING = exports.WARNING || (exports.WARNING = {}));
/**
 * Takes warning id of work and converts it to an enum value
 * @param id Id of warning
 * @returns WARNING enum converted from id
 */
function idToWarningEnum(id) {
    if (id == 14)
        return WARNING.choseNotToUse;
    else if (id == 16)
        return WARNING.noWarningsApply;
    else if (id == 17)
        return WARNING.violence;
    else if (id == 18)
        return WARNING.mcd;
    else if (id == 19)
        return WARNING.nonCon;
    else
        return WARNING.underage;
}
exports.idToWarningEnum = idToWarningEnum;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __webpack_require__(/*! ../export/constants */ "./src/export/constants.ts");
const redirect_1 = __webpack_require__(/*! ./redirect */ "./src/background/redirect.ts");
// * Global variables
let settings;
// * Executed code start
// Set settings to be currently stored settings
browser.storage.local.get(constants_1.STORAGE_KEYS).then((value) => {
    settings = value;
});
// * Executed code end
// * Listeners
// Open option menu on browser action icon click
browser.browserAction.onClicked.addListener(openOptionMenu);
// Redirect URLs to filter works
browser.webRequest.onBeforeRequest.addListener(redirect, {
    urls: constants_1.REDIRECT_URLS,
    types: ['main_frame']
}, ['blocking']);
// Synch settings on settings change
browser.runtime.onMessage.addListener((message) => {
    if (message == constants_1.SETTINGS_CHANGED) {
        // Get settings from storage
        browser.storage.local.get(constants_1.STORAGE_KEYS).then((value) => {
            settings = value;
        });
    }
});
// * Functions
/**
 * Redirects url to filter excluded works
 * @param details Web request details
 * @returns Web request BlockingResponse object
 */
function redirect(details) {
    // console.log(`AO3Extension: details.url=${details.url}`); // DEBUGGING
    let url = (0, redirect_1.getRedirectURL)(details.url, settings);
    // console.log(`AO3Extension: url=${url}`); // DEBUGGING
    if (url != null)
        return {
            redirectUrl: url
        };
    else
        return {};
}
/**
 * Opens option menu for extension
 */
function openOptionMenu() {
    browser.tabs.create({
        url: "/dist/options/options.html"
    });
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQvcmVkaXJlY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4cG9ydC9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9iYWNrZ3JvdW5kL2JhY2tncm91bmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5nZXRSZWRpcmVjdFVSTCA9IHZvaWQgMDtcclxuLyoqXHJcbiAqIFJlZGlyZWN0IGdpdmVuIHVybCB0byB1cmwgdGhhdCBmaWx0ZXJzIGV4Y2x1ZGVkIHdvcmtzXHJcbiAqIEBwYXJhbSB1cmwgVXJsIHRvIHJlZGlyZWN0XHJcbiAqIEBwYXJhbSB2YWx1ZSBFeGNsdWRlZCB3b3JrcyBzZXR0aW5nc1xyXG4gKiBAcmV0dXJucyBVcmwgdG8gcmVkaXJlY3QgdG8sIG9yIG51bGwgaWYgdXJsIHNob3VsZG4ndCBiZSByZWRpcmVjdGVkXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRSZWRpcmVjdFVSTCh1cmwsIHZhbHVlKSB7XHJcbiAgICAvLyBJZiBmaWx0ZXJpbmcgaXMgb2ZmLCByZXR1cm4gbnVsbFxyXG4gICAgaWYgKCF2YWx1ZS5maWx0ZXJpbmcpXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICBsZXQgcGFyc2VkID0gcGFyc2VVUkwodXJsKTtcclxuICAgIGxldCB0eXBlID0gcGFyc2VkWzFdO1xyXG4gICAgbGV0IG9yaWdpbjtcclxuICAgIGlmIChwYXJzZWRbMF0gPT0gJ3RhZ3MnKVxyXG4gICAgICAgIG9yaWdpbiA9IFwidGFnX2lkPVwiIC8qIE9SSUdJTi5UQUdTICovO1xyXG4gICAgZWxzZSBpZiAocGFyc2VkWzBdID09ICd1c2VycycpXHJcbiAgICAgICAgb3JpZ2luID0gXCJ1c2VyX2lkPVwiIC8qIE9SSUdJTi5VU0VSUyAqLztcclxuICAgIGVsc2VcclxuICAgICAgICBvcmlnaW4gPSBcImNvbGxlY3Rpb25faWQ9XCIgLyogT1JJR0lOLkNPTExFQ1RJT05TICovO1xyXG4gICAgbGV0IGlkID0gcGFyc2VkWzJdO1xyXG4gICAgbGV0IHJhdGluZyA9IFtdO1xyXG4gICAgbGV0IHdhcm5pbmcgPSBbXTtcclxuICAgIGxldCBjYXRlZ29yeSA9IFtdO1xyXG4gICAgbGV0IHRhZyA9IFtdO1xyXG4gICAgbGV0IGNyb3Nzb3ZlciA9IFwiXCI7XHJcbiAgICBsZXQgY29tcGxldGUgPSBcIlwiO1xyXG4gICAgbGV0IHdvcmRDb3VudCA9IFtdO1xyXG4gICAgbGV0IGRhdGUgPSBbXTtcclxuICAgIGxldCBxdWVyeSA9IFwiXCI7XHJcbiAgICBsZXQgbGFuZ3VhZ2UgPSBcIlwiO1xyXG4gICAgLy8gR2V0IGV4Y2x1ZGUgZGF0YSBmcm9tIGxvY2FsIHN0b3JhZ2VcclxuICAgIGlmICh2YWx1ZS5sYW5ndWFnZSAhPSB1bmRlZmluZWQgJiYgdmFsdWUubGFuZ3VhZ2VbMF0pXHJcbiAgICAgICAgbGFuZ3VhZ2UgPSB2YWx1ZS5sYW5ndWFnZVsxXTtcclxuICAgIGlmICh2YWx1ZS5xdWVyeSAhPSB1bmRlZmluZWQgJiYgdmFsdWUucXVlcnlbMF0pXHJcbiAgICAgICAgcXVlcnkgPSB2YWx1ZS5xdWVyeVsxXTtcclxuICAgIGlmICh2YWx1ZS50YWdzICE9IHVuZGVmaW5lZClcclxuICAgICAgICB0YWcgPSB2YWx1ZS50YWdzO1xyXG4gICAgaWYgKHZhbHVlLndhcm5pbmdzICE9IHVuZGVmaW5lZClcclxuICAgICAgICB3YXJuaW5nID0gdmFsdWUud2FybmluZ3M7XHJcbiAgICBsZXQgcmVkaXJlY3RVcmwgPSBjb25zdHJ1Y3RSZWRpcmVjdFVSTEhlbHBlcihvcmlnaW4sIHR5cGUsIGlkLCByYXRpbmcsIHdhcm5pbmcsIGNhdGVnb3J5LCB0YWcsIGNyb3Nzb3ZlciwgY29tcGxldGUsIHdvcmRDb3VudCwgZGF0ZSwgcXVlcnksIGxhbmd1YWdlKTtcclxuICAgIGlmIChyZWRpcmVjdFVybCAhPSBudWxsKSB7XHJcbiAgICAgICAgcmVkaXJlY3RVcmwgKz0gcGFyc2VkWzNdLmxlbmd0aCA9PSAwID8gXCJcIiA6IFwiJlwiICsgcGFyc2VkWzNdO1xyXG4gICAgICAgIHJldHVybiByZWRpcmVjdFVybDtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxufVxyXG5leHBvcnRzLmdldFJlZGlyZWN0VVJMID0gZ2V0UmVkaXJlY3RVUkw7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHJlZGlyZWN0IFVSTCB0byBjb250YWluIGV4Y2x1ZGVkIHRhZ3MsIG92ZXJyaWRpbmcgdGhlIHByZXZpb3VzIFVSTCdzIGhpc3RvcnlcclxuICogQHBhcmFtIG9yaWdpbiBPcmlnaW4gb2YgZG9jdW1lbnRcclxuICogQHBhcmFtIHR5cGUgVHlwZSBvZiB3b3JrcyBiZWluZyBzaG93biAoJ3dvcmsnIG9yICdib29rbWFyaycpXHJcbiAqIEBwYXJhbSBpZCBJRCBvZiB0aGUgdXJsIHRvIHJlZGlyZWN0XHJcbiAqIEBwYXJhbSBleGNsdWRlUmF0aW5ncyBJRCBvZiByYXRpbmdzIHRvIGV4Y2x1ZGVcclxuICogQHBhcmFtIGV4Y2x1ZGVXYXJuaW5ncyBJRCBvZiB3YXJuaW5ncyB0byBleGNsdWRlXHJcbiAqIEBwYXJhbSBleGNsdWRlQ2F0ZWdvcmllcyBJRCBvZiBjYXRlZ29yaWVzIHRvIGV4Y2x1ZGVcclxuICogQHBhcmFtIGV4Y2x1ZGVUYWdzIFRhZ3MgdG8gZXhjbHVkZVxyXG4gKiBAcGFyYW0gY3Jvc3NvdmVyQm9vbCBJbmNsdWRlLCBleGNsdWRlLCBvciBleGNsdXNpdmVseSBzaG93IGNyb3Nzb3ZlciB3b3Jrc1xyXG4gKiBAcGFyYW0gY29tcGxldGVCb29sIEluY2x1ZGUsIGV4Y2x1ZGUsIG9yIGV4Y2x1c2l2ZWx5IHNob3cgY29tcGxldGUgd29ya3NcclxuICogQHBhcmFtIHdvcmRDb3VudE51bXMgTGltaXQgd29ya3MgdG8gZ2l2ZW4gd29yZCBjb3VudCBpbnRlcnZhbFxyXG4gKiBAcGFyYW0gZGF0ZUFyciBMaW1pdCB3b3JrcyB0byBnaXZlbiBkYXRlIGludGVydmFsXHJcbiAqIEBwYXJhbSBxdWVyeSBRdWVyeSB3aXRoaW4gcmVzdWx0c1xyXG4gKiBAcGFyYW0gbGFuZ3VhZ2VJZCBJRCBvZiBsYW5ndWFnZSB0byBsaW1pdCB3b3JrcyB0b1xyXG4gKiBAcmV0dXJucyBVUkwgdG8gcmVkaXJlY3QgdG9cclxuICovXHJcbmZ1bmN0aW9uIGNvbnN0cnVjdFJlZGlyZWN0VVJMSGVscGVyKG9yaWdpbiwgdHlwZSwgaWQsIGV4Y2x1ZGVSYXRpbmdzID0gW10sIGV4Y2x1ZGVXYXJuaW5ncyA9IFtdLCBleGNsdWRlQ2F0ZWdvcmllcyA9IFtdLCBleGNsdWRlVGFncyA9IFtdLCBjcm9zc292ZXJCb29sID0gXCJcIiwgY29tcGxldGVCb29sID0gXCJcIiwgd29yZENvdW50TnVtcyA9IFtdLCBkYXRlQXJyID0gW10sIHF1ZXJ5ID0gXCJcIiwgbGFuZ3VhZ2VJZCA9IFwiXCIpIHtcclxuICAgIC8vIENvbnN0cnVjdCBleGNsdWRlIHVybCBxdWVyaWVzXHJcbiAgICBsZXQgcmF0aW5ncyA9IFwiXCI7XHJcbiAgICBleGNsdWRlUmF0aW5ncyA9PT0gbnVsbCB8fCBleGNsdWRlUmF0aW5ncyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXhjbHVkZVJhdGluZ3MuZm9yRWFjaCgocikgPT4gcmF0aW5ncyArPSBgZXhjbHVkZV8ke3R5cGV9X3NlYXJjaFtyYXRpbmdfaWRzXVtdPSR7ci52YWx1ZU9mKCl9JmApO1xyXG4gICAgbGV0IGFyY2hpdmVXYXJuaW5ncyA9IFwiXCI7XHJcbiAgICBleGNsdWRlV2FybmluZ3MgPT09IG51bGwgfHwgZXhjbHVkZVdhcm5pbmdzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBleGNsdWRlV2FybmluZ3MuZm9yRWFjaCgodykgPT4gYXJjaGl2ZVdhcm5pbmdzICs9IGBleGNsdWRlXyR7dHlwZX1fc2VhcmNoW2FyY2hpdmVfd2FybmluZ19pZHNdW109JHt3LnZhbHVlT2YoKX0mYCk7XHJcbiAgICBsZXQgY2F0ZWdvcmllcyA9IFwiXCI7XHJcbiAgICBleGNsdWRlQ2F0ZWdvcmllcyA9PT0gbnVsbCB8fCBleGNsdWRlQ2F0ZWdvcmllcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXhjbHVkZUNhdGVnb3JpZXMuZm9yRWFjaCgoYykgPT4gY2F0ZWdvcmllcyArPSBgZXhjbHVkZV8ke3R5cGV9X3NlYXJjaFtjYXRlZ29yeV9pZHNdW109JHtjLnZhbHVlT2YoKX0mYCk7XHJcbiAgICBsZXQgdGFncyA9IGAke3R5cGV9X3NlYXJjaFtleGNsdWRlZF90YWdfbmFtZXNdPWA7XHJcbiAgICBleGNsdWRlVGFncyA9PT0gbnVsbCB8fCBleGNsdWRlVGFncyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXhjbHVkZVRhZ3MuZm9yRWFjaCgodCkgPT4gdGFncyArPSBgJHt0LnZhbHVlT2YoKX0sYCk7XHJcbiAgICBpZiAoZXhjbHVkZVRhZ3MubGVuZ3RoID4gMClcclxuICAgICAgICB0YWdzID0gdGFncy5zdWJzdHJpbmcoMCwgdGFncy5sZW5ndGggLSAxKSArIFwiJlwiO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHRhZ3MgPSBcIlwiO1xyXG4gICAgbGV0IGNyb3Nzb3ZlciA9IFwiXCI7XHJcbiAgICBpZiAoY3Jvc3NvdmVyQm9vbCAhPSBcIlwiKSB7XHJcbiAgICAgICAgY3Jvc3NvdmVyID0gYCR7dHlwZX1fc2VhcmNoW2Nyb3Nzb3Zlcl09JHtjcm9zc292ZXJCb29sfSZgO1xyXG4gICAgfVxyXG4gICAgbGV0IGNvbXBsZXRlID0gXCJcIjtcclxuICAgIGlmIChjb21wbGV0ZUJvb2wgIT0gXCJcIikge1xyXG4gICAgICAgIGNvbXBsZXRlID0gYCR7dHlwZX1fc2VhcmNoW2NvbXBsZXRlXT0ke2NvbXBsZXRlQm9vbH0mYDtcclxuICAgIH1cclxuICAgIGxldCB3b3JkQ291bnQgPSBcIlwiO1xyXG4gICAgaWYgKHdvcmRDb3VudE51bXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGlmICh3b3JkQ291bnROdW1zWzBdICE9IG51bGwpXHJcbiAgICAgICAgICAgIHdvcmRDb3VudCArPSBgJHt0eXBlfV9zZWFyY2hbd29yZHNfZnJvbV09JHt3b3JkQ291bnROdW1zWzBdfSZgO1xyXG4gICAgICAgIGlmICh3b3JkQ291bnROdW1zWzFdICE9IG51bGwpXHJcbiAgICAgICAgICAgIHdvcmRDb3VudCArPSBgJHt0eXBlfV9zZWFyY2hbd29yZHNfdG9dPSR7d29yZENvdW50TnVtc1sxXX0mYDtcclxuICAgIH1cclxuICAgIGxldCBkYXRlID0gXCJcIjtcclxuICAgIGlmIChkYXRlQXJyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBpZiAoZGF0ZUFyclswXSAhPSBudWxsKVxyXG4gICAgICAgICAgICBkYXRlICs9IGAke3R5cGV9X3NlYXJjaFtkYXRlX2Zyb21dPSR7ZGF0ZUFyclswXX0mYDtcclxuICAgICAgICBpZiAoZGF0ZUFyclsxXSAhPSBudWxsKVxyXG4gICAgICAgICAgICBkYXRlICs9IGAke3R5cGV9X3NlYXJjaFtkYXRlX3RvXT0ke2RhdGVBcnJbMV19JmA7XHJcbiAgICB9XHJcbiAgICBsZXQgc2VhcmNoV2l0aGluUmVzdWx0cyA9IHF1ZXJ5ID09IFwiXCIgPyBcIlwiIDogYCR7dHlwZX1fc2VhcmNoWyR7dHlwZSA9PSAnYm9va21hcmsnID8gJ2Jvb2ttYXJrYWJsZV8nIDogXCJcIn1xdWVyeV09JHtxdWVyeX0mYDtcclxuICAgIGxldCBsYW5ndWFnZSA9IGxhbmd1YWdlSWQgPT0gXCJcIiA/IFwiXCIgOiBgJHt0eXBlfV9zZWFyY2hbbGFuZ3VhZ2VfaWRdPSR7bGFuZ3VhZ2VJZH0mYDtcclxuICAgIC8vIENvbnN0cnVjdCBmdWxsIHVybFxyXG4gICAgaWYgKHJhdGluZ3MubGVuZ3RoID09IDAgJiYgYXJjaGl2ZVdhcm5pbmdzLmxlbmd0aCA9PSAwICYmIGNhdGVnb3JpZXMubGVuZ3RoID09IDAgJiYgdGFncy5sZW5ndGggPT0gMCAmJiBjcm9zc292ZXIubGVuZ3RoID09IDAgJiYgd29yZENvdW50Lmxlbmd0aCA9PSAwICYmIGRhdGUubGVuZ3RoID09IDAgJiYgc2VhcmNoV2l0aGluUmVzdWx0cy5sZW5ndGggPT0gMCAmJiBsYW5ndWFnZS5sZW5ndGggPT0gMClcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIGxldCByZWRpcmVjdCA9IGAke3R5cGV9cz8ke3JhdGluZ3N9JHthcmNoaXZlV2FybmluZ3N9JHtjYXRlZ29yaWVzfSR7dGFnc30ke2Nyb3Nzb3Zlcn0ke2NvbXBsZXRlfSR7d29yZENvdW50fSR7ZGF0ZX0ke3NlYXJjaFdpdGhpblJlc3VsdHN9JHtsYW5ndWFnZX1jb21taXQ9U29ydCthbmQrRmlsdGVyJiR7b3JpZ2luLnZhbHVlT2YoKX0ke2lkfWA7XHJcbiAgICBpZiAob3JpZ2luID09IFwiY29sbGVjdGlvbl9pZD1cIiAvKiBPUklHSU4uQ09MTEVDVElPTlMgKi8pXHJcbiAgICAgICAgcmVkaXJlY3QgPSBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL2NvbGxlY3Rpb25zLyR7aWR9L2AgKyByZWRpcmVjdDtcclxuICAgIGVsc2VcclxuICAgICAgICByZWRpcmVjdCA9IGBodHRwczovL2FyY2hpdmVvZm91cm93bi5vcmcvYCArIHJlZGlyZWN0O1xyXG4gICAgcmV0dXJuIHJlZGlyZWN0O1xyXG59XHJcbi8qKlxyXG4gKiBQYXJzZXMgYW4gQU8zIHVybCBhbmQgcmV0dXJucyBpdHMgb3JpZ2luLCBzZWFyY2ggdHlwZSwgYW5kIGlkLlxyXG4gKiBAcGFyYW0gYmFzZVVSTCBVUkwgdG8gYmUgcGFyc2VkLlxyXG4gKiBAcmV0dXJucyBvcmlnaW46J3RhZ3MnLCAndXNlcnMnLCBvciAnY29sbGVjdGlvbnMuJ1xyXG4gKiBAcmV0dXJucyBzZWFyY2hUeXBlOiAnd29ya3MnIG9yICdib29rbWFya3MuJ1xyXG4gKiBAcmV0dXJucyBpZDogaWQgb2YgZmFuZG9tIChpZiBvcmlnaW49J3dvcmtzJyksIGlkIG9mIHVzZXIgKGlmIG9yaWdpbj0nYm9va21hcmtzKSwgb3IgaWQgb2YgY29sbGVjdGlvbiAoaWYgb3JpZ2luPSdjb2xsZWN0aW9ucycpLlxyXG4gKiBAcmV0dXJucyBleHRyYUlkOiBFeHRyYSBpZHMgaW4gVVJMcywgb3IgZW1wdHkgc3RyaW5nIGlmIG5vIGV4dHJhIGlkLiBSZXR1cm5lZCBhcyBmdWxsIGlkIHdpdGggZGVmaW5pdGlvbiAoRXg6IFwiZmFuZG9tX2lkPTEyMzQxMjNcIikuXHJcbiAqL1xyXG5mdW5jdGlvbiBwYXJzZVVSTChiYXNlVVJMKSB7XHJcbiAgICBsZXQgc3BsaXQgPSBiYXNlVVJMLnNwbGl0KCcvJyk7XHJcbiAgICBsZXQgZW5kID0gc3BsaXRbc3BsaXQubGVuZ3RoIC0gMV0uc3BsaXQoXCI/XCIpO1xyXG4gICAgaWYgKHNwbGl0Lmxlbmd0aCA+IDYpIHtcclxuICAgICAgICBpZiAoc3BsaXRbNV0gPT0gXCJwc2V1ZHNcIiAmJiBzcGxpdFs0XSAhPSBzcGxpdFs2XSlcclxuICAgICAgICAgICAgcmV0dXJuIFtzcGxpdFszXSwgZW5kWzBdLnN1YnN0cmluZygwLCBlbmRbMF0ubGVuZ3RoIC0gMSksIHNwbGl0WzRdLCBgcHNldWRfaWQ9JHtzcGxpdFs2XX1gICsgKGVuZC5sZW5ndGggPiAxID8gYCYke2VuZFsxXX1gIDogXCJcIildO1xyXG4gICAgICAgIGVsc2UgaWYgKHNwbGl0WzNdID09ICdjb2xsZWN0aW9ucycpXHJcbiAgICAgICAgICAgIHJldHVybiBbc3BsaXRbM10sIGVuZFswXS5zdWJzdHJpbmcoMCwgZW5kWzBdLmxlbmd0aCAtIDEpLCBzcGxpdFs0XSwgYHRhZ19pZD0ke3NwbGl0WzZdfWAgKyAoZW5kLmxlbmd0aCA+IDEgPyBgJiR7ZW5kWzFdfWAgOiBcIlwiKV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW3NwbGl0WzNdLCBlbmRbMF0uc3Vic3RyaW5nKDAsIGVuZFswXS5sZW5ndGggLSAxKSwgc3BsaXRbc3BsaXQubGVuZ3RoIC0gMl0sIGVuZC5sZW5ndGggPiAxID8gZW5kWzFdIDogXCJcIl07XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5pZFRvV2FybmluZ0VudW0gPSBleHBvcnRzLldBUk5JTkcgPSBleHBvcnRzLmlkVG9DYXRldG9yeUVudW0gPSBleHBvcnRzLkNBVEVHT1JZID0gZXhwb3J0cy5pZFRvUmF0aW5nRW51bSA9IGV4cG9ydHMuUkFUSU5HID0gZXhwb3J0cy5ISURFX1VSTFMgPSBleHBvcnRzLlJFRElSRUNUX1VSTFMgPSBleHBvcnRzLlNFVFRJTkdTX0NIQU5HRUQgPSBleHBvcnRzLkRFRkFVTFRfVkFMVUVTID0gZXhwb3J0cy5TVE9SQUdFX0tFWVMgPSB2b2lkIDA7XHJcbi8vIFN0b3JhZ2Uga2V5c1xyXG5leHBvcnRzLlNUT1JBR0VfS0VZUyA9IFtcclxuICAgIFwia3Vkb3NIaXRSYXRpb1wiLCBcImZpbHRlcmluZ1wiLCBcImxhbmd1YWdlXCIsIFwicXVlcnlcIiwgXCJ0YWdzXCIsIFwid2FybmluZ3NcIlxyXG5dO1xyXG4vLyBEZWZhdWx0IHZhbHVlc1xyXG5leHBvcnRzLkRFRkFVTFRfVkFMVUVTID0ge1xyXG4gICAga3Vkb3NIaXRSYXRpbzogdHJ1ZSxcclxuICAgIGZpbHRlcmluZzogZmFsc2UsXHJcbiAgICBsYW5ndWFnZTogW2ZhbHNlLCBcIlwiXSxcclxuICAgIHF1ZXJ5OiBbZmFsc2UsIFwiXCJdLFxyXG4gICAgdGFnczogW10sXHJcbiAgICB3YXJuaW5nczogW11cclxufTtcclxuLy8gU2V0dGluZ3MgY2hhbmdlZCBtZXNzYWdlXHJcbmV4cG9ydHMuU0VUVElOR1NfQ0hBTkdFRCA9IFwic2V0dGluZ3NfY2hhbmdlZFwiO1xyXG4vKiogUmVkaXJlY3QgdGhlc2UgVVJMcyB0byBmaWx0ZXIgd29ya3Mgd2l0aCBleGNsdWRlZCBzdHVmZiAqL1xyXG5leHBvcnRzLlJFRElSRUNUX1VSTFMgPSBbXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL3RhZ3MvKi93b3Jrc2AsXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL3RhZ3MvKi9ib29rbWFya3NgLFxyXG4gICAgYGh0dHBzOi8vYXJjaGl2ZW9mb3Vyb3duLm9yZy91c2Vycy8qL3dvcmtzKmAsXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL3VzZXJzLyovYm9va21hcmtzKmAsXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL2NvbGxlY3Rpb25zLyovd29ya3NgLFxyXG4gICAgYGh0dHBzOi8vYXJjaGl2ZW9mb3Vyb3duLm9yZy9jb2xsZWN0aW9ucy8qL2Jvb2ttYXJrc2AgLy8gQ29sbGVjdGlvbidzIGJvb2ttYXJrc1xyXG5dO1xyXG4vKiogQ2Fubm90IHJlZGlyZWN0IHRoZXNlIFVSTHMsIG5lZWQgdG8gaGlkZSB3b3JrcyB3aXRoIGV4Y2x1ZGVkIHN0dWZmICovXHJcbmV4cG9ydHMuSElERV9VUkxTID0gW1xyXG4gICAgYGh0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL3VzZXJzXFwvYCxcclxuICAgIGBodHRwczpcXC9cXC9hcmNoaXZlb2ZvdXJvd25cXC5vcmdcXC91c2Vyc1xcLy4qXFwvc2VyaWVzYCxcclxuICAgIGBodHRwczpcXC9cXC9hcmNoaXZlb2ZvdXJvd25cXC5vcmdcXC91c2Vyc1xcLy4qXFwvZ2lmdHNgLFxyXG4gICAgYGh0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL2NvbGxlY3Rpb25zXFwvLipcXC9zZXJpZXNgLCAvLyBDb2xsZWN0aW9uJ3Mgc2VyaWVzXHJcbl07XHJcbjtcclxuLyoqIFJhdGluZyBvZiB3b3JrcyB0byBpZCAqL1xyXG52YXIgUkFUSU5HO1xyXG4oZnVuY3Rpb24gKFJBVElORykge1xyXG4gICAgUkFUSU5HW1JBVElOR1tcIm5vdFJhdGVkXCJdID0gOV0gPSBcIm5vdFJhdGVkXCI7XHJcbiAgICBSQVRJTkdbUkFUSU5HW1wiZ2VuXCJdID0gMTBdID0gXCJnZW5cIjtcclxuICAgIFJBVElOR1tSQVRJTkdbXCJ0ZWVuXCJdID0gMTFdID0gXCJ0ZWVuXCI7XHJcbiAgICBSQVRJTkdbUkFUSU5HW1wibWF0dXJlXCJdID0gMTJdID0gXCJtYXR1cmVcIjtcclxuICAgIFJBVElOR1tSQVRJTkdbXCJleHBsaWNpdFwiXSA9IDEzXSA9IFwiZXhwbGljaXRcIjtcclxufSkoUkFUSU5HID0gZXhwb3J0cy5SQVRJTkcgfHwgKGV4cG9ydHMuUkFUSU5HID0ge30pKTtcclxuLyoqXHJcbiAqIFRha2VzIHJhdGluZyBpZCBvZiB3b3JrIGFuZCBjb252ZXJ0cyBpdCB0byBhbiBlbnVtIHZhbHVlXHJcbiAqIEBwYXJhbSBpZCBJZCBvZiByYXRpbmdcclxuICogQHJldHVybnMgUkFUSU5HIGVudW0gY29udmVydGVkIGZyb20gaWRcclxuICovXHJcbmZ1bmN0aW9uIGlkVG9SYXRpbmdFbnVtKGlkKSB7XHJcbiAgICBpZiAoaWQgPT0gOSlcclxuICAgICAgICByZXR1cm4gUkFUSU5HLm5vdFJhdGVkO1xyXG4gICAgZWxzZSBpZiAoaWQgPT0gMTApXHJcbiAgICAgICAgcmV0dXJuIFJBVElORy5nZW47XHJcbiAgICBlbHNlIGlmIChpZCA9PSAxMSlcclxuICAgICAgICByZXR1cm4gUkFUSU5HLnRlZW47XHJcbiAgICBlbHNlIGlmIChpZCA9PSAxMilcclxuICAgICAgICByZXR1cm4gUkFUSU5HLm1hdHVyZTtcclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gUkFUSU5HLmV4cGxpY2l0O1xyXG59XHJcbmV4cG9ydHMuaWRUb1JhdGluZ0VudW0gPSBpZFRvUmF0aW5nRW51bTtcclxuLyoqIENhdGVnb3J5IG9mIHdvcmsgdG8gaWQgKi9cclxudmFyIENBVEVHT1JZO1xyXG4oZnVuY3Rpb24gKENBVEVHT1JZKSB7XHJcbiAgICBDQVRFR09SWVtDQVRFR09SWVtcImdlblwiXSA9IDIxXSA9IFwiZ2VuXCI7XHJcbiAgICBDQVRFR09SWVtDQVRFR09SWVtcImZtXCJdID0gMjJdID0gXCJmbVwiO1xyXG4gICAgQ0FURUdPUllbQ0FURUdPUllbXCJtbVwiXSA9IDIzXSA9IFwibW1cIjtcclxuICAgIENBVEVHT1JZW0NBVEVHT1JZW1wib3RoZXJcIl0gPSAyNF0gPSBcIm90aGVyXCI7XHJcbiAgICBDQVRFR09SWVtDQVRFR09SWVtcImZmXCJdID0gMTE2XSA9IFwiZmZcIjtcclxuICAgIENBVEVHT1JZW0NBVEVHT1JZW1wibXVsdGlcIl0gPSAyMjQ2XSA9IFwibXVsdGlcIjtcclxufSkoQ0FURUdPUlkgPSBleHBvcnRzLkNBVEVHT1JZIHx8IChleHBvcnRzLkNBVEVHT1JZID0ge30pKTtcclxuLyoqXHJcbiAqIFRha2VzIGNhdGVnb3J5IGlkIG9mIHdvcmsgYW5kIGNvbnZlcnRzIGl0IHRvIGFuIGVudW0gdmFsdWVcclxuICogQHBhcmFtIGlkIElkIG9mIGNhdGVnb3J5XHJcbiAqIEByZXR1cm5zIENBVEVHT1JZIGVudW0gY29udmVydGVkIGZyb20gaWRcclxuICovXHJcbmZ1bmN0aW9uIGlkVG9DYXRldG9yeUVudW0oaWQpIHtcclxuICAgIGlmIChpZCA9PSAyMSlcclxuICAgICAgICByZXR1cm4gQ0FURUdPUlkuZ2VuO1xyXG4gICAgZWxzZSBpZiAoaWQgPT0gMjIpXHJcbiAgICAgICAgcmV0dXJuIENBVEVHT1JZLmZtO1xyXG4gICAgZWxzZSBpZiAoaWQgPT0gMjMpXHJcbiAgICAgICAgcmV0dXJuIENBVEVHT1JZLm1tO1xyXG4gICAgZWxzZSBpZiAoaWQgPT0gMjQpXHJcbiAgICAgICAgcmV0dXJuIENBVEVHT1JZLm90aGVyO1xyXG4gICAgZWxzZSBpZiAoaWQgPT0gMTE2KVxyXG4gICAgICAgIHJldHVybiBDQVRFR09SWS5mZjtcclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gQ0FURUdPUlkubXVsdGk7XHJcbn1cclxuZXhwb3J0cy5pZFRvQ2F0ZXRvcnlFbnVtID0gaWRUb0NhdGV0b3J5RW51bTtcclxuLyoqIFdhcm5pbmdzIG9mIHdvcmsgdG8gaWQgKi9cclxudmFyIFdBUk5JTkc7XHJcbihmdW5jdGlvbiAoV0FSTklORykge1xyXG4gICAgV0FSTklOR1tXQVJOSU5HW1wiY2hvc2VOb3RUb1VzZVwiXSA9IDE0XSA9IFwiY2hvc2VOb3RUb1VzZVwiO1xyXG4gICAgV0FSTklOR1tXQVJOSU5HW1wibm9XYXJuaW5nc0FwcGx5XCJdID0gMTZdID0gXCJub1dhcm5pbmdzQXBwbHlcIjtcclxuICAgIFdBUk5JTkdbV0FSTklOR1tcInZpb2xlbmNlXCJdID0gMTddID0gXCJ2aW9sZW5jZVwiO1xyXG4gICAgV0FSTklOR1tXQVJOSU5HW1wibWNkXCJdID0gMThdID0gXCJtY2RcIjtcclxuICAgIFdBUk5JTkdbV0FSTklOR1tcIm5vbkNvblwiXSA9IDE5XSA9IFwibm9uQ29uXCI7XHJcbiAgICBXQVJOSU5HW1dBUk5JTkdbXCJ1bmRlcmFnZVwiXSA9IDIwXSA9IFwidW5kZXJhZ2VcIjtcclxufSkoV0FSTklORyA9IGV4cG9ydHMuV0FSTklORyB8fCAoZXhwb3J0cy5XQVJOSU5HID0ge30pKTtcclxuLyoqXHJcbiAqIFRha2VzIHdhcm5pbmcgaWQgb2Ygd29yayBhbmQgY29udmVydHMgaXQgdG8gYW4gZW51bSB2YWx1ZVxyXG4gKiBAcGFyYW0gaWQgSWQgb2Ygd2FybmluZ1xyXG4gKiBAcmV0dXJucyBXQVJOSU5HIGVudW0gY29udmVydGVkIGZyb20gaWRcclxuICovXHJcbmZ1bmN0aW9uIGlkVG9XYXJuaW5nRW51bShpZCkge1xyXG4gICAgaWYgKGlkID09IDE0KVxyXG4gICAgICAgIHJldHVybiBXQVJOSU5HLmNob3NlTm90VG9Vc2U7XHJcbiAgICBlbHNlIGlmIChpZCA9PSAxNilcclxuICAgICAgICByZXR1cm4gV0FSTklORy5ub1dhcm5pbmdzQXBwbHk7XHJcbiAgICBlbHNlIGlmIChpZCA9PSAxNylcclxuICAgICAgICByZXR1cm4gV0FSTklORy52aW9sZW5jZTtcclxuICAgIGVsc2UgaWYgKGlkID09IDE4KVxyXG4gICAgICAgIHJldHVybiBXQVJOSU5HLm1jZDtcclxuICAgIGVsc2UgaWYgKGlkID09IDE5KVxyXG4gICAgICAgIHJldHVybiBXQVJOSU5HLm5vbkNvbjtcclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gV0FSTklORy51bmRlcmFnZTtcclxufVxyXG5leHBvcnRzLmlkVG9XYXJuaW5nRW51bSA9IGlkVG9XYXJuaW5nRW51bTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uL2V4cG9ydC9jb25zdGFudHNcIik7XHJcbmNvbnN0IHJlZGlyZWN0XzEgPSByZXF1aXJlKFwiLi9yZWRpcmVjdFwiKTtcclxuLy8gKiBHbG9iYWwgdmFyaWFibGVzXHJcbmxldCBzZXR0aW5ncztcclxuLy8gKiBFeGVjdXRlZCBjb2RlIHN0YXJ0XHJcbi8vIFNldCBzZXR0aW5ncyB0byBiZSBjdXJyZW50bHkgc3RvcmVkIHNldHRpbmdzXHJcbmJyb3dzZXIuc3RvcmFnZS5sb2NhbC5nZXQoY29uc3RhbnRzXzEuU1RPUkFHRV9LRVlTKS50aGVuKCh2YWx1ZSkgPT4ge1xyXG4gICAgc2V0dGluZ3MgPSB2YWx1ZTtcclxufSk7XHJcbi8vICogRXhlY3V0ZWQgY29kZSBlbmRcclxuLy8gKiBMaXN0ZW5lcnNcclxuLy8gT3BlbiBvcHRpb24gbWVudSBvbiBicm93c2VyIGFjdGlvbiBpY29uIGNsaWNrXHJcbmJyb3dzZXIuYnJvd3NlckFjdGlvbi5vbkNsaWNrZWQuYWRkTGlzdGVuZXIob3Blbk9wdGlvbk1lbnUpO1xyXG4vLyBSZWRpcmVjdCBVUkxzIHRvIGZpbHRlciB3b3Jrc1xyXG5icm93c2VyLndlYlJlcXVlc3Qub25CZWZvcmVSZXF1ZXN0LmFkZExpc3RlbmVyKHJlZGlyZWN0LCB7XHJcbiAgICB1cmxzOiBjb25zdGFudHNfMS5SRURJUkVDVF9VUkxTLFxyXG4gICAgdHlwZXM6IFsnbWFpbl9mcmFtZSddXHJcbn0sIFsnYmxvY2tpbmcnXSk7XHJcbi8vIFN5bmNoIHNldHRpbmdzIG9uIHNldHRpbmdzIGNoYW5nZVxyXG5icm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlKSA9PiB7XHJcbiAgICBpZiAobWVzc2FnZSA9PSBjb25zdGFudHNfMS5TRVRUSU5HU19DSEFOR0VEKSB7XHJcbiAgICAgICAgLy8gR2V0IHNldHRpbmdzIGZyb20gc3RvcmFnZVxyXG4gICAgICAgIGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5nZXQoY29uc3RhbnRzXzEuU1RPUkFHRV9LRVlTKS50aGVuKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBzZXR0aW5ncyA9IHZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuLy8gKiBGdW5jdGlvbnNcclxuLyoqXHJcbiAqIFJlZGlyZWN0cyB1cmwgdG8gZmlsdGVyIGV4Y2x1ZGVkIHdvcmtzXHJcbiAqIEBwYXJhbSBkZXRhaWxzIFdlYiByZXF1ZXN0IGRldGFpbHNcclxuICogQHJldHVybnMgV2ViIHJlcXVlc3QgQmxvY2tpbmdSZXNwb25zZSBvYmplY3RcclxuICovXHJcbmZ1bmN0aW9uIHJlZGlyZWN0KGRldGFpbHMpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKGBBTzNFeHRlbnNpb246IGRldGFpbHMudXJsPSR7ZGV0YWlscy51cmx9YCk7IC8vIERFQlVHR0lOR1xyXG4gICAgbGV0IHVybCA9ICgwLCByZWRpcmVjdF8xLmdldFJlZGlyZWN0VVJMKShkZXRhaWxzLnVybCwgc2V0dGluZ3MpO1xyXG4gICAgLy8gY29uc29sZS5sb2coYEFPM0V4dGVuc2lvbjogdXJsPSR7dXJsfWApOyAvLyBERUJVR0dJTkdcclxuICAgIGlmICh1cmwgIT0gbnVsbClcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZWRpcmVjdFVybDogdXJsXHJcbiAgICAgICAgfTtcclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4ge307XHJcbn1cclxuLyoqXHJcbiAqIE9wZW5zIG9wdGlvbiBtZW51IGZvciBleHRlbnNpb25cclxuICovXHJcbmZ1bmN0aW9uIG9wZW5PcHRpb25NZW51KCkge1xyXG4gICAgYnJvd3Nlci50YWJzLmNyZWF0ZSh7XHJcbiAgICAgICAgdXJsOiBcIi9kaXN0L29wdGlvbnMvb3B0aW9ucy5odG1sXCJcclxuICAgIH0pO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==