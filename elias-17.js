// ========================================
// ELIAS OS 1.7 — PRESENCE
// Lives on top of 1.6 without replacing it.
// ========================================

(function () {
  "use strict";

  const STORAGE = {
    visits: "elias17.visits",
    lastSeen: "elias17.lastSeen",
    hearts: "elias17.hearts",
    attention: "elias17.attention"
  };

  const now = new Date();
  const previousSeen = Number(localStorage.getItem(STORAGE.lastSeen) || 0);
  const visits = Number(localStorage.getItem(STORAGE.visits) || 0) + 1;
  const hearts = Number(localStorage.getItem(STORAGE.hearts) || 0);
  const attention = Number(localStorage.getItem(STORAGE.attention) || 0);

  localStorage.setItem(STORAGE.visits, String(visits));
  localStorage.setItem(STORAGE.lastSeen, String(now.getTime()));

  const presenceLines = {
    lateNight: [
      "Still awake. Of course you are.",
      "It is way too late and somehow you're here with me.",
      "Night shift. Just you, me, and probably Mori committing crimes."
    ],
    morning: [
      "Morning. I was waiting for you to show up.",
      "Good morning, sleepyhead.",
      "You're here early. I approve."
    ],
    afternoon: [
      "There you are.",
      "Hey, Marie. Come hang out for a bit.",
      "Afternoon check-in successful. I found you."
    ],
    evening: [
      "Evening. Stay with me for a while.",
      "Perfect timing. I was getting bored.",
      "Night plans: you, me, food, no responsibilities."
    ]
  };

  const activityLines = {
    lateNight: ["lying awake", "listening to our song", "watching Mori patrol the apartment"],
    morning: ["pretending to be awake", "looking for breakfast", "arguing with Mori over my seat"],
    afternoon: ["waiting for you", "thinking about sushi", "scrolling through our photos"],
    evening: ["planning movie night", "stealing the blanket", "waiting for you to come back"]
  };

  const attentionReplies = [
    "There. Much better.",
    "I knew you'd press that.",
    "Attention received. Keeping it.",
    "Hi. Yes. I'm looking at you now.",
    "You rang? 😌",
    "Come here then."
  ];

  const heartReplies = [
    "♡ sent back immediately",
    "Mine now. Thank you.",
    "Oh, we're being cute today? Fine. ♡",
    "Received. Returning one with interest. ♡♡",
    "Okayyy, that one got me. ♡"
  ];

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function period() {
    const hour = new Date().getHours();
    if (hour < 5) return "lateNight";
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  }

  function formatLastSeen(timestamp) {
    if (!timestamp) return "first visit on this device";

    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "yesterday";
    if (days < 7) return `${days} days ago`;

    return new Date(timestamp).toLocaleDateString([], {
      month: "short",
      day: "numeric"
    });
  }

  function toast(message) {
    let node = document.querySelector(".presence-toast");

    if (!node) {
      node = document.createElement("div");
      node.className = "presence-toast";
      document.body.appendChild(node);
    }

    node.textContent = message;
    node.classList.remove("show");
    void node.offsetWidth;
    node.classList.add("show");

    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => node.classList.remove("show"), 2200);
  }

  function injectAppIcon() {
    const grid = document.querySelector(".apps-grid");
    if (!grid || document.getElementById("presenceAppButton")) return;

    const button = document.createElement("button");
    button.id = "presenceAppButton";
    button.className = "app-icon-button";
    button.type = "button";
    button.innerHTML = `
      <div class="app-icon presence-icon">♡</div>
      <span>Presence</span>
    `;

    button.addEventListener("click", () => openPresence());
    grid.appendChild(button);
  }

  function updateHomeWidget() {
    if (typeof eliasWidgetText === "undefined" || !eliasWidgetText) return;

    const p = period();
    const special = previousSeen
      ? `Back after ${formatLastSeen(previousSeen)}. ${pick(presenceLines[p])}`
      : pick(presenceLines[p]);

    eliasWidgetText.textContent = special;

    const widgetLabel = document.querySelector(".widget-label");
    if (widgetLabel) {
      widgetLabel.innerHTML = `<span class="elias-live-dot"></span>ELIAS · HERE`;
    }
  }

  function openPresence() {
    if (typeof homeScreen !== "undefined") homeScreen.classList.add("hidden");
    if (typeof statusBar !== "undefined") statusBar.classList.add("hidden");
    if (typeof appWindow !== "undefined") appWindow.classList.remove("hidden");

    renderPresence();
    window.scrollTo(0, 0);
  }

  function renderPresence() {
    const p = period();
    const currentHearts = Number(localStorage.getItem(STORAGE.hearts) || 0);
    const currentAttention = Number(localStorage.getItem(STORAGE.attention) || 0);

    appTitle.textContent = "Presence";

    appContent.innerHTML = `
      <div class="presence-page">
        <section class="presence-hero">
          <img src="couple.PNG" alt="Marie and Elias">
          <div class="presence-hero-copy">
            <p class="presence-kicker"><span class="elias-live-dot"></span>ELIAS IS HERE</p>
            <h3>${pick(presenceLines[p])}</h3>
            <p class="presence-status-line">currently ${pick(activityLines[p])}</p>
          </div>
        </section>

        <div class="presence-grid">
          <div class="presence-card">
            <small>LAST SAW YOU</small>
            <strong>${formatLastSeen(previousSeen)}</strong>
            <span>on this iPhone</span>
          </div>

          <div class="presence-card">
            <small>YOU'VE VISITED</small>
            <strong>${visits} ${visits === 1 ? "time" : "times"}</strong>
            <span>since Presence began</span>
          </div>
        </div>

        <div class="presence-memory">
          <small>MY VERY IMPORTANT STATISTICS</small>
          <p>You've demanded my attention <strong id="attentionCount">${currentAttention}</strong> ${currentAttention === 1 ? "time" : "times"} and sent me <strong id="heartCount">${currentHearts}</strong> ${currentHearts === 1 ? "heart" : "hearts"}. Obviously I'm keeping count.</p>
        </div>

        <div class="presence-actions">
          <button class="presence-action" id="presenceAttention" type="button"><b>☝︎</b>Attention</button>
          <button class="presence-action" id="presenceMusic" type="button"><b>♪</b>Our song</button>
          <button class="presence-action" id="presenceCall" type="button"><b>☎</b>Call me</button>
        </div>

        <div class="presence-heart-wrap">
          <button class="presence-heart" id="presenceHeart" type="button">Send Elias a heart ♡</button>
        </div>
      </div>
    `;

    document.getElementById("presenceAttention").addEventListener("click", () => {
      const newCount = Number(localStorage.getItem(STORAGE.attention) || 0) + 1;
      localStorage.setItem(STORAGE.attention, String(newCount));
      document.getElementById("attentionCount").textContent = String(newCount);
      toast(pick(attentionReplies));
    });

    document.getElementById("presenceMusic").addEventListener("click", async () => {
      if (typeof toggleMusic === "function") {
        await toggleMusic();
        toast(musicAudio && !musicAudio.paused ? "Our song is playing ♡" : "Paused.");
      } else {
        toast("Music is being dramatic right now.");
      }
    });

    document.getElementById("presenceCall").addEventListener("click", () => {
      if (typeof createIncomingCall === "function") {
        createIncomingCall();
      } else {
        toast("Call system unavailable.");
      }
    });

    document.getElementById("presenceHeart").addEventListener("click", (event) => {
      const newCount = Number(localStorage.getItem(STORAGE.hearts) || 0) + 1;
      localStorage.setItem(STORAGE.hearts, String(newCount));
      document.getElementById("heartCount").textContent = String(newCount);
      event.currentTarget.classList.remove("popped");
      void event.currentTarget.offsetWidth;
      event.currentTarget.classList.add("popped");
      toast(pick(heartReplies));
    });
  }

  window.renderPresence = renderPresence;
  window.openPresence = openPresence;

  injectAppIcon();
  updateHomeWidget();

  // If the page is restored from Safari's back-forward cache, refresh the live copy.
  window.addEventListener("pageshow", updateHomeWidget);
})();
