"use strict";

chrome.storage.sync.get(
  {
    algorithms: [{}],
  },
  (items = { algorithms: [{ title: "", algorithm: "" }] }) => {
    let algorithmMenuParentNode = document.querySelector(
      "#form-incarcare-solutie-wrapper > div.panel-body"
    );
    let selectMenu = document.createElement("select");
    selectMenu.classList.add("form-control");

    let blank_option = document.createElement("option");
    blank_option.setAttribute("value", "// Selectează un algoritm!");
    blank_option.innerText = "Copiază un algoritm în clipboard";
    
    selectMenu.appendChild(blank_option);
    items.algorithms.forEach((element) => {
      let option = document.createElement("option");
      option.setAttribute("value", `${element.algorithm}`);
      option.innerText = element.title;
      selectMenu.appendChild(option);
    });
    algorithmMenuParentNode.prepend(selectMenu);
    selectMenu.addEventListener("change", () => {
      navigator.clipboard.writeText(`${selectMenu.value}\n`)
    });
  }
);
