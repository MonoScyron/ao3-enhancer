/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content_scripts/ratio.ts":
/*!**************************************!*\
  !*** ./src/content_scripts/ratio.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addKudosToHitRatios = void 0;
const works_1 = __webpack_require__(/*! ./works */ "./src/content_scripts/works.ts");
/**
  * Adds kudos to hit ratios to works on the page
 * @param document Document of the page
 * @returns [Array of ratio labels, array of ratio values]
 */
function addKudosToHitRatios(document) {
    // Get list of works
    let workList = (0, works_1.constructWorkList)(document);
    // Get list of work stats
    let statsList;
    if (document.URL.split('/')[3] == "works") {
        statsList = document.querySelectorAll("dl.stats");
    }
    else {
        statsList = document.querySelectorAll(".group[role='article'] dl.stats");
    }
    // Create ratio elements for all works on page
    let ratio_dtList = [];
    let ratio_ddList = [];
    // TODO: Use use work crawler to get stats instead
    workList.forEach((work, i) => {
        if (work.stats.kudos != null && work.stats.hits != 0) {
            var ratio_dt = document.createElement("dt");
            ratio_dt.className = `kudos-to-hit-ratio`;
            ratio_dt.innerHTML = "Ratio:";
            var ratio_dd = document.createElement("dd");
            ratio_dd.className = `ratio`;
            ratio_dd.innerHTML = Math.round((work.stats.kudos / work.stats.hits) * 1000) / 10 + "%";
            ratio_dtList[i] = ratio_dt;
            ratio_ddList[i] = ratio_dd;
        }
        else {
            ratio_dtList[i] = null;
            ratio_ddList[i] = null;
        }
    });
    /*
    // Create list of ratio elements
    for(let i = 0; i < workList.length; i++) {
        let work = workList[i];
        let kudos_dd = work.querySelector("dd.kudos")!;
        let hits_dd = work.querySelector("dd.hits")!;
        let hits = parseInt(hits_dd.innerHTML);

        // Get kudos & hits from work
        if(kudos_dd != null && hits_dd != null && hits > 0) {
            let ratio_dt = document.createElement("dt");
            ratio_dt.className = `kudos-to-hit-ratio`;
            ratio_dt.innerHTML = "Ratio:";

            let kudos: number;
            if(kudos_dd.firstChild!.nodeName == "A") {
                kudos = parseInt(kudos_dd.firstElementChild!.innerHTML);
            }
            else {
                kudos = parseInt(kudos_dd.innerHTML);
            }

            let ratio_dd = document.createElement("dd");
            ratio_dd.className = `ratio`;
            ratio_dd.innerHTML = Math.round((kudos / hits) * 1000) / 10 + "%";

            ratio_dtList[i] = ratio_dt;
            ratio_ddList[i] = ratio_dd;
        }
        else {
            ratio_dtList[i] = null;
            ratio_ddList[i] = null;
        }
    }
    */
    // Add list of ratio elements to works
    for (var i = 0; i < statsList.length; i++) {
        if (ratio_dtList[i] != null && ratio_ddList[i] != null) {
            statsList[i].append(ratio_dtList[i], ratio_ddList[i]);
        }
    }
}
exports.addKudosToHitRatios = addKudosToHitRatios;


/***/ }),

/***/ "./src/content_scripts/works.ts":
/*!**************************************!*\
  !*** ./src/content_scripts/works.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.constructWorkList = void 0;
const constants_1 = __webpack_require__(/*! ../export/constants */ "./src/export/constants.ts");
/**
 * Get list of works from page as an array of WorkElement objects
 * @param document Document of AO3 page
 * @returns Array of works from page as WorkElement objects
 */
function constructWorkList(document) {
    let rawWorks = constructRawWorkList(document);
    let workList = [];
    for (var i = 0; i < rawWorks.length; i++) {
        workList.push(constuctWorkElement(rawWorks[i]));
    }
    return workList;
}
exports.constructWorkList = constructWorkList;
/**
 * Takes a raw work element and parses it into a WorkElement object
 * @param work Raw work element
 * @returns WorkElement object
 */
function constuctWorkElement(work) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    let ret;
    // Author list
    let aList = [];
    work.querySelectorAll("a[rel='author']").forEach((e) => {
        aList.push(e.innerHTML);
    });
    // Gift list
    let gList = [];
    work.querySelectorAll("a[href$='/gifts']").forEach((e) => {
        gList === null || gList === void 0 ? void 0 : gList.push(e.innerHTML);
    });
    if (gList.length == 0)
        gList = null;
    // Fandom list
    let fList = [];
    (_a = work.querySelector('.fandoms')) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.tag').forEach((e) => {
        fList.push(e.innerHTML);
    });
    let tags = work.querySelector('.tags');
    // Warning list
    let wList = [];
    tags.querySelectorAll('.warnings').forEach((e) => {
        wList.push((0, constants_1.warningToEnum)(e.querySelector('.tag').innerHTML));
    });
    // Tag list
    let tList = [];
    tags.querySelectorAll('li:not(.warnings)').forEach((e) => {
        tList.push(e.querySelector('.tag').innerHTML);
    });
    if (tList.length == 0)
        tList = null;
    // Series list
    let sList = [];
    (_b = work.querySelector('.series')) === null || _b === void 0 ? void 0 : _b.querySelectorAll('a').forEach((e) => {
        sList.push(e.innerHTML);
    });
    if (sList.length == 0)
        sList = null;
    let stats = work.querySelector('.stats');
    // Chapters
    let chapters = stats.querySelector('dd.chapters').innerText.split('/');
    // Categories list
    let cList = [];
    (_d = (_c = work.querySelector('span.category')) === null || _c === void 0 ? void 0 : _c.getAttribute('title')) === null || _d === void 0 ? void 0 : _d.split(', ').forEach(e => {
        cList.push((0, constants_1.categoryToEnum)(e));
    });
    if (cList.length == 0)
        cList = null;
    ret = {
        href: (_f = (_e = work.querySelector(".heading")) === null || _e === void 0 ? void 0 : _e.firstElementChild) === null || _f === void 0 ? void 0 : _f.getAttribute("href"),
        title: (_h = (_g = work.querySelector(".heading")) === null || _g === void 0 ? void 0 : _g.firstElementChild) === null || _h === void 0 ? void 0 : _h.innerHTML,
        authors: aList,
        recipients: gList,
        fandoms: fList,
        tags: {
            warnings: wList,
            tags: tList
        },
        summary: work.querySelector('.summary').innerText,
        series: sList,
        updateDate: (_j = work.querySelector('p.datetime')) === null || _j === void 0 ? void 0 : _j.innerHTML,
        rating: (0, constants_1.ratingToEnum)((_k = work.querySelector('span.rating')) === null || _k === void 0 ? void 0 : _k.getAttribute('title')),
        categories: cList,
        complete: ((_l = work.querySelector('span.iswip')) === null || _l === void 0 ? void 0 : _l.getAttribute('title')) == 'Complete Work',
        stats: {
            language: (_m = stats.querySelector('dd.language')) === null || _m === void 0 ? void 0 : _m.innerHTML,
            wordCount: parseInt((_o = stats.querySelector('dd.words')) === null || _o === void 0 ? void 0 : _o.innerHTML),
            chapterCount: parseInt(chapters[0]),
            finalChapterCount: chapters[1] == '?' ? null : parseInt(chapters[1]),
            collections: stats.querySelector('dd.collections') == null ? 0
                : parseInt(stats.querySelector('dd.collections').innerText),
            comments: stats.querySelector('dd.comments') == null ? 0
                : parseInt(stats.querySelector('dd.comments').innerText),
            kudos: stats.querySelector('dd.kudos') == null ? 0
                : parseInt(stats.querySelector('dd.kudos').innerText),
            bookmarks: stats.querySelector('dd.bookmarks') == null ? 0
                : parseInt(stats.querySelector('dd.bookmarks').innerText),
            hits: parseInt((_p = stats.querySelector('dd.hits')) === null || _p === void 0 ? void 0 : _p.innerHTML)
        }
    };
    return ret;
}
/**
 * Get list of works from page as an HTMLCollection
 * @param document Document of AO3 page
 * @returns List of works from page
 */
function constructRawWorkList(document) {
    var _a;
    let type = (_a = document.querySelector('.group')) === null || _a === void 0 ? void 0 : _a.classList[0];
    if (document.URL.split('/')[3] == "works") {
        return document.getElementsByClassName("work meta group"); // meta
    }
    else if (type == "bookmark" || type == "work") {
        return document.getElementsByClassName(type + " blurb group");
    }
    else {
        return document.getElementsByClassName("work blurb group");
    }
}


/***/ }),

/***/ "./src/export/constants.ts":
/*!*********************************!*\
  !*** ./src/export/constants.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.categoryToEnum = exports.ratingToEnum = exports.warningToEnum = exports.idToWarningEnum = exports.idToCatetoryEnum = exports.idToRatingEnum = exports.WARNING = exports.CATEGORY = exports.RATING = exports.HIDE_URLS = exports.REDIRECT_URLS = exports.SETTINGS_CHANGED = exports.DEFAULT_VALUES = exports.STORAGE_KEYS = void 0;
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
/**
 * Converts string value of a warning to the corresponding WARNING enum
 * @param warning String of warning from page
 * @returns Converted enum value of param
 */
function warningToEnum(warning) {
    if (warning == "Choose Not To Use Archive Warnings")
        return WARNING.choseNotToUse;
    else if (warning == "Graphic Depictions Of Violence")
        return WARNING.violence;
    else if (warning == "Major Character Death")
        return WARNING.mcd;
    else if (warning == "No Archive Warnings Apply")
        return WARNING.noWarningsApply;
    else if (warning == "Rape/Non-Con")
        return WARNING.nonCon;
    else
        return WARNING.underage;
}
exports.warningToEnum = warningToEnum;
/**
 * Converts string value of a rating to the corresponding RATING enum
 * @param warning String of rating from page
 * @returns Converted enum value of param
 */
function ratingToEnum(rating) {
    if (rating == "Not Rated")
        return RATING.notRated;
    else if (rating == "General Audiences")
        return RATING.gen;
    else if (rating == "Teen And Up Audiences")
        return RATING.teen;
    else if (rating == "Mature")
        return RATING.mature;
    else
        return RATING.explicit;
}
exports.ratingToEnum = ratingToEnum;
/**
 * Converts string value of a category to the corresponding CATEGORY enum
 * @param warning String of category from page
 * @returns Converted enum value of param
 */
function categoryToEnum(category) {
    if (category == "F/F")
        return CATEGORY.ff;
    else if (category == "F/M")
        return CATEGORY.fm;
    else if (category == "Gen")
        return CATEGORY.gen;
    else if (category == "M/M")
        return CATEGORY.mm;
    else if (category == "Multi")
        return CATEGORY.multi;
    else
        return CATEGORY.other;
}
exports.categoryToEnum = categoryToEnum;


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
const constants_1 = __webpack_require__(/*! ../export/constants */ "./src/export/constants.ts");
const ratio_1 = __webpack_require__(/*! ./ratio */ "./src/content_scripts/ratio.ts");
// * Executed code start
browser.storage.local.get(constants_1.STORAGE_KEYS).then((value) => {
    // If no settings values are in storage, set default setting values in storage
    if (Object.keys(value).length == 0) {
        browser.storage.local.set(constants_1.DEFAULT_VALUES).then(() => onloadPromise(constants_1.DEFAULT_VALUES));
    }
    else
        onloadPromise(value);
});
// * Executed code end
// * Functions
/**
 * Executed after all promises are fulfilled
 * @param value Local storage values of all saved settings
 */
function onloadPromise(value) {
    // Add kudos to hit ratio if on
    if (value.kudosHitRatio)
        (0, ratio_1.addKudosToHitRatios)(document);
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZW50X3NjcmlwdHMvY3NfYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCwyQkFBMkI7QUFDM0IsZ0JBQWdCLG1CQUFPLENBQUMsK0NBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isc0JBQXNCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7Ozs7Ozs7Ozs7O0FDbEZkO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHlCQUF5QjtBQUN6QixvQkFBb0IsbUJBQU8sQ0FBQyxzREFBcUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUU7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM1SGE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsc0JBQXNCLEdBQUcsb0JBQW9CLEdBQUcscUJBQXFCLEdBQUcsdUJBQXVCLEdBQUcsd0JBQXdCLEdBQUcsc0JBQXNCLEdBQUcsZUFBZSxHQUFHLGdCQUFnQixHQUFHLGNBQWMsR0FBRyxpQkFBaUIsR0FBRyxxQkFBcUIsR0FBRyx3QkFBd0IsR0FBRyxzQkFBc0IsR0FBRyxvQkFBb0I7QUFDaFU7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw4QkFBOEIsY0FBYyxLQUFLO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsa0NBQWtDLGdCQUFnQixLQUFLO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDLGVBQWUsS0FBSztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7Ozs7Ozs7VUNuTHRCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsb0JBQW9CLG1CQUFPLENBQUMsc0RBQXFCO0FBQ2pELGdCQUFnQixtQkFBTyxDQUFDLCtDQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jb250ZW50X3NjcmlwdHMvcmF0aW8udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnRfc2NyaXB0cy93b3Jrcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXhwb3J0L2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnRfc2NyaXB0cy9vbmxvYWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5hZGRLdWRvc1RvSGl0UmF0aW9zID0gdm9pZCAwO1xyXG5jb25zdCB3b3Jrc18xID0gcmVxdWlyZShcIi4vd29ya3NcIik7XHJcbi8qKlxyXG4gICogQWRkcyBrdWRvcyB0byBoaXQgcmF0aW9zIHRvIHdvcmtzIG9uIHRoZSBwYWdlXHJcbiAqIEBwYXJhbSBkb2N1bWVudCBEb2N1bWVudCBvZiB0aGUgcGFnZVxyXG4gKiBAcmV0dXJucyBbQXJyYXkgb2YgcmF0aW8gbGFiZWxzLCBhcnJheSBvZiByYXRpbyB2YWx1ZXNdXHJcbiAqL1xyXG5mdW5jdGlvbiBhZGRLdWRvc1RvSGl0UmF0aW9zKGRvY3VtZW50KSB7XHJcbiAgICAvLyBHZXQgbGlzdCBvZiB3b3Jrc1xyXG4gICAgbGV0IHdvcmtMaXN0ID0gKDAsIHdvcmtzXzEuY29uc3RydWN0V29ya0xpc3QpKGRvY3VtZW50KTtcclxuICAgIC8vIEdldCBsaXN0IG9mIHdvcmsgc3RhdHNcclxuICAgIGxldCBzdGF0c0xpc3Q7XHJcbiAgICBpZiAoZG9jdW1lbnQuVVJMLnNwbGl0KCcvJylbM10gPT0gXCJ3b3Jrc1wiKSB7XHJcbiAgICAgICAgc3RhdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRsLnN0YXRzXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgc3RhdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncm91cFtyb2xlPSdhcnRpY2xlJ10gZGwuc3RhdHNcIik7XHJcbiAgICB9XHJcbiAgICAvLyBDcmVhdGUgcmF0aW8gZWxlbWVudHMgZm9yIGFsbCB3b3JrcyBvbiBwYWdlXHJcbiAgICBsZXQgcmF0aW9fZHRMaXN0ID0gW107XHJcbiAgICBsZXQgcmF0aW9fZGRMaXN0ID0gW107XHJcbiAgICAvLyBUT0RPOiBVc2UgdXNlIHdvcmsgY3Jhd2xlciB0byBnZXQgc3RhdHMgaW5zdGVhZFxyXG4gICAgd29ya0xpc3QuZm9yRWFjaCgod29yaywgaSkgPT4ge1xyXG4gICAgICAgIGlmICh3b3JrLnN0YXRzLmt1ZG9zICE9IG51bGwgJiYgd29yay5zdGF0cy5oaXRzICE9IDApIHtcclxuICAgICAgICAgICAgdmFyIHJhdGlvX2R0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImR0XCIpO1xyXG4gICAgICAgICAgICByYXRpb19kdC5jbGFzc05hbWUgPSBga3Vkb3MtdG8taGl0LXJhdGlvYDtcclxuICAgICAgICAgICAgcmF0aW9fZHQuaW5uZXJIVE1MID0gXCJSYXRpbzpcIjtcclxuICAgICAgICAgICAgdmFyIHJhdGlvX2RkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRkXCIpO1xyXG4gICAgICAgICAgICByYXRpb19kZC5jbGFzc05hbWUgPSBgcmF0aW9gO1xyXG4gICAgICAgICAgICByYXRpb19kZC5pbm5lckhUTUwgPSBNYXRoLnJvdW5kKCh3b3JrLnN0YXRzLmt1ZG9zIC8gd29yay5zdGF0cy5oaXRzKSAqIDEwMDApIC8gMTAgKyBcIiVcIjtcclxuICAgICAgICAgICAgcmF0aW9fZHRMaXN0W2ldID0gcmF0aW9fZHQ7XHJcbiAgICAgICAgICAgIHJhdGlvX2RkTGlzdFtpXSA9IHJhdGlvX2RkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmF0aW9fZHRMaXN0W2ldID0gbnVsbDtcclxuICAgICAgICAgICAgcmF0aW9fZGRMaXN0W2ldID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8qXHJcbiAgICAvLyBDcmVhdGUgbGlzdCBvZiByYXRpbyBlbGVtZW50c1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHdvcmtMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHdvcmsgPSB3b3JrTGlzdFtpXTtcclxuICAgICAgICBsZXQga3Vkb3NfZGQgPSB3b3JrLnF1ZXJ5U2VsZWN0b3IoXCJkZC5rdWRvc1wiKSE7XHJcbiAgICAgICAgbGV0IGhpdHNfZGQgPSB3b3JrLnF1ZXJ5U2VsZWN0b3IoXCJkZC5oaXRzXCIpITtcclxuICAgICAgICBsZXQgaGl0cyA9IHBhcnNlSW50KGhpdHNfZGQuaW5uZXJIVE1MKTtcclxuXHJcbiAgICAgICAgLy8gR2V0IGt1ZG9zICYgaGl0cyBmcm9tIHdvcmtcclxuICAgICAgICBpZihrdWRvc19kZCAhPSBudWxsICYmIGhpdHNfZGQgIT0gbnVsbCAmJiBoaXRzID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgcmF0aW9fZHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZHRcIik7XHJcbiAgICAgICAgICAgIHJhdGlvX2R0LmNsYXNzTmFtZSA9IGBrdWRvcy10by1oaXQtcmF0aW9gO1xyXG4gICAgICAgICAgICByYXRpb19kdC5pbm5lckhUTUwgPSBcIlJhdGlvOlwiO1xyXG5cclxuICAgICAgICAgICAgbGV0IGt1ZG9zOiBudW1iZXI7XHJcbiAgICAgICAgICAgIGlmKGt1ZG9zX2RkLmZpcnN0Q2hpbGQhLm5vZGVOYW1lID09IFwiQVwiKSB7XHJcbiAgICAgICAgICAgICAgICBrdWRvcyA9IHBhcnNlSW50KGt1ZG9zX2RkLmZpcnN0RWxlbWVudENoaWxkIS5pbm5lckhUTUwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAga3Vkb3MgPSBwYXJzZUludChrdWRvc19kZC5pbm5lckhUTUwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgcmF0aW9fZGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGRcIik7XHJcbiAgICAgICAgICAgIHJhdGlvX2RkLmNsYXNzTmFtZSA9IGByYXRpb2A7XHJcbiAgICAgICAgICAgIHJhdGlvX2RkLmlubmVySFRNTCA9IE1hdGgucm91bmQoKGt1ZG9zIC8gaGl0cykgKiAxMDAwKSAvIDEwICsgXCIlXCI7XHJcblxyXG4gICAgICAgICAgICByYXRpb19kdExpc3RbaV0gPSByYXRpb19kdDtcclxuICAgICAgICAgICAgcmF0aW9fZGRMaXN0W2ldID0gcmF0aW9fZGQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByYXRpb19kdExpc3RbaV0gPSBudWxsO1xyXG4gICAgICAgICAgICByYXRpb19kZExpc3RbaV0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICovXHJcbiAgICAvLyBBZGQgbGlzdCBvZiByYXRpbyBlbGVtZW50cyB0byB3b3Jrc1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGF0c0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAocmF0aW9fZHRMaXN0W2ldICE9IG51bGwgJiYgcmF0aW9fZGRMaXN0W2ldICE9IG51bGwpIHtcclxuICAgICAgICAgICAgc3RhdHNMaXN0W2ldLmFwcGVuZChyYXRpb19kdExpc3RbaV0sIHJhdGlvX2RkTGlzdFtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuYWRkS3Vkb3NUb0hpdFJhdGlvcyA9IGFkZEt1ZG9zVG9IaXRSYXRpb3M7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuY29uc3RydWN0V29ya0xpc3QgPSB2b2lkIDA7XHJcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uL2V4cG9ydC9jb25zdGFudHNcIik7XHJcbi8qKlxyXG4gKiBHZXQgbGlzdCBvZiB3b3JrcyBmcm9tIHBhZ2UgYXMgYW4gYXJyYXkgb2YgV29ya0VsZW1lbnQgb2JqZWN0c1xyXG4gKiBAcGFyYW0gZG9jdW1lbnQgRG9jdW1lbnQgb2YgQU8zIHBhZ2VcclxuICogQHJldHVybnMgQXJyYXkgb2Ygd29ya3MgZnJvbSBwYWdlIGFzIFdvcmtFbGVtZW50IG9iamVjdHNcclxuICovXHJcbmZ1bmN0aW9uIGNvbnN0cnVjdFdvcmtMaXN0KGRvY3VtZW50KSB7XHJcbiAgICBsZXQgcmF3V29ya3MgPSBjb25zdHJ1Y3RSYXdXb3JrTGlzdChkb2N1bWVudCk7XHJcbiAgICBsZXQgd29ya0xpc3QgPSBbXTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmF3V29ya3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB3b3JrTGlzdC5wdXNoKGNvbnN0dWN0V29ya0VsZW1lbnQocmF3V29ya3NbaV0pKTtcclxuICAgIH1cclxuICAgIHJldHVybiB3b3JrTGlzdDtcclxufVxyXG5leHBvcnRzLmNvbnN0cnVjdFdvcmtMaXN0ID0gY29uc3RydWN0V29ya0xpc3Q7XHJcbi8qKlxyXG4gKiBUYWtlcyBhIHJhdyB3b3JrIGVsZW1lbnQgYW5kIHBhcnNlcyBpdCBpbnRvIGEgV29ya0VsZW1lbnQgb2JqZWN0XHJcbiAqIEBwYXJhbSB3b3JrIFJhdyB3b3JrIGVsZW1lbnRcclxuICogQHJldHVybnMgV29ya0VsZW1lbnQgb2JqZWN0XHJcbiAqL1xyXG5mdW5jdGlvbiBjb25zdHVjdFdvcmtFbGVtZW50KHdvcmspIHtcclxuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaywgX2wsIF9tLCBfbywgX3A7XHJcbiAgICBsZXQgcmV0O1xyXG4gICAgLy8gQXV0aG9yIGxpc3RcclxuICAgIGxldCBhTGlzdCA9IFtdO1xyXG4gICAgd29yay5xdWVyeVNlbGVjdG9yQWxsKFwiYVtyZWw9J2F1dGhvciddXCIpLmZvckVhY2goKGUpID0+IHtcclxuICAgICAgICBhTGlzdC5wdXNoKGUuaW5uZXJIVE1MKTtcclxuICAgIH0pO1xyXG4gICAgLy8gR2lmdCBsaXN0XHJcbiAgICBsZXQgZ0xpc3QgPSBbXTtcclxuICAgIHdvcmsucXVlcnlTZWxlY3RvckFsbChcImFbaHJlZiQ9Jy9naWZ0cyddXCIpLmZvckVhY2goKGUpID0+IHtcclxuICAgICAgICBnTGlzdCA9PT0gbnVsbCB8fCBnTGlzdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZ0xpc3QucHVzaChlLmlubmVySFRNTCk7XHJcbiAgICB9KTtcclxuICAgIGlmIChnTGlzdC5sZW5ndGggPT0gMClcclxuICAgICAgICBnTGlzdCA9IG51bGw7XHJcbiAgICAvLyBGYW5kb20gbGlzdFxyXG4gICAgbGV0IGZMaXN0ID0gW107XHJcbiAgICAoX2EgPSB3b3JrLnF1ZXJ5U2VsZWN0b3IoJy5mYW5kb21zJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5xdWVyeVNlbGVjdG9yQWxsKCcudGFnJykuZm9yRWFjaCgoZSkgPT4ge1xyXG4gICAgICAgIGZMaXN0LnB1c2goZS5pbm5lckhUTUwpO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgdGFncyA9IHdvcmsucXVlcnlTZWxlY3RvcignLnRhZ3MnKTtcclxuICAgIC8vIFdhcm5pbmcgbGlzdFxyXG4gICAgbGV0IHdMaXN0ID0gW107XHJcbiAgICB0YWdzLnF1ZXJ5U2VsZWN0b3JBbGwoJy53YXJuaW5ncycpLmZvckVhY2goKGUpID0+IHtcclxuICAgICAgICB3TGlzdC5wdXNoKCgwLCBjb25zdGFudHNfMS53YXJuaW5nVG9FbnVtKShlLnF1ZXJ5U2VsZWN0b3IoJy50YWcnKS5pbm5lckhUTUwpKTtcclxuICAgIH0pO1xyXG4gICAgLy8gVGFnIGxpc3RcclxuICAgIGxldCB0TGlzdCA9IFtdO1xyXG4gICAgdGFncy5xdWVyeVNlbGVjdG9yQWxsKCdsaTpub3QoLndhcm5pbmdzKScpLmZvckVhY2goKGUpID0+IHtcclxuICAgICAgICB0TGlzdC5wdXNoKGUucXVlcnlTZWxlY3RvcignLnRhZycpLmlubmVySFRNTCk7XHJcbiAgICB9KTtcclxuICAgIGlmICh0TGlzdC5sZW5ndGggPT0gMClcclxuICAgICAgICB0TGlzdCA9IG51bGw7XHJcbiAgICAvLyBTZXJpZXMgbGlzdFxyXG4gICAgbGV0IHNMaXN0ID0gW107XHJcbiAgICAoX2IgPSB3b3JrLnF1ZXJ5U2VsZWN0b3IoJy5zZXJpZXMnKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKS5mb3JFYWNoKChlKSA9PiB7XHJcbiAgICAgICAgc0xpc3QucHVzaChlLmlubmVySFRNTCk7XHJcbiAgICB9KTtcclxuICAgIGlmIChzTGlzdC5sZW5ndGggPT0gMClcclxuICAgICAgICBzTGlzdCA9IG51bGw7XHJcbiAgICBsZXQgc3RhdHMgPSB3b3JrLnF1ZXJ5U2VsZWN0b3IoJy5zdGF0cycpO1xyXG4gICAgLy8gQ2hhcHRlcnNcclxuICAgIGxldCBjaGFwdGVycyA9IHN0YXRzLnF1ZXJ5U2VsZWN0b3IoJ2RkLmNoYXB0ZXJzJykuaW5uZXJUZXh0LnNwbGl0KCcvJyk7XHJcbiAgICAvLyBDYXRlZ29yaWVzIGxpc3RcclxuICAgIGxldCBjTGlzdCA9IFtdO1xyXG4gICAgKF9kID0gKF9jID0gd29yay5xdWVyeVNlbGVjdG9yKCdzcGFuLmNhdGVnb3J5JykpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5zcGxpdCgnLCAnKS5mb3JFYWNoKGUgPT4ge1xyXG4gICAgICAgIGNMaXN0LnB1c2goKDAsIGNvbnN0YW50c18xLmNhdGVnb3J5VG9FbnVtKShlKSk7XHJcbiAgICB9KTtcclxuICAgIGlmIChjTGlzdC5sZW5ndGggPT0gMClcclxuICAgICAgICBjTGlzdCA9IG51bGw7XHJcbiAgICByZXQgPSB7XHJcbiAgICAgICAgaHJlZjogKF9mID0gKF9lID0gd29yay5xdWVyeVNlbGVjdG9yKFwiLmhlYWRpbmdcIikpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5maXJzdEVsZW1lbnRDaGlsZCkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLmdldEF0dHJpYnV0ZShcImhyZWZcIiksXHJcbiAgICAgICAgdGl0bGU6IChfaCA9IChfZyA9IHdvcmsucXVlcnlTZWxlY3RvcihcIi5oZWFkaW5nXCIpKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2cuZmlyc3RFbGVtZW50Q2hpbGQpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5pbm5lckhUTUwsXHJcbiAgICAgICAgYXV0aG9yczogYUxpc3QsXHJcbiAgICAgICAgcmVjaXBpZW50czogZ0xpc3QsXHJcbiAgICAgICAgZmFuZG9tczogZkxpc3QsXHJcbiAgICAgICAgdGFnczoge1xyXG4gICAgICAgICAgICB3YXJuaW5nczogd0xpc3QsXHJcbiAgICAgICAgICAgIHRhZ3M6IHRMaXN0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdW1tYXJ5OiB3b3JrLnF1ZXJ5U2VsZWN0b3IoJy5zdW1tYXJ5JykuaW5uZXJUZXh0LFxyXG4gICAgICAgIHNlcmllczogc0xpc3QsXHJcbiAgICAgICAgdXBkYXRlRGF0ZTogKF9qID0gd29yay5xdWVyeVNlbGVjdG9yKCdwLmRhdGV0aW1lJykpID09PSBudWxsIHx8IF9qID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfai5pbm5lckhUTUwsXHJcbiAgICAgICAgcmF0aW5nOiAoMCwgY29uc3RhbnRzXzEucmF0aW5nVG9FbnVtKSgoX2sgPSB3b3JrLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4ucmF0aW5nJykpID09PSBudWxsIHx8IF9rID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfay5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykpLFxyXG4gICAgICAgIGNhdGVnb3JpZXM6IGNMaXN0LFxyXG4gICAgICAgIGNvbXBsZXRlOiAoKF9sID0gd29yay5xdWVyeVNlbGVjdG9yKCdzcGFuLmlzd2lwJykpID09PSBudWxsIHx8IF9sID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbC5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykpID09ICdDb21wbGV0ZSBXb3JrJyxcclxuICAgICAgICBzdGF0czoge1xyXG4gICAgICAgICAgICBsYW5ndWFnZTogKF9tID0gc3RhdHMucXVlcnlTZWxlY3RvcignZGQubGFuZ3VhZ2UnKSkgPT09IG51bGwgfHwgX20gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9tLmlubmVySFRNTCxcclxuICAgICAgICAgICAgd29yZENvdW50OiBwYXJzZUludCgoX28gPSBzdGF0cy5xdWVyeVNlbGVjdG9yKCdkZC53b3JkcycpKSA9PT0gbnVsbCB8fCBfbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX28uaW5uZXJIVE1MKSxcclxuICAgICAgICAgICAgY2hhcHRlckNvdW50OiBwYXJzZUludChjaGFwdGVyc1swXSksXHJcbiAgICAgICAgICAgIGZpbmFsQ2hhcHRlckNvdW50OiBjaGFwdGVyc1sxXSA9PSAnPycgPyBudWxsIDogcGFyc2VJbnQoY2hhcHRlcnNbMV0pLFxyXG4gICAgICAgICAgICBjb2xsZWN0aW9uczogc3RhdHMucXVlcnlTZWxlY3RvcignZGQuY29sbGVjdGlvbnMnKSA9PSBudWxsID8gMFxyXG4gICAgICAgICAgICAgICAgOiBwYXJzZUludChzdGF0cy5xdWVyeVNlbGVjdG9yKCdkZC5jb2xsZWN0aW9ucycpLmlubmVyVGV4dCksXHJcbiAgICAgICAgICAgIGNvbW1lbnRzOiBzdGF0cy5xdWVyeVNlbGVjdG9yKCdkZC5jb21tZW50cycpID09IG51bGwgPyAwXHJcbiAgICAgICAgICAgICAgICA6IHBhcnNlSW50KHN0YXRzLnF1ZXJ5U2VsZWN0b3IoJ2RkLmNvbW1lbnRzJykuaW5uZXJUZXh0KSxcclxuICAgICAgICAgICAga3Vkb3M6IHN0YXRzLnF1ZXJ5U2VsZWN0b3IoJ2RkLmt1ZG9zJykgPT0gbnVsbCA/IDBcclxuICAgICAgICAgICAgICAgIDogcGFyc2VJbnQoc3RhdHMucXVlcnlTZWxlY3RvcignZGQua3Vkb3MnKS5pbm5lclRleHQpLFxyXG4gICAgICAgICAgICBib29rbWFya3M6IHN0YXRzLnF1ZXJ5U2VsZWN0b3IoJ2RkLmJvb2ttYXJrcycpID09IG51bGwgPyAwXHJcbiAgICAgICAgICAgICAgICA6IHBhcnNlSW50KHN0YXRzLnF1ZXJ5U2VsZWN0b3IoJ2RkLmJvb2ttYXJrcycpLmlubmVyVGV4dCksXHJcbiAgICAgICAgICAgIGhpdHM6IHBhcnNlSW50KChfcCA9IHN0YXRzLnF1ZXJ5U2VsZWN0b3IoJ2RkLmhpdHMnKSkgPT09IG51bGwgfHwgX3AgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9wLmlubmVySFRNTClcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHJldDtcclxufVxyXG4vKipcclxuICogR2V0IGxpc3Qgb2Ygd29ya3MgZnJvbSBwYWdlIGFzIGFuIEhUTUxDb2xsZWN0aW9uXHJcbiAqIEBwYXJhbSBkb2N1bWVudCBEb2N1bWVudCBvZiBBTzMgcGFnZVxyXG4gKiBAcmV0dXJucyBMaXN0IG9mIHdvcmtzIGZyb20gcGFnZVxyXG4gKi9cclxuZnVuY3Rpb24gY29uc3RydWN0UmF3V29ya0xpc3QoZG9jdW1lbnQpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGxldCB0eXBlID0gKF9hID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyb3VwJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jbGFzc0xpc3RbMF07XHJcbiAgICBpZiAoZG9jdW1lbnQuVVJMLnNwbGl0KCcvJylbM10gPT0gXCJ3b3Jrc1wiKSB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ3b3JrIG1ldGEgZ3JvdXBcIik7IC8vIG1ldGFcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJib29rbWFya1wiIHx8IHR5cGUgPT0gXCJ3b3JrXCIpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0eXBlICsgXCIgYmx1cmIgZ3JvdXBcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIndvcmsgYmx1cmIgZ3JvdXBcIik7XHJcbiAgICB9XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5jYXRlZ29yeVRvRW51bSA9IGV4cG9ydHMucmF0aW5nVG9FbnVtID0gZXhwb3J0cy53YXJuaW5nVG9FbnVtID0gZXhwb3J0cy5pZFRvV2FybmluZ0VudW0gPSBleHBvcnRzLmlkVG9DYXRldG9yeUVudW0gPSBleHBvcnRzLmlkVG9SYXRpbmdFbnVtID0gZXhwb3J0cy5XQVJOSU5HID0gZXhwb3J0cy5DQVRFR09SWSA9IGV4cG9ydHMuUkFUSU5HID0gZXhwb3J0cy5ISURFX1VSTFMgPSBleHBvcnRzLlJFRElSRUNUX1VSTFMgPSBleHBvcnRzLlNFVFRJTkdTX0NIQU5HRUQgPSBleHBvcnRzLkRFRkFVTFRfVkFMVUVTID0gZXhwb3J0cy5TVE9SQUdFX0tFWVMgPSB2b2lkIDA7XHJcbi8vIFN0b3JhZ2Uga2V5c1xyXG5leHBvcnRzLlNUT1JBR0VfS0VZUyA9IFtcclxuICAgIFwia3Vkb3NIaXRSYXRpb1wiLCBcImZpbHRlcmluZ1wiLCBcImxhbmd1YWdlXCIsIFwicXVlcnlcIiwgXCJ0YWdzXCIsIFwid2FybmluZ3NcIlxyXG5dO1xyXG4vLyBEZWZhdWx0IHZhbHVlc1xyXG5leHBvcnRzLkRFRkFVTFRfVkFMVUVTID0ge1xyXG4gICAga3Vkb3NIaXRSYXRpbzogdHJ1ZSxcclxuICAgIGZpbHRlcmluZzogZmFsc2UsXHJcbiAgICBsYW5ndWFnZTogW2ZhbHNlLCBcIlwiXSxcclxuICAgIHF1ZXJ5OiBbZmFsc2UsIFwiXCJdLFxyXG4gICAgdGFnczogW10sXHJcbiAgICB3YXJuaW5nczogW11cclxufTtcclxuLy8gU2V0dGluZ3MgY2hhbmdlZCBtZXNzYWdlXHJcbmV4cG9ydHMuU0VUVElOR1NfQ0hBTkdFRCA9IFwic2V0dGluZ3NfY2hhbmdlZFwiO1xyXG4vKiogUmVkaXJlY3QgdGhlc2UgVVJMcyB0byBmaWx0ZXIgd29ya3Mgd2l0aCBleGNsdWRlZCBzdHVmZiAqL1xyXG5leHBvcnRzLlJFRElSRUNUX1VSTFMgPSBbXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL3RhZ3MvKi93b3Jrc2AsXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL3RhZ3MvKi9ib29rbWFya3NgLFxyXG4gICAgYGh0dHBzOi8vYXJjaGl2ZW9mb3Vyb3duLm9yZy91c2Vycy8qL3dvcmtzKmAsXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL3VzZXJzLyovYm9va21hcmtzKmAsXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL2NvbGxlY3Rpb25zLyovd29ya3NgLFxyXG4gICAgYGh0dHBzOi8vYXJjaGl2ZW9mb3Vyb3duLm9yZy9jb2xsZWN0aW9ucy8qL2Jvb2ttYXJrc2AgLy8gQ29sbGVjdGlvbidzIGJvb2ttYXJrc1xyXG5dO1xyXG4vKiogQ2Fubm90IHJlZGlyZWN0IHRoZXNlIFVSTHMsIG5lZWQgdG8gaGlkZSB3b3JrcyB3aXRoIGV4Y2x1ZGVkIHN0dWZmICovXHJcbmV4cG9ydHMuSElERV9VUkxTID0gW1xyXG4gICAgYGh0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL3VzZXJzXFwvYCxcclxuICAgIGBodHRwczpcXC9cXC9hcmNoaXZlb2ZvdXJvd25cXC5vcmdcXC91c2Vyc1xcLy4qXFwvc2VyaWVzYCxcclxuICAgIGBodHRwczpcXC9cXC9hcmNoaXZlb2ZvdXJvd25cXC5vcmdcXC91c2Vyc1xcLy4qXFwvZ2lmdHNgLFxyXG4gICAgYGh0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL2NvbGxlY3Rpb25zXFwvLipcXC9zZXJpZXNgLCAvLyBDb2xsZWN0aW9uJ3Mgc2VyaWVzXHJcbl07XHJcbjtcclxuLyoqIFJhdGluZyBvZiB3b3JrcyB0byBpZCAqL1xyXG52YXIgUkFUSU5HO1xyXG4oZnVuY3Rpb24gKFJBVElORykge1xyXG4gICAgUkFUSU5HW1JBVElOR1tcIm5vdFJhdGVkXCJdID0gOV0gPSBcIm5vdFJhdGVkXCI7XHJcbiAgICBSQVRJTkdbUkFUSU5HW1wiZ2VuXCJdID0gMTBdID0gXCJnZW5cIjtcclxuICAgIFJBVElOR1tSQVRJTkdbXCJ0ZWVuXCJdID0gMTFdID0gXCJ0ZWVuXCI7XHJcbiAgICBSQVRJTkdbUkFUSU5HW1wibWF0dXJlXCJdID0gMTJdID0gXCJtYXR1cmVcIjtcclxuICAgIFJBVElOR1tSQVRJTkdbXCJleHBsaWNpdFwiXSA9IDEzXSA9IFwiZXhwbGljaXRcIjtcclxufSkoUkFUSU5HID0gZXhwb3J0cy5SQVRJTkcgfHwgKGV4cG9ydHMuUkFUSU5HID0ge30pKTtcclxuLyoqIENhdGVnb3J5IG9mIHdvcmsgdG8gaWQgKi9cclxudmFyIENBVEVHT1JZO1xyXG4oZnVuY3Rpb24gKENBVEVHT1JZKSB7XHJcbiAgICBDQVRFR09SWVtDQVRFR09SWVtcImdlblwiXSA9IDIxXSA9IFwiZ2VuXCI7XHJcbiAgICBDQVRFR09SWVtDQVRFR09SWVtcImZtXCJdID0gMjJdID0gXCJmbVwiO1xyXG4gICAgQ0FURUdPUllbQ0FURUdPUllbXCJtbVwiXSA9IDIzXSA9IFwibW1cIjtcclxuICAgIENBVEVHT1JZW0NBVEVHT1JZW1wib3RoZXJcIl0gPSAyNF0gPSBcIm90aGVyXCI7XHJcbiAgICBDQVRFR09SWVtDQVRFR09SWVtcImZmXCJdID0gMTE2XSA9IFwiZmZcIjtcclxuICAgIENBVEVHT1JZW0NBVEVHT1JZW1wibXVsdGlcIl0gPSAyMjQ2XSA9IFwibXVsdGlcIjtcclxufSkoQ0FURUdPUlkgPSBleHBvcnRzLkNBVEVHT1JZIHx8IChleHBvcnRzLkNBVEVHT1JZID0ge30pKTtcclxuLyoqIFdhcm5pbmdzIG9mIHdvcmsgdG8gaWQgKi9cclxudmFyIFdBUk5JTkc7XHJcbihmdW5jdGlvbiAoV0FSTklORykge1xyXG4gICAgV0FSTklOR1tXQVJOSU5HW1wiY2hvc2VOb3RUb1VzZVwiXSA9IDE0XSA9IFwiY2hvc2VOb3RUb1VzZVwiO1xyXG4gICAgV0FSTklOR1tXQVJOSU5HW1wibm9XYXJuaW5nc0FwcGx5XCJdID0gMTZdID0gXCJub1dhcm5pbmdzQXBwbHlcIjtcclxuICAgIFdBUk5JTkdbV0FSTklOR1tcInZpb2xlbmNlXCJdID0gMTddID0gXCJ2aW9sZW5jZVwiO1xyXG4gICAgV0FSTklOR1tXQVJOSU5HW1wibWNkXCJdID0gMThdID0gXCJtY2RcIjtcclxuICAgIFdBUk5JTkdbV0FSTklOR1tcIm5vbkNvblwiXSA9IDE5XSA9IFwibm9uQ29uXCI7XHJcbiAgICBXQVJOSU5HW1dBUk5JTkdbXCJ1bmRlcmFnZVwiXSA9IDIwXSA9IFwidW5kZXJhZ2VcIjtcclxufSkoV0FSTklORyA9IGV4cG9ydHMuV0FSTklORyB8fCAoZXhwb3J0cy5XQVJOSU5HID0ge30pKTtcclxuLyoqXHJcbiAqIFRha2VzIHJhdGluZyBpZCBvZiB3b3JrIGFuZCBjb252ZXJ0cyBpdCB0byBhbiBlbnVtIHZhbHVlXHJcbiAqIEBwYXJhbSBpZCBJZCBvZiByYXRpbmdcclxuICogQHJldHVybnMgUkFUSU5HIGVudW0gY29udmVydGVkIGZyb20gaWRcclxuICovXHJcbmZ1bmN0aW9uIGlkVG9SYXRpbmdFbnVtKGlkKSB7XHJcbiAgICBpZiAoaWQgPT0gOSlcclxuICAgICAgICByZXR1cm4gUkFUSU5HLm5vdFJhdGVkO1xyXG4gICAgZWxzZSBpZiAoaWQgPT0gMTApXHJcbiAgICAgICAgcmV0dXJuIFJBVElORy5nZW47XHJcbiAgICBlbHNlIGlmIChpZCA9PSAxMSlcclxuICAgICAgICByZXR1cm4gUkFUSU5HLnRlZW47XHJcbiAgICBlbHNlIGlmIChpZCA9PSAxMilcclxuICAgICAgICByZXR1cm4gUkFUSU5HLm1hdHVyZTtcclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gUkFUSU5HLmV4cGxpY2l0O1xyXG59XHJcbmV4cG9ydHMuaWRUb1JhdGluZ0VudW0gPSBpZFRvUmF0aW5nRW51bTtcclxuLyoqXHJcbiAqIFRha2VzIGNhdGVnb3J5IGlkIG9mIHdvcmsgYW5kIGNvbnZlcnRzIGl0IHRvIGFuIGVudW0gdmFsdWVcclxuICogQHBhcmFtIGlkIElkIG9mIGNhdGVnb3J5XHJcbiAqIEByZXR1cm5zIENBVEVHT1JZIGVudW0gY29udmVydGVkIGZyb20gaWRcclxuICovXHJcbmZ1bmN0aW9uIGlkVG9DYXRldG9yeUVudW0oaWQpIHtcclxuICAgIGlmIChpZCA9PSAyMSlcclxuICAgICAgICByZXR1cm4gQ0FURUdPUlkuZ2VuO1xyXG4gICAgZWxzZSBpZiAoaWQgPT0gMjIpXHJcbiAgICAgICAgcmV0dXJuIENBVEVHT1JZLmZtO1xyXG4gICAgZWxzZSBpZiAoaWQgPT0gMjMpXHJcbiAgICAgICAgcmV0dXJuIENBVEVHT1JZLm1tO1xyXG4gICAgZWxzZSBpZiAoaWQgPT0gMjQpXHJcbiAgICAgICAgcmV0dXJuIENBVEVHT1JZLm90aGVyO1xyXG4gICAgZWxzZSBpZiAoaWQgPT0gMTE2KVxyXG4gICAgICAgIHJldHVybiBDQVRFR09SWS5mZjtcclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gQ0FURUdPUlkubXVsdGk7XHJcbn1cclxuZXhwb3J0cy5pZFRvQ2F0ZXRvcnlFbnVtID0gaWRUb0NhdGV0b3J5RW51bTtcclxuLyoqXHJcbiAqIFRha2VzIHdhcm5pbmcgaWQgb2Ygd29yayBhbmQgY29udmVydHMgaXQgdG8gYW4gZW51bSB2YWx1ZVxyXG4gKiBAcGFyYW0gaWQgSWQgb2Ygd2FybmluZ1xyXG4gKiBAcmV0dXJucyBXQVJOSU5HIGVudW0gY29udmVydGVkIGZyb20gaWRcclxuICovXHJcbmZ1bmN0aW9uIGlkVG9XYXJuaW5nRW51bShpZCkge1xyXG4gICAgaWYgKGlkID09IDE0KVxyXG4gICAgICAgIHJldHVybiBXQVJOSU5HLmNob3NlTm90VG9Vc2U7XHJcbiAgICBlbHNlIGlmIChpZCA9PSAxNilcclxuICAgICAgICByZXR1cm4gV0FSTklORy5ub1dhcm5pbmdzQXBwbHk7XHJcbiAgICBlbHNlIGlmIChpZCA9PSAxNylcclxuICAgICAgICByZXR1cm4gV0FSTklORy52aW9sZW5jZTtcclxuICAgIGVsc2UgaWYgKGlkID09IDE4KVxyXG4gICAgICAgIHJldHVybiBXQVJOSU5HLm1jZDtcclxuICAgIGVsc2UgaWYgKGlkID09IDE5KVxyXG4gICAgICAgIHJldHVybiBXQVJOSU5HLm5vbkNvbjtcclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gV0FSTklORy51bmRlcmFnZTtcclxufVxyXG5leHBvcnRzLmlkVG9XYXJuaW5nRW51bSA9IGlkVG9XYXJuaW5nRW51bTtcclxuLyoqXHJcbiAqIENvbnZlcnRzIHN0cmluZyB2YWx1ZSBvZiBhIHdhcm5pbmcgdG8gdGhlIGNvcnJlc3BvbmRpbmcgV0FSTklORyBlbnVtXHJcbiAqIEBwYXJhbSB3YXJuaW5nIFN0cmluZyBvZiB3YXJuaW5nIGZyb20gcGFnZVxyXG4gKiBAcmV0dXJucyBDb252ZXJ0ZWQgZW51bSB2YWx1ZSBvZiBwYXJhbVxyXG4gKi9cclxuZnVuY3Rpb24gd2FybmluZ1RvRW51bSh3YXJuaW5nKSB7XHJcbiAgICBpZiAod2FybmluZyA9PSBcIkNob29zZSBOb3QgVG8gVXNlIEFyY2hpdmUgV2FybmluZ3NcIilcclxuICAgICAgICByZXR1cm4gV0FSTklORy5jaG9zZU5vdFRvVXNlO1xyXG4gICAgZWxzZSBpZiAod2FybmluZyA9PSBcIkdyYXBoaWMgRGVwaWN0aW9ucyBPZiBWaW9sZW5jZVwiKVxyXG4gICAgICAgIHJldHVybiBXQVJOSU5HLnZpb2xlbmNlO1xyXG4gICAgZWxzZSBpZiAod2FybmluZyA9PSBcIk1ham9yIENoYXJhY3RlciBEZWF0aFwiKVxyXG4gICAgICAgIHJldHVybiBXQVJOSU5HLm1jZDtcclxuICAgIGVsc2UgaWYgKHdhcm5pbmcgPT0gXCJObyBBcmNoaXZlIFdhcm5pbmdzIEFwcGx5XCIpXHJcbiAgICAgICAgcmV0dXJuIFdBUk5JTkcubm9XYXJuaW5nc0FwcGx5O1xyXG4gICAgZWxzZSBpZiAod2FybmluZyA9PSBcIlJhcGUvTm9uLUNvblwiKVxyXG4gICAgICAgIHJldHVybiBXQVJOSU5HLm5vbkNvbjtcclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gV0FSTklORy51bmRlcmFnZTtcclxufVxyXG5leHBvcnRzLndhcm5pbmdUb0VudW0gPSB3YXJuaW5nVG9FbnVtO1xyXG4vKipcclxuICogQ29udmVydHMgc3RyaW5nIHZhbHVlIG9mIGEgcmF0aW5nIHRvIHRoZSBjb3JyZXNwb25kaW5nIFJBVElORyBlbnVtXHJcbiAqIEBwYXJhbSB3YXJuaW5nIFN0cmluZyBvZiByYXRpbmcgZnJvbSBwYWdlXHJcbiAqIEByZXR1cm5zIENvbnZlcnRlZCBlbnVtIHZhbHVlIG9mIHBhcmFtXHJcbiAqL1xyXG5mdW5jdGlvbiByYXRpbmdUb0VudW0ocmF0aW5nKSB7XHJcbiAgICBpZiAocmF0aW5nID09IFwiTm90IFJhdGVkXCIpXHJcbiAgICAgICAgcmV0dXJuIFJBVElORy5ub3RSYXRlZDtcclxuICAgIGVsc2UgaWYgKHJhdGluZyA9PSBcIkdlbmVyYWwgQXVkaWVuY2VzXCIpXHJcbiAgICAgICAgcmV0dXJuIFJBVElORy5nZW47XHJcbiAgICBlbHNlIGlmIChyYXRpbmcgPT0gXCJUZWVuIEFuZCBVcCBBdWRpZW5jZXNcIilcclxuICAgICAgICByZXR1cm4gUkFUSU5HLnRlZW47XHJcbiAgICBlbHNlIGlmIChyYXRpbmcgPT0gXCJNYXR1cmVcIilcclxuICAgICAgICByZXR1cm4gUkFUSU5HLm1hdHVyZTtcclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gUkFUSU5HLmV4cGxpY2l0O1xyXG59XHJcbmV4cG9ydHMucmF0aW5nVG9FbnVtID0gcmF0aW5nVG9FbnVtO1xyXG4vKipcclxuICogQ29udmVydHMgc3RyaW5nIHZhbHVlIG9mIGEgY2F0ZWdvcnkgdG8gdGhlIGNvcnJlc3BvbmRpbmcgQ0FURUdPUlkgZW51bVxyXG4gKiBAcGFyYW0gd2FybmluZyBTdHJpbmcgb2YgY2F0ZWdvcnkgZnJvbSBwYWdlXHJcbiAqIEByZXR1cm5zIENvbnZlcnRlZCBlbnVtIHZhbHVlIG9mIHBhcmFtXHJcbiAqL1xyXG5mdW5jdGlvbiBjYXRlZ29yeVRvRW51bShjYXRlZ29yeSkge1xyXG4gICAgaWYgKGNhdGVnb3J5ID09IFwiRi9GXCIpXHJcbiAgICAgICAgcmV0dXJuIENBVEVHT1JZLmZmO1xyXG4gICAgZWxzZSBpZiAoY2F0ZWdvcnkgPT0gXCJGL01cIilcclxuICAgICAgICByZXR1cm4gQ0FURUdPUlkuZm07XHJcbiAgICBlbHNlIGlmIChjYXRlZ29yeSA9PSBcIkdlblwiKVxyXG4gICAgICAgIHJldHVybiBDQVRFR09SWS5nZW47XHJcbiAgICBlbHNlIGlmIChjYXRlZ29yeSA9PSBcIk0vTVwiKVxyXG4gICAgICAgIHJldHVybiBDQVRFR09SWS5tbTtcclxuICAgIGVsc2UgaWYgKGNhdGVnb3J5ID09IFwiTXVsdGlcIilcclxuICAgICAgICByZXR1cm4gQ0FURUdPUlkubXVsdGk7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcmV0dXJuIENBVEVHT1JZLm90aGVyO1xyXG59XHJcbmV4cG9ydHMuY2F0ZWdvcnlUb0VudW0gPSBjYXRlZ29yeVRvRW51bTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uL2V4cG9ydC9jb25zdGFudHNcIik7XHJcbmNvbnN0IHJhdGlvXzEgPSByZXF1aXJlKFwiLi9yYXRpb1wiKTtcclxuLy8gKiBFeGVjdXRlZCBjb2RlIHN0YXJ0XHJcbmJyb3dzZXIuc3RvcmFnZS5sb2NhbC5nZXQoY29uc3RhbnRzXzEuU1RPUkFHRV9LRVlTKS50aGVuKCh2YWx1ZSkgPT4ge1xyXG4gICAgLy8gSWYgbm8gc2V0dGluZ3MgdmFsdWVzIGFyZSBpbiBzdG9yYWdlLCBzZXQgZGVmYXVsdCBzZXR0aW5nIHZhbHVlcyBpbiBzdG9yYWdlXHJcbiAgICBpZiAoT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLnNldChjb25zdGFudHNfMS5ERUZBVUxUX1ZBTFVFUykudGhlbigoKSA9PiBvbmxvYWRQcm9taXNlKGNvbnN0YW50c18xLkRFRkFVTFRfVkFMVUVTKSk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgb25sb2FkUHJvbWlzZSh2YWx1ZSk7XHJcbn0pO1xyXG4vLyAqIEV4ZWN1dGVkIGNvZGUgZW5kXHJcbi8vICogRnVuY3Rpb25zXHJcbi8qKlxyXG4gKiBFeGVjdXRlZCBhZnRlciBhbGwgcHJvbWlzZXMgYXJlIGZ1bGZpbGxlZFxyXG4gKiBAcGFyYW0gdmFsdWUgTG9jYWwgc3RvcmFnZSB2YWx1ZXMgb2YgYWxsIHNhdmVkIHNldHRpbmdzXHJcbiAqL1xyXG5mdW5jdGlvbiBvbmxvYWRQcm9taXNlKHZhbHVlKSB7XHJcbiAgICAvLyBBZGQga3Vkb3MgdG8gaGl0IHJhdGlvIGlmIG9uXHJcbiAgICBpZiAodmFsdWUua3Vkb3NIaXRSYXRpbylcclxuICAgICAgICAoMCwgcmF0aW9fMS5hZGRLdWRvc1RvSGl0UmF0aW9zKShkb2N1bWVudCk7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9