// * Storage keys
// Kudos to hit ratio
const _kudosHitRatio = "kudosHitRatio";
// Language
const _language = "language";

// * Select input from document
// Kudos to hit ratio
let kudosHitRatioBtn = document.querySelector(`input[name='kudos-hit-ratio']`);
// Language
let languageBtn = document.querySelector(`input[name='language-enable']`);
let languageSelect = document.querySelector(`select[name='language']`);

// * Sync inputs to values saved in storage
// Kudos to hit ratio
browser.storage.local.get([_kudosHitRatio, _language]).then((value) => {
    if(Object.keys(value).length == 0) {
        browser.storage.local.set({
            kudosHitRatio: kudosHitRatioBtn.checked,
            language:
                [
                    languageBtn.checked,
                    languageSelect.value
                ]
        });
    }
    else {
        // Kudos to hit ratio
        kudosHitRatioBtn.checked = value.kudosHitRatio;
        // Language
        languageBtn.checked = value.language[0];
        languageSelect.value = value.language[1];
    }
});

// * Save settings to local storage when value is changed
// Kudos to hit ratio
kudosHitRatioBtn.addEventListener("click", () =>
    browser.storage.local.set(
        { kudosHitRatio: kudosHitRatioBtn.checked }
    )
);
// Language
languageBtn.addEventListener("click", () => browser.storage.local.set(
    {
        language:
            [
                languageBtn.checked,
                languageSelect.value
            ]
    }
));
languageSelect.addEventListener("change", () => browser.storage.local.set(
    {
        language:
            [
                languageBtn.checked,
                languageSelect.value
            ]
    }
));