chrome.storage.sync.get("top100", ({ top100 }) => {
	const username = document.querySelector("#zona-mijloc > div > div:nth-child(4) > div.row > div.col-md-4.bg-body-tertiary.rounded > div.text-center.rounded.border.my-3.p-3 > h2 > span").innerText.replace(/ /g, "").toLowerCase();
	if (top100.includes(username))
		document.querySelector(`#zona-mijloc > div > div:nth-child(4) >
		div.row >
		div.col-md-4.bg-body-tertiary.rounded >
		div.center.padding18`).innerHTML += `<span style="
		position: fixed; z-index: 999; font-size: xxx-large; translate: -45px
		135px; background: #2b3035; border-radius: 100%; width: 70px; height: 70px;
		">👑</span> `;
});
