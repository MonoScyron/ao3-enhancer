// * Storage keys
// Kudos to hit ratio
const _kudosHitRatio = "kudosHitRatio";
// Language
const _language = "language";
// Query
const _query = "query";
// Tags/fandoms
const _tags = "tags";
// Default values
const _default_values = {
    kudosHitRatio: true,
    language: [false, ""],
    query: [false, ""],
    tags: []
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
let excludeTagBtn = document.querySelector(`input[name='exclude-tag-submit']`);
let removeTagSelect = document.querySelector(`select[name='remove-tag']`);
let removeTagBtn = document.querySelector(`input[name='remove-tag-submit']`);

// * Global vars
let tagList = [];

// * Sync inputs to values saved in storage
browser.storage.local.get([_kudosHitRatio, _tags, _language, _query]).then((store) => {
    //If no settings values are in storage, set default setting values in storage
    if(Object.keys(store).length == 0) {
        browser.storage.local.set(_default_values);
        syncSettings(_default_values);
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
excludeTagBtn.addEventListener("click", () => addTagElement(excludeTagInput.value));
removeTagBtn.addEventListener("click", () => removeTagElement(removeTagSelect.value));

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