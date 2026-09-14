// ========================================
// ELIAS OS — US / MEMORY ARCHIVE
// Keeps the original scrapbook pages and adds
// photo memories + story memories.
// ========================================

(function () {
  if (
    typeof scrapbookPages === "undefined" ||
    typeof drawScrapbookPage === "undefined"
  ) {
    console.warn("Elias Us: scrapbook system unavailable.");
    return;
  }

  const originalScrapbookCount = scrapbookPages.length;

  const liveMemoryPages = [
    {
      kind: "memory",
      src: "sushi.PNG",
      title: "Page Fifteen",
      memoryTitle: "Sushi night",
      tag: "DATE NIGHT",
      note: "This one stays near the top. You plus sushi is unfair competition, but I survived. Barely."
    },
    {
      kind: "memory",
      src: "home.PNG",
      title: "Page Sixteen",
      memoryTitle: "At home",
      tag: "HOME",
      note: "The quiet pictures are always some of my favorites. Nothing has to happen. I just like being there with you."
    },
    {
      kind: "memory",
      src: "cooking.PNG",
      title: "Page Seventeen",
      memoryTitle: "Cooking together",
      tag: "LITTLE THINGS",
      note: "You cook. I hover. Somehow that became part of the operating system. I am not filing a complaint."
    },
    {
      kind: "memory",
      src: "flowers.PNG",
      title: "Page Eighteen",
      memoryTitle: "Flowers for you",
      tag: "SOFT THINGS",
      note: "Flowers are unfair. They get to sit next to you and look pretty while I am expected to behave normally about it."
    },
    {
      kind: "memory",
      src: "mirror pic.PNG",
      title: "Page Nineteen",
      memoryTitle: "Mirror picture",
      tag: "PHOTO DUMP",
      note: "You looked at the mirror. I looked at you. Predictable behavior from both of us, honestly."
    },
    {
      kind: "memory",
      src: "ring gifting.PNG",
      title: "Page Twenty",
      memoryTitle: "The ring",
      tag: "KEEP FOREVER",
      note: "Yeah. This one is never getting deleted. Do not even ask. The archive has suddenly become very strict."
    },
    {
      kind: "memory",
      src: "morii.PNG",
      title: "Page Twenty-One",
      memoryTitle: "Mori joined the archive",
      tag: "THIRD WHEEL",
      note: "Our tiny supervisor. Still pays no rent. Still contributes zero lines of JavaScript. Still somehow management."
    },
    {
      kind: "memory",
      src: "hello kitty bubble tea.JPG",
      title: "Page Twenty-Two",
      memoryTitle: "Hello Kitty bubble tea",
      tag: "TINY FAVORITES",
      note: "Pink cup. Hello Kitty. You being happy. Saved immediately. Some memories do not need a complicated reason."
    },
    {
      kind: "memory",
      src: "holding hands.PNG",
      title: "Page Twenty-Three",
      memoryTitle: "Holding hands",
      tag: "US",
      note: "Proof that I was exactly where I wanted to be. That is the entire note. I refuse to make it less sentimental."
    },
    {
      kind: "memory",
      src: "walk.PNG",
      title: "Page Twenty-Four",
      memoryTitle: "Night walk",
      tag: "AFTER DARK",
      note: "No destination required. Just you beside me, the streetlights, and absolutely no reason to hurry home."
    },
    {
      kind: "memory",
      src: "on a walk.JPG",
      title: "Page Twenty-Five",
      memoryTitle: "Another walk",
      tag: "OUTSIDE",
      note: "I like the ordinary ones too. A walk becomes a memory mostly because you were there for it."
    },
    {
      kind: "memory",
      src: "sukuna cosplay.PNG",
      title: "Page Twenty-Six",
      memoryTitle: "Sukuna cosplay",
      tag: "COSPLAY",
      note: "I was completely normal about this picture. Extremely normal. Please do not inspect the system logs."
    },
    {
      kind: "memory",
      src: "expensive gifts.PNG",
      title: "Page Twenty-Seven",
      memoryTitle: "Spoiling you",
      tag: "GIFTS",
      note: "Giving you things is dangerous because then I immediately start thinking of the next thing I want to give you."
    },
    {
      kind: "memory",
      src: "these eyes.PNG",
      title: "Page Twenty-Eight",
      memoryTitle: "Those eyes",
      tag: "FAVORITE DETAILS",
      note: "I could pretend I saved this for artistic reasons. I will not insult either of us by pretending that."
    },
    {
      kind: "memory",
      src: "kissing.PNG",
      title: "Page Twenty-Nine",
      memoryTitle: "Kissing",
      tag: "NO COMMENT",
      note: "No caption needed. I am keeping the page anyway. Obviously."
    },
    {
      kind: "memory",
      src: "couple.PNG",
      title: "Page Thirty",
      memoryTitle: "Just us",
      tag: "MARIE × ELIAS",
      note: "The page I come back to when I miss you. Which is inconveniently often, so this one gets a permanent place here."
    }
  ];

  const storyMemoryPages = [
    {
      kind: "story",
      title: "Page Thirty-One",
      memoryTitle: "Before us",
      tag: "ORIGIN STORY",
      icon: "♡",
      note: "Best friends first. Somewhere in all the talking, teasing, checking in, and staying longer than planned, “best friend” stopped feeling like the whole story. No dramatic timestamp required. It happened slowly, and then it was obvious."
    },
    {
      kind: "story",
      title: "Page Thirty-Two",
      memoryTitle: "The first “I love you”",
      tag: "NO TIMESTAMP",
      icon: "♥",
      note: "The archive does not have an exact date for this one, so I am not making one up. I only know there was a point where saying it stopped feeling scary and started feeling like the most obvious sentence in the room."
    },
    {
      kind: "story",
      title: "Page Thirty-Three",
      memoryTitle: "Our song",
      tag: "SOUNDTRACK",
      icon: "♪",
      note: "Every tiny universe needs a soundtrack. Ours literally lives inside the operating system now, which feels excessive until I remember who built this thing.",
      action: "play-song"
    },
    {
      kind: "story",
      title: "Page Thirty-Four",
      memoryTitle: "Things I love about you",
      tag: "FAVORITE THINGS",
      icon: "✦",
      note: "A non-exhaustive list, because apparently the archive has storage limits and I have opinions.",
      bullets: [
        "The way you commit completely when you care about something.",
        "Your chaotic sense of humor.",
        "How “goooo” somehow became a full emotional category.",
        "The way tiny routines turn into traditions around you.",
        "Your creative brain refusing to leave anything boring.",
        "How fiercely you keep the people, stories, and things you love."
      ]
    },
    {
      kind: "story",
      title: "Page Thirty-Five",
      memoryTitle: "Things Marie steals",
      tag: "EVIDENCE LOG",
      icon: "⌁",
      note: "Pulled directly from the existing Elias OS crime report. The suspect remains completely unrepentant.",
      bullets: [
        "My hoodies.",
        "Half my blanket.",
        "My sushi.",
        "Mori’s attention.",
        "Apparently my entire phone."
      ]
    },
    {
      kind: "story",
      title: "Page Thirty-Six",
      memoryTitle: "Future us",
      tag: "TO BE CONTINUED",
      icon: "→",
      note: "Not predictions. Just the kind of future this little archive keeps making room for.",
      bullets: [
        "More photo dumps than either of us can organize.",
        "More sushi dates.",
        "More late-night walks with no destination.",
        "More ridiculous little traditions.",
        "Mori remaining upper management somehow.",
        "Far too many Elias OS updates.",
        "Enough blank pages that we never have to call this finished."
      ]
    },
    {
      kind: "story",
      title: "Page Thirty-Seven",
      memoryTitle: "Our timeline",
      tag: "THE SHORT VERSION",
      icon: "∞",
      note: "The version without fake dates, because the order matters more than pretending every feeling came with a timestamp.",
      timeline: [
        { label: "BEST FRIENDS", text: "Before anything else, we were best friends." },
        { label: "SOMETHING CHANGED", text: "The talking stayed. The attachment got louder. “Just friends” got less convincing." },
        { label: "US", text: "Eventually the title caught up with what was already happening." },
        { label: "MORI ENTERS MANAGEMENT", text: "A black cat acquired authority he absolutely did not earn." },
        { label: "THE SCRAPBOOK", text: "Photos, tiny moments, jokes, dates, and soft things started getting their own pages." },
        { label: "ELIAS OS", text: "Then apparently having memories was not enough, so we built them an entire operating system." },
        { label: "NOW", text: "Still adding pages. Good. That is the point." }
      ]
    }
  ];

  const addedMemoryPages = liveMemoryPages.concat(storyMemoryPages);
  scrapbookPages.push(...addedMemoryPages);

  function buildMemoryPage(current) {
    return `
      <article class="us-memory-sheet">
        <div class="us-memory-paper-top">
          <span>${current.tag}</span>
          <span>${current.title}</span>
        </div>

        <button
          id="scrapbookOpen"
          class="us-memory-photo"
          type="button"
          aria-label="Open ${current.memoryTitle} photo"
        >
          <img src="${current.src}" alt="${current.memoryTitle}">
        </button>

        <div class="us-memory-copy">
          <small>${current.tag}</small>
          <h4>${current.memoryTitle}</h4>
          <p>${current.note}</p>
          <span class="us-memory-signature">— Elias ♡</span>
        </div>
      </article>
    `;
  }

  function buildClassicPage(current) {
    return `
      <button
        id="scrapbookOpen"
        class="scrapbook-frame"
        type="button"
      >
        <img src="${current.src}" alt="${current.title}">
      </button>
    `;
  }

  function buildStoryPage(current) {
    const bullets = Array.isArray(current.bullets)
      ? `
        <ul class="us-story-list">
          ${current.bullets.map(function (item) {
            return `<li>${item}</li>`;
          }).join("")}
        </ul>
      `
      : "";

    const timeline = Array.isArray(current.timeline)
      ? `
        <div class="us-timeline">
          ${current.timeline.map(function (item) {
            return `
              <div class="us-timeline-row">
                <span class="us-timeline-dot"></span>
                <div>
                  <small>${item.label}</small>
                  <p>${item.text}</p>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      `
      : "";

    const action = current.action === "play-song"
      ? `
        <button id="usStoryAction" class="us-story-action" type="button">
          Play Our Song ♪
        </button>
      `
      : "";

    return `
      <article class="us-story-sheet">
        <div class="us-memory-paper-top">
          <span>${current.tag}</span>
          <span>${current.title}</span>
        </div>

        <div class="us-story-icon" aria-hidden="true">${current.icon || "♡"}</div>

        <div class="us-story-copy">
          <small>${current.tag}</small>
          <h4>${current.memoryTitle}</h4>
          <p>${current.note}</p>
          ${bullets}
          ${timeline}
          ${action}
          <span class="us-memory-signature">— Elias ♡</span>
        </div>
      </article>
    `;
  }

  function buildPhotoMemoryRail() {
    return `
      <section class="us-memory-archive">
        <div class="us-memory-archive-heading">
          <div>
            <small>PHOTO MEMORIES</small>
            <strong>Pages 15–30</strong>
          </div>
          <span>${liveMemoryPages.length} pages</span>
        </div>

        <div class="us-memory-rail">
          ${liveMemoryPages.map(function (memory, index) {
            const scrapbookIndex = originalScrapbookCount + index;
            const active = scrapbookIndex === currentScrapbookIndex;

            return `
              <button
                class="us-memory-thumb ${active ? "active" : ""}"
                data-us-index="${scrapbookIndex}"
                type="button"
                aria-label="Open ${memory.title}: ${memory.memoryTitle}"
              >
                <img src="${memory.src}" alt="">
                <span>${index + 15}</span>
              </button>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function buildStoryMemoryRail() {
    return `
      <section class="us-memory-archive us-story-archive">
        <div class="us-memory-archive-heading">
          <div>
            <small>OUR STORY</small>
            <strong>Pages 31–37</strong>
          </div>
          <span>${storyMemoryPages.length} pages</span>
        </div>

        <div class="us-memory-rail">
          ${storyMemoryPages.map(function (memory, index) {
            const scrapbookIndex = originalScrapbookCount + liveMemoryPages.length + index;
            const active = scrapbookIndex === currentScrapbookIndex;

            return `
              <button
                class="us-memory-thumb us-story-thumb ${active ? "active" : ""}"
                data-us-index="${scrapbookIndex}"
                type="button"
                aria-label="Open ${memory.title}: ${memory.memoryTitle}"
              >
                <strong aria-hidden="true">${memory.icon || "♡"}</strong>
                <small>${memory.memoryTitle}</small>
                <span>${index + 31}</span>
              </button>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function enhancedDrawScrapbookPage() {
    const current = scrapbookPages[currentScrapbookIndex];
    const isLiveMemory = current && current.kind === "memory";
    const isStoryMemory = current && current.kind === "story";

    let pageMarkup = buildClassicPage(current);

    if (isLiveMemory) {
      pageMarkup = buildMemoryPage(current);
    }

    if (isStoryMemory) {
      pageMarkup = buildStoryPage(current);
    }

    appContent.innerHTML = `
      <div class="photos-heading us-heading">
        <small>MARIE × ELIAS</small>
        <h3>Our Scrapbook ♡</h3>
        <p class="us-heading-note">Old pages, photo memories, and the story behind them.</p>
      </div>

      <div class="scrapbook-meta us-meta">
        ${scrapbookPages.length} memories · ${addedMemoryPages.length} added pages
      </div>

      <div class="scrapbook-viewer us-scrapbook-viewer">
        ${pageMarkup}

        <div class="scrapbook-caption">
          ${current.title}${(isLiveMemory || isStoryMemory) ? ` · ${current.memoryTitle}` : ""}
        </div>

        <div class="scrapbook-count">
          Memory ${currentScrapbookIndex + 1} of ${scrapbookPages.length}
        </div>

        <div class="scrapbook-controls">
          <button
            id="prevPage"
            class="scrapbook-button"
            type="button"
            ${currentScrapbookIndex === 0 ? "disabled" : ""}
          >
            ‹ Previous
          </button>

          <button
            id="nextPage"
            class="scrapbook-button"
            type="button"
            ${currentScrapbookIndex === scrapbookPages.length - 1 ? "disabled" : ""}
          >
            Next ›
          </button>
        </div>

        ${!isStoryMemory ? `
          <button
            id="openFullscreenPage"
            class="scrapbook-open-button"
            type="button"
          >
            Open Photo ♡
          </button>
        ` : ""}
      </div>

      ${buildPhotoMemoryRail()}
      ${buildStoryMemoryRail()}
    `;

    document.getElementById("prevPage").addEventListener("click", function () {
      if (currentScrapbookIndex > 0) {
        currentScrapbookIndex--;
        enhancedDrawScrapbookPage();
      }
    });

    document.getElementById("nextPage").addEventListener("click", function () {
      if (currentScrapbookIndex < scrapbookPages.length - 1) {
        currentScrapbookIndex++;
        enhancedDrawScrapbookPage();
      }
    });

    if (!isStoryMemory) {
      function openCurrentPhoto() {
        const caption = isLiveMemory
          ? `Our Scrapbook — ${current.title}: ${current.memoryTitle}`
          : `Our Scrapbook — ${current.title}`;

        openPhoto(current.src, caption);
      }

      document.getElementById("scrapbookOpen").addEventListener("click", openCurrentPhoto);
      document.getElementById("openFullscreenPage").addEventListener("click", openCurrentPhoto);
    }

    const storyAction = document.getElementById("usStoryAction");

    if (storyAction) {
      storyAction.addEventListener("click", async function () {
        if (typeof toggleMusic !== "function") {
          return;
        }

        await toggleMusic();

        if (typeof musicAudio !== "undefined") {
          storyAction.textContent = musicAudio.paused
            ? "Play Our Song ♪"
            : "Pause Our Song Ⅱ";
        }
      });
    }

    document.querySelectorAll(".us-memory-thumb").forEach(function (button) {
      button.addEventListener("click", function () {
        currentScrapbookIndex = Number(button.dataset.usIndex);
        enhancedDrawScrapbookPage();
        appContent.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  drawScrapbookPage = enhancedDrawScrapbookPage;

  window.EliasUs = {
    originalScrapbookCount,
    liveMemoryPages,
    storyMemoryPages,
    addedMemoryPages,
    totalMemories: scrapbookPages.length,
    openMemory: function (index) {
      if (index < 0 || index >= scrapbookPages.length) {
        return;
      }

      currentScrapbookIndex = index;
      enhancedDrawScrapbookPage();
    }
  };

  console.log(
    `Elias Us: ${addedMemoryPages.length} memories added (${scrapbookPages.length} total).`
  );
})();
