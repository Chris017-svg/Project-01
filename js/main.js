
// === Header 滾動變色 ===
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

// === 漢堡選單開關 ===
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-menu");

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    nav.classList.toggle("active");
  });
});

// === Hero 輪播背景（可點擊外部網站＋圓點指示）===
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  const imageData = [
    { src: "../images/indeximg/xinpei.png", link: "https://newtaipei.travel/" },
    { src: "../images/indeximg/taipei.png", link: "https://www.travel.taipei/" },
    { src: "../images/indeximg/xinchu.png", link: "https://www.hccg.gov.tw/" },
    { src: "../images/indeximg/miaoli.png", link: "https://miaolitravel.net/" },
    { src: "../images/indeximg/taichung.png", link: "https://travel.taichung.gov.tw/" },
    { src: "../images/indeximg/chunghua.png", link: "https://tourism.chcg.gov.tw/" },
    { src: "../images/indeximg/tainan.png", link: "https://www.twtainan.net/" },
    { src: "../images/indeximg/kaohsiung.png", link: "https://khh.travel/" },
    { src: "../images/indeximg/hualian.png", link: "https://tour-hualien.hl.gov.tw/" },
  ];

  // === 建立圖片 + 外部連結 ===
  imageData.forEach((item, i) => {
    const link = document.createElement("a");
    link.href = item.link;
    link.classList.add("hero-link");
    link.target = "_blank";

    const div = document.createElement("div");
    div.classList.add("hero-bg");
    div.style.backgroundImage = `url('${item.src}')`;
    if (i === 0) div.classList.add("active");

    link.appendChild(div);
    hero.appendChild(link);
  });

  // === 建立左右按鈕 ===
  const prevBtn = document.createElement("button");
  const nextBtn = document.createElement("button");
  prevBtn.classList.add("hero-btn-prev");
  nextBtn.classList.add("hero-btn-next");
  prevBtn.innerHTML = "&#10094;";
  nextBtn.innerHTML = "&#10095;";
  hero.appendChild(prevBtn);
  hero.appendChild(nextBtn);

  // === 建立圓點指示區 ===
  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add("hero-dots");
  imageData.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  });
  hero.appendChild(dotsContainer);

  // === 輪播邏輯 ===
  const slides = document.querySelectorAll(".hero-bg");
  const dots = document.querySelectorAll(".dot");
  let index = 0;
  let interval;

  function showSlide(newIndex) {
    slides[index].classList.remove("active");
    dots[index].classList.remove("active");
    document.querySelectorAll(".hero-link").forEach(link => {
      link.style.pointerEvents = "none";
    });

    index = (newIndex + slides.length) % slides.length;
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    slides[index].parentElement.style.pointerEvents = "auto";
  }

  function nextSlide() {
    showSlide(index + 1);
  }

  function prevSlide() {
    showSlide(index - 1);
  }

  function startAutoPlay() {
    interval = setInterval(nextSlide, 4000);
  }

  function stopAutoPlay() {
    clearInterval(interval);
  }

  startAutoPlay();

  // 左右箭頭事件
  nextBtn.addEventListener("click", () => {
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
  });

  prevBtn.addEventListener("click", () => {
    stopAutoPlay();
    prevSlide();
    startAutoPlay();
  });

  // 點擊圓點事件
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      stopAutoPlay();
      showSlide(i);
      startAutoPlay();
    });
  });
});
