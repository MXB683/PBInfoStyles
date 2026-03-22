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
    this.classList.add("scale-in-out");
    this.classList.add("inView");
    if (isDefault) this.classList.add("default");
    this.innerHTML = `
      <div class="algTopRow">
        <input type="text" class="title" value="%title%" />
        <button class="makeTextareaFullscreen">
          <i class="fa fa-expand" aria-hidden="true"></i>
        </button>
        <button class="deleteAlg">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>
      <textarea placeholder="// Write code here and paste it into the editor on pbinfo.ro
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
    let failed = false;
    algString = algString.trim();
    if (!algString) {
      console.error("algString must be a non-empty string");
      failed = true;
    }
    if (algString.match(/^%.+%\n(.|\n)*$/) === null) {
      failed = true;
      console.error("algString must match the regex /^%.+%\\n(.|\\n)*$/");
    }

    const title = failed
      ? ""
      : algString.split("\n")[0].replace(/%/g, "").trim();
    const code = failed ? "" : algString.split("\n").slice(1).join("\n").trim();
    this.title = title;
    this.code = code;
    this.constructWithTitleAndCode(title, code, isDefault);
  }
}
customElements.define("algorithm-node", AlgorithmNode, { extends: "fieldset" });
