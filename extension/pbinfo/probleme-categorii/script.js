chrome.storage.sync.get("oldProblemsPage").then((result) => {
  if (result.oldProblemsPage) {
    document.querySelectorAll("li.list-group-item").forEach((element) => {
      const newA = element.querySelector("a").cloneNode(true);
      newA.classList.value = "btn";
      element.children[1].replaceWith(newA);
      element.addEventListener("click", () => newA.click());
      element.style.cursor = "pointer";
      element.style.userSelect = "none";
      element.style.display = "flex";
      element.style.flexDirection = "column";
      element.style.alignItems = "center";
      const interval = setInterval(() => {
        const [total, solved] = element.children[1].textContent.match(/\d+/g);
        if (total && solved) {
          const progressBar = document.createElement("progress");
          progressBar.value = Math.max(8, (solved / total) * 100);
          if (solved == 0) progressBar.value = 0;
          progressBar.max = 100;
          element.appendChild(progressBar);
          clearInterval(interval);
        }
      }, 100);
    });
  }
});
