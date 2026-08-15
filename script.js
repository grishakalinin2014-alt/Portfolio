document.addEventListener('DOMContentLoaded', () => {
  // 1. Появление внешних блоков при докрутке (fade-in)
  const animatedElements = document.querySelectorAll('.fade-in');
  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatedElements.forEach(el => fadeInObserver.observe(el));

  // 2. Увеличение активного элемента таймлайна в центре экрана + автозапуск видео
  const timelineItems = document.querySelectorAll('.timeline-item');
  const focusObserverOptions = {
    root: null,
    rootMargin: '-30% 0px -30% 0px',
    threshold: 0.25
  };

  const focusObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target.querySelector('video');

      if (entry.isIntersecting) {
        entry.target.classList.add('active-card');
        if (video) {
          video.muted = true;
          video.play().catch(() => {});
        }
      } else {
        entry.target.classList.remove('active-card');
        if (video) {
          video.pause();
        }
      }
    });
  }, focusObserverOptions);

  timelineItems.forEach(item => focusObserver.observe(item));
});