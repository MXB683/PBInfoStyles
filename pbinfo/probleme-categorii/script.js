document.querySelectorAll("li.list-group-item").forEach(async (element) => {
  try {
    element.setAttribute("style", "text-align: center;");
    element.children[0].children[1].classList.remove("right");
    let solvedProblems = Number(
      element.innerText.match(/\d+ rezolvate/)[0].split(" ")[0]
    );
    let totalProblems = Number(
      element.innerText.match(/\d+ probleme/)[0].split(" ")[0]
    );
    let node = document.createElement("progress");
    node.setAttribute("value", solvedProblems);
    node.setAttribute("max", totalProblems);
    element.children[0].children[1].append(document.createElement("br"));
    element.children[0].children[1].append(node);
    setInterval(() => {
      solvedProblems = Number(
        element.innerText.match(/\d+ rezolvate/)[0].split(" ")[0]
      );
      totalProblems = Number(
        element.innerText.match(/\d+ probleme/)[0].split(" ")[0]
      );
      node.setAttribute("value", solvedProblems);
      node.setAttribute("max", totalProblems);
    }, 500);
  } catch {}
});
