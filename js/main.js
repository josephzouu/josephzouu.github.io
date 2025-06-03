// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------
  // 1) MOBILE MENU TOGGLE
  // --------------------------------------------
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // --------------------------------------------
  // 2) PHOTO GALLERY CAROUSEL LOGIC
  // --------------------------------------------
  const track = document.querySelector('.carousel-track');
  if (!track) return; // if the #gallery section isn’t on this page, do nothing

  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-button.next');
  const prevButton = document.querySelector('.carousel-button.prev');

  let slideWidth = slides[0].getBoundingClientRect().width;

  // 2a) Position each slide next to one another (side by side)
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  });

  let currentIndex = 0;

  const moveToSlide = (index) => {
    track.style.transform = 'translateX(-' + slideWidth * index + 'px)';
  };

  // 2b) Next button: advance index (wrap at end)
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    moveToSlide(currentIndex);
  });

  // 2c) Prev button: decrement index (wrap at start)
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    moveToSlide(currentIndex);
  });

  // 2d) If the window resizes, recalc slide widths & re‐position
  window.addEventListener('resize', () => {
    slideWidth = slides[0].getBoundingClientRect().width;
    slides.forEach((slide, index) => {
      slide.style.left = slideWidth * index + 'px';
    });
    track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
  });
});
