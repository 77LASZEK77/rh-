// Pokaz slajdów: zmienia slajdy co 5s. Używa stylów inline jako fallback jeśli CSS koliduje.
// Animacja fade-in dla galerii: obrazy pokazują się podczas scrollowania.
(function(){
  const slides = Array.from(document.querySelectorAll('.slideshow .slide'));
  if(slides.length) {
    let idx = 0;
    const interval = 5000;

    // inicjalizuj slajdy
    slides.forEach((s,i)=>{
      s.classList.toggle('active', i===0);
      s.style.opacity = (i===0) ? '1' : '0';
      s.style.zIndex = (i===0) ? '2' : '1';
    });

    setInterval(()=>{
      const current = slides[idx];
      current.classList.remove('active');
      current.style.opacity = '0';
      current.style.zIndex = '1';

      idx = (idx + 1) % slides.length;

      const next = slides[idx];
      next.classList.add('active');
      next.style.opacity = '1';
      next.style.zIndex = '2';
    }, interval);
  }

  // Animacja fade-in dla obrazów w galerii podczas scrollowania
  const images = document.querySelectorAll('.gallery-grid img');
  if(images.length) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if(entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100); // opóźnienie dla efektu po kolei
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    images.forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Modal dla galerii
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentIndex = 0;

  // Otwórz modal
  images.forEach((img, index) => {
    img.onclick = function() {
      modal.style.display = 'block';
      modalImg.src = this.src;
      modalImg.alt = this.alt;
      currentIndex = parseInt(this.dataset.index);
    };
  });

  // Zamknij modal
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  };

  // Nawigacja
  prevBtn.onclick = function() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    modalImg.src = images[currentIndex].src;
    modalImg.alt = images[currentIndex].alt;
  };

  nextBtn.onclick = function() {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    modalImg.src = images[currentIndex].src;
    modalImg.alt = images[currentIndex].alt;
  };

  // Zamknij po kliknięciu poza obrazem
  modal.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
})();