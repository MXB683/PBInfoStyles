"use strict";

const save = () => {
  const icons = Boolean(document.getElementById("icons-enabled").checked);
  const fontLigatures = Boolean(
    document.getElementById("font-ligatures-enabled").checked
  );
  const font = document.getElementById("custom-font").value;
  const customFontLink = document.getElementById("custom-font-link").value;
  const researcherEnabled = false;
  // document.getElementById("researcherEnabled").checked;
  let algorithmNodes = document.querySelectorAll("#algs > fieldset.algorithm");
  let algorithms = [];
  algorithmNodes.forEach((element) => {
    try {
      algorithms.push({
        title: `${element.querySelector("input.title").value}`,
        algorithm: `${element.querySelector("textarea").value}`,
      });
    } catch (error) {
      console.log(error);
    }
  });
  const replaceCustomCharacters = document.getElementById(
    "replace-custom-characters"
  ).checked;
  chrome.storage.sync.set(
    {
      icons,
      fontLigatures,
      font,
      customFontLink,
      algorithms,
      researcherEnabled,
      replaceCustomCharacters,
    },
    () => {
      console.log({
        icons,
        fontLigatures,
        font,
        customFontLink,
        algorithms,
        researcherEnabled,
        replaceCustomCharacters,
      });
      document.getElementById("save").classList.add("active");
      document.getElementById("save_text").innerText = document
        .getElementById("save")
        .innerText.replace("Save Settings", "Saved!");
      document.getElementById("save").style.backgroundColor =
        "rgb(0, 255, 128)";
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
      });
      setTimeout(() => {
        document.getElementById("save_text").innerText = document
          .getElementById("save")
          .innerText.replace("Saved!", "Save Settings");
        document.getElementById("save").style.backgroundColor =
          "rgb(240, 240, 240)";
        document.getElementById("save").classList.remove("active");
      }, 3000);
    }
  );
};

const restore = () => {
  chrome.storage.sync.get(
    {
      icons: true,
      fontLigatures: true,
      font: "cascadia code",
      customFontLink:
        "@import url('https://fonts.cdnfonts.com/css/cascadia-code');",
      algorithms: [{}],
      autoAuth: {
        enabled: false,
      },
      researcherEnabled: false,
      replaceCustomCharacters: false,
    },
    (
      items = {
        icons: true,
        fontLigatures: true,
        font: "cascadia code",
        customFontLink:
          "@import url('https://fonts.cdnfonts.com/css/cascadia-code');",
        algorithms: [{}],
        autoAuth: {
          enabled: false,
        },
        researcherEnabled: false,
        replaceCustomCharacters: false,
      }
    ) => {
      console.log(items);
      document.getElementById("icons-enabled").checked = items.icons;
      document.getElementById("font-ligatures-enabled").checked =
        items.fontLigatures;
      document.getElementById("custom-font").value = items.font;
      document.getElementById("custom-font-link").value = items.customFontLink;
      document.getElementById("auto-auth").checked = items.autoAuth.enabled;
      document.getElementById("researcherEnabled").checked =
        items.researcherEnabled;
      document.getElementById("replace-custom-characters").checked =
        items.replaceCustomCharacters;
      // Algorithms
      items.algorithms.forEach((element) => {
        let node = document.createElement("fieldset");
        node.classList.add("algorithm");

        // Legend
        let legend = document.createElement("legend");
        let button = document.createElement("button");
        button.innerText = "X";
        legend.style.float = "right";
        legend.appendChild(button);
        node.appendChild(legend);

        // Input
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.classList.add("title");
        input.value = element.title;
        node.appendChild(input);

        // Line breaks
        node.appendChild(document.createElement("br"));
        node.appendChild(document.createElement("br"));

        // Textarea
        let textarea = document.createElement("textarea");
        textarea.style.height = "10em";
        textarea.style.width = "20em";
        textarea.setAttribute(
          "placeholder",
          `// Write code here and paste it into the editor on pbinfo.ro
// Accepts any programming language
//
// Scrie cod aici și lipește-l în editor-ul de pe pbinfo.ro
// Acceptă orice limbaj de programare`
        );
        textarea.value = element.algorithm;
        node.appendChild(textarea);

        document.getElementById("algs").appendChild(node);
      });
    }
  );
};

const showLigsHelp = () => {
  document.getElementById("ligaturesHelp").showModal();
};

const hideLigsHelp = () => {
  document.getElementById("ligaturesHelp").close();
};

document.getElementById("algConfig").addEventListener("click", () => {
  document.getElementById("algs").showModal();
});

document.getElementById("closeAlgs").addEventListener("click", () => {
  document.getElementById("algs").close();
});

document.getElementById("cssConfig").addEventListener("click", () => {
  document.getElementById("css").showModal();
});

document.getElementById("closeCSS").addEventListener("click", () => {
  document.getElementById("css").close();
});

document
  .getElementById("switchToAdvancedMode")
  .addEventListener("click", () => {
    document.getElementById("advancedMode").style.display = "block";
    document.getElementById("easyMode").style.display = "none";
  });

document.getElementById("switchToEasyMode").addEventListener("click", () => {
  document.getElementById("advancedMode").style.display = "none";
  document.getElementById("easyMode").style.display = "block";
});

let algorithmNode = document
  .querySelector("fieldset.algorithm")
  .cloneNode(true);
algorithmNode.classList.remove("default");

document.querySelectorAll("fieldset.algorithm.default").forEach((element) => {
  element.remove();
});

document.getElementById("addAlg").addEventListener("click", () => {
  let node = algorithmNode.cloneNode(true);
  document.getElementById("algs").appendChild(node);
});

setInterval(() => {
  document
    .querySelectorAll("fieldset.algorithm > legend > button")
    .forEach((element) => {
      element.onclick = () => {
        element.parentElement.parentElement.remove();
        //  |        |              |
        //  V        V              V
        // btn  |  legend   |   fieldset
      };
    });
}, 1000);

document.getElementById("auto-auth").addEventListener("change", (event) => {
  const credentialsElement = document.getElementById("auto-auth-credentials");
  if (event.target.checked) {
    credentialsElement.style.display = "block";
  } else {
    credentialsElement.style.display = "none";
  }
});

const saveButton = document.getElementById("auto-auth-save");
saveButton.addEventListener("click", () => {
  const username = document.getElementById("auto-auth-username").value;
  const password = document.getElementById("auto-auth-password").value;
  chrome.storage.sync.set(
    {
      autoAuth: {
        enabled: true,
        username,
        password,
      },
    },
    () => {
      saveButton.innerHTML = "Saved credentials";
      saveButton.style.backgroundColor = "rgb(0, 255, 128)";
      setTimeout(() => {
        saveButton.innerHTML = "Save credentials";
        saveButton.style.backgroundColor = "rgb(240, 240, 240)";
      }, 2000);
    }
  );
});

document.getElementById("auto-auth").addEventListener("change", (event) => {
  if (event.target.checked) return;
  chrome.storage.sync.set({
    autoAuth: {
      enabled: false,
    },
  });
});

document.getElementById("hideLigsHelp").addEventListener("click", hideLigsHelp);
document.getElementById("showLigsHelp").addEventListener("click", showLigsHelp);
document.getElementById("save").addEventListener("click", save);
document.addEventListener("DOMContentLoaded", restore);

// SECTION - Custom CSS

// ANCHOR - Save CSS
const saveCustomCSS = (css = "", sucessAction = () => {}) => {
  console.log("Saving CSS");
  chrome.storage.sync.set(
    {
      customCSS: css,
    },
    sucessAction
  );
};

/**
 * @type {HTMLIFrameElement}
 */
const cssIframe = document.getElementById("cssIframe");
/**
 * @type {HTMLTextAreaElement}
 */
const cssTextArea = document.getElementById("cssTextarea");

cssIframe.addEventListener("load", () => {
  cssIframe.contentDocument
    .getElementById("generateCSS")
    .addEventListener("click", () => {
      console.log("%cGenerated CSS:", "font-size: 20px");
      console.log(cssIframe.contentWindow.generatedCSS);
      saveCustomCSS(cssIframe.contentWindow.generatedCSS);
    });
});

document.getElementById("saveAdvancedCSS").addEventListener("click", () => {
  saveCustomCSS(cssTextArea.value);
});

// ANCHOR - Load saved CSS

chrome.storage.sync.get(
  {
    customCSS: "",
  },
  (
    items = {
      customCSS: "",
    }
  ) => {
    cssTextArea.value = items.customCSS;
    const parsedFieldsets = parseCSS(items.customCSS);
    cssIframe.onload = () => {
      cssIframe.contentDocument
        .querySelector("#rulesets > fieldset:only-child")
        .remove();
      parsedFieldsets.forEach((fieldset) => {
        cssIframe.contentDocument
          .getElementById("rulesets")
          .appendChild(fieldset);
      });
    };
    console.log(parsedFieldsets);
  }
);

// !SECTION - Custom CSS
