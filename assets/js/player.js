  const videoSources = [
    { src: "https://cdn.xperia.pt/caipirinha.mp4" },
    { src: "https://cdn.xperia.pt/gin.mp4" },
    { src: "https://cdn.xperia.pt/misturavodka.mp4" }
  ];

  const feed = document.getElementById('feed');
  const players = [];

  function getFilenameWithoutExtension(url) {
    return url.split('/').pop().split('.').slice(0, -1).join('.');
  }

  function createSlide({ src }, index) {
    const slide = document.createElement('div');
    slide.className = 'video-slide';
    slide.style.transition = 'transform 0.6s ease-in-out';

    const video = document.createElement('video');
    video.setAttribute('muted', true);
    video.setAttribute('autoplay', true);
    video.setAttribute('playsinline', true);
    video.setAttribute('loop', true);
    video.setAttribute('controls', false);
    video.id = `video-${index}`;

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.textContent = getFilenameWithoutExtension(src);

    slide.appendChild(video);
    slide.appendChild(overlay);
    feed.appendChild(slide);

    const player = new shaka.Player(video);
    player.load(src).then(() => {
      if (index !== 0) video.pause(); // Pause all but first
    });

    players.push({ player, video });
  }

  // Initialize feed
  videoSources.forEach((source, i) => createSlide(source, i));

  // Scroll behavior to pause/resume
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const index = parseInt(entry.target.querySelector('video').id.split('-')[1]);
      const video = players[index].video;
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  }, {
    threshold: 0.6
  });

  // Apply observer to all slides
  const slides = document.querySelectorAll('.video-slide');
  slides.forEach(slide => observer.observe(slide));