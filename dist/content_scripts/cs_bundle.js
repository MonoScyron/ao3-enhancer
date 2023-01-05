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
    // Create ratio elements for all works on page
    let ratio_dtList = [];
    let ratio_ddList = [];
    // Get list of works
    let workList = (0, works_1.constructRawWorkList)(document);
    // TODO: Use use work crawler to get stats instead
    // Get list of work stats
    let statsList;
    if (document.URL.split('/')[3] == "works") {
        statsList = document.querySelectorAll("dl.stats");
    }
    else {
        statsList = document.querySelectorAll(".group[role='article'] dl.stats");
    }
    // Create list of ratio elements
    for (let i = 0; i < workList.length; i++) {
        let work = workList[i];
        let kudos_dd = work.querySelector("dd.kudos");
        let hits_dd = work.querySelector("dd.hits");
        let hits = parseInt(hits_dd.innerHTML);
        // Get kudos & hits from work
        if (kudos_dd != null && hits_dd != null && hits > 0) {
            let ratio_dt = document.createElement("dt");
            ratio_dt.className = `kudos-to-hit-ratio`;
            ratio_dt.innerHTML = "Ratio:";
            let kudos;
            if (kudos_dd.firstChild.nodeName == "A") {
                kudos = parseInt(kudos_dd.firstElementChild.innerHTML);
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
exports.constructRawWorkList = void 0;
const constants_1 = __webpack_require__(/*! ../export/constants */ "./src/export/constants.ts");
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
    tags.querySelectorAll(':not(.warnings)').forEach((e) => {
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
    let chapters = (stats === null || stats === void 0 ? void 0 : stats.querySelector('dd.chapters')).innerText.split('/');
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
            language: (_m = stats === null || stats === void 0 ? void 0 : stats.querySelector('dd.language')) === null || _m === void 0 ? void 0 : _m.innerHTML,
            wordCount: parseInt((_o = stats === null || stats === void 0 ? void 0 : stats.querySelector('dd.words')) === null || _o === void 0 ? void 0 : _o.innerHTML),
            chapterCount: parseInt(chapters[0]),
            finalChapterCount: chapters[1] == null ? null : parseInt(chapters[1]),
            collections: parseInt((stats === null || stats === void 0 ? void 0 : stats.querySelector('dd.collections')).innerText),
            comments: parseInt((stats === null || stats === void 0 ? void 0 : stats.querySelector('dd.comments')).innerText),
            kudos: parseInt((stats === null || stats === void 0 ? void 0 : stats.querySelector('dd.kudos')).innerText),
            bookmarks: parseInt((stats === null || stats === void 0 ? void 0 : stats.querySelector('dd.bookmarks')).innerText),
            hits: parseInt((_p = stats === null || stats === void 0 ? void 0 : stats.querySelector('dd.hits')) === null || _p === void 0 ? void 0 : _p.innerHTML)
        }
    };
    return ret;
}
/**
 * Get list of works from page as an array of WorkElement objects
 * @param document Document of AO3 page
 * @returns Array of works from page as WorkElement objects
 */
function constructWorkList(document) {
    let rawWorks = constructRawWorkList(document);
    for (var i = 0; i < rawWorks.length; i++) {
        // TODO: Finish this
    }
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
exports.constructRawWorkList = constructRawWorkList;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudF9zY3JpcHRzL3JhdGlvLnRzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50X3NjcmlwdHMvd29ya3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4cG9ydC9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50X3NjcmlwdHMvb25sb2FkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuYWRkS3Vkb3NUb0hpdFJhdGlvcyA9IHZvaWQgMDtcclxuY29uc3Qgd29ya3NfMSA9IHJlcXVpcmUoXCIuL3dvcmtzXCIpO1xyXG4vKipcclxuICAqIEFkZHMga3Vkb3MgdG8gaGl0IHJhdGlvcyB0byB3b3JrcyBvbiB0aGUgcGFnZVxyXG4gKiBAcGFyYW0gZG9jdW1lbnQgRG9jdW1lbnQgb2YgdGhlIHBhZ2VcclxuICogQHJldHVybnMgW0FycmF5IG9mIHJhdGlvIGxhYmVscywgYXJyYXkgb2YgcmF0aW8gdmFsdWVzXVxyXG4gKi9cclxuZnVuY3Rpb24gYWRkS3Vkb3NUb0hpdFJhdGlvcyhkb2N1bWVudCkge1xyXG4gICAgLy8gQ3JlYXRlIHJhdGlvIGVsZW1lbnRzIGZvciBhbGwgd29ya3Mgb24gcGFnZVxyXG4gICAgbGV0IHJhdGlvX2R0TGlzdCA9IFtdO1xyXG4gICAgbGV0IHJhdGlvX2RkTGlzdCA9IFtdO1xyXG4gICAgLy8gR2V0IGxpc3Qgb2Ygd29ya3NcclxuICAgIGxldCB3b3JrTGlzdCA9ICgwLCB3b3Jrc18xLmNvbnN0cnVjdFJhd1dvcmtMaXN0KShkb2N1bWVudCk7XHJcbiAgICAvLyBUT0RPOiBVc2UgdXNlIHdvcmsgY3Jhd2xlciB0byBnZXQgc3RhdHMgaW5zdGVhZFxyXG4gICAgLy8gR2V0IGxpc3Qgb2Ygd29yayBzdGF0c1xyXG4gICAgbGV0IHN0YXRzTGlzdDtcclxuICAgIGlmIChkb2N1bWVudC5VUkwuc3BsaXQoJy8nKVszXSA9PSBcIndvcmtzXCIpIHtcclxuICAgICAgICBzdGF0c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGwuc3RhdHNcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBzdGF0c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyb3VwW3JvbGU9J2FydGljbGUnXSBkbC5zdGF0c1wiKTtcclxuICAgIH1cclxuICAgIC8vIENyZWF0ZSBsaXN0IG9mIHJhdGlvIGVsZW1lbnRzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHdvcmsgPSB3b3JrTGlzdFtpXTtcclxuICAgICAgICBsZXQga3Vkb3NfZGQgPSB3b3JrLnF1ZXJ5U2VsZWN0b3IoXCJkZC5rdWRvc1wiKTtcclxuICAgICAgICBsZXQgaGl0c19kZCA9IHdvcmsucXVlcnlTZWxlY3RvcihcImRkLmhpdHNcIik7XHJcbiAgICAgICAgbGV0IGhpdHMgPSBwYXJzZUludChoaXRzX2RkLmlubmVySFRNTCk7XHJcbiAgICAgICAgLy8gR2V0IGt1ZG9zICYgaGl0cyBmcm9tIHdvcmtcclxuICAgICAgICBpZiAoa3Vkb3NfZGQgIT0gbnVsbCAmJiBoaXRzX2RkICE9IG51bGwgJiYgaGl0cyA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHJhdGlvX2R0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImR0XCIpO1xyXG4gICAgICAgICAgICByYXRpb19kdC5jbGFzc05hbWUgPSBga3Vkb3MtdG8taGl0LXJhdGlvYDtcclxuICAgICAgICAgICAgcmF0aW9fZHQuaW5uZXJIVE1MID0gXCJSYXRpbzpcIjtcclxuICAgICAgICAgICAgbGV0IGt1ZG9zO1xyXG4gICAgICAgICAgICBpZiAoa3Vkb3NfZGQuZmlyc3RDaGlsZC5ub2RlTmFtZSA9PSBcIkFcIikge1xyXG4gICAgICAgICAgICAgICAga3Vkb3MgPSBwYXJzZUludChrdWRvc19kZC5maXJzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAga3Vkb3MgPSBwYXJzZUludChrdWRvc19kZC5pbm5lckhUTUwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByYXRpb19kZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkZFwiKTtcclxuICAgICAgICAgICAgcmF0aW9fZGQuY2xhc3NOYW1lID0gYHJhdGlvYDtcclxuICAgICAgICAgICAgcmF0aW9fZGQuaW5uZXJIVE1MID0gTWF0aC5yb3VuZCgoa3Vkb3MgLyBoaXRzKSAqIDEwMDApIC8gMTAgKyBcIiVcIjtcclxuICAgICAgICAgICAgcmF0aW9fZHRMaXN0W2ldID0gcmF0aW9fZHQ7XHJcbiAgICAgICAgICAgIHJhdGlvX2RkTGlzdFtpXSA9IHJhdGlvX2RkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmF0aW9fZHRMaXN0W2ldID0gbnVsbDtcclxuICAgICAgICAgICAgcmF0aW9fZGRMaXN0W2ldID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBBZGQgbGlzdCBvZiByYXRpbyBlbGVtZW50cyB0byB3b3Jrc1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGF0c0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAocmF0aW9fZHRMaXN0W2ldICE9IG51bGwgJiYgcmF0aW9fZGRMaXN0W2ldICE9IG51bGwpIHtcclxuICAgICAgICAgICAgc3RhdHNMaXN0W2ldLmFwcGVuZChyYXRpb19kdExpc3RbaV0sIHJhdGlvX2RkTGlzdFtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuYWRkS3Vkb3NUb0hpdFJhdGlvcyA9IGFkZEt1ZG9zVG9IaXRSYXRpb3M7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuY29uc3RydWN0UmF3V29ya0xpc3QgPSB2b2lkIDA7XHJcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uL2V4cG9ydC9jb25zdGFudHNcIik7XHJcbi8qKlxyXG4gKiBUYWtlcyBhIHJhdyB3b3JrIGVsZW1lbnQgYW5kIHBhcnNlcyBpdCBpbnRvIGEgV29ya0VsZW1lbnQgb2JqZWN0XHJcbiAqIEBwYXJhbSB3b3JrIFJhdyB3b3JrIGVsZW1lbnRcclxuICogQHJldHVybnMgV29ya0VsZW1lbnQgb2JqZWN0XHJcbiAqL1xyXG5mdW5jdGlvbiBjb25zdHVjdFdvcmtFbGVtZW50KHdvcmspIHtcclxuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaywgX2wsIF9tLCBfbywgX3A7XHJcbiAgICBsZXQgcmV0O1xyXG4gICAgLy8gQXV0aG9yIGxpc3RcclxuICAgIGxldCBhTGlzdCA9IFtdO1xyXG4gICAgd29yay5xdWVyeVNlbGVjdG9yQWxsKFwiYVtyZWw9J2F1dGhvciddXCIpLmZvckVhY2goKGUpID0+IHtcclxuICAgICAgICBhTGlzdC5wdXNoKGUuaW5uZXJIVE1MKTtcclxuICAgIH0pO1xyXG4gICAgLy8gR2lmdCBsaXN0XHJcbiAgICBsZXQgZ0xpc3QgPSBbXTtcclxuICAgIHdvcmsucXVlcnlTZWxlY3RvckFsbChcImFbaHJlZiQ9Jy9naWZ0cyddXCIpLmZvckVhY2goKGUpID0+IHtcclxuICAgICAgICBnTGlzdCA9PT0gbnVsbCB8fCBnTGlzdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZ0xpc3QucHVzaChlLmlubmVySFRNTCk7XHJcbiAgICB9KTtcclxuICAgIGlmIChnTGlzdC5sZW5ndGggPT0gMClcclxuICAgICAgICBnTGlzdCA9IG51bGw7XHJcbiAgICAvLyBGYW5kb20gbGlzdFxyXG4gICAgbGV0IGZMaXN0ID0gW107XHJcbiAgICAoX2EgPSB3b3JrLnF1ZXJ5U2VsZWN0b3IoJy5mYW5kb21zJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5xdWVyeVNlbGVjdG9yQWxsKCcudGFnJykuZm9yRWFjaCgoZSkgPT4ge1xyXG4gICAgICAgIGZMaXN0LnB1c2goZS5pbm5lckhUTUwpO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgdGFncyA9IHdvcmsucXVlcnlTZWxlY3RvcignLnRhZ3MnKTtcclxuICAgIC8vIFdhcm5pbmcgbGlzdFxyXG4gICAgbGV0IHdMaXN0ID0gW107XHJcbiAgICB0YWdzLnF1ZXJ5U2VsZWN0b3JBbGwoJy53YXJuaW5ncycpLmZvckVhY2goKGUpID0+IHtcclxuICAgICAgICB3TGlzdC5wdXNoKCgwLCBjb25zdGFudHNfMS53YXJuaW5nVG9FbnVtKShlLnF1ZXJ5U2VsZWN0b3IoJy50YWcnKS5pbm5lckhUTUwpKTtcclxuICAgIH0pO1xyXG4gICAgLy8gVGFnIGxpc3RcclxuICAgIGxldCB0TGlzdCA9IFtdO1xyXG4gICAgdGFncy5xdWVyeVNlbGVjdG9yQWxsKCc6bm90KC53YXJuaW5ncyknKS5mb3JFYWNoKChlKSA9PiB7XHJcbiAgICAgICAgdExpc3QucHVzaChlLnF1ZXJ5U2VsZWN0b3IoJy50YWcnKS5pbm5lckhUTUwpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAodExpc3QubGVuZ3RoID09IDApXHJcbiAgICAgICAgdExpc3QgPSBudWxsO1xyXG4gICAgLy8gU2VyaWVzIGxpc3RcclxuICAgIGxldCBzTGlzdCA9IFtdO1xyXG4gICAgKF9iID0gd29yay5xdWVyeVNlbGVjdG9yKCcuc2VyaWVzJykpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5xdWVyeVNlbGVjdG9yQWxsKCdhJykuZm9yRWFjaCgoZSkgPT4ge1xyXG4gICAgICAgIHNMaXN0LnB1c2goZS5pbm5lckhUTUwpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoc0xpc3QubGVuZ3RoID09IDApXHJcbiAgICAgICAgc0xpc3QgPSBudWxsO1xyXG4gICAgbGV0IHN0YXRzID0gd29yay5xdWVyeVNlbGVjdG9yKCcuc3RhdHMnKTtcclxuICAgIC8vIENoYXB0ZXJzXHJcbiAgICBsZXQgY2hhcHRlcnMgPSAoc3RhdHMgPT09IG51bGwgfHwgc3RhdHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRzLnF1ZXJ5U2VsZWN0b3IoJ2RkLmNoYXB0ZXJzJykpLmlubmVyVGV4dC5zcGxpdCgnLycpO1xyXG4gICAgLy8gQ2F0ZWdvcmllcyBsaXN0XHJcbiAgICBsZXQgY0xpc3QgPSBbXTtcclxuICAgIChfZCA9IChfYyA9IHdvcmsucXVlcnlTZWxlY3Rvcignc3Bhbi5jYXRlZ29yeScpKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuZ2V0QXR0cmlidXRlKCd0aXRsZScpKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Quc3BsaXQoJywgJykuZm9yRWFjaChlID0+IHtcclxuICAgICAgICBjTGlzdC5wdXNoKCgwLCBjb25zdGFudHNfMS5jYXRlZ29yeVRvRW51bSkoZSkpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoY0xpc3QubGVuZ3RoID09IDApXHJcbiAgICAgICAgY0xpc3QgPSBudWxsO1xyXG4gICAgcmV0ID0ge1xyXG4gICAgICAgIGhyZWY6IChfZiA9IChfZSA9IHdvcmsucXVlcnlTZWxlY3RvcihcIi5oZWFkaW5nXCIpKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UuZmlyc3RFbGVtZW50Q2hpbGQpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpLFxyXG4gICAgICAgIHRpdGxlOiAoX2ggPSAoX2cgPSB3b3JrLnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGluZ1wiKSkgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nLmZpcnN0RWxlbWVudENoaWxkKSA9PT0gbnVsbCB8fCBfaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2guaW5uZXJIVE1MLFxyXG4gICAgICAgIGF1dGhvcnM6IGFMaXN0LFxyXG4gICAgICAgIHJlY2lwaWVudHM6IGdMaXN0LFxyXG4gICAgICAgIGZhbmRvbXM6IGZMaXN0LFxyXG4gICAgICAgIHRhZ3M6IHtcclxuICAgICAgICAgICAgd2FybmluZ3M6IHdMaXN0LFxyXG4gICAgICAgICAgICB0YWdzOiB0TGlzdFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VtbWFyeTogd29yay5xdWVyeVNlbGVjdG9yKCcuc3VtbWFyeScpLmlubmVyVGV4dCxcclxuICAgICAgICBzZXJpZXM6IHNMaXN0LFxyXG4gICAgICAgIHVwZGF0ZURhdGU6IChfaiA9IHdvcmsucXVlcnlTZWxlY3RvcigncC5kYXRldGltZScpKSA9PT0gbnVsbCB8fCBfaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2ouaW5uZXJIVE1MLFxyXG4gICAgICAgIHJhdGluZzogKDAsIGNvbnN0YW50c18xLnJhdGluZ1RvRW51bSkoKF9rID0gd29yay5xdWVyeVNlbGVjdG9yKCdzcGFuLnJhdGluZycpKSA9PT0gbnVsbCB8fCBfayA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2suZ2V0QXR0cmlidXRlKCd0aXRsZScpKSxcclxuICAgICAgICBjYXRlZ29yaWVzOiBjTGlzdCxcclxuICAgICAgICBjb21wbGV0ZTogKChfbCA9IHdvcmsucXVlcnlTZWxlY3Rvcignc3Bhbi5pc3dpcCcpKSA9PT0gbnVsbCB8fCBfbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2wuZ2V0QXR0cmlidXRlKCd0aXRsZScpKSA9PSAnQ29tcGxldGUgV29yaycsXHJcbiAgICAgICAgc3RhdHM6IHtcclxuICAgICAgICAgICAgbGFuZ3VhZ2U6IChfbSA9IHN0YXRzID09PSBudWxsIHx8IHN0YXRzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0cy5xdWVyeVNlbGVjdG9yKCdkZC5sYW5ndWFnZScpKSA9PT0gbnVsbCB8fCBfbSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX20uaW5uZXJIVE1MLFxyXG4gICAgICAgICAgICB3b3JkQ291bnQ6IHBhcnNlSW50KChfbyA9IHN0YXRzID09PSBudWxsIHx8IHN0YXRzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0cy5xdWVyeVNlbGVjdG9yKCdkZC53b3JkcycpKSA9PT0gbnVsbCB8fCBfbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX28uaW5uZXJIVE1MKSxcclxuICAgICAgICAgICAgY2hhcHRlckNvdW50OiBwYXJzZUludChjaGFwdGVyc1swXSksXHJcbiAgICAgICAgICAgIGZpbmFsQ2hhcHRlckNvdW50OiBjaGFwdGVyc1sxXSA9PSBudWxsID8gbnVsbCA6IHBhcnNlSW50KGNoYXB0ZXJzWzFdKSxcclxuICAgICAgICAgICAgY29sbGVjdGlvbnM6IHBhcnNlSW50KChzdGF0cyA9PT0gbnVsbCB8fCBzdGF0cyA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdHMucXVlcnlTZWxlY3RvcignZGQuY29sbGVjdGlvbnMnKSkuaW5uZXJUZXh0KSxcclxuICAgICAgICAgICAgY29tbWVudHM6IHBhcnNlSW50KChzdGF0cyA9PT0gbnVsbCB8fCBzdGF0cyA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdHMucXVlcnlTZWxlY3RvcignZGQuY29tbWVudHMnKSkuaW5uZXJUZXh0KSxcclxuICAgICAgICAgICAga3Vkb3M6IHBhcnNlSW50KChzdGF0cyA9PT0gbnVsbCB8fCBzdGF0cyA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdHMucXVlcnlTZWxlY3RvcignZGQua3Vkb3MnKSkuaW5uZXJUZXh0KSxcclxuICAgICAgICAgICAgYm9va21hcmtzOiBwYXJzZUludCgoc3RhdHMgPT09IG51bGwgfHwgc3RhdHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRzLnF1ZXJ5U2VsZWN0b3IoJ2RkLmJvb2ttYXJrcycpKS5pbm5lclRleHQpLFxyXG4gICAgICAgICAgICBoaXRzOiBwYXJzZUludCgoX3AgPSBzdGF0cyA9PT0gbnVsbCB8fCBzdGF0cyA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdHMucXVlcnlTZWxlY3RvcignZGQuaGl0cycpKSA9PT0gbnVsbCB8fCBfcCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3AuaW5uZXJIVE1MKVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gcmV0O1xyXG59XHJcbi8qKlxyXG4gKiBHZXQgbGlzdCBvZiB3b3JrcyBmcm9tIHBhZ2UgYXMgYW4gYXJyYXkgb2YgV29ya0VsZW1lbnQgb2JqZWN0c1xyXG4gKiBAcGFyYW0gZG9jdW1lbnQgRG9jdW1lbnQgb2YgQU8zIHBhZ2VcclxuICogQHJldHVybnMgQXJyYXkgb2Ygd29ya3MgZnJvbSBwYWdlIGFzIFdvcmtFbGVtZW50IG9iamVjdHNcclxuICovXHJcbmZ1bmN0aW9uIGNvbnN0cnVjdFdvcmtMaXN0KGRvY3VtZW50KSB7XHJcbiAgICBsZXQgcmF3V29ya3MgPSBjb25zdHJ1Y3RSYXdXb3JrTGlzdChkb2N1bWVudCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhd1dvcmtzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gVE9ETzogRmluaXNoIHRoaXNcclxuICAgIH1cclxufVxyXG4vKipcclxuICogR2V0IGxpc3Qgb2Ygd29ya3MgZnJvbSBwYWdlIGFzIGFuIEhUTUxDb2xsZWN0aW9uXHJcbiAqIEBwYXJhbSBkb2N1bWVudCBEb2N1bWVudCBvZiBBTzMgcGFnZVxyXG4gKiBAcmV0dXJucyBMaXN0IG9mIHdvcmtzIGZyb20gcGFnZVxyXG4gKi9cclxuZnVuY3Rpb24gY29uc3RydWN0UmF3V29ya0xpc3QoZG9jdW1lbnQpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGxldCB0eXBlID0gKF9hID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyb3VwJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jbGFzc0xpc3RbMF07XHJcbiAgICBpZiAoZG9jdW1lbnQuVVJMLnNwbGl0KCcvJylbM10gPT0gXCJ3b3Jrc1wiKSB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ3b3JrIG1ldGEgZ3JvdXBcIik7IC8vIG1ldGFcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJib29rbWFya1wiIHx8IHR5cGUgPT0gXCJ3b3JrXCIpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0eXBlICsgXCIgYmx1cmIgZ3JvdXBcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIndvcmsgYmx1cmIgZ3JvdXBcIik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5jb25zdHJ1Y3RSYXdXb3JrTGlzdCA9IGNvbnN0cnVjdFJhd1dvcmtMaXN0O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmNhdGVnb3J5VG9FbnVtID0gZXhwb3J0cy5yYXRpbmdUb0VudW0gPSBleHBvcnRzLndhcm5pbmdUb0VudW0gPSBleHBvcnRzLmlkVG9XYXJuaW5nRW51bSA9IGV4cG9ydHMuaWRUb0NhdGV0b3J5RW51bSA9IGV4cG9ydHMuaWRUb1JhdGluZ0VudW0gPSBleHBvcnRzLldBUk5JTkcgPSBleHBvcnRzLkNBVEVHT1JZID0gZXhwb3J0cy5SQVRJTkcgPSBleHBvcnRzLkhJREVfVVJMUyA9IGV4cG9ydHMuUkVESVJFQ1RfVVJMUyA9IGV4cG9ydHMuU0VUVElOR1NfQ0hBTkdFRCA9IGV4cG9ydHMuREVGQVVMVF9WQUxVRVMgPSBleHBvcnRzLlNUT1JBR0VfS0VZUyA9IHZvaWQgMDtcclxuLy8gU3RvcmFnZSBrZXlzXHJcbmV4cG9ydHMuU1RPUkFHRV9LRVlTID0gW1xyXG4gICAgXCJrdWRvc0hpdFJhdGlvXCIsIFwiZmlsdGVyaW5nXCIsIFwibGFuZ3VhZ2VcIiwgXCJxdWVyeVwiLCBcInRhZ3NcIiwgXCJ3YXJuaW5nc1wiXHJcbl07XHJcbi8vIERlZmF1bHQgdmFsdWVzXHJcbmV4cG9ydHMuREVGQVVMVF9WQUxVRVMgPSB7XHJcbiAgICBrdWRvc0hpdFJhdGlvOiB0cnVlLFxyXG4gICAgZmlsdGVyaW5nOiBmYWxzZSxcclxuICAgIGxhbmd1YWdlOiBbZmFsc2UsIFwiXCJdLFxyXG4gICAgcXVlcnk6IFtmYWxzZSwgXCJcIl0sXHJcbiAgICB0YWdzOiBbXSxcclxuICAgIHdhcm5pbmdzOiBbXVxyXG59O1xyXG4vLyBTZXR0aW5ncyBjaGFuZ2VkIG1lc3NhZ2VcclxuZXhwb3J0cy5TRVRUSU5HU19DSEFOR0VEID0gXCJzZXR0aW5nc19jaGFuZ2VkXCI7XHJcbi8qKiBSZWRpcmVjdCB0aGVzZSBVUkxzIHRvIGZpbHRlciB3b3JrcyB3aXRoIGV4Y2x1ZGVkIHN0dWZmICovXHJcbmV4cG9ydHMuUkVESVJFQ1RfVVJMUyA9IFtcclxuICAgIGBodHRwczovL2FyY2hpdmVvZm91cm93bi5vcmcvdGFncy8qL3dvcmtzYCxcclxuICAgIGBodHRwczovL2FyY2hpdmVvZm91cm93bi5vcmcvdGFncy8qL2Jvb2ttYXJrc2AsXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL3VzZXJzLyovd29ya3MqYCxcclxuICAgIGBodHRwczovL2FyY2hpdmVvZm91cm93bi5vcmcvdXNlcnMvKi9ib29rbWFya3MqYCxcclxuICAgIGBodHRwczovL2FyY2hpdmVvZm91cm93bi5vcmcvY29sbGVjdGlvbnMvKi93b3Jrc2AsXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL2NvbGxlY3Rpb25zLyovYm9va21hcmtzYCAvLyBDb2xsZWN0aW9uJ3MgYm9va21hcmtzXHJcbl07XHJcbi8qKiBDYW5ub3QgcmVkaXJlY3QgdGhlc2UgVVJMcywgbmVlZCB0byBoaWRlIHdvcmtzIHdpdGggZXhjbHVkZWQgc3R1ZmYgKi9cclxuZXhwb3J0cy5ISURFX1VSTFMgPSBbXHJcbiAgICBgaHR0cHM6XFwvXFwvYXJjaGl2ZW9mb3Vyb3duXFwub3JnXFwvdXNlcnNcXC9gLFxyXG4gICAgYGh0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL3VzZXJzXFwvLipcXC9zZXJpZXNgLFxyXG4gICAgYGh0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL3VzZXJzXFwvLipcXC9naWZ0c2AsXHJcbiAgICBgaHR0cHM6XFwvXFwvYXJjaGl2ZW9mb3Vyb3duXFwub3JnXFwvY29sbGVjdGlvbnNcXC8uKlxcL3Nlcmllc2AsIC8vIENvbGxlY3Rpb24ncyBzZXJpZXNcclxuXTtcclxuO1xyXG4vKiogUmF0aW5nIG9mIHdvcmtzIHRvIGlkICovXHJcbnZhciBSQVRJTkc7XHJcbihmdW5jdGlvbiAoUkFUSU5HKSB7XHJcbiAgICBSQVRJTkdbUkFUSU5HW1wibm90UmF0ZWRcIl0gPSA5XSA9IFwibm90UmF0ZWRcIjtcclxuICAgIFJBVElOR1tSQVRJTkdbXCJnZW5cIl0gPSAxMF0gPSBcImdlblwiO1xyXG4gICAgUkFUSU5HW1JBVElOR1tcInRlZW5cIl0gPSAxMV0gPSBcInRlZW5cIjtcclxuICAgIFJBVElOR1tSQVRJTkdbXCJtYXR1cmVcIl0gPSAxMl0gPSBcIm1hdHVyZVwiO1xyXG4gICAgUkFUSU5HW1JBVElOR1tcImV4cGxpY2l0XCJdID0gMTNdID0gXCJleHBsaWNpdFwiO1xyXG59KShSQVRJTkcgPSBleHBvcnRzLlJBVElORyB8fCAoZXhwb3J0cy5SQVRJTkcgPSB7fSkpO1xyXG4vKiogQ2F0ZWdvcnkgb2Ygd29yayB0byBpZCAqL1xyXG52YXIgQ0FURUdPUlk7XHJcbihmdW5jdGlvbiAoQ0FURUdPUlkpIHtcclxuICAgIENBVEVHT1JZW0NBVEVHT1JZW1wiZ2VuXCJdID0gMjFdID0gXCJnZW5cIjtcclxuICAgIENBVEVHT1JZW0NBVEVHT1JZW1wiZm1cIl0gPSAyMl0gPSBcImZtXCI7XHJcbiAgICBDQVRFR09SWVtDQVRFR09SWVtcIm1tXCJdID0gMjNdID0gXCJtbVwiO1xyXG4gICAgQ0FURUdPUllbQ0FURUdPUllbXCJvdGhlclwiXSA9IDI0XSA9IFwib3RoZXJcIjtcclxuICAgIENBVEVHT1JZW0NBVEVHT1JZW1wiZmZcIl0gPSAxMTZdID0gXCJmZlwiO1xyXG4gICAgQ0FURUdPUllbQ0FURUdPUllbXCJtdWx0aVwiXSA9IDIyNDZdID0gXCJtdWx0aVwiO1xyXG59KShDQVRFR09SWSA9IGV4cG9ydHMuQ0FURUdPUlkgfHwgKGV4cG9ydHMuQ0FURUdPUlkgPSB7fSkpO1xyXG4vKiogV2FybmluZ3Mgb2Ygd29yayB0byBpZCAqL1xyXG52YXIgV0FSTklORztcclxuKGZ1bmN0aW9uIChXQVJOSU5HKSB7XHJcbiAgICBXQVJOSU5HW1dBUk5JTkdbXCJjaG9zZU5vdFRvVXNlXCJdID0gMTRdID0gXCJjaG9zZU5vdFRvVXNlXCI7XHJcbiAgICBXQVJOSU5HW1dBUk5JTkdbXCJub1dhcm5pbmdzQXBwbHlcIl0gPSAxNl0gPSBcIm5vV2FybmluZ3NBcHBseVwiO1xyXG4gICAgV0FSTklOR1tXQVJOSU5HW1widmlvbGVuY2VcIl0gPSAxN10gPSBcInZpb2xlbmNlXCI7XHJcbiAgICBXQVJOSU5HW1dBUk5JTkdbXCJtY2RcIl0gPSAxOF0gPSBcIm1jZFwiO1xyXG4gICAgV0FSTklOR1tXQVJOSU5HW1wibm9uQ29uXCJdID0gMTldID0gXCJub25Db25cIjtcclxuICAgIFdBUk5JTkdbV0FSTklOR1tcInVuZGVyYWdlXCJdID0gMjBdID0gXCJ1bmRlcmFnZVwiO1xyXG59KShXQVJOSU5HID0gZXhwb3J0cy5XQVJOSU5HIHx8IChleHBvcnRzLldBUk5JTkcgPSB7fSkpO1xyXG4vKipcclxuICogVGFrZXMgcmF0aW5nIGlkIG9mIHdvcmsgYW5kIGNvbnZlcnRzIGl0IHRvIGFuIGVudW0gdmFsdWVcclxuICogQHBhcmFtIGlkIElkIG9mIHJhdGluZ1xyXG4gKiBAcmV0dXJucyBSQVRJTkcgZW51bSBjb252ZXJ0ZWQgZnJvbSBpZFxyXG4gKi9cclxuZnVuY3Rpb24gaWRUb1JhdGluZ0VudW0oaWQpIHtcclxuICAgIGlmIChpZCA9PSA5KVxyXG4gICAgICAgIHJldHVybiBSQVRJTkcubm90UmF0ZWQ7XHJcbiAgICBlbHNlIGlmIChpZCA9PSAxMClcclxuICAgICAgICByZXR1cm4gUkFUSU5HLmdlbjtcclxuICAgIGVsc2UgaWYgKGlkID09IDExKVxyXG4gICAgICAgIHJldHVybiBSQVRJTkcudGVlbjtcclxuICAgIGVsc2UgaWYgKGlkID09IDEyKVxyXG4gICAgICAgIHJldHVybiBSQVRJTkcubWF0dXJlO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHJldHVybiBSQVRJTkcuZXhwbGljaXQ7XHJcbn1cclxuZXhwb3J0cy5pZFRvUmF0aW5nRW51bSA9IGlkVG9SYXRpbmdFbnVtO1xyXG4vKipcclxuICogVGFrZXMgY2F0ZWdvcnkgaWQgb2Ygd29yayBhbmQgY29udmVydHMgaXQgdG8gYW4gZW51bSB2YWx1ZVxyXG4gKiBAcGFyYW0gaWQgSWQgb2YgY2F0ZWdvcnlcclxuICogQHJldHVybnMgQ0FURUdPUlkgZW51bSBjb252ZXJ0ZWQgZnJvbSBpZFxyXG4gKi9cclxuZnVuY3Rpb24gaWRUb0NhdGV0b3J5RW51bShpZCkge1xyXG4gICAgaWYgKGlkID09IDIxKVxyXG4gICAgICAgIHJldHVybiBDQVRFR09SWS5nZW47XHJcbiAgICBlbHNlIGlmIChpZCA9PSAyMilcclxuICAgICAgICByZXR1cm4gQ0FURUdPUlkuZm07XHJcbiAgICBlbHNlIGlmIChpZCA9PSAyMylcclxuICAgICAgICByZXR1cm4gQ0FURUdPUlkubW07XHJcbiAgICBlbHNlIGlmIChpZCA9PSAyNClcclxuICAgICAgICByZXR1cm4gQ0FURUdPUlkub3RoZXI7XHJcbiAgICBlbHNlIGlmIChpZCA9PSAxMTYpXHJcbiAgICAgICAgcmV0dXJuIENBVEVHT1JZLmZmO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHJldHVybiBDQVRFR09SWS5tdWx0aTtcclxufVxyXG5leHBvcnRzLmlkVG9DYXRldG9yeUVudW0gPSBpZFRvQ2F0ZXRvcnlFbnVtO1xyXG4vKipcclxuICogVGFrZXMgd2FybmluZyBpZCBvZiB3b3JrIGFuZCBjb252ZXJ0cyBpdCB0byBhbiBlbnVtIHZhbHVlXHJcbiAqIEBwYXJhbSBpZCBJZCBvZiB3YXJuaW5nXHJcbiAqIEByZXR1cm5zIFdBUk5JTkcgZW51bSBjb252ZXJ0ZWQgZnJvbSBpZFxyXG4gKi9cclxuZnVuY3Rpb24gaWRUb1dhcm5pbmdFbnVtKGlkKSB7XHJcbiAgICBpZiAoaWQgPT0gMTQpXHJcbiAgICAgICAgcmV0dXJuIFdBUk5JTkcuY2hvc2VOb3RUb1VzZTtcclxuICAgIGVsc2UgaWYgKGlkID09IDE2KVxyXG4gICAgICAgIHJldHVybiBXQVJOSU5HLm5vV2FybmluZ3NBcHBseTtcclxuICAgIGVsc2UgaWYgKGlkID09IDE3KVxyXG4gICAgICAgIHJldHVybiBXQVJOSU5HLnZpb2xlbmNlO1xyXG4gICAgZWxzZSBpZiAoaWQgPT0gMTgpXHJcbiAgICAgICAgcmV0dXJuIFdBUk5JTkcubWNkO1xyXG4gICAgZWxzZSBpZiAoaWQgPT0gMTkpXHJcbiAgICAgICAgcmV0dXJuIFdBUk5JTkcubm9uQ29uO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHJldHVybiBXQVJOSU5HLnVuZGVyYWdlO1xyXG59XHJcbmV4cG9ydHMuaWRUb1dhcm5pbmdFbnVtID0gaWRUb1dhcm5pbmdFbnVtO1xyXG4vKipcclxuICogQ29udmVydHMgc3RyaW5nIHZhbHVlIG9mIGEgd2FybmluZyB0byB0aGUgY29ycmVzcG9uZGluZyBXQVJOSU5HIGVudW1cclxuICogQHBhcmFtIHdhcm5pbmcgU3RyaW5nIG9mIHdhcm5pbmcgZnJvbSBwYWdlXHJcbiAqIEByZXR1cm5zIENvbnZlcnRlZCBlbnVtIHZhbHVlIG9mIHBhcmFtXHJcbiAqL1xyXG5mdW5jdGlvbiB3YXJuaW5nVG9FbnVtKHdhcm5pbmcpIHtcclxuICAgIGlmICh3YXJuaW5nID09IFwiQ2hvb3NlIE5vdCBUbyBVc2UgQXJjaGl2ZSBXYXJuaW5nc1wiKVxyXG4gICAgICAgIHJldHVybiBXQVJOSU5HLmNob3NlTm90VG9Vc2U7XHJcbiAgICBlbHNlIGlmICh3YXJuaW5nID09IFwiR3JhcGhpYyBEZXBpY3Rpb25zIE9mIFZpb2xlbmNlXCIpXHJcbiAgICAgICAgcmV0dXJuIFdBUk5JTkcudmlvbGVuY2U7XHJcbiAgICBlbHNlIGlmICh3YXJuaW5nID09IFwiTWFqb3IgQ2hhcmFjdGVyIERlYXRoXCIpXHJcbiAgICAgICAgcmV0dXJuIFdBUk5JTkcubWNkO1xyXG4gICAgZWxzZSBpZiAod2FybmluZyA9PSBcIk5vIEFyY2hpdmUgV2FybmluZ3MgQXBwbHlcIilcclxuICAgICAgICByZXR1cm4gV0FSTklORy5ub1dhcm5pbmdzQXBwbHk7XHJcbiAgICBlbHNlIGlmICh3YXJuaW5nID09IFwiUmFwZS9Ob24tQ29uXCIpXHJcbiAgICAgICAgcmV0dXJuIFdBUk5JTkcubm9uQ29uO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHJldHVybiBXQVJOSU5HLnVuZGVyYWdlO1xyXG59XHJcbmV4cG9ydHMud2FybmluZ1RvRW51bSA9IHdhcm5pbmdUb0VudW07XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBzdHJpbmcgdmFsdWUgb2YgYSByYXRpbmcgdG8gdGhlIGNvcnJlc3BvbmRpbmcgUkFUSU5HIGVudW1cclxuICogQHBhcmFtIHdhcm5pbmcgU3RyaW5nIG9mIHJhdGluZyBmcm9tIHBhZ2VcclxuICogQHJldHVybnMgQ29udmVydGVkIGVudW0gdmFsdWUgb2YgcGFyYW1cclxuICovXHJcbmZ1bmN0aW9uIHJhdGluZ1RvRW51bShyYXRpbmcpIHtcclxuICAgIGlmIChyYXRpbmcgPT0gXCJOb3QgUmF0ZWRcIilcclxuICAgICAgICByZXR1cm4gUkFUSU5HLm5vdFJhdGVkO1xyXG4gICAgZWxzZSBpZiAocmF0aW5nID09IFwiR2VuZXJhbCBBdWRpZW5jZXNcIilcclxuICAgICAgICByZXR1cm4gUkFUSU5HLmdlbjtcclxuICAgIGVsc2UgaWYgKHJhdGluZyA9PSBcIlRlZW4gQW5kIFVwIEF1ZGllbmNlc1wiKVxyXG4gICAgICAgIHJldHVybiBSQVRJTkcudGVlbjtcclxuICAgIGVsc2UgaWYgKHJhdGluZyA9PSBcIk1hdHVyZVwiKVxyXG4gICAgICAgIHJldHVybiBSQVRJTkcubWF0dXJlO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHJldHVybiBSQVRJTkcuZXhwbGljaXQ7XHJcbn1cclxuZXhwb3J0cy5yYXRpbmdUb0VudW0gPSByYXRpbmdUb0VudW07XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBzdHJpbmcgdmFsdWUgb2YgYSBjYXRlZ29yeSB0byB0aGUgY29ycmVzcG9uZGluZyBDQVRFR09SWSBlbnVtXHJcbiAqIEBwYXJhbSB3YXJuaW5nIFN0cmluZyBvZiBjYXRlZ29yeSBmcm9tIHBhZ2VcclxuICogQHJldHVybnMgQ29udmVydGVkIGVudW0gdmFsdWUgb2YgcGFyYW1cclxuICovXHJcbmZ1bmN0aW9uIGNhdGVnb3J5VG9FbnVtKGNhdGVnb3J5KSB7XHJcbiAgICBpZiAoY2F0ZWdvcnkgPT0gXCJGL0ZcIilcclxuICAgICAgICByZXR1cm4gQ0FURUdPUlkuZmY7XHJcbiAgICBlbHNlIGlmIChjYXRlZ29yeSA9PSBcIkYvTVwiKVxyXG4gICAgICAgIHJldHVybiBDQVRFR09SWS5mbTtcclxuICAgIGVsc2UgaWYgKGNhdGVnb3J5ID09IFwiR2VuXCIpXHJcbiAgICAgICAgcmV0dXJuIENBVEVHT1JZLmdlbjtcclxuICAgIGVsc2UgaWYgKGNhdGVnb3J5ID09IFwiTS9NXCIpXHJcbiAgICAgICAgcmV0dXJuIENBVEVHT1JZLm1tO1xyXG4gICAgZWxzZSBpZiAoY2F0ZWdvcnkgPT0gXCJNdWx0aVwiKVxyXG4gICAgICAgIHJldHVybiBDQVRFR09SWS5tdWx0aTtcclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gQ0FURUdPUlkub3RoZXI7XHJcbn1cclxuZXhwb3J0cy5jYXRlZ29yeVRvRW51bSA9IGNhdGVnb3J5VG9FbnVtO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi4vZXhwb3J0L2NvbnN0YW50c1wiKTtcclxuY29uc3QgcmF0aW9fMSA9IHJlcXVpcmUoXCIuL3JhdGlvXCIpO1xyXG4vLyAqIEV4ZWN1dGVkIGNvZGUgc3RhcnRcclxuYnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldChjb25zdGFudHNfMS5TVE9SQUdFX0tFWVMpLnRoZW4oKHZhbHVlKSA9PiB7XHJcbiAgICAvLyBJZiBubyBzZXR0aW5ncyB2YWx1ZXMgYXJlIGluIHN0b3JhZ2UsIHNldCBkZWZhdWx0IHNldHRpbmcgdmFsdWVzIGluIHN0b3JhZ2VcclxuICAgIGlmIChPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoID09IDApIHtcclxuICAgICAgICBicm93c2VyLnN0b3JhZ2UubG9jYWwuc2V0KGNvbnN0YW50c18xLkRFRkFVTFRfVkFMVUVTKS50aGVuKCgpID0+IG9ubG9hZFByb21pc2UoY29uc3RhbnRzXzEuREVGQVVMVF9WQUxVRVMpKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICBvbmxvYWRQcm9taXNlKHZhbHVlKTtcclxufSk7XHJcbi8vICogRXhlY3V0ZWQgY29kZSBlbmRcclxuLy8gKiBGdW5jdGlvbnNcclxuLyoqXHJcbiAqIEV4ZWN1dGVkIGFmdGVyIGFsbCBwcm9taXNlcyBhcmUgZnVsZmlsbGVkXHJcbiAqIEBwYXJhbSB2YWx1ZSBMb2NhbCBzdG9yYWdlIHZhbHVlcyBvZiBhbGwgc2F2ZWQgc2V0dGluZ3NcclxuICovXHJcbmZ1bmN0aW9uIG9ubG9hZFByb21pc2UodmFsdWUpIHtcclxuICAgIC8vIEFkZCBrdWRvcyB0byBoaXQgcmF0aW8gaWYgb25cclxuICAgIGlmICh2YWx1ZS5rdWRvc0hpdFJhdGlvKVxyXG4gICAgICAgICgwLCByYXRpb18xLmFkZEt1ZG9zVG9IaXRSYXRpb3MpKGRvY3VtZW50KTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=