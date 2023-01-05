/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
        var index = warningList.indexOf((0, constants_1.idToWarningEnum)(val));
        if (checked && index == -1)
            warningList.push((0, constants_1.idToWarningEnum)(val));
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
    obj.warnings.forEach((e) => {
        warningList.push((0, constants_1.idToWarningEnum)(e));
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsK0JBQStCO0FBQ3ZEO0FBQ0E7QUFDQSx3QkFBd0IsK0JBQStCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxlQUFlO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0UsSUFBSTtBQUM1RTtBQUNBLGdDQUFnQyxlQUFlO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2V4cG9ydC9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9vcHRpb25zL29wdGlvbnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5pZFRvV2FybmluZ0VudW0gPSBleHBvcnRzLldBUk5JTkcgPSBleHBvcnRzLmlkVG9DYXRldG9yeUVudW0gPSBleHBvcnRzLkNBVEVHT1JZID0gZXhwb3J0cy5pZFRvUmF0aW5nRW51bSA9IGV4cG9ydHMuUkFUSU5HID0gZXhwb3J0cy5ISURFX1VSTFMgPSBleHBvcnRzLlJFRElSRUNUX1VSTFMgPSBleHBvcnRzLlNFVFRJTkdTX0NIQU5HRUQgPSBleHBvcnRzLkRFRkFVTFRfVkFMVUVTID0gZXhwb3J0cy5TVE9SQUdFX0tFWVMgPSB2b2lkIDA7XHJcbi8vIFN0b3JhZ2Uga2V5c1xyXG5leHBvcnRzLlNUT1JBR0VfS0VZUyA9IFtcclxuICAgIFwia3Vkb3NIaXRSYXRpb1wiLCBcImZpbHRlcmluZ1wiLCBcImxhbmd1YWdlXCIsIFwicXVlcnlcIiwgXCJ0YWdzXCIsIFwid2FybmluZ3NcIlxyXG5dO1xyXG4vLyBEZWZhdWx0IHZhbHVlc1xyXG5leHBvcnRzLkRFRkFVTFRfVkFMVUVTID0ge1xyXG4gICAga3Vkb3NIaXRSYXRpbzogdHJ1ZSxcclxuICAgIGZpbHRlcmluZzogZmFsc2UsXHJcbiAgICBsYW5ndWFnZTogW2ZhbHNlLCBcIlwiXSxcclxuICAgIHF1ZXJ5OiBbZmFsc2UsIFwiXCJdLFxyXG4gICAgdGFnczogW10sXHJcbiAgICB3YXJuaW5nczogW11cclxufTtcclxuLy8gU2V0dGluZ3MgY2hhbmdlZCBtZXNzYWdlXHJcbmV4cG9ydHMuU0VUVElOR1NfQ0hBTkdFRCA9IFwic2V0dGluZ3NfY2hhbmdlZFwiO1xyXG4vKiogUmVkaXJlY3QgdGhlc2UgVVJMcyB0byBmaWx0ZXIgd29ya3Mgd2l0aCBleGNsdWRlZCBzdHVmZiAqL1xyXG5leHBvcnRzLlJFRElSRUNUX1VSTFMgPSBbXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL3RhZ3MvKi93b3Jrc2AsXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL3RhZ3MvKi9ib29rbWFya3NgLFxyXG4gICAgYGh0dHBzOi8vYXJjaGl2ZW9mb3Vyb3duLm9yZy91c2Vycy8qL3dvcmtzKmAsXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL3VzZXJzLyovYm9va21hcmtzKmAsXHJcbiAgICBgaHR0cHM6Ly9hcmNoaXZlb2ZvdXJvd24ub3JnL2NvbGxlY3Rpb25zLyovd29ya3NgLFxyXG4gICAgYGh0dHBzOi8vYXJjaGl2ZW9mb3Vyb3duLm9yZy9jb2xsZWN0aW9ucy8qL2Jvb2ttYXJrc2AgLy8gQ29sbGVjdGlvbidzIGJvb2ttYXJrc1xyXG5dO1xyXG4vKiogQ2Fubm90IHJlZGlyZWN0IHRoZXNlIFVSTHMsIG5lZWQgdG8gaGlkZSB3b3JrcyB3aXRoIGV4Y2x1ZGVkIHN0dWZmICovXHJcbmV4cG9ydHMuSElERV9VUkxTID0gW1xyXG4gICAgYGh0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL3VzZXJzXFwvYCxcclxuICAgIGBodHRwczpcXC9cXC9hcmNoaXZlb2ZvdXJvd25cXC5vcmdcXC91c2Vyc1xcLy4qXFwvc2VyaWVzYCxcclxuICAgIGBodHRwczpcXC9cXC9hcmNoaXZlb2ZvdXJvd25cXC5vcmdcXC91c2Vyc1xcLy4qXFwvZ2lmdHNgLFxyXG4gICAgYGh0dHBzOlxcL1xcL2FyY2hpdmVvZm91cm93blxcLm9yZ1xcL2NvbGxlY3Rpb25zXFwvLipcXC9zZXJpZXNgLCAvLyBDb2xsZWN0aW9uJ3Mgc2VyaWVzXHJcbl07XHJcbjtcclxuLyoqIFJhdGluZyBvZiB3b3JrcyB0byBpZCAqL1xyXG52YXIgUkFUSU5HO1xyXG4oZnVuY3Rpb24gKFJBVElORykge1xyXG4gICAgUkFUSU5HW1JBVElOR1tcIm5vdFJhdGVkXCJdID0gOV0gPSBcIm5vdFJhdGVkXCI7XHJcbiAgICBSQVRJTkdbUkFUSU5HW1wiZ2VuXCJdID0gMTBdID0gXCJnZW5cIjtcclxuICAgIFJBVElOR1tSQVRJTkdbXCJ0ZWVuXCJdID0gMTFdID0gXCJ0ZWVuXCI7XHJcbiAgICBSQVRJTkdbUkFUSU5HW1wibWF0dXJlXCJdID0gMTJdID0gXCJtYXR1cmVcIjtcclxuICAgIFJBVElOR1tSQVRJTkdbXCJleHBsaWNpdFwiXSA9IDEzXSA9IFwiZXhwbGljaXRcIjtcclxufSkoUkFUSU5HID0gZXhwb3J0cy5SQVRJTkcgfHwgKGV4cG9ydHMuUkFUSU5HID0ge30pKTtcclxuLyoqXHJcbiAqIFRha2VzIHJhdGluZyBpZCBvZiB3b3JrIGFuZCBjb252ZXJ0cyBpdCB0byBhbiBlbnVtIHZhbHVlXHJcbiAqIEBwYXJhbSBpZCBJZCBvZiByYXRpbmdcclxuICogQHJldHVybnMgUkFUSU5HIGVudW0gY29udmVydGVkIGZyb20gaWRcclxuICovXHJcbmZ1bmN0aW9uIGlkVG9SYXRpbmdFbnVtKGlkKSB7XHJcbiAgICBpZiAoaWQgPT0gOSlcclxuICAgICAgICByZXR1cm4gUkFUSU5HLm5vdFJhdGVkO1xyXG4gICAgZWxzZSBpZiAoaWQgPT0gMTApXHJcbiAgICAgICAgcmV0dXJuIFJBVElORy5nZW47XHJcbiAgICBlbHNlIGlmIChpZCA9PSAxMSlcclxuICAgICAgICByZXR1cm4gUkFUSU5HLnRlZW47XHJcbiAgICBlbHNlIGlmIChpZCA9PSAxMilcclxuICAgICAgICByZXR1cm4gUkFUSU5HLm1hdHVyZTtcclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gUkFUSU5HLmV4cGxpY2l0O1xyXG59XHJcbmV4cG9ydHMuaWRUb1JhdGluZ0VudW0gPSBpZFRvUmF0aW5nRW51bTtcclxuLyoqIENhdGVnb3J5IG9mIHdvcmsgdG8gaWQgKi9cclxudmFyIENBVEVHT1JZO1xyXG4oZnVuY3Rpb24gKENBVEVHT1JZKSB7XHJcbiAgICBDQVRFR09SWVtDQVRFR09SWVtcImdlblwiXSA9IDIxXSA9IFwiZ2VuXCI7XHJcbiAgICBDQVRFR09SWVtDQVRFR09SWVtcImZtXCJdID0gMjJdID0gXCJmbVwiO1xyXG4gICAgQ0FURUdPUllbQ0FURUdPUllbXCJtbVwiXSA9IDIzXSA9IFwibW1cIjtcclxuICAgIENBVEVHT1JZW0NBVEVHT1JZW1wib3RoZXJcIl0gPSAyNF0gPSBcIm90aGVyXCI7XHJcbiAgICBDQVRFR09SWVtDQVRFR09SWVtcImZmXCJdID0gMTE2XSA9IFwiZmZcIjtcclxuICAgIENBVEVHT1JZW0NBVEVHT1JZW1wibXVsdGlcIl0gPSAyMjQ2XSA9IFwibXVsdGlcIjtcclxufSkoQ0FURUdPUlkgPSBleHBvcnRzLkNBVEVHT1JZIHx8IChleHBvcnRzLkNBVEVHT1JZID0ge30pKTtcclxuLyoqXHJcbiAqIFRha2VzIGNhdGVnb3J5IGlkIG9mIHdvcmsgYW5kIGNvbnZlcnRzIGl0IHRvIGFuIGVudW0gdmFsdWVcclxuICogQHBhcmFtIGlkIElkIG9mIGNhdGVnb3J5XHJcbiAqIEByZXR1cm5zIENBVEVHT1JZIGVudW0gY29udmVydGVkIGZyb20gaWRcclxuICovXHJcbmZ1bmN0aW9uIGlkVG9DYXRldG9yeUVudW0oaWQpIHtcclxuICAgIGlmIChpZCA9PSAyMSlcclxuICAgICAgICByZXR1cm4gQ0FURUdPUlkuZ2VuO1xyXG4gICAgZWxzZSBpZiAoaWQgPT0gMjIpXHJcbiAgICAgICAgcmV0dXJuIENBVEVHT1JZLmZtO1xyXG4gICAgZWxzZSBpZiAoaWQgPT0gMjMpXHJcbiAgICAgICAgcmV0dXJuIENBVEVHT1JZLm1tO1xyXG4gICAgZWxzZSBpZiAoaWQgPT0gMjQpXHJcbiAgICAgICAgcmV0dXJuIENBVEVHT1JZLm90aGVyO1xyXG4gICAgZWxzZSBpZiAoaWQgPT0gMTE2KVxyXG4gICAgICAgIHJldHVybiBDQVRFR09SWS5mZjtcclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gQ0FURUdPUlkubXVsdGk7XHJcbn1cclxuZXhwb3J0cy5pZFRvQ2F0ZXRvcnlFbnVtID0gaWRUb0NhdGV0b3J5RW51bTtcclxuLyoqIFdhcm5pbmdzIG9mIHdvcmsgdG8gaWQgKi9cclxudmFyIFdBUk5JTkc7XHJcbihmdW5jdGlvbiAoV0FSTklORykge1xyXG4gICAgV0FSTklOR1tXQVJOSU5HW1wiY2hvc2VOb3RUb1VzZVwiXSA9IDE0XSA9IFwiY2hvc2VOb3RUb1VzZVwiO1xyXG4gICAgV0FSTklOR1tXQVJOSU5HW1wibm9XYXJuaW5nc0FwcGx5XCJdID0gMTZdID0gXCJub1dhcm5pbmdzQXBwbHlcIjtcclxuICAgIFdBUk5JTkdbV0FSTklOR1tcInZpb2xlbmNlXCJdID0gMTddID0gXCJ2aW9sZW5jZVwiO1xyXG4gICAgV0FSTklOR1tXQVJOSU5HW1wibWNkXCJdID0gMThdID0gXCJtY2RcIjtcclxuICAgIFdBUk5JTkdbV0FSTklOR1tcIm5vbkNvblwiXSA9IDE5XSA9IFwibm9uQ29uXCI7XHJcbiAgICBXQVJOSU5HW1dBUk5JTkdbXCJ1bmRlcmFnZVwiXSA9IDIwXSA9IFwidW5kZXJhZ2VcIjtcclxufSkoV0FSTklORyA9IGV4cG9ydHMuV0FSTklORyB8fCAoZXhwb3J0cy5XQVJOSU5HID0ge30pKTtcclxuLyoqXHJcbiAqIFRha2VzIHdhcm5pbmcgaWQgb2Ygd29yayBhbmQgY29udmVydHMgaXQgdG8gYW4gZW51bSB2YWx1ZVxyXG4gKiBAcGFyYW0gaWQgSWQgb2Ygd2FybmluZ1xyXG4gKiBAcmV0dXJucyBXQVJOSU5HIGVudW0gY29udmVydGVkIGZyb20gaWRcclxuICovXHJcbmZ1bmN0aW9uIGlkVG9XYXJuaW5nRW51bShpZCkge1xyXG4gICAgaWYgKGlkID09IDE0KVxyXG4gICAgICAgIHJldHVybiBXQVJOSU5HLmNob3NlTm90VG9Vc2U7XHJcbiAgICBlbHNlIGlmIChpZCA9PSAxNilcclxuICAgICAgICByZXR1cm4gV0FSTklORy5ub1dhcm5pbmdzQXBwbHk7XHJcbiAgICBlbHNlIGlmIChpZCA9PSAxNylcclxuICAgICAgICByZXR1cm4gV0FSTklORy52aW9sZW5jZTtcclxuICAgIGVsc2UgaWYgKGlkID09IDE4KVxyXG4gICAgICAgIHJldHVybiBXQVJOSU5HLm1jZDtcclxuICAgIGVsc2UgaWYgKGlkID09IDE5KVxyXG4gICAgICAgIHJldHVybiBXQVJOSU5HLm5vbkNvbjtcclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gV0FSTklORy51bmRlcmFnZTtcclxufVxyXG5leHBvcnRzLmlkVG9XYXJuaW5nRW51bSA9IGlkVG9XYXJuaW5nRW51bTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uL2V4cG9ydC9jb25zdGFudHNcIik7XHJcbi8vICogU2VsZWN0IGlucHV0IGZyb20gZG9jdW1lbnRcclxuLy8gS3Vkb3MgdG8gaGl0IHJhdGlvXHJcbmNvbnN0IGt1ZG9zSGl0UmF0aW9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPSdrdWRvcy1oaXQtcmF0aW8nXWApO1xyXG4vLyBFbmFibGUgZmlsdGVyaW5nXHJcbmNvbnN0IGZpbHRlckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9J2VuYWJsZS1maWx0ZXJpbmcnXWApO1xyXG4vLyBMYW5ndWFnZVxyXG5jb25zdCBsYW5ndWFnZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9J2xhbmd1YWdlLWVuYWJsZSddYCk7XHJcbmNvbnN0IGxhbmd1YWdlU2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc2VsZWN0W25hbWU9J2xhbmd1YWdlJ11gKTtcclxuLy8gUXVlcnlcclxuY29uc3QgcXVlcnlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPSdxdWVyeS1lbmFibGUnXWApO1xyXG5jb25zdCBxdWVyeUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0ncXVlcnknXWApO1xyXG4vLyBUYWdzL2ZhbmRvbXNcclxuY29uc3QgZXhjbHVkZVRhZ0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0nZXhjbHVkZS10YWcnXWApO1xyXG5jb25zdCBleGNsdWRlVGFnQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGV4Y2x1ZGUtdGFnLXN1Ym1pdGApO1xyXG5jb25zdCByZW1vdmVUYWdTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzZWxlY3RbbmFtZT0ncmVtb3ZlLXRhZyddYCk7XHJcbmNvbnN0IHJlbW92ZVRhZ0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByZW1vdmUtdGFnLXN1Ym1pdGApO1xyXG4vLyBXYXJuaW5nc1xyXG5jb25zdCBleGNsdWRlV2FybmluZ0NoZWNrYm94ID0ge1xyXG4gICAgY2hvc2VOb3RUb1VzZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0nZXhjbHVkZS13YXJuaW5nLWNob3NlLW5vdC10by11c2UnXWApLFxyXG4gICAgdmlvbGVuY2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9J2V4Y2x1ZGUtd2FybmluZy12aW9sZW5jZSddYCksXHJcbiAgICBtY2Q6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9J2V4Y2x1ZGUtd2FybmluZy1tY2QnXWApLFxyXG4gICAgbm9uQ29uOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPSdleGNsdWRlLXdhcm5pbmctbm9uLWNvbiddYCksXHJcbiAgICB1bmRlcmFnZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0nZXhjbHVkZS13YXJuaW5nLXVuZGVyYWdlJ11gKSxcclxuICAgIG5vV2FybmluZ3M6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9J2V4Y2x1ZGUtd2FybmluZy1uby13YXJuaW5ncyddYClcclxufTtcclxuLy8gKiBDb25zdGFudCBlbGVtZW50cyBkZWZpbmVkIGhlcmVcclxuLy8gT3B0aW9ucyB3aG9zZSB2aXNpYmlsaXR5IGRlcGVuZHMgb24gaWYgZmlsdGVyaW5nIGlzIGVuYWJsZWRcclxuY29uc3QgRklMVEVSSU5HX0VMRU1FTlRTID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImZpbHRlcmluZ1wiKTtcclxuLy8gKiBHbG9iYWwgdmFyc1xyXG5sZXQgdGFnTGlzdCA9IFtdO1xyXG5sZXQgd2FybmluZ0xpc3QgPSBbXTtcclxuLy8gKiBTeW5jIGlucHV0cyB0byB2YWx1ZXMgc2F2ZWQgaW4gc3RvcmFnZVxyXG5icm93c2VyLnN0b3JhZ2UubG9jYWwuZ2V0KGNvbnN0YW50c18xLlNUT1JBR0VfS0VZUykudGhlbigoc3RvcmUpID0+IHtcclxuICAgIC8vSWYgbm8gc2V0dGluZ3MgdmFsdWVzIGFyZSBpbiBzdG9yYWdlLCBzZXQgZGVmYXVsdCBzZXR0aW5nIHZhbHVlcyBpbiBzdG9yYWdlXHJcbiAgICBpZiAoT2JqZWN0LmtleXMoc3RvcmUpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLnNldChjb25zdGFudHNfMS5ERUZBVUxUX1ZBTFVFUyk7XHJcbiAgICAgICAgc3luY1NldHRpbmdzKGNvbnN0YW50c18xLkRFRkFVTFRfVkFMVUVTKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHN5bmNTZXR0aW5ncyhzdG9yZSk7XHJcbiAgICB9XHJcbn0pO1xyXG4vLyAqIFNhdmUgc2V0dGluZ3MgdG8gbG9jYWwgc3RvcmFnZSB3aGVuIHZhbHVlcyBhcmUgY2hhbmdlZFxyXG4vLyBLdWRvcyB0byBoaXQgcmF0aW9cclxua3Vkb3NIaXRSYXRpb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcclxuICAgIGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5zZXQoeyBrdWRvc0hpdFJhdGlvOiBrdWRvc0hpdFJhdGlvQnRuLmNoZWNrZWQgfSkudGhlbigoKSA9PiBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoY29uc3RhbnRzXzEuU0VUVElOR1NfQ0hBTkdFRCkpO1xyXG59KTtcclxuLy8gRW5hYmxlIGZpbHRlcmluZ1xyXG5maWx0ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XHJcbiAgICBicm93c2VyLnN0b3JhZ2UubG9jYWwuc2V0KHsgZmlsdGVyaW5nOiBmaWx0ZXJCdG4uY2hlY2tlZCB9KS50aGVuKCgpID0+IGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZShjb25zdGFudHNfMS5TRVRUSU5HU19DSEFOR0VEKSk7XHJcbiAgICBjaGVja0ZpbHRlcmluZ0VsZW1lbnRzKGZpbHRlckJ0bi5jaGVja2VkKTtcclxufSk7XHJcbi8vIExhbmd1YWdlXHJcbmZ1bmN0aW9uIHNldExhbmd1YWdlU3RvcmFnZSgpIHtcclxuICAgIC8vIERpc2FibGUgYWxsIHJlbGF0ZWQgaW5wdXRzXHJcbiAgICBsYW5ndWFnZUJ0bi5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XHJcbiAgICBsYW5ndWFnZVNlbGVjdC5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XHJcbiAgICBicm93c2VyLnN0b3JhZ2UubG9jYWwuc2V0KHtcclxuICAgICAgICBsYW5ndWFnZTogW1xyXG4gICAgICAgICAgICBsYW5ndWFnZUJ0bi5jaGVja2VkLFxyXG4gICAgICAgICAgICBsYW5ndWFnZVNlbGVjdC52YWx1ZVxyXG4gICAgICAgIF1cclxuICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIC8vIEVuYWJsZSBhbGwgcmVsYXRlZCBpbnB1dHNcclxuICAgICAgICBsYW5ndWFnZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgbGFuZ3VhZ2VTZWxlY3QuY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZShjb25zdGFudHNfMS5TRVRUSU5HU19DSEFOR0VEKTtcclxuICAgIH0pO1xyXG59XHJcbmxhbmd1YWdlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgc2V0TGFuZ3VhZ2VTdG9yYWdlKTtcclxubGFuZ3VhZ2VTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBzZXRMYW5ndWFnZVN0b3JhZ2UpO1xyXG4vLyBRdWVyeVxyXG5mdW5jdGlvbiBzZXRRdWVyeVN0b3JhZ2UoKSB7XHJcbiAgICAvLyBEaXNhYmxlIGFsbCByZWxhdGVkIGlucHV0c1xyXG4gICAgcXVlcnlCdG4uY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xyXG4gICAgcXVlcnlJbnB1dC5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XHJcbiAgICBicm93c2VyLnN0b3JhZ2UubG9jYWwuc2V0KHtcclxuICAgICAgICBxdWVyeTogW1xyXG4gICAgICAgICAgICBxdWVyeUJ0bi5jaGVja2VkLFxyXG4gICAgICAgICAgICBxdWVyeUlucHV0LnZhbHVlXHJcbiAgICAgICAgXVxyXG4gICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgLy8gRW5hYmxlIGFsbCByZWxhdGVkIGlucHV0c1xyXG4gICAgICAgIHF1ZXJ5QnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICBxdWVyeUlucHV0LmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoY29uc3RhbnRzXzEuU0VUVElOR1NfQ0hBTkdFRCk7XHJcbiAgICB9KTtcclxufVxyXG5xdWVyeUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHNldFF1ZXJ5U3RvcmFnZSk7XHJcbnF1ZXJ5SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHNldFF1ZXJ5U3RvcmFnZSk7XHJcbi8vIFRhZ3MvZmFuZG9tc1xyXG5leGNsdWRlVGFnQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBpZiAoZXhjbHVkZVRhZ0lucHV0LnZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBhZGRUYWdFbGVtZW50KGV4Y2x1ZGVUYWdJbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgZXhjbHVkZVRhZ0lucHV0LnZhbHVlID0gXCJcIjtcclxuICAgIH1cclxufSk7XHJcbnJlbW92ZVRhZ0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gcmVtb3ZlVGFnRWxlbWVudChyZW1vdmVUYWdTZWxlY3QudmFsdWUpKTtcclxuLy8gV2FybmluZ3NcclxuZnVuY3Rpb24gYWRkRXhjbHVkZVdhcm5pbmdMaXN0ZW5lcihjaGVja2JveCkge1xyXG4gICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgdmFyIGNoZWNrZWQgPSBjaGVja2JveC5jaGVja2VkO1xyXG4gICAgICAgIHZhciB2YWwgPSBwYXJzZUludChjaGVja2JveC5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSk7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gd2FybmluZ0xpc3QuaW5kZXhPZigoMCwgY29uc3RhbnRzXzEuaWRUb1dhcm5pbmdFbnVtKSh2YWwpKTtcclxuICAgICAgICBpZiAoY2hlY2tlZCAmJiBpbmRleCA9PSAtMSlcclxuICAgICAgICAgICAgd2FybmluZ0xpc3QucHVzaCgoMCwgY29uc3RhbnRzXzEuaWRUb1dhcm5pbmdFbnVtKSh2YWwpKTtcclxuICAgICAgICBlbHNlIGlmICghY2hlY2tlZClcclxuICAgICAgICAgICAgd2FybmluZ0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICBicm93c2VyLnN0b3JhZ2UubG9jYWwuc2V0KHsgd2FybmluZ3M6IHdhcm5pbmdMaXN0IH0pLnRoZW4oKCkgPT4gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKGNvbnN0YW50c18xLlNFVFRJTkdTX0NIQU5HRUQpKTtcclxuICAgIH0pO1xyXG59XHJcbmFkZEV4Y2x1ZGVXYXJuaW5nTGlzdGVuZXIoZXhjbHVkZVdhcm5pbmdDaGVja2JveC5jaG9zZU5vdFRvVXNlKTtcclxuYWRkRXhjbHVkZVdhcm5pbmdMaXN0ZW5lcihleGNsdWRlV2FybmluZ0NoZWNrYm94LnZpb2xlbmNlKTtcclxuYWRkRXhjbHVkZVdhcm5pbmdMaXN0ZW5lcihleGNsdWRlV2FybmluZ0NoZWNrYm94Lm1jZCk7XHJcbmFkZEV4Y2x1ZGVXYXJuaW5nTGlzdGVuZXIoZXhjbHVkZVdhcm5pbmdDaGVja2JveC5ub25Db24pO1xyXG5hZGRFeGNsdWRlV2FybmluZ0xpc3RlbmVyKGV4Y2x1ZGVXYXJuaW5nQ2hlY2tib3gudW5kZXJhZ2UpO1xyXG5hZGRFeGNsdWRlV2FybmluZ0xpc3RlbmVyKGV4Y2x1ZGVXYXJuaW5nQ2hlY2tib3gubm9XYXJuaW5ncyk7XHJcbi8vICogRnVuY3Rpb25zXHJcbi8qKlxyXG4gKiBDaGFuZ2VzIGN1cnJlbnQgc2V0dGluZ3MgYWNjb3JkaW5nIHRvIHBhc3NlZCBvYmplY3RcclxuICogQHBhcmFtIHtzdHJpbmdbXX0gb2JqIE9iamVjdCB0byBnZXQgc2V0dGluZ3MgZnJvbVxyXG4gKi9cclxuZnVuY3Rpb24gc3luY1NldHRpbmdzKG9iaikge1xyXG4gICAgLy8gS3Vkb3MgdG8gaGl0IHJhdGlvXHJcbiAgICBrdWRvc0hpdFJhdGlvQnRuLmNoZWNrZWQgPSBvYmoua3Vkb3NIaXRSYXRpbztcclxuICAgIC8vIEVuYWJsZSBmaWx0ZXJpbmdcclxuICAgIGZpbHRlckJ0bi5jaGVja2VkID0gb2JqLmZpbHRlcmluZztcclxuICAgIGNoZWNrRmlsdGVyaW5nRWxlbWVudHMoZmlsdGVyQnRuLmNoZWNrZWQpO1xyXG4gICAgLy8gTGFuZ3VhZ2VcclxuICAgIGxhbmd1YWdlQnRuLmNoZWNrZWQgPSBvYmoubGFuZ3VhZ2VbMF07XHJcbiAgICBsYW5ndWFnZVNlbGVjdC52YWx1ZSA9IG9iai5sYW5ndWFnZVsxXTtcclxuICAgIC8vIFF1ZXJ5XHJcbiAgICBxdWVyeUJ0bi5jaGVja2VkID0gb2JqLnF1ZXJ5WzBdO1xyXG4gICAgcXVlcnlJbnB1dC52YWx1ZSA9IG9iai5xdWVyeVsxXTtcclxuICAgIC8vIFRhZ3MvZmFuZG9tc1xyXG4gICAgb2JqLnRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XHJcbiAgICAgICAgdGFnTGlzdC5wdXNoKHRhZyk7XHJcbiAgICAgICAgdmFyIHRhZ0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgICAgICB0YWdFbGVtZW50LnZhbHVlID0gdGFnO1xyXG4gICAgICAgIHRhZ0VsZW1lbnQuaW5uZXJIVE1MID0gdGFnO1xyXG4gICAgICAgIHJlbW92ZVRhZ1NlbGVjdC5hcHBlbmRDaGlsZCh0YWdFbGVtZW50KTtcclxuICAgIH0pO1xyXG4gICAgLy8gV2FybmluZ3NcclxuICAgIG9iai53YXJuaW5ncy5mb3JFYWNoKChlKSA9PiB7XHJcbiAgICAgICAgd2FybmluZ0xpc3QucHVzaCgoMCwgY29uc3RhbnRzXzEuaWRUb1dhcm5pbmdFbnVtKShlKSk7XHJcbiAgICB9KTtcclxuICAgIGV4Y2x1ZGVXYXJuaW5nQ2hlY2tib3guY2hvc2VOb3RUb1VzZS5jaGVja2VkID0gb2JqLndhcm5pbmdzLmluZGV4T2YocGFyc2VJbnQoZXhjbHVkZVdhcm5pbmdDaGVja2JveC5jaG9zZU5vdFRvVXNlLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpKSkgIT0gLTE7XHJcbiAgICBleGNsdWRlV2FybmluZ0NoZWNrYm94LnZpb2xlbmNlLmNoZWNrZWQgPSBvYmoud2FybmluZ3MuaW5kZXhPZihwYXJzZUludChleGNsdWRlV2FybmluZ0NoZWNrYm94LnZpb2xlbmNlLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpKSkgIT0gLTE7XHJcbiAgICBleGNsdWRlV2FybmluZ0NoZWNrYm94Lm1jZC5jaGVja2VkID0gb2JqLndhcm5pbmdzLmluZGV4T2YocGFyc2VJbnQoZXhjbHVkZVdhcm5pbmdDaGVja2JveC5tY2QuZ2V0QXR0cmlidXRlKFwidmFsdWVcIikpKSAhPSAtMTtcclxuICAgIGV4Y2x1ZGVXYXJuaW5nQ2hlY2tib3gubm9uQ29uLmNoZWNrZWQgPSBvYmoud2FybmluZ3MuaW5kZXhPZihwYXJzZUludChleGNsdWRlV2FybmluZ0NoZWNrYm94Lm5vbkNvbi5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSkpICE9IC0xO1xyXG4gICAgZXhjbHVkZVdhcm5pbmdDaGVja2JveC51bmRlcmFnZS5jaGVja2VkID0gb2JqLndhcm5pbmdzLmluZGV4T2YocGFyc2VJbnQoZXhjbHVkZVdhcm5pbmdDaGVja2JveC51bmRlcmFnZS5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSkpICE9IC0xO1xyXG4gICAgZXhjbHVkZVdhcm5pbmdDaGVja2JveC5ub1dhcm5pbmdzLmNoZWNrZWQgPSBvYmoud2FybmluZ3MuaW5kZXhPZihwYXJzZUludChleGNsdWRlV2FybmluZ0NoZWNrYm94Lm5vV2FybmluZ3MuZ2V0QXR0cmlidXRlKFwidmFsdWVcIikpKSAhPSAtMTtcclxufVxyXG4vKipcclxuICogSGlkZS9zaG93IGFsbCBmaWx0ZXJpbmcgZWxlbWVudHNcclxuICogQHBhcmFtIGZpbHRlcmluZyBJZiBmaWx0ZXJpbmcgaXMgZW5hYmxlZFxyXG4gKi9cclxuZnVuY3Rpb24gY2hlY2tGaWx0ZXJpbmdFbGVtZW50cyhmaWx0ZXJpbmcpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBpZiAoZmlsdGVyaW5nKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgRklMVEVSSU5HX0VMRU1FTlRTLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAoX2EgPSBGSUxURVJJTkdfRUxFTUVOVFMuaXRlbShpKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBGSUxURVJJTkdfRUxFTUVOVFMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIChfYiA9IEZJTFRFUklOR19FTEVNRU5UUy5pdGVtKGkpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxufVxyXG4vKipcclxuICogQWRkcyB0YWcgdG8gdGhlIGV4Y2x1ZGVkIHRhZ3MgbGlzdCBpbiBzdG9yYWdlIGFuZCB0byB0aGUgdGFnIHNlbGVjdFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRhZyB2YWx1ZSB0byBhZGRcclxuICovXHJcbmZ1bmN0aW9uIGFkZFRhZ0VsZW1lbnQodGFnKSB7XHJcbiAgICAvLyBEaXNhYmxlIGFsbCByZWxhdGVkIGJ1dHRvbnNcclxuICAgIGV4Y2x1ZGVUYWdCdG4uY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xyXG4gICAgcmVtb3ZlVGFnQnRuLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcclxuICAgIGlmICh0YWdMaXN0LmluZGV4T2YodGFnKSA9PSAtMSkge1xyXG4gICAgICAgIHZhciB0YWdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgICAgdGFnRWxlbWVudC52YWx1ZSA9IHRhZztcclxuICAgICAgICB0YWdFbGVtZW50LmlubmVySFRNTCA9IHRhZztcclxuICAgICAgICByZW1vdmVUYWdTZWxlY3QuaW5zZXJ0QmVmb3JlKHRhZ0VsZW1lbnQsIHJlbW92ZVRhZ1NlbGVjdC5jaGlsZHJlblswXSk7XHJcbiAgICAgICAgcmVtb3ZlVGFnU2VsZWN0LnZhbHVlID0gdGFnO1xyXG4gICAgICAgIHRhZ0xpc3Quc3BsaWNlKDAsIDAsIHRhZyk7XHJcbiAgICAgICAgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLnNldCh7IHRhZ3M6IHRhZ0xpc3QgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIEVuYWJsZSBhbGwgcmVsYXRlZCBidXR0b25zXHJcbiAgICAgICAgICAgIGV4Y2x1ZGVUYWdCdG4uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICByZW1vdmVUYWdCdG4uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoY29uc3RhbnRzXzEuU0VUVElOR1NfQ0hBTkdFRCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIFJlbW92ZXMgdGFnIGZyb20gdGhlIGV4Y2x1ZGVkIHRhZ3MgbGlzdCBpbiBzdG9yYWdlIGFuZCBmcm9tIHRoZSB0YWcgc2VsZWN0XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGFnIHZhbHVlIHRvIHJlbW92ZVxyXG4gKi9cclxuZnVuY3Rpb24gcmVtb3ZlVGFnRWxlbWVudCh0YWcpIHtcclxuICAgIC8vIERpc2FibGUgYWxsIHJlbGF0ZWQgYnV0dG9uc1xyXG4gICAgZXhjbHVkZVRhZ0J0bi5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XHJcbiAgICByZW1vdmVUYWdCdG4uY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xyXG4gICAgcmVtb3ZlVGFnU2VsZWN0LnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYG9wdGlvblt2YWx1ZT0nJHt0YWd9J11gKSk7XHJcbiAgICB0YWdMaXN0LnNwbGljZSh0YWdMaXN0LmluZGV4T2YodGFnKSwgMSk7XHJcbiAgICBicm93c2VyLnN0b3JhZ2UubG9jYWwuc2V0KHsgdGFnczogdGFnTGlzdCB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAvLyBFbmFibGUgYWxsIHJlbGF0ZWQgYnV0dG9uc1xyXG4gICAgICAgIGV4Y2x1ZGVUYWdCdG4uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIHJlbW92ZVRhZ0J0bi5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKGNvbnN0YW50c18xLlNFVFRJTkdTX0NIQU5HRUQpO1xyXG4gICAgfSk7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9