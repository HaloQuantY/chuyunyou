(function() {
  const toTopBtn = document.querySelector('.backToTop');

  let timer;

  toTopBtn.addEventListener('click', () => {
    clearInterval(timer);
    timer = setInterval(() => {
      if (document.documentElement.scrollTop <= 0) {
        clearInterval(timer);
      } else {
        document.documentElement.scrollTop -= 300;
      }
    }, 20);
  });

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop === 0) {
      toTopBtn.style.display = 'none';
    } else {
      toTopBtn.style.display = 'block';
    }
  });
})();