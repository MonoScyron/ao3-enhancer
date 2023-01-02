// * Storage keys
// Kudos to hit ratio
const _kudosHitRatio = "kudosHitRatio";
// Language
const _language = "language";
// Query
const _query = "query";
// Default values
const _default_values = {
    kudosHitRatio: true,
    language: [false, ""],
    query: [false, ""]
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

// * Sync inputs to values saved in storage
browser.storage.local.get([_kudosHitRatio, _language, _query]).then((store) => {
    //If no settings values are in storage, set default setting values in storage
    if(Object.keys(store).length == 0) {
        browser.storage.local.set(_default_values);

        // Kudos to hit ratio
        kudosHitRatioBtn.checked = _default_values.kudosHitRatio;
        // Language
        languageBtn.checked = _default_values.language[0];
        languageSelect.value = _default_values.language[1];
        // Query
        queryBtn.checked = _default_values.query[0];
        queryInput.value = _default_values.query[1];
    }
    else {
        // Kudos to hit ratio
        kudosHitRatioBtn.checked = store.kudosHitRatio;
        // Language
        languageBtn.checked = store.language[0];
        languageSelect.value = store.language[1];
        // Query
        queryBtn.checked = store.query[0];
        queryInput.value = store.query[1];
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
    browser.storage.local.set({
        language: [
            languageBtn.checked,
            languageSelect.value
        ]
    });
}
languageBtn.addEventListener("click", setLanguageStorage);
languageSelect.addEventListener("change", setLanguageStorage);

// Query
function setQueryStorage() {
    browser.storage.local.set({
        query: [
            queryBtn.checked,
            queryInput.value
        ]
    });
}
queryBtn.addEventListener("click", setQueryStorage);
queryInput.addEventListener("input", setQueryStorage);