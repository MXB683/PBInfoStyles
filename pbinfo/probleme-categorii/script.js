setTimeout(() => {
  document.querySelectorAll("li.list-group-item").forEach(async (element) => {
    let node = document.createElement("progress");
    element.children[0].children[1].append(document.createElement("br"));
    element.children[0].children[1].append(node);
    element.style.textAlign = "center";
    element.children[0].children[1].classList.remove("right");
    let solvedProblems, totalProblems;
    node.setAttribute("max", "100");
    setInterval(() => {
      try {
        solvedProblems = Number(
          element.innerText.match(/\d+ rezolvate/)[0].split(" ")[0]
        );
        totalProblems = Number(
          element.innerText.match(/\d+ probleme/)[0].split(" ")[0]
        );
        if (solvedProblems === 0) {
          node.setAttribute("value", "0");
          return;
        }
        const minimumPercentage = 6;
        const percentage = Math.round((solvedProblems / totalProblems) * 100);
        node.setAttribute(
          "value",
          `${percentage >= minimumPercentage ? percentage : minimumPercentage}`
        );
      } catch (_) {}
    }, 100);
  });
}, 50);
