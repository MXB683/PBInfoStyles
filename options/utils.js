"use strict";

/**
 * This function takes a formatted string of `CSS`, parses it into an array of HTML elements, returns it and adds it to `node` if `addToPage` is true
 * @param {String} cssString CSS string to parse. Rulesets are separated by 2 new lines and rules are separated by `;` and a new line. If `cssString` is empty, a SyntaxError is thrown
 * @param {Node} addToNode Defines which node to add the resulted array of elements to. If `addToNode` is `undefined`, then the result will only be returned without appending the array to anything
 * @returns {HTMLFieldSetElement[]} Array of HTML fieldset elements
 * @throws {SyntaxError} If `cssString` is empty
 */
const parseCSS = (cssString, addToNode = undefined) => {
  if (!cssString) throw new SyntaxError("cssString must be a non-empty string");
  const rulesetElements = [document.createElement("fieldset")];
  rulesetElements.pop();
  const rulesets = cssString.split("\n\n");

  rulesets.forEach((ruleset) => {
    const rulesetElement = document.createElement("fieldset");
    rulesetElement.classList.add("ruleset");
    const legend = document.createElement("legend");
    legend.innerHTML = `
      <div class="removeRuleset">
        <svg
          fill="#666"
          height="30px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          />
        </svg>
      </div>
      <div class="input">
        <input type="text" class="selector" placeholder="<selector>" value="${ruleset
          .split("{")[0]
          .trimEnd()}"/>
      </div>
    `;
    rulesetElement.appendChild(legend);

    const addRuleButton = document.createElement("button");
    addRuleButton.classList.add("addRule");
    addRuleButton.innerText = "Add Rule";
    rulesetElement.appendChild(addRuleButton);

    const getRuleElement = (property, value) => {
      property = property.trim();
      value = value.replace(/;/g, "").trim();
      const ruleElement = document.createElement("div");
      ruleElement.classList.add("rule");
      ruleElement.innerHTML = `
        <div class="input">
          <input type="text" class="property" placeholder="<property>" value="${property}" />
        </div>
        <svg fill="#666" height="30px" viewBox="-64 0 256 256">
          <path
            d="M76.846 80a4 4 0 0 1 4.002 4.002V107.6a4.002 4.002 0 0 1-4.002 4.003H53.001A4 4 0 0 1 49 107.599V84.002A4.002 4.002 0 0 1 53.001 80h23.845zm0 64a4 4 0 0 1 4.002 4.002V171.6a4.002 4.002 0 0 1-4.002 4.003H53.001A4 4 0 0 1 49 171.599v-23.597A4.002 4.002 0 0 1 53.001 144h23.845z"
          />
        </svg>
        <div class="input small">
          <input type="text" class="value" placeholder="<value>" value="${value}" />
        </div>
        <div class="removeRule">
          <svg
            fill="#666"
            height="30px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </div>
      `;
      return ruleElement;
    };

    const rules = ruleset.split("\n");
    rules.shift();
    rules.pop();
    rules.forEach((rule) => {
      const ruleElement = getRuleElement(...rule.split(":"));
      rulesetElement.appendChild(ruleElement);
    });
    rulesetElements.push(rulesetElement);
  });

  if (addToNode) {
    rulesetElements.forEach((rulesetElement) => {
      addToNode.appendChild(rulesetElement);
    });
  }
  return rulesetElements;
};

/**
 * This class represents an algorithm in the form of a node
 * @constructor
 * @param {String} title The title of the algorithm
 * @param {Function} algorithm The algorithm function
 */
class AlgorithmNode extends HTMLFieldSetElement {
  /**
   * @type {String}
   * @description The title of the algorithm
   */
  title;
  /**
   * @type {String}
   * @description The plaintext code of the algorithm
   */
  code;
  /**
   * Default constructor of the AlgorithmNode class
   * @returns {AlgorithmNode}
   */
  constructBare(isDefault = true) {
    this.title = "%title%";
    this.code = "%code%";
    this.classList.add("algorithm");
    if (isDefault) this.classList.add("default");
    this.innerHTML = `
			<legend style="float: right;">
				<button>X</button>
			</legend>
			<input type="text" class="title" value="%title%" placeholder="Algorithm Title" />
			<br>
			<br>
			<textarea style="height: 10em; width: 20em;" placeholder="// Write code here and paste it into the editor on pbinfo.ro
// Accepts any programming language
//
// Scrie cod aici și lipește-l în editor-ul de pe pbinfo.ro
// Acceptă orice limbaj de programare">%code%</textarea>
		`;
    return this;
  }

  /**
   * Creates an algorithm node with the given title and code
   * @param {String} title The title of the algorithm
   * @param {String} code The plaintext code of the algorithm
   */
  constructWithTitleAndCode(title, code, isDefault = true) {
    this.constructBare(isDefault);
    this.innerHTML = this.innerHTML.replace(/%title%/g, title);
    this.title = title;
    this.innerHTML = this.innerHTML.replace(/%code%/g, code);
    this.code = code;
    return this;
  }

  /**
   * Creates an algorithm node with the formatted algorithm string
   * @param {String} algString The algorithm in this format: "%$title$%\n$code$", where `$title$` is the title of the algorithm and `$code$` is the plaintext code of the algorithm (e.g. algString = "%Hello World%\nprint('Hello World')"). Has to match the regex `/^%.+%\n(.|\n)*$/`
   * @throws {SyntaxError} If `algString` is empty or if the format is incorrect
   */
  constructor(algString, isDefault = true) {
    super();
    algString = algString.trim();
    if (!algString)
      throw new SyntaxError("algString must be a non-empty string");
    if (algString.match(/^%.+%\n(.|\n)*$/) === null)
      throw new SyntaxError(
        "algString must match the regex /^%.+%\\n(.|\\n)*$/"
      );

    const title = algString.split("\n")[0].replace(/%/g, "").trim();
    const code = algString.split("\n").slice(1).join("\n").trim();
    this.title = title;
    this.code = code;
    this.constructWithTitleAndCode(title, code, isDefault);
  }
}

customElements.define("algorithm-node", AlgorithmNode, { extends: "fieldset" });
