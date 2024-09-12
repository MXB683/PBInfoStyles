try {
  document.querySelectorAll("li.list-group-item").forEach(async (element) => {
    element.setAttribute("style", "text-align: center;");
    element.children[0].children[1].classList.remove("right");
    
    let solvedProblems = Number(element.children[0].children[1].innerText.match(/\d+/g)[1]);
    let totalProblems = Number(element.children[0].children[1].innerText.match(/\d+/g)[0]);
    let node = document.createElement("progress");
    node.setAttribute("value", solvedProblems);
    node.setAttribute("max", totalProblems);
    element.children[0].children[1].append(document.createElement("br"));
    element.children[0].children[1].append(node);
    setInterval(() => {
      solvedProblems = Number(element.children[0].children[1].innerText.match(/\d+/g)[1]);
      totalProblems = Number(element.children[0].children[1].innerText.match(/\d+/g)[0]);
      node.setAttribute("value", solvedProblems);
      node.setAttribute("max", totalProblems);
    }, 500)
  })
} 
catch {};