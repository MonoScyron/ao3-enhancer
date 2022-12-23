// * Storage keys
const blockTagKey = "exclude-tag";
const kudosHitRatioKey = "kudos-hit-ratio";
const languageKey = "language";

let kudosHitRatioBtn = document.querySelector(`input[name='${kudosHitRatioKey}']`);

let languageSelect = document.querySelector(`select[name='${languageKey}']`);
let languageBtn = document.querySelector(``);

kudosHitRatioBtn.checked = browser.storage.sync.get(kudosHitRatioKey);

// * Every button should save settings to local storage when clicked
kudosHitRatioBtn.addEventListener("click", () =>
    browser.storage.local.set(
        { kudosHitRatioKey: kudosHitRatioBtn.checked }
    )
);