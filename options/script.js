document.querySelectorAll(".setting.text").forEach((element) => {
  element.addEventListener("click", () => {
    element.querySelector("input[type='text']").focus();
  });
});

const fontInput = document.querySelector("input#font");
if (fontInput) {
  const applyFont = () => {
    document.body.style.fontFamily = fontInput.value;
  };
  fontInput.addEventListener("input", applyFont);
  applyFont();
}

document.querySelector("#algConfig .label").addEventListener("click", () => {
  document.getElementById("algConfig").classList.toggle("active");
});

document.querySelector("#cssConfig .label").addEventListener("click", () => {
  document.getElementById("cssConfig").classList.toggle("active");
});

setInterval(() => {
  document
    .querySelectorAll("button.makeTextareaFullscreen")
    .forEach((element) => {
      element.onclick = () => {
        const alg = element.parentElement.parentElement;
        const fullscreen = document.getElementById("fullscreen");
        fullscreen.querySelector("textarea").value =
          alg.querySelector("textarea").value;
        fullscreen.querySelector("textarea").focus();
        fullscreen.querySelector("textarea").oninput = () => {
          alg.querySelector("textarea").value =
            fullscreen.querySelector("textarea").value;
        };
        fullscreen.querySelector("#fullscreenTitle").value =
          alg.querySelector("input.title").value;

        fullscreen.style.display = "block";
        document.body.style.overflow = "hidden";
      };
    });
  document.querySelectorAll("button.deleteAlg").forEach((element) => {
    element.onclick = () => {
      element.parentElement.parentElement.remove();
    };
  });
}, 500);

document.getElementById("closeFullscreen").addEventListener("click", () => {
  document.getElementById("fullscreen").style.display = "none";
  document.body.style.overflow = "auto";
});

const customCssEditor = CodeMirror.fromTextArea(
  document.getElementById("customCss"),
  {
    mode: "text/css",
    lineNumbers: true,
    theme: "lucario",
    lineWrapping: true,
    autoCloseBrackets: {
      pairs: "()[]{}''\"\"``<>",
      explode: "()[]{}``",
    },
    matchBrackets: true,
    lint: true,
    styleActiveLine: true,
  }
);

document.getElementById("refreshPBI").addEventListener("click", () => {
  chrome.tabs.query({ url: "*://*.pbinfo.ro/*" }, (tabs) => {
    if (tabs.length > 0) {
      tabs.forEach((tab) => {
        chrome.tabs.reload(tab.id);
      });
    } else {
      alert("No tabs found");
    }
  });
});
