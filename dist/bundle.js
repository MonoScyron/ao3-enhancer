/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/export/constants.ts":
/*!*********************************!*\
  !*** ./src/export/constants.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CATEGORY = exports.WARNING = exports.RATING = exports.TYPE = exports.ORIGIN = exports.hideURLsRegex = exports.redirectURLsRegex = exports.languageKey = exports.kudosHitRatioKey = void 0;
// * Storage keys
// Kudos to hit ratio
exports.kudosHitRatioKey = "kudos-hit-ratio";
// Language
exports.languageKey = "language";
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
var constants_1 = __webpack_require__(/*! ../export/constants */ "./src/export/constants.ts");
console.log("AO3Extension: Extension loaded!");
// Check to see if current url needs to be redirected
redirect_1.redirectURLsRegex.forEach(function (url) {
    if (window.location.href.match(url)) {
        var parsed = (0, redirect_1.parseURL)(window.location.href);
        // ? parseURL function header sucks, use dictionary to make code legible?
        var type_1;
        if (parsed[1] == 'works')
            type_1 = redirect_1.TYPE.WORKS;
        else
            type_1 = redirect_1.TYPE.BOOKMARKS;
        var origin_1;
        if (parsed[0] == 'tags')
            origin_1 = redirect_1.ORIGIN.TAGS;
        else if (parsed[0] == 'users')
            origin_1 = redirect_1.ORIGIN.USERS;
        else
            origin_1 = redirect_1.ORIGIN.COLLECTIONS;
        var id_1 = parsed[2];
        // TODO: Get exclude data from local storage
        var rating_1 = []; //[RATING.MATURE];
        var warning_1 = []; //[WARNING.MCD];
        var category_1 = []; // [CATEGORY.FM];
        var tag_1 = []; //["Angst", "Smut"];
        var crossover_1 = ""; //"T";
        var complete_1 = ""; //"F";
        var wordCount_1 = []; //[1000, 100000];
        var date_1 = []; //["2021-10-2", "2022-12-23"];
        var query_1 = ""; // "They all need hugs";
        browser.storage.local.get(constants_1.languageKey).then(function (languageValue) {
            var language = null;
            if (languageValue[0] == 'true')
                language = languageValue[1];
            // TODO: Redirect instead of logging url
            var temp = (0, redirect_1.getRedirectURL)(origin_1, type_1, id_1, rating_1, warning_1, category_1, tag_1, crossover_1, complete_1, wordCount_1, date_1, query_1, language);
            console.log("AO3Extension: ".concat(temp));
        });
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3pCLFFBQVEsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFaEMsd0NBQXdDO1lBQ3hDLElBQUksSUFBSSxHQUFHLDZCQUFjLEVBQUMsUUFBTSxFQUFFLE1BQUksRUFBRSxJQUFFLEVBQUUsUUFBTSxFQUFFLFNBQU8sRUFBRSxVQUFRLEVBQUUsS0FBRyxFQUFFLFdBQVMsRUFBRSxVQUFRLEVBQUUsV0FBUyxFQUFFLE1BQUksRUFBRSxPQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDbkksT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBaUIsSUFBSSxDQUFFLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztLQUVOO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZXhwb3J0L2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXhwb3J0L3JlZGlyZWN0LnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudF9zY3JpcHRzL29ubG9hZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyAqIFN0b3JhZ2Uga2V5c1xyXG4vLyBLdWRvcyB0byBoaXQgcmF0aW9cclxuZXhwb3J0IGNvbnN0IGt1ZG9zSGl0UmF0aW9LZXkgPSBcImt1ZG9zLWhpdC1yYXRpb1wiO1xyXG4vLyBMYW5ndWFnZVxyXG5leHBvcnQgY29uc3QgbGFuZ3VhZ2VLZXkgPSBcImxhbmd1YWdlXCI7XHJcblxyXG4vKipcclxuICogUmVkaXJlY3QgdGhlc2UgVVJMcyB0byBleGNsdWRlIHdvcmtzIHdpdGggZXhjbHVkZWQgc3R1ZmZcclxuICovXHJcbmV4cG9ydCBjb25zdCByZWRpcmVjdFVSTHNSZWdleCA9IFtcclxuICAgIGBodHRwczpcXC9cXC9hcmNoaXZlb2ZvdXJvd25cXC5vcmdcXC90YWdzXFwvKmAsIC8vIFdvcmtzL2Jvb2ttYXJrcyBpbiBhIHRhZ1xyXG5cclxuICAgIGAvaHR0cHM6XFwvXFwvYXJjaGl2ZW9mb3Vyb3duXFwub3JnXFwvdXNlcnNcXC8uKlxcL3dvcmtzL2AsIC8vIFVzZXIncyB3b3Jrc1xyXG4gICAgYC9odHRwczpcXC9cXC9hcmNoaXZlb2ZvdXJvd25cXC5vcmdcXC91c2Vyc1xcLy4qXFwvYm9va21hcmtzL2AsIC8vIFVzZXIncyBib29rbWFya3NcclxuXHJcbiAgICBgL2h0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL2NvbGxlY3Rpb25zXFwvLipcXC93b3Jrcy9gLCAvLyBDb2xsZWN0aW9uJ3Mgd29ya3NcclxuICAgIGAvaHR0cHM6XFwvXFwvYXJjaGl2ZW9mb3Vyb3duXFwub3JnXFwvY29sbGVjdGlvbnNcXC8uKlxcL2Jvb2ttYXJrcy9gLy8gQ29sbGVjdGlvbidzIGJvb2ttYXJrc1xyXG5dO1xyXG5cclxuLyoqXHJcbiAqIENhbm5vdCByZWRpcmVjdCB0aGVzZSBVUkxzLCBuZWVkIHRvIGhpZGUgd29ya3Mgd2l0aCBleGNsdWRlZCBzdHVmZlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGhpZGVVUkxzUmVnZXggPSBbXHJcbiAgICBgL2h0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL3VzZXJzXFwvL2AsIC8vIFVzZXIncyBkYXNoYm9hcmRcclxuICAgIGAvaHR0cHM6XFwvXFwvYXJjaGl2ZW9mb3Vyb3duXFwub3JnXFwvdXNlcnNcXC8uKlxcL3Nlcmllcy9gLCAvLyBVc2VyJ3Mgc2VyaWVzXHJcbiAgICBgL2h0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL3VzZXJzXFwvLipcXC9naWZ0cy9gLCAvLyBVc2VyJ3MgZ2lmdHNcclxuXHJcbiAgICBgL2h0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL2NvbGxlY3Rpb25zXFwvLipcXC9zZXJpZXMvYCwgLy8gQ29sbGVjdGlvbidzIHNlcmllc1xyXG5dXHJcblxyXG4vKipcclxuICogT3JpZ2luIG9mIHBhZ2UgdG8gcmVkaXJlY3RcclxuICovXHJcbmV4cG9ydCBlbnVtIE9SSUdJTiB7XHJcbiAgICBDT0xMRUNUSU9OUyxcclxuICAgIFRBR1MsXHJcbiAgICBVU0VSU1xyXG59XHJcblxyXG4vKipcclxuICogVHlwZSBvZiBwb3N0IGJlaW5nIHNlYXJjaGVkIGZvclxyXG4gKi9cclxuZXhwb3J0IGVudW0gVFlQRSB7XHJcbiAgICBXT1JLUyA9ICd3b3JrJyxcclxuICAgIEJPT0tNQVJLUyA9ICdib29rbWFyaydcclxufVxyXG5cclxuLyoqXHJcbiAqIFJhdGluZ3MgdG8gcmF0aW5nIGlkc1xyXG4gKi9cclxuZXhwb3J0IGVudW0gUkFUSU5HIHtcclxuICAgIE5PVF9SQVRFRCA9IDksXHJcbiAgICBHRU4gPSAxMCxcclxuICAgIFRFRU4gPSAxMSxcclxuICAgIE1BVFVSRSA9IDEyLFxyXG4gICAgRVhQTElDSVQgPSAxM1xyXG59XHJcblxyXG4vKipcclxuICogV2FybmluZ3MgdG8gd2FybmluZyBpZHNcclxuICovXHJcbmV4cG9ydCBlbnVtIFdBUk5JTkcge1xyXG4gICAgQ0hPU0VfTk9UX1RPX1VTRSA9IDE0LFxyXG4gICAgTk9fV0FSTklOR1NfQVBQTFkgPSAxNixcclxuICAgIE1DRCA9IDE4LFxyXG4gICAgTk9OX0NPTiA9IDE5LFxyXG4gICAgVU5ERVJBR0UgPSAyMFxyXG59XHJcblxyXG4vKipcclxuICogQ2F0ZWdvcnkgdG8gY2F0ZWdvcnkgaWRzXHJcbiAqL1xyXG5leHBvcnQgZW51bSBDQVRFR09SWSB7XHJcbiAgICBHRU4gPSAyMSxcclxuICAgIEZNID0gMjIsXHJcbiAgICBNTSA9IDIzLFxyXG4gICAgT1RIRVIgPSAyNCxcclxuICAgIEZGID0gMTE2LFxyXG4gICAgTVVMVEkgPSAyMjQ2XHJcbn0iLCJpbXBvcnQgeyByZWRpcmVjdFVSTHNSZWdleCwgT1JJR0lOLCBUWVBFLCBSQVRJTkcsIFdBUk5JTkcsIENBVEVHT1JZIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XHJcbmV4cG9ydCB7IHJlZGlyZWN0VVJMc1JlZ2V4LCBPUklHSU4sIFRZUEUsIFJBVElORywgV0FSTklORywgQ0FURUdPUlkgfTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHJlZGlyZWN0IFVSTCB0byBjb250YWluIGV4Y2x1ZGVkIHRhZ3MsIG92ZXJyaWRpbmcgdGhlIHByZXZpb3VzIFVSTCdzIGhpc3RvcnlcclxuICogQHBhcmFtIHtPUklHSU59IG9yaWdpbiBPcmlnaW4gb2YgZG9jdW1lbnRcclxuICogQHBhcmFtIHtUWVBFfSB0eXBlIFR5cGUgb2Ygd29ya3MgYmVpbmcgc2hvd24gKCd3b3JrJyBvciAnYm9va21hcmsnKVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaWQgSUQgb2YgdGhlIHVybCB0byByZWRpcmVjdFxyXG4gKiBAcGFyYW0gZXhjbHVkZVJhdGluZ3MgUmF0aW5ncyB0byBleGNsdWRlXHJcbiAqIEBwYXJhbSBleGNsdWRlV2FybmluZ3MgV2FybmluZ3MgdG8gZXhjbHVkZVxyXG4gKiBAcGFyYW0gZXhjbHVkZUNhdGVnb3JpZXMgQ2F0ZWdvcmllcyB0byBleGNsdWRlXHJcbiAqIEBwYXJhbSBleGNsdWRlVGFncyBUYWdzIHRvIGV4Y2x1ZGVcclxuICogQHBhcmFtIGNyb3Nzb3ZlckJvb2wgSW5jbHVkZSwgZXhjbHVkZSwgb3IgZXhjbHVzaXZlbHkgc2hvdyBjcm9zc292ZXIgd29ya3NcclxuICogQHBhcmFtIGNvbXBsZXRlQm9vbCBJbmNsdWRlLCBleGNsdWRlLCBvciBleGNsdXNpdmVseSBzaG93IGNvbXBsZXRlIHdvcmtzXHJcbiAqIEBwYXJhbSB3b3JkQ291bnROdW1zIExpbWl0IHdvcmtzIHRvIGdpdmVuIHdvcmQgY291bnQgaW50ZXJ2YWxcclxuICogQHBhcmFtIGRhdGVBcnIgTGltaXQgd29ya3MgdG8gZ2l2ZW4gZGF0ZSBpbnRlcnZhbFxyXG4gKiBAcGFyYW0gcXVlcnkgUXVlcnkgd2l0aGluIHJlc3VsdHNcclxuICogQHBhcmFtIGxhbmd1YWdlSWQgSUQgb2YgbGFuZ3VhZ2UgdG8gbGltaXQgd29ya3MgdG9cclxuICogQHJldHVybnMgVVJMIHRvIHJlZGlyZWN0IHRvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVkaXJlY3RVUkwob3JpZ2luOiBPUklHSU4sIHR5cGU6IFRZUEUsIGlkOiBzdHJpbmcsIGV4Y2x1ZGVSYXRpbmdzOiBSQVRJTkdbXSA9IFtdLCBleGNsdWRlV2FybmluZ3M6IFdBUk5JTkdbXSA9IFtdLCBleGNsdWRlQ2F0ZWdvcmllczogQ0FURUdPUllbXSA9IFtdLCBleGNsdWRlVGFnczogc3RyaW5nW10gPSBbXSwgY3Jvc3NvdmVyQm9vbDogc3RyaW5nID0gXCJcIiwgY29tcGxldGVCb29sOiBzdHJpbmcgPSBcIlwiLCB3b3JkQ291bnROdW1zOiBudW1iZXJbXSA9IFtdLCBkYXRlQXJyOiBzdHJpbmdbXSA9IFtdLCBxdWVyeTogc3RyaW5nID0gXCJcIiwgbGFuZ3VhZ2VJZDogc3RyaW5nID0gXCJcIik6IHN0cmluZyB7XHJcbiAgICBsZXQgdHlwZVZhbCA9IHR5cGUudmFsdWVPZigpO1xyXG5cclxuICAgIC8vIENvbnN0cnVjdCBleGNsdWRlIHVybCBxdWVyaWVzXHJcbiAgICBsZXQgcmF0aW5ncyA9IFwiXCI7XHJcbiAgICBleGNsdWRlUmF0aW5ncz8uZm9yRWFjaCgocikgPT5cclxuICAgICAgICByYXRpbmdzICs9IGBleGNsdWRlXyR7dHlwZVZhbH1fc2VhcmNoW3JhdGluZ19pZHNdW109JHtyLnZhbHVlT2YoKX0mYFxyXG4gICAgKTtcclxuICAgIGxldCBhcmNoaXZlV2FybmluZ3MgPSBcIlwiO1xyXG4gICAgZXhjbHVkZVdhcm5pbmdzPy5mb3JFYWNoKCh3KSA9PlxyXG4gICAgICAgIGFyY2hpdmVXYXJuaW5ncyArPSBgZXhjbHVkZV8ke3R5cGVWYWx9X3NlYXJjaFthcmNoaXZlX3dhcm5pbmdfaWRzXVtdPSR7dy52YWx1ZU9mKCl9JmBcclxuICAgICk7XHJcbiAgICBsZXQgY2F0ZWdvcmllcyA9IFwiXCI7XHJcbiAgICBleGNsdWRlQ2F0ZWdvcmllcz8uZm9yRWFjaCgoYykgPT5cclxuICAgICAgICBjYXRlZ29yaWVzICs9IGBleGNsdWRlXyR7dHlwZVZhbH1fc2VhcmNoW2NhdGVnb3J5X2lkc11bXT0ke2MudmFsdWVPZigpfSZgXHJcbiAgICApO1xyXG5cclxuICAgIGxldCB0YWdzID0gYCR7dHlwZVZhbH1fc2VhcmNoW2V4Y2x1ZGVkX3RhZ19uYW1lc109YDtcclxuICAgIGV4Y2x1ZGVUYWdzPy5mb3JFYWNoKCh0KSA9PlxyXG4gICAgICAgIHRhZ3MgKz0gYCR7dC52YWx1ZU9mKCl9LGBcclxuICAgICk7XHJcbiAgICBpZihleGNsdWRlVGFncy5sZW5ndGggPiAwKVxyXG4gICAgICAgIHRhZ3MgPSB0YWdzLnN1YnN0cmluZygwLCB0YWdzLmxlbmd0aCAtIDEpICsgXCImXCI7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgdGFncyA9IFwiXCI7XHJcblxyXG4gICAgbGV0IGNyb3Nzb3ZlciA9IFwiXCI7XHJcbiAgICBpZihjcm9zc292ZXJCb29sICE9IFwiXCIpIHtcclxuICAgICAgICBjcm9zc292ZXIgPSBgJHt0eXBlVmFsfV9zZWFyY2hbY3Jvc3NvdmVyXT0ke2Nyb3Nzb3ZlckJvb2x9JmA7XHJcbiAgICB9XHJcbiAgICBsZXQgY29tcGxldGUgPSBcIlwiO1xyXG4gICAgaWYoY29tcGxldGVCb29sICE9IFwiXCIpIHtcclxuICAgICAgICBjb21wbGV0ZSA9IGAke3R5cGVWYWx9X3NlYXJjaFtjb21wbGV0ZV09JHtjb21wbGV0ZUJvb2x9JmA7XHJcbiAgICB9XHJcbiAgICBsZXQgd29yZENvdW50ID0gXCJcIjtcclxuICAgIGlmKHdvcmRDb3VudE51bXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGlmKHdvcmRDb3VudE51bXNbMF0gIT0gbnVsbClcclxuICAgICAgICAgICAgd29yZENvdW50ICs9IGAke3R5cGVWYWx9X3NlYXJjaFt3b3Jkc19mcm9tXT0ke3dvcmRDb3VudE51bXNbMF19JmA7XHJcbiAgICAgICAgaWYod29yZENvdW50TnVtc1sxXSAhPSBudWxsKVxyXG4gICAgICAgICAgICB3b3JkQ291bnQgKz0gYCR7dHlwZVZhbH1fc2VhcmNoW3dvcmRzX3RvXT0ke3dvcmRDb3VudE51bXNbMV19JmA7XHJcbiAgICB9XHJcbiAgICBsZXQgZGF0ZSA9IFwiXCI7XHJcbiAgICBpZihkYXRlQXJyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBpZihkYXRlQXJyWzBdICE9IG51bGwpXHJcbiAgICAgICAgICAgIGRhdGUgKz0gYCR7dHlwZVZhbH1fc2VhcmNoW2RhdGVfZnJvbV09JHtkYXRlQXJyWzBdfSZgO1xyXG4gICAgICAgIGlmKGRhdGVBcnJbMV0gIT0gbnVsbClcclxuICAgICAgICAgICAgZGF0ZSArPSBgJHt0eXBlVmFsfV9zZWFyY2hbZGF0ZV90b109JHtkYXRlQXJyWzFdfSZgO1xyXG4gICAgfVxyXG4gICAgbGV0IHNlYXJjaFdpdGhpblJlc3VsdHMgPSBxdWVyeSA9PSBudWxsID8gXCJcIiA6IGAke3R5cGVWYWx9X3NlYXJjaFtxdWVyeV09JHtxdWVyeX0mYDtcclxuICAgIGxldCBsYW5ndWFnZSA9IGxhbmd1YWdlSWQgPT0gbnVsbCA/IFwiXCIgOiBgJHt0eXBlVmFsfV9zZWFyY2hbbGFuZ3VhZ2VfaWRdPSR7bGFuZ3VhZ2VJZH0mYDtcclxuXHJcbiAgICAvLyBDb25zdHJ1Y3QgZnVsbCB1cmxcclxuICAgIGxldCByZWRpcmVjdCA9IGBodHRwczovL2FyY2hpdmVvZm91cm93bi5vcmcvJHt0eXBlVmFsfXM/JHtyYXRpbmdzfSR7YXJjaGl2ZVdhcm5pbmdzfSR7Y2F0ZWdvcmllc30ke3RhZ3N9JHtjcm9zc292ZXJ9JHtjb21wbGV0ZX0ke3dvcmRDb3VudH0ke2RhdGV9JHtzZWFyY2hXaXRoaW5SZXN1bHRzfSR7bGFuZ3VhZ2V9Y29tbWl0PVNvcnQrYW5kK0ZpbHRlciZgO1xyXG5cclxuICAgIC8vIFJlZGlyZWN0IHRvIGEgY29sbGVjdGlvblxyXG4gICAgaWYob3JpZ2luID09IE9SSUdJTi5DT0xMRUNUSU9OUykge1xyXG4gICAgICAgIHJlZGlyZWN0ICs9IGBjb2xsZWN0aW9uX2lkPSR7aWR9YDtcclxuICAgIH1cclxuICAgIC8vIFJlZGlyZWN0IHRvIGEgdXNlclxyXG4gICAgZWxzZSBpZihvcmlnaW4gPT0gT1JJR0lOLlVTRVJTKSB7XHJcbiAgICAgICAgcmVkaXJlY3QgKz0gYHVzZXJfaWQ9JHtpZH1gO1xyXG4gICAgfVxyXG4gICAgLy8gUmVkaXJlY3QgdG8gd29ya3NcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJlZGlyZWN0ICs9IGB0YWdfaWQ9JHtpZH1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlZGlyZWN0O1xyXG59XHJcblxyXG4vKipcclxuICogUGFyc2VzIGFuIEFPMyB1cmwgYW5kIHJldHVybnMgaXRzIG9yaWdpbiwgc2VhcmNoIHR5cGUsIGFuZCBpZC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVVJMIHRvIGJlIHBhcnNlZFxyXG4gKiBAcmV0dXJucyBvcmlnaW49J3RhZ3MnLCAndXNlcnMnLCBvciAnY29sbGVjdGlvbnMnXHJcbiAqIEByZXR1cm5zIHNlYXJjaFR5cGU9J3dvcmtzJyBvciAnYm9va21hcmtzJ1xyXG4gKiBAcmV0dXJucyBpZD1pZCBvZiBmYW5kb20gKGlmIG9yaWdpbj0nd29ya3MnKSwgaWQgb2YgdXNlciAoaWYgb3JpZ2luPSdib29rbWFya3MpLCBvciBpZCBvZiBjb2xsZWN0aW9uIChpZiBvcmlnaW49J2NvbGxlY3Rpb25zJylcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVVSTChiYXNlVVJMOiBzdHJpbmcpOiBbb3JpZ2luOiBzdHJpbmcsIHNlYXJjaFR5cGU6IHN0cmluZywgaWQ6IHN0cmluZ10ge1xyXG4gICAgbGV0IHNwbGl0ID0gYmFzZVVSTC5zcGxpdCgnLycpO1xyXG4gICAgcmV0dXJuIFtzcGxpdFszXSwgc3BsaXRbNV0sIHNwbGl0WzRdXTtcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgeyBDQVRFR09SWSwgZ2V0UmVkaXJlY3RVUkwsIE9SSUdJTiwgcGFyc2VVUkwsIFJBVElORywgcmVkaXJlY3RVUkxzUmVnZXgsIFRZUEUsIFdBUk5JTkcgfSBmcm9tIFwiLi4vZXhwb3J0L3JlZGlyZWN0XCI7XHJcbmltcG9ydCB7IGxhbmd1YWdlS2V5IH0gZnJvbSAnLi4vZXhwb3J0L2NvbnN0YW50cyc7XHJcblxyXG5jb25zb2xlLmxvZyhgQU8zRXh0ZW5zaW9uOiBFeHRlbnNpb24gbG9hZGVkIWApO1xyXG5cclxuLy8gQ2hlY2sgdG8gc2VlIGlmIGN1cnJlbnQgdXJsIG5lZWRzIHRvIGJlIHJlZGlyZWN0ZWRcclxucmVkaXJlY3RVUkxzUmVnZXguZm9yRWFjaCgodXJsOiBzdHJpbmcpID0+IHtcclxuICAgIGlmKHdpbmRvdy5sb2NhdGlvbi5ocmVmLm1hdGNoKHVybCkpIHtcclxuICAgICAgICBsZXQgcGFyc2VkID0gcGFyc2VVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG5cclxuICAgICAgICAvLyA/IHBhcnNlVVJMIGZ1bmN0aW9uIGhlYWRlciBzdWNrcywgdXNlIGRpY3Rpb25hcnkgdG8gbWFrZSBjb2RlIGxlZ2libGU/XHJcbiAgICAgICAgbGV0IHR5cGU6IFRZUEU7XHJcbiAgICAgICAgaWYocGFyc2VkWzFdID09ICd3b3JrcycpXHJcbiAgICAgICAgICAgIHR5cGUgPSBUWVBFLldPUktTO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdHlwZSA9IFRZUEUuQk9PS01BUktTO1xyXG5cclxuICAgICAgICBsZXQgb3JpZ2luOiBPUklHSU47XHJcbiAgICAgICAgaWYocGFyc2VkWzBdID09ICd0YWdzJylcclxuICAgICAgICAgICAgb3JpZ2luID0gT1JJR0lOLlRBR1M7XHJcbiAgICAgICAgZWxzZSBpZihwYXJzZWRbMF0gPT0gJ3VzZXJzJylcclxuICAgICAgICAgICAgb3JpZ2luID0gT1JJR0lOLlVTRVJTO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgb3JpZ2luID0gT1JJR0lOLkNPTExFQ1RJT05TO1xyXG5cclxuICAgICAgICBsZXQgaWQgPSBwYXJzZWRbMl07XHJcblxyXG4gICAgICAgIC8vIFRPRE86IEdldCBleGNsdWRlIGRhdGEgZnJvbSBsb2NhbCBzdG9yYWdlXHJcbiAgICAgICAgbGV0IHJhdGluZzogUkFUSU5HW10gPSBbXTsgLy9bUkFUSU5HLk1BVFVSRV07XHJcbiAgICAgICAgbGV0IHdhcm5pbmc6IFdBUk5JTkdbXSA9IFtdOyAvL1tXQVJOSU5HLk1DRF07XHJcbiAgICAgICAgbGV0IGNhdGVnb3J5OiBDQVRFR09SWVtdID0gW107IC8vIFtDQVRFR09SWS5GTV07XHJcbiAgICAgICAgbGV0IHRhZzogc3RyaW5nW10gPSBbXTsgLy9bXCJBbmdzdFwiLCBcIlNtdXRcIl07XHJcbiAgICAgICAgbGV0IGNyb3Nzb3ZlciA9IFwiXCI7IC8vXCJUXCI7XHJcbiAgICAgICAgbGV0IGNvbXBsZXRlID0gXCJcIjsgLy9cIkZcIjtcclxuICAgICAgICBsZXQgd29yZENvdW50OiBudW1iZXJbXSA9IFtdOyAvL1sxMDAwLCAxMDAwMDBdO1xyXG4gICAgICAgIGxldCBkYXRlOiBzdHJpbmdbXSA9IFtdOyAvL1tcIjIwMjEtMTAtMlwiLCBcIjIwMjItMTItMjNcIl07XHJcbiAgICAgICAgbGV0IHF1ZXJ5ID0gXCJcIjsgLy8gXCJUaGV5IGFsbCBuZWVkIGh1Z3NcIjtcclxuXHJcbiAgICAgICAgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldChsYW5ndWFnZUtleSkudGhlbigobGFuZ3VhZ2VWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbGFuZ3VhZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICBpZihsYW5ndWFnZVZhbHVlWzBdID09ICd0cnVlJylcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlID0gbGFuZ3VhZ2VWYWx1ZVsxXTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBUT0RPOiBSZWRpcmVjdCBpbnN0ZWFkIG9mIGxvZ2dpbmcgdXJsXHJcbiAgICAgICAgICAgIGxldCB0ZW1wID0gZ2V0UmVkaXJlY3RVUkwob3JpZ2luLCB0eXBlLCBpZCwgcmF0aW5nLCB3YXJuaW5nLCBjYXRlZ29yeSwgdGFnLCBjcm9zc292ZXIsIGNvbXBsZXRlLCB3b3JkQ291bnQsIGRhdGUsIHF1ZXJ5LCBsYW5ndWFnZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBTzNFeHRlbnNpb246ICR7dGVtcH1gKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbn0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==