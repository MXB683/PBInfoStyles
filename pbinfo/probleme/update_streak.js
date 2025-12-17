"use strict";

// Inject script into page context to intercept requests
const script = document.createElement("script");
script.src = chrome.runtime.getURL("pbinfo/probleme/interceptor.js");
document.documentElement.appendChild(script);
script.remove();

// Listen for the custom event from page context
window.addEventListener("solutionData", (event) => {
  const { url, data } = event.detail;
  if (!url.includes("ajx-solutii-lista-json.php")) return;
  if (!data) return;

  chrome.storage.sync.get(
    {
      doStreaks: true,
      streakProfiles: {}, // streakProfiles["username"] = { currentStreak: int, lastSolvedDate: "YYYY-MM-DD" }
    },
    async (items = { doStreaks: true, streakProfiles: {} }) => {
      if (!items.doStreaks) return;
      /**
       * @type {Array<{}>}
       */
      const sources = data.surse;
      const today = new Date().toISOString().split("T")[0];
      const correctSource = sources[0];
      if (!correctSource) return;
      if (correctSource.scor < 100) return;
      if (!sources.slice(1).every((source) => source.scor < 100)) return;
      if (correctSource.status !== "complete") return;

      if (
        items.streakProfiles[correctSource.user.user].lastSolvedDate === today
      )
        return;
      items.streakProfiles[correctSource.user.user].currentStreak += 1;
      items.streakProfiles[correctSource.user.user].lastSolvedDate = today;
      chrome.storage.sync.set({ streakProfiles: items.streakProfiles });
    }
  );
});
