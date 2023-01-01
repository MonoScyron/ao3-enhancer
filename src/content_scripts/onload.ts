import { CATEGORY, getRedirectURL, ORIGIN, parseURL, RATING, redirectURLsRegex, TYPE, WARNING } from "../export/redirect";
import { _language } from "../export/constants";
import { addKudosToHitRatios } from '../export/crawler';

console.log(`AO3Extension: Extension loaded!`);

// Check to see if current url needs to be redirected
checkAO3URLs();
addKudosToHitRatios(document);

function checkAO3URLs() {
    redirectURLsRegex.forEach((url: string) => {
        if(window.location.href.match(url)) {
            // TODO: Handle urls w/ extra id tags at end
            // https://archiveofourown.org/users/BurstEdge/pseuds/BurstEdge/works?fandom_id=3828398
            // https://archiveofourown.org/works?commit=Sort+and+Filter&work_search[sort_column]=revised_at&include_work_search[rating_ids][]=13&work_search[other_tag_names]=&work_search[excluded_tag_names]=&work_search[crossover]=&work_search[complete]=&work_search[words_from]=&work_search[words_to]=&work_search[date_from]=&work_search[date_to]=&work_search[query]=&work_search[language_id]=&user_id=BurstEdge&fandom_id=3828398
            let parsed = parseURL(window.location.href);

            let type: TYPE;
            if(parsed[1] == 'works')
                type = TYPE.WORKS;
            else
                type = TYPE.BOOKMARKS;

            let origin: ORIGIN;
            if(parsed[0] == 'tags')
                origin = ORIGIN.TAGS;
            else if(parsed[0] == 'users')
                origin = ORIGIN.USERS;
            else
                origin = ORIGIN.COLLECTIONS;

            let id = parsed[2];

            let rating: RATING[] = [];
            let warning: WARNING[] = [];
            let category: CATEGORY[] = [];
            let tag: string[] = [];
            let crossover = "";
            let complete = "";
            let wordCount: number[] = [];
            let date: string[] = [];
            let query = "";
            let language = "";

            browser.storage.local.get([_language]).then((value) => {
                // Get exclude data from local storage
                if(value.language != undefined && value.language[0])
                    language = value.language[1];

                let url = getRedirectURL(origin, type, id, rating, warning, category, tag, crossover, complete, wordCount, date, query, language);
                if(url != null)
                    console.log(`AO3Extension: ${url}`);
                // window.location.replace(url);
            });
        }
    });
}