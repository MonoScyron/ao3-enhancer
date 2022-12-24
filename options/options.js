// * Storage keys
// Kudos to hit ratio
const kudosHitRatioKey = "kudos-hit-ratio";
// Language
const languageEnableKey = "language-enable";
const languageKey = "language";

// * Select input from document
// Kudos to hit ratio
let kudosHitRatioBtn = document.querySelector(`input[name='${kudosHitRatioKey}']`);
// Language
let languageBtn = document.querySelector(`input[name='${languageEnableKey}']`);
let languageSelect = document.querySelector(`select[name='${languageKey}']`);

// * Sync inputs to values saved in storage
// Kudos to hit ratio
browser.storage.local.get(kudosHitRatioKey).then((value) => {
    kudosHitRatioBtn.checked = value == "true";
});
// Language
browser.storage.local.get(languageEnableKey).then((value) => {
    languageBtn.checked = value == "true";
});
browser.storage.local.get(languageKey).then((value) => {
    languageSelect.value = value;
});

// * Save settings to local storage when value is changed
// Kudos to hit ratio
kudosHitRatioBtn.addEventListener("click", () =>
    browser.storage.local.set(
        { kudosHitRatioKey: kudosHitRatioBtn.checked }
    )
);
// Language
languageBtn.addEventListener("click", () =>
    browser.storage.local.set(
        { languageEnableKey: languageBtn.checked }
    )
);
languageSelect.addEventListener("change", () =>
    browser.storage.local.set(
        { languageKey: languageSelect.value }
    )
);