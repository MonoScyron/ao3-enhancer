// ==UserScript==
// @name            AO3 Enhancer
// @namespace       https://github.com/MonoScyron/ao3-enhancer
// @version         0.4.51
// @description     Enhancment script for AO3
// @author          MonoScyron
// @updateURL       https://raw.githubusercontent.com/MonoScyron/ao3-enhancer/main/ao3-enhancer.js
// @downloadURL     https://raw.githubusercontent.com/MonoScyron/ao3-enhancer/main/ao3-enhancer.js
// @match           https://archiveofourown.org/*
// @icon            https://archiveofourown.org/images/ao3_logos/logo_42.png
// ==/UserScript==

// TODO: Convert into extension

const enhancerStyles = `
.toggle-button {
    width: .1608em;
    float: right;
    margin: .3215em;
    background-image: none;
}

.toggle-button:focus {
    outline: none;
}

.toggle-off {
    background-color: rgb(245, 171, 182);
}
.toggle-on {
    background-color: rgb(166, 240, 166);
}

#settings-icon {
    width: 1.286em;
    vertical-align: middle;
    padding-right: 5px;
    outline: none;
}

li a.li-enhancer-a {
    display: inline-block !important;
}

li a.li-enhancer-a:focus,
li a.li-enhancer-a:hover,
li a.li-enhancer-a:active {
    outline: none !important;
    background: none !important;
}

`;

(function() {
    "use strict";

    // Add enhancer styles to doc
    var enhancerStyleSheet = document.createElement("style");
    enhancerStyleSheet.innerText = enhancerStyles;
    enhancerStyleSheet.id = "enhancer-style";
    document.head.appendChild(enhancerStyleSheet);

    // Add TOS tokens
    if(window.localStorage.getItem("accepted_tos") == null) {
        window.localStorage.setItem("accepted_tos", "20180523");
        location.reload();
    }

    // If first use of enhancer, add setting tokens
    if(localStorage.length <= 1) {
        localStorage.setItem("kudosRatio", 1);
    }

    // * Settings dropdown button HTML
    // Settings dropdown button
    var settingsBtn = document.createElement("li");
    settingsBtn.className = "dropdown";
    settingsBtn.setAttribute("aria-haspopup", "true");

    // Settings dropdown text
    var settingsLink = document.createElement("a");
    settingsLink.href = "/menu/fandoms";
    settingsLink.className = "dropdown-toggle";
    settingsLink.setAttribute("data-toggle", "dropdown");
    settingsLink.setAttribute("data-target", "#");

    var settingsLinkText = document.createElement("div");
    settingsLinkText.innerHTML = "Enhancer";

    settingsLink.appendChild(settingsLinkText);
    settingsBtn.appendChild(settingsLink);

    // Settings dropdown menu element
    var dropdown = document.createElement("ul");
    dropdown.className = "menu dropdown-menu";
    dropdown.setAttribute("role", "menu");

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

    // TODO: Convert this into an auto exclude thing
    // Dropdown show visited works
    var liShowVisited = document.createElement("li");
    var liShowVisited_a = document.createElement("a");
    liShowVisited_a.innerHTML = "Show Visited";
    liShowVisited_a.className = "li-enhancer-a";
    var liShowVisitedBtn = document.createElement("button");
    setDropdownButtonClasses(liShowVisitedBtn, "showVisited");

    liShowVisited.append(liShowVisited_a, liShowVisitedBtn);


    // * Append settings dropdown to doc after everything is done
    // Append all settings to dropdown
    dropdown.append(
        liKudosRatio
    );
    settingsBtn.appendChild(dropdown);

    var parent = document
        .getElementsByClassName("primary navigation actions")
        .item(0);
    parent.insertBefore(settingsBtn, parent.lastChild);

    /**
     * Given a button, gets the value of the key in local storage and sets the button's inital classes.
     * @param {HTMLButtonElement} button Button to set classes of
     * @param {string} key Key of the button
     */
    function setDropdownButtonClasses(button, key) {
        if(localStorage.getItem(key) != 0) {
            button.className = "toggle-button toggle-on";
        } else {
            button.className = "toggle-button toggle-off";
        }
    }
})();