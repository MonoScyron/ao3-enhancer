/**
  * Adds kudos to hit ratios to works on the page
 * @param document Document of the page
 * @returns [Array of ratio labels, array of ratio values]
 */
export function addKudosToHitRatios(document: Document) {
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
        let kudos_dd = work.querySelector("dd.kudos")!;
        let hits_dd = work.querySelector("dd.hits")!;
        let hits = parseInt(hits_dd.innerHTML);

        // Get kudos & hits from work
        if(kudos_dd != null && hits_dd != null && hits > 0) {
            let ratio_dt = document.createElement("dt");
            ratio_dt.className = `kudos-to-hit-ratio`;
            ratio_dt.innerHTML = "Ratio:";

            let kudos: number;
            if(kudos_dd.firstChild!.nodeName == "A") {
                kudos = parseInt(kudos_dd.firstElementChild!.innerHTML);
            }
            else {
                kudos = parseInt(kudos_dd.innerHTML);
            }

            let ratio_dd = document.createElement("dd");
            ratio_dd.className = `ratio`;
            ratio_dd.innerHTML = Math.round((kudos / hits) * 1000) / 10 + "%";

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
            statsList[i].append(ratio_dtList[i]!, ratio_ddList[i]!);
        }
    }
}