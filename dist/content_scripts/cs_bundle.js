/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content_scripts/crawler.ts":
/*!****************************************!*\
  !*** ./src/content_scripts/crawler.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addKudosToHitRatios = void 0;
/**
  * Adds kudos to hit ratios to works on the page
 * @param document Document of the page
 * @returns [Array of ratio labels, array of ratio values]
 */
function addKudosToHitRatios(document) {
    var _a;
    // Create ratio elements for all works on page
    let ratio_dtList = [];
    let ratio_ddList = [];
    // Get list of works
    let workList;
    let type = (_a = document.querySelector('.group')) === null || _a === void 0 ? void 0 : _a.classList[0];
    if (document.URL.split('/')[3] == "works") {
        workList = document.getElementsByClassName("work meta group"); // meta
    }
    else if (type == "bookmark" || type == "work") {
        workList = document.getElementsByClassName(type + " blurb group");
    }
    else {
        workList = document.getElementsByClassName("work blurb group");
    }
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
/*!***************************************!*\
  !*** ./src/content_scripts/onload.ts ***!
  \***************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __webpack_require__(/*! ../export/constants */ "./src/export/constants.ts");
const crawler_1 = __webpack_require__(/*! ./crawler */ "./src/content_scripts/crawler.ts");
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
        (0, crawler_1.addKudosToHitRatios)(document);
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZW50X3NjcmlwdHMvY3NfYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVFQUF1RTtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isc0JBQXNCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7Ozs7Ozs7Ozs7O0FDckVkO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGNBQWMsR0FBRyxpQkFBaUIsR0FBRyxxQkFBcUIsR0FBRyx3QkFBd0IsR0FBRyxzQkFBc0IsR0FBRyxvQkFBb0I7QUFDckk7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw4QkFBOEIsY0FBYyxLQUFLOzs7Ozs7O1VDeENsRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG9CQUFvQixtQkFBTyxDQUFDLHNEQUFxQjtBQUNqRCxrQkFBa0IsbUJBQU8sQ0FBQyxtREFBVztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudF9zY3JpcHRzL2NyYXdsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4cG9ydC9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50X3NjcmlwdHMvb25sb2FkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuYWRkS3Vkb3NUb0hpdFJhdGlvcyA9IHZvaWQgMDtcclxuLyoqXHJcbiAgKiBBZGRzIGt1ZG9zIHRvIGhpdCByYXRpb3MgdG8gd29ya3Mgb24gdGhlIHBhZ2VcclxuICogQHBhcmFtIGRvY3VtZW50IERvY3VtZW50IG9mIHRoZSBwYWdlXHJcbiAqIEByZXR1cm5zIFtBcnJheSBvZiByYXRpbyBsYWJlbHMsIGFycmF5IG9mIHJhdGlvIHZhbHVlc11cclxuICovXHJcbmZ1bmN0aW9uIGFkZEt1ZG9zVG9IaXRSYXRpb3MoZG9jdW1lbnQpIHtcclxuICAgIHZhciBfYTtcclxuICAgIC8vIENyZWF0ZSByYXRpbyBlbGVtZW50cyBmb3IgYWxsIHdvcmtzIG9uIHBhZ2VcclxuICAgIGxldCByYXRpb19kdExpc3QgPSBbXTtcclxuICAgIGxldCByYXRpb19kZExpc3QgPSBbXTtcclxuICAgIC8vIEdldCBsaXN0IG9mIHdvcmtzXHJcbiAgICBsZXQgd29ya0xpc3Q7XHJcbiAgICBsZXQgdHlwZSA9IChfYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncm91cCcpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2xhc3NMaXN0WzBdO1xyXG4gICAgaWYgKGRvY3VtZW50LlVSTC5zcGxpdCgnLycpWzNdID09IFwid29ya3NcIikge1xyXG4gICAgICAgIHdvcmtMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIndvcmsgbWV0YSBncm91cFwiKTsgLy8gbWV0YVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodHlwZSA9PSBcImJvb2ttYXJrXCIgfHwgdHlwZSA9PSBcIndvcmtcIikge1xyXG4gICAgICAgIHdvcmtMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0eXBlICsgXCIgYmx1cmIgZ3JvdXBcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB3b3JrTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ3b3JrIGJsdXJiIGdyb3VwXCIpO1xyXG4gICAgfVxyXG4gICAgLy8gR2V0IGxpc3Qgb2Ygd29yayBzdGF0c1xyXG4gICAgbGV0IHN0YXRzTGlzdDtcclxuICAgIGlmIChkb2N1bWVudC5VUkwuc3BsaXQoJy8nKVszXSA9PSBcIndvcmtzXCIpIHtcclxuICAgICAgICBzdGF0c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGwuc3RhdHNcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBzdGF0c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyb3VwW3JvbGU9J2FydGljbGUnXSBkbC5zdGF0c1wiKTtcclxuICAgIH1cclxuICAgIC8vIENyZWF0ZSBsaXN0IG9mIHJhdGlvIGVsZW1lbnRzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHdvcmsgPSB3b3JrTGlzdFtpXTtcclxuICAgICAgICBsZXQga3Vkb3NfZGQgPSB3b3JrLnF1ZXJ5U2VsZWN0b3IoXCJkZC5rdWRvc1wiKTtcclxuICAgICAgICBsZXQgaGl0c19kZCA9IHdvcmsucXVlcnlTZWxlY3RvcihcImRkLmhpdHNcIik7XHJcbiAgICAgICAgbGV0IGhpdHMgPSBwYXJzZUludChoaXRzX2RkLmlubmVySFRNTCk7XHJcbiAgICAgICAgLy8gR2V0IGt1ZG9zICYgaGl0cyBmcm9tIHdvcmtcclxuICAgICAgICBpZiAoa3Vkb3NfZGQgIT0gbnVsbCAmJiBoaXRzX2RkICE9IG51bGwgJiYgaGl0cyA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHJhdGlvX2R0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImR0XCIpO1xyXG4gICAgICAgICAgICByYXRpb19kdC5jbGFzc05hbWUgPSBga3Vkb3MtdG8taGl0LXJhdGlvYDtcclxuICAgICAgICAgICAgcmF0aW9fZHQuaW5uZXJIVE1MID0gXCJSYXRpbzpcIjtcclxuICAgICAgICAgICAgbGV0IGt1ZG9zO1xyXG4gICAgICAgICAgICBpZiAoa3Vkb3NfZGQuZmlyc3RDaGlsZC5ub2RlTmFtZSA9PSBcIkFcIikge1xyXG4gICAgICAgICAgICAgICAga3Vkb3MgPSBwYXJzZUludChrdWRvc19kZC5maXJzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAga3Vkb3MgPSBwYXJzZUludChrdWRvc19kZC5pbm5lckhUTUwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByYXRpb19kZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkZFwiKTtcclxuICAgICAgICAgICAgcmF0aW9fZGQuY2xhc3NOYW1lID0gYHJhdGlvYDtcclxuICAgICAgICAgICAgcmF0aW9fZGQuaW5uZXJIVE1MID0gTWF0aC5yb3VuZCgoa3Vkb3MgLyBoaXRzKSAqIDEwMDApIC8gMTAgKyBcIiVcIjtcclxuICAgICAgICAgICAgcmF0aW9fZHRMaXN0W2ldID0gcmF0aW9fZHQ7XHJcbiAgICAgICAgICAgIHJhdGlvX2RkTGlzdFtpXSA9IHJhdGlvX2RkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmF0aW9fZHRMaXN0W2ldID0gbnVsbDtcclxuICAgICAgICAgICAgcmF0aW9fZGRMaXN0W2ldID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBBZGQgbGlzdCBvZiByYXRpbyBlbGVtZW50cyB0byB3b3Jrc1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGF0c0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAocmF0aW9fZHRMaXN0W2ldICE9IG51bGwgJiYgcmF0aW9fZGRMaXN0W2ldICE9IG51bGwpIHtcclxuICAgICAgICAgICAgc3RhdHNMaXN0W2ldLmFwcGVuZChyYXRpb19kdExpc3RbaV0sIHJhdGlvX2RkTGlzdFtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuYWRkS3Vkb3NUb0hpdFJhdGlvcyA9IGFkZEt1ZG9zVG9IaXRSYXRpb3M7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuT1JJR0lOID0gZXhwb3J0cy5ISURFX1VSTFMgPSBleHBvcnRzLlJFRElSRUNUX1VSTFMgPSBleHBvcnRzLlNFVFRJTkdTX0NIQU5HRUQgPSBleHBvcnRzLkRFRkFVTFRfVkFMVUVTID0gZXhwb3J0cy5TVE9SQUdFX0tFWVMgPSB2b2lkIDA7XHJcbi8vIFN0b3JhZ2Uga2V5c1xyXG5leHBvcnRzLlNUT1JBR0VfS0VZUyA9IFtcclxuICAgIFwia3Vkb3NIaXRSYXRpb1wiLCBcImZpbHRlcmluZ1wiLCBcImxhbmd1YWdlXCIsIFwicXVlcnlcIiwgXCJ0YWdzXCIsIFwid2FybmluZ3NcIlxyXG5dO1xyXG4vLyBEZWZhdWx0IHZhbHVlc1xyXG5leHBvcnRzLkRFRkFVTFRfVkFMVUVTID0ge1xyXG4gICAga3Vkb3NIaXRSYXRpbzogdHJ1ZSxcclxuICAgIGZpbHRlcmluZzogZmFsc2UsXHJcbiAgICBsYW5ndWFnZTogW2ZhbHNlLCBcIlwiXSxcclxuICAgIHF1ZXJ5OiBbZmFsc2UsIFwiXCJdLFxyXG4gICAgdGFnczogW10sXHJcbiAgICB3YXJuaW5nczogW11cclxufTtcclxuLy8gU2V0dGluZ3MgY2hhbmdlZCBtZXNzYWdlXHJcbmV4cG9ydHMuU0VUVElOR1NfQ0hBTkdFRCA9IFwic2V0dGluZ3NfY2hhbmdlZFwiO1xyXG4vKiogUmVkaXJlY3QgdGhlc2UgVVJMcyB0byBmaWx0ZXIgd29ya3Mgd2l0aCBleGNsdWRlZCBzdHVmZiAqL1xyXG5leHBvcnRzLlJFRElSRUNUX1VSTFMgPSBbXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL3RhZ3MvKi93b3Jrc2AsXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL3RhZ3MvKi9ib29rbWFya3NgLFxyXG4gICAgYGh0dHBzOi8vYXJjaGl2ZW9mb3Vyb3duLm9yZy91c2Vycy8qL3dvcmtzKmAsXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL3VzZXJzLyovYm9va21hcmtzKmAsXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL2NvbGxlY3Rpb25zLyovd29ya3NgLFxyXG4gICAgYGh0dHBzOi8vYXJjaGl2ZW9mb3Vyb3duLm9yZy9jb2xsZWN0aW9ucy8qL2Jvb2ttYXJrc2AgLy8gQ29sbGVjdGlvbidzIGJvb2ttYXJrc1xyXG5dO1xyXG4vKiogQ2Fubm90IHJlZGlyZWN0IHRoZXNlIFVSTHMsIG5lZWQgdG8gaGlkZSB3b3JrcyB3aXRoIGV4Y2x1ZGVkIHN0dWZmICovXHJcbmV4cG9ydHMuSElERV9VUkxTID0gW1xyXG4gICAgYGh0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL3VzZXJzXFwvYCxcclxuICAgIGBodHRwczpcXC9cXC9hcmNoaXZlb2ZvdXJvd25cXC5vcmdcXC91c2Vyc1xcLy4qXFwvc2VyaWVzYCxcclxuICAgIGBodHRwczpcXC9cXC9hcmNoaXZlb2ZvdXJvd25cXC5vcmdcXC91c2Vyc1xcLy4qXFwvZ2lmdHNgLFxyXG4gICAgYGh0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL2NvbGxlY3Rpb25zXFwvLipcXC9zZXJpZXNgLCAvLyBDb2xsZWN0aW9uJ3Mgc2VyaWVzXHJcbl07XHJcbi8qKiBPcmlnaW4gb2YgcGFnZSB0byByZWRpcmVjdCAqL1xyXG52YXIgT1JJR0lOO1xyXG4oZnVuY3Rpb24gKE9SSUdJTikge1xyXG4gICAgT1JJR0lOW1wiQ09MTEVDVElPTlNcIl0gPSBcImNvbGxlY3Rpb25faWQ9XCI7XHJcbiAgICBPUklHSU5bXCJUQUdTXCJdID0gXCJ0YWdfaWQ9XCI7XHJcbiAgICBPUklHSU5bXCJVU0VSU1wiXSA9IFwidXNlcl9pZD1cIjtcclxufSkoT1JJR0lOID0gZXhwb3J0cy5PUklHSU4gfHwgKGV4cG9ydHMuT1JJR0lOID0ge30pKTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uL2V4cG9ydC9jb25zdGFudHNcIik7XHJcbmNvbnN0IGNyYXdsZXJfMSA9IHJlcXVpcmUoXCIuL2NyYXdsZXJcIik7XHJcbi8vICogRXhlY3V0ZWQgY29kZSBzdGFydFxyXG5icm93c2VyLnN0b3JhZ2UubG9jYWwuZ2V0KGNvbnN0YW50c18xLlNUT1JBR0VfS0VZUykudGhlbigodmFsdWUpID0+IHtcclxuICAgIC8vIElmIG5vIHNldHRpbmdzIHZhbHVlcyBhcmUgaW4gc3RvcmFnZSwgc2V0IGRlZmF1bHQgc2V0dGluZyB2YWx1ZXMgaW4gc3RvcmFnZVxyXG4gICAgaWYgKE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgIGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5zZXQoY29uc3RhbnRzXzEuREVGQVVMVF9WQUxVRVMpLnRoZW4oKCkgPT4gb25sb2FkUHJvbWlzZShjb25zdGFudHNfMS5ERUZBVUxUX1ZBTFVFUykpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIG9ubG9hZFByb21pc2UodmFsdWUpO1xyXG59KTtcclxuLy8gKiBFeGVjdXRlZCBjb2RlIGVuZFxyXG4vLyAqIEZ1bmN0aW9uc1xyXG4vKipcclxuICogRXhlY3V0ZWQgYWZ0ZXIgYWxsIHByb21pc2VzIGFyZSBmdWxmaWxsZWRcclxuICogQHBhcmFtIHZhbHVlIExvY2FsIHN0b3JhZ2UgdmFsdWVzIG9mIGFsbCBzYXZlZCBzZXR0aW5nc1xyXG4gKi9cclxuZnVuY3Rpb24gb25sb2FkUHJvbWlzZSh2YWx1ZSkge1xyXG4gICAgLy8gQWRkIGt1ZG9zIHRvIGhpdCByYXRpbyBpZiBvblxyXG4gICAgaWYgKHZhbHVlLmt1ZG9zSGl0UmF0aW8pXHJcbiAgICAgICAgKDAsIGNyYXdsZXJfMS5hZGRLdWRvc1RvSGl0UmF0aW9zKShkb2N1bWVudCk7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9