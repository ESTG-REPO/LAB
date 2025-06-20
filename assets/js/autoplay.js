  function autoplayVisibleVideo() {
    const videos = document.querySelectorAll('video');

    let maxVisible = 0;
    let targetVideo = null;

    videos.forEach(video => {
      const rect = video.getBoundingClientRect();
      const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));

      if (visibleHeight > maxVisible) {
        maxVisible = visibleHeight;
        targetVideo = video;
      }
    });

    videos.forEach(video => {
      if (video === targetVideo) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }

  // Run on load + on scroll
  document.addEventListener('DOMContentLoaded', autoplayVisibleVideo);
  window.addEventListener('scroll', autoplayVisibleVideo, { passive: true });
  window.addEventListener('resize', autoplayVisibleVideo);
