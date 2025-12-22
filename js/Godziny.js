// Pokaz slajdów: zmienia slajdy co 5s. Używa stylów inline jako fallback jeśli CSS koliduje.
(function(){
  const slides = Array.from(document.querySelectorAll('.slideshow .slide'));
  if(!slides.length) return;

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
})();