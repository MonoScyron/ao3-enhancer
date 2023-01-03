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
}

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
// const checkboxContainers = document.getElementsByClassName("checkbox-container");
// let excludeWarningContainer = {
//     choseNotToUse: checkboxContainers[0],
//     violence: checkboxContainers[1],
//     mcd: checkboxContainers[2],
//     nonCon: checkboxContainers[3],
//     underage: checkboxContainers[4],
//     noWarnings: checkboxContainers[5]
// };

// * Global vars
let tagList = [];
let warningList = [];

// * Sync inputs to values saved in storage
browser.storage.local.get(STORAGE_KEYS).then((store) => {
    //If no settings values are in storage, set default setting values in storage
    if(Object.keys(store).length == 0) {
        browser.storage.local.set(DEFAULT_VALUES);
        syncSettings(DEFAULT_VALUES);
    }
    else {
        syncSettings(store);
    }
});

// * Save settings to local storage when values are changed
// Kudos to hit ratio
kudosHitRatioBtn.addEventListener("click", () =>
    browser.storage.local.set(
        { kudosHitRatio: kudosHitRatioBtn.checked }
    )
);

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
    });
}
queryBtn.addEventListener("click", setQueryStorage);
queryInput.addEventListener("input", setQueryStorage);

// Tags/fandoms
excludeTagBtn.addEventListener("click", () => {
    if(excludeTagInput.value.length > 0) {
        addTagElement(excludeTagInput.value);
        excludeTagInput.value = "";
    }
});
removeTagBtn.addEventListener("click", () => removeTagElement(removeTagSelect.value));

// Warnings
// TODO: FIX THIS, STORAGE DOESN'T WORK RN
function addExcludeWarningListener(checkbox) {
    checkbox.addEventListener("change", () => {
        var checked = checkbox.checked;
        var val = parseInt(checkbox.getAttribute("value"));
        var index = warningList.indexOf(val);
        if(checked && index == -1)
            warningList.push(val);
        else if(!checked)
            warningList.splice(index, 1);
        browser.storage.local.set({ warnings: warningList });
    });
}
addExcludeWarningListener(excludeWarningCheckbox.choseNotToUse)
addExcludeWarningListener(excludeWarningCheckbox.violence)
addExcludeWarningListener(excludeWarningCheckbox.mcd)
addExcludeWarningListener(excludeWarningCheckbox.nonCon)
addExcludeWarningListener(excludeWarningCheckbox.underage)
addExcludeWarningListener(excludeWarningCheckbox.noWarnings)

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
    excludeWarningCheckbox.choseNotToUse.checked = obj.warnings.indexOf(
        parseInt(excludeWarningCheckbox.choseNotToUse.getAttribute("value"))) != -1;
    excludeWarningCheckbox.violence.checked = obj.warnings.indexOf(
        parseInt(excludeWarningCheckbox.violence.getAttribute("value"))) != -1;
    excludeWarningCheckbox.mcd.checked = obj.warnings.indexOf(
        parseInt(excludeWarningCheckbox.mcd.getAttribute("value"))) != -1;
    excludeWarningCheckbox.nonCon.checked = obj.warnings.indexOf(
        parseInt(excludeWarningCheckbox.nonCon.getAttribute("value"))) != -1;
    excludeWarningCheckbox.underage.checked = obj.warnings.indexOf(
        parseInt(excludeWarningCheckbox.underage.getAttribute("value"))) != -1;
    excludeWarningCheckbox.noWarnings.checked = obj.warnings.indexOf(
        parseInt(excludeWarningCheckbox.noWarnings.getAttribute("value"))) != -1;
}

/**
 * Adds tag to the excluded tags list in storage and to the tag select
 * @param {string} tag Tag value to add
 */
function addTagElement(tag) {
    // Disable all related buttons
    excludeTagBtn.classList.add("disabled");
    removeTagBtn.classList.add("disabled");

    if(tagList.indexOf(tag) == -1) {
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
    });
}