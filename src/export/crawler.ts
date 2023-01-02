import { _kudosHitRatio } from "./constants";

/**
  * Adds kudos to hit ratios to works on the page
 * @param {Document} document Document of the page
 * @returns [Array of ratio labels, array of ratio values]
 */
export function addKudosToHitRatios(document: Document): [ratio_dtList: (HTMLElement | null)[], ratio_ddList: (HTMLElement | null)[]] {
    // Create ratio elements for all works on page
    let ratio_dtList: (HTMLElement | null)[] = [];
    let ratio_ddList: (HTMLElement | null)[] = [];

    // Get list of works
    let workList: HTMLCollectionOf<Element>;
    let type = document.querySelector('.group')?.classList[0];
    if(document.URL.split('/')[3] == "works") {
        workList = document.getElementsByClassName("work meta group"); // meta
    }
    else if(type == "bookmark" || type == "work") {
        workList = document.getElementsByClassName(type + " blurb group");
    }
    else {
        workList = document.getElementsByClassName("work blurb group");
    }

    // Get list of work stats
    let statsList: NodeListOf<Element>;
    if(document.URL.split('/')[3] == "works") {
        statsList = document.querySelectorAll("dl.stats");
    }
    else {
        statsList = document.querySelectorAll(".group[role='article'] dl.stats");
    }

    // Create list of ratio elements
    for(let i = 0; i < workList.length; i++) {
        let work = workList[i];

        // Get kudos & hits from work
        if(work.querySelector("dd.kudos") != null && work.querySelector("dd.hits") != null) {
            let ratio_dt = document.createElement("dt");
            ratio_dt.className = "kudos-to-hit-ratio ao3-extension-hidden";
            ratio_dt.innerHTML = "Ratio:";

            let kudos: number;
            // @ts-ignore
            if(work.querySelector("dd.kudos").firstChild.nodeName == "A") {
                // @ts-ignore
                kudos = parseInt(work.querySelector("dd.kudos").firstElementChild.innerHTML);
            }
            else {
                // @ts-ignore
                kudos = parseInt(work.querySelector("dd.kudos").innerHTML);
            }
            // @ts-ignore
            let hits = parseInt(work.querySelector("dd.hits").innerHTML);

            let ratio_dd = document.createElement("dd");
            ratio_dd.className = "ratio ao3-extension-hidden";
            if(hits > 0) {
                ratio_dd.innerHTML = Math.round((kudos / hits) * 1000) / 10 + "%";
            }
            else {
                ratio_dd.innerHTML = "0";
            }

            ratio_dtList[i] = ratio_dt;
            ratio_ddList[i] = ratio_dd;
        }
        else {
            ratio_dtList[i] = null;
            ratio_ddList[i] = null;
        }
    }

    // Add list of ratio elements to works
    for(var i = 0; i < statsList.length; i++) {
        if(ratio_dtList[i] != null && ratio_ddList[i] != null) {
            // @ts-ignore
            statsList[i].append(ratio_dtList[i], ratio_ddList[i]);
        }
    }

    browser.storage.local.get(_kudosHitRatio).then((value) => {
        if(value.kudosHitRatio)
            showRatios(ratio_dtList, ratio_ddList);
    });

    return [ratio_dtList, ratio_ddList];
}

/**
 * Removes the hidden class from all ratio elements, showing them in the stats list
 * @param ratio_dtList Array of ratio labels
 * @param ratio_ddList Array of ratio values
 */
function showRatios(ratio_dtList: (HTMLElement | null)[], ratio_ddList: (HTMLElement | null)[]) {
    ratio_dtList.forEach((ratio_dt) => {
        if(ratio_dt != null && ratio_dt.classList.contains("ao3-extension-hidden")) {
            ratio_dt.classList.remove("ao3-extension-hidden");
        }
    });
    ratio_ddList.forEach((ratio_dd) => {
        if(ratio_dd != null && ratio_dd.classList.contains("ao3-extension-hidden")) {
            ratio_dd.classList.remove("ao3-extension-hidden");
        }
    });
}