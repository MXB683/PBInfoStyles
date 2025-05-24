"use strict";

document.querySelectorAll(".setting.switch").forEach((element) => {
  element.addEventListener("click", () => {
    element.classList.toggle("active");
    chrome.storage.sync.set({
      [element.id]: element.classList.contains("active"),
    });
  });
});

document.getElementById("font").addEventListener("change", () => {
  chrome.storage.sync.set({
    font: document.getElementById("font").value,
  });
});
document.getElementById("fontLink").addEventListener("change", () => {
  chrome.storage.sync.set({
    fontLink: document.getElementById("fontLink").value,
  });
});

document.getElementById("closeAlgs").addEventListener("click", () => {
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
  chrome.storage.sync.set({ algorithms });
});

const restore = () => {
  chrome.storage.sync.get(
    {
      enableIcons: true,
      fontLigatures: true,
      font: "JetBrains Mono",
      fontLink: "https://fonts.cdnfonts.com/css/jetbrains-mono",
      algorithms: [{}],
      autoAuth: {
        enabled: false,
      },
      replaceCustomCharacters: false,
    },
    (
      items = {
        enableIcons: true,
        fontLigatures: true,
        font: "JetBrains Mono",
        fontLink: "https://fonts.cdnfonts.com/css/jetbrains-mono",
        algorithms: [{}],
        autoAuth: {
          enabled: false,
        },
        replaceCustomCharacters: false,
      }
    ) => {
      console.log(items);
      if (items.enableIcons)
        document.getElementById("enableIcons").classList.add("active");
      if (items.fontLigatures)
        document.getElementById("fontLigatures").classList.add("active");
      document.getElementById("font").value = items.font;
      document.getElementById("fontLink").value = items.fontLink;
      if (items.autoAuth.enabled)
        document.getElementById("autoAuth").classList.add("active");
      if (items.replaceCustomCharacters)
        document
          .getElementById("replaceCustomCharacters")
          .classList.add("active");
      // Algorithms
      items.algorithms.forEach((element) => {
        document
          .getElementById("algs")
          .appendChild(
            new AlgorithmNode(`%${element.title}%\n${element.algorithm}`)
          );
      });
    }
  );
};

document.getElementById("importTemplateAlgs").addEventListener("click", () => {
  document
    .querySelectorAll("fieldset.algorithm.default")
    .forEach((e) => e.remove());
  cppAlgorithms.forEach((alg) =>
    document.getElementById("algs").appendChild(alg)
  );
});

document.querySelectorAll("fieldset.algorithm.default").forEach((element) => {
  element.remove();
});

document.getElementById("addAlg").addEventListener("click", () => {
  let node = new AlgorithmNode("%New Algorithm%\n// Code here");
  node.innerHTML = node.innerHTML.replace("New Algorithm", "");
  node.innerHTML = node.innerHTML.replace("// Code here", "");
  document.getElementById("algs").appendChild(node);
});

const saveButton = document.getElementById("autoAuth-save");
saveButton.addEventListener("click", () => {
  const username = document.getElementById("autoAuth-username").value;
  const password = document.getElementById("autoAuth-password").value;
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

document.addEventListener("DOMContentLoaded", restore);

document.getElementById("saveCss").addEventListener("click", () => {
  const css = customCssEditor.getValue();
  chrome.storage.sync.set({ customCSS: css }, () => {
    document.getElementById("saveCss").innerText = "Saved!";
    setTimeout(() => {
      document.getElementById("saveCss").innerText = "Save";
    }, 1000);
  });
});

chrome.storage.sync.get(
  {
    customCSS: "",
  },
  (
    items = {
      customCSS: "",
    }
  ) => {
    customCssEditor.setValue(items.customCSS);
  }
);
