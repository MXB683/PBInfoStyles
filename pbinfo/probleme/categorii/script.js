document.querySelector(
  "#zona-mijloc > div > div.row > div.col-md-8 > div:nth-child(2) > nav"
).innerHTML += `<button type="checkbox" id="hideSolvedProblems" class="btn btn-primary">Ascunde probleme rezolvate (pe aceasta pagina)</button>`;

const hideSolvedProblemsButton = document.getElementById("hideSolvedProblems");
hideSolvedProblemsButton.addEventListener("click", (event) => {
  [...document.querySelectorAll(".card > .card-footer > a > span.badge")]
    .filter((e) => e.innerText === "100")
    .forEach((element) => {
      element.parentElement.parentElement.parentElement.style.display = "none";
    });
  hideSolvedProblemsButton.remove();
});
