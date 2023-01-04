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
    "kudosHitRatio", "language", "query", "tags", "warnings"
];
// Default values
exports.DEFAULT_VALUES = {
    kudosHitRatio: true,
    language: [false, ""],
    query: [false, ""],
    tags: [],
    warnings: []
};
// Settings changed message
exports.SETTINGS_CHANGED = "settings_changed";
/**
 * Redirect these URLs to filter works with excluded stuff
 */
exports.REDIRECT_URLS = [
    `https://archiveofourown.org/tags/*/works`,
    `https://archiveofourown.org/tags/*/bookmarks`,
    `https://archiveofourown.org/users/*/works*`,
    `https://archiveofourown.org/users/*/bookmarks*`,
    `https://archiveofourown.org/collections/*/works`,
    `https://archiveofourown.org/collections/*/bookmarks` // Collection's bookmarks
];
/**
 * Cannot redirect these URLs, need to hide works with excluded stuff
 */
exports.HIDE_URLS = [
    `https:\/\/archiveofourown\.org\/users\/`,
    `https:\/\/archiveofourown\.org\/users\/.*\/series`,
    `https:\/\/archiveofourown\.org\/users\/.*\/gifts`,
    `https:\/\/archiveofourown\.org\/collections\/.*\/series`, // Collection's series
];
/**
 * Origin of page to redirect
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG9CQUFvQixtQkFBTyxDQUFDLHNEQUFxQjtBQUNqRCxtQkFBbUIsbUJBQU8sQ0FBQyxnREFBWTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsWUFBWSxJQUFJO0FBQ2hFO0FBQ0Esd0NBQXdDLElBQUksSUFBSTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZ3JvdW5kL3JlZGlyZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9leHBvcnQvY29uc3RhbnRzLnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZ2V0UmVkaXJlY3RVUkwgPSB2b2lkIDA7XHJcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uL2V4cG9ydC9jb25zdGFudHNcIik7XHJcbi8qKlxyXG4gKiBSZWRpcmVjdCBnaXZlbiB1cmwgdG8gdXJsIHRoYXQgZmlsdGVycyBleGNsdWRlZCB3b3Jrc1xyXG4gKiBAcGFyYW0gdXJsIFVybCB0byByZWRpcmVjdFxyXG4gKiBAcGFyYW0gdmFsdWUgRXhjbHVkZWQgd29ya3Mgc2V0dGluZ3NcclxuICogQHJldHVybnMgVXJsIHRvIHJlZGlyZWN0IHRvLCBvciBudWxsIGlmIHVybCBzaG91bGRuJ3QgYmUgcmVkaXJlY3RlZFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UmVkaXJlY3RVUkwodXJsLCB2YWx1ZSkge1xyXG4gICAgbGV0IHBhcnNlZCA9IHBhcnNlVVJMKHVybCk7XHJcbiAgICBsZXQgdHlwZSA9IHBhcnNlZFsxXTtcclxuICAgIGxldCBvcmlnaW47XHJcbiAgICBpZiAocGFyc2VkWzBdID09ICd0YWdzJylcclxuICAgICAgICBvcmlnaW4gPSBjb25zdGFudHNfMS5PUklHSU4uVEFHUztcclxuICAgIGVsc2UgaWYgKHBhcnNlZFswXSA9PSAndXNlcnMnKVxyXG4gICAgICAgIG9yaWdpbiA9IGNvbnN0YW50c18xLk9SSUdJTi5VU0VSUztcclxuICAgIGVsc2VcclxuICAgICAgICBvcmlnaW4gPSBjb25zdGFudHNfMS5PUklHSU4uQ09MTEVDVElPTlM7XHJcbiAgICBsZXQgaWQgPSBwYXJzZWRbMl07XHJcbiAgICBsZXQgcmF0aW5nID0gW107XHJcbiAgICBsZXQgd2FybmluZyA9IFtdO1xyXG4gICAgbGV0IGNhdGVnb3J5ID0gW107XHJcbiAgICBsZXQgdGFnID0gW107XHJcbiAgICBsZXQgY3Jvc3NvdmVyID0gXCJcIjtcclxuICAgIGxldCBjb21wbGV0ZSA9IFwiXCI7XHJcbiAgICBsZXQgd29yZENvdW50ID0gW107XHJcbiAgICBsZXQgZGF0ZSA9IFtdO1xyXG4gICAgbGV0IHF1ZXJ5ID0gXCJcIjtcclxuICAgIGxldCBsYW5ndWFnZSA9IFwiXCI7XHJcbiAgICAvLyBHZXQgZXhjbHVkZSBkYXRhIGZyb20gbG9jYWwgc3RvcmFnZVxyXG4gICAgaWYgKHZhbHVlLmxhbmd1YWdlICE9IHVuZGVmaW5lZCAmJiB2YWx1ZS5sYW5ndWFnZVswXSlcclxuICAgICAgICBsYW5ndWFnZSA9IHZhbHVlLmxhbmd1YWdlWzFdO1xyXG4gICAgaWYgKHZhbHVlLnF1ZXJ5ICE9IHVuZGVmaW5lZCAmJiB2YWx1ZS5xdWVyeVswXSlcclxuICAgICAgICBxdWVyeSA9IHZhbHVlLnF1ZXJ5WzFdO1xyXG4gICAgaWYgKHZhbHVlLnRhZ3MgIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHRhZyA9IHZhbHVlLnRhZ3M7XHJcbiAgICBpZiAodmFsdWUud2FybmluZ3MgIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHdhcm5pbmcgPSB2YWx1ZS53YXJuaW5ncztcclxuICAgIGxldCByZWRpcmVjdFVybCA9IGNvbnN0cnVjdFJlZGlyZWN0VVJMSGVscGVyKG9yaWdpbiwgdHlwZSwgaWQsIHJhdGluZywgd2FybmluZywgY2F0ZWdvcnksIHRhZywgY3Jvc3NvdmVyLCBjb21wbGV0ZSwgd29yZENvdW50LCBkYXRlLCBxdWVyeSwgbGFuZ3VhZ2UpO1xyXG4gICAgaWYgKHJlZGlyZWN0VXJsICE9IG51bGwpIHtcclxuICAgICAgICByZWRpcmVjdFVybCArPSBwYXJzZWRbM10ubGVuZ3RoID09IDAgPyBcIlwiIDogXCImXCIgKyBwYXJzZWRbM107XHJcbiAgICAgICAgcmV0dXJuIHJlZGlyZWN0VXJsO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG59XHJcbmV4cG9ydHMuZ2V0UmVkaXJlY3RVUkwgPSBnZXRSZWRpcmVjdFVSTDtcclxuLyoqXHJcbiAqIFJldHVybnMgcmVkaXJlY3QgVVJMIHRvIGNvbnRhaW4gZXhjbHVkZWQgdGFncywgb3ZlcnJpZGluZyB0aGUgcHJldmlvdXMgVVJMJ3MgaGlzdG9yeVxyXG4gKiBAcGFyYW0gb3JpZ2luIE9yaWdpbiBvZiBkb2N1bWVudFxyXG4gKiBAcGFyYW0gdHlwZSBUeXBlIG9mIHdvcmtzIGJlaW5nIHNob3duICgnd29yaycgb3IgJ2Jvb2ttYXJrJylcclxuICogQHBhcmFtIGlkIElEIG9mIHRoZSB1cmwgdG8gcmVkaXJlY3RcclxuICogQHBhcmFtIGV4Y2x1ZGVSYXRpbmdzIElEIG9mIHJhdGluZ3MgdG8gZXhjbHVkZVxyXG4gKiBAcGFyYW0gZXhjbHVkZVdhcm5pbmdzIElEIG9mIHdhcm5pbmdzIHRvIGV4Y2x1ZGVcclxuICogQHBhcmFtIGV4Y2x1ZGVDYXRlZ29yaWVzIElEIG9mIGNhdGVnb3JpZXMgdG8gZXhjbHVkZVxyXG4gKiBAcGFyYW0gZXhjbHVkZVRhZ3MgVGFncyB0byBleGNsdWRlXHJcbiAqIEBwYXJhbSBjcm9zc292ZXJCb29sIEluY2x1ZGUsIGV4Y2x1ZGUsIG9yIGV4Y2x1c2l2ZWx5IHNob3cgY3Jvc3NvdmVyIHdvcmtzXHJcbiAqIEBwYXJhbSBjb21wbGV0ZUJvb2wgSW5jbHVkZSwgZXhjbHVkZSwgb3IgZXhjbHVzaXZlbHkgc2hvdyBjb21wbGV0ZSB3b3Jrc1xyXG4gKiBAcGFyYW0gd29yZENvdW50TnVtcyBMaW1pdCB3b3JrcyB0byBnaXZlbiB3b3JkIGNvdW50IGludGVydmFsXHJcbiAqIEBwYXJhbSBkYXRlQXJyIExpbWl0IHdvcmtzIHRvIGdpdmVuIGRhdGUgaW50ZXJ2YWxcclxuICogQHBhcmFtIHF1ZXJ5IFF1ZXJ5IHdpdGhpbiByZXN1bHRzXHJcbiAqIEBwYXJhbSBsYW5ndWFnZUlkIElEIG9mIGxhbmd1YWdlIHRvIGxpbWl0IHdvcmtzIHRvXHJcbiAqIEByZXR1cm5zIFVSTCB0byByZWRpcmVjdCB0b1xyXG4gKi9cclxuZnVuY3Rpb24gY29uc3RydWN0UmVkaXJlY3RVUkxIZWxwZXIob3JpZ2luLCB0eXBlLCBpZCwgZXhjbHVkZVJhdGluZ3MgPSBbXSwgZXhjbHVkZVdhcm5pbmdzID0gW10sIGV4Y2x1ZGVDYXRlZ29yaWVzID0gW10sIGV4Y2x1ZGVUYWdzID0gW10sIGNyb3Nzb3ZlckJvb2wgPSBcIlwiLCBjb21wbGV0ZUJvb2wgPSBcIlwiLCB3b3JkQ291bnROdW1zID0gW10sIGRhdGVBcnIgPSBbXSwgcXVlcnkgPSBcIlwiLCBsYW5ndWFnZUlkID0gXCJcIikge1xyXG4gICAgLy8gQ29uc3RydWN0IGV4Y2x1ZGUgdXJsIHF1ZXJpZXNcclxuICAgIGxldCByYXRpbmdzID0gXCJcIjtcclxuICAgIGV4Y2x1ZGVSYXRpbmdzID09PSBudWxsIHx8IGV4Y2x1ZGVSYXRpbmdzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBleGNsdWRlUmF0aW5ncy5mb3JFYWNoKChyKSA9PiByYXRpbmdzICs9IGBleGNsdWRlXyR7dHlwZX1fc2VhcmNoW3JhdGluZ19pZHNdW109JHtyLnZhbHVlT2YoKX0mYCk7XHJcbiAgICBsZXQgYXJjaGl2ZVdhcm5pbmdzID0gXCJcIjtcclxuICAgIGV4Y2x1ZGVXYXJuaW5ncyA9PT0gbnVsbCB8fCBleGNsdWRlV2FybmluZ3MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGV4Y2x1ZGVXYXJuaW5ncy5mb3JFYWNoKCh3KSA9PiBhcmNoaXZlV2FybmluZ3MgKz0gYGV4Y2x1ZGVfJHt0eXBlfV9zZWFyY2hbYXJjaGl2ZV93YXJuaW5nX2lkc11bXT0ke3cudmFsdWVPZigpfSZgKTtcclxuICAgIGxldCBjYXRlZ29yaWVzID0gXCJcIjtcclxuICAgIGV4Y2x1ZGVDYXRlZ29yaWVzID09PSBudWxsIHx8IGV4Y2x1ZGVDYXRlZ29yaWVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBleGNsdWRlQ2F0ZWdvcmllcy5mb3JFYWNoKChjKSA9PiBjYXRlZ29yaWVzICs9IGBleGNsdWRlXyR7dHlwZX1fc2VhcmNoW2NhdGVnb3J5X2lkc11bXT0ke2MudmFsdWVPZigpfSZgKTtcclxuICAgIGxldCB0YWdzID0gYCR7dHlwZX1fc2VhcmNoW2V4Y2x1ZGVkX3RhZ19uYW1lc109YDtcclxuICAgIGV4Y2x1ZGVUYWdzID09PSBudWxsIHx8IGV4Y2x1ZGVUYWdzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBleGNsdWRlVGFncy5mb3JFYWNoKCh0KSA9PiB0YWdzICs9IGAke3QudmFsdWVPZigpfSxgKTtcclxuICAgIGlmIChleGNsdWRlVGFncy5sZW5ndGggPiAwKVxyXG4gICAgICAgIHRhZ3MgPSB0YWdzLnN1YnN0cmluZygwLCB0YWdzLmxlbmd0aCAtIDEpICsgXCImXCI7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgdGFncyA9IFwiXCI7XHJcbiAgICBsZXQgY3Jvc3NvdmVyID0gXCJcIjtcclxuICAgIGlmIChjcm9zc292ZXJCb29sICE9IFwiXCIpIHtcclxuICAgICAgICBjcm9zc292ZXIgPSBgJHt0eXBlfV9zZWFyY2hbY3Jvc3NvdmVyXT0ke2Nyb3Nzb3ZlckJvb2x9JmA7XHJcbiAgICB9XHJcbiAgICBsZXQgY29tcGxldGUgPSBcIlwiO1xyXG4gICAgaWYgKGNvbXBsZXRlQm9vbCAhPSBcIlwiKSB7XHJcbiAgICAgICAgY29tcGxldGUgPSBgJHt0eXBlfV9zZWFyY2hbY29tcGxldGVdPSR7Y29tcGxldGVCb29sfSZgO1xyXG4gICAgfVxyXG4gICAgbGV0IHdvcmRDb3VudCA9IFwiXCI7XHJcbiAgICBpZiAod29yZENvdW50TnVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgaWYgKHdvcmRDb3VudE51bXNbMF0gIT0gbnVsbClcclxuICAgICAgICAgICAgd29yZENvdW50ICs9IGAke3R5cGV9X3NlYXJjaFt3b3Jkc19mcm9tXT0ke3dvcmRDb3VudE51bXNbMF19JmA7XHJcbiAgICAgICAgaWYgKHdvcmRDb3VudE51bXNbMV0gIT0gbnVsbClcclxuICAgICAgICAgICAgd29yZENvdW50ICs9IGAke3R5cGV9X3NlYXJjaFt3b3Jkc190b109JHt3b3JkQ291bnROdW1zWzFdfSZgO1xyXG4gICAgfVxyXG4gICAgbGV0IGRhdGUgPSBcIlwiO1xyXG4gICAgaWYgKGRhdGVBcnIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGlmIChkYXRlQXJyWzBdICE9IG51bGwpXHJcbiAgICAgICAgICAgIGRhdGUgKz0gYCR7dHlwZX1fc2VhcmNoW2RhdGVfZnJvbV09JHtkYXRlQXJyWzBdfSZgO1xyXG4gICAgICAgIGlmIChkYXRlQXJyWzFdICE9IG51bGwpXHJcbiAgICAgICAgICAgIGRhdGUgKz0gYCR7dHlwZX1fc2VhcmNoW2RhdGVfdG9dPSR7ZGF0ZUFyclsxXX0mYDtcclxuICAgIH1cclxuICAgIGxldCBzZWFyY2hXaXRoaW5SZXN1bHRzID0gcXVlcnkgPT0gXCJcIiA/IFwiXCIgOiBgJHt0eXBlfV9zZWFyY2hbJHt0eXBlID09ICdib29rbWFyaycgPyAnYm9va21hcmthYmxlXycgOiBcIlwifXF1ZXJ5XT0ke3F1ZXJ5fSZgO1xyXG4gICAgbGV0IGxhbmd1YWdlID0gbGFuZ3VhZ2VJZCA9PSBcIlwiID8gXCJcIiA6IGAke3R5cGV9X3NlYXJjaFtsYW5ndWFnZV9pZF09JHtsYW5ndWFnZUlkfSZgO1xyXG4gICAgLy8gQ29uc3RydWN0IGZ1bGwgdXJsXHJcbiAgICBpZiAocmF0aW5ncy5sZW5ndGggPT0gMCAmJiBhcmNoaXZlV2FybmluZ3MubGVuZ3RoID09IDAgJiYgY2F0ZWdvcmllcy5sZW5ndGggPT0gMCAmJiB0YWdzLmxlbmd0aCA9PSAwICYmIGNyb3Nzb3Zlci5sZW5ndGggPT0gMCAmJiB3b3JkQ291bnQubGVuZ3RoID09IDAgJiYgZGF0ZS5sZW5ndGggPT0gMCAmJiBzZWFyY2hXaXRoaW5SZXN1bHRzLmxlbmd0aCA9PSAwICYmIGxhbmd1YWdlLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgbGV0IHJlZGlyZWN0ID0gYCR7dHlwZX1zPyR7cmF0aW5nc30ke2FyY2hpdmVXYXJuaW5nc30ke2NhdGVnb3JpZXN9JHt0YWdzfSR7Y3Jvc3NvdmVyfSR7Y29tcGxldGV9JHt3b3JkQ291bnR9JHtkYXRlfSR7c2VhcmNoV2l0aGluUmVzdWx0c30ke2xhbmd1YWdlfWNvbW1pdD1Tb3J0K2FuZCtGaWx0ZXImJHtvcmlnaW4udmFsdWVPZigpfSR7aWR9YDtcclxuICAgIGlmIChvcmlnaW4gPT0gY29uc3RhbnRzXzEuT1JJR0lOLkNPTExFQ1RJT05TKVxyXG4gICAgICAgIHJlZGlyZWN0ID0gYGh0dHBzOi8vYXJjaGl2ZW9mb3Vyb3duLm9yZy9jb2xsZWN0aW9ucy8ke2lkfS9gICsgcmVkaXJlY3Q7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcmVkaXJlY3QgPSBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL2AgKyByZWRpcmVjdDtcclxuICAgIHJldHVybiByZWRpcmVjdDtcclxufVxyXG4vKipcclxuICogUGFyc2VzIGFuIEFPMyB1cmwgYW5kIHJldHVybnMgaXRzIG9yaWdpbiwgc2VhcmNoIHR5cGUsIGFuZCBpZC5cclxuICogQHBhcmFtIGJhc2VVUkwgVVJMIHRvIGJlIHBhcnNlZC5cclxuICogQHJldHVybnMgb3JpZ2luOid0YWdzJywgJ3VzZXJzJywgb3IgJ2NvbGxlY3Rpb25zLidcclxuICogQHJldHVybnMgc2VhcmNoVHlwZTogJ3dvcmtzJyBvciAnYm9va21hcmtzLidcclxuICogQHJldHVybnMgaWQ6IGlkIG9mIGZhbmRvbSAoaWYgb3JpZ2luPSd3b3JrcycpLCBpZCBvZiB1c2VyIChpZiBvcmlnaW49J2Jvb2ttYXJrcyksIG9yIGlkIG9mIGNvbGxlY3Rpb24gKGlmIG9yaWdpbj0nY29sbGVjdGlvbnMnKS5cclxuICogQHJldHVybnMgZXh0cmFJZDogRXh0cmEgaWRzIGluIFVSTHMsIG9yIGVtcHR5IHN0cmluZyBpZiBubyBleHRyYSBpZC4gUmV0dXJuZWQgYXMgZnVsbCBpZCB3aXRoIGRlZmluaXRpb24gKEV4OiBcImZhbmRvbV9pZD0xMjM0MTIzXCIpLlxyXG4gKi9cclxuZnVuY3Rpb24gcGFyc2VVUkwoYmFzZVVSTCkge1xyXG4gICAgbGV0IHNwbGl0ID0gYmFzZVVSTC5zcGxpdCgnLycpO1xyXG4gICAgbGV0IGVuZCA9IHNwbGl0W3NwbGl0Lmxlbmd0aCAtIDFdLnNwbGl0KFwiP1wiKTtcclxuICAgIGlmIChzcGxpdC5sZW5ndGggPiA2KSB7XHJcbiAgICAgICAgaWYgKHNwbGl0WzVdID09IFwicHNldWRzXCIgJiYgc3BsaXRbNF0gIT0gc3BsaXRbNl0pXHJcbiAgICAgICAgICAgIHJldHVybiBbc3BsaXRbM10sIGVuZFswXS5zdWJzdHJpbmcoMCwgZW5kWzBdLmxlbmd0aCAtIDEpLCBzcGxpdFs0XSwgYHBzZXVkX2lkPSR7c3BsaXRbNl19YCArIChlbmQubGVuZ3RoID4gMSA/IGAmJHtlbmRbMV19YCA6IFwiXCIpXTtcclxuICAgICAgICBlbHNlIGlmIChzcGxpdFszXSA9PSAnY29sbGVjdGlvbnMnKVxyXG4gICAgICAgICAgICByZXR1cm4gW3NwbGl0WzNdLCBlbmRbMF0uc3Vic3RyaW5nKDAsIGVuZFswXS5sZW5ndGggLSAxKSwgc3BsaXRbNF0sIGB0YWdfaWQ9JHtzcGxpdFs2XX1gICsgKGVuZC5sZW5ndGggPiAxID8gYCYke2VuZFsxXX1gIDogXCJcIildO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtzcGxpdFszXSwgZW5kWzBdLnN1YnN0cmluZygwLCBlbmRbMF0ubGVuZ3RoIC0gMSksIHNwbGl0W3NwbGl0Lmxlbmd0aCAtIDJdLCBlbmQubGVuZ3RoID4gMSA/IGVuZFsxXSA6IFwiXCJdO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuT1JJR0lOID0gZXhwb3J0cy5ISURFX1VSTFMgPSBleHBvcnRzLlJFRElSRUNUX1VSTFMgPSBleHBvcnRzLlNFVFRJTkdTX0NIQU5HRUQgPSBleHBvcnRzLkRFRkFVTFRfVkFMVUVTID0gZXhwb3J0cy5TVE9SQUdFX0tFWVMgPSB2b2lkIDA7XHJcbi8vIFN0b3JhZ2Uga2V5c1xyXG5leHBvcnRzLlNUT1JBR0VfS0VZUyA9IFtcclxuICAgIFwia3Vkb3NIaXRSYXRpb1wiLCBcImxhbmd1YWdlXCIsIFwicXVlcnlcIiwgXCJ0YWdzXCIsIFwid2FybmluZ3NcIlxyXG5dO1xyXG4vLyBEZWZhdWx0IHZhbHVlc1xyXG5leHBvcnRzLkRFRkFVTFRfVkFMVUVTID0ge1xyXG4gICAga3Vkb3NIaXRSYXRpbzogdHJ1ZSxcclxuICAgIGxhbmd1YWdlOiBbZmFsc2UsIFwiXCJdLFxyXG4gICAgcXVlcnk6IFtmYWxzZSwgXCJcIl0sXHJcbiAgICB0YWdzOiBbXSxcclxuICAgIHdhcm5pbmdzOiBbXVxyXG59O1xyXG4vLyBTZXR0aW5ncyBjaGFuZ2VkIG1lc3NhZ2VcclxuZXhwb3J0cy5TRVRUSU5HU19DSEFOR0VEID0gXCJzZXR0aW5nc19jaGFuZ2VkXCI7XHJcbi8qKlxyXG4gKiBSZWRpcmVjdCB0aGVzZSBVUkxzIHRvIGZpbHRlciB3b3JrcyB3aXRoIGV4Y2x1ZGVkIHN0dWZmXHJcbiAqL1xyXG5leHBvcnRzLlJFRElSRUNUX1VSTFMgPSBbXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL3RhZ3MvKi93b3Jrc2AsXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL3RhZ3MvKi9ib29rbWFya3NgLFxyXG4gICAgYGh0dHBzOi8vYXJjaGl2ZW9mb3Vyb3duLm9yZy91c2Vycy8qL3dvcmtzKmAsXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL3VzZXJzLyovYm9va21hcmtzKmAsXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL2NvbGxlY3Rpb25zLyovd29ya3NgLFxyXG4gICAgYGh0dHBzOi8vYXJjaGl2ZW9mb3Vyb3duLm9yZy9jb2xsZWN0aW9ucy8qL2Jvb2ttYXJrc2AgLy8gQ29sbGVjdGlvbidzIGJvb2ttYXJrc1xyXG5dO1xyXG4vKipcclxuICogQ2Fubm90IHJlZGlyZWN0IHRoZXNlIFVSTHMsIG5lZWQgdG8gaGlkZSB3b3JrcyB3aXRoIGV4Y2x1ZGVkIHN0dWZmXHJcbiAqL1xyXG5leHBvcnRzLkhJREVfVVJMUyA9IFtcclxuICAgIGBodHRwczpcXC9cXC9hcmNoaXZlb2ZvdXJvd25cXC5vcmdcXC91c2Vyc1xcL2AsXHJcbiAgICBgaHR0cHM6XFwvXFwvYXJjaGl2ZW9mb3Vyb3duXFwub3JnXFwvdXNlcnNcXC8uKlxcL3Nlcmllc2AsXHJcbiAgICBgaHR0cHM6XFwvXFwvYXJjaGl2ZW9mb3Vyb3duXFwub3JnXFwvdXNlcnNcXC8uKlxcL2dpZnRzYCxcclxuICAgIGBodHRwczpcXC9cXC9hcmNoaXZlb2ZvdXJvd25cXC5vcmdcXC9jb2xsZWN0aW9uc1xcLy4qXFwvc2VyaWVzYCwgLy8gQ29sbGVjdGlvbidzIHNlcmllc1xyXG5dO1xyXG4vKipcclxuICogT3JpZ2luIG9mIHBhZ2UgdG8gcmVkaXJlY3RcclxuICovXHJcbnZhciBPUklHSU47XHJcbihmdW5jdGlvbiAoT1JJR0lOKSB7XHJcbiAgICBPUklHSU5bXCJDT0xMRUNUSU9OU1wiXSA9IFwiY29sbGVjdGlvbl9pZD1cIjtcclxuICAgIE9SSUdJTltcIlRBR1NcIl0gPSBcInRhZ19pZD1cIjtcclxuICAgIE9SSUdJTltcIlVTRVJTXCJdID0gXCJ1c2VyX2lkPVwiO1xyXG59KShPUklHSU4gPSBleHBvcnRzLk9SSUdJTiB8fCAoZXhwb3J0cy5PUklHSU4gPSB7fSkpO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi4vZXhwb3J0L2NvbnN0YW50c1wiKTtcclxuY29uc3QgcmVkaXJlY3RfMSA9IHJlcXVpcmUoXCIuL3JlZGlyZWN0XCIpO1xyXG4vLyAqIEdsb2JhbCB2YXJpYWJsZXNcclxubGV0IHNldHRpbmdzO1xyXG4vLyAqIEV4ZWN1dGVkIGNvZGUgc3RhcnRcclxuLy8gU2V0IHNldHRpbmdzIHRvIGJlIGN1cnJlbnRseSBzdG9yZWQgc2V0dGluZ3NcclxuYnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldChjb25zdGFudHNfMS5TVE9SQUdFX0tFWVMpLnRoZW4oKHZhbHVlKSA9PiB7XHJcbiAgICBzZXR0aW5ncyA9IHZhbHVlO1xyXG59KTtcclxuLy8gKiBFeGVjdXRlZCBjb2RlIGVuZFxyXG4vLyAqIExpc3RlbmVyc1xyXG4vLyBPcGVuIG9wdGlvbiBtZW51IG9uIGJyb3dzZXIgYWN0aW9uIGljb24gY2xpY2tcclxuYnJvd3Nlci5icm93c2VyQWN0aW9uLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihvcGVuT3B0aW9uTWVudSk7XHJcbi8vIFJlZGlyZWN0IFVSTHMgdG8gZmlsdGVyIHdvcmtzXHJcbmJyb3dzZXIud2ViUmVxdWVzdC5vbkJlZm9yZVJlcXVlc3QuYWRkTGlzdGVuZXIocmVkaXJlY3QsIHtcclxuICAgIHVybHM6IGNvbnN0YW50c18xLlJFRElSRUNUX1VSTFMsXHJcbiAgICB0eXBlczogWydtYWluX2ZyYW1lJ11cclxufSwgWydibG9ja2luZyddKTtcclxuLy8gU3luY2ggc2V0dGluZ3Mgb24gc2V0dGluZ3MgY2hhbmdlXHJcbmJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UpID0+IHtcclxuICAgIGlmIChtZXNzYWdlID09IGNvbnN0YW50c18xLlNFVFRJTkdTX0NIQU5HRUQpIHtcclxuICAgICAgICAvLyBHZXQgc2V0dGluZ3MgZnJvbSBzdG9yYWdlXHJcbiAgICAgICAgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldChjb25zdGFudHNfMS5TVE9SQUdFX0tFWVMpLnRoZW4oKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHNldHRpbmdzID0gdmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG4vLyAqIEZ1bmN0aW9uc1xyXG4vKipcclxuICogUmVkaXJlY3RzIHVybCB0byBmaWx0ZXIgZXhjbHVkZWQgd29ya3NcclxuICogQHBhcmFtIGRldGFpbHMgV2ViIHJlcXVlc3QgZGV0YWlsc1xyXG4gKiBAcmV0dXJucyBXZWIgcmVxdWVzdCBCbG9ja2luZ1Jlc3BvbnNlIG9iamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gcmVkaXJlY3QoZGV0YWlscykge1xyXG4gICAgLy8gY29uc29sZS5sb2coYEFPM0V4dGVuc2lvbjogZGV0YWlscy51cmw9JHtkZXRhaWxzLnVybH1gKTsgLy8gREVCVUdHSU5HXHJcbiAgICBsZXQgdXJsID0gKDAsIHJlZGlyZWN0XzEuZ2V0UmVkaXJlY3RVUkwpKGRldGFpbHMudXJsLCBzZXR0aW5ncyk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhgQU8zRXh0ZW5zaW9uOiB1cmw9JHt1cmx9YCk7IC8vIERFQlVHR0lOR1xyXG4gICAgaWYgKHVybCAhPSBudWxsKVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlZGlyZWN0VXJsOiB1cmxcclxuICAgICAgICB9O1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHJldHVybiB7fTtcclxufVxyXG4vKipcclxuICogT3BlbnMgb3B0aW9uIG1lbnUgZm9yIGV4dGVuc2lvblxyXG4gKi9cclxuZnVuY3Rpb24gb3Blbk9wdGlvbk1lbnUoKSB7XHJcbiAgICBicm93c2VyLnRhYnMuY3JlYXRlKHtcclxuICAgICAgICB1cmw6IFwiL2Rpc3Qvb3B0aW9ucy9vcHRpb25zLmh0bWxcIlxyXG4gICAgfSk7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9