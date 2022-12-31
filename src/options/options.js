// * Storage keys
// Kudos to hit ratio
const kudosHitRatioKey = "kudos-hit-ratio";
// Language
const languageKey = "language";

// * Select input from document
// Kudos to hit ratio
let kudosHitRatioBtn = document.querySelector(`input[name='${kudosHitRatioKey}']`);
// Language
let languageBtn = document.querySelector(`input[name='${languageKey}-enable']`);
let languageSelect = document.querySelector(`select[name='${languageKey}']`);

// * Sync inputs to values saved in storage
// Kudos to hit ratio
browser.storage.local.get(kudosHitRatioKey).then((value) => {
    kudosHitRatioBtn.checked = value == "true";
});
// Language
browser.storage.local.get(languageKey).then((value) => {
    languageBtn.checked = value[0] == "true";
    languageSelect.value = value[1];
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
        {
            languageKey:
                [
                    languageBtn.checked,
                    languageSelect.value
                ]
        }
    )
);