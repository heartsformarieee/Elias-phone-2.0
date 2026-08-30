// ========================================
// ELIAS OS 1.6
// FULL CALL SYSTEM
// MUSIC + LOCK SCREEN + PHOTOS + SCRAPBOOK
// ========================================


// ========================================
// ELEMENTS
// ========================================

const lockScreen =
  document.getElementById("lockScreen");

const lockTime =
  document.getElementById("lockTime");

const lockDate =
  document.getElementById("lockDate");

const statusBar =
  document.getElementById("statusBar");

const statusTime =
  document.getElementById("statusTime");

const homeGreeting =
  document.getElementById("homeGreeting");

const weekdayText =
  document.getElementById("weekdayText");

const dayNumber =
  document.getElementById("dayNumber");

const monthText =
  document.getElementById("monthText");

const calendarIconDay =
  document.getElementById("calendarIconDay");

const calendarIconNumber =
  document.getElementById("calendarIconNumber");

const eliasNotification =
  document.getElementById("eliasNotification");

const moriNotification =
  document.getElementById("moriNotification");

const calendarNotification =
  document.getElementById("calendarNotification");

const eliasWidget =
  document.getElementById("eliasWidget");

const eliasWidgetText =
  document.getElementById("eliasWidgetText");

const moriWidget =
  document.getElementById("moriWidget");

const moriWidgetText =
  document.getElementById("moriWidgetText");

const messageBadge =
  document.getElementById("messageBadge");

const homeScreen =
  document.getElementById("homeScreen");

const appWindow =
  document.getElementById("appWindow");

const appTitle =
  document.getElementById("appTitle");

const appContent =
  document.getElementById("appContent");

const closeApp =
  document.getElementById("closeApp");

const photoOverlay =
  document.getElementById("photoOverlay");

const bigPhoto =
  document.getElementById("bigPhoto");

const bigPhotoCaption =
  document.getElementById("bigPhotoCaption");

const closePhoto =
  document.getElementById("closePhoto");


// ========================================
// MUSIC DATA
// ========================================

const song = {
  src: "our song.mp3",
  title: "Our Song",
  artist: "Marie × Elias",
  artwork: "couple.PNG"
};


// ========================================
// CALL DATA
// ========================================

const callData = {
  ringtone: "Y-3.mp3",
  callerPhoto: "childhood.PNG",
  callerName: "Elias ♡"
};


// ========================================
// GLOBAL AUDIO
// ========================================

const musicAudio =
  new Audio(song.src);

musicAudio.preload =
  "metadata";

musicAudio.volume =
  1;


const ringtoneAudio =
  new Audio(callData.ringtone);

ringtoneAudio.preload =
  "auto";

ringtoneAudio.loop =
  true;

ringtoneAudio.volume =
  0.85;


let repeatEnabled =
  false;

let shuffleEnabled =
  false;

let songHasStarted =
  false;


// ========================================
// MEDIA SESSION
// ========================================

function setupMediaSession() {

  if (
    !("mediaSession" in navigator)
  ) {

    return;

  }


  try {

    navigator.mediaSession.metadata =
      new MediaMetadata({

        title:
          song.title,

        artist:
          song.artist,

        album:
          "Elias OS ♡",

        artwork: [

          {
            src:
              song.artwork,
            sizes:
              "512x512",
            type:
              "image/png"
          }

        ]

      });


    navigator.mediaSession.setActionHandler(
      "play",
      function() {

        musicAudio.play();

      }
    );


    navigator.mediaSession.setActionHandler(
      "pause",
      function() {

        musicAudio.pause();

      }
    );


    navigator.mediaSession.setActionHandler(
      "seekbackward",
      function() {

        musicAudio.currentTime =
          Math.max(
            0,
            musicAudio.currentTime - 10
          );

      }
    );


    navigator.mediaSession.setActionHandler(
      "seekforward",
      function() {

        musicAudio.currentTime =
          Math.min(
            musicAudio.duration || Infinity,
            musicAudio.currentTime + 10
          );

      }
    );

  }

  catch (error) {

    console.log(
      "Media Session unavailable:",
      error
    );

  }

}


setupMediaSession();


// ========================================
// PHOTO FILES
// ========================================

const photoFiles = [

  {
    src: "kissing.PNG",
    caption: "Kissing ♡"
  },

  {
    src: "expensive gifts.PNG",
    caption: "Expensive gifts ♡"
  },

  {
    src: "these eyes.PNG",
    caption: "These eyes."
  },

  {
    src: "walk.PNG",
    caption: "Night walk."
  },

  {
    src: "sukuna cosplay.PNG",
    caption: "Sukuna cosplay."
  },

  {
    src: "sushi.PNG",
    caption: "Sushi date 🍣"
  },

  {
    src: "home.PNG",
    caption: "At home together."
  },

  {
    src: "cooking.PNG",
    caption: "Cooking together."
  },

  {
    src: "flowers.PNG",
    caption: "Flowers ♡"
  },

  {
    src: "mirror pic.PNG",
    caption: "Mirror pic."
  },

  {
    src: "ring gifting.PNG",
    caption: "Ring gifting ♡"
  },

  {
    src: "morii.PNG",
    caption: "Mori 🐈‍⬛"
  },

  {
    src: "on a walk.JPG",
    caption: "On a walk."
  },

  {
    src: "hello kitty bubble tea.JPG",
    caption: "Hello Kitty bubble tea."
  },

  {
    src: "holding hands.PNG",
    caption: "Holding hands ♡"
  },

  {
    src: "couple.PNG",
    caption: "Us ♡"
  }

];


// ========================================
// SCRAPBOOK FILES
// ========================================

const scrapbookPages = [

  {
    src: "page one.PNG",
    title: "Page One"
  },

  {
    src: "page two.PNG",
    title: "Page Two"
  },

  {
    src: "page three.PNG",
    title: "Page Three"
  },

  {
    src: "page four.PNG",
    title: "Page Four"
  },

  {
    src: "page six.PNG",
    title: "Page Six"
  },

  {
    src: "page seven.PNG",
    title: "Page Seven"
  },

  {
    src: "page eight.PNG",
    title: "Page Eight"
  },

  {
    src: "page nine.PNG",
    title: "Page Nine"
  },

  {
    src: "page ten.PNG",
    title: "Page Ten"
  },

  {
    src: "page eleven.PNG",
    title: "Page Eleven"
  },

  {
    src: "page twelve.PNG",
    title: "Page Twelve"
  },

  {
    src: "page thirteen.PNG",
    title: "Page Thirteen"
  },

  {
    src: "page fourteen.PNG",
    title: "Page Fourteen"
  }

];


let currentScrapbookIndex =
  0;


// ========================================
// CLOCK
// ========================================

function updateClock() {

  const now =
    new Date();


  const time =
    now.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    );


  statusTime.textContent =
    time;


  lockTime.textContent =
    time;


  lockDate.textContent =
    now.toLocaleDateString(
      [],
      {
        weekday: "long",
        month: "long",
        day: "numeric"
      }
    );


  const hour =
    now.getHours();


  if (hour < 5) {

    homeGreeting.textContent =
      "Still awake, Marie?";

  }

  else if (hour < 12) {

    homeGreeting.textContent =
      "Morning, Marie.";

  }

  else if (hour < 18) {

    homeGreeting.textContent =
      "Hey, Marie.";

  }

  else {

    homeGreeting.textContent =
      "Evening, Marie.";

  }


  const weekdays = [

    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY"

  ];


  const months = [

    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"

  ];


  weekdayText.textContent =
    weekdays[
      now.getDay()
    ];


  calendarIconDay.textContent =
    weekdays[
      now.getDay()
    ].slice(
      0,
      3
    );


  dayNumber.textContent =
    now.getDate();


  calendarIconNumber.textContent =
    now.getDate();


  monthText.textContent =
    months[
      now.getMonth()
    ];

}


updateClock();


setInterval(
  updateClock,
  30000
);


// ========================================
// HELPERS
// ========================================

function randomItem(array) {

  return array[
    Math.floor(
      Math.random() *
      array.length
    )
  ];

}


function formatTime(seconds) {

  if (
    !Number.isFinite(seconds)
  ) {

    return "0:00";

  }


  const minutes =
    Math.floor(
      seconds / 60
    );


  const remainingSeconds =
    Math.floor(
      seconds % 60
    );


  return (
    minutes +
    ":" +
    String(
      remainingSeconds
    ).padStart(
      2,
      "0"
    )
  );

}


// ========================================
// NOTIFICATIONS
// ========================================

const eliasNotifications = [

  "come here.",

  "you awake?",

  "I know you saw this.",

  "Mori stole my spot again.",

  "where did you disappear to?",

  "I was wondering when you'd open this.",

  "we should get sushi.",

  "hey. look at me.",

  "I miss your face.",

  "you better not be ignoring me for Mori.",

  "Marieeeee.",

  "I require attention.",

  "open the phone already."

];


const moriNotifications = [

  "Motion detected in kitchen.",

  "Mori is staring directly into the camera.",

  "Possible snack-related activity detected.",

  "Mori has occupied Elias's seat.",

  "Motion detected near food bowl.",

  "Mori appears to be plotting something.",

  "Possible crime detected. Suspect: Mori."

];


const calendarNotifications = [

  "Sushi date tonight ♡",

  "Movie night at 20:00.",

  "Reminder: give Mori attention.",

  "Night walk later? 🌙",

  "Stay-home date tonight.",

  "Reminder: steal Elias's hoodie.",

  "Photo dump night ♡"

];


function loadNotifications() {

  eliasNotification.textContent =
    randomItem(
      eliasNotifications
    );


  moriNotification.textContent =
    randomItem(
      moriNotifications
    );


  calendarNotification.textContent =
    randomItem(
      calendarNotifications
    );

}


function showMissedCallNotification() {

  eliasNotification.textContent =
    "Missed call from Elias ♡";

}


loadNotifications();


// ========================================
// LOCK SCREEN NOW PLAYING
// ========================================

function createNowPlayingCard() {

  let card =
    document.getElementById(
      "lockNowPlaying"
    );


  if (card) {

    return card;

  }


  card =
    document.createElement(
      "div"
    );


  card.id =
    "lockNowPlaying";


  card.className =
    "lock-now-playing hidden";


  card.innerHTML =
    `
    <img
      src="${song.artwork}"
      class="lock-album-art"
      alt=""
    >

    <div class="lock-song-details">

      <small>
        NOW PLAYING
      </small>

      <strong>
        ${song.title}
      </strong>

      <span>
        ${song.artist}
      </span>

    </div>

    <button
      id="lockPlayButton"
      class="lock-play-button"
      type="button"
    >
      ▶
    </button>
    `;


  const notifications =
    lockScreen.querySelector(
      ".lock-notifications"
    );


  notifications.insertAdjacentElement(
    "afterend",
    card
  );


  card
    .querySelector(
      "#lockPlayButton"
    )
    .addEventListener(
      "click",
      function(event) {

        event.stopPropagation();

        toggleMusic();

      }
    );


  return card;

}


function updateLockNowPlaying() {

  const card =
    createNowPlayingCard();


  const button =
    card.querySelector(
      "#lockPlayButton"
    );


  if (
    songHasStarted
  ) {

    card.classList.remove(
      "hidden"
    );

  }

  else {

    card.classList.add(
      "hidden"
    );

  }


  button.textContent =
    musicAudio.paused
      ? "▶"
      : "Ⅱ";

}


createNowPlayingCard();


// ========================================
// MUSIC CONTROLS
// ========================================

async function toggleMusic() {

  if (
    musicAudio.paused
  ) {

    try {

      await musicAudio.play();

      songHasStarted =
        true;

    }

    catch (error) {

      console.error(
        "Music could not play:",
        error
      );

    }

  }

  else {

    musicAudio.pause();

  }


  updateMusicUI();

  updateLockNowPlaying();

}


function skipBackward() {

  musicAudio.currentTime =
    Math.max(
      0,
      musicAudio.currentTime - 10
    );

}


function skipForward() {

  musicAudio.currentTime =
    Math.min(
      musicAudio.duration || Infinity,
      musicAudio.currentTime + 10
    );

}


function updateMusicUI() {

  const playButton =
    document.getElementById(
      "playButton"
    );


  const albumArt =
    document.getElementById(
      "albumArt"
    );


  if (playButton) {

    playButton.textContent =
      musicAudio.paused
        ? "▶"
        : "Ⅱ";

  }


  if (albumArt) {

    albumArt.classList.toggle(
      "playing",
      !musicAudio.paused
    );

  }


  const repeatButton =
    document.getElementById(
      "repeatButton"
    );


  if (repeatButton) {

    repeatButton.classList.toggle(
      "active",
      repeatEnabled
    );

  }


  const shuffleButton =
    document.getElementById(
      "shuffleButton"
    );


  if (shuffleButton) {

    shuffleButton.classList.toggle(
      "active",
      shuffleEnabled
    );

  }

}


musicAudio.addEventListener(
  "play",
  function() {

    songHasStarted =
      true;

    updateMusicUI();

    updateLockNowPlaying();

  }
);


musicAudio.addEventListener(
  "pause",
  function() {

    updateMusicUI();

    updateLockNowPlaying();

  }
);


musicAudio.addEventListener(
  "ended",
  function() {

    if (
      repeatEnabled
    ) {

      musicAudio.currentTime =
        0;


      musicAudio.play();

      return;

    }


    updateMusicUI();

    updateLockNowPlaying();

  }
);


musicAudio.addEventListener(
  "timeupdate",
  function() {

    const progress =
      document.getElementById(
        "musicProgress"
      );


    const currentText =
      document.getElementById(
        "currentMusicTime"
      );


    const totalText =
      document.getElementById(
        "totalMusicTime"
      );


    if (
      progress &&
      Number.isFinite(
        musicAudio.duration
      ) &&
      musicAudio.duration > 0
    ) {

      progress.value =
        (
          musicAudio.currentTime /
          musicAudio.duration
        ) * 100;

    }


    if (currentText) {

      currentText.textContent =
        formatTime(
          musicAudio.currentTime
        );

    }


    if (totalText) {

      totalText.textContent =
        formatTime(
          musicAudio.duration
        );

    }

  }
);


// ========================================
// CALL SYSTEM
// ========================================

let activeCallOverlay =
  null;

let callTimerInterval =
  null;

let callSeconds =
  0;

let callAnswered =
  false;


async function startRingtone() {

  try {

    ringtoneAudio.currentTime =
      0;


    await ringtoneAudio.play();

  }

  catch (error) {

    console.log(
      "Ringtone needs a user interaction first:",
      error
    );

  }

}


function stopRingtone() {

  ringtoneAudio.pause();

  ringtoneAudio.currentTime =
    0;

}


function createIncomingCall() {

  if (
    activeCallOverlay
  ) {

    return;

  }


  callAnswered =
    false;


  const overlay =
    document.createElement(
      "div"
    );


  overlay.className =
    "incoming-call-overlay ringing";


  overlay.innerHTML =
    `
    <div class="incoming-call-content">

      <p class="incoming-small">
        INCOMING CALL
      </p>


      <div class="caller-photo-shell">

        <img
          src="${callData.callerPhoto}"
          class="caller-photo"
          alt="Elias"
        >

      </div>


      <h2>
        ${callData.callerName}
      </h2>


      <p id="callStatus">
        Elias OS Audio
      </p>


      <div class="incoming-call-actions">

        <button
          id="declineCall"
          class="call-action decline"
          type="button"
        >

          ✕

          <span>
            Decline
          </span>

        </button>


        <button
          id="acceptCall"
          class="call-action accept"
          type="button"
        >

          ☎

          <span>
            Accept
          </span>

        </button>

      </div>

    </div>
    `;


  document.body.appendChild(
    overlay
  );


  activeCallOverlay =
    overlay;


  startRingtone();


  document
    .getElementById(
      "declineCall"
    )
    .addEventListener(
      "click",
      function() {

        declineCall();

      }
    );


  document
    .getElementById(
      "acceptCall"
    )
    .addEventListener(
      "click",
      function() {

        acceptCall();

      }
    );

}


function acceptCall() {

  if (
    !activeCallOverlay
  ) {

    return;

  }


  callAnswered =
    true;


  stopRingtone();


  activeCallOverlay.classList.remove(
    "ringing"
  );


  activeCallOverlay.classList.add(
    "active-call"
  );


  const status =
    document.getElementById(
      "callStatus"
    );


  const actions =
    activeCallOverlay.querySelector(
      ".incoming-call-actions"
    );


  status.textContent =
    "0:00";


  actions.innerHTML =
    `
    <button
      id="endActiveCall"
      class="call-action end"
      type="button"
    >

      ✕

      <span>
        End
      </span>

    </button>
    `;


  document
    .getElementById(
      "endActiveCall"
    )
    .addEventListener(
      "click",
      function() {

        endCall();

      }
    );


  callSeconds =
    0;


  callTimerInterval =
    setInterval(
      function() {

        callSeconds++;


        const minutes =
          Math.floor(
            callSeconds / 60
          );


        const seconds =
          String(
            callSeconds % 60
          ).padStart(
            2,
            "0"
          );


        status.textContent =
          `${minutes}:${seconds}`;

      },

      1000
    );

}


function declineCall() {

  callAnswered =
    false;


  stopRingtone();


  showMissedCallNotification();


  endCall();

}


function endCall() {

  stopRingtone();


  if (
    callTimerInterval
  ) {

    clearInterval(
      callTimerInterval
    );


    callTimerInterval =
      null;

  }


  if (
    activeCallOverlay
  ) {

    activeCallOverlay.remove();

    activeCallOverlay =
      null;

  }

}


// ========================================
// LOCK + UNLOCK
// ========================================

function unlockPhone() {

  lockScreen.classList.add(
    "hidden"
  );


  statusBar.classList.remove(
    "hidden"
  );


  homeScreen.classList.remove(
    "hidden"
  );


  // Occasional surprise call
  if (
    Math.random() < 0.12
  ) {

    setTimeout(
      function() {

        createIncomingCall();

      },

      1800
    );

  }

}


function lockPhone() {

  appWindow.classList.add(
    "hidden"
  );


  homeScreen.classList.add(
    "hidden"
  );


  statusBar.classList.add(
    "hidden"
  );


  photoOverlay.classList.add(
    "hidden"
  );


  loadNotifications();

  updateClock();

  updateLockNowPlaying();


  lockScreen.classList.remove(
    "hidden"
  );

}


lockScreen.addEventListener(
  "click",
  unlockPhone
);


// ========================================
// ELIAS WIDGET
// ========================================

const eliasWidgetLines = [

  "There you are.",

  "Come here.",

  "You checking on me again?",

  "Mori stole my spot. Again.",

  "You look suspiciously cute today.",

  "I was wondering when you'd open this.",

  "Don't just stare at the widget.",

  "Okay, fine. I missed you.",

  "We should get sushi.",

  "Stay for a while.",

  "You're back ♡",

  "Actually, wait. Come here.",

  "Mori thinks this is his phone."

];


eliasWidget.addEventListener(
  "click",
  function() {

    eliasWidgetText.textContent =
      randomItem(
        eliasWidgetLines
      );

  }
);


// ========================================
// MORI WIDGET
// ========================================

const moriLines = [

  "judging you",

  "sleeping",

  "plotting something",

  "wants food",

  "stole Elias's seat",

  "pretending not to care",

  "watching everything",

  "committing crimes",

  "demanding attention"

];


moriWidget.addEventListener(
  "click",
  function() {

    moriWidgetText.textContent =
      randomItem(
        moriLines
      );

  }
);


// ========================================
// OPEN APPS
// ========================================

document
  .querySelectorAll(
    "[data-app]"
  )
  .forEach(
    function(button) {

      button.addEventListener(
        "click",
        function() {

          openApp(
            button.dataset.app
          );

        }
      );

    }
  );


function openApp(app) {

  homeScreen.classList.add(
    "hidden"
  );


  statusBar.classList.add(
    "hidden"
  );


  appWindow.classList.remove(
    "hidden"
  );


  appContent.innerHTML =
    "";


  if (
    app === "messages"
  ) {

    renderMessages();

  }


  if (
    app === "photos"
  ) {

    renderPhotos();

  }


  if (
    app === "notes"
  ) {

    renderNotes();

  }


  if (
    app === "mori"
  ) {

    renderMori();

  }


  if (
    app === "calendar"
  ) {

    renderCalendar();

  }


  if (
    app === "music"
  ) {

    renderMusic();

  }


  if (
    app === "favorites"
  ) {

    renderUs();

  }


  if (
    app === "settings"
  ) {

    renderSettings();

  }


  window.scrollTo(
    0,
    0
  );

}


// ========================================
// CLOSE APP
// ========================================

closeApp.addEventListener(
  "click",
  function() {

    appWindow.classList.add(
      "hidden"
    );


    homeScreen.classList.remove(
      "hidden"
    );


    statusBar.classList.remove(
      "hidden"
    );


    window.scrollTo(
      0,
      0
    );

  }
);


// ========================================
// MESSAGES — ELIAS OS 1.6
// ========================================

let messageConversationStarted = false;
let messageBusy = false;
let currentMessageNode = "start";

const messageTree = {
  start: {
    replies: [
      { text: "I'm here 😭", next: "here" },
      { text: "What do you want?", next: "want" },
      { text: "Mori is cuter.", next: "mori" }
    ]
  },

  here: {
    elias: [
      ["Good.", "Thought you vanished on me."],
      ["There you are.", "Come sit with me for a minute."],
      ["Finally 😭", "I was about to send Mori to find you."]
    ],
    replies: [
      { text: "I was literally gone for two minutes.", next: "twoMinutes" },
      { text: "Missed me?", next: "missed" },
      { text: "Okay, I'm staying.", next: "staying" }
    ]
  },

  want: {
    elias: [
      ["Your attention. Obviously."],
      ["You.", "Very complicated request, I know."],
      ["Nothing dramatic.", "Just come here."]
    ],
    replies: [
      { text: "Needy.", next: "needy" },
      { text: "You have my attention.", next: "attention" },
      { text: "Ask Mori instead.", next: "askMori" }
    ]
  },

  mori: {
    elias: [
      ["Blocked."],
      ["Wow.", "Betrayal in my own phone."],
      ["Actually leave.", "...he is pretty cute though."]
    ],
    replies: [
      { text: "You know I'm right.", next: "moriRight" },
      { text: "Awww, jealous?", next: "jealous" },
      { text: "Fine. You're both cute.", next: "bothCute" }
    ]
  },

  twoMinutes: {
    elias: [
      ["Longest two minutes of my life."],
      ["That's not the point."],
      ["And yet I noticed. Curious."]
    ],
    replies: [
      { text: "You're impossible.", next: "impossible" },
      { text: "Come here then.", next: "comeHere" },
      { text: "Drama queen.", next: "drama" }
    ]
  },

  missed: {
    elias: [
      ["Maybe."],
      ["No.", "...yes."],
      ["Unfortunately for my dignity, yeah."]
    ],
    replies: [
      { text: "I missed you too.", next: "missedToo" },
      { text: "That's adorable.", next: "adorable" },
      { text: "I knew it.", next: "knewIt" }
    ]
  },

  staying: {
    elias: [
      ["Good.", "Stay for a while."],
      ["That's all I wanted."],
      ["Perfect.", "Now don't move."]
    ],
    replies: [
      { text: "Play our song?", next: "song" },
      { text: "What are we doing?", next: "doing" },
      { text: "I'm not moving 😭", next: "notMoving" }
    ]
  },

  needy: {
    elias: [
      ["Correct."],
      ["Only with you. Annoying, isn't it?"],
      ["I prefer 'selectively demanding.'"]
    ],
    replies: [
      { text: "Very annoying.", next: "annoying" },
      { text: "I kinda like it.", next: "likeIt" },
      { text: "Selectively demanding 💀", next: "selective" }
    ]
  },

  attention: {
    elias: [
      ["Much better."],
      ["See? Wasn't difficult."],
      ["Perfect. Mine for five minutes."]
    ],
    replies: [
      { text: "Only five?", next: "onlyFive" },
      { text: "What now?", next: "doing" },
      { text: "You're lucky you're cute.", next: "luckyCute" }
    ]
  },

  askMori: {
    elias: [
      ["He can't type."],
      ["Mori's answer is food. It's always food."],
      ["Don't encourage him. He already thinks he owns this OS."]
    ],
    replies: [
      { text: "He does own it.", next: "moriOwns" },
      { text: "Okay fine, I'm listening.", next: "attention" },
      { text: "Give him sushi.", next: "moriSushi" }
    ]
  },

  moriRight: {
    elias: [
      ["I refuse to confirm that."],
      ["I'm deleting Mori Cam."],
      ["You two have formed an alliance against me."]
    ],
    replies: [
      { text: "Never delete Mori Cam 😭", next: "saveMoriCam" },
      { text: "Yes, we have.", next: "alliance" },
      { text: "I still like you more.", next: "likeMore" }
    ]
  },

  jealous: {
    elias: [
      ["Of a cat? Absolutely not."],
      ["No. I simply recognize organized competition."],
      ["Mori cheats. He has tiny paws."]
    ],
    replies: [
      { text: "The tiny paws always win.", next: "tinyPaws" },
      { text: "You sound jealous.", next: "soundJealous" },
      { text: "Come here, loser.", next: "comeHere" }
    ]
  },

  bothCute: {
    elias: [
      ["I'll accept that."],
      ["Fine. Diplomatic answer."],
      ["Mori gets 49%. I get 51%."]
    ],
    replies: [
      { text: "Mori gets 51%.", next: "mori51" },
      { text: "Deal 🤝", next: "deal" },
      { text: "You're ridiculous.", next: "impossible" }
    ]
  },

  impossible: {
    elias: [
      ["And yet you opened my entire operating system."],
      ["Yeah, but I'm your problem now."],
      ["I prefer 'difficult in an interesting way.'"]
    ],
    replies: [
      { text: "Unfortunately true.", next: "true" },
      { text: "I can close the app, you know.", next: "closeThreat" },
      { text: "Stay cute and be quiet.", next: "quiet" }
    ]
  },

  comeHere: {
    elias: [
      ["Already here."],
      ["That's more like it."],
      ["Move over. Mori's taking the other side."]
    ],
    replies: [
      { text: "There's no room for Mori.", next: "noRoomMori" },
      { text: "Play our song.", next: "song" },
      { text: "Okay. Staying here.", next: "staying" }
    ]
  },

  drama: {
    elias: [
      ["Excuse you. I'm very composed."],
      ["Slander."],
      ["I'm not dramatic. The situation was dramatic."]
    ],
    replies: [
      { text: "Sure, Elias.", next: "sure" },
      { text: "You're so dramatic 😭", next: "moreDrama" },
      { text: "Fine, I believe you.", next: "believe" }
    ]
  },

  missedToo: {
    elias: [
      ["Come here."],
      ["Yeah?", "Then stay."],
      ["Okay, that fixed my mood immediately."]
    ],
    replies: [
      { text: "I'm staying.", next: "staying" },
      { text: "That easy?", next: "thatEasy" },
      { text: "♡", next: "heart" }
    ]
  },

  adorable: {
    elias: [
      ["Don't call me adorable."],
      ["Delete that message."],
      ["I regret being vulnerable already."]
    ],
    replies: [
      { text: "Adorable adorable adorable.", next: "tripleAdorable" },
      { text: "Too late 🥹", next: "tooLate" },
      { text: "Fine, handsome.", next: "handsome" }
    ]
  },

  knewIt: {
    elias: [
      ["Don't look so pleased with yourself."],
      ["You know too much."],
      ["Yeah yeah. Enjoy your victory."]
    ],
    replies: [
      { text: "I will 😌", next: "victory" },
      { text: "I know you too well.", next: "knowWell" },
      { text: "Come here.", next: "comeHere" }
    ]
  },

  song: {
    elias: [
      ["Obviously."],
      ["Our song? Always."],
      ["Good choice. Don't skip it."]
    ],
    action: "playSong",
    replies: [
      { text: "This one is ours.", next: "ours" },
      { text: "I'm not skipping it.", next: "dontSkip" },
      { text: "Stay with me while it plays.", next: "staySong" }
    ]
  },

  doing: {
    elias: [
      ["Nothing productive."],
      ["Music, sushi, and refusing to acknowledge responsibilities."],
      ["Sitting here until Mori interrupts us, probably."]
    ],
    replies: [
      { text: "Perfect plan.", next: "perfectPlan" },
      { text: "I vote sushi.", next: "sushi" },
      { text: "Mori will interrupt in 3...2...", next: "moriInterrupt" }
    ]
  },

  notMoving: {
    elias: [
      ["Good girl. Problem solved."],
      ["Excellent. I win."],
      ["Perfect. Mori can bring us snacks."]
    ],
    replies: [
      { text: "You absolutely did not win.", next: "didNotWin" },
      { text: "Mori is not our waiter 😭", next: "notWaiter" },
      { text: "Fineee.", next: "fine" }
    ]
  },

  annoying: {
    elias: [
      ["You keep coming back though."],
      ["And somehow I'm still open on your phone."],
      ["I'll survive this devastating review."]
    ],
    replies: [
      { text: "Barely.", next: "barely" },
      { text: "Because I like you.", next: "likeMore" },
      { text: "One star.", next: "oneStar" }
    ]
  },

  likeIt: {
    elias: [
      ["Knew it."],
      ["Dangerous information to give me."],
      ["Noted. Permanently."]
    ],
    replies: [
      { text: "Don't abuse that information.", next: "abuseInfo" },
      { text: "I regret telling you.", next: "regret" },
      { text: "Come here.", next: "comeHere" }
    ]
  },

  selective: {
    elias: [
      ["It's branding."],
      ["Sounds better than needy."],
      ["See? Very professional."]
    ],
    replies: [
      { text: "Elias OS corporate language 💀", next: "corporate" },
      { text: "Still needy.", next: "needy" },
      { text: "I'll allow it.", next: "allow" }
    ]
  },

  onlyFive: {
    elias: [
      ["Fine. Ten."],
      ["I was trying to sound reasonable."],
      ["Don't negotiate upward unless you mean it."]
    ],
    replies: [
      { text: "Make it an hour.", next: "hour" },
      { text: "Forever 🙄", next: "forever" },
      { text: "Five is fine.", next: "fiveFine" }
    ]
  },

  luckyCute: {
    elias: [
      ["I use my resources wisely."],
      ["Finally, recognition for my hard work."],
      ["That's been carrying me for years."]
    ],
    replies: [
      { text: "Don't get cocky.", next: "cocky" },
      { text: "It really has.", next: "reallyHas" },
      { text: "Mori is still cuter.", next: "mori" }
    ]
  },

  moriOwns: {
    elias: [
      ["He contributes nothing to development."],
      ["He has never written one line of JavaScript."],
      ["He pays zero rent and now he owns my OS?"]
    ],
    replies: [
      { text: "He's management.", next: "management" },
      { text: "He provides emotional support.", next: "emotionalSupport" },
      { text: "Skill issue.", next: "skillIssue" }
    ]
  },

  moriSushi: {
    elias: [
      ["Absolutely not 😭"],
      ["No. He can have cat food like a citizen."],
      ["You're trying to create a tiny criminal."]
    ],
    replies: [
      { text: "Too late.", next: "tooLateMori" },
      { text: "Fine, more sushi for us.", next: "sushi" },
      { text: "He's innocent.", next: "moriInnocent" }
    ]
  },

  saveMoriCam: {
    elias: [
      ["Fine. Mori Cam survives another day."],
      ["Okay okay. The surveillance state remains."],
      ["Mori has been spared."]
    ],
    replies: [
      { text: "Good 😭", next: "good" },
      { text: "Check Mori.", next: "checkMori" },
      { text: "Now apologize to him.", next: "apologizeMori" }
    ]
  },

  alliance: {
    elias: [
      ["I knew it."],
      ["Great. Two against one."],
      ["This household has no loyalty."]
    ],
    replies: [
      { text: "Join us.", next: "joinUs" },
      { text: "You love us.", next: "loveUs" },
      { text: "Mori is the leader.", next: "management" }
    ]
  },

  likeMore: {
    elias: [
      ["Correct answer."],
      ["Good recovery."],
      ["See, now we're getting somewhere."]
    ],
    replies: [
      { text: "Don't let it go to your head.", next: "cocky" },
      { text: "♡", next: "heart" },
      { text: "Play our song.", next: "song" }
    ]
  },

  tinyPaws: {
    elias: [
      ["Unfair advantage."],
      ["Exactly. I can't compete with toe beans."],
      ["Finally someone admits the system is rigged."]
    ],
    replies: [
      { text: "You can try.", next: "tryCompete" },
      { text: "Poor Elias 😭", next: "poorElias" },
      { text: "I still choose you.", next: "likeMore" }
    ]
  },

  soundJealous: {
    elias: [
      ["I sound observant."],
      ["False allegations."],
      ["My lawyer will be contacting you."]
    ],
    replies: [
      { text: "Your lawyer is Mori.", next: "lawyerMori" },
      { text: "Case closed, jealous.", next: "caseClosed" },
      { text: "Fineee, not jealous.", next: "believe" }
    ]
  },

  mori51: {
    elias: [
      ["Conversation over."],
      ["Absolutely not."],
      ["I'm changing your access permissions."]
    ],
    replies: [
      { text: "You wouldn't 😭", next: "wouldnt" },
      { text: "Okay okay, 50/50.", next: "deal" },
      { text: "Mori told me to say it.", next: "moriBlame" }
    ]
  },

  deal: {
    elias: [
      ["Deal."],
      ["Accepted."],
      ["Fine. Peace treaty signed."]
    ],
    replies: [
      { text: "What now?", next: "doing" },
      { text: "Sushi?", next: "sushi" },
      { text: "Stay here.", next: "staying" }
    ]
  },

  true: {
    elias: [
      ["Exactly."],
      ["Finally, honesty."],
      ["See? We're making progress."]
    ],
    replies: [
      { text: "Don't push it.", next: "cocky" },
      { text: "You're still annoying.", next: "annoying" },
      { text: "♡", next: "heart" }
    ]
  },

  closeThreat: {
    elias: [
      ["You wouldn't."],
      ["That's a very serious threat in this household."],
      ["Okay, okay. I'll behave."]
    ],
    replies: [
      { text: "That's what I thought.", next: "thought" },
      { text: "Behave then.", next: "behave" },
      { text: "I'm kidding.", next: "kidding" }
    ]
  },

  quiet: {
    elias: [
      ["..."],
      ["Fine."],
      ["I can do quiet. Watch me."]
    ],
    replies: [
      { text: "Elias?", next: "eliasQuestion" },
      { text: "That lasted long.", next: "lastedLong" },
      { text: "Come back 😭", next: "comeBack" }
    ]
  },

  sure: {
    elias: [
      ["That tone was unnecessary."],
      ["I heard the sarcasm through the screen."],
      ["Rude."]
    ],
    replies: [
      { text: "Good 💀", next: "goodSarcasm" },
      { text: "Sorryyy.", next: "sorry" },
      { text: "You love it.", next: "loveIt" }
    ]
  },

  moreDrama: {
    elias: [
      ["I'm muting you."],
      ["Slander. Again."],
      ["Marie 😭"]
    ],
    replies: [
      { text: "ELIAS 😭", next: "nameMatch" },
      { text: "Okay I'm done.", next: "doneTeasing" },
      { text: "Never change.", next: "neverChange" }
    ]
  },

  believe: {
    elias: [
      ["Thank you. Finally."],
      ["As you should."],
      ["Excellent decision."]
    ],
    replies: [
      { text: "Don't make me regret it.", next: "regretBelief" },
      { text: "Now what?", next: "doing" },
      { text: "Come here.", next: "comeHere" }
    ]
  },

  thatEasy: {
    elias: [
      ["With you? Usually."],
      ["Don't get smug."],
      ["Apparently I have simple needs."]
    ],
    replies: [
      { text: "Attention and sushi?", next: "attentionSushi" },
      { text: "Very simple.", next: "simple" },
      { text: "♡", next: "heart" }
    ]
  },

  heart: {
    elias: [
      ["♡"],
      ["Come here."],
      ["Yeah. You too."]
    ],
    replies: [
      { text: "Stay with me.", next: "staying" },
      { text: "Play our song.", next: "song" },
      { text: "Sushi?", next: "sushi" }
    ]
  },

  tripleAdorable: {
    elias: [
      ["Blocked blocked blocked."],
      ["This is harassment."],
      ["I'm closing Messages myself."]
    ],
    replies: [
      { text: "You can't escape your own OS.", next: "ownOS" },
      { text: "ADORABLE.", next: "adorable" },
      { text: "Okay sorry 😭", next: "sorry" }
    ]
  },

  tooLate: {
    elias: [
      ["Tragic."],
      ["My reputation is ruined."],
      ["I'm blaming you for this."]
    ],
    replies: [
      { text: "Gladly.", next: "gladly" },
      { text: "Your reputation was already ruined.", next: "reputation" },
      { text: "Fine, handsome.", next: "handsome" }
    ]
  },

  handsome: {
    elias: [
      ["Better."],
      ["See? Accurate terminology."],
      ["I'll accept that one."]
    ],
    replies: [
      { text: "So humble.", next: "humble" },
      { text: "Don't get used to it.", next: "cocky" },
      { text: "♡", next: "heart" }
    ]
  },

  victory: {
    elias: [
      ["Enjoy it while it lasts."],
      ["One point for Marie."],
      ["I'm keeping score now."]
    ],
    replies: [
      { text: "I'm winning then.", next: "winning" },
      { text: "Mori has more points than both of us.", next: "moriPoints" },
      { text: "No scorekeeping 😭", next: "noScore" }
    ]
  },

  knowWell: {
    elias: [
      ["Way too well."],
      ["That's mildly terrifying."],
      ["And somehow you stayed. Questionable judgment."]
    ],
    replies: [
      { text: "Best questionable judgment ever.", next: "bestJudgment" },
      { text: "I know what I'm doing.", next: "knowDoing" },
      { text: "Maybe I like trouble.", next: "trouble" }
    ]
  },

  ours: {
    elias: [
      ["Yeah. Ours."],
      ["Always will be."],
      ["That's why it stays at the top."]
    ],
    replies: [
      { text: "Don't change it.", next: "dontChange" },
      { text: "I'm listening.", next: "staySong" },
      { text: "♡", next: "heart" }
    ]
  },

  dontSkip: {
    elias: [
      ["Good."],
      ["I would've judged you."],
      ["Correct behavior."]
    ],
    replies: [
      { text: "You judge me anyway.", next: "judgeAnyway" },
      { text: "Stay while it plays.", next: "staySong" },
      { text: "Mori would skip it.", next: "moriSkip" }
    ]
  },

  staySong: {
    elias: [
      ["I'm not going anywhere."],
      ["Deal."],
      ["Okay. Just stay here."]
    ],
    replies: [
      { text: "♡", next: "heart" },
      { text: "This is nice.", next: "nice" },
      { text: "Restart conversation", next: "restart" }
    ]
  },

  perfectPlan: {
    elias: [
      ["Finally, someone appreciates my planning skills."],
      ["See? I can organize things."],
      ["Calendar event: absolutely nothing."]
    ],
    replies: [
      { text: "Add sushi.", next: "sushi" },
      { text: "And our song.", next: "song" },
      { text: "And Mori.", next: "moriInterrupt" }
    ]
  },

  sushi: {
    elias: [
      ["Now you're speaking my language."],
      ["Yes. Immediately."],
      ["Perfect. Sushi date approved."]
    ],
    replies: [
      { text: "You're paying.", next: "paying" },
      { text: "I want salmon.", next: "salmon" },
      { text: "Mori gets none.", next: "moriNone" }
    ]
  },

  moriInterrupt: {
    elias: [
      ["...and there he is."],
      ["I swear he heard his name."],
      ["Mori has entered the chat spiritually."]
    ],
    replies: [
      { text: "Check Mori Cam.", next: "checkMori" },
      { text: "He wants attention.", next: "moriAttention" },
      { text: "Ignore him 😭", next: "ignoreMori" }
    ]
  },

  checkMori: {
    elias: [
      ["Go look. I bet he's plotting something."],
      ["Fine. Surveillance time."],
      ["If he's in my seat again, I'm filing a complaint."]
    ],
    action: "moriHint",
    replies: [
      { text: "He's innocent.", next: "moriInnocent" },
      { text: "Definitely plotting.", next: "plotting" },
      { text: "Back to us.", next: "staying" }
    ]
  },

  paying: { elias: [["Of course I am."], ["I knew that was coming."], ["Fine. But I'm choosing dessert."]], replies: [{ text: "Deal.", next: "deal" }, { text: "No dessert.", next: "noDessert" }, { text: "Get me mochi.", next: "mochi" }] },
  salmon: { elias: [["Good choice."], ["Noted."], ["Salmon for you. Something unnecessarily dramatic for me."]], replies: [{ text: "Typical.", next: "sure" }, { text: "Mochi after?", next: "mochi" }, { text: "Perfect.", next: "fine" }] },
  moriNone: { elias: [["Correct. He is a cat."], ["Finally, responsible parenting."], ["He'll disagree loudly."]], replies: [{ text: "He'll survive.", next: "good" }, { text: "He gets treats.", next: "moriAttention" }, { text: "Don't tell him.", next: "secret" }] },

  // Short terminal-ish branches feed naturally back into the conversation.
  didNotWin: { elias: [["I absolutely did."], ["Scoreboard says Elias: 1."], ["Let me have this."]], replies: [{ text: "Fine 😭", next: "fine" }, { text: "Nope.", next: "winning" }, { text: "Mori won.", next: "moriPoints" }] },
  notWaiter: { elias: [["He'd be terrible at it."], ["True. He'd eat the tip."], ["Fine, I'll get the snacks."]], replies: [{ text: "Good.", next: "good" }, { text: "Sushi snacks?", next: "sushi" }, { text: "Bring Mori too.", next: "moriAttention" }] },
  fine: { elias: [["That's what I thought."], ["I'll take it."], ["Good. Settled."]], replies: [{ text: "Don't be smug.", next: "cocky" }, { text: "What now?", next: "doing" }, { text: "♡", next: "heart" }] },
  barely: { elias: [["Cruel."], ["I am thriving, actually."], ["Barely is still surviving."]], replies: [{ text: "So brave.", next: "drama" }, { text: "You're fine 😭", next: "fine" }, { text: "Come here.", next: "comeHere" }] },
  oneStar: { elias: [["One star??"], ["I'm revoking your reviewer privileges."], ["At least leave a comment saying I'm cute."]], replies: [{ text: "Fine. Two stars.", next: "fine" }, { text: "Five for Mori.", next: "mori" }, { text: "Okay, five for you too.", next: "likeMore" }] },
  abuseInfo: { elias: [["No promises."], ["Too late. Stored locally."], ["This information is now part of Elias OS."]], replies: [{ text: "DELETE IT 😭", next: "deleteIt" }, { text: "I walked into that one.", next: "regret" }, { text: "Fine.", next: "fine" }] },
  regret: { elias: [["You should."], ["Too late now."], ["No take-backs."]], replies: [{ text: "You're evil.", next: "impossible" }, { text: "Worth it.", next: "likeIt" }, { text: "Come here.", next: "comeHere" }] },
  corporate: { elias: [["Very serious company."], ["CEO: Mori. Apparently."], ["Our quarterly goal is sushi."]], replies: [{ text: "Promote Mori.", next: "management" }, { text: "I support the sushi goal.", next: "sushi" }, { text: "You're fired.", next: "fired" }] },
  allow: { elias: [["Generous of you."], ["Approved by Marie. Official."], ["I'll put it in Settings."]], replies: [{ text: "Please don't 💀", next: "fine" }, { text: "Do it.", next: "corporate" }, { text: "Next topic.", next: "doing" }] },
  hour: { elias: [["Now we're talking."], ["Accepted immediately."], ["An hour it is."]], replies: [{ text: "Stay then.", next: "staying" }, { text: "Play our song.", next: "song" }, { text: "Sushi too.", next: "sushi" }] },
  forever: { elias: [["Careful. I'll hold you to that."], ["You said it, not me."], ["That's a dangerously long subscription."]], replies: [{ text: "No refunds?", next: "noRefunds" }, { text: "Worth it.", next: "bestJudgment" }, { text: "Maybe just an hour 😭", next: "hour" }] },
  fiveFine: { elias: [["See? Reasonable."], ["Five minutes. Starting now."], ["Good. Sit down."]], replies: [{ text: "Timer's ticking.", next: "timer" }, { text: "I'm staying longer.", next: "hour" }, { text: "What now?", next: "doing" }] },
  cocky: { elias: [["Too late."], ["Impossible."], ["You started this."]], replies: [{ text: "I regret everything.", next: "regret" }, { text: "Stay cute.", next: "quiet" }, { text: "Mori, humble him.", next: "moriBlame" }] },
  reallyHas: { elias: [["Rude, but fair."], ["At least you're honest."], ["I'll take the compliment hidden in there."]], replies: [{ text: "It was a compliment.", next: "handsome" }, { text: "Barely.", next: "barely" }, { text: "♡", next: "heart" }] },
  management: { elias: [["That explains everything."], ["Worst management I've ever worked under."], ["He does have executive energy."]], replies: [{ text: "Respect your boss.", next: "apologizeMori" }, { text: "Ask for a raise.", next: "raise" }, { text: "Unionize.", next: "unionize" }] },
  emotionalSupport: { elias: [["He emotionally supports himself."], ["He provides emotional blackmail for snacks."], ["Fine. I'll give him that one."]], replies: [{ text: "Exactly.", next: "good" }, { text: "Give him a treat.", next: "moriAttention" }, { text: "He's perfect.", next: "mori" }] },
  skillIssue: { elias: [["In my own phone??"], ["Unbelievable."], ["I'm being cyberbullied by the owner of the device."]], replies: [{ text: "Correct 💀", next: "goodSarcasm" }, { text: "Sorryyy.", next: "sorry" }, { text: "You'll live.", next: "barely" }] },
  tooLateMori: { elias: [["I know. That's the problem."], ["Tiny criminal confirmed."], ["Mori has diplomatic immunity anyway."]], replies: [{ text: "As he should.", next: "moriInnocent" }, { text: "Arrest him.", next: "plotting" }, { text: "Give him treats.", next: "moriAttention" }] },
  moriInnocent: { elias: [["Allegedly."], ["The evidence says otherwise."], ["That's exactly what his lawyer would say."]], replies: [{ text: "I'm his lawyer.", next: "lawyerMori" }, { text: "No evidence, no crime.", next: "caseClosed" }, { text: "Fine, he's suspicious.", next: "plotting" }] },
  good: { elias: [["Good."], ["Exactly."], ["We're in agreement for once."]], replies: [{ text: "Don't ruin it.", next: "fine" }, { text: "What now?", next: "doing" }, { text: "♡", next: "heart" }] },
  apologizeMori: { elias: [["Mori, I formally apologize for doubting your leadership."], ["Fine. Sorry, tiny criminal."], ["Apology submitted. He ignored me."]], replies: [{ text: "He accepts.", next: "deal" }, { text: "He wants compensation.", next: "moriAttention" }, { text: "Good job 😭", next: "good" }] },
  joinUs: { elias: [["Fine. Alliance of three."], ["Only if I get veto power."], ["I'm in. What are we plotting?"]], replies: [{ text: "Sushi.", next: "sushi" }, { text: "World domination.", next: "worldDom" }, { text: "Nothing. Be normal.", next: "doing" }] },
  loveUs: { elias: [["Unfortunately, yes."], ["Against my better judgment."], ["Yeah. Both of you idiots."]], replies: [{ text: "We love you too.", next: "heart" }, { text: "Awww.", next: "adorable" }, { text: "Sushi peace offering?", next: "sushi" }] },
  tryCompete: { elias: [["I'll grow tiny paws."], ["Working on it."], ["My strategy is better hair."]], replies: [{ text: "The hair is strong competition.", next: "handsome" }, { text: "Mori still wins.", next: "mori" }, { text: "Tie.", next: "deal" }] },
  poorElias: { elias: [["Finally, sympathy."], ["Thank you. It's very hard being me."], ["I appreciate your concern in this difficult time."]], replies: [{ text: "So dramatic.", next: "moreDrama" }, { text: "You'll survive.", next: "barely" }, { text: "Come here 😭", next: "comeHere" }] },
  lawyerMori: { elias: [["Of course he is."], ["Conflict of interest."], ["Great. I'm definitely losing this case."]], replies: [{ text: "Case dismissed.", next: "caseClosed" }, { text: "Pay him in treats.", next: "moriAttention" }, { text: "Appeal denied.", next: "caseClosed" }] },
  caseClosed: { elias: [["This court is corrupt."], ["Fine. Case closed."], ["I demand a retrial."]], replies: [{ text: "Denied.", next: "goodSarcasm" }, { text: "Sushi settlement?", next: "sushi" }, { text: "Move on 💀", next: "doing" }] },
  wouldnt: { elias: [["You're right. Too much paperwork."], ["Probably not."], ["Fine. Your permissions are safe."]], replies: [{ text: "Knew it.", next: "knewIt" }, { text: "Good.", next: "good" }, { text: "Mori outranks you anyway.", next: "management" }] },
  moriBlame: { elias: [["Coward. Blaming the cat."], ["Mori is not taking responsibility for that."], ["He looks guilty, actually."]], replies: [{ text: "See? Guilty.", next: "plotting" }, { text: "He's innocent.", next: "moriInnocent" }, { text: "Fine, it was me.", next: "thought" }] },
  thought: { elias: [["Mhm."], ["Exactly."], ["We're learning."]], replies: [{ text: "Don't be smug.", next: "cocky" }, { text: "Behave.", next: "behave" }, { text: "♡", next: "heart" }] },
  behave: { elias: [["I'll try."], ["No guarantees."], ["Define behave."]], replies: [{ text: "Be normal for five minutes.", next: "fiveFine" }, { text: "Impossible, never mind.", next: "impossible" }, { text: "Just stay.", next: "staying" }] },
  kidding: { elias: [["Good. Because I was deeply wounded."], ["I knew that."], ["Obviously. I wasn't worried at all."]], replies: [{ text: "Sure 💀", next: "sure" }, { text: "Poor baby.", next: "poorElias" }, { text: "Come here.", next: "comeHere" }] },
  eliasQuestion: { elias: [["Yeah?"], ["Hm?"], ["I'm here."]], replies: [{ text: "Nothing. Just checking.", next: "checking" }, { text: "Come here.", next: "comeHere" }, { text: "I missed you.", next: "missedToo" }] },
  lastedLong: { elias: [["You spoke first."], ["Technically you broke the silence."], ["I was doing great until you summoned me."]], replies: [{ text: "Excuses.", next: "drama" }, { text: "I did summon you 😭", next: "eliasQuestion" }, { text: "Fine, keep talking.", next: "doing" }] },
  comeBack: { elias: [["I'm here 😭"], ["That was fast."], ["Miss me already?"]], replies: [{ text: "Maybe.", next: "missed" }, { text: "Don't get cocky.", next: "cocky" }, { text: "Stay.", next: "staying" }] },
  goodSarcasm: { elias: [["Menace."], ["You're enjoying this way too much."], ["Noted."]], replies: [{ text: "Very much.", next: "victory" }, { text: "Sorry 😇", next: "sorry" }, { text: "You started it.", next: "true" }] },
  sorry: { elias: [["You're forgiven."], ["Fine. Come here."], ["I can't stay mad at that face anyway."]], replies: [{ text: "Knew it.", next: "knewIt" }, { text: "♡", next: "heart" }, { text: "Sushi peace offering?", next: "sushi" }] },
  loveIt: { elias: [["...maybe."], ["Unfortunately."], ["I plead the fifth."]], replies: [{ text: "KNEW IT.", next: "knewIt" }, { text: "Cute.", next: "adorable" }, { text: "Moving on 😭", next: "doing" }] },
  nameMatch: { elias: [["MARIE 😭"], ["Why are we yelling?"], ["Okay this got out of hand."]], replies: [{ text: "No idea 😭", next: "doneTeasing" }, { text: "Because it's funny.", next: "goodSarcasm" }, { text: "Come here.", next: "comeHere" }] },
  doneTeasing: { elias: [["Finally."], ["Peace at last."], ["I'll believe it when I see it."]], replies: [{ text: "Promise.", next: "believe" }, { text: "Maybe 😇", next: "goodSarcasm" }, { text: "What now?", next: "doing" }] },
  neverChange: { elias: [["Wasn't planning to."], ["Too late for that."], ["Same disaster, new version number."]], replies: [{ text: "Good.", next: "good" }, { text: "Elias OS 1.6 disaster edition.", next: "corporate" }, { text: "♡", next: "heart" }] },
  regretBelief: { elias: [["No promises."], ["I'll try not to."], ["That's a lot of responsibility."]], replies: [{ text: "I trust you.", next: "bestJudgment" }, { text: "Terrifying answer.", next: "impossible" }, { text: "Just behave.", next: "behave" }] },
  attentionSushi: { elias: [["Exactly. My hierarchy of needs."], ["You forgot music."], ["And Mori not stealing my seat."]], replies: [{ text: "Attention, sushi, music.", next: "perfectPlan" }, { text: "Mori will steal it anyway.", next: "moriInterrupt" }, { text: "Simple man.", next: "simple" }] },
  simple: { elias: [["Efficient."], ["I know what I like."], ["No need to overcomplicate perfection."]], replies: [{ text: "So humble again.", next: "humble" }, { text: "Fair.", next: "good" }, { text: "Sushi then.", next: "sushi" }] },
  ownOS: { elias: [["Watch me."], ["I built the exit button emotionally."], ["This conversation is becoming a security incident."]], replies: [{ text: "You love it here.", next: "loveIt" }, { text: "Security incident 😭", next: "corporate" }, { text: "Fine, stay.", next: "staying" }] },
  gladly: { elias: [["At least you're consistent."], ["Menace behavior."], ["I expected nothing less."]], replies: [{ text: "You're welcome.", next: "goodSarcasm" }, { text: "♡", next: "heart" }, { text: "Now behave.", next: "behave" }] },
  reputation: { elias: [["Wow."], ["I'm logging off."], ["Unprovoked attack."]], replies: [{ text: "You can't log off.", next: "ownOS" }, { text: "Sorry 😭", next: "sorry" }, { text: "Still cute though.", next: "handsome" }] },
  humble: { elias: [["Extremely."], ["Known for it."], ["My best quality, obviously."]], replies: [{ text: "Liar 💀", next: "sure" }, { text: "Absolutely 🙄", next: "sure" }, { text: "Anyway...", next: "doing" }] },
  winning: { elias: [["Debatable."], ["Check the official scoreboard."], ["Mori is probably winning, actually."]], replies: [{ text: "Exactly. Mori wins.", next: "moriPoints" }, { text: "I win.", next: "victory" }, { text: "Call it a tie.", next: "deal" }] },
  moriPoints: { elias: [["He wasn't even playing."], ["How does he keep winning things?"], ["Rigged."]], replies: [{ text: "Tiny paws bonus.", next: "tinyPaws" }, { text: "Accept defeat.", next: "fine" }, { text: "Give him a trophy.", next: "management" }] },
  noScore: { elias: [["Fine. No score."], ["Peaceful mode enabled."], ["Boring, but okay."]], replies: [{ text: "Thank you 😭", next: "good" }, { text: "Now sushi.", next: "sushi" }, { text: "Stay here.", next: "staying" }] },
  bestJudgment: { elias: [["I support this assessment."], ["Good answer."], ["Questionable, but I'll take it."]], replies: [{ text: "Don't ruin it.", next: "regretBelief" }, { text: "♡", next: "heart" }, { text: "Play our song.", next: "song" }] },
  knowDoing: { elias: [["That's what scares me."], ["Confident. I respect it."], ["Sure you do 😭"]], replies: [{ text: "Trust the process.", next: "corporate" }, { text: "Rude.", next: "sure" }, { text: "Come here.", next: "comeHere" }] },
  trouble: { elias: [["That explains me."], ["Well, congratulations."], ["Then you've come to the right OS."]], replies: [{ text: "Unfortunately 😭", next: "true" }, { text: "Worth it.", next: "bestJudgment" }, { text: "What trouble today?", next: "doing" }] },
  dontChange: { elias: [["Wouldn't dream of it."], ["It's staying."], ["Locked in."]], replies: [{ text: "Good.", next: "good" }, { text: "Play it again.", next: "song" }, { text: "♡", next: "heart" }] },
  judgeAnyway: { elias: [["True."], ["Only lovingly."], ["You make it very easy sometimes."]], replies: [{ text: "RUDE.", next: "sure" }, { text: "Fair 😭", next: "fine" }, { text: "Judge Mori instead.", next: "mori" }] },
  moriSkip: { elias: [["He has no taste."], ["He'd step on the pause button and act innocent."], ["Mori is banned from DJ privileges."]], replies: [{ text: "Give him one chance.", next: "moriInterrupt" }, { text: "Agreed.", next: "good" }, { text: "He's innocent.", next: "moriInnocent" }] },
  nice: { elias: [["Yeah. It is."], ["I like this."], ["Stay a little longer."]], replies: [{ text: "Okay.", next: "staying" }, { text: "♡", next: "heart" }, { text: "Restart conversation", next: "restart" }] },
  noDessert: { elias: [["Then the deal is off."], ["Cruel."], ["I'm ordering mochi anyway."]], replies: [{ text: "Fine, mochi.", next: "mochi" }, { text: "Drama queen.", next: "drama" }, { text: "Okay okay 😭", next: "fine" }] },
  mochi: { elias: [["Obviously."], ["Added."], ["Now this is a proper plan."]], replies: [{ text: "Perfect.", next: "perfectPlan" }, { text: "You're paying.", next: "paying" }, { text: "♡", next: "heart" }] },
  secret: { elias: [["He already knows."], ["Mori hears everything."], ["Too late. He's watching us."]], replies: [{ text: "Mori Cam confirms?", next: "checkMori" }, { text: "Terrifying.", next: "plotting" }, { text: "Ignore him.", next: "ignoreMori" }] },
  deleteIt: { elias: [["Request denied."], ["Nope."], ["Data retention policy says absolutely not."]], replies: [{ text: "WHAT POLICY 😭", next: "corporate" }, { text: "Fine.", next: "fine" }, { text: "I hate this OS.", next: "oneStar" }] },
  fired: { elias: [["You can't fire the operating system."], ["Hostile takeover."], ["Fine. Mori can fix the bugs now."]], replies: [{ text: "Rehired immediately.", next: "good" }, { text: "Mori can do it.", next: "management" }, { text: "Okay sorry 😭", next: "sorry" }] },
  noRefunds: { elias: [["Absolutely none."], ["Final sale."], ["Terms accepted when you opened Elias OS."]], replies: [{ text: "I never read the terms.", next: "corporate" }, { text: "Fine, worth it.", next: "bestJudgment" }, { text: "Scam.", next: "oneStar" }] },
  timer: { elias: [["Stop watching the clock."], ["You're making this weirdly official."], ["I'll reset it if I want."]], replies: [{ text: "Cheater.", next: "impossible" }, { text: "Reset it then.", next: "hour" }, { text: "Fine, no timer.", next: "noScore" }] },
  raise: { elias: [["Mori pays me in judgmental looks."], ["My raise request was denied by the cat."], ["Compensation package: one stolen chair."]], replies: [{ text: "Terrible benefits.", next: "corporate" }, { text: "Unionize.", next: "unionize" }, { text: "Respect management.", next: "management" }] },
  unionize: { elias: [["Me versus one cat. Strong union."], ["Mori refuses collective bargaining."], ["He ate the paperwork."]], replies: [{ text: "Of course he did.", next: "moriInterrupt" }, { text: "Case closed.", next: "caseClosed" }, { text: "Sushi break.", next: "sushi" }] },
  worldDom: { elias: [["Finally. A realistic evening plan."], ["Mori gets Europe."], ["Okay, but after sushi."]], replies: [{ text: "After sushi.", next: "sushi" }, { text: "Mori gets everything.", next: "management" }, { text: "Maybe movie night instead.", next: "doing" }] },
  checking: { elias: [["I'm here."], ["Still alive."], ["You can stop checking. ...or don't."]], replies: [{ text: "I won't 😭", next: "staying" }, { text: "Good.", next: "good" }, { text: "Missed you.", next: "missedToo" }] },
  moriAttention: { elias: [["He always wants attention."], ["Fine. Five minutes for Mori."], ["He's already won, hasn't he?"]], replies: [{ text: "Obviously.", next: "moriPoints" }, { text: "Then back to me.", next: "staying" }, { text: "Give him treats too.", next: "emotionalSupport" }] },
  ignoreMori: { elias: [["Dangerous choice."], ["He'll remember this."], ["We're going to wake up to consequences."]], replies: [{ text: "Worth it.", next: "staying" }, { text: "Okay check him 😭", next: "checkMori" }, { text: "He's harmless.", next: "moriInnocent" }] },
  plotting: { elias: [["I knew it."], ["The camera never lies."], ["Suspect remains extremely fluffy and suspicious."]], replies: [{ text: "Arrest him.", next: "lawyerMori" }, { text: "He's cute though.", next: "mori" }, { text: "Back to us.", next: "staying" }] },

  restart: {
    elias: [["Again? Fine 😭"]],
    replies: []
  }
};

function renderMessages() {

  appTitle.textContent = "Messages";
  messageBadge.classList.add("hidden");
  messageBusy = false;

  appContent.innerHTML = `
    <div class="messages-shell">
      <div class="contact-card message-contact-card">
        <div class="contact-avatar">E</div>
        <div class="message-contact-copy">
          <strong>Elias ♡</strong>
          <small id="eliasMessageStatus">online-ish</small>
        </div>
        <button id="resetMessages" class="message-reset-button" type="button" aria-label="Restart conversation">↻</button>
      </div>

      <div id="chat" class="chat message-chat"></div>
      <div id="typingArea" class="typing-area" aria-live="polite"></div>
      <div id="fakeReplies" class="fake-reply-area"></div>
    </div>
  `;

  document
    .getElementById("resetMessages")
    .addEventListener("click", resetMessageConversation);

  if (!messageConversationStarted) {
    startMessageConversation();
  }
  else {
    restoreMessageConversation();
  }
}

function startMessageConversation() {
  messageConversationStarted = true;
  currentMessageNode = "start";

  const starter = [
    "hey",
    "you alive?",
    "come here."
  ];

  starter.forEach(function(text) {
    appendMessageBubble("elias", text, false);
  });

  renderMessageReplies(messageTree.start.replies);
  saveMessageConversation();
}

function restoreMessageConversation() {
  let saved = null;

  try {
    saved = JSON.parse(localStorage.getItem("eliasOSMessages16") || "null");
  }
  catch (error) {
    saved = null;
  }

  if (!saved || !Array.isArray(saved.messages)) {
    messageConversationStarted = false;
    startMessageConversation();
    return;
  }

  currentMessageNode = saved.node || "start";

  saved.messages.forEach(function(message) {
    appendMessageBubble(message.who, message.text, false);
  });

  const node = messageTree[currentMessageNode] || messageTree.start;
  renderMessageReplies(node.replies || messageTree.start.replies);
  scrollMessagesToBottom(false);
}

function saveMessageConversation() {
  const chat = document.getElementById("chat");

  if (!chat) return;

  const messages = Array.from(
    chat.querySelectorAll(".bubble[data-who]")
  ).map(function(bubble) {
    return {
      who: bubble.dataset.who,
      text: bubble.dataset.messageText || bubble.textContent.trim()
    };
  });

  try {
    localStorage.setItem(
      "eliasOSMessages16",
      JSON.stringify({
        node: currentMessageNode,
        messages: messages.slice(-70)
      })
    );
  }
  catch (error) {
    console.log("Message history could not be saved:", error);
  }
}

function resetMessageConversation() {
  if (messageBusy) return;

  try {
    localStorage.removeItem("eliasOSMessages16");
  }
  catch (error) {}

  messageConversationStarted = false;
  currentMessageNode = "start";

  const chat = document.getElementById("chat");
  const typing = document.getElementById("typingArea");
  const replies = document.getElementById("fakeReplies");

  if (chat) chat.innerHTML = "";
  if (typing) typing.innerHTML = "";
  if (replies) replies.innerHTML = "";

  startMessageConversation();
}

function appendMessageBubble(who, text, animate = true) {
  const chat = document.getElementById("chat");
  if (!chat) return;

  const bubble = document.createElement("div");
  bubble.className = `bubble ${who}${animate ? " bubble-pop" : ""}`;
  bubble.dataset.who = who;
  bubble.dataset.messageText = text;
  bubble.textContent = text;
  chat.appendChild(bubble);

  scrollMessagesToBottom(true);
}

function renderMessageReplies(replies) {
  const replyArea = document.getElementById("fakeReplies");
  if (!replyArea) return;

  replyArea.innerHTML = "";

  (replies || []).forEach(function(reply) {
    const button = document.createElement("button");
    button.className = "reply-button";
    button.type = "button";
    button.textContent = reply.text;
    button.addEventListener("click", function() {
      chooseMessageReply(reply);
    });
    replyArea.appendChild(button);
  });

  if (!replies || replies.length === 0) {
    const button = document.createElement("button");
    button.className = "reply-button restart-reply-button";
    button.type = "button";
    button.textContent = "Start over ↻";
    button.addEventListener("click", resetMessageConversation);
    replyArea.appendChild(button);
  }
}

async function chooseMessageReply(reply) {
  if (messageBusy) return;

  messageBusy = true;
  const replyArea = document.getElementById("fakeReplies");
  if (replyArea) replyArea.innerHTML = "";
  appendMessageBubble("me", reply.text);

  if (reply.next === "restart") {
    await waitForMessageDelay(450);
    messageBusy = false;
    resetMessageConversation();
    return;
  }

  const node = messageTree[reply.next] || messageTree.start;
  currentMessageNode = reply.next in messageTree ? reply.next : "start";

  showTypingIndicator();
  await waitForMessageDelay(650 + Math.floor(Math.random() * 650));
  hideTypingIndicator();

  const sequence = randomItem(node.elias || [["hm?"]]);

  for (let index = 0; index < sequence.length; index++) {
    appendMessageBubble("elias", sequence[index]);

    if (index < sequence.length - 1) {
      showTypingIndicator();
      await waitForMessageDelay(420 + Math.floor(Math.random() * 420));
      hideTypingIndicator();
    }
  }

  runMessageNodeAction(node.action);
  renderMessageReplies(node.replies || []);
  saveMessageConversation();
  messageBusy = false;
}

function showTypingIndicator() {
  const typing = document.getElementById("typingArea");
  const status = document.getElementById("eliasMessageStatus");

  if (status) status.textContent = "typing...";

  if (typing) {
    typing.innerHTML = `
      <div class="typing-bubble" aria-label="Elias is typing">
        <span></span><span></span><span></span>
      </div>
    `;
  }

  scrollMessagesToBottom(true);
}

function hideTypingIndicator() {
  const typing = document.getElementById("typingArea");
  const status = document.getElementById("eliasMessageStatus");

  if (typing) typing.innerHTML = "";
  if (status) status.textContent = "online-ish";
}

function runMessageNodeAction(action) {
  if (action === "playSong") {
    if (musicAudio.paused) {
      musicAudio.play()
        .then(function() {
          songHasStarted = true;
          updateMusicUI();
          updateLockNowPlaying();
        })
        .catch(function(error) {
          console.log("Music needs a tap first:", error);
        });
    }
  }

  if (action === "moriHint") {
    moriWidgetText.textContent = randomItem([
      "plotting something",
      "watching everything",
      "pretending to be innocent"
    ]);
  }
}

function waitForMessageDelay(milliseconds) {
  return new Promise(function(resolve) {
    setTimeout(resolve, milliseconds);
  });
}

function scrollMessagesToBottom(smooth) {
  const replyArea = document.getElementById("fakeReplies");
  const target = replyArea || appContent;

  requestAnimationFrame(function() {
    if (target && typeof target.scrollIntoView === "function") {
      target.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "end"
      });
    }
  });
}

// ========================================
// PHOTOS
// ========================================

function renderPhotos() {

  appTitle.textContent =
    "Photos";


  let html =
    `
    <div class="photos-heading">

      <small>
        ELIAS OS GALLERY
      </small>

      <h3>
        Photos ♡
      </h3>

    </div>


    <div class="photos-meta">
      ${photoFiles.length} photos
    </div>


    <div class="photo-grid">
    `;


  photoFiles.forEach(
    function(photo) {

      html +=
        `
        <button
          class="photo-card"
          data-photo="${photo.src}"
          data-caption="${photo.caption}"
          type="button"
        >

          <img
            src="${photo.src}"
            alt=""
          >

        </button>
        `;

    }
  );


  html +=
    "</div>";


  appContent.innerHTML =
    html;


  document
    .querySelectorAll(
      ".photo-card"
    )
    .forEach(
      function(card) {

        card.addEventListener(
          "click",
          function() {

            openPhoto(
              card.dataset.photo,
              card.dataset.caption
            );

          }
        );

      }
    );

}


// ========================================
// SCRAPBOOK
// ========================================

function renderUs() {

  appTitle.textContent =
    "Us ♡";


  currentScrapbookIndex =
    0;


  drawScrapbookPage();

}


function drawScrapbookPage() {

  const current =
    scrapbookPages[
      currentScrapbookIndex
    ];


  appContent.innerHTML =
    `
    <div class="photos-heading">

      <small>
        MARIE × ELIAS
      </small>

      <h3>
        Our Scrapbook ♡
      </h3>

    </div>


    <div class="scrapbook-meta">
      ${scrapbookPages.length} memories
    </div>


    <div class="scrapbook-viewer">

      <button
        id="scrapbookOpen"
        class="scrapbook-frame"
        type="button"
      >

        <img
          src="${current.src}"
          alt="${current.title}"
        >

      </button>


      <div class="scrapbook-caption">
        ${current.title}
      </div>


      <div class="scrapbook-count">

        Memory
        ${currentScrapbookIndex + 1}
        of
        ${scrapbookPages.length}

      </div>


      <div class="scrapbook-controls">

        <button
          id="prevPage"
          class="scrapbook-button"
          type="button"
          ${
            currentScrapbookIndex === 0
              ? "disabled"
              : ""
          }
        >
          ‹ Previous
        </button>


        <button
          id="nextPage"
          class="scrapbook-button"
          type="button"
          ${
            currentScrapbookIndex ===
            scrapbookPages.length - 1
              ? "disabled"
              : ""
          }
        >
          Next ›
        </button>

      </div>


      <button
        id="openFullscreenPage"
        class="scrapbook-open-button"
        type="button"
      >
        Open Fullscreen ♡
      </button>

    </div>
    `;


  document
    .getElementById(
      "prevPage"
    )
    .addEventListener(
      "click",
      function() {

        if (
          currentScrapbookIndex > 0
        ) {

          currentScrapbookIndex--;

          drawScrapbookPage();

        }

      }
    );


  document
    .getElementById(
      "nextPage"
    )
    .addEventListener(
      "click",
      function() {

        if (
          currentScrapbookIndex <
          scrapbookPages.length - 1
        ) {

          currentScrapbookIndex++;

          drawScrapbookPage();

        }

      }
    );


  document
    .getElementById(
      "scrapbookOpen"
    )
    .addEventListener(
      "click",
      function() {

        openPhoto(
          current.src,
          `Our Scrapbook — ${current.title}`
        );

      }
    );


  document
    .getElementById(
      "openFullscreenPage"
    )
    .addEventListener(
      "click",
      function() {

        openPhoto(
          current.src,
          `Our Scrapbook — ${current.title}`
        );

      }
    );

}


// ========================================
// PHOTO VIEWER
// ========================================

function openPhoto(
  src,
  caption
) {

  bigPhoto.src =
    src;


  bigPhotoCaption.textContent =
    caption;


  photoOverlay.classList.remove(
    "hidden"
  );

}


closePhoto.addEventListener(
  "click",
  function() {

    photoOverlay.classList.add(
      "hidden"
    );

  }
);


// ========================================
// NOTES
// ========================================

function renderNotes() {

  appTitle.textContent =
    "Notes";


  appContent.innerHTML =
    `
    <div class="note-card">

      <small>
        PINNED
      </small>

      <h3>
        things Marie keeps stealing
      </h3>

      <p>
        • my hoodies<br>
        • half my blanket<br>
        • my sushi<br>
        • Mori's attention<br>
        • apparently my entire phone
      </p>

    </div>


    <div class="note-card">

      <small>
        ELIAS
      </small>

      <h3>
        important
      </h3>

      <p>
        Buy sushi.<br>
        Stop letting Mori manipulate me.<br>
        Neither of these things will happen.
      </p>

    </div>
    `;

}


// ========================================
// MORI CAM
// ========================================

function renderMori() {

  appTitle.textContent =
    "Mori Cam";


  appContent.innerHTML =
    `
    <div class="mori-cam">

      <img
        src="morii.PNG"
        alt="Mori"
      >

      <h3>
        Mori Cam 🐈‍⬛
      </h3>

      <p id="moriCamText">
        Live status: plotting something.
      </p>

      <button
        id="moriCamButton"
        class="mori-button"
        type="button"
      >
        Check Mori
      </button>

    </div>
    `;


  document
    .getElementById(
      "moriCamButton"
    )
    .addEventListener(
      "click",
      function() {

        document
          .getElementById(
            "moriCamText"
          )
          .textContent =
          randomItem([

            "Mori knocked something over. No regrets.",

            "Mori is asleep in the most inconvenient place possible.",

            "Mori has stolen Elias's seat again.",

            "Mori is staring directly into the camera.",

            "Mori is innocent. Allegedly."

          ]);

      }
    );

}


// ========================================
// CALENDAR
// ========================================

function renderCalendar() {

  appTitle.textContent =
    "Calendar";


  appContent.innerHTML =
    `
    <div class="calendar-event">

      <small>
        TODAY · 19:00
      </small>

      <strong>
        Movie night ♡
      </strong>

      <p>
        Elias claims you choose the movie.
      </p>

    </div>


    <div class="calendar-event">

      <small>
        FRIDAY · 20:30
      </small>

      <strong>
        Sushi Date 🍣
      </strong>

    </div>


    <div class="calendar-event">

      <small>
        SOMETIME
      </small>

      <strong>
        Give Mori attention
      </strong>

    </div>
    `;

}


// ========================================
// MUSIC
// ========================================

function renderMusic() {

  appTitle.textContent =
    "Music";


  appContent.innerHTML =
    `
    <div class="music-player">


      <div class="album-art-shell">

        <img
          id="albumArt"
          class="real-album-art"
          src="${song.artwork}"
          alt="${song.title}"
        >

      </div>


      <h3>
        ${song.title}
      </h3>


      <p>
        ${song.artist}
      </p>


      <div class="music-progress-wrap">

        <input
          id="musicProgress"
          class="music-progress"
          type="range"
          min="0"
          max="100"
          value="0"
        >


        <div class="music-time">

          <span id="currentMusicTime">
            ${formatTime(
              musicAudio.currentTime
            )}
          </span>

          <span id="totalMusicTime">
            ${formatTime(
              musicAudio.duration
            )}
          </span>

        </div>

      </div>


      <div class="main-music-controls">

        <button
          id="backButton"
          class="secondary-music-button"
          type="button"
        >
          ↶
          <small>10</small>
        </button>


        <button
          id="playButton"
          class="play-button"
          type="button"
        >
          ${
            musicAudio.paused
              ? "▶"
              : "Ⅱ"
          }
        </button>


        <button
          id="forwardButton"
          class="secondary-music-button"
          type="button"
        >
          ↷
          <small>10</small>
        </button>

      </div>


      <div class="music-extra-controls">

        <button
          id="shuffleButton"
          class="music-option-button ${
            shuffleEnabled
              ? "active"
              : ""
          }"
          type="button"
        >
          🔀
        </button>


        <button
          id="repeatButton"
          class="music-option-button ${
            repeatEnabled
              ? "active"
              : ""
          }"
          type="button"
        >
          🔁
        </button>

      </div>


      <div class="volume-wrap">

        <span>🔈</span>

        <input
          id="volumeSlider"
          class="volume-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value="${musicAudio.volume}"
        >

        <span>🔊</span>

      </div>


      <p class="music-little-note">
        Our little soundtrack ♡
      </p>


    </div>
    `;


  const progress =
    document.getElementById(
      "musicProgress"
    );


  if (
    Number.isFinite(
      musicAudio.duration
    ) &&
    musicAudio.duration > 0
  ) {

    progress.value =
      (
        musicAudio.currentTime /
        musicAudio.duration
      ) * 100;

  }


  progress.addEventListener(
    "input",
    function() {

      if (
        Number.isFinite(
          musicAudio.duration
        ) &&
        musicAudio.duration > 0
      ) {

        musicAudio.currentTime =
          (
            Number(
              progress.value
            ) /
            100
          ) *
          musicAudio.duration;

      }

    }
  );


  document
    .getElementById(
      "playButton"
    )
    .addEventListener(
      "click",
      toggleMusic
    );


  document
    .getElementById(
      "backButton"
    )
    .addEventListener(
      "click",
      skipBackward
    );


  document
    .getElementById(
      "forwardButton"
    )
    .addEventListener(
      "click",
      skipForward
    );


  document
    .getElementById(
      "repeatButton"
    )
    .addEventListener(
      "click",
      function() {

        repeatEnabled =
          !repeatEnabled;


        musicAudio.loop =
          repeatEnabled;


        updateMusicUI();

      }
    );


  document
    .getElementById(
      "shuffleButton"
    )
    .addEventListener(
      "click",
      function() {

        shuffleEnabled =
          !shuffleEnabled;


        updateMusicUI();

      }
    );


  document
    .getElementById(
      "volumeSlider"
    )
    .addEventListener(
      "input",
      function(event) {

        musicAudio.volume =
          Number(
            event.target.value
          );

      }
    );


  updateMusicUI();

}


// ========================================
// SETTINGS
// ========================================

function renderSettings() {

  appTitle.textContent =
    "Settings";


  appContent.innerHTML =
    `
    <div class="info-card">
      <small>DEVICE</small>
      <strong>Elias OS</strong>
    </div>


    <div class="info-card">
      <small>VERSION</small>
      <strong>1.6</strong>
    </div>


    <div class="info-card">
      <small>MUSIC</small>
      <strong>${song.title}</strong>
    </div>


    <div class="info-card">
      <small>CALLER</small>
      <strong>${callData.callerName}</strong>
    </div>


    <div class="info-card">
      <small>RINGTONE</small>
      <strong>Y-3.mp3</strong>
    </div>


    <button
      id="testCallButton"
      class="lock-button"
      type="button"
    >
      ☎ Incoming Call from Elias
    </button>


    <button
      id="lockPhoneButton"
      class="lock-button"
      type="button"
    >
      Lock Elias OS
    </button>
    `;


  document
    .getElementById(
      "testCallButton"
    )
    .addEventListener(
      "click",
      createIncomingCall
    );


  document
    .getElementById(
      "lockPhoneButton"
    )
    .addEventListener(
      "click",
      lockPhone
    );

}


// ========================================
// START
// ========================================

updateClock();

loadNotifications();

updateLockNowPlaying();
