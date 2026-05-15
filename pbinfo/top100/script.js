"use strict";

chrome.storage.sync.set({
	top100: [...document.querySelectorAll("table tbody tr td:nth-child(2)")].map(e => e.innerText.replace(/ /g, "").toLowerCase().split("(")[0]),
	lastUpdatedTop100: Date.now()
});

if (new URLSearchParams(window.location.search).has("closeautomatically") === true)
	window.close();
