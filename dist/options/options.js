/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/*!********************************!*\
  !*** ./src/options/options.ts ***!
  \********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __webpack_require__(/*! ../export/constants */ "./src/export/constants.ts");
// * Select input from document
// Kudos to hit ratio
const kudosHitRatioBtn = document.querySelector(`input[name='kudos-hit-ratio']`);
// Enable filtering
const filterBtn = document.querySelector(`input[name='enable-filtering']`);
// Language
const languageBtn = document.querySelector(`input[name='language-enable']`);
const languageSelect = document.querySelector(`select[name='language']`);
// Query
const queryBtn = document.querySelector(`input[name='query-enable']`);
const queryInput = document.querySelector(`input[name='query']`);
// Tags/fandoms
const excludeTagInput = document.querySelector(`input[name='exclude-tag']`);
const excludeTagBtn = document.getElementById(`exclude-tag-submit`);
const removeTagSelect = document.querySelector(`select[name='remove-tag']`);
const removeTagBtn = document.getElementById(`remove-tag-submit`);
// Warnings
const excludeWarningCheckbox = {
    choseNotToUse: document.querySelector(`input[name='exclude-warning-chose-not-to-use']`),
    violence: document.querySelector(`input[name='exclude-warning-violence']`),
    mcd: document.querySelector(`input[name='exclude-warning-mcd']`),
    nonCon: document.querySelector(`input[name='exclude-warning-non-con']`),
    underage: document.querySelector(`input[name='exclude-warning-underage']`),
    noWarnings: document.querySelector(`input[name='exclude-warning-no-warnings']`)
};
// * Constant elements defined here
// Options whose visibility depends on if filtering is enabled
const FILTERING_ELEMENTS = document.getElementsByClassName("filtering");
// * Global vars
let tagList = [];
let warningList = [];
// * Sync inputs to values saved in storage
browser.storage.local.get(constants_1.STORAGE_KEYS).then((store) => {
    //If no settings values are in storage, set default setting values in storage
    if (Object.keys(store).length == 0) {
        browser.storage.local.set(constants_1.DEFAULT_VALUES);
        syncSettings(constants_1.DEFAULT_VALUES);
    }
    else {
        syncSettings(store);
    }
});
// * Save settings to local storage when values are changed
// Kudos to hit ratio
kudosHitRatioBtn.addEventListener("change", () => {
    browser.storage.local.set({ kudosHitRatio: kudosHitRatioBtn.checked }).then(() => browser.runtime.sendMessage(constants_1.SETTINGS_CHANGED));
});
// Enable filtering
filterBtn.addEventListener("change", () => {
    browser.storage.local.set({ filtering: filterBtn.checked }).then(() => browser.runtime.sendMessage(constants_1.SETTINGS_CHANGED));
    checkFilteringElements(filterBtn.checked);
});
// Language
function setLanguageStorage() {
    // Disable all related inputs
    languageBtn.classList.add("disabled");
    languageSelect.classList.add("disabled");
    browser.storage.local.set({
        language: [
            languageBtn.checked,
            languageSelect.value
        ]
    }).then(() => {
        // Enable all related inputs
        languageBtn.classList.remove("disabled");
        languageSelect.classList.remove("disabled");
        browser.runtime.sendMessage(constants_1.SETTINGS_CHANGED);
    });
}
languageBtn.addEventListener("change", setLanguageStorage);
languageSelect.addEventListener("change", setLanguageStorage);
// Query
function setQueryStorage() {
    // Disable all related inputs
    queryBtn.classList.add("disabled");
    queryInput.classList.add("disabled");
    browser.storage.local.set({
        query: [
            queryBtn.checked,
            queryInput.value
        ]
    }).then(() => {
        // Enable all related inputs
        queryBtn.classList.remove("disabled");
        queryInput.classList.remove("disabled");
        browser.runtime.sendMessage(constants_1.SETTINGS_CHANGED);
    });
}
queryBtn.addEventListener("change", setQueryStorage);
queryInput.addEventListener("input", setQueryStorage);
// Tags/fandoms
excludeTagBtn.addEventListener("click", () => {
    if (excludeTagInput.value.length > 0) {
        addTagElement(excludeTagInput.value);
        excludeTagInput.value = "";
    }
});
removeTagBtn.addEventListener("click", () => removeTagElement(removeTagSelect.value));
// Warnings
function addExcludeWarningListener(checkbox) {
    checkbox.addEventListener("change", () => {
        var checked = checkbox.checked;
        var val = parseInt(checkbox.getAttribute("value"));
        var index = warningList.indexOf(val);
        if (checked && index == -1)
            warningList.push(val);
        else if (!checked)
            warningList.splice(index, 1);
        browser.storage.local.set({ warnings: warningList }).then(() => browser.runtime.sendMessage(constants_1.SETTINGS_CHANGED));
    });
}
addExcludeWarningListener(excludeWarningCheckbox.choseNotToUse);
addExcludeWarningListener(excludeWarningCheckbox.violence);
addExcludeWarningListener(excludeWarningCheckbox.mcd);
addExcludeWarningListener(excludeWarningCheckbox.nonCon);
addExcludeWarningListener(excludeWarningCheckbox.underage);
addExcludeWarningListener(excludeWarningCheckbox.noWarnings);
// * Functions
/**
 * Changes current settings according to passed object
 * @param {string[]} obj Object to get settings from
 */
function syncSettings(obj) {
    // Kudos to hit ratio
    kudosHitRatioBtn.checked = obj.kudosHitRatio;
    // Enable filtering
    filterBtn.checked = obj.filtering;
    checkFilteringElements(filterBtn.checked);
    // Language
    languageBtn.checked = obj.language[0];
    languageSelect.value = obj.language[1];
    // Query
    queryBtn.checked = obj.query[0];
    queryInput.value = obj.query[1];
    // Tags/fandoms
    obj.tags.forEach((tag) => {
        tagList.push(tag);
        var tagElement = document.createElement('option');
        tagElement.value = tag;
        tagElement.innerHTML = tag;
        removeTagSelect.appendChild(tagElement);
    });
    // Warnings
    warningList = obj.warnings;
    excludeWarningCheckbox.choseNotToUse.checked = obj.warnings.indexOf(parseInt(excludeWarningCheckbox.choseNotToUse.getAttribute("value"))) != -1;
    excludeWarningCheckbox.violence.checked = obj.warnings.indexOf(parseInt(excludeWarningCheckbox.violence.getAttribute("value"))) != -1;
    excludeWarningCheckbox.mcd.checked = obj.warnings.indexOf(parseInt(excludeWarningCheckbox.mcd.getAttribute("value"))) != -1;
    excludeWarningCheckbox.nonCon.checked = obj.warnings.indexOf(parseInt(excludeWarningCheckbox.nonCon.getAttribute("value"))) != -1;
    excludeWarningCheckbox.underage.checked = obj.warnings.indexOf(parseInt(excludeWarningCheckbox.underage.getAttribute("value"))) != -1;
    excludeWarningCheckbox.noWarnings.checked = obj.warnings.indexOf(parseInt(excludeWarningCheckbox.noWarnings.getAttribute("value"))) != -1;
}
/**
 * Hide/show all filtering elements
 * @param filtering If filtering is enabled
 */
function checkFilteringElements(filtering) {
    var _a, _b;
    if (filtering)
        for (var i = 0; i < FILTERING_ELEMENTS.length; i++)
            (_a = FILTERING_ELEMENTS.item(i)) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    else
        for (var i = 0; i < FILTERING_ELEMENTS.length; i++)
            (_b = FILTERING_ELEMENTS.item(i)) === null || _b === void 0 ? void 0 : _b.classList.add("hidden");
}
/**
 * Adds tag to the excluded tags list in storage and to the tag select
 * @param {string} tag Tag value to add
 */
function addTagElement(tag) {
    // Disable all related buttons
    excludeTagBtn.classList.add("disabled");
    removeTagBtn.classList.add("disabled");
    if (tagList.indexOf(tag) == -1) {
        var tagElement = document.createElement('option');
        tagElement.value = tag;
        tagElement.innerHTML = tag;
        removeTagSelect.insertBefore(tagElement, removeTagSelect.children[0]);
        removeTagSelect.value = tag;
        tagList.splice(0, 0, tag);
        browser.storage.local.set({ tags: tagList }).then(() => {
            // Enable all related buttons
            excludeTagBtn.classList.remove("disabled");
            removeTagBtn.classList.remove("disabled");
            browser.runtime.sendMessage(constants_1.SETTINGS_CHANGED);
        });
    }
}
/**
 * Removes tag from the excluded tags list in storage and from the tag select
 * @param {string} tag Tag value to remove
 */
function removeTagElement(tag) {
    // Disable all related buttons
    excludeTagBtn.classList.add("disabled");
    removeTagBtn.classList.add("disabled");
    removeTagSelect.removeChild(document.querySelector(`option[value='${tag}']`));
    tagList.splice(tagList.indexOf(tag), 1);
    browser.storage.local.set({ tags: tagList }).then(() => {
        // Enable all related buttons
        excludeTagBtn.classList.remove("disabled");
        removeTagBtn.classList.remove("disabled");
        browser.runtime.sendMessage(constants_1.SETTINGS_CHANGED);
    });
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZXhwb3J0L2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wdGlvbnMvb3B0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLk9SSUdJTiA9IGV4cG9ydHMuSElERV9VUkxTID0gZXhwb3J0cy5SRURJUkVDVF9VUkxTID0gZXhwb3J0cy5TRVRUSU5HU19DSEFOR0VEID0gZXhwb3J0cy5ERUZBVUxUX1ZBTFVFUyA9IGV4cG9ydHMuU1RPUkFHRV9LRVlTID0gdm9pZCAwO1xyXG4vLyBTdG9yYWdlIGtleXNcclxuZXhwb3J0cy5TVE9SQUdFX0tFWVMgPSBbXHJcbiAgICBcImt1ZG9zSGl0UmF0aW9cIiwgXCJmaWx0ZXJpbmdcIiwgXCJsYW5ndWFnZVwiLCBcInF1ZXJ5XCIsIFwidGFnc1wiLCBcIndhcm5pbmdzXCJcclxuXTtcclxuLy8gRGVmYXVsdCB2YWx1ZXNcclxuZXhwb3J0cy5ERUZBVUxUX1ZBTFVFUyA9IHtcclxuICAgIGt1ZG9zSGl0UmF0aW86IHRydWUsXHJcbiAgICBmaWx0ZXJpbmc6IGZhbHNlLFxyXG4gICAgbGFuZ3VhZ2U6IFtmYWxzZSwgXCJcIl0sXHJcbiAgICBxdWVyeTogW2ZhbHNlLCBcIlwiXSxcclxuICAgIHRhZ3M6IFtdLFxyXG4gICAgd2FybmluZ3M6IFtdXHJcbn07XHJcbi8vIFNldHRpbmdzIGNoYW5nZWQgbWVzc2FnZVxyXG5leHBvcnRzLlNFVFRJTkdTX0NIQU5HRUQgPSBcInNldHRpbmdzX2NoYW5nZWRcIjtcclxuLyoqIFJlZGlyZWN0IHRoZXNlIFVSTHMgdG8gZmlsdGVyIHdvcmtzIHdpdGggZXhjbHVkZWQgc3R1ZmYgKi9cclxuZXhwb3J0cy5SRURJUkVDVF9VUkxTID0gW1xyXG4gICAgYGh0dHBzOi8vYXJjaGl2ZW9mb3Vyb3duLm9yZy90YWdzLyovd29ya3NgLFxyXG4gICAgYGh0dHBzOi8vYXJjaGl2ZW9mb3Vyb3duLm9yZy90YWdzLyovYm9va21hcmtzYCxcclxuICAgIGBodHRwczovL2FyY2hpdmVvZm91cm93bi5vcmcvdXNlcnMvKi93b3JrcypgLFxyXG4gICAgYGh0dHBzOi8vYXJjaGl2ZW9mb3Vyb3duLm9yZy91c2Vycy8qL2Jvb2ttYXJrcypgLFxyXG4gICAgYGh0dHBzOi8vYXJjaGl2ZW9mb3Vyb3duLm9yZy9jb2xsZWN0aW9ucy8qL3dvcmtzYCxcclxuICAgIGBodHRwczovL2FyY2hpdmVvZm91cm93bi5vcmcvY29sbGVjdGlvbnMvKi9ib29rbWFya3NgIC8vIENvbGxlY3Rpb24ncyBib29rbWFya3NcclxuXTtcclxuLyoqIENhbm5vdCByZWRpcmVjdCB0aGVzZSBVUkxzLCBuZWVkIHRvIGhpZGUgd29ya3Mgd2l0aCBleGNsdWRlZCBzdHVmZiAqL1xyXG5leHBvcnRzLkhJREVfVVJMUyA9IFtcclxuICAgIGBodHRwczpcXC9cXC9hcmNoaXZlb2ZvdXJvd25cXC5vcmdcXC91c2Vyc1xcL2AsXHJcbiAgICBgaHR0cHM6XFwvXFwvYXJjaGl2ZW9mb3Vyb3duXFwub3JnXFwvdXNlcnNcXC8uKlxcL3Nlcmllc2AsXHJcbiAgICBgaHR0cHM6XFwvXFwvYXJjaGl2ZW9mb3Vyb3duXFwub3JnXFwvdXNlcnNcXC8uKlxcL2dpZnRzYCxcclxuICAgIGBodHRwczpcXC9cXC9hcmNoaXZlb2ZvdXJvd25cXC5vcmdcXC9jb2xsZWN0aW9uc1xcLy4qXFwvc2VyaWVzYCwgLy8gQ29sbGVjdGlvbidzIHNlcmllc1xyXG5dO1xyXG4vKiogT3JpZ2luIG9mIHBhZ2UgdG8gcmVkaXJlY3QgKi9cclxudmFyIE9SSUdJTjtcclxuKGZ1bmN0aW9uIChPUklHSU4pIHtcclxuICAgIE9SSUdJTltcIkNPTExFQ1RJT05TXCJdID0gXCJjb2xsZWN0aW9uX2lkPVwiO1xyXG4gICAgT1JJR0lOW1wiVEFHU1wiXSA9IFwidGFnX2lkPVwiO1xyXG4gICAgT1JJR0lOW1wiVVNFUlNcIl0gPSBcInVzZXJfaWQ9XCI7XHJcbn0pKE9SSUdJTiA9IGV4cG9ydHMuT1JJR0lOIHx8IChleHBvcnRzLk9SSUdJTiA9IHt9KSk7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuLi9leHBvcnQvY29uc3RhbnRzXCIpO1xyXG4vLyAqIFNlbGVjdCBpbnB1dCBmcm9tIGRvY3VtZW50XHJcbi8vIEt1ZG9zIHRvIGhpdCByYXRpb1xyXG5jb25zdCBrdWRvc0hpdFJhdGlvQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0na3Vkb3MtaGl0LXJhdGlvJ11gKTtcclxuLy8gRW5hYmxlIGZpbHRlcmluZ1xyXG5jb25zdCBmaWx0ZXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPSdlbmFibGUtZmlsdGVyaW5nJ11gKTtcclxuLy8gTGFuZ3VhZ2VcclxuY29uc3QgbGFuZ3VhZ2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPSdsYW5ndWFnZS1lbmFibGUnXWApO1xyXG5jb25zdCBsYW5ndWFnZVNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNlbGVjdFtuYW1lPSdsYW5ndWFnZSddYCk7XHJcbi8vIFF1ZXJ5XHJcbmNvbnN0IHF1ZXJ5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0ncXVlcnktZW5hYmxlJ11gKTtcclxuY29uc3QgcXVlcnlJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9J3F1ZXJ5J11gKTtcclxuLy8gVGFncy9mYW5kb21zXHJcbmNvbnN0IGV4Y2x1ZGVUYWdJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9J2V4Y2x1ZGUtdGFnJ11gKTtcclxuY29uc3QgZXhjbHVkZVRhZ0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBleGNsdWRlLXRhZy1zdWJtaXRgKTtcclxuY29uc3QgcmVtb3ZlVGFnU2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc2VsZWN0W25hbWU9J3JlbW92ZS10YWcnXWApO1xyXG5jb25zdCByZW1vdmVUYWdCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcmVtb3ZlLXRhZy1zdWJtaXRgKTtcclxuLy8gV2FybmluZ3NcclxuY29uc3QgZXhjbHVkZVdhcm5pbmdDaGVja2JveCA9IHtcclxuICAgIGNob3NlTm90VG9Vc2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9J2V4Y2x1ZGUtd2FybmluZy1jaG9zZS1ub3QtdG8tdXNlJ11gKSxcclxuICAgIHZpb2xlbmNlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPSdleGNsdWRlLXdhcm5pbmctdmlvbGVuY2UnXWApLFxyXG4gICAgbWNkOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPSdleGNsdWRlLXdhcm5pbmctbWNkJ11gKSxcclxuICAgIG5vbkNvbjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0nZXhjbHVkZS13YXJuaW5nLW5vbi1jb24nXWApLFxyXG4gICAgdW5kZXJhZ2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9J2V4Y2x1ZGUtd2FybmluZy11bmRlcmFnZSddYCksXHJcbiAgICBub1dhcm5pbmdzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPSdleGNsdWRlLXdhcm5pbmctbm8td2FybmluZ3MnXWApXHJcbn07XHJcbi8vICogQ29uc3RhbnQgZWxlbWVudHMgZGVmaW5lZCBoZXJlXHJcbi8vIE9wdGlvbnMgd2hvc2UgdmlzaWJpbGl0eSBkZXBlbmRzIG9uIGlmIGZpbHRlcmluZyBpcyBlbmFibGVkXHJcbmNvbnN0IEZJTFRFUklOR19FTEVNRU5UUyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJmaWx0ZXJpbmdcIik7XHJcbi8vICogR2xvYmFsIHZhcnNcclxubGV0IHRhZ0xpc3QgPSBbXTtcclxubGV0IHdhcm5pbmdMaXN0ID0gW107XHJcbi8vICogU3luYyBpbnB1dHMgdG8gdmFsdWVzIHNhdmVkIGluIHN0b3JhZ2VcclxuYnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldChjb25zdGFudHNfMS5TVE9SQUdFX0tFWVMpLnRoZW4oKHN0b3JlKSA9PiB7XHJcbiAgICAvL0lmIG5vIHNldHRpbmdzIHZhbHVlcyBhcmUgaW4gc3RvcmFnZSwgc2V0IGRlZmF1bHQgc2V0dGluZyB2YWx1ZXMgaW4gc3RvcmFnZVxyXG4gICAgaWYgKE9iamVjdC5rZXlzKHN0b3JlKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgIGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5zZXQoY29uc3RhbnRzXzEuREVGQVVMVF9WQUxVRVMpO1xyXG4gICAgICAgIHN5bmNTZXR0aW5ncyhjb25zdGFudHNfMS5ERUZBVUxUX1ZBTFVFUyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBzeW5jU2V0dGluZ3Moc3RvcmUpO1xyXG4gICAgfVxyXG59KTtcclxuLy8gKiBTYXZlIHNldHRpbmdzIHRvIGxvY2FsIHN0b3JhZ2Ugd2hlbiB2YWx1ZXMgYXJlIGNoYW5nZWRcclxuLy8gS3Vkb3MgdG8gaGl0IHJhdGlvXHJcbmt1ZG9zSGl0UmF0aW9CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XHJcbiAgICBicm93c2VyLnN0b3JhZ2UubG9jYWwuc2V0KHsga3Vkb3NIaXRSYXRpbzoga3Vkb3NIaXRSYXRpb0J0bi5jaGVja2VkIH0pLnRoZW4oKCkgPT4gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKGNvbnN0YW50c18xLlNFVFRJTkdTX0NIQU5HRUQpKTtcclxufSk7XHJcbi8vIEVuYWJsZSBmaWx0ZXJpbmdcclxuZmlsdGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xyXG4gICAgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLnNldCh7IGZpbHRlcmluZzogZmlsdGVyQnRuLmNoZWNrZWQgfSkudGhlbigoKSA9PiBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoY29uc3RhbnRzXzEuU0VUVElOR1NfQ0hBTkdFRCkpO1xyXG4gICAgY2hlY2tGaWx0ZXJpbmdFbGVtZW50cyhmaWx0ZXJCdG4uY2hlY2tlZCk7XHJcbn0pO1xyXG4vLyBMYW5ndWFnZVxyXG5mdW5jdGlvbiBzZXRMYW5ndWFnZVN0b3JhZ2UoKSB7XHJcbiAgICAvLyBEaXNhYmxlIGFsbCByZWxhdGVkIGlucHV0c1xyXG4gICAgbGFuZ3VhZ2VCdG4uY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xyXG4gICAgbGFuZ3VhZ2VTZWxlY3QuY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xyXG4gICAgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLnNldCh7XHJcbiAgICAgICAgbGFuZ3VhZ2U6IFtcclxuICAgICAgICAgICAgbGFuZ3VhZ2VCdG4uY2hlY2tlZCxcclxuICAgICAgICAgICAgbGFuZ3VhZ2VTZWxlY3QudmFsdWVcclxuICAgICAgICBdXHJcbiAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAvLyBFbmFibGUgYWxsIHJlbGF0ZWQgaW5wdXRzXHJcbiAgICAgICAgbGFuZ3VhZ2VCdG4uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIGxhbmd1YWdlU2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoY29uc3RhbnRzXzEuU0VUVElOR1NfQ0hBTkdFRCk7XHJcbiAgICB9KTtcclxufVxyXG5sYW5ndWFnZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHNldExhbmd1YWdlU3RvcmFnZSk7XHJcbmxhbmd1YWdlU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgc2V0TGFuZ3VhZ2VTdG9yYWdlKTtcclxuLy8gUXVlcnlcclxuZnVuY3Rpb24gc2V0UXVlcnlTdG9yYWdlKCkge1xyXG4gICAgLy8gRGlzYWJsZSBhbGwgcmVsYXRlZCBpbnB1dHNcclxuICAgIHF1ZXJ5QnRuLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcclxuICAgIHF1ZXJ5SW5wdXQuY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xyXG4gICAgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLnNldCh7XHJcbiAgICAgICAgcXVlcnk6IFtcclxuICAgICAgICAgICAgcXVlcnlCdG4uY2hlY2tlZCxcclxuICAgICAgICAgICAgcXVlcnlJbnB1dC52YWx1ZVxyXG4gICAgICAgIF1cclxuICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIC8vIEVuYWJsZSBhbGwgcmVsYXRlZCBpbnB1dHNcclxuICAgICAgICBxdWVyeUJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgcXVlcnlJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKGNvbnN0YW50c18xLlNFVFRJTkdTX0NIQU5HRUQpO1xyXG4gICAgfSk7XHJcbn1cclxucXVlcnlCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBzZXRRdWVyeVN0b3JhZ2UpO1xyXG5xdWVyeUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBzZXRRdWVyeVN0b3JhZ2UpO1xyXG4vLyBUYWdzL2ZhbmRvbXNcclxuZXhjbHVkZVRhZ0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgaWYgKGV4Y2x1ZGVUYWdJbnB1dC52YWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgYWRkVGFnRWxlbWVudChleGNsdWRlVGFnSW5wdXQudmFsdWUpO1xyXG4gICAgICAgIGV4Y2x1ZGVUYWdJbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgICB9XHJcbn0pO1xyXG5yZW1vdmVUYWdCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHJlbW92ZVRhZ0VsZW1lbnQocmVtb3ZlVGFnU2VsZWN0LnZhbHVlKSk7XHJcbi8vIFdhcm5pbmdzXHJcbmZ1bmN0aW9uIGFkZEV4Y2x1ZGVXYXJuaW5nTGlzdGVuZXIoY2hlY2tib3gpIHtcclxuICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xyXG4gICAgICAgIHZhciBjaGVja2VkID0gY2hlY2tib3guY2hlY2tlZDtcclxuICAgICAgICB2YXIgdmFsID0gcGFyc2VJbnQoY2hlY2tib3guZ2V0QXR0cmlidXRlKFwidmFsdWVcIikpO1xyXG4gICAgICAgIHZhciBpbmRleCA9IHdhcm5pbmdMaXN0LmluZGV4T2YodmFsKTtcclxuICAgICAgICBpZiAoY2hlY2tlZCAmJiBpbmRleCA9PSAtMSlcclxuICAgICAgICAgICAgd2FybmluZ0xpc3QucHVzaCh2YWwpO1xyXG4gICAgICAgIGVsc2UgaWYgKCFjaGVja2VkKVxyXG4gICAgICAgICAgICB3YXJuaW5nTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5zZXQoeyB3YXJuaW5nczogd2FybmluZ0xpc3QgfSkudGhlbigoKSA9PiBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoY29uc3RhbnRzXzEuU0VUVElOR1NfQ0hBTkdFRCkpO1xyXG4gICAgfSk7XHJcbn1cclxuYWRkRXhjbHVkZVdhcm5pbmdMaXN0ZW5lcihleGNsdWRlV2FybmluZ0NoZWNrYm94LmNob3NlTm90VG9Vc2UpO1xyXG5hZGRFeGNsdWRlV2FybmluZ0xpc3RlbmVyKGV4Y2x1ZGVXYXJuaW5nQ2hlY2tib3gudmlvbGVuY2UpO1xyXG5hZGRFeGNsdWRlV2FybmluZ0xpc3RlbmVyKGV4Y2x1ZGVXYXJuaW5nQ2hlY2tib3gubWNkKTtcclxuYWRkRXhjbHVkZVdhcm5pbmdMaXN0ZW5lcihleGNsdWRlV2FybmluZ0NoZWNrYm94Lm5vbkNvbik7XHJcbmFkZEV4Y2x1ZGVXYXJuaW5nTGlzdGVuZXIoZXhjbHVkZVdhcm5pbmdDaGVja2JveC51bmRlcmFnZSk7XHJcbmFkZEV4Y2x1ZGVXYXJuaW5nTGlzdGVuZXIoZXhjbHVkZVdhcm5pbmdDaGVja2JveC5ub1dhcm5pbmdzKTtcclxuLy8gKiBGdW5jdGlvbnNcclxuLyoqXHJcbiAqIENoYW5nZXMgY3VycmVudCBzZXR0aW5ncyBhY2NvcmRpbmcgdG8gcGFzc2VkIG9iamVjdFxyXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBvYmogT2JqZWN0IHRvIGdldCBzZXR0aW5ncyBmcm9tXHJcbiAqL1xyXG5mdW5jdGlvbiBzeW5jU2V0dGluZ3Mob2JqKSB7XHJcbiAgICAvLyBLdWRvcyB0byBoaXQgcmF0aW9cclxuICAgIGt1ZG9zSGl0UmF0aW9CdG4uY2hlY2tlZCA9IG9iai5rdWRvc0hpdFJhdGlvO1xyXG4gICAgLy8gRW5hYmxlIGZpbHRlcmluZ1xyXG4gICAgZmlsdGVyQnRuLmNoZWNrZWQgPSBvYmouZmlsdGVyaW5nO1xyXG4gICAgY2hlY2tGaWx0ZXJpbmdFbGVtZW50cyhmaWx0ZXJCdG4uY2hlY2tlZCk7XHJcbiAgICAvLyBMYW5ndWFnZVxyXG4gICAgbGFuZ3VhZ2VCdG4uY2hlY2tlZCA9IG9iai5sYW5ndWFnZVswXTtcclxuICAgIGxhbmd1YWdlU2VsZWN0LnZhbHVlID0gb2JqLmxhbmd1YWdlWzFdO1xyXG4gICAgLy8gUXVlcnlcclxuICAgIHF1ZXJ5QnRuLmNoZWNrZWQgPSBvYmoucXVlcnlbMF07XHJcbiAgICBxdWVyeUlucHV0LnZhbHVlID0gb2JqLnF1ZXJ5WzFdO1xyXG4gICAgLy8gVGFncy9mYW5kb21zXHJcbiAgICBvYmoudGFncy5mb3JFYWNoKCh0YWcpID0+IHtcclxuICAgICAgICB0YWdMaXN0LnB1c2godGFnKTtcclxuICAgICAgICB2YXIgdGFnRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgICAgIHRhZ0VsZW1lbnQudmFsdWUgPSB0YWc7XHJcbiAgICAgICAgdGFnRWxlbWVudC5pbm5lckhUTUwgPSB0YWc7XHJcbiAgICAgICAgcmVtb3ZlVGFnU2VsZWN0LmFwcGVuZENoaWxkKHRhZ0VsZW1lbnQpO1xyXG4gICAgfSk7XHJcbiAgICAvLyBXYXJuaW5nc1xyXG4gICAgd2FybmluZ0xpc3QgPSBvYmoud2FybmluZ3M7XHJcbiAgICBleGNsdWRlV2FybmluZ0NoZWNrYm94LmNob3NlTm90VG9Vc2UuY2hlY2tlZCA9IG9iai53YXJuaW5ncy5pbmRleE9mKHBhcnNlSW50KGV4Y2x1ZGVXYXJuaW5nQ2hlY2tib3guY2hvc2VOb3RUb1VzZS5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSkpICE9IC0xO1xyXG4gICAgZXhjbHVkZVdhcm5pbmdDaGVja2JveC52aW9sZW5jZS5jaGVja2VkID0gb2JqLndhcm5pbmdzLmluZGV4T2YocGFyc2VJbnQoZXhjbHVkZVdhcm5pbmdDaGVja2JveC52aW9sZW5jZS5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSkpICE9IC0xO1xyXG4gICAgZXhjbHVkZVdhcm5pbmdDaGVja2JveC5tY2QuY2hlY2tlZCA9IG9iai53YXJuaW5ncy5pbmRleE9mKHBhcnNlSW50KGV4Y2x1ZGVXYXJuaW5nQ2hlY2tib3gubWNkLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpKSkgIT0gLTE7XHJcbiAgICBleGNsdWRlV2FybmluZ0NoZWNrYm94Lm5vbkNvbi5jaGVja2VkID0gb2JqLndhcm5pbmdzLmluZGV4T2YocGFyc2VJbnQoZXhjbHVkZVdhcm5pbmdDaGVja2JveC5ub25Db24uZ2V0QXR0cmlidXRlKFwidmFsdWVcIikpKSAhPSAtMTtcclxuICAgIGV4Y2x1ZGVXYXJuaW5nQ2hlY2tib3gudW5kZXJhZ2UuY2hlY2tlZCA9IG9iai53YXJuaW5ncy5pbmRleE9mKHBhcnNlSW50KGV4Y2x1ZGVXYXJuaW5nQ2hlY2tib3gudW5kZXJhZ2UuZ2V0QXR0cmlidXRlKFwidmFsdWVcIikpKSAhPSAtMTtcclxuICAgIGV4Y2x1ZGVXYXJuaW5nQ2hlY2tib3gubm9XYXJuaW5ncy5jaGVja2VkID0gb2JqLndhcm5pbmdzLmluZGV4T2YocGFyc2VJbnQoZXhjbHVkZVdhcm5pbmdDaGVja2JveC5ub1dhcm5pbmdzLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpKSkgIT0gLTE7XHJcbn1cclxuLyoqXHJcbiAqIEhpZGUvc2hvdyBhbGwgZmlsdGVyaW5nIGVsZW1lbnRzXHJcbiAqIEBwYXJhbSBmaWx0ZXJpbmcgSWYgZmlsdGVyaW5nIGlzIGVuYWJsZWRcclxuICovXHJcbmZ1bmN0aW9uIGNoZWNrRmlsdGVyaW5nRWxlbWVudHMoZmlsdGVyaW5nKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgaWYgKGZpbHRlcmluZylcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEZJTFRFUklOR19FTEVNRU5UUy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgKF9hID0gRklMVEVSSU5HX0VMRU1FTlRTLml0ZW0oaSkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgRklMVEVSSU5HX0VMRU1FTlRTLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAoX2IgPSBGSUxURVJJTkdfRUxFTUVOVFMuaXRlbShpKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbn1cclxuLyoqXHJcbiAqIEFkZHMgdGFnIHRvIHRoZSBleGNsdWRlZCB0YWdzIGxpc3QgaW4gc3RvcmFnZSBhbmQgdG8gdGhlIHRhZyBzZWxlY3RcclxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUYWcgdmFsdWUgdG8gYWRkXHJcbiAqL1xyXG5mdW5jdGlvbiBhZGRUYWdFbGVtZW50KHRhZykge1xyXG4gICAgLy8gRGlzYWJsZSBhbGwgcmVsYXRlZCBidXR0b25zXHJcbiAgICBleGNsdWRlVGFnQnRuLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcclxuICAgIHJlbW92ZVRhZ0J0bi5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XHJcbiAgICBpZiAodGFnTGlzdC5pbmRleE9mKHRhZykgPT0gLTEpIHtcclxuICAgICAgICB2YXIgdGFnRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgICAgIHRhZ0VsZW1lbnQudmFsdWUgPSB0YWc7XHJcbiAgICAgICAgdGFnRWxlbWVudC5pbm5lckhUTUwgPSB0YWc7XHJcbiAgICAgICAgcmVtb3ZlVGFnU2VsZWN0Lmluc2VydEJlZm9yZSh0YWdFbGVtZW50LCByZW1vdmVUYWdTZWxlY3QuY2hpbGRyZW5bMF0pO1xyXG4gICAgICAgIHJlbW92ZVRhZ1NlbGVjdC52YWx1ZSA9IHRhZztcclxuICAgICAgICB0YWdMaXN0LnNwbGljZSgwLCAwLCB0YWcpO1xyXG4gICAgICAgIGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5zZXQoeyB0YWdzOiB0YWdMaXN0IH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBFbmFibGUgYWxsIHJlbGF0ZWQgYnV0dG9uc1xyXG4gICAgICAgICAgICBleGNsdWRlVGFnQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgcmVtb3ZlVGFnQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKGNvbnN0YW50c18xLlNFVFRJTkdTX0NIQU5HRUQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBSZW1vdmVzIHRhZyBmcm9tIHRoZSBleGNsdWRlZCB0YWdzIGxpc3QgaW4gc3RvcmFnZSBhbmQgZnJvbSB0aGUgdGFnIHNlbGVjdFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRhZyB2YWx1ZSB0byByZW1vdmVcclxuICovXHJcbmZ1bmN0aW9uIHJlbW92ZVRhZ0VsZW1lbnQodGFnKSB7XHJcbiAgICAvLyBEaXNhYmxlIGFsbCByZWxhdGVkIGJ1dHRvbnNcclxuICAgIGV4Y2x1ZGVUYWdCdG4uY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xyXG4gICAgcmVtb3ZlVGFnQnRuLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcclxuICAgIHJlbW92ZVRhZ1NlbGVjdC5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bdmFsdWU9JyR7dGFnfSddYCkpO1xyXG4gICAgdGFnTGlzdC5zcGxpY2UodGFnTGlzdC5pbmRleE9mKHRhZyksIDEpO1xyXG4gICAgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLnNldCh7IHRhZ3M6IHRhZ0xpc3QgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgLy8gRW5hYmxlIGFsbCByZWxhdGVkIGJ1dHRvbnNcclxuICAgICAgICBleGNsdWRlVGFnQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICByZW1vdmVUYWdCdG4uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZShjb25zdGFudHNfMS5TRVRUSU5HU19DSEFOR0VEKTtcclxuICAgIH0pO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==