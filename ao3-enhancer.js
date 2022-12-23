// TODO: Convert into extension

(function() {
    "use strict";

    // ? Separate auto TOS out as toggable option
    // Add TOS tokens
    if(window.localStorage.getItem("accepted_tos") == null) {
        window.localStorage.setItem("accepted_tos", "20180523");
        location.reload();
    }

    // If first use of enhancer, add setting tokens
    if(localStorage.length <= 1) {
        localStorage.setItem("kudosRatio", 1);
    }

    // * Dropdown kudos/hit ratio
    var liKudosRatio = document.createElement("li");
    var liKudosRatio_a = document.createElement("a");
    liKudosRatio_a.innerHTML = "Kudos/hit Ratio";
    liKudosRatio_a.className = "li-enhancer-a";
    var liKudosRatioBtn = document.createElement("button");
    setDropdownButtonClasses(liKudosRatioBtn, "kudosRatio");
    // Create ratio elements for all works on page
    var ratio_dtList = [];
    var ratio_ddList = [];
    // Get list of works
    var workList;
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
    var statsList = [];

    if(document.URL.split('/')[3] == "works") {
        statsList = document.querySelectorAll("dl.stats");
    }
    else {
        statsList = document.querySelectorAll(".group[role='article'] dl.stats");
    }

    // Create list of ratio elements
    // TODO: Add classes for visibility
    for(var i = 0; i < workList.length; i++) {
        var work = workList[i];

        // Get kudos & hits from work
        if(work.querySelector("dd.kudos") != null && work.querySelector("dd.hits") != null) {
            var ratio_dt = document.createElement("dt");
            ratio_dt.className = "ratio";
            ratio_dt.innerHTML = "Ratio:";

            var kudos;
            if(work.querySelector("dd.kudos").firstChild.nodeName == "A") {
                kudos = parseInt(work.querySelector("dd.kudos").firstChild.innerHTML);
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

    // Add ratio elements if on
    if(localStorage.getItem("kudosRatio") != 0) {
        for(var i = 0; i < statsList.length; i++) {
            if(ratio_dtList[i] != null && ratio_ddList[i] != null) {
                statsList[i].append(ratio_dtList[i], ratio_ddList[i]);
            }
        }
    }

    // Set button onclick to add/remove ratio
    // TODO: Change to rely on CSS visibility instead of adding/removing elements directly
    liKudosRatioBtn.onclick = function() {
        if(localStorage.getItem("kudosRatio") != 0) {
            for(var i = 0; i < statsList.length; i++) {
                if(ratio_dtList[i] != null && ratio_ddList[i] != null) {
                    statsList[i].removeChild(ratio_dtList[i]);
                    statsList[i].removeChild(ratio_ddList[i]);
                }
            }
            localStorage.setItem("kudosRatio", 0);
            liKudosRatioBtn.className = "toggle-button toggle-off";
        }
        else {
            for(var i = 0; i < statsList.length; i++) {
                if(ratio_dtList[i] != null && ratio_ddList[i] != null) {
                    statsList[i].append(ratio_dtList[i], ratio_ddList[i]);
                }
            }
            localStorage.setItem("kudosRatio", 1);
            liKudosRatioBtn.className = "toggle-button toggle-on";
        }
    };

    liKudosRatio.append(liKudosRatio_a, liKudosRatioBtn);
})();