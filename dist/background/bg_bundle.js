/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/redirect.ts":
/*!************************************!*\
  !*** ./src/background/redirect.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRedirectURL = void 0;
const constants_1 = __webpack_require__(/*! ../export/constants */ "./src/export/constants.ts");
/**
 * Redirect given url to url that filters excluded works
 * @param url Url to redirect
 * @param value Excluded works settings
 * @returns Url to redirect to, or null if url shouldn't be redirected
 */
function getRedirectURL(url, value) {
    let parsed = parseURL(url);
    let type = parsed[1];
    let origin;
    if (parsed[0] == 'tags')
        origin = constants_1.ORIGIN.TAGS;
    else if (parsed[0] == 'users')
        origin = constants_1.ORIGIN.USERS;
    else
        origin = constants_1.ORIGIN.COLLECTIONS;
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
    if (origin == constants_1.ORIGIN.COLLECTIONS)
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
exports.ORIGIN = exports.HIDE_URLS = exports.REDIRECT_URLS = exports.SETTINGS_CHANGED = exports.DEFAULT_VALUES = exports.STORAGE_KEYS = void 0;
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
/** Origin of page to redirect */
var ORIGIN;
(function (ORIGIN) {
    ORIGIN["COLLECTIONS"] = "collection_id=";
    ORIGIN["TAGS"] = "tag_id=";
    ORIGIN["USERS"] = "user_id=";
})(ORIGIN = exports.ORIGIN || (exports.ORIGIN = {}));


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsb0JBQW9CLG1CQUFPLENBQUMsc0RBQXFCO0FBQ2pELG1CQUFtQixtQkFBTyxDQUFDLGdEQUFZO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxZQUFZLElBQUk7QUFDaEU7QUFDQSx3Q0FBd0MsSUFBSSxJQUFJO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQvcmVkaXJlY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4cG9ydC9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9iYWNrZ3JvdW5kL2JhY2tncm91bmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5nZXRSZWRpcmVjdFVSTCA9IHZvaWQgMDtcclxuY29uc3QgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi4vZXhwb3J0L2NvbnN0YW50c1wiKTtcclxuLyoqXHJcbiAqIFJlZGlyZWN0IGdpdmVuIHVybCB0byB1cmwgdGhhdCBmaWx0ZXJzIGV4Y2x1ZGVkIHdvcmtzXHJcbiAqIEBwYXJhbSB1cmwgVXJsIHRvIHJlZGlyZWN0XHJcbiAqIEBwYXJhbSB2YWx1ZSBFeGNsdWRlZCB3b3JrcyBzZXR0aW5nc1xyXG4gKiBAcmV0dXJucyBVcmwgdG8gcmVkaXJlY3QgdG8sIG9yIG51bGwgaWYgdXJsIHNob3VsZG4ndCBiZSByZWRpcmVjdGVkXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRSZWRpcmVjdFVSTCh1cmwsIHZhbHVlKSB7XHJcbiAgICBsZXQgcGFyc2VkID0gcGFyc2VVUkwodXJsKTtcclxuICAgIGxldCB0eXBlID0gcGFyc2VkWzFdO1xyXG4gICAgbGV0IG9yaWdpbjtcclxuICAgIGlmIChwYXJzZWRbMF0gPT0gJ3RhZ3MnKVxyXG4gICAgICAgIG9yaWdpbiA9IGNvbnN0YW50c18xLk9SSUdJTi5UQUdTO1xyXG4gICAgZWxzZSBpZiAocGFyc2VkWzBdID09ICd1c2VycycpXHJcbiAgICAgICAgb3JpZ2luID0gY29uc3RhbnRzXzEuT1JJR0lOLlVTRVJTO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIG9yaWdpbiA9IGNvbnN0YW50c18xLk9SSUdJTi5DT0xMRUNUSU9OUztcclxuICAgIGxldCBpZCA9IHBhcnNlZFsyXTtcclxuICAgIGxldCByYXRpbmcgPSBbXTtcclxuICAgIGxldCB3YXJuaW5nID0gW107XHJcbiAgICBsZXQgY2F0ZWdvcnkgPSBbXTtcclxuICAgIGxldCB0YWcgPSBbXTtcclxuICAgIGxldCBjcm9zc292ZXIgPSBcIlwiO1xyXG4gICAgbGV0IGNvbXBsZXRlID0gXCJcIjtcclxuICAgIGxldCB3b3JkQ291bnQgPSBbXTtcclxuICAgIGxldCBkYXRlID0gW107XHJcbiAgICBsZXQgcXVlcnkgPSBcIlwiO1xyXG4gICAgbGV0IGxhbmd1YWdlID0gXCJcIjtcclxuICAgIC8vIEdldCBleGNsdWRlIGRhdGEgZnJvbSBsb2NhbCBzdG9yYWdlXHJcbiAgICBpZiAodmFsdWUubGFuZ3VhZ2UgIT0gdW5kZWZpbmVkICYmIHZhbHVlLmxhbmd1YWdlWzBdKVxyXG4gICAgICAgIGxhbmd1YWdlID0gdmFsdWUubGFuZ3VhZ2VbMV07XHJcbiAgICBpZiAodmFsdWUucXVlcnkgIT0gdW5kZWZpbmVkICYmIHZhbHVlLnF1ZXJ5WzBdKVxyXG4gICAgICAgIHF1ZXJ5ID0gdmFsdWUucXVlcnlbMV07XHJcbiAgICBpZiAodmFsdWUudGFncyAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgdGFnID0gdmFsdWUudGFncztcclxuICAgIGlmICh2YWx1ZS53YXJuaW5ncyAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgd2FybmluZyA9IHZhbHVlLndhcm5pbmdzO1xyXG4gICAgbGV0IHJlZGlyZWN0VXJsID0gY29uc3RydWN0UmVkaXJlY3RVUkxIZWxwZXIob3JpZ2luLCB0eXBlLCBpZCwgcmF0aW5nLCB3YXJuaW5nLCBjYXRlZ29yeSwgdGFnLCBjcm9zc292ZXIsIGNvbXBsZXRlLCB3b3JkQ291bnQsIGRhdGUsIHF1ZXJ5LCBsYW5ndWFnZSk7XHJcbiAgICBpZiAocmVkaXJlY3RVcmwgIT0gbnVsbCkge1xyXG4gICAgICAgIHJlZGlyZWN0VXJsICs9IHBhcnNlZFszXS5sZW5ndGggPT0gMCA/IFwiXCIgOiBcIiZcIiArIHBhcnNlZFszXTtcclxuICAgICAgICByZXR1cm4gcmVkaXJlY3RVcmw7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbn1cclxuZXhwb3J0cy5nZXRSZWRpcmVjdFVSTCA9IGdldFJlZGlyZWN0VVJMO1xyXG4vKipcclxuICogUmV0dXJucyByZWRpcmVjdCBVUkwgdG8gY29udGFpbiBleGNsdWRlZCB0YWdzLCBvdmVycmlkaW5nIHRoZSBwcmV2aW91cyBVUkwncyBoaXN0b3J5XHJcbiAqIEBwYXJhbSBvcmlnaW4gT3JpZ2luIG9mIGRvY3VtZW50XHJcbiAqIEBwYXJhbSB0eXBlIFR5cGUgb2Ygd29ya3MgYmVpbmcgc2hvd24gKCd3b3JrJyBvciAnYm9va21hcmsnKVxyXG4gKiBAcGFyYW0gaWQgSUQgb2YgdGhlIHVybCB0byByZWRpcmVjdFxyXG4gKiBAcGFyYW0gZXhjbHVkZVJhdGluZ3MgSUQgb2YgcmF0aW5ncyB0byBleGNsdWRlXHJcbiAqIEBwYXJhbSBleGNsdWRlV2FybmluZ3MgSUQgb2Ygd2FybmluZ3MgdG8gZXhjbHVkZVxyXG4gKiBAcGFyYW0gZXhjbHVkZUNhdGVnb3JpZXMgSUQgb2YgY2F0ZWdvcmllcyB0byBleGNsdWRlXHJcbiAqIEBwYXJhbSBleGNsdWRlVGFncyBUYWdzIHRvIGV4Y2x1ZGVcclxuICogQHBhcmFtIGNyb3Nzb3ZlckJvb2wgSW5jbHVkZSwgZXhjbHVkZSwgb3IgZXhjbHVzaXZlbHkgc2hvdyBjcm9zc292ZXIgd29ya3NcclxuICogQHBhcmFtIGNvbXBsZXRlQm9vbCBJbmNsdWRlLCBleGNsdWRlLCBvciBleGNsdXNpdmVseSBzaG93IGNvbXBsZXRlIHdvcmtzXHJcbiAqIEBwYXJhbSB3b3JkQ291bnROdW1zIExpbWl0IHdvcmtzIHRvIGdpdmVuIHdvcmQgY291bnQgaW50ZXJ2YWxcclxuICogQHBhcmFtIGRhdGVBcnIgTGltaXQgd29ya3MgdG8gZ2l2ZW4gZGF0ZSBpbnRlcnZhbFxyXG4gKiBAcGFyYW0gcXVlcnkgUXVlcnkgd2l0aGluIHJlc3VsdHNcclxuICogQHBhcmFtIGxhbmd1YWdlSWQgSUQgb2YgbGFuZ3VhZ2UgdG8gbGltaXQgd29ya3MgdG9cclxuICogQHJldHVybnMgVVJMIHRvIHJlZGlyZWN0IHRvXHJcbiAqL1xyXG5mdW5jdGlvbiBjb25zdHJ1Y3RSZWRpcmVjdFVSTEhlbHBlcihvcmlnaW4sIHR5cGUsIGlkLCBleGNsdWRlUmF0aW5ncyA9IFtdLCBleGNsdWRlV2FybmluZ3MgPSBbXSwgZXhjbHVkZUNhdGVnb3JpZXMgPSBbXSwgZXhjbHVkZVRhZ3MgPSBbXSwgY3Jvc3NvdmVyQm9vbCA9IFwiXCIsIGNvbXBsZXRlQm9vbCA9IFwiXCIsIHdvcmRDb3VudE51bXMgPSBbXSwgZGF0ZUFyciA9IFtdLCBxdWVyeSA9IFwiXCIsIGxhbmd1YWdlSWQgPSBcIlwiKSB7XHJcbiAgICAvLyBDb25zdHJ1Y3QgZXhjbHVkZSB1cmwgcXVlcmllc1xyXG4gICAgbGV0IHJhdGluZ3MgPSBcIlwiO1xyXG4gICAgZXhjbHVkZVJhdGluZ3MgPT09IG51bGwgfHwgZXhjbHVkZVJhdGluZ3MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGV4Y2x1ZGVSYXRpbmdzLmZvckVhY2goKHIpID0+IHJhdGluZ3MgKz0gYGV4Y2x1ZGVfJHt0eXBlfV9zZWFyY2hbcmF0aW5nX2lkc11bXT0ke3IudmFsdWVPZigpfSZgKTtcclxuICAgIGxldCBhcmNoaXZlV2FybmluZ3MgPSBcIlwiO1xyXG4gICAgZXhjbHVkZVdhcm5pbmdzID09PSBudWxsIHx8IGV4Y2x1ZGVXYXJuaW5ncyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXhjbHVkZVdhcm5pbmdzLmZvckVhY2goKHcpID0+IGFyY2hpdmVXYXJuaW5ncyArPSBgZXhjbHVkZV8ke3R5cGV9X3NlYXJjaFthcmNoaXZlX3dhcm5pbmdfaWRzXVtdPSR7dy52YWx1ZU9mKCl9JmApO1xyXG4gICAgbGV0IGNhdGVnb3JpZXMgPSBcIlwiO1xyXG4gICAgZXhjbHVkZUNhdGVnb3JpZXMgPT09IG51bGwgfHwgZXhjbHVkZUNhdGVnb3JpZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGV4Y2x1ZGVDYXRlZ29yaWVzLmZvckVhY2goKGMpID0+IGNhdGVnb3JpZXMgKz0gYGV4Y2x1ZGVfJHt0eXBlfV9zZWFyY2hbY2F0ZWdvcnlfaWRzXVtdPSR7Yy52YWx1ZU9mKCl9JmApO1xyXG4gICAgbGV0IHRhZ3MgPSBgJHt0eXBlfV9zZWFyY2hbZXhjbHVkZWRfdGFnX25hbWVzXT1gO1xyXG4gICAgZXhjbHVkZVRhZ3MgPT09IG51bGwgfHwgZXhjbHVkZVRhZ3MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGV4Y2x1ZGVUYWdzLmZvckVhY2goKHQpID0+IHRhZ3MgKz0gYCR7dC52YWx1ZU9mKCl9LGApO1xyXG4gICAgaWYgKGV4Y2x1ZGVUYWdzLmxlbmd0aCA+IDApXHJcbiAgICAgICAgdGFncyA9IHRhZ3Muc3Vic3RyaW5nKDAsIHRhZ3MubGVuZ3RoIC0gMSkgKyBcIiZcIjtcclxuICAgIGVsc2VcclxuICAgICAgICB0YWdzID0gXCJcIjtcclxuICAgIGxldCBjcm9zc292ZXIgPSBcIlwiO1xyXG4gICAgaWYgKGNyb3Nzb3ZlckJvb2wgIT0gXCJcIikge1xyXG4gICAgICAgIGNyb3Nzb3ZlciA9IGAke3R5cGV9X3NlYXJjaFtjcm9zc292ZXJdPSR7Y3Jvc3NvdmVyQm9vbH0mYDtcclxuICAgIH1cclxuICAgIGxldCBjb21wbGV0ZSA9IFwiXCI7XHJcbiAgICBpZiAoY29tcGxldGVCb29sICE9IFwiXCIpIHtcclxuICAgICAgICBjb21wbGV0ZSA9IGAke3R5cGV9X3NlYXJjaFtjb21wbGV0ZV09JHtjb21wbGV0ZUJvb2x9JmA7XHJcbiAgICB9XHJcbiAgICBsZXQgd29yZENvdW50ID0gXCJcIjtcclxuICAgIGlmICh3b3JkQ291bnROdW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBpZiAod29yZENvdW50TnVtc1swXSAhPSBudWxsKVxyXG4gICAgICAgICAgICB3b3JkQ291bnQgKz0gYCR7dHlwZX1fc2VhcmNoW3dvcmRzX2Zyb21dPSR7d29yZENvdW50TnVtc1swXX0mYDtcclxuICAgICAgICBpZiAod29yZENvdW50TnVtc1sxXSAhPSBudWxsKVxyXG4gICAgICAgICAgICB3b3JkQ291bnQgKz0gYCR7dHlwZX1fc2VhcmNoW3dvcmRzX3RvXT0ke3dvcmRDb3VudE51bXNbMV19JmA7XHJcbiAgICB9XHJcbiAgICBsZXQgZGF0ZSA9IFwiXCI7XHJcbiAgICBpZiAoZGF0ZUFyci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgaWYgKGRhdGVBcnJbMF0gIT0gbnVsbClcclxuICAgICAgICAgICAgZGF0ZSArPSBgJHt0eXBlfV9zZWFyY2hbZGF0ZV9mcm9tXT0ke2RhdGVBcnJbMF19JmA7XHJcbiAgICAgICAgaWYgKGRhdGVBcnJbMV0gIT0gbnVsbClcclxuICAgICAgICAgICAgZGF0ZSArPSBgJHt0eXBlfV9zZWFyY2hbZGF0ZV90b109JHtkYXRlQXJyWzFdfSZgO1xyXG4gICAgfVxyXG4gICAgbGV0IHNlYXJjaFdpdGhpblJlc3VsdHMgPSBxdWVyeSA9PSBcIlwiID8gXCJcIiA6IGAke3R5cGV9X3NlYXJjaFske3R5cGUgPT0gJ2Jvb2ttYXJrJyA/ICdib29rbWFya2FibGVfJyA6IFwiXCJ9cXVlcnldPSR7cXVlcnl9JmA7XHJcbiAgICBsZXQgbGFuZ3VhZ2UgPSBsYW5ndWFnZUlkID09IFwiXCIgPyBcIlwiIDogYCR7dHlwZX1fc2VhcmNoW2xhbmd1YWdlX2lkXT0ke2xhbmd1YWdlSWR9JmA7XHJcbiAgICAvLyBDb25zdHJ1Y3QgZnVsbCB1cmxcclxuICAgIGlmIChyYXRpbmdzLmxlbmd0aCA9PSAwICYmIGFyY2hpdmVXYXJuaW5ncy5sZW5ndGggPT0gMCAmJiBjYXRlZ29yaWVzLmxlbmd0aCA9PSAwICYmIHRhZ3MubGVuZ3RoID09IDAgJiYgY3Jvc3NvdmVyLmxlbmd0aCA9PSAwICYmIHdvcmRDb3VudC5sZW5ndGggPT0gMCAmJiBkYXRlLmxlbmd0aCA9PSAwICYmIHNlYXJjaFdpdGhpblJlc3VsdHMubGVuZ3RoID09IDAgJiYgbGFuZ3VhZ2UubGVuZ3RoID09IDApXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICBsZXQgcmVkaXJlY3QgPSBgJHt0eXBlfXM/JHtyYXRpbmdzfSR7YXJjaGl2ZVdhcm5pbmdzfSR7Y2F0ZWdvcmllc30ke3RhZ3N9JHtjcm9zc292ZXJ9JHtjb21wbGV0ZX0ke3dvcmRDb3VudH0ke2RhdGV9JHtzZWFyY2hXaXRoaW5SZXN1bHRzfSR7bGFuZ3VhZ2V9Y29tbWl0PVNvcnQrYW5kK0ZpbHRlciYke29yaWdpbi52YWx1ZU9mKCl9JHtpZH1gO1xyXG4gICAgaWYgKG9yaWdpbiA9PSBjb25zdGFudHNfMS5PUklHSU4uQ09MTEVDVElPTlMpXHJcbiAgICAgICAgcmVkaXJlY3QgPSBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL2NvbGxlY3Rpb25zLyR7aWR9L2AgKyByZWRpcmVjdDtcclxuICAgIGVsc2VcclxuICAgICAgICByZWRpcmVjdCA9IGBodHRwczovL2FyY2hpdmVvZm91cm93bi5vcmcvYCArIHJlZGlyZWN0O1xyXG4gICAgcmV0dXJuIHJlZGlyZWN0O1xyXG59XHJcbi8qKlxyXG4gKiBQYXJzZXMgYW4gQU8zIHVybCBhbmQgcmV0dXJucyBpdHMgb3JpZ2luLCBzZWFyY2ggdHlwZSwgYW5kIGlkLlxyXG4gKiBAcGFyYW0gYmFzZVVSTCBVUkwgdG8gYmUgcGFyc2VkLlxyXG4gKiBAcmV0dXJucyBvcmlnaW46J3RhZ3MnLCAndXNlcnMnLCBvciAnY29sbGVjdGlvbnMuJ1xyXG4gKiBAcmV0dXJucyBzZWFyY2hUeXBlOiAnd29ya3MnIG9yICdib29rbWFya3MuJ1xyXG4gKiBAcmV0dXJucyBpZDogaWQgb2YgZmFuZG9tIChpZiBvcmlnaW49J3dvcmtzJyksIGlkIG9mIHVzZXIgKGlmIG9yaWdpbj0nYm9va21hcmtzKSwgb3IgaWQgb2YgY29sbGVjdGlvbiAoaWYgb3JpZ2luPSdjb2xsZWN0aW9ucycpLlxyXG4gKiBAcmV0dXJucyBleHRyYUlkOiBFeHRyYSBpZHMgaW4gVVJMcywgb3IgZW1wdHkgc3RyaW5nIGlmIG5vIGV4dHJhIGlkLiBSZXR1cm5lZCBhcyBmdWxsIGlkIHdpdGggZGVmaW5pdGlvbiAoRXg6IFwiZmFuZG9tX2lkPTEyMzQxMjNcIikuXHJcbiAqL1xyXG5mdW5jdGlvbiBwYXJzZVVSTChiYXNlVVJMKSB7XHJcbiAgICBsZXQgc3BsaXQgPSBiYXNlVVJMLnNwbGl0KCcvJyk7XHJcbiAgICBsZXQgZW5kID0gc3BsaXRbc3BsaXQubGVuZ3RoIC0gMV0uc3BsaXQoXCI/XCIpO1xyXG4gICAgaWYgKHNwbGl0Lmxlbmd0aCA+IDYpIHtcclxuICAgICAgICBpZiAoc3BsaXRbNV0gPT0gXCJwc2V1ZHNcIiAmJiBzcGxpdFs0XSAhPSBzcGxpdFs2XSlcclxuICAgICAgICAgICAgcmV0dXJuIFtzcGxpdFszXSwgZW5kWzBdLnN1YnN0cmluZygwLCBlbmRbMF0ubGVuZ3RoIC0gMSksIHNwbGl0WzRdLCBgcHNldWRfaWQ9JHtzcGxpdFs2XX1gICsgKGVuZC5sZW5ndGggPiAxID8gYCYke2VuZFsxXX1gIDogXCJcIildO1xyXG4gICAgICAgIGVsc2UgaWYgKHNwbGl0WzNdID09ICdjb2xsZWN0aW9ucycpXHJcbiAgICAgICAgICAgIHJldHVybiBbc3BsaXRbM10sIGVuZFswXS5zdWJzdHJpbmcoMCwgZW5kWzBdLmxlbmd0aCAtIDEpLCBzcGxpdFs0XSwgYHRhZ19pZD0ke3NwbGl0WzZdfWAgKyAoZW5kLmxlbmd0aCA+IDEgPyBgJiR7ZW5kWzFdfWAgOiBcIlwiKV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW3NwbGl0WzNdLCBlbmRbMF0uc3Vic3RyaW5nKDAsIGVuZFswXS5sZW5ndGggLSAxKSwgc3BsaXRbc3BsaXQubGVuZ3RoIC0gMl0sIGVuZC5sZW5ndGggPiAxID8gZW5kWzFdIDogXCJcIl07XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5PUklHSU4gPSBleHBvcnRzLkhJREVfVVJMUyA9IGV4cG9ydHMuUkVESVJFQ1RfVVJMUyA9IGV4cG9ydHMuU0VUVElOR1NfQ0hBTkdFRCA9IGV4cG9ydHMuREVGQVVMVF9WQUxVRVMgPSBleHBvcnRzLlNUT1JBR0VfS0VZUyA9IHZvaWQgMDtcclxuLy8gU3RvcmFnZSBrZXlzXHJcbmV4cG9ydHMuU1RPUkFHRV9LRVlTID0gW1xyXG4gICAgXCJrdWRvc0hpdFJhdGlvXCIsIFwiZmlsdGVyaW5nXCIsIFwibGFuZ3VhZ2VcIiwgXCJxdWVyeVwiLCBcInRhZ3NcIiwgXCJ3YXJuaW5nc1wiXHJcbl07XHJcbi8vIERlZmF1bHQgdmFsdWVzXHJcbmV4cG9ydHMuREVGQVVMVF9WQUxVRVMgPSB7XHJcbiAgICBrdWRvc0hpdFJhdGlvOiB0cnVlLFxyXG4gICAgZmlsdGVyaW5nOiBmYWxzZSxcclxuICAgIGxhbmd1YWdlOiBbZmFsc2UsIFwiXCJdLFxyXG4gICAgcXVlcnk6IFtmYWxzZSwgXCJcIl0sXHJcbiAgICB0YWdzOiBbXSxcclxuICAgIHdhcm5pbmdzOiBbXVxyXG59O1xyXG4vLyBTZXR0aW5ncyBjaGFuZ2VkIG1lc3NhZ2VcclxuZXhwb3J0cy5TRVRUSU5HU19DSEFOR0VEID0gXCJzZXR0aW5nc19jaGFuZ2VkXCI7XHJcbi8qKiBSZWRpcmVjdCB0aGVzZSBVUkxzIHRvIGZpbHRlciB3b3JrcyB3aXRoIGV4Y2x1ZGVkIHN0dWZmICovXHJcbmV4cG9ydHMuUkVESVJFQ1RfVVJMUyA9IFtcclxuICAgIGBodHRwczovL2FyY2hpdmVvZm91cm93bi5vcmcvdGFncy8qL3dvcmtzYCxcclxuICAgIGBodHRwczovL2FyY2hpdmVvZm91cm93bi5vcmcvdGFncy8qL2Jvb2ttYXJrc2AsXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL3VzZXJzLyovd29ya3MqYCxcclxuICAgIGBodHRwczovL2FyY2hpdmVvZm91cm93bi5vcmcvdXNlcnMvKi9ib29rbWFya3MqYCxcclxuICAgIGBodHRwczovL2FyY2hpdmVvZm91cm93bi5vcmcvY29sbGVjdGlvbnMvKi93b3Jrc2AsXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL2NvbGxlY3Rpb25zLyovYm9va21hcmtzYCAvLyBDb2xsZWN0aW9uJ3MgYm9va21hcmtzXHJcbl07XHJcbi8qKiBDYW5ub3QgcmVkaXJlY3QgdGhlc2UgVVJMcywgbmVlZCB0byBoaWRlIHdvcmtzIHdpdGggZXhjbHVkZWQgc3R1ZmYgKi9cclxuZXhwb3J0cy5ISURFX1VSTFMgPSBbXHJcbiAgICBgaHR0cHM6XFwvXFwvYXJjaGl2ZW9mb3Vyb3duXFwub3JnXFwvdXNlcnNcXC9gLFxyXG4gICAgYGh0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL3VzZXJzXFwvLipcXC9zZXJpZXNgLFxyXG4gICAgYGh0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL3VzZXJzXFwvLipcXC9naWZ0c2AsXHJcbiAgICBgaHR0cHM6XFwvXFwvYXJjaGl2ZW9mb3Vyb3duXFwub3JnXFwvY29sbGVjdGlvbnNcXC8uKlxcL3Nlcmllc2AsIC8vIENvbGxlY3Rpb24ncyBzZXJpZXNcclxuXTtcclxuLyoqIE9yaWdpbiBvZiBwYWdlIHRvIHJlZGlyZWN0ICovXHJcbnZhciBPUklHSU47XHJcbihmdW5jdGlvbiAoT1JJR0lOKSB7XHJcbiAgICBPUklHSU5bXCJDT0xMRUNUSU9OU1wiXSA9IFwiY29sbGVjdGlvbl9pZD1cIjtcclxuICAgIE9SSUdJTltcIlRBR1NcIl0gPSBcInRhZ19pZD1cIjtcclxuICAgIE9SSUdJTltcIlVTRVJTXCJdID0gXCJ1c2VyX2lkPVwiO1xyXG59KShPUklHSU4gPSBleHBvcnRzLk9SSUdJTiB8fCAoZXhwb3J0cy5PUklHSU4gPSB7fSkpO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi4vZXhwb3J0L2NvbnN0YW50c1wiKTtcclxuY29uc3QgcmVkaXJlY3RfMSA9IHJlcXVpcmUoXCIuL3JlZGlyZWN0XCIpO1xyXG4vLyAqIEdsb2JhbCB2YXJpYWJsZXNcclxubGV0IHNldHRpbmdzO1xyXG4vLyAqIEV4ZWN1dGVkIGNvZGUgc3RhcnRcclxuLy8gU2V0IHNldHRpbmdzIHRvIGJlIGN1cnJlbnRseSBzdG9yZWQgc2V0dGluZ3NcclxuYnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldChjb25zdGFudHNfMS5TVE9SQUdFX0tFWVMpLnRoZW4oKHZhbHVlKSA9PiB7XHJcbiAgICBzZXR0aW5ncyA9IHZhbHVlO1xyXG59KTtcclxuLy8gKiBFeGVjdXRlZCBjb2RlIGVuZFxyXG4vLyAqIExpc3RlbmVyc1xyXG4vLyBPcGVuIG9wdGlvbiBtZW51IG9uIGJyb3dzZXIgYWN0aW9uIGljb24gY2xpY2tcclxuYnJvd3Nlci5icm93c2VyQWN0aW9uLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihvcGVuT3B0aW9uTWVudSk7XHJcbi8vIFJlZGlyZWN0IFVSTHMgdG8gZmlsdGVyIHdvcmtzXHJcbmJyb3dzZXIud2ViUmVxdWVzdC5vbkJlZm9yZVJlcXVlc3QuYWRkTGlzdGVuZXIocmVkaXJlY3QsIHtcclxuICAgIHVybHM6IGNvbnN0YW50c18xLlJFRElSRUNUX1VSTFMsXHJcbiAgICB0eXBlczogWydtYWluX2ZyYW1lJ11cclxufSwgWydibG9ja2luZyddKTtcclxuLy8gU3luY2ggc2V0dGluZ3Mgb24gc2V0dGluZ3MgY2hhbmdlXHJcbmJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UpID0+IHtcclxuICAgIGlmIChtZXNzYWdlID09IGNvbnN0YW50c18xLlNFVFRJTkdTX0NIQU5HRUQpIHtcclxuICAgICAgICAvLyBHZXQgc2V0dGluZ3MgZnJvbSBzdG9yYWdlXHJcbiAgICAgICAgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldChjb25zdGFudHNfMS5TVE9SQUdFX0tFWVMpLnRoZW4oKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHNldHRpbmdzID0gdmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG4vLyAqIEZ1bmN0aW9uc1xyXG4vKipcclxuICogUmVkaXJlY3RzIHVybCB0byBmaWx0ZXIgZXhjbHVkZWQgd29ya3NcclxuICogQHBhcmFtIGRldGFpbHMgV2ViIHJlcXVlc3QgZGV0YWlsc1xyXG4gKiBAcmV0dXJucyBXZWIgcmVxdWVzdCBCbG9ja2luZ1Jlc3BvbnNlIG9iamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gcmVkaXJlY3QoZGV0YWlscykge1xyXG4gICAgLy8gY29uc29sZS5sb2coYEFPM0V4dGVuc2lvbjogZGV0YWlscy51cmw9JHtkZXRhaWxzLnVybH1gKTsgLy8gREVCVUdHSU5HXHJcbiAgICBsZXQgdXJsID0gKDAsIHJlZGlyZWN0XzEuZ2V0UmVkaXJlY3RVUkwpKGRldGFpbHMudXJsLCBzZXR0aW5ncyk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhgQU8zRXh0ZW5zaW9uOiB1cmw9JHt1cmx9YCk7IC8vIERFQlVHR0lOR1xyXG4gICAgaWYgKHVybCAhPSBudWxsKVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlZGlyZWN0VXJsOiB1cmxcclxuICAgICAgICB9O1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHJldHVybiB7fTtcclxufVxyXG4vKipcclxuICogT3BlbnMgb3B0aW9uIG1lbnUgZm9yIGV4dGVuc2lvblxyXG4gKi9cclxuZnVuY3Rpb24gb3Blbk9wdGlvbk1lbnUoKSB7XHJcbiAgICBicm93c2VyLnRhYnMuY3JlYXRlKHtcclxuICAgICAgICB1cmw6IFwiL2Rpc3Qvb3B0aW9ucy9vcHRpb25zLmh0bWxcIlxyXG4gICAgfSk7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9