import { STORAGE_KEYS, DEFAULT_VALUES, SETTINGS_CHANGED, } from '../export/constants';
import { WARNING, idToWarningEnum } from '../export/enums';

// * Select input from document
// Kudos to hit ratio
const kudosHitRatioBtn = document.querySelector(`input[name='kudos-hit-ratio']`)! as HTMLInputElement;
// Enable filtering
const filterBtn = document.querySelector(`input[name='enable-filtering']`)! as HTMLInputElement;
// Language
const languageSelect = document.querySelector(`select[name='language']`)! as HTMLSelectElement;
// Query
const queryInput = document.querySelector(`input[name='query']`)! as HTMLInputElement;
// Tags/fandoms
const excludeTagInput = document.querySelector(`input[name='exclude-tag']`)! as HTMLInputElement;
const excludeTagBtn = document.getElementById(`exclude-tag-submit`)! as HTMLButtonElement;
const removeTagSelect = document.querySelector(`select[name='remove-tag']`)! as HTMLSelectElement;
const removeTagBtn = document.getElementById(`remove-tag-submit`)! as HTMLButtonElement;
// Warnings
const excludeWarningCheckbox = {
    choseNotToUse: document.querySelector(`input[name='exclude-warning-chose-not-to-use']`)! as HTMLInputElement,
    violence: document.querySelector(`input[name='exclude-warning-violence']`)! as HTMLInputElement,
    mcd: document.querySelector(`input[name='exclude-warning-mcd']`)! as HTMLInputElement,
    nonCon: document.querySelector(`input[name='exclude-warning-non-con']`)! as HTMLInputElement,
    underage: document.querySelector(`input[name='exclude-warning-underage']`)! as HTMLInputElement,
    noWarnings: document.querySelector(`input[name='exclude-warning-no-warnings']`)! as HTMLInputElement
};
// TODO: Select inputs for crossover, completion, word count, and update date

// * Constant elements defined here
// Options whose visibility depends on if filtering is enabled
const FILTERING_ELEMENTS = document.getElementsByClassName("filtering");

// * Global vars
let tagList: string[] = [];
let warningList: WARNING[] = [];

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
// TODO: Save settings when values are changed for crossover, completion, word count, and update date
// Kudos to hit ratio
kudosHitRatioBtn.addEventListener("change", () => {
    browser.storage.local.set({ kudosHitRatio: kudosHitRatioBtn.checked }).then(() =>
        browser.runtime.sendMessage(SETTINGS_CHANGED)
    );
});

// Enable filtering
filterBtn.addEventListener("change", () => {
    browser.storage.local.set({ filtering: filterBtn.checked }).then(() =>
        browser.runtime.sendMessage(SETTINGS_CHANGED)
    );
    checkFilteringElements(filterBtn.checked);
});

// Language
function setLanguageStorage() {
    // Disable all related inputs
    languageSelect.classList.add("disabled");

    browser.storage.local.set({
        language: languageSelect.value
    }).then(() => {
        // Enable all related inputs
        languageSelect.classList.remove("disabled");

        browser.runtime.sendMessage(SETTINGS_CHANGED);
    });
}
languageSelect.addEventListener("change", setLanguageStorage);

// Query
function setQueryStorage() {
    // Disable all related inputs
    queryInput.classList.add("disabled");

    browser.storage.local.set({
        query: queryInput.value
    }).then(() => {
        // Enable all related inputs
        queryInput.classList.remove("disabled");

        browser.runtime.sendMessage(SETTINGS_CHANGED);
    });
}
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
function addExcludeWarningListener(checkbox: HTMLInputElement) {
    checkbox.addEventListener("change", () => {
        var checked = checkbox.checked;
        var val = parseInt(checkbox.getAttribute("value")!)
        var index = warningList.indexOf(idToWarningEnum(val));
        if(checked && index == -1)
            warningList.push(idToWarningEnum(val));
        else if(!checked)
            warningList.splice(index, 1);
        browser.storage.local.set({ warnings: warningList }).then(() =>
            browser.runtime.sendMessage(SETTINGS_CHANGED)
        );
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
function syncSettings(obj: { [key: string]: any }) {
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
        var tagElement = document.createElement('option');
        tagElement.value = tag;
        tagElement.innerText = tag;
        removeTagSelect.appendChild(tagElement);
    });
    // Warnings
    obj.warnings.forEach((e: number) => {
        warningList.push(idToWarningEnum(e));
    });
    excludeWarningCheckbox.choseNotToUse.checked = obj.warnings.indexOf(
        parseInt(excludeWarningCheckbox.choseNotToUse.getAttribute("value")!)) != -1;
    excludeWarningCheckbox.violence.checked = obj.warnings.indexOf(
        parseInt(excludeWarningCheckbox.violence.getAttribute("value")!)) != -1;
    excludeWarningCheckbox.mcd.checked = obj.warnings.indexOf(
        parseInt(excludeWarningCheckbox.mcd.getAttribute("value")!)) != -1;
    excludeWarningCheckbox.nonCon.checked = obj.warnings.indexOf(
        parseInt(excludeWarningCheckbox.nonCon.getAttribute("value")!)) != -1;
    excludeWarningCheckbox.underage.checked = obj.warnings.indexOf(
        parseInt(excludeWarningCheckbox.underage.getAttribute("value")!)) != -1;
    excludeWarningCheckbox.noWarnings.checked = obj.warnings.indexOf(
        parseInt(excludeWarningCheckbox.noWarnings.getAttribute("value")!)) != -1;

    // TODO: Sync settings for crossover, completion, word count, and update date
}

/**
 * Hide/show all filtering elements
 * @param filtering If filtering is enabled
 */
function checkFilteringElements(filtering: boolean) {
    if(filtering)
        for(var i = 0; i < FILTERING_ELEMENTS.length; i++)
            FILTERING_ELEMENTS.item(i)?.classList.remove("hidden");
    else
        for(var i = 0; i < FILTERING_ELEMENTS.length; i++)
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
        var tagElement = document.createElement('option');
        tagElement.value = tag;
        tagElement.innerText = tag;

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
function removeTagElement(tag: any) {
    // Disable all related buttons
    excludeTagBtn.classList.add("disabled");
    removeTagBtn.classList.add("disabled");

    removeTagSelect.removeChild(document.querySelector(`option[value='${tag}']`)!);
    tagList.splice(tagList.indexOf(tag), 1);
    browser.storage.local.set({ tags: tagList }).then(() => {
        // Enable all related buttons
        excludeTagBtn.classList.remove("disabled");
        removeTagBtn.classList.remove("disabled");

        browser.runtime.sendMessage(SETTINGS_CHANGED);
    });
}