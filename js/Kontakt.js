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

//Wysyłanie Formularza Kontaktowego AJAX
document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("#kontakt form");
  const captchaEl = document.getElementById("captchaCode");
  const captchaInput = document.getElementById("captchaInput");
  const captchaHidden = document.getElementById("captchaHidden");

  if (!form || !captchaEl || !captchaInput || !captchaHidden) return;

  function generateCaptcha() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  function setCaptcha() {
    const code = generateCaptcha();
    captchaEl.textContent = code;
    captchaHidden.value = code; // tylko JS ustawia
  }

  // LOSOWANIE OD RAZU
  setCaptcha();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // zła captcha → NIE wysyłamy
    if (captchaInput.value !== captchaHidden.value) {
      alert("Nieprawidłowy kod weryfikacyjny");
      setCaptcha();
      captchaInput.value = "";
      captchaInput.focus();
      return;
    }

    // captcha OK → wysyłka AJAX
    const formData = new FormData(form);

    fetch("send_contact.php", {
      method: "POST",
      body: formData
    })
    .then(res => res.text())
    .then(res => {

      if (res.trim() === "OK") {
        alert("Wiadomość została wysłana");

        form.reset();        // czyścimy formularz
        setCaptcha();        // nowa captcha
      } else {
        alert("Błąd wysyłki");
      }

    })
    .catch(() => {
      alert("Problem z połączeniem z serwerem");
    });
  });

});
