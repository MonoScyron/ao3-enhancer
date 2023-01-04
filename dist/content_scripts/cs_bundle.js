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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZW50X3NjcmlwdHMvY3NfYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVFQUF1RTtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isc0JBQXNCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7Ozs7Ozs7Ozs7O0FDckVkO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGNBQWMsR0FBRyxpQkFBaUIsR0FBRyxxQkFBcUIsR0FBRyx3QkFBd0IsR0FBRyxzQkFBc0IsR0FBRyxvQkFBb0I7QUFDckk7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsOEJBQThCLGNBQWMsS0FBSzs7Ozs7OztVQzdDbEQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxvQkFBb0IsbUJBQU8sQ0FBQyxzREFBcUI7QUFDakQsa0JBQWtCLG1CQUFPLENBQUMsbURBQVc7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnRfc2NyaXB0cy9jcmF3bGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9leHBvcnQvY29uc3RhbnRzLnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudF9zY3JpcHRzL29ubG9hZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmFkZEt1ZG9zVG9IaXRSYXRpb3MgPSB2b2lkIDA7XHJcbi8qKlxyXG4gICogQWRkcyBrdWRvcyB0byBoaXQgcmF0aW9zIHRvIHdvcmtzIG9uIHRoZSBwYWdlXHJcbiAqIEBwYXJhbSBkb2N1bWVudCBEb2N1bWVudCBvZiB0aGUgcGFnZVxyXG4gKiBAcmV0dXJucyBbQXJyYXkgb2YgcmF0aW8gbGFiZWxzLCBhcnJheSBvZiByYXRpbyB2YWx1ZXNdXHJcbiAqL1xyXG5mdW5jdGlvbiBhZGRLdWRvc1RvSGl0UmF0aW9zKGRvY3VtZW50KSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICAvLyBDcmVhdGUgcmF0aW8gZWxlbWVudHMgZm9yIGFsbCB3b3JrcyBvbiBwYWdlXHJcbiAgICBsZXQgcmF0aW9fZHRMaXN0ID0gW107XHJcbiAgICBsZXQgcmF0aW9fZGRMaXN0ID0gW107XHJcbiAgICAvLyBHZXQgbGlzdCBvZiB3b3Jrc1xyXG4gICAgbGV0IHdvcmtMaXN0O1xyXG4gICAgbGV0IHR5cGUgPSAoX2EgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JvdXAnKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNsYXNzTGlzdFswXTtcclxuICAgIGlmIChkb2N1bWVudC5VUkwuc3BsaXQoJy8nKVszXSA9PSBcIndvcmtzXCIpIHtcclxuICAgICAgICB3b3JrTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ3b3JrIG1ldGEgZ3JvdXBcIik7IC8vIG1ldGFcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJib29rbWFya1wiIHx8IHR5cGUgPT0gXCJ3b3JrXCIpIHtcclxuICAgICAgICB3b3JrTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodHlwZSArIFwiIGJsdXJiIGdyb3VwXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgd29ya0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwid29yayBibHVyYiBncm91cFwiKTtcclxuICAgIH1cclxuICAgIC8vIEdldCBsaXN0IG9mIHdvcmsgc3RhdHNcclxuICAgIGxldCBzdGF0c0xpc3Q7XHJcbiAgICBpZiAoZG9jdW1lbnQuVVJMLnNwbGl0KCcvJylbM10gPT0gXCJ3b3Jrc1wiKSB7XHJcbiAgICAgICAgc3RhdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRsLnN0YXRzXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgc3RhdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncm91cFtyb2xlPSdhcnRpY2xlJ10gZGwuc3RhdHNcIik7XHJcbiAgICB9XHJcbiAgICAvLyBDcmVhdGUgbGlzdCBvZiByYXRpbyBlbGVtZW50c1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3JrTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCB3b3JrID0gd29ya0xpc3RbaV07XHJcbiAgICAgICAgbGV0IGt1ZG9zX2RkID0gd29yay5xdWVyeVNlbGVjdG9yKFwiZGQua3Vkb3NcIik7XHJcbiAgICAgICAgbGV0IGhpdHNfZGQgPSB3b3JrLnF1ZXJ5U2VsZWN0b3IoXCJkZC5oaXRzXCIpO1xyXG4gICAgICAgIGxldCBoaXRzID0gcGFyc2VJbnQoaGl0c19kZC5pbm5lckhUTUwpO1xyXG4gICAgICAgIC8vIEdldCBrdWRvcyAmIGhpdHMgZnJvbSB3b3JrXHJcbiAgICAgICAgaWYgKGt1ZG9zX2RkICE9IG51bGwgJiYgaGl0c19kZCAhPSBudWxsICYmIGhpdHMgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCByYXRpb19kdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkdFwiKTtcclxuICAgICAgICAgICAgcmF0aW9fZHQuY2xhc3NOYW1lID0gYGt1ZG9zLXRvLWhpdC1yYXRpb2A7XHJcbiAgICAgICAgICAgIHJhdGlvX2R0LmlubmVySFRNTCA9IFwiUmF0aW86XCI7XHJcbiAgICAgICAgICAgIGxldCBrdWRvcztcclxuICAgICAgICAgICAgaWYgKGt1ZG9zX2RkLmZpcnN0Q2hpbGQubm9kZU5hbWUgPT0gXCJBXCIpIHtcclxuICAgICAgICAgICAgICAgIGt1ZG9zID0gcGFyc2VJbnQoa3Vkb3NfZGQuZmlyc3RFbGVtZW50Q2hpbGQuaW5uZXJIVE1MKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGt1ZG9zID0gcGFyc2VJbnQoa3Vkb3NfZGQuaW5uZXJIVE1MKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcmF0aW9fZGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGRcIik7XHJcbiAgICAgICAgICAgIHJhdGlvX2RkLmNsYXNzTmFtZSA9IGByYXRpb2A7XHJcbiAgICAgICAgICAgIHJhdGlvX2RkLmlubmVySFRNTCA9IE1hdGgucm91bmQoKGt1ZG9zIC8gaGl0cykgKiAxMDAwKSAvIDEwICsgXCIlXCI7XHJcbiAgICAgICAgICAgIHJhdGlvX2R0TGlzdFtpXSA9IHJhdGlvX2R0O1xyXG4gICAgICAgICAgICByYXRpb19kZExpc3RbaV0gPSByYXRpb19kZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJhdGlvX2R0TGlzdFtpXSA9IG51bGw7XHJcbiAgICAgICAgICAgIHJhdGlvX2RkTGlzdFtpXSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gQWRkIGxpc3Qgb2YgcmF0aW8gZWxlbWVudHMgdG8gd29ya3NcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhdHNMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHJhdGlvX2R0TGlzdFtpXSAhPSBudWxsICYmIHJhdGlvX2RkTGlzdFtpXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHN0YXRzTGlzdFtpXS5hcHBlbmQocmF0aW9fZHRMaXN0W2ldLCByYXRpb19kZExpc3RbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLmFkZEt1ZG9zVG9IaXRSYXRpb3MgPSBhZGRLdWRvc1RvSGl0UmF0aW9zO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLk9SSUdJTiA9IGV4cG9ydHMuSElERV9VUkxTID0gZXhwb3J0cy5SRURJUkVDVF9VUkxTID0gZXhwb3J0cy5TRVRUSU5HU19DSEFOR0VEID0gZXhwb3J0cy5ERUZBVUxUX1ZBTFVFUyA9IGV4cG9ydHMuU1RPUkFHRV9LRVlTID0gdm9pZCAwO1xyXG4vLyBTdG9yYWdlIGtleXNcclxuZXhwb3J0cy5TVE9SQUdFX0tFWVMgPSBbXHJcbiAgICBcImt1ZG9zSGl0UmF0aW9cIiwgXCJsYW5ndWFnZVwiLCBcInF1ZXJ5XCIsIFwidGFnc1wiLCBcIndhcm5pbmdzXCJcclxuXTtcclxuLy8gRGVmYXVsdCB2YWx1ZXNcclxuZXhwb3J0cy5ERUZBVUxUX1ZBTFVFUyA9IHtcclxuICAgIGt1ZG9zSGl0UmF0aW86IHRydWUsXHJcbiAgICBsYW5ndWFnZTogW2ZhbHNlLCBcIlwiXSxcclxuICAgIHF1ZXJ5OiBbZmFsc2UsIFwiXCJdLFxyXG4gICAgdGFnczogW10sXHJcbiAgICB3YXJuaW5nczogW11cclxufTtcclxuLy8gU2V0dGluZ3MgY2hhbmdlZCBtZXNzYWdlXHJcbmV4cG9ydHMuU0VUVElOR1NfQ0hBTkdFRCA9IFwic2V0dGluZ3NfY2hhbmdlZFwiO1xyXG4vKipcclxuICogUmVkaXJlY3QgdGhlc2UgVVJMcyB0byBmaWx0ZXIgd29ya3Mgd2l0aCBleGNsdWRlZCBzdHVmZlxyXG4gKi9cclxuZXhwb3J0cy5SRURJUkVDVF9VUkxTID0gW1xyXG4gICAgYGh0dHBzOi8vYXJjaGl2ZW9mb3Vyb3duLm9yZy90YWdzLyovd29ya3NgLFxyXG4gICAgYGh0dHBzOi8vYXJjaGl2ZW9mb3Vyb3duLm9yZy90YWdzLyovYm9va21hcmtzYCxcclxuICAgIGBodHRwczovL2FyY2hpdmVvZm91cm93bi5vcmcvdXNlcnMvKi93b3JrcypgLFxyXG4gICAgYGh0dHBzOi8vYXJjaGl2ZW9mb3Vyb3duLm9yZy91c2Vycy8qL2Jvb2ttYXJrcypgLFxyXG4gICAgYGh0dHBzOi8vYXJjaGl2ZW9mb3Vyb3duLm9yZy9jb2xsZWN0aW9ucy8qL3dvcmtzYCxcclxuICAgIGBodHRwczovL2FyY2hpdmVvZm91cm93bi5vcmcvY29sbGVjdGlvbnMvKi9ib29rbWFya3NgIC8vIENvbGxlY3Rpb24ncyBib29rbWFya3NcclxuXTtcclxuLyoqXHJcbiAqIENhbm5vdCByZWRpcmVjdCB0aGVzZSBVUkxzLCBuZWVkIHRvIGhpZGUgd29ya3Mgd2l0aCBleGNsdWRlZCBzdHVmZlxyXG4gKi9cclxuZXhwb3J0cy5ISURFX1VSTFMgPSBbXHJcbiAgICBgaHR0cHM6XFwvXFwvYXJjaGl2ZW9mb3Vyb3duXFwub3JnXFwvdXNlcnNcXC9gLFxyXG4gICAgYGh0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL3VzZXJzXFwvLipcXC9zZXJpZXNgLFxyXG4gICAgYGh0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL3VzZXJzXFwvLipcXC9naWZ0c2AsXHJcbiAgICBgaHR0cHM6XFwvXFwvYXJjaGl2ZW9mb3Vyb3duXFwub3JnXFwvY29sbGVjdGlvbnNcXC8uKlxcL3Nlcmllc2AsIC8vIENvbGxlY3Rpb24ncyBzZXJpZXNcclxuXTtcclxuLyoqXHJcbiAqIE9yaWdpbiBvZiBwYWdlIHRvIHJlZGlyZWN0XHJcbiAqL1xyXG52YXIgT1JJR0lOO1xyXG4oZnVuY3Rpb24gKE9SSUdJTikge1xyXG4gICAgT1JJR0lOW1wiQ09MTEVDVElPTlNcIl0gPSBcImNvbGxlY3Rpb25faWQ9XCI7XHJcbiAgICBPUklHSU5bXCJUQUdTXCJdID0gXCJ0YWdfaWQ9XCI7XHJcbiAgICBPUklHSU5bXCJVU0VSU1wiXSA9IFwidXNlcl9pZD1cIjtcclxufSkoT1JJR0lOID0gZXhwb3J0cy5PUklHSU4gfHwgKGV4cG9ydHMuT1JJR0lOID0ge30pKTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uL2V4cG9ydC9jb25zdGFudHNcIik7XHJcbmNvbnN0IGNyYXdsZXJfMSA9IHJlcXVpcmUoXCIuL2NyYXdsZXJcIik7XHJcbi8vICogRXhlY3V0ZWQgY29kZSBzdGFydFxyXG5icm93c2VyLnN0b3JhZ2UubG9jYWwuZ2V0KGNvbnN0YW50c18xLlNUT1JBR0VfS0VZUykudGhlbigodmFsdWUpID0+IHtcclxuICAgIC8vIElmIG5vIHNldHRpbmdzIHZhbHVlcyBhcmUgaW4gc3RvcmFnZSwgc2V0IGRlZmF1bHQgc2V0dGluZyB2YWx1ZXMgaW4gc3RvcmFnZVxyXG4gICAgaWYgKE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgIGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5zZXQoY29uc3RhbnRzXzEuREVGQVVMVF9WQUxVRVMpLnRoZW4oKCkgPT4gb25sb2FkUHJvbWlzZShjb25zdGFudHNfMS5ERUZBVUxUX1ZBTFVFUykpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIG9ubG9hZFByb21pc2UodmFsdWUpO1xyXG59KTtcclxuLy8gKiBFeGVjdXRlZCBjb2RlIGVuZFxyXG4vLyAqIEZ1bmN0aW9uc1xyXG4vKipcclxuICogRXhlY3V0ZWQgYWZ0ZXIgYWxsIHByb21pc2VzIGFyZSBmdWxmaWxsZWRcclxuICogQHBhcmFtIHZhbHVlIExvY2FsIHN0b3JhZ2UgdmFsdWVzIG9mIGFsbCBzYXZlZCBzZXR0aW5nc1xyXG4gKi9cclxuZnVuY3Rpb24gb25sb2FkUHJvbWlzZSh2YWx1ZSkge1xyXG4gICAgLy8gQWRkIGt1ZG9zIHRvIGhpdCByYXRpbyBpZiBvblxyXG4gICAgaWYgKHZhbHVlLmt1ZG9zSGl0UmF0aW8pXHJcbiAgICAgICAgKDAsIGNyYXdsZXJfMS5hZGRLdWRvc1RvSGl0UmF0aW9zKShkb2N1bWVudCk7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9