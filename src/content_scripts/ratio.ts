import { constructWorkList } from "./works";

/**
  * Adds kudos to hit ratios to works on the page
 * @param document Document of the page
 * @returns [Array of ratio labels, array of ratio values]
 */
export function addKudosToHitRatios(document: Document) {
    // Get list of works
    let workList = constructWorkList(document);

    // Get list of work stats
    let statsList: NodeListOf<Element>;
    if(document.URL.split('/')[3] == "works") {
        statsList = document.querySelectorAll("dl.stats");
    }
    else {
        statsList = document.querySelectorAll(".group[role='article'] dl.stats");
    }

    // Create ratio elements for all works on page
    let ratio_dtList: (HTMLElement | null)[] = [];
    let ratio_ddList: (HTMLElement | null)[] = [];

    workList.forEach((work, i) => {
        if(work.stats.kudos != null && work.stats.hits != 0) {
            var ratio_dt = document.createElement("dt");
            ratio_dt.className = `kudos-to-hit-ratio`;
            ratio_dt.innerHTML = "Ratio:";

            var ratio_dd = document.createElement("dd");
            ratio_dd.className = `ratio`;
            ratio_dd.innerHTML = Math.round((work.stats.kudos / work.stats.hits) * 1000) / 10 + "%";

            ratio_dtList[i] = ratio_dt;
            ratio_ddList[i] = ratio_dd;
        }
        else {
            ratio_dtList[i] = null;
            ratio_ddList[i] = null;
        }
    });

    // Add list of ratio elements to works
    for(var i = 0; i < statsList.length; i++) {
        if(ratio_dtList[i] != null && ratio_ddList[i] != null) {
            statsList[i].append(ratio_dtList[i]!, ratio_ddList[i]!);
        }
    }
}