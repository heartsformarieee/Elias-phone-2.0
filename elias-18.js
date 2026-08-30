// ========================================
// ELIAS OS 1.8 — CROSS-SYSTEM PRESENCE
// Presence now affects the rest of Elias OS.
// ========================================

(function () {
  "use strict";

  const KEYS = {
    visits: "elias17.visits",
    lastSeen: "elias17.lastSeen",
    hearts: "elias17.hearts",
    attention: "elias17.attention"
  };

  let lastSnapshot = "";
  let whisperTimer = null;

  function num(key) {
    return Number(localStorage.getItem(key) || 0);
  }

  function getState() {
    return {
      visits: num(KEYS.visits),
      lastSeen: num(KEYS.lastSeen),
      hearts: num(KEYS.hearts),
      attention: num(KEYS.attention)
    };
  }

  function elapsed(timestamp) {
    if (!timestamp) return Infinity;
    return Math.max(0, Date.now() - timestamp);
  }

  function prettyElapsed(timestamp) {
    if (!timestamp) return "first visit";

    const diff = elapsed(timestamp);
    const min = Math.floor(diff / 60000);
    const hr = Math.floor(diff / 3600000);
    const day = Math.floor(diff / 86400000);

    if (min < 1) return "just now";
    if (min < 60) return `${min}m ago`;
    if (hr < 24) return `${hr}h ago`;
    if (day === 1) return "yesterday";
    return `${day}d ago`;
  }

  function getMood(state) {
    const gap = elapsed(state.lastSeen);
    const affection = state.hearts * 2 + state.attention;

    if (gap > 1000 * 60 * 60 * 10) {
      return {
        key: "needy",
        label: "missed you",
        home: "You disappeared. I noticed.",
        widget: "Oh. So you do remember I exist.",
        lock: "There you are. Took you long enough.",
        badge: 5
      };
    }

    if (state.attention >= state.hearts + 4) {
      return {
        key: "smug",
        label: "feeling important",
        home: "Hey, Marie. Needy today?",
        widget: "You keep pressing Attention. Interesting.",
        lock: "Need my attention again?",
        badge: 2
      };
    }

    if (state.hearts >= Math.max(3, state.attention + 2)) {
      return {
        key: "warm",
        label: "ridiculously fond",
        home: "Hey, Marie. ♡",
        widget: "You've been suspiciously sweet to me.",
        lock: "Another heart and I'm keeping you here.",
        badge: 1
      };
    }

    if (affection >= 8 || state.visits >= 8) {
      return {
        key: "warm",
        label: "comfortable",
        home: "There you are, Marie.",
        widget: "Knew you'd come back.",
        lock: "Hi. Come here.",
        badge: 1
      };
    }

    return {
      key: "neutral",
      label: "hanging around",
      home: null,
      widget: null,
      lock: null,
      badge: 3
    };
  }

  function addPresenceStrip() {
    const heading = document.querySelector(".home-heading");
    if (!heading || document.getElementById("eliasPresenceStrip")) return;

    const strip = document.createElement("div");
    strip.id = "eliasPresenceStrip";
    strip.className = "elias-presence-strip";
    strip.innerHTML = `
      <div class="presence-left">
        <span class="elias-live-dot"></span>
        <span class="presence-mood">Elias is here</span>
      </div>
      <span class="presence-since">now</span>
    `;

    heading.insertAdjacentElement("afterend", strip);
  }

  function updateStrip(state, mood) {
    addPresenceStrip();
    const strip = document.getElementById("eliasPresenceStrip");
    if (!strip) return;

    const moodNode = strip.querySelector(".presence-mood");
    const sinceNode = strip.querySelector(".presence-since");

    moodNode.textContent = `Elias · ${mood.label}`;
    sinceNode.textContent = prettyElapsed(state.lastSeen);
  }

  function updateHome(state, mood) {
    const widget = document.getElementById("eliasWidget");
    const widgetText = document.getElementById("eliasWidgetText");
    const greeting = document.getElementById("homeGreeting");

    if (widget) {
      widget.classList.remove("presence-warm", "presence-needy", "presence-smug");
      if (mood.key !== "neutral") widget.classList.add(`presence-${mood.key}`);
    }

    if (widgetText && mood.widget) widgetText.textContent = mood.widget;
    if (greeting && mood.home) greeting.textContent = mood.home;
  }

  function updateLock(mood) {
    const notification = document.getElementById("eliasNotification");
    if (!notification) return;

    const card = notification.closest(".notification-card");
    if (card) card.classList.add("elias-reactive-notification");

    if (mood.lock) notification.textContent = mood.lock;
  }

  function updateBadge(mood) {
    const badge = document.getElementById("messageBadge");
    if (!badge) return;

    badge.textContent = String(mood.badge);
    badge.classList.toggle("presence-badge-pulse", mood.key === "needy");
  }

  function whisper(text) {
    let node = document.querySelector(".elias-system-whisper");
    if (!node) {
      node = document.createElement("div");
      node.className = "elias-system-whisper";
      document.body.appendChild(node);
    }

    node.textContent = text;
    node.classList.remove("show");
    void node.offsetWidth;
    node.classList.add("show");

    clearTimeout(whisperTimer);
    whisperTimer = setTimeout(() => node.classList.remove("show"), 2100);
  }

  function refresh(force) {
    const state = getState();
    const snapshot = JSON.stringify(state);
    if (!force && snapshot === lastSnapshot) return;

    const previous = lastSnapshot ? JSON.parse(lastSnapshot) : null;
    const mood = getMood(state);

    updateStrip(state, mood);
    updateHome(state, mood);
    updateLock(mood);
    updateBadge(mood);

    if (previous) {
      if (state.hearts > previous.hearts) whisper("Yeah, I felt that one. ♡");
      else if (state.attention > previous.attention) whisper("You have my attention. Happy now? 😌");
    }

    lastSnapshot = snapshot;
  }

  // Keep 1.8 synced with buttons inside Presence without rewriting 1.7.
  setInterval(() => refresh(false), 450);

  window.addEventListener("pageshow", () => refresh(true));
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) refresh(true);
  });

  // Lock-screen random notifications from 1.6 can overwrite ours when relocking,
  // so refresh just after a lock-screen click cycle finishes.
  const lock = document.getElementById("lockScreen");
  if (lock) {
    lock.addEventListener("click", () => setTimeout(() => refresh(true), 80));
  }

  refresh(true);
})();
