"use strict";
var generatedCSS = "";

const rulesetDefaultNode = document.querySelector(".ruleset").cloneNode(true);
const ruleDefaultNode = rulesetDefaultNode
  .querySelector(".rule")
  .cloneNode(true);

const generateCssButton = document.getElementById("generateCSS");
generateCssButton.addEventListener("click", () => {
  generatedCSS = "";
  document.querySelectorAll(".ruleset").forEach((ruleset) => {
    const selector = ruleset.querySelector("input.selector").value;
    generatedCSS += `${selector} {\n`;
    ruleset.querySelectorAll(".rule").forEach((rule) => {
      const property = rule.querySelector("input.property").value;
      const value = rule.querySelector("input.value").value;
      generatedCSS += `\t${property}: ${value};\n`;
    });
    generatedCSS += "}\n\n";
  });

  generateCssButton.innerHTML = "Success!";
  setTimeout(() => {
    generateCssButton.innerHTML = "Generate CSS";
  }, 1000);
});

document.querySelector("#addRuleset").addEventListener("click", () => {
  document
    .getElementById("rulesets")
    .appendChild(rulesetDefaultNode.cloneNode(true));
});

setInterval(() => {
  document.querySelectorAll(".removeRuleset").forEach((element) => {
    element.onclick = () => {
      element.parentElement.parentElement.remove();
    };
  });

  document.querySelectorAll(".addRule").forEach((element) => {
    element.onclick = () => {
      element.parentElement.appendChild(ruleDefaultNode.cloneNode(true));
    };
  });

  document.querySelectorAll("input.property").forEach((element) => {
    element.onkeydown = (event) => {
      if (event.key === ":") {
        event.preventDefault();
        element.parentElement.parentElement
          .querySelector("input.value")
          .focus();
      }
    };
  });

  document.querySelectorAll(".removeRule").forEach((element) => {
    element.onclick = () => {
      element.parentElement.remove();
    };
  });
}, 100);
