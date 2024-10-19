"use strict";

setInterval(() => {
  if (
    document.querySelector(
      "#navbar > ul.nav.navbar-nav.navbar-right > li:nth-child(2) > a"
    ).childElementCount === 0
  ) {
    window.location.reload();
  }
}, 1000);

chrome.storage.sync.get(
  {
    icons: true,
    fontLigatures: true,
    font: "cascadia code",
    customFontLink:
      "@import url('https://fonts.cdnfonts.com/css/cascadia-code');",
    profilePictureSource: "",
    autoAuth: {
      enabled: false,
      username: "",
      password: "",
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
      profilePictureSource: "",
      autoAuth: {
        enabled: false,
        username: "",
        password: "",
      },
      researcherEnabled: false,
      replaceCustomCharacters: false,
    }
  ) => {
    // ANCHOR - Login automatically
    try {
      if (
        items.autoAuth.enabled &&
        document
          .querySelector(
            "#navbar > ul.nav.navbar-nav.navbar-right > li:nth-child(2) > a"
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
      try {
        document
          .querySelector(
            "#navbar > ul.nav.navbar-nav.navbar-right > li:nth-child(5)"
          )
          .remove();
      } catch (_) {}

      document.querySelector(
        "#bara_navigare > div > div.navbar-header > a"
      ).innerHTML = `
    <svg style="height: 20px; width: 20px;"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
      <path fill="#ffffff"
        d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
    </svg>
    `;
      document.querySelector(
        "#bara_navigare > div > div.navbar-header > a"
      ).title = "Acasă";

      document.querySelector("#navigare-li-probleme > a").innerHTML = `
    <svg style="height: 20px; width: 20px;"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512">
      <path fill="#ffffff"
      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>
    </svg>
    `;
      document.querySelector("#navigare-li-probleme > a").title = "Probleme";

      document.querySelector("#navigare-li-solutii > a").innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512">
      <path fill="#ffffff"
      d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/>
    </svg>
    `;
      document.querySelector("#navigare-li-solutii > a").title = "Soluții";

      document.querySelector("#navigare-li-resurse > a").innerHTML = `
    <svg style="height: 20px; width: 20px;"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512">
      <path fill="#ffffff"
        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
    </svg>
    `;
      document.querySelector("#navigare-li-resurse > a").title = "Resurse";

      if (
        document
          .querySelector("#navbar > ul.nav.navbar-nav.navbar-right")
          .innerText.includes("Profesor")
      ) {
        document.querySelector(
          "#navbar > ul.nav.navbar-nav.navbar-right > li:nth-child(1) > a"
        ).innerHTML = `
      <svg style="height: 20px; width: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#ffffff" d="M160 64c0-35.3 28.7-64 64-64H576c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H336.8c-11.8-25.5-29.9-47.5-52.4-64H384V320c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v32h64V64L224 64v49.1C205.2 102.2 183.3 96 160 96V64zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352h53.3C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7H26.7C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z"/></svg>
        `;
        document.querySelector(
          "#navbar > ul.nav.navbar-nav.navbar-right > li:nth-child(1) > a"
        ).title = "Profesor";

        document.querySelector(
          "#navbar > ul.nav.navbar-nav.navbar-right > li:nth-child(2) > a"
        ).innerHTML = "";

        const profilePicture = document.createElement("img");
        profilePicture.height = "20";
        profilePicture.style.borderRadius = "100%";
        profilePicture.src = items.profilePictureSource;
        document
          .querySelector(
            "#navbar > ul.nav.navbar-nav.navbar-right > li:nth-child(2) > a"
          )
          .appendChild(profilePicture);

        document.querySelector(
          "#navbar > ul.nav.navbar-nav.navbar-right > li:nth-child(2) > a"
        ).title = "Profil";
      } else {
        document.querySelector(
          "#navbar > ul.nav.navbar-nav.navbar-right > li:nth-child(1) > a"
        ).innerHTML = "";

        const profilePicture = document.createElement("img");
        profilePicture.height = "20";
        profilePicture.style.borderRadius = "100%";
        profilePicture.src = items.profilePictureSource;
        document
          .querySelector(
            "#navbar > ul.nav.navbar-nav.navbar-right > li:nth-child(1) > a"
          )
          .appendChild(profilePicture);

        document.querySelector(
          "#navbar > ul.nav.navbar-nav.navbar-right > li:nth-child(1) > a"
        ).title = "Profil";
      }
      try {
        document.querySelector(
          '#navbar > ul.nav.navbar-nav.navbar-right > li:nth-child(1) > a[data-target="#modal_login"]'
        ).innerHTML = `
      <svg style="height: 20px; width: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
      `;
        document.querySelector(
          '#navbar > ul.nav.navbar-nav.navbar-right > li:nth-child(1) > a[data-target="#modal_login"]'
        ).title = "Autentificare";

        document.querySelector(
          '#navbar > ul.nav.navbar-nav.navbar-right > li:nth-child(2) > a[href="/?pagina=creare-cont"]'
        ).innerHTML = `
      <svg style="height: 20px; width: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
      `;
        document.querySelector(
          '#navbar > ul.nav.navbar-nav.navbar-right > li:nth-child(2) > a[href="/?pagina=creare-cont"]'
        ).title = "Înregistrare";
      } catch {}
    }

    // ANCHOR - Copy code elements
    setTimeout(() => {
      document.querySelectorAll("code").forEach((element) => {
        element.addEventListener("click", () => {
          const innerHTML = element.innerHTML;
          console.log(innerHTML);
          navigator.clipboard.writeText(innerHTML);
          element.innerHTML = "Copied!";
          setTimeout(() => {
            element.innerHTML = innerHTML;
          }, 500);
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
      node.classList.add("pbinfo-custom-styling-extension__custom-import-link");
      node.innerHTML = items.customFontLink;
      document.querySelector("head").appendChild(node);
    }

    // ANCHOR - Replace custom language characters
    if (items.replaceCustomCharacters) {
      const characters = {
        ă: "a",
        â: "a",
        î: "i",
        ș: "s",
        ț: "t",
        Ă: "A",
        Â: "A",
        Î: "I",
        Ș: "S",
        Ț: "T",
      };
      for (const character in characters) {
        document.querySelectorAll("*").forEach((element) => {
          if (element.querySelector("*") === null) {
            element.innerHTML = element.innerHTML.replace(
              RegExp(character, "g"),
              characters[character]
            );
          }
        });
      }
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
          .innerHTML.replace(" De informatică :)", "");
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
  }
);
