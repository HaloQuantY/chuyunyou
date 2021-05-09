// 轮播图特效
(function() {
  // 获得DOM元素
  const carouselList = document.querySelector('.banner .carousel-list');
  const leftBtn = document.querySelector('.banner .leftbtn');
  const rightBtn = document.querySelector('.banner .rightbtn');
  const circlesList = document.querySelector('.banner .circles');
  const banner = document.querySelector('.banner');

  // 克隆第一个li元素
  carouselList.appendChild(carouselList.firstElementChild.cloneNode(true));

  let index = 0;
  let lockOpen = true;

  // 设置小圆点函数，根据index设置相应圆点
  const setCircles = function() {
    const lis = circlesList.children;
    for (let i=0; i<lis.length; i++) {
      // 此处index % 5是因为点击右键时一瞬间index为5
      if (i === index % 5) {
        lis[i].className = 'current-circle';
      } else {
        lis[i].className = '';
      }
    }
  };

  // 定义右按键回调函数，可以用作右按键点击回调，也用作定时器自动轮播
  const rightBtnFunc = function() {
    // 节流
    if (!lockOpen) {
      return;
    }
    // 关锁
    lockOpen = false;
    carouselList.style.transition = 'transform .5s ease 0s';
    index++;
    if (index > 4) {
      setTimeout(() => {
        carouselList.style.transition = 'none';
        index = 0;
        carouselList.style.transform = 'translateX(0)';
      }, 500);
    }
    carouselList.style.transform = `translateX(${-index * 16.666}%)`;
    // 根据index改变小圆点
    setCircles();
    // 开锁
    setTimeout(() => {
      lockOpen = true;
    }, 500);
  };
  // 右按键绑定回调函数
  rightBtn.addEventListener('click', rightBtnFunc);
  
  // 左键绑定回调函数
  leftBtn.addEventListener('click', () => {
    if (!lockOpen) {
      return;
    }
    lockOpen = false;
    if (index === 0) {
      carouselList.style.transition = 'none';
      index = 5;
      carouselList.style.transform = `translateX(${-index * 16.666}%)`;
      index = 4;
      setTimeout(() => {
        carouselList.style.transition = 'transform .5s ease 0s';
        carouselList.style.transform = `translateX(${-index * 16.666}%)`;
      }, 0);
    } else {
      index--;
      carouselList.style.transform = `translateX(${-index * 16.666}%)`;
    }
    setTimeout(() => {
      lockOpen = true;
    }, 500);
    setCircles();
  });
  
  // 小圆点点击回调函数
  circlesList.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'li') {
      // 点击获取data-n属性值，用于设置index
      const dataN = e.target.getAttribute('data-n');
      index = dataN;
      // 设置轮播图位置
      carouselList.style.transform = `translateX(${-index * 16.666}%)`;
      // 设置小圆点
      setCircles();
    }
  });

  // 自动轮播设置定时器
  let timer = setInterval(rightBtnFunc, 2000);
  banner.addEventListener('mouseenter', () => {
    clearInterval(timer);
  });
  banner.addEventListener('mouseleave', () => {
    clearInterval(timer);
    timer = setInterval(rightBtnFunc, 2000);
  })
})();