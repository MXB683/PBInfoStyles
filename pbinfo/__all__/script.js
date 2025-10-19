"use strict";

chrome.storage.sync.get(
  {
    enableIcons: true,
    fontLigatures: true,
    font: "JetBrains Mono",
    fontLink: "@import url('https://fonts.cdnfonts.com/css/jetbrains-mono');",
    profilePictureSource: "",
    autoAuth: {
      enabled: false,
      username: "",
      password: "",
    },
    replaceCustomCharacters: false,
    customCSS: true,
  },
  (
    items = {
      enableIcons: true,
      fontLigatures: true,
      font: "JetBrains Mono",
      fontLink: "@import url('https://fonts.cdnfonts.com/css/jetbrains-mono');",
      profilePictureSource: "",
      autoAuth: {
        enabled: false,
        username: "",
        password: "",
      },
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

    // ANCHOR Enable Icons
    if (items.enableIcons) {
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
      document.querySelector("#navigare-li-probleme").innerHTML += `
        <div class="pbs_tooltip" style="
          position: absolute;
          top: 4rem;
          left: -2rem;
          background: #333;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
        ">Probleme</div>
      `;

      document.querySelector("#navigare-li-solutii > a").innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
      `;
      document
        .querySelector("#navigare-li-solutii > a")
        .classList.add("dropdown-toggle");
      document.querySelector("#navigare-li-solutii").style.margin = "0 1rem";
      document.querySelector("#navigare-li-solutii").innerHTML += `
        <div class="pbs_tooltip" style="
          position: absolute;
          top: 4rem;
          left: -1.9rem;
          background: #333;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
        ">Solutii</div>
      `;

      document.querySelector("#navigare-li-resurse > a").innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path></svg>
      `;
      document.querySelector("#navigare-li-resurse").innerHTML += `
        <div class="pbs_tooltip" style="
          position: absolute;
          top: 4rem;
          left: -2rem;
          background: #333;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
        ">Resurse</div>
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
            navigator.clipboard.writeText(element.innerHTML);

            element.classList.add("ripple");
            setTimeout(() => {
              element.classList.remove("ripple");
            }, 1000);
          });
        });
    }, 500);

    // ANCHOR Font ligatures
    if (items.fontLigatures) {
      document.body.style.fontVariantLigatures = "normal";
    } else {
      document.body.style.fontVariantLigatures = "none";
    }

    // ANCHOR Font
    document.body.style.fontFamily = `${items.font}, sans-serif`;

    // ANCHOR Font Import
    {
      let node = document.createElement("style");
      node.classList.add("pbs_font-import-link");
      node.innerHTML = `@import url("${items.fontLink}");`;
      document.head.appendChild(node);
    }

    // ANCHOR - Custom CSS
    {
      let node = document.createElement("style");
      node.classList.add("pbs_custom-css");
      node.innerHTML = items.customCSS;
      document.head.appendChild(node);
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

    document.body.style.transform = "scale(1)";

    // ANCHOR - Make table headers' text visible
    document.querySelectorAll("th").forEach((element) => {
      element.classList.remove("text-dark");
    });
  }
);

// ANCHOR - Add watermark
const watermark = document.createElement("div");
watermark.id = "pbs_watermark";
watermark.class = "container";
watermark.innerHTML = `<div class="center">Înfrumusețat cu <a href="https://github.com/MXB683/PBInfoStyles" target="_blank">PBInfoStyles</a></div>`;
document.getElementById("footer").appendChild(document.createElement("hr"));
document.getElementById("footer").appendChild(watermark);

// ANCHOR - Scroll Animations
const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("inView", entry.isIntersecting);
  });
});

chrome.storage.sync.get("scrollAnimations").then((result) => {
  if (result.scrollAnimations) {
    const exceptionSelectors = [
      "#bara_navigare",
      "#header",
      "#footer",
      "form-incarcare-solutie",
    ];
    let exceptionSelectorString = "script, style";
    exceptionSelectors.forEach((selector) => {
      exceptionSelectorString += `, ${selector}, ${selector} *`;
    });
    const scrollAnimItems = document.querySelectorAll(
      `*:not(${exceptionSelectorString})`
    );

    scrollAnimItems.forEach((element) => {
      element.classList.add("scrollAnimation");
      element.classList.add("inView");
      intersectionObserver.observe(element);
    });
  }
});

setTimeout(() => {
  document.getElementById("navigare-li-probleme").style =
    "margin: 0 0 0 1rem !important;";
}, 100);
