// ==UserScript==
// @name         Testing
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://archiveofourown.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=archiveofourown.org
// @grant        none
// ==/UserScript==

// TODO: DELETE THIS FILE, THIS SHOULD ONLY BE USED FOR TESTING

const style = `.hidden-work.hidden .show-text,
.hidden-work .hide-text {
    display: inline-block;
}

.hidden-work .show-text,
.hidden-work.hidden .hide-text {
    display: none;
}

.show-button {
    cursor: pointer;
    float: right;
    padding: 5px;
    position: relative;
    z-index: 10;
}

.show-div,
.show-button,
.show-div a {
    visibility: visible;
}

.show-div p.datetime {
    position: relative;
    float: right;
    margin: 11px;
    padding-right: 5px;
}

.hidden * {
    visibility: collapse;
}`;

// TODO: Style work so that collapsed works aren't so fat

(function() {
    'use strict';
    var s = document.createElement("style");
    s.innerHTML = style;
    document.head.append(s);

    var work = document.querySelector('.work.blurb.group');
    work.classList.add('hidden-work');
    work.classList.add('hidden');

    var showDiv = document.createElement('div');
    showDiv.className = 'show-div';
    showDiv.innerHTML = `
    <div class="actions show-button">
        <a class="show-text">Show Work</a>
        <a class="hide-text">Hide Work</a>
    </div>
    `;

    var showBtn = showDiv.querySelector('.show-button');
    showBtn.addEventListener('click', () => {
        if(work.classList.contains('hidden'))
            work.classList.remove('hidden');
        else
            work.classList.add('hidden');
    });

    work.insertBefore(showDiv, work.firstChild);
    var datetime = work.querySelector('p.datetime');
    showDiv.appendChild(datetime);
})();