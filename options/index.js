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

const saveAlgs = async () => {
  let algorithms = [];
  await chrome.storage.sync.get({ algorithms: [] }, (items) => {
    algorithms = items.algorithms;
  });

  let algorithmNodes = document.querySelectorAll(
    "#algFieldsetContainer fieldset.algorithm"
  );
  algorithmNodes.forEach((element) => {
    if (
      algorithms.find(
        (e) => e.title === element.querySelector("input.title").value
      )
    ) {
      return;
    }
    algorithms.push({
      title: `${element.querySelector("input.title").value}`,
      algorithm: `${element.querySelector("textarea").value}`,
    });
  });
  chrome.storage.sync.set({ algorithms }, () => {
    document.getElementById("saveAlgsIcon").classList.remove("fa-floppy-disk");
    document.getElementById("saveAlgsIcon").classList.add("fa-check");
    setTimeout(() => {
      document.getElementById("saveAlgsIcon").classList.remove("fa-check");
      document.getElementById("saveAlgsIcon").classList.add("fa-floppy-disk");
    }, 500);
  });
};

document.getElementById("saveAlgs").addEventListener("click", saveAlgs);

const restore = () => {
  chrome.storage.sync.get(
    {
      enableIcons: true,
      fontLigatures: true,
      font: "JetBrains Mono",
      fontLink: "https://fonts.cdnfonts.com/css/jetbrains-mono",
      algorithms: [],
      autoAuth: {
        enabled: false,
      },
      replaceCustomCharacters: false,
      scrollAnimations: false,
      oldProblemsPage: false,
      doStreaks: false,
    },
    (items) => {
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
      if (items.scrollAnimations)
        document.getElementById("scrollAnimations").classList.add("active");
      if (items.oldProblemsPage)
        document.getElementById("oldProblemsPage").classList.add("active");
      if (items.doStreaks)
        document.getElementById("doStreaks").classList.add("active");
      // Algorithms
      items.algorithms.forEach((element) => {
        document
          .getElementById("algFieldsetContainer")
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
    document.getElementById("algFieldsetContainer").appendChild(alg)
  );
});

document.querySelectorAll("fieldset.algorithm.default").forEach((element) => {
  element.remove();
});

document.getElementById("addAlg").addEventListener("click", () => {
  let node = new AlgorithmNode("%New Algorithm%\n// Code here");
  node.innerHTML = node.innerHTML.replace("New Algorithm", "");
  node.innerHTML = node.innerHTML.replace("// Code here", "");
  intersectionObserver.observe(
    document.getElementById("algFieldsetContainer").appendChild(node)
  );
});

const autoAuthSaveButton = document.getElementById("autoAuth-save");
autoAuthSaveButton.addEventListener("click", () => {
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
      autoAuthSaveButton.innerHTML = "Saved";
      setTimeout(() => {
        autoAuthSaveButton.innerHTML = "Save credentials";
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
