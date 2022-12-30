/**
 * Adds kudos to hit ratios to works on the page
 * @param {Document} document Document of the page
 */
export function addKudosToHitRatios(document: Document) {
    // Create ratio elements for all works on page
    var ratio_dtList = [];
    var ratio_ddList = [];

    // Get list of works
    let workList: HTMLCollectionOf<Element>;
    var type = document.querySelector('.group').classList[0];
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
    for(var i = 0; i < workList.length; i++) {
        var work = workList[i];

        // Get kudos & hits from work
        if(work.querySelector("dd.kudos") != null && work.querySelector("dd.hits") != null) {
            var ratio_dt = document.createElement("dt");
            ratio_dt.className = "kudos-to-hit-ratio";
            ratio_dt.innerHTML = "Ratio:";

            var kudos: number;
            if(work.querySelector("dd.kudos").firstChild.nodeName == "A") {
                kudos = parseInt(work.querySelector("dd.kudos").firstElementChild.innerHTML);
            }
            else {
                kudos = parseInt(work.querySelector("dd.kudos").innerHTML);
            }
            var hits = parseInt(work.querySelector("dd.hits").innerHTML);

            var ratio_dd = document.createElement("dd");
            ratio_dd.className = "ratio";
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
            statsList[i].append(ratio_dtList[i], ratio_ddList[i]);
        }
    }
}