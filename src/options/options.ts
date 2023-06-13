import { STORAGE_KEYS, DEFAULT_VALUES, SETTINGS_CHANGED } from '../export/constants';
import { WARNING, idToWarningEnum } from '../export/enums';
import sync = browser.storage.sync;
import { json } from "stream/consumers";

// * Select input from document
// Kudos to hit ratio
const kudosHitRatioBtn = document.querySelector(`input[name='kudos-hit-ratio']`) as HTMLInputElement;
// Enable filtering
const filterBtn = document.querySelector(`input[name='enable-filtering']`) as HTMLInputElement;
// Language
const languageSelect = document.querySelector(`select[name='language']`) as HTMLSelectElement;
// Query
const queryInput = document.querySelector(`input[name='query']`) as HTMLInputElement;
// Tags/fandoms
const excludeTagInput = document.querySelector(`input[name='exclude-tag']`) as HTMLInputElement;
const excludeTagBtn = document.getElementById(`exclude-tag-submit`) as HTMLButtonElement;
const removeTagSelect = document.querySelector(`select[name='remove-tag']`) as HTMLSelectElement;
const removeTagBtn = document.getElementById(`remove-tag-submit`) as HTMLButtonElement;
// Warnings
const excludeWarningCheckbox = {
    choseNotToUse: document.querySelector(`input[name='exclude-warning-chose-not-to-use']`) as HTMLInputElement,
    violence: document.querySelector(`input[name='exclude-warning-violence']`) as HTMLInputElement,
    mcd: document.querySelector(`input[name='exclude-warning-mcd']`) as HTMLInputElement,
    nonCon: document.querySelector(`input[name='exclude-warning-non-con']`) as HTMLInputElement,
    underage: document.querySelector(`input[name='exclude-warning-underage']`) as HTMLInputElement,
    noWarningsApply: document.querySelector(`input[name='exclude-warning-no-warnings']`) as HTMLInputElement
};
// Crossover
const crossoverSelect = document.querySelector(`select[name='crossover']`) as HTMLInputElement;
// Completion
const completionSelect = document.querySelector(`select[name='completion']`) as HTMLInputElement;
// Word count
const wordCountFromInput = document.querySelector(`input[name='min-word-count']`) as HTMLInputElement;
const wordCountToInput = document.querySelector(`input[name='max-word-count']`) as HTMLInputElement;
// Update date
const dateFromInput = document.querySelector(`input[name='from-date']`) as HTMLInputElement;
const dateToInput = document.querySelector(`input[name='to-date']`) as HTMLInputElement;
// Hide by num fandoms
const hideByNumFandomInput = document.querySelector(`input[name='hide-by-num-fandom']`) as HTMLInputElement;
// Hide by kudos to hit ratio
const hideByRatioInput = document.querySelector(`input[name='hide-by-ratio']`) as HTMLInputElement;
// Export/import settings
const exportBtn = document.getElementById("export-settings-button") as HTMLInputElement;
const exportLink = document.getElementById("export-settings-link") as HTMLLinkElement;
const importBtn = document.getElementById("import-settings-button") as HTMLInputElement;
const importInput = document.querySelector(`input[name='import-settings']`) as HTMLInputElement;

// * Constant elements defined here
// Options whose visibility depends on if filtering is enabled
const FILTERING_ELEMENTS = document.getElementsByClassName("filtering");

// * Global vars
let tagList: string[] = [];
let warningList: WARNING[] = [];
let settingsFile: string | null = null;


// * Sync inputs to values saved in storage
browser.storage.local.get(STORAGE_KEYS).then((store) => {
    //If no settings values are in storage, set default setting values in storage
    if(Object.keys(store).length == 0) {
        browser.storage.local.set(DEFAULT_VALUES).then();
        syncHTMLSettings(DEFAULT_VALUES);
    }
    else {
        syncHTMLSettings(store);
    }
});

// * Save settings to local storage when values are changed
// Hide by num fandoms
hideByRatioInput.addEventListener('change', () => {
    // If value = stupid or 0, set value to empty
    if(Number.isNaN(parseInt(hideByRatioInput.value)) || parseInt(hideByRatioInput.value) == 0)
        hideByRatioInput.value = '';

    browser.storage.local.set({
        hideByRatio: parseInt(hideByRatioInput.value)
    }).then(() => browser.runtime.sendMessage(SETTINGS_CHANGED));
});

// Hide by num fandoms
hideByNumFandomInput.addEventListener('change', () => {
    // If value = stupid or 0, set value to empty
    if(Number.isNaN(parseInt(hideByNumFandomInput.value)) || parseInt(hideByNumFandomInput.value) == 0)
        hideByNumFandomInput.value = '';

    browser.storage.local.set({
        hideByNumFandom: parseInt(hideByNumFandomInput.value)
    }).then(() => browser.runtime.sendMessage(SETTINGS_CHANGED));
});

// Update date
function dateListener() {
    browser.storage.local.set({
        updateDate: [dateFromInput.value, dateToInput.value]
    }).then(() => browser.runtime.sendMessage(SETTINGS_CHANGED));
}

dateFromInput.addEventListener('input', dateListener);
dateToInput.addEventListener('input', dateListener);

// Word count
function wordCountListener() {
    browser.storage.local.set({
        wordCount: [wordCountFromInput.value, wordCountToInput.value]
    }).then(() => browser.runtime.sendMessage(SETTINGS_CHANGED));
}

wordCountFromInput.addEventListener('input', wordCountListener);
wordCountToInput.addEventListener('input', wordCountListener);

// Completion
completionSelect.addEventListener('change', () => {
    browser.storage.local.set({completion: completionSelect.value}).then(() =>
        browser.runtime.sendMessage(SETTINGS_CHANGED)
    );
});

// Crossover
crossoverSelect.addEventListener('change', () => {
    browser.storage.local.set({crossover: crossoverSelect.value}).then(() =>
        browser.runtime.sendMessage(SETTINGS_CHANGED)
    );
});

// Kudos to hit ratio
kudosHitRatioBtn.addEventListener("change", () => {
    browser.storage.local.set({kudosHitRatio: kudosHitRatioBtn.checked}).then(() =>
        browser.runtime.sendMessage(SETTINGS_CHANGED)
    );
});

// Enable filtering
filterBtn.addEventListener("change", () => {
    browser.storage.local.set({filtering: filterBtn.checked}).then(() =>
        browser.runtime.sendMessage(SETTINGS_CHANGED)
    );
    checkFilteringElements(filterBtn.checked);
});

// Language
languageSelect.addEventListener("change", () => {
    browser.storage.local.set({language: languageSelect.value}).then(() =>
        browser.runtime.sendMessage(SETTINGS_CHANGED)
    );
});

// Query
queryInput.addEventListener("input", () => {
    browser.storage.local.set({query: queryInput.value}).then(() =>
        browser.runtime.sendMessage(SETTINGS_CHANGED)
    );
});

// Tags/fandoms
excludeTagBtn.addEventListener("click", () => {
    if(excludeTagInput.value.length > 0) {
        addTagElement(excludeTagInput.value);
        excludeTagInput.value = "";
    }
});
removeTagBtn.addEventListener("click", () => removeTagElement(removeTagSelect.value));

// Warnings
function addExcludeWarningListener(checkbox: HTMLInputElement) {
    checkbox.addEventListener("change", () => {
        let checked = checkbox.checked;
        let val = parseInt(checkbox.getAttribute("value")!);
        let index = warningList.indexOf(idToWarningEnum(val));
        if(checked && index == -1)
            warningList.push(idToWarningEnum(val));
        else if(!checked)
            warningList.splice(index, 1);
        browser.storage.local.set({warnings: warningList}).then(() =>
            browser.runtime.sendMessage(SETTINGS_CHANGED)
        );
    });
}

addExcludeWarningListener(excludeWarningCheckbox.choseNotToUse)
addExcludeWarningListener(excludeWarningCheckbox.violence)
addExcludeWarningListener(excludeWarningCheckbox.mcd)
addExcludeWarningListener(excludeWarningCheckbox.nonCon)
addExcludeWarningListener(excludeWarningCheckbox.underage)
addExcludeWarningListener(excludeWarningCheckbox.noWarningsApply)

// * Export/import settings
function exportSettings() {
    browser.storage.local.get(STORAGE_KEYS).then(r => {
        let settingsJsonString = JSON.stringify(r);
        let settingsData = new Blob([settingsJsonString], {type: "application/json"});

        if(settingsFile != null) {
            window.URL.revokeObjectURL(settingsFile);
        }
        settingsFile = window.URL.createObjectURL(settingsData);

        let date = new Date();
        let fileName = `ao3_enhancer_${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.json`;
        browser.downloads.download({
            url: settingsFile,
            filename: fileName,
            saveAs: true
        }).then();
    });
}

function importSettings() {
    let fileList = importInput.files;
    if(fileList != null && fileList.length > 0) {
        // console.log("AO3Extension: Import settings") // DEBUGGING
        let file = fileList[0];
        file.text().then(r => {
            // console.log("AO3Extention: " + r); // DEBUGGING
            let settings = JSON.parse(r).valueOf();
            browser.storage.local.set(settings).then(() => {
                    browser.runtime.sendMessage(SETTINGS_CHANGED).then();
                    syncHTMLSettings(settings);
                }
            );
        });
    }
}

// Export/import settings
exportBtn.addEventListener("click", () => exportSettings());
importBtn.addEventListener("click", (e) => {
    e.preventDefault();
    importInput.click();
});
importInput.addEventListener("change", () => importSettings());


// * Private functions
/**
 * Changes current settings' HTML objects according to passed object
 * @param {string[]} obj Object to get settings from
 */
function syncHTMLSettings(obj: { [key: string]: any }) {
    // Kudos to hit ratio
    kudosHitRatioBtn.checked = obj.kudosHitRatio;
    // Enable filtering
    filterBtn.checked = obj.filtering;
    checkFilteringElements(filterBtn.checked);
    // Language
    languageSelect.value = obj.language;
    // Query
    queryInput.value = obj.query;
    // Tags/fandoms
    obj.tags.forEach((tag: string) => {
        tagList.push(tag);
        let tagElement = document.createElement('option');
        tagElement.value = tag;
        tagElement.innerText = tag;
        removeTagSelect.appendChild(tagElement);
    });
    // Warnings
    obj.warnings.forEach((e: number) => {
        warningList.push(idToWarningEnum(e));
    });
    excludeWarningCheckbox.choseNotToUse.checked = obj.warnings.indexOf(WARNING.choseNotToUse) != -1;
    excludeWarningCheckbox.violence.checked = obj.warnings.indexOf(WARNING.violence) != -1;
    excludeWarningCheckbox.mcd.checked = obj.warnings.indexOf(WARNING.mcd) != -1;
    excludeWarningCheckbox.nonCon.checked = obj.warnings.indexOf(WARNING.nonCon) != -1;
    excludeWarningCheckbox.underage.checked = obj.warnings.indexOf(WARNING.underage) != -1;
    excludeWarningCheckbox.noWarningsApply.checked = obj.warnings.indexOf(WARNING.noWarningsApply) != -1;
    // Crossover
    crossoverSelect.value = obj.crossover;
    // Completion
    completionSelect.value = obj.completion;
    // Word count
    wordCountFromInput.value = obj.wordCount[0];
    wordCountToInput.value = obj.wordCount[1];
    // Update date
    dateFromInput.value = obj.updateDate[0];
    dateToInput.value = obj.updateDate[1];
    // Hide by num fandoms
    hideByNumFandomInput.value = obj.hideByNumFandom == 0 ? '' : obj.hideByNumFandom;
    // Hide by ratio
    hideByRatioInput.value = obj.hideByRatio == 0 ? '' : obj.hideByRatio;
}

/**
 * Hide/show all filtering elements
 * @param filtering If filtering is enabled
 */
function checkFilteringElements(filtering: boolean) {
    for(let i = 0; i < FILTERING_ELEMENTS.length; i++)
        if(filtering)
            FILTERING_ELEMENTS.item(i)?.classList.remove("hidden");
        else
            FILTERING_ELEMENTS.item(i)?.classList.add("hidden");
}

/**
 * Adds tag to the excluded tags list in storage and to the tag select
 * @param {string} tag Tag value to add
 */
function addTagElement(tag: string) {
    // Disable all related buttons
    excludeTagBtn.classList.add("disabled");
    removeTagBtn.classList.add("disabled");

    if(tagList.indexOf(tag) == -1) {
        let tagElement = document.createElement('option');
        tagElement.value = tag;
        tagElement.innerText = tag;

        removeTagSelect.insertBefore(tagElement, removeTagSelect.children[0]);
        removeTagSelect.value = tag;

        tagList.splice(0, 0, tag);
        browser.storage.local.set({tags: tagList}).then(() => {
            // Enable all related buttons
            excludeTagBtn.classList.remove("disabled");
            removeTagBtn.classList.remove("disabled");

            browser.runtime.sendMessage(SETTINGS_CHANGED).then();
        });
    }
}

/**
 * Removes tag from the excluded tags list in storage and from the tag select
 * @param {string} tag Tag value to remove
 */
function removeTagElement(tag: any) {
    // Disable all related buttons
    excludeTagBtn.classList.add("disabled");
    removeTagBtn.classList.add("disabled");

    removeTagSelect.removeChild(document.querySelector(`option[value='${tag}']`)!);
    tagList.splice(tagList.indexOf(tag), 1);
    browser.storage.local.set({tags: tagList}).then(() => {
        // Enable all related buttons
        excludeTagBtn.classList.remove("disabled");
        removeTagBtn.classList.remove("disabled");

        browser.runtime.sendMessage(SETTINGS_CHANGED).then();
    });
}