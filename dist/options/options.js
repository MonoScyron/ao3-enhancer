/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************************!*\
  !*** ./src/options/options.ts ***!
  \********************************/

// Storage keys
const STORAGE_KEYS = [
    "kudosHitRatio", "language", "query", "tags", "warnings"
];
// Default values
const DEFAULT_VALUES = {
    kudosHitRatio: true,
    language: [false, ""],
    query: [false, ""],
    tags: [],
    warnings: []
};
// Settings changed message
const SETTINGS_CHANGED = "settings_changed";
// * Select input from document
// Kudos to hit ratio
let kudosHitRatioBtn = document.querySelector(`input[name='kudos-hit-ratio']`);
// Language
let languageBtn = document.querySelector(`input[name='language-enable']`);
let languageSelect = document.querySelector(`select[name='language']`);
// Query
let queryBtn = document.querySelector(`input[name='query-enable']`);
let queryInput = document.querySelector(`input[name='query']`);
// Tags/fandoms
let excludeTagInput = document.querySelector(`input[name='exclude-tag']`);
let excludeTagBtn = document.getElementById(`exclude-tag-submit`);
let removeTagSelect = document.querySelector(`select[name='remove-tag']`);
let removeTagBtn = document.getElementById(`remove-tag-submit`);
// Warnings
let excludeWarningCheckbox = {
    choseNotToUse: document.querySelector(`input[name='exclude-warning-chose-not-to-use']`),
    violence: document.querySelector(`input[name='exclude-warning-violence']`),
    mcd: document.querySelector(`input[name='exclude-warning-mcd']`),
    nonCon: document.querySelector(`input[name='exclude-warning-non-con']`),
    underage: document.querySelector(`input[name='exclude-warning-underage']`),
    noWarnings: document.querySelector(`input[name='exclude-warning-no-warnings']`)
};
// * Global vars
let tagList = [];
let warningList = [];
// * Sync inputs to values saved in storage
browser.storage.local.get(STORAGE_KEYS).then((store) => {
    //If no settings values are in storage, set default setting values in storage
    if (Object.keys(store).length == 0) {
        browser.storage.local.set(DEFAULT_VALUES);
        syncSettings(DEFAULT_VALUES);
    }
    else {
        syncSettings(store);
    }
});
// * Save settings to local storage when values are changed
// Kudos to hit ratio
kudosHitRatioBtn.addEventListener("click", () => {
    browser.storage.local.set({ kudosHitRatio: kudosHitRatioBtn.checked }).then(() => browser.runtime.sendMessage(SETTINGS_CHANGED));
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
        browser.runtime.sendMessage(SETTINGS_CHANGED);
    });
}
languageBtn.addEventListener("click", setLanguageStorage);
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
        browser.runtime.sendMessage(SETTINGS_CHANGED);
    });
}
queryBtn.addEventListener("click", setQueryStorage);
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
        browser.storage.local.set({ warnings: warningList }).then(() => browser.runtime.sendMessage(SETTINGS_CHANGED));
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
            browser.runtime.sendMessage(SETTINGS_CHANGED);
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
        browser.runtime.sendMessage(SETTINGS_CHANGED);
    });
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9vcHRpb25zL29wdGlvbnMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyx5Q0FBeUM7QUFDekUsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHVCQUF1QjtBQUMzRCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxlQUFlO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0UsSUFBSTtBQUM1RTtBQUNBLGdDQUFnQyxlQUFlO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL29wdGlvbnMvb3B0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuLy8gU3RvcmFnZSBrZXlzXHJcbmNvbnN0IFNUT1JBR0VfS0VZUyA9IFtcclxuICAgIFwia3Vkb3NIaXRSYXRpb1wiLCBcImxhbmd1YWdlXCIsIFwicXVlcnlcIiwgXCJ0YWdzXCIsIFwid2FybmluZ3NcIlxyXG5dO1xyXG4vLyBEZWZhdWx0IHZhbHVlc1xyXG5jb25zdCBERUZBVUxUX1ZBTFVFUyA9IHtcclxuICAgIGt1ZG9zSGl0UmF0aW86IHRydWUsXHJcbiAgICBsYW5ndWFnZTogW2ZhbHNlLCBcIlwiXSxcclxuICAgIHF1ZXJ5OiBbZmFsc2UsIFwiXCJdLFxyXG4gICAgdGFnczogW10sXHJcbiAgICB3YXJuaW5nczogW11cclxufTtcclxuLy8gU2V0dGluZ3MgY2hhbmdlZCBtZXNzYWdlXHJcbmNvbnN0IFNFVFRJTkdTX0NIQU5HRUQgPSBcInNldHRpbmdzX2NoYW5nZWRcIjtcclxuLy8gKiBTZWxlY3QgaW5wdXQgZnJvbSBkb2N1bWVudFxyXG4vLyBLdWRvcyB0byBoaXQgcmF0aW9cclxubGV0IGt1ZG9zSGl0UmF0aW9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPSdrdWRvcy1oaXQtcmF0aW8nXWApO1xyXG4vLyBMYW5ndWFnZVxyXG5sZXQgbGFuZ3VhZ2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPSdsYW5ndWFnZS1lbmFibGUnXWApO1xyXG5sZXQgbGFuZ3VhZ2VTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzZWxlY3RbbmFtZT0nbGFuZ3VhZ2UnXWApO1xyXG4vLyBRdWVyeVxyXG5sZXQgcXVlcnlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPSdxdWVyeS1lbmFibGUnXWApO1xyXG5sZXQgcXVlcnlJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9J3F1ZXJ5J11gKTtcclxuLy8gVGFncy9mYW5kb21zXHJcbmxldCBleGNsdWRlVGFnSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPSdleGNsdWRlLXRhZyddYCk7XHJcbmxldCBleGNsdWRlVGFnQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGV4Y2x1ZGUtdGFnLXN1Ym1pdGApO1xyXG5sZXQgcmVtb3ZlVGFnU2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc2VsZWN0W25hbWU9J3JlbW92ZS10YWcnXWApO1xyXG5sZXQgcmVtb3ZlVGFnQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHJlbW92ZS10YWctc3VibWl0YCk7XHJcbi8vIFdhcm5pbmdzXHJcbmxldCBleGNsdWRlV2FybmluZ0NoZWNrYm94ID0ge1xyXG4gICAgY2hvc2VOb3RUb1VzZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0nZXhjbHVkZS13YXJuaW5nLWNob3NlLW5vdC10by11c2UnXWApLFxyXG4gICAgdmlvbGVuY2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9J2V4Y2x1ZGUtd2FybmluZy12aW9sZW5jZSddYCksXHJcbiAgICBtY2Q6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9J2V4Y2x1ZGUtd2FybmluZy1tY2QnXWApLFxyXG4gICAgbm9uQ29uOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPSdleGNsdWRlLXdhcm5pbmctbm9uLWNvbiddYCksXHJcbiAgICB1bmRlcmFnZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT0nZXhjbHVkZS13YXJuaW5nLXVuZGVyYWdlJ11gKSxcclxuICAgIG5vV2FybmluZ3M6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9J2V4Y2x1ZGUtd2FybmluZy1uby13YXJuaW5ncyddYClcclxufTtcclxuLy8gKiBHbG9iYWwgdmFyc1xyXG5sZXQgdGFnTGlzdCA9IFtdO1xyXG5sZXQgd2FybmluZ0xpc3QgPSBbXTtcclxuLy8gKiBTeW5jIGlucHV0cyB0byB2YWx1ZXMgc2F2ZWQgaW4gc3RvcmFnZVxyXG5icm93c2VyLnN0b3JhZ2UubG9jYWwuZ2V0KFNUT1JBR0VfS0VZUykudGhlbigoc3RvcmUpID0+IHtcclxuICAgIC8vSWYgbm8gc2V0dGluZ3MgdmFsdWVzIGFyZSBpbiBzdG9yYWdlLCBzZXQgZGVmYXVsdCBzZXR0aW5nIHZhbHVlcyBpbiBzdG9yYWdlXHJcbiAgICBpZiAoT2JqZWN0LmtleXMoc3RvcmUpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLnNldChERUZBVUxUX1ZBTFVFUyk7XHJcbiAgICAgICAgc3luY1NldHRpbmdzKERFRkFVTFRfVkFMVUVTKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHN5bmNTZXR0aW5ncyhzdG9yZSk7XHJcbiAgICB9XHJcbn0pO1xyXG4vLyAqIFNhdmUgc2V0dGluZ3MgdG8gbG9jYWwgc3RvcmFnZSB3aGVuIHZhbHVlcyBhcmUgY2hhbmdlZFxyXG4vLyBLdWRvcyB0byBoaXQgcmF0aW9cclxua3Vkb3NIaXRSYXRpb0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLnNldCh7IGt1ZG9zSGl0UmF0aW86IGt1ZG9zSGl0UmF0aW9CdG4uY2hlY2tlZCB9KS50aGVuKCgpID0+IGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZShTRVRUSU5HU19DSEFOR0VEKSk7XHJcbn0pO1xyXG4vLyBMYW5ndWFnZVxyXG5mdW5jdGlvbiBzZXRMYW5ndWFnZVN0b3JhZ2UoKSB7XHJcbiAgICAvLyBEaXNhYmxlIGFsbCByZWxhdGVkIGlucHV0c1xyXG4gICAgbGFuZ3VhZ2VCdG4uY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xyXG4gICAgbGFuZ3VhZ2VTZWxlY3QuY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xyXG4gICAgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLnNldCh7XHJcbiAgICAgICAgbGFuZ3VhZ2U6IFtcclxuICAgICAgICAgICAgbGFuZ3VhZ2VCdG4uY2hlY2tlZCxcclxuICAgICAgICAgICAgbGFuZ3VhZ2VTZWxlY3QudmFsdWVcclxuICAgICAgICBdXHJcbiAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAvLyBFbmFibGUgYWxsIHJlbGF0ZWQgaW5wdXRzXHJcbiAgICAgICAgbGFuZ3VhZ2VCdG4uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIGxhbmd1YWdlU2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoU0VUVElOR1NfQ0hBTkdFRCk7XHJcbiAgICB9KTtcclxufVxyXG5sYW5ndWFnZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2V0TGFuZ3VhZ2VTdG9yYWdlKTtcclxubGFuZ3VhZ2VTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBzZXRMYW5ndWFnZVN0b3JhZ2UpO1xyXG4vLyBRdWVyeVxyXG5mdW5jdGlvbiBzZXRRdWVyeVN0b3JhZ2UoKSB7XHJcbiAgICAvLyBEaXNhYmxlIGFsbCByZWxhdGVkIGlucHV0c1xyXG4gICAgcXVlcnlCdG4uY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xyXG4gICAgcXVlcnlJbnB1dC5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XHJcbiAgICBicm93c2VyLnN0b3JhZ2UubG9jYWwuc2V0KHtcclxuICAgICAgICBxdWVyeTogW1xyXG4gICAgICAgICAgICBxdWVyeUJ0bi5jaGVja2VkLFxyXG4gICAgICAgICAgICBxdWVyeUlucHV0LnZhbHVlXHJcbiAgICAgICAgXVxyXG4gICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgLy8gRW5hYmxlIGFsbCByZWxhdGVkIGlucHV0c1xyXG4gICAgICAgIHF1ZXJ5QnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICBxdWVyeUlucHV0LmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoU0VUVElOR1NfQ0hBTkdFRCk7XHJcbiAgICB9KTtcclxufVxyXG5xdWVyeUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2V0UXVlcnlTdG9yYWdlKTtcclxucXVlcnlJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgc2V0UXVlcnlTdG9yYWdlKTtcclxuLy8gVGFncy9mYW5kb21zXHJcbmV4Y2x1ZGVUYWdCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGlmIChleGNsdWRlVGFnSW5wdXQudmFsdWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGFkZFRhZ0VsZW1lbnQoZXhjbHVkZVRhZ0lucHV0LnZhbHVlKTtcclxuICAgICAgICBleGNsdWRlVGFnSW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gICAgfVxyXG59KTtcclxucmVtb3ZlVGFnQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiByZW1vdmVUYWdFbGVtZW50KHJlbW92ZVRhZ1NlbGVjdC52YWx1ZSkpO1xyXG4vLyBXYXJuaW5nc1xyXG5mdW5jdGlvbiBhZGRFeGNsdWRlV2FybmluZ0xpc3RlbmVyKGNoZWNrYm94KSB7XHJcbiAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcclxuICAgICAgICB2YXIgY2hlY2tlZCA9IGNoZWNrYm94LmNoZWNrZWQ7XHJcbiAgICAgICAgdmFyIHZhbCA9IHBhcnNlSW50KGNoZWNrYm94LmdldEF0dHJpYnV0ZShcInZhbHVlXCIpKTtcclxuICAgICAgICB2YXIgaW5kZXggPSB3YXJuaW5nTGlzdC5pbmRleE9mKHZhbCk7XHJcbiAgICAgICAgaWYgKGNoZWNrZWQgJiYgaW5kZXggPT0gLTEpXHJcbiAgICAgICAgICAgIHdhcm5pbmdMaXN0LnB1c2godmFsKTtcclxuICAgICAgICBlbHNlIGlmICghY2hlY2tlZClcclxuICAgICAgICAgICAgd2FybmluZ0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICBicm93c2VyLnN0b3JhZ2UubG9jYWwuc2V0KHsgd2FybmluZ3M6IHdhcm5pbmdMaXN0IH0pLnRoZW4oKCkgPT4gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKFNFVFRJTkdTX0NIQU5HRUQpKTtcclxuICAgIH0pO1xyXG59XHJcbmFkZEV4Y2x1ZGVXYXJuaW5nTGlzdGVuZXIoZXhjbHVkZVdhcm5pbmdDaGVja2JveC5jaG9zZU5vdFRvVXNlKTtcclxuYWRkRXhjbHVkZVdhcm5pbmdMaXN0ZW5lcihleGNsdWRlV2FybmluZ0NoZWNrYm94LnZpb2xlbmNlKTtcclxuYWRkRXhjbHVkZVdhcm5pbmdMaXN0ZW5lcihleGNsdWRlV2FybmluZ0NoZWNrYm94Lm1jZCk7XHJcbmFkZEV4Y2x1ZGVXYXJuaW5nTGlzdGVuZXIoZXhjbHVkZVdhcm5pbmdDaGVja2JveC5ub25Db24pO1xyXG5hZGRFeGNsdWRlV2FybmluZ0xpc3RlbmVyKGV4Y2x1ZGVXYXJuaW5nQ2hlY2tib3gudW5kZXJhZ2UpO1xyXG5hZGRFeGNsdWRlV2FybmluZ0xpc3RlbmVyKGV4Y2x1ZGVXYXJuaW5nQ2hlY2tib3gubm9XYXJuaW5ncyk7XHJcbi8vICogRnVuY3Rpb25zXHJcbi8qKlxyXG4gKiBDaGFuZ2VzIGN1cnJlbnQgc2V0dGluZ3MgYWNjb3JkaW5nIHRvIHBhc3NlZCBvYmplY3RcclxuICogQHBhcmFtIHtzdHJpbmdbXX0gb2JqIE9iamVjdCB0byBnZXQgc2V0dGluZ3MgZnJvbVxyXG4gKi9cclxuZnVuY3Rpb24gc3luY1NldHRpbmdzKG9iaikge1xyXG4gICAgLy8gS3Vkb3MgdG8gaGl0IHJhdGlvXHJcbiAgICBrdWRvc0hpdFJhdGlvQnRuLmNoZWNrZWQgPSBvYmoua3Vkb3NIaXRSYXRpbztcclxuICAgIC8vIExhbmd1YWdlXHJcbiAgICBsYW5ndWFnZUJ0bi5jaGVja2VkID0gb2JqLmxhbmd1YWdlWzBdO1xyXG4gICAgbGFuZ3VhZ2VTZWxlY3QudmFsdWUgPSBvYmoubGFuZ3VhZ2VbMV07XHJcbiAgICAvLyBRdWVyeVxyXG4gICAgcXVlcnlCdG4uY2hlY2tlZCA9IG9iai5xdWVyeVswXTtcclxuICAgIHF1ZXJ5SW5wdXQudmFsdWUgPSBvYmoucXVlcnlbMV07XHJcbiAgICAvLyBUYWdzL2ZhbmRvbXNcclxuICAgIG9iai50YWdzLmZvckVhY2goKHRhZykgPT4ge1xyXG4gICAgICAgIHRhZ0xpc3QucHVzaCh0YWcpO1xyXG4gICAgICAgIHZhciB0YWdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgICAgdGFnRWxlbWVudC52YWx1ZSA9IHRhZztcclxuICAgICAgICB0YWdFbGVtZW50LmlubmVySFRNTCA9IHRhZztcclxuICAgICAgICByZW1vdmVUYWdTZWxlY3QuYXBwZW5kQ2hpbGQodGFnRWxlbWVudCk7XHJcbiAgICB9KTtcclxuICAgIC8vIFdhcm5pbmdzXHJcbiAgICB3YXJuaW5nTGlzdCA9IG9iai53YXJuaW5ncztcclxuICAgIGV4Y2x1ZGVXYXJuaW5nQ2hlY2tib3guY2hvc2VOb3RUb1VzZS5jaGVja2VkID0gb2JqLndhcm5pbmdzLmluZGV4T2YocGFyc2VJbnQoZXhjbHVkZVdhcm5pbmdDaGVja2JveC5jaG9zZU5vdFRvVXNlLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpKSkgIT0gLTE7XHJcbiAgICBleGNsdWRlV2FybmluZ0NoZWNrYm94LnZpb2xlbmNlLmNoZWNrZWQgPSBvYmoud2FybmluZ3MuaW5kZXhPZihwYXJzZUludChleGNsdWRlV2FybmluZ0NoZWNrYm94LnZpb2xlbmNlLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpKSkgIT0gLTE7XHJcbiAgICBleGNsdWRlV2FybmluZ0NoZWNrYm94Lm1jZC5jaGVja2VkID0gb2JqLndhcm5pbmdzLmluZGV4T2YocGFyc2VJbnQoZXhjbHVkZVdhcm5pbmdDaGVja2JveC5tY2QuZ2V0QXR0cmlidXRlKFwidmFsdWVcIikpKSAhPSAtMTtcclxuICAgIGV4Y2x1ZGVXYXJuaW5nQ2hlY2tib3gubm9uQ29uLmNoZWNrZWQgPSBvYmoud2FybmluZ3MuaW5kZXhPZihwYXJzZUludChleGNsdWRlV2FybmluZ0NoZWNrYm94Lm5vbkNvbi5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSkpICE9IC0xO1xyXG4gICAgZXhjbHVkZVdhcm5pbmdDaGVja2JveC51bmRlcmFnZS5jaGVja2VkID0gb2JqLndhcm5pbmdzLmluZGV4T2YocGFyc2VJbnQoZXhjbHVkZVdhcm5pbmdDaGVja2JveC51bmRlcmFnZS5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSkpICE9IC0xO1xyXG4gICAgZXhjbHVkZVdhcm5pbmdDaGVja2JveC5ub1dhcm5pbmdzLmNoZWNrZWQgPSBvYmoud2FybmluZ3MuaW5kZXhPZihwYXJzZUludChleGNsdWRlV2FybmluZ0NoZWNrYm94Lm5vV2FybmluZ3MuZ2V0QXR0cmlidXRlKFwidmFsdWVcIikpKSAhPSAtMTtcclxufVxyXG4vKipcclxuICogQWRkcyB0YWcgdG8gdGhlIGV4Y2x1ZGVkIHRhZ3MgbGlzdCBpbiBzdG9yYWdlIGFuZCB0byB0aGUgdGFnIHNlbGVjdFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRhZyB2YWx1ZSB0byBhZGRcclxuICovXHJcbmZ1bmN0aW9uIGFkZFRhZ0VsZW1lbnQodGFnKSB7XHJcbiAgICAvLyBEaXNhYmxlIGFsbCByZWxhdGVkIGJ1dHRvbnNcclxuICAgIGV4Y2x1ZGVUYWdCdG4uY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xyXG4gICAgcmVtb3ZlVGFnQnRuLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcclxuICAgIGlmICh0YWdMaXN0LmluZGV4T2YodGFnKSA9PSAtMSkge1xyXG4gICAgICAgIHZhciB0YWdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgICAgdGFnRWxlbWVudC52YWx1ZSA9IHRhZztcclxuICAgICAgICB0YWdFbGVtZW50LmlubmVySFRNTCA9IHRhZztcclxuICAgICAgICByZW1vdmVUYWdTZWxlY3QuaW5zZXJ0QmVmb3JlKHRhZ0VsZW1lbnQsIHJlbW92ZVRhZ1NlbGVjdC5jaGlsZHJlblswXSk7XHJcbiAgICAgICAgcmVtb3ZlVGFnU2VsZWN0LnZhbHVlID0gdGFnO1xyXG4gICAgICAgIHRhZ0xpc3Quc3BsaWNlKDAsIDAsIHRhZyk7XHJcbiAgICAgICAgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLnNldCh7IHRhZ3M6IHRhZ0xpc3QgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIEVuYWJsZSBhbGwgcmVsYXRlZCBidXR0b25zXHJcbiAgICAgICAgICAgIGV4Y2x1ZGVUYWdCdG4uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICByZW1vdmVUYWdCdG4uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoU0VUVElOR1NfQ0hBTkdFRCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIFJlbW92ZXMgdGFnIGZyb20gdGhlIGV4Y2x1ZGVkIHRhZ3MgbGlzdCBpbiBzdG9yYWdlIGFuZCBmcm9tIHRoZSB0YWcgc2VsZWN0XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGFnIHZhbHVlIHRvIHJlbW92ZVxyXG4gKi9cclxuZnVuY3Rpb24gcmVtb3ZlVGFnRWxlbWVudCh0YWcpIHtcclxuICAgIC8vIERpc2FibGUgYWxsIHJlbGF0ZWQgYnV0dG9uc1xyXG4gICAgZXhjbHVkZVRhZ0J0bi5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XHJcbiAgICByZW1vdmVUYWdCdG4uY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xyXG4gICAgcmVtb3ZlVGFnU2VsZWN0LnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYG9wdGlvblt2YWx1ZT0nJHt0YWd9J11gKSk7XHJcbiAgICB0YWdMaXN0LnNwbGljZSh0YWdMaXN0LmluZGV4T2YodGFnKSwgMSk7XHJcbiAgICBicm93c2VyLnN0b3JhZ2UubG9jYWwuc2V0KHsgdGFnczogdGFnTGlzdCB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAvLyBFbmFibGUgYWxsIHJlbGF0ZWQgYnV0dG9uc1xyXG4gICAgICAgIGV4Y2x1ZGVUYWdCdG4uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIHJlbW92ZVRhZ0J0bi5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKFNFVFRJTkdTX0NIQU5HRUQpO1xyXG4gICAgfSk7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9