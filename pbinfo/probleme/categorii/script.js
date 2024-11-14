document.querySelector(
  "#zona-mijloc > div > div.row > div.col-lg-8.col-md-8 > div:nth-child(2)"
).innerHTML += `<button type="checkbox" id="hideSolvedProblems" class="btn btn-primary">Ascunde probleme rezolvate (pe aceasta pagina)</button>`;

const hideSolvedProblemsButton = document.getElementById("hideSolvedProblems");
hideSolvedProblemsButton.addEventListener("click", (event) => {
  [...document.querySelectorAll("div.panel.panel-info span.badge")]
    .filter((e) => e.innerText === "100")
    .forEach((element) => {
      element.parentElement.parentElement.parentElement.parentElement.classList.add(
        "hidden"
      );
    });
  hideSolvedProblemsButton.remove();
});
