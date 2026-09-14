// ELIAS OS — US / OUR SONG PLAYBACK FIX
// Page 33 must always control the original "Our Song" audio,
// not whichever track happens to be selected in the playlist player.
(function () {
  'use strict';

  function getOurSongAudio() {
    try {
      if (typeof musicAudio !== 'undefined' && musicAudio) {
        return musicAudio;
      }
    } catch (error) {}

    return null;
  }

  function updateButton(button, audio) {
    if (!button || !audio) return;
    button.textContent = audio.paused
      ? 'Play Our Song ♪'
      : 'Pause Our Song Ⅱ';
  }

  document.addEventListener('click', async function (event) {
    const button = event.target.closest('#usStoryAction');
    if (!button) return;

    // Stop the older Us listener from routing this through the playlist.
    event.preventDefault();
    event.stopImmediatePropagation();

    const audio = getOurSongAudio();

    if (!audio) {
      button.textContent = 'Our Song unavailable';
      console.error('Elias Us: original Our Song audio was not found.');
      return;
    }

    // Do not let the newer playlist and the scrapbook song play together.
    if (
      window.eliasPlaylistAudio &&
      window.eliasPlaylistAudio !== audio &&
      !window.eliasPlaylistAudio.paused
    ) {
      window.eliasPlaylistAudio.pause();
    }

    try {
      if (audio.paused) {
        await audio.play();

        try {
          if (typeof songHasStarted !== 'undefined') {
            songHasStarted = true;
          }
        } catch (error) {}
      } else {
        audio.pause();
      }

      try {
        if (typeof updateMusicUI === 'function') updateMusicUI();
        if (typeof updateLockNowPlaying === 'function') updateLockNowPlaying();
      } catch (error) {}

      updateButton(button, audio);
    } catch (error) {
      console.error('Elias Us: Our Song could not play:', error);
      button.textContent = 'Tap again to play ♪';
    }
  }, true);

  // Keep Page 33's label in sync when playback changes elsewhere.
  const audio = getOurSongAudio();
  if (audio) {
    ['play', 'pause', 'ended'].forEach(function (name) {
      audio.addEventListener(name, function () {
        updateButton(document.getElementById('usStoryAction'), audio);
      });
    });
  }
})();
