"use strict";

const streakSettings = Object.freeze({
  solvedToday: "🔥",
  notSolvedToday: "🧊",
  minCount: 3,
  minScore: 90,
});

function yesterday(yyyy_mm_dd = new Date().toISOString().split("T")[0]) {
  const [year, month, day] = yyyy_mm_dd.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() - 1);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

fetch(`/ajx-module/profil/json-jurnal.php?user=${user_autentificat.user}`)
  .then((response) => response.json())
  .then((data) => {
    if (
      !document.getElementById("pbs_streak_indicator") ||
      data.content.length == 0
    )
      return;

    /*
     * @type {{
     *	clasa: int,
     *	data_upload: "YYYY-MM-DD",
     *	denumire: string,
     *	id: int,
     *	scor: int
     * }}
     */
    const solutions = data.content.filter(
      (e) => e.scor >= streakSettings.minScore,
    );
    function countFrom(date) {
      let streak = 0;
      for (const solution of solutions) {
        if (solution.data_upload !== date) break;
        streak++;
        date = yesterday(date);
      }
      return streak;
    }

    const today = new Date().toISOString().split("T")[0];
    const cft = countFrom(today);
    const streak = cft == 0 ? countFrom(yesterday()) : cft;

    document.getElementById("pbs_streak_indicator").innerHTML = `${streak}${
      cft == 0 ? streakSettings.notSolvedToday : streakSettings.solvedToday
    }`;
  });
