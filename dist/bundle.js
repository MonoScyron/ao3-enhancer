/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/export/constants.ts":
/*!*********************************!*\
  !*** ./src/export/constants.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CATEGORY = exports.WARNING = exports.RATING = exports.TYPE = exports.ORIGIN = exports.hideURLsRegex = exports.redirectURLsRegex = void 0;
/**
 * Redirect these URLs to exclude works with excluded stuff
 */
exports.redirectURLsRegex = [
    "https://archiveofourown.org/tags/*",
    "/https://archiveofourown.org/users/.*/works/",
    "/https://archiveofourown.org/users/.*/bookmarks/",
    "/https://archiveofourown.org/collections/.*/works/",
    "/https://archiveofourown.org/collections/.*/bookmarks/" // Collection's bookmarks
];
/**
 * Cannot redirect these URLs, need to hide works with excluded stuff
 */
exports.hideURLsRegex = [
    "/https://archiveofourown.org/users//",
    "/https://archiveofourown.org/users/.*/series/",
    "/https://archiveofourown.org/users/.*/gifts/",
    "/https://archiveofourown.org/collections/.*/series/",
];
/**
 * Origin of page to redirect
 */
var ORIGIN;
(function (ORIGIN) {
    ORIGIN[ORIGIN["COLLECTIONS"] = 0] = "COLLECTIONS";
    ORIGIN[ORIGIN["TAGS"] = 1] = "TAGS";
    ORIGIN[ORIGIN["USERS"] = 2] = "USERS";
})(ORIGIN = exports.ORIGIN || (exports.ORIGIN = {}));
/**
 * Type of post being searched for
 */
var TYPE;
(function (TYPE) {
    TYPE["WORKS"] = "work";
    TYPE["BOOKMARKS"] = "bookmark";
})(TYPE = exports.TYPE || (exports.TYPE = {}));
/**
 * Ratings to rating ids
 */
var RATING;
(function (RATING) {
    RATING[RATING["NOT_RATED"] = 9] = "NOT_RATED";
    RATING[RATING["GEN"] = 10] = "GEN";
    RATING[RATING["TEEN"] = 11] = "TEEN";
    RATING[RATING["MATURE"] = 12] = "MATURE";
    RATING[RATING["EXPLICIT"] = 13] = "EXPLICIT";
})(RATING = exports.RATING || (exports.RATING = {}));
/**
 * Warnings to warning ids
 */
var WARNING;
(function (WARNING) {
    WARNING[WARNING["CHOSE_NOT_TO_USE"] = 14] = "CHOSE_NOT_TO_USE";
    WARNING[WARNING["NO_WARNINGS_APPLY"] = 16] = "NO_WARNINGS_APPLY";
    WARNING[WARNING["MCD"] = 18] = "MCD";
    WARNING[WARNING["NON_CON"] = 19] = "NON_CON";
    WARNING[WARNING["UNDERAGE"] = 20] = "UNDERAGE";
})(WARNING = exports.WARNING || (exports.WARNING = {}));
/**
 * Category to category ids
 */
var CATEGORY;
(function (CATEGORY) {
    CATEGORY[CATEGORY["GEN"] = 21] = "GEN";
    CATEGORY[CATEGORY["FM"] = 22] = "FM";
    CATEGORY[CATEGORY["MM"] = 23] = "MM";
    CATEGORY[CATEGORY["OTHER"] = 24] = "OTHER";
    CATEGORY[CATEGORY["FF"] = 116] = "FF";
    CATEGORY[CATEGORY["MULTI"] = 2246] = "MULTI";
})(CATEGORY = exports.CATEGORY || (exports.CATEGORY = {}));


/***/ }),

/***/ "./src/export/redirect.ts":
/*!********************************!*\
  !*** ./src/export/redirect.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseURL = exports.getRedirectURL = exports.CATEGORY = exports.WARNING = exports.RATING = exports.TYPE = exports.ORIGIN = exports.redirectURLsRegex = void 0;
var constants_1 = __webpack_require__(/*! ./constants */ "./src/export/constants.ts");
Object.defineProperty(exports, "redirectURLsRegex", ({ enumerable: true, get: function () { return constants_1.redirectURLsRegex; } }));
Object.defineProperty(exports, "ORIGIN", ({ enumerable: true, get: function () { return constants_1.ORIGIN; } }));
Object.defineProperty(exports, "TYPE", ({ enumerable: true, get: function () { return constants_1.TYPE; } }));
Object.defineProperty(exports, "RATING", ({ enumerable: true, get: function () { return constants_1.RATING; } }));
Object.defineProperty(exports, "WARNING", ({ enumerable: true, get: function () { return constants_1.WARNING; } }));
Object.defineProperty(exports, "CATEGORY", ({ enumerable: true, get: function () { return constants_1.CATEGORY; } }));
/**
 * Returns redirect URL to contain excluded tags, overriding the previous URL's history
 * @param {ORIGIN} origin Origin of document
 * @param {TYPE} type Type of works being shown ('work' or 'bookmark')
 * @param {string} id ID of the url to redirect
 * @param excludeRatings Ratings to exclude
 * @param excludeWarnings Warnings to exclude
 * @param excludeCategories Categories to exclude
 * @param excludeTags Tags to exclude
 * @param crossoverBool Include, exclude, or exclusively show crossover works
 * @param completeBool Include, exclude, or exclusively show complete works
 * @param wordCountNums Limit works to given word count interval
 * @param dateArr Limit works to given date interval
 * @param query Query within results
 * @param languageId ID of language to limit works to
 * @returns URL to redirect to
 */
function getRedirectURL(origin, type, id, excludeRatings, excludeWarnings, excludeCategories, excludeTags, crossoverBool, completeBool, wordCountNums, dateArr, query, languageId) {
    if (excludeRatings === void 0) { excludeRatings = []; }
    if (excludeWarnings === void 0) { excludeWarnings = []; }
    if (excludeCategories === void 0) { excludeCategories = []; }
    if (excludeTags === void 0) { excludeTags = []; }
    if (crossoverBool === void 0) { crossoverBool = ""; }
    if (completeBool === void 0) { completeBool = ""; }
    if (wordCountNums === void 0) { wordCountNums = []; }
    if (dateArr === void 0) { dateArr = []; }
    if (query === void 0) { query = ""; }
    if (languageId === void 0) { languageId = ""; }
    var typeVal = type.valueOf();
    // Construct exclude url queries
    var ratings = "";
    excludeRatings === null || excludeRatings === void 0 ? void 0 : excludeRatings.forEach(function (r) {
        return ratings += "exclude_".concat(typeVal, "_search[rating_ids][]=").concat(r.valueOf(), "&");
    });
    var archiveWarnings = "";
    excludeWarnings === null || excludeWarnings === void 0 ? void 0 : excludeWarnings.forEach(function (w) {
        return archiveWarnings += "exclude_".concat(typeVal, "_search[archive_warning_ids][]=").concat(w.valueOf(), "&");
    });
    var categories = "";
    excludeCategories === null || excludeCategories === void 0 ? void 0 : excludeCategories.forEach(function (c) {
        return categories += "exclude_".concat(typeVal, "_search[category_ids][]=").concat(c.valueOf(), "&");
    });
    var tags = "".concat(typeVal, "_search[excluded_tag_names]=");
    excludeTags === null || excludeTags === void 0 ? void 0 : excludeTags.forEach(function (t) {
        return tags += "".concat(t.valueOf(), ",");
    });
    if (excludeTags.length > 0)
        tags = tags.substring(0, tags.length - 1) + "&";
    else
        tags = "";
    var crossover = "";
    if (crossoverBool != "") {
        crossover = "".concat(typeVal, "_search[crossover]=").concat(crossoverBool, "&");
    }
    var complete = "";
    if (completeBool != "") {
        complete = "".concat(typeVal, "_search[complete]=").concat(completeBool, "&");
    }
    var wordCount = "";
    if (wordCountNums.length > 0) {
        if (wordCountNums[0] != null)
            wordCount += "".concat(typeVal, "_search[words_from]=").concat(wordCountNums[0], "&");
        if (wordCountNums[1] != null)
            wordCount += "".concat(typeVal, "_search[words_to]=").concat(wordCountNums[1], "&");
    }
    var date = "";
    if (dateArr.length > 0) {
        if (dateArr[0] != null)
            date += "".concat(typeVal, "_search[date_from]=").concat(dateArr[0], "&");
        if (dateArr[1] != null)
            date += "".concat(typeVal, "_search[date_to]=").concat(dateArr[1], "&");
    }
    var searchWithinResults = query == null ? "" : "".concat(typeVal, "_search[query]=").concat(query, "&");
    var language = languageId == null ? "" : "".concat(typeVal, "_search[language_id]=").concat(languageId, "&");
    // Construct full url
    var redirect = "https://archiveofourown.org/".concat(typeVal, "s?").concat(ratings).concat(archiveWarnings).concat(categories).concat(tags).concat(crossover).concat(complete).concat(wordCount).concat(date).concat(searchWithinResults).concat(language, "commit=Sort+and+Filter&");
    // Redirect to a collection
    if (origin == constants_1.ORIGIN.COLLECTIONS) {
        redirect += "collection_id=".concat(id);
    }
    // Redirect to a user
    else if (origin == constants_1.ORIGIN.USERS) {
        redirect += "user_id=".concat(id);
    }
    // Redirect to works
    else {
        redirect += "tag_id=".concat(id);
    }
    return redirect;
}
exports.getRedirectURL = getRedirectURL;
/**
 * Parses an AO3 url and returns its origin, search type, and id.
 * @param {string} baseURL URL to be parsed
 * @returns origin='tags', 'users', or 'collections'
 * @returns searchType='works' or 'bookmarks'
 * @returns id=id of fandom (if origin='works'), id of user (if origin='bookmarks), or id of collection (if origin='collections')
 */
function parseURL(baseURL) {
    var split = baseURL.split('/');
    return [split[3], split[5], split[4]];
}
exports.parseURL = parseURL;


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
/*!***************************************!*\
  !*** ./src/content_scripts/onload.ts ***!
  \***************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var redirect_1 = __webpack_require__(/*! ../export/redirect */ "./src/export/redirect.ts");
console.log("AO3Extension: Extension loaded!");
// Check to see if current url needs to be redirected
redirect_1.redirectURLsRegex.forEach(function (url) {
    if (window.location.href.match(url)) {
        var parsed = (0, redirect_1.parseURL)(window.location.href);
        // ? parseURL function header sucks, use dictionary to make code legible?
        var type = void 0;
        if (parsed[1] == 'works')
            type = redirect_1.TYPE.WORKS;
        else
            type = redirect_1.TYPE.BOOKMARKS;
        var origin_1;
        if (parsed[0] == 'tags')
            origin_1 = redirect_1.ORIGIN.TAGS;
        else if (parsed[0] == 'users')
            origin_1 = redirect_1.ORIGIN.USERS;
        else
            origin_1 = redirect_1.ORIGIN.COLLECTIONS;
        var id = parsed[2];
        // TODO: Get exclude data from local storage (MOVE THIS TO BACKGROUND)
        // ! These values are temporary
        var rating = [redirect_1.RATING.MATURE];
        var warning = [redirect_1.WARNING.MCD];
        var category = [redirect_1.CATEGORY.FM];
        var tag = ["Angst", "Smut"];
        var crossover = "T";
        var complete = "F";
        var wordCount = [1000, 100000];
        var date = ["2021-10-2", "2022-12-23"];
        var query = "They all need hugs";
        var language = "en";
        // TODO: Redirect instead of logging url
        var temp = (0, redirect_1.getRedirectURL)(origin_1, type, id, rating, warning, category, tag, crossover, complete, wordCount, date, query, language);
        console.log("AO3Extension: ".concat(temp));
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLEdBQUcsQ0FBQyx3QkFBaUIsSUFBSSxDQUFFLENBQUMsQ0FBQztLQUN4QztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2V4cG9ydC9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4cG9ydC9yZWRpcmVjdC50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnRfc2NyaXB0cy9vbmxvYWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFJlZGlyZWN0IHRoZXNlIFVSTHMgdG8gZXhjbHVkZSB3b3JrcyB3aXRoIGV4Y2x1ZGVkIHN0dWZmXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVkaXJlY3RVUkxzUmVnZXggPSBbXHJcbiAgICBgaHR0cHM6XFwvXFwvYXJjaGl2ZW9mb3Vyb3duXFwub3JnXFwvdGFnc1xcLypgLCAvLyBXb3Jrcy9ib29rbWFya3MgaW4gYSB0YWdcclxuXHJcbiAgICBgL2h0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL3VzZXJzXFwvLipcXC93b3Jrcy9gLCAvLyBVc2VyJ3Mgd29ya3NcclxuICAgIGAvaHR0cHM6XFwvXFwvYXJjaGl2ZW9mb3Vyb3duXFwub3JnXFwvdXNlcnNcXC8uKlxcL2Jvb2ttYXJrcy9gLCAvLyBVc2VyJ3MgYm9va21hcmtzXHJcblxyXG4gICAgYC9odHRwczpcXC9cXC9hcmNoaXZlb2ZvdXJvd25cXC5vcmdcXC9jb2xsZWN0aW9uc1xcLy4qXFwvd29ya3MvYCwgLy8gQ29sbGVjdGlvbidzIHdvcmtzXHJcbiAgICBgL2h0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL2NvbGxlY3Rpb25zXFwvLipcXC9ib29rbWFya3MvYC8vIENvbGxlY3Rpb24ncyBib29rbWFya3NcclxuXTtcclxuXHJcbi8qKlxyXG4gKiBDYW5ub3QgcmVkaXJlY3QgdGhlc2UgVVJMcywgbmVlZCB0byBoaWRlIHdvcmtzIHdpdGggZXhjbHVkZWQgc3R1ZmZcclxuICovXHJcbmV4cG9ydCBjb25zdCBoaWRlVVJMc1JlZ2V4ID0gW1xyXG4gICAgYC9odHRwczpcXC9cXC9hcmNoaXZlb2ZvdXJvd25cXC5vcmdcXC91c2Vyc1xcLy9gLCAvLyBVc2VyJ3MgZGFzaGJvYXJkXHJcbiAgICBgL2h0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL3VzZXJzXFwvLipcXC9zZXJpZXMvYCwgLy8gVXNlcidzIHNlcmllc1xyXG4gICAgYC9odHRwczpcXC9cXC9hcmNoaXZlb2ZvdXJvd25cXC5vcmdcXC91c2Vyc1xcLy4qXFwvZ2lmdHMvYCwgLy8gVXNlcidzIGdpZnRzXHJcblxyXG4gICAgYC9odHRwczpcXC9cXC9hcmNoaXZlb2ZvdXJvd25cXC5vcmdcXC9jb2xsZWN0aW9uc1xcLy4qXFwvc2VyaWVzL2AsIC8vIENvbGxlY3Rpb24ncyBzZXJpZXNcclxuXVxyXG5cclxuLyoqXHJcbiAqIE9yaWdpbiBvZiBwYWdlIHRvIHJlZGlyZWN0XHJcbiAqL1xyXG5leHBvcnQgZW51bSBPUklHSU4ge1xyXG4gICAgQ09MTEVDVElPTlMsXHJcbiAgICBUQUdTLFxyXG4gICAgVVNFUlNcclxufVxyXG5cclxuLyoqXHJcbiAqIFR5cGUgb2YgcG9zdCBiZWluZyBzZWFyY2hlZCBmb3JcclxuICovXHJcbmV4cG9ydCBlbnVtIFRZUEUge1xyXG4gICAgV09SS1MgPSAnd29yaycsXHJcbiAgICBCT09LTUFSS1MgPSAnYm9va21hcmsnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSYXRpbmdzIHRvIHJhdGluZyBpZHNcclxuICovXHJcbmV4cG9ydCBlbnVtIFJBVElORyB7XHJcbiAgICBOT1RfUkFURUQgPSA5LFxyXG4gICAgR0VOID0gMTAsXHJcbiAgICBURUVOID0gMTEsXHJcbiAgICBNQVRVUkUgPSAxMixcclxuICAgIEVYUExJQ0lUID0gMTNcclxufVxyXG5cclxuLyoqXHJcbiAqIFdhcm5pbmdzIHRvIHdhcm5pbmcgaWRzXHJcbiAqL1xyXG5leHBvcnQgZW51bSBXQVJOSU5HIHtcclxuICAgIENIT1NFX05PVF9UT19VU0UgPSAxNCxcclxuICAgIE5PX1dBUk5JTkdTX0FQUExZID0gMTYsXHJcbiAgICBNQ0QgPSAxOCxcclxuICAgIE5PTl9DT04gPSAxOSxcclxuICAgIFVOREVSQUdFID0gMjBcclxufVxyXG5cclxuLyoqXHJcbiAqIENhdGVnb3J5IHRvIGNhdGVnb3J5IGlkc1xyXG4gKi9cclxuZXhwb3J0IGVudW0gQ0FURUdPUlkge1xyXG4gICAgR0VOID0gMjEsXHJcbiAgICBGTSA9IDIyLFxyXG4gICAgTU0gPSAyMyxcclxuICAgIE9USEVSID0gMjQsXHJcbiAgICBGRiA9IDExNixcclxuICAgIE1VTFRJID0gMjI0NlxyXG59IiwiaW1wb3J0IHsgcmVkaXJlY3RVUkxzUmVnZXgsIE9SSUdJTiwgVFlQRSwgUkFUSU5HLCBXQVJOSU5HLCBDQVRFR09SWSB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xyXG5leHBvcnQgeyByZWRpcmVjdFVSTHNSZWdleCwgT1JJR0lOLCBUWVBFLCBSQVRJTkcsIFdBUk5JTkcsIENBVEVHT1JZIH07XHJcblxyXG4vKipcclxuICogUmV0dXJucyByZWRpcmVjdCBVUkwgdG8gY29udGFpbiBleGNsdWRlZCB0YWdzLCBvdmVycmlkaW5nIHRoZSBwcmV2aW91cyBVUkwncyBoaXN0b3J5XHJcbiAqIEBwYXJhbSB7T1JJR0lOfSBvcmlnaW4gT3JpZ2luIG9mIGRvY3VtZW50XHJcbiAqIEBwYXJhbSB7VFlQRX0gdHlwZSBUeXBlIG9mIHdvcmtzIGJlaW5nIHNob3duICgnd29yaycgb3IgJ2Jvb2ttYXJrJylcclxuICogQHBhcmFtIHtzdHJpbmd9IGlkIElEIG9mIHRoZSB1cmwgdG8gcmVkaXJlY3RcclxuICogQHBhcmFtIGV4Y2x1ZGVSYXRpbmdzIFJhdGluZ3MgdG8gZXhjbHVkZVxyXG4gKiBAcGFyYW0gZXhjbHVkZVdhcm5pbmdzIFdhcm5pbmdzIHRvIGV4Y2x1ZGVcclxuICogQHBhcmFtIGV4Y2x1ZGVDYXRlZ29yaWVzIENhdGVnb3JpZXMgdG8gZXhjbHVkZVxyXG4gKiBAcGFyYW0gZXhjbHVkZVRhZ3MgVGFncyB0byBleGNsdWRlXHJcbiAqIEBwYXJhbSBjcm9zc292ZXJCb29sIEluY2x1ZGUsIGV4Y2x1ZGUsIG9yIGV4Y2x1c2l2ZWx5IHNob3cgY3Jvc3NvdmVyIHdvcmtzXHJcbiAqIEBwYXJhbSBjb21wbGV0ZUJvb2wgSW5jbHVkZSwgZXhjbHVkZSwgb3IgZXhjbHVzaXZlbHkgc2hvdyBjb21wbGV0ZSB3b3Jrc1xyXG4gKiBAcGFyYW0gd29yZENvdW50TnVtcyBMaW1pdCB3b3JrcyB0byBnaXZlbiB3b3JkIGNvdW50IGludGVydmFsXHJcbiAqIEBwYXJhbSBkYXRlQXJyIExpbWl0IHdvcmtzIHRvIGdpdmVuIGRhdGUgaW50ZXJ2YWxcclxuICogQHBhcmFtIHF1ZXJ5IFF1ZXJ5IHdpdGhpbiByZXN1bHRzXHJcbiAqIEBwYXJhbSBsYW5ndWFnZUlkIElEIG9mIGxhbmd1YWdlIHRvIGxpbWl0IHdvcmtzIHRvXHJcbiAqIEByZXR1cm5zIFVSTCB0byByZWRpcmVjdCB0b1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlZGlyZWN0VVJMKG9yaWdpbjogT1JJR0lOLCB0eXBlOiBUWVBFLCBpZDogc3RyaW5nLCBleGNsdWRlUmF0aW5nczogUkFUSU5HW10gPSBbXSwgZXhjbHVkZVdhcm5pbmdzOiBXQVJOSU5HW10gPSBbXSwgZXhjbHVkZUNhdGVnb3JpZXM6IENBVEVHT1JZW10gPSBbXSwgZXhjbHVkZVRhZ3M6IHN0cmluZ1tdID0gW10sIGNyb3Nzb3ZlckJvb2w6IHN0cmluZyA9IFwiXCIsIGNvbXBsZXRlQm9vbDogc3RyaW5nID0gXCJcIiwgd29yZENvdW50TnVtczogbnVtYmVyW10gPSBbXSwgZGF0ZUFycjogc3RyaW5nW10gPSBbXSwgcXVlcnk6IHN0cmluZyA9IFwiXCIsIGxhbmd1YWdlSWQ6IHN0cmluZyA9IFwiXCIpOiBzdHJpbmcge1xyXG4gICAgbGV0IHR5cGVWYWwgPSB0eXBlLnZhbHVlT2YoKTtcclxuXHJcbiAgICAvLyBDb25zdHJ1Y3QgZXhjbHVkZSB1cmwgcXVlcmllc1xyXG4gICAgbGV0IHJhdGluZ3MgPSBcIlwiO1xyXG4gICAgZXhjbHVkZVJhdGluZ3M/LmZvckVhY2goKHIpID0+XHJcbiAgICAgICAgcmF0aW5ncyArPSBgZXhjbHVkZV8ke3R5cGVWYWx9X3NlYXJjaFtyYXRpbmdfaWRzXVtdPSR7ci52YWx1ZU9mKCl9JmBcclxuICAgICk7XHJcbiAgICBsZXQgYXJjaGl2ZVdhcm5pbmdzID0gXCJcIjtcclxuICAgIGV4Y2x1ZGVXYXJuaW5ncz8uZm9yRWFjaCgodykgPT5cclxuICAgICAgICBhcmNoaXZlV2FybmluZ3MgKz0gYGV4Y2x1ZGVfJHt0eXBlVmFsfV9zZWFyY2hbYXJjaGl2ZV93YXJuaW5nX2lkc11bXT0ke3cudmFsdWVPZigpfSZgXHJcbiAgICApO1xyXG4gICAgbGV0IGNhdGVnb3JpZXMgPSBcIlwiO1xyXG4gICAgZXhjbHVkZUNhdGVnb3JpZXM/LmZvckVhY2goKGMpID0+XHJcbiAgICAgICAgY2F0ZWdvcmllcyArPSBgZXhjbHVkZV8ke3R5cGVWYWx9X3NlYXJjaFtjYXRlZ29yeV9pZHNdW109JHtjLnZhbHVlT2YoKX0mYFxyXG4gICAgKTtcclxuXHJcbiAgICBsZXQgdGFncyA9IGAke3R5cGVWYWx9X3NlYXJjaFtleGNsdWRlZF90YWdfbmFtZXNdPWA7XHJcbiAgICBleGNsdWRlVGFncz8uZm9yRWFjaCgodCkgPT5cclxuICAgICAgICB0YWdzICs9IGAke3QudmFsdWVPZigpfSxgXHJcbiAgICApO1xyXG4gICAgaWYoZXhjbHVkZVRhZ3MubGVuZ3RoID4gMClcclxuICAgICAgICB0YWdzID0gdGFncy5zdWJzdHJpbmcoMCwgdGFncy5sZW5ndGggLSAxKSArIFwiJlwiO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHRhZ3MgPSBcIlwiO1xyXG5cclxuICAgIGxldCBjcm9zc292ZXIgPSBcIlwiO1xyXG4gICAgaWYoY3Jvc3NvdmVyQm9vbCAhPSBcIlwiKSB7XHJcbiAgICAgICAgY3Jvc3NvdmVyID0gYCR7dHlwZVZhbH1fc2VhcmNoW2Nyb3Nzb3Zlcl09JHtjcm9zc292ZXJCb29sfSZgO1xyXG4gICAgfVxyXG4gICAgbGV0IGNvbXBsZXRlID0gXCJcIjtcclxuICAgIGlmKGNvbXBsZXRlQm9vbCAhPSBcIlwiKSB7XHJcbiAgICAgICAgY29tcGxldGUgPSBgJHt0eXBlVmFsfV9zZWFyY2hbY29tcGxldGVdPSR7Y29tcGxldGVCb29sfSZgO1xyXG4gICAgfVxyXG4gICAgbGV0IHdvcmRDb3VudCA9IFwiXCI7XHJcbiAgICBpZih3b3JkQ291bnROdW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBpZih3b3JkQ291bnROdW1zWzBdICE9IG51bGwpXHJcbiAgICAgICAgICAgIHdvcmRDb3VudCArPSBgJHt0eXBlVmFsfV9zZWFyY2hbd29yZHNfZnJvbV09JHt3b3JkQ291bnROdW1zWzBdfSZgO1xyXG4gICAgICAgIGlmKHdvcmRDb3VudE51bXNbMV0gIT0gbnVsbClcclxuICAgICAgICAgICAgd29yZENvdW50ICs9IGAke3R5cGVWYWx9X3NlYXJjaFt3b3Jkc190b109JHt3b3JkQ291bnROdW1zWzFdfSZgO1xyXG4gICAgfVxyXG4gICAgbGV0IGRhdGUgPSBcIlwiO1xyXG4gICAgaWYoZGF0ZUFyci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgaWYoZGF0ZUFyclswXSAhPSBudWxsKVxyXG4gICAgICAgICAgICBkYXRlICs9IGAke3R5cGVWYWx9X3NlYXJjaFtkYXRlX2Zyb21dPSR7ZGF0ZUFyclswXX0mYDtcclxuICAgICAgICBpZihkYXRlQXJyWzFdICE9IG51bGwpXHJcbiAgICAgICAgICAgIGRhdGUgKz0gYCR7dHlwZVZhbH1fc2VhcmNoW2RhdGVfdG9dPSR7ZGF0ZUFyclsxXX0mYDtcclxuICAgIH1cclxuICAgIGxldCBzZWFyY2hXaXRoaW5SZXN1bHRzID0gcXVlcnkgPT0gbnVsbCA/IFwiXCIgOiBgJHt0eXBlVmFsfV9zZWFyY2hbcXVlcnldPSR7cXVlcnl9JmA7XHJcbiAgICBsZXQgbGFuZ3VhZ2UgPSBsYW5ndWFnZUlkID09IG51bGwgPyBcIlwiIDogYCR7dHlwZVZhbH1fc2VhcmNoW2xhbmd1YWdlX2lkXT0ke2xhbmd1YWdlSWR9JmA7XHJcblxyXG4gICAgLy8gQ29uc3RydWN0IGZ1bGwgdXJsXHJcbiAgICBsZXQgcmVkaXJlY3QgPSBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnLyR7dHlwZVZhbH1zPyR7cmF0aW5nc30ke2FyY2hpdmVXYXJuaW5nc30ke2NhdGVnb3JpZXN9JHt0YWdzfSR7Y3Jvc3NvdmVyfSR7Y29tcGxldGV9JHt3b3JkQ291bnR9JHtkYXRlfSR7c2VhcmNoV2l0aGluUmVzdWx0c30ke2xhbmd1YWdlfWNvbW1pdD1Tb3J0K2FuZCtGaWx0ZXImYDtcclxuXHJcbiAgICAvLyBSZWRpcmVjdCB0byBhIGNvbGxlY3Rpb25cclxuICAgIGlmKG9yaWdpbiA9PSBPUklHSU4uQ09MTEVDVElPTlMpIHtcclxuICAgICAgICByZWRpcmVjdCArPSBgY29sbGVjdGlvbl9pZD0ke2lkfWA7XHJcbiAgICB9XHJcbiAgICAvLyBSZWRpcmVjdCB0byBhIHVzZXJcclxuICAgIGVsc2UgaWYob3JpZ2luID09IE9SSUdJTi5VU0VSUykge1xyXG4gICAgICAgIHJlZGlyZWN0ICs9IGB1c2VyX2lkPSR7aWR9YDtcclxuICAgIH1cclxuICAgIC8vIFJlZGlyZWN0IHRvIHdvcmtzXHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZWRpcmVjdCArPSBgdGFnX2lkPSR7aWR9YDtcclxuICAgIH1cclxuICAgIHJldHVybiByZWRpcmVjdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnNlcyBhbiBBTzMgdXJsIGFuZCByZXR1cm5zIGl0cyBvcmlnaW4sIHNlYXJjaCB0eXBlLCBhbmQgaWQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFVSTCB0byBiZSBwYXJzZWRcclxuICogQHJldHVybnMgb3JpZ2luPSd0YWdzJywgJ3VzZXJzJywgb3IgJ2NvbGxlY3Rpb25zJ1xyXG4gKiBAcmV0dXJucyBzZWFyY2hUeXBlPSd3b3Jrcycgb3IgJ2Jvb2ttYXJrcydcclxuICogQHJldHVybnMgaWQ9aWQgb2YgZmFuZG9tIChpZiBvcmlnaW49J3dvcmtzJyksIGlkIG9mIHVzZXIgKGlmIG9yaWdpbj0nYm9va21hcmtzKSwgb3IgaWQgb2YgY29sbGVjdGlvbiAoaWYgb3JpZ2luPSdjb2xsZWN0aW9ucycpXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VVUkwoYmFzZVVSTDogc3RyaW5nKTogW29yaWdpbjogc3RyaW5nLCBzZWFyY2hUeXBlOiBzdHJpbmcsIGlkOiBzdHJpbmddIHtcclxuICAgIGxldCBzcGxpdCA9IGJhc2VVUkwuc3BsaXQoJy8nKTtcclxuICAgIHJldHVybiBbc3BsaXRbM10sIHNwbGl0WzVdLCBzcGxpdFs0XV07XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHsgQ0FURUdPUlksIGdldFJlZGlyZWN0VVJMLCBPUklHSU4sIHBhcnNlVVJMLCBSQVRJTkcsIHJlZGlyZWN0VVJMc1JlZ2V4LCBUWVBFLCBXQVJOSU5HIH0gZnJvbSBcIi4uL2V4cG9ydC9yZWRpcmVjdFwiO1xyXG5cclxuY29uc29sZS5sb2coYEFPM0V4dGVuc2lvbjogRXh0ZW5zaW9uIGxvYWRlZCFgKTtcclxuXHJcbi8vIENoZWNrIHRvIHNlZSBpZiBjdXJyZW50IHVybCBuZWVkcyB0byBiZSByZWRpcmVjdGVkXHJcbnJlZGlyZWN0VVJMc1JlZ2V4LmZvckVhY2goKHVybDogc3RyaW5nKSA9PiB7XHJcbiAgICBpZih3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCh1cmwpKSB7XHJcbiAgICAgICAgbGV0IHBhcnNlZCA9IHBhcnNlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuXHJcblxyXG4gICAgICAgIC8vID8gcGFyc2VVUkwgZnVuY3Rpb24gaGVhZGVyIHN1Y2tzLCB1c2UgZGljdGlvbmFyeSB0byBtYWtlIGNvZGUgbGVnaWJsZT9cclxuICAgICAgICBsZXQgdHlwZTogVFlQRTtcclxuICAgICAgICBpZihwYXJzZWRbMV0gPT0gJ3dvcmtzJylcclxuICAgICAgICAgICAgdHlwZSA9IFRZUEUuV09SS1M7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0eXBlID0gVFlQRS5CT09LTUFSS1M7XHJcblxyXG4gICAgICAgIGxldCBvcmlnaW46IE9SSUdJTjtcclxuICAgICAgICBpZihwYXJzZWRbMF0gPT0gJ3RhZ3MnKVxyXG4gICAgICAgICAgICBvcmlnaW4gPSBPUklHSU4uVEFHUztcclxuICAgICAgICBlbHNlIGlmKHBhcnNlZFswXSA9PSAndXNlcnMnKVxyXG4gICAgICAgICAgICBvcmlnaW4gPSBPUklHSU4uVVNFUlM7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBvcmlnaW4gPSBPUklHSU4uQ09MTEVDVElPTlM7XHJcblxyXG4gICAgICAgIGxldCBpZCA9IHBhcnNlZFsyXTtcclxuXHJcbiAgICAgICAgLy8gVE9ETzogR2V0IGV4Y2x1ZGUgZGF0YSBmcm9tIGxvY2FsIHN0b3JhZ2UgKE1PVkUgVEhJUyBUTyBCQUNLR1JPVU5EKVxyXG4gICAgICAgIC8vICEgVGhlc2UgdmFsdWVzIGFyZSB0ZW1wb3JhcnlcclxuICAgICAgICBsZXQgcmF0aW5nID0gW1JBVElORy5NQVRVUkVdO1xyXG4gICAgICAgIGxldCB3YXJuaW5nID0gW1dBUk5JTkcuTUNEXTtcclxuICAgICAgICBsZXQgY2F0ZWdvcnkgPSBbQ0FURUdPUlkuRk1dO1xyXG4gICAgICAgIGxldCB0YWcgPSBbXCJBbmdzdFwiLCBcIlNtdXRcIl07XHJcbiAgICAgICAgbGV0IGNyb3Nzb3ZlciA9IFwiVFwiO1xyXG4gICAgICAgIGxldCBjb21wbGV0ZSA9IFwiRlwiO1xyXG4gICAgICAgIGxldCB3b3JkQ291bnQgPSBbMTAwMCwgMTAwMDAwXTtcclxuICAgICAgICBsZXQgZGF0ZSA9IFtcIjIwMjEtMTAtMlwiLCBcIjIwMjItMTItMjNcIl07XHJcbiAgICAgICAgbGV0IHF1ZXJ5ID0gXCJUaGV5IGFsbCBuZWVkIGh1Z3NcIjtcclxuICAgICAgICBsZXQgbGFuZ3VhZ2UgPSBcImVuXCI7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IFJlZGlyZWN0IGluc3RlYWQgb2YgbG9nZ2luZyB1cmxcclxuICAgICAgICBsZXQgdGVtcCA9IGdldFJlZGlyZWN0VVJMKG9yaWdpbiwgdHlwZSwgaWQsIHJhdGluZywgd2FybmluZywgY2F0ZWdvcnksIHRhZywgY3Jvc3NvdmVyLCBjb21wbGV0ZSwgd29yZENvdW50LCBkYXRlLCBxdWVyeSwgbGFuZ3VhZ2UpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBBTzNFeHRlbnNpb246ICR7dGVtcH1gKTtcclxuICAgIH1cclxufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9