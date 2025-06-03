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
  if (!track) return; // if #gallery isn’t on this page, stop here

  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-button.next');
  const prevButton = document.querySelector('.carousel-button.prev');

  // 2a) Get each slide’s width
  let slideWidth = slides[0].getBoundingClientRect().width;

  // 2b) Position each slide side by side
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  });

  let currentIndex = 0;

  // 2c) Function to move to a given slide index
  const moveToSlide = (index) => {
    track.style.transform = 'translateX(-' + slideWidth * index + 'px)';
  };

  // 2d) “Next” arrow clicked
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    moveToSlide(currentIndex);
  });

  // 2e) “Prev” arrow clicked
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    moveToSlide(currentIndex);
  });

  // 2f) Re‐calculate positions if the window is resized
  window.addEventListener('resize', () => {
    slideWidth = slides[0].getBoundingClientRect().width;
    slides.forEach((slide, index) => {
      slide.style.left = slideWidth * index + 'px';
    });
    // Also keep the track translated to the correct slide
    track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
  });
});
