(function() {
  const bannerNav = document.querySelector('.banner .banner-nav');
  const bannerList = document.querySelector('.banner .banner-list');
  const menuBox = document.querySelector('.banner .menu-box');
  const menus = menuBox.querySelectorAll('.menu');
  
  bannerList.addEventListener('mouseover', (e) => {
    if (e.target.tagName.toLowerCase() === 'li') {
      const dataT = e.target.getAttribute('data-t');
      for (let i=0; i<menus.length; i++) {
        if (menus[i].getAttribute('data-t') === dataT) {
          menus[i].classList.add('current');
        } else {
          menus[i].classList.remove('current');
        }
      }
    }
  });

  bannerNav.addEventListener('mouseleave', () => {
    for (let i=0; i<menus.length; i++) {
      menus[i].classList.remove('current');
    }
  });
})();