"use strict";

chrome.storage.sync.get(
  {
    icons: true,
    fontLigatures: true,
    font: "JetBrains Mono",
    customFontLink:
      "@import url('https://fonts.cdnfonts.com/css/jetbrains-mono');",
    profilePictureSource: "",
    autoAuth: {
      enabled: false,
      username: "",
      password: "",
    },
    researcherEnabled: false,
    replaceCustomCharacters: false,
    customCSS: true,
  },
  (
    items = {
      icons: true,
      fontLigatures: true,
      font: "JetBrains Mono",
      customFontLink:
        "@import url('https://fonts.cdnfonts.com/css/jetbrains-mono');",
      profilePictureSource: "",
      autoAuth: {
        enabled: false,
        username: "",
        password: "",
      },
      researcherEnabled: false,
      replaceCustomCharacters: false,
      customCSS: true,
    }
  ) => {
    // ANCHOR - Login automatically
    try {
      if (
        items.autoAuth.enabled &&
        document
          .querySelector(
            "#navbarPrincipal > ul.navbar-nav.ms-auto.mb-2.mb-lg-0 > li:nth-child(2) > a"
          )
          .getAttribute("href") === "/?pagina=creare-cont"
      ) {
        document.querySelector("#user_login").value = items.autoAuth.username;
        document.querySelector("#parola_login").value = items.autoAuth.password;
        document
          .querySelector(
            '#form-login-modal > div.modal-footer > div:nth-child(1) > div > button.btn.btn-primary[type="submit"]'
          )
          .click();

        setTimeout(() => {
          const dialog = document.createElement("dialog");
          dialog.id = "login-attempt";
          dialog.onclick = () => {
            document.getElementById("login-attempt").remove();
          };
          dialog.innerText = "Logging in";
          for (let i = 0; i < 10; i++) {
            setTimeout(() => (dialog.innerText += "."), i * 1000 + 250);
            setTimeout(() => (dialog.innerText += "."), i * 1000 + 500);
            setTimeout(() => (dialog.innerText += "."), i * 1000 + 750);
            setTimeout(
              () => (dialog.innerText = "Logging in"),
              i * 1000 + 1000
            );
          }
          setTimeout(
            () =>
              (dialog.innerText = "Timed out. Maybe incorrect credentials?"),
            10_000
          );
          document.body.appendChild(dialog);
          document.getElementById("login-attempt").showModal();
        }, 500);
      }
    } catch (error) {
      document.body.innerHTML += `
        <div id="auto-login-error" style="
          display: block;
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          background-color: rgb(214, 50, 39);
          padding: 1rem;
          opacity: 0.9;
        ">
          Couldn't login automatically:
          <div id="auto-login-error-message">
            ${error.message}
          </div>
          <u style="user-select: none; cursor: default;" onclick="document.getElementById('auto-login-error').remove();">Close</u>
        </div>
      `;
    }

    // ANCHOR Icons
    if (items.icons) {
      document.querySelector("#bara_navigare > div > a").innerHTML = `
        <img src="https://www.pbinfo.ro/img/pbinfo5.png" style="
            width: 15rem;
            height: 2rem;
            position: relative;
            left: -70px;
            clip-path: inset(0 0 0 90px);
        ">
      `;
      document.querySelector("#bara_navigare > div > a").title = "Acasă";
      document.querySelector("#bara_navigare > div > a").style.position =
        "relative";
      document.querySelector("#bara_navigare > div > a").style.left = "2rem";

      document.querySelector("#search_box").placeholder = "Cautare";
      document.querySelector(
        "#navbarPrincipal > ul.navbar-nav.me-auto.mb-2.mb-lg-0 > li:nth-child(1)"
      ).style.margin = "0 1rem 0 0";

      document.querySelector("#navigare-li-probleme > a").innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>
      `;

      document.querySelector("#navigare-li-solutii > a").innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
      `;
      document
        .querySelector("#navigare-li-solutii > a")
        .classList.add("dropdown-toggle");
      document.querySelector("#navigare-li-solutii").style.margin = "0 1rem";

      document.querySelector("#navigare-li-resurse > a").innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path></svg>
      `;

      if (
        !document
          .querySelector(
            "#navbarPrincipal > ul.navbar-nav.ms-auto.mb-2.mb-lg-0 > li:nth-child(2) > a"
          )
          .href.includes("/?pagina=creare-cont")
      ) {
        document.querySelector(
          "#navbarPrincipal > ul.navbar-nav.ms-auto.mb-2.mb-lg-0 > li:nth-last-child(4) > a"
        ).innerHTML += `
          <img style="
            width: 1.6rem;
            border-radius: 100%;
          " src="${items.profilePictureSource}">
        `;
      }
    }

    // ANCHOR - Copy code elements
    setTimeout(() => {
      document
        .querySelectorAll(
          'code, #enunt pre[contenteditable="true"][editable="true"]'
        )
        .forEach((element) => {
          element.removeAttribute("contenteditable");
          element.removeAttribute("editable");
          element.addEventListener("click", (event) => {
            const innerHTML = element.innerHTML;
            navigator.clipboard.writeText(innerHTML);

            // Create ripple effect
            element.classList.add("ripple");
            setTimeout(() => {
              element.classList.remove("ripple");
            }, 1000);
          });
        });
    }, 500);

    // ANCHOR Font ligatures
    if (items.fontLigatures) {
      document.querySelector("body").style.fontVariantLigatures = "normal";
    } else {
      document.querySelector("body").style.fontVariantLigatures = "none";
    }

    // ANCHOR Font
    document.querySelector(
      "body"
    ).style.fontFamily = `${items.font}, sans-serif`;

    // ANCHOR Font Import
    {
      let node = document.createElement("style");
      node.classList.add("pbs_custom-import-link");
      node.innerHTML = items.customFontLink;
      document.querySelector("head").appendChild(node);
    }

    // ANCHOR - Custom CSS
    {
      let node = document.createElement("style");
      node.classList.add("pbs_custom-css");
      node.innerHTML = items.customCSS;
      document.querySelector("head").appendChild(node);
    }

    // ANCHOR - Replace custom language characters
    if (items.replaceCustomCharacters) {
      const characters = {
        ă: "a",
        â: "a",
        î: "i",
        ș: "s",
        ş: "s",
        ț: "t",
        ţ: "t",
        Ă: "A",
        Â: "A",
        Î: "I",
        Ș: "S",
        Ț: "T",
      };

      function replaceCharacters(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          let text = node.textContent;
          for (const original in characters) {
            const replacement = characters[original];
            text = text.replace(new RegExp(original, "g"), replacement);
          }
          node.textContent = text;
        } else if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.tagName === "INPUT" &&
          (node.type === "text" || node.type === "search")
        ) {
          let text = node.placeholder;
          for (const original in characters) {
            const replacement = characters[original];
            text = text.replace(new RegExp(original, "g"), replacement);
          }
          node.placeholder = text;
        } else {
          for (let i = 0; i < node.childNodes.length; i++) {
            replaceCharacters(node.childNodes[i]);
          }
        }
      }

      setTimeout(() => {
        replaceCharacters(document.body);
      }, 100);
    }

    // cuz y not
    try {
      if (
        document
          .querySelector(
            "body > div:nth-child(2) > div.bg-primary > div > div > div.col-lg-10.col-md-9.col-sd-8 > p.very-big"
          )
          .innerHTML.includes("Aici ai probleme!")
      ) {
        document.querySelector(
          "body > div:nth-child(2) > div.bg-primary > div > div > div.col-lg-10.col-md-9.col-sd-8 > p.very-big"
        ).innerHTML = document
          .querySelector(
            "body > div:nth-child(2) > div.bg-primary > div > div > div.col-lg-10.col-md-9.col-sd-8 > p.very-big"
          )
          .innerHTML.replace(/ De informatic[a|ă] :\)/, "");
      }
    } catch (_) {}

    // ANCHOR Remove top colored bar
    setInterval(() => {
      document.querySelector("#bara_navigare").style.borderWidth = "0";
    }, 50);

    // ANCHOR Researcher
    if (items.researcherEnabled) {
      const node = document.createElement("div");
      node.id = "totalGrabbableElements";
      node.innerHTML = `<style>
      #totalGrabbableElements {
        position: fixed;
        top: 10em;
        left: 1em;
      }

      #grabbableElement {
        position: absolute;
        background-color: #f1f1f1;
        border: 1px solid #d3d3d3;
        overflow: hidden;
        resize: both;
        width: 20em;
        min-height: 10em;
        min-width: 10em;
        height: 15em;
        & > iframe {
          margin-top: 1.7em;
          width: 100%;
          height: calc(100% - 3.9em);
        }
      }

      #grabbableElementGrabIcon {
        text-align: center;
        cursor: move;
        background-color: #b6b6b6;
        color: #fff;
        & > svg {
          height: 2em;
          fill: #555;
        }
        &:hover {
          background-color: #adadad;
          & > svg {
            fill: rgb(0, 0, 0);
          }
        }
      }

      div#researcher-utilities > button {
        width: 2em;
        height: 2em;
        position: absolute;
        border-radius: 0;
        border: rgb(122, 122, 122) 1px solid;

        &:hover {
          background-color: rgb(221, 221, 221);
          cursor: pointer;
        }
        &:active {
          background-color: rgb(211, 211, 211);
        }

        &:nth-child(1) {
          left: 0em;
        }
        &:nth-child(2) {
          left: 2em;
        }
        &:nth-child(3) {
          left: 4em;
        }
        &:nth-child(4) {
          right: 0em;
        }
      }

      div#researcher-utilities > input[type="text"] {
        position: absolute;
        left: 6em;
        width: calc(100% - 8.5em);
        border-radius: 0;
        border: rgb(122, 122, 122) 1px solid;
        height: 1.7em;
      }

      #researcher-options-dialog {
        position: absolute;
        margin-right: 0;
        top: 3.9em;
        padding: 0px;
        border: 1px solid #000000;
        border-top: 0px;
        & button {
          text-align: left;
          width: 10em;
          height: 2em;
          border-radius: 0;
          border: 0px;
          padding: 0;
          padding-left: 1em;
          margin: 0;
          &:hover {
            background-color: rgb(221, 221, 221);
            cursor: pointer;
          }
          &:active {
            background-color: rgb(211, 211, 211);
          }
        }
      }
    </style>
    <div id="grabbableElement">
      <div id="grabbableElementGrabIcon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 288zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 160z"
          />
        </svg>
      </div>
      <div id="researcher-utilities">
        <button id="researcher-back-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
              d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
            />
          </svg>
        </button>
        <button id="researcher-forward-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
              d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
          </svg>
        </button>
        <button id="researcher-refresh-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"/>
          </svg>
        </button>
        <button id="researcher-options-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/>
          </svg>
        </button>
        <dialog id="researcher-options-dialog">
          <button>Open in browser</button>
          <br>
          <button>Copy address</button>
          <br>
          <button>Close Researcher</button>
        </dialog>
        <input type="text" id="researcher-input" value="https://www.bing.com"/>
      </div>
      <iframe id="researcher-content" src="https://www.bing.com/" frameborder="0"></iframe>
    </div>
    <!-- utilities -->
    <script type="text/javascript">
      const backBtn = document.getElementById('researcher-back-btn');
      const forwardBtn = document.getElementById('researcher-forward-btn');
      const refreshBtn = document.getElementById('researcher-refresh-btn');
      const optionsBtn = document.getElementById('researcher-options-btn');
      const content = document.getElementById("grabbableElement").querySelector('iframe');
      const input = document.getElementById('researcher-input');

      const openInBrowerBtn = document.querySelector("#researcher-options-dialog > button:nth-child(1)");
      const copyAddressBtn = document.querySelector("#researcher-options-dialog > button:nth-child(3)");
      const closeResearcherBtn = document.querySelector("#researcher-options-dialog > button:nth-child(5)");

      openInBrowerBtn.addEventListener("click", () => {
        window.open(input.value);
      });

      copyAddressBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(input.value);
        copyAddressBtn.textContent = "Copied!";
        setTimeout(() => {
          copyAddressBtn.textContent = "Copy address";
        }, 2000);
      });

      closeResearcherBtn.addEventListener("click", () => {
        chrome.storage.sync.set({ researcherEnabled: false }, () => {
          document.getElementById("totalGrabbableElements").remove();
        })
      });

      optionsBtn.addEventListener("click", () => {
        if (document.getElementById('researcher-options-dialog').attributes.getNamedItem("open")) {
          document.getElementById('researcher-options-dialog').close()
        } else {
          document.getElementById('researcher-options-dialog').show();
        }
      })

      refreshBtn.addEventListener('click', () => {
        const src = input.value;
        content.src = '';
        content.src = src;
      });

      backBtn.addEventListener('click', () => {
        content.contentWindow.history.back();
      });

      forwardBtn.addEventListener('click', () => {
        content.contentWindow.history.forward();
      });

      input.addEventListener("change", () => {
        const url = input.value;
        content.contentWindow.location.href = url;
      })
    </script>
    <!-- drag logic -->
    <script type="text/javascript">
      drag_dragElement(document.getElementById("grabbableElement"));
      function drag_dragElement(elmnt) {
        var pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;
        if (document.getElementById(elmnt.id + "GrabIcon")) {
          document.getElementById(elmnt.id + "GrabIcon").onmousedown =
            drag_dragMouseDown;
        } else {
          elmnt.onmousedown = drag_dragMouseDown;
        }

        function drag_dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = drag_closeDragElement;
          document.onmousemove = drag_elementDrag;
        }

        function drag_elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          elmnt.style.top = elmnt.offsetTop - pos2 + "px";
          elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
        }

        function drag_closeDragElement() {
          document.onmouseup = null;
          document.onmousemove = null;
        }
      }
    </script>
      `;
      document.body.appendChild(node);
    }

    document.body.style.transform = "scale(1)";

    // ANCHOR - Make table headers' text visible
    document.querySelectorAll("th").forEach((element) => {
      element.classList.remove("text-dark");
    });
  }
);
